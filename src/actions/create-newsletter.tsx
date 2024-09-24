"use server";

import { ratelimit } from "@/lib/rate-limit";
import { JWT } from "google-auth-library";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { headers } from "next/headers";
import * as v from "valibot"; // 1.2 kB

const ContactForm = v.object({
  email: v.pipe(v.string(), v.email(), v.minLength(1), v.maxLength(250)),
  name: v.pipe(v.string(), v.minLength(1), v.maxLength(100)),
});

const GOOGLE_SHEET_KEY = process.env
  .GOOGLE_SHEET_KEY!.split(String.raw`\n`)
  .join("\n");

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL!;

const HEADERS_ROW = ["Nombre", "Correo", "Fecha"];

function getServiceAccount() {
  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: GOOGLE_EMAIL,
    key: GOOGLE_SHEET_KEY.replace('"', "").replaceAll("\n", "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return serviceAccountAuth;
}

async function getOrCreateHeaderRow(sheet: GoogleSpreadsheetWorksheet) {
  await sheet.loadHeaderRow();

  await sheet.setHeaderRow(HEADERS_ROW);
}

async function getOrCreateSheet(sheetName: string) {
  const serviceAccountAuth = getServiceAccount();
  const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);

  await doc.loadInfo();

  const sheet =
    doc.sheetsByTitle[sheetName] ||
    (await doc.addSheet({
      title: sheetName,
      headerValues: HEADERS_ROW,
    }));

  await getOrCreateHeaderRow(sheet);

  return sheet;
}

const log = {
  ingest: async (data: any) => {
    console.log(data);
  },
};

enum STATUS_LOG {
  success = "success",
  error = "error",
}

async function findContact(sheet: GoogleSpreadsheetWorksheet, email: string) {
  const rows = await sheet.getRows();

  return rows.find((row) => row.get(HEADERS_ROW[1]) === email);
}

function mapContact(data: v.InferOutput<typeof ContactForm>) {
  return {
    [HEADERS_ROW[0]]: data.name,
    [HEADERS_ROW[1]]: data.email,
    [HEADERS_ROW[2]]: new Date().toLocaleDateString(),
  };
}
export async function createNewsletter(
  _: {
    success: boolean;
    error: any;
  },
  formData: FormData,
) {
  try {
    const ip = headers().get("x-real-ip") || headers().get("x-forwarded-for") || '127.0.0.1';
    const { success, limit, reset, remaining } =
      await ratelimit.limit(ip);

    if (!success) {
      log.ingest({
        event: "ratelimit",
        data: {
          limit,
          reset,
          remaining,
        },
        status_log: STATUS_LOG.error,
      });

      return {
        success: false,
        error: "Too many requests",
      };
    }

    const name = formData.get("name") as string;

    const email = formData.get("email") as string;

    const contact = {
      name,
      email,
    };

    const payload = v.safeParse(ContactForm, contact);

    if (!payload.success) {
      log.ingest({
        event: "validation error",
        data: payload.issues,
        status_log: STATUS_LOG.error,
      });

      return {
        success: false,
        error: payload.issues,
      };
    }

    const sheet = await getOrCreateSheet("Newsletter");

    log.ingest({
      event: "sheet get or create",
      data: contact,
      status_log: STATUS_LOG.success,
    });

    const foundContact = await findContact(sheet, payload.output.email);

    if (foundContact) {
      log.ingest({
        event: "contact found",
        data: foundContact.toObject(),
        status_log: STATUS_LOG.success,
      });

      // Ovewrite contact
      foundContact.assign(mapContact(contact));

      await foundContact.save();

      log.ingest({
        event: "contact updated",
        data: foundContact.toObject(),
        status_log: STATUS_LOG.success,
      });

      return {
        success: true,
      };
    }

    await sheet.addRow(mapContact(contact));

    log.ingest({
      event: "contact added to sheet",
      data: contact,
      status_log: STATUS_LOG.success,
    });

    return {
      success: true,
    };
  } catch (error) {
    log.ingest({
      event: "error",
      data: error.message,
      status_log: STATUS_LOG.error,
    });

    return {
      success: false,
      error: error.message,
    };
  }
}

import { investPageQuery } from "@/sanity/lib/queries";
import { Singletons } from "@/types";
import { createClient } from "@sanity/client";
import "dotenv/config";
import fs from "fs";

import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // Ensure no accidental 'stale' data
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
});

const REDIRECTS_LIST = [Singletons.INVEST];

const INITIAL_REDIRECTS = {
  [Singletons.INVEST]: "/invest",
};

async function seedInitialRedirects() {
  await Promise.all(
    REDIRECTS_LIST.map(async (page) => {
      const slug = await redis.get(page);
      const initialSlug = INITIAL_REDIRECTS[page];

      if (!slug) {
        console.log(`Seeding initial redirect for ${page} to ${initialSlug}`);
        await redis.set(page, initialSlug);
      }
    })
  );
}

function getQuery(page: Singletons) {
  switch (page) {
    case Singletons.INVEST:
      return investPageQuery;
    default:
      return null;
  }
}

export async function generateRedirects() {
  try {
    await seedInitialRedirects();

    const allRedirects = REDIRECTS_LIST.map(async (page) => {
      const oldSlug = await redis.get(page);

      console.log(`Checking ${page} for changes`);

      const newSlug = (await client.fetch(getQuery(page) as unknown as string))
        .slug;

      console.log(`New slug: ${newSlug}`);

      if (!newSlug) {
        console.log(`No slug found for ${page} - skipping`);
        return Promise.resolve();
      }

      console.log(`Old slug: ${oldSlug}`);

      if (!oldSlug) {
        console.log(`No old slug found for ${page} - skipping`);
        return Promise.resolve();
      }

      if (oldSlug !== newSlug) {
        console.log(`Renaming ${oldSlug} to ${newSlug}`);

        fs.renameSync(
          __dirname + `/../app/(website)/${oldSlug}`,
          __dirname + `/../app/(website)/${newSlug}`
        );

        console.log(`Updating redis key for ${page} to ${newSlug}`);

        await redis.set(page, newSlug);

        console.log(`Redirects updated for ${page}`);
      }
    });

    await Promise.all(allRedirects);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    redis.disconnect();
  }
}

generateRedirects();

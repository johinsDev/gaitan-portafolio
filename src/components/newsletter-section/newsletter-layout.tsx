"use client";
import { cn } from "@/lib/cn";
import { NewsletterSection } from "@/types";
import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: NewsletterSection | null;
};

export function NewsletterSectionLayout({ data }: Props) {
  const [submitted, setSubmitted] = useState(false);

  if (!data) return null;

  return (
    <section className="bg-gray-50 py-12 w-full full-width">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        {data.title}{" "}
      </div>

      {!!data.description && (
        <div className="text-center text-body mt-8">
          <CustomPortableText value={data.description as any} />
        </div>
      )}

      <div className="main_container">
        <div className="h-px w-full bg-gray-300 my-10"></div>

        <div className={cn("text-center", { hidden: !submitted })}>
          <CustomPortableText value={data.successMessage as any} />
        </div>

        <form
          className={cn("flex flex-col md:flex-row gap-4", {
            hidden: submitted,
          })}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}>
          <Input type="text" placeholder={data.placeholderName ?? "Escribe tu nombre"} name="name" className="h-16 md:flex-1" required />
          <Input type="email" placeholder={data.placeholderEmail ?? "Escribe tu email"} name="email" className="h-16 md:flex-1" required />
          <Button type="submit" className="h-16 w-full md:w-1/4">
            {data.submitText ?? "Suscribirme"}
          </Button>
        </form>

      </div>
    </section>
  );
}

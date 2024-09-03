"use client";
import { urlForImage } from "@/sanity/lib/utils";
import { ServicesSection } from "@/types";
import Image from "next/image";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: ServicesSection | null;
};

export function ServicesSectionLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className="bg-white py-12 w-full full-width">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        {data.title}{" "}
      </div>
      {!!data.description && (
        <div className="text-center text-body mt-8">
          <CustomPortableText value={data.description as any} />
        </div>
      )}
      <div className="main_container mt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {data.services?.map((service) => {
            const image = service?.image?.image?.asset &&
              urlForImage(service?.image?.image)?.width(600).url();

            if (!image) return null;

            return (
              <div key={service._key} className="text-center">
                <div className="aspect-video relative rounded-3xl overflow-hidden">
                  <Image
                    src={image}
                    fill
                    alt={service.image?.alt ?? ""}
                    className="object-cover"
                  />
                </div>
                <div className="text-2xl text-left lg:text-center md:text-3xl font-bold mt-4">
                  {service.title}
                </div>
                {!!service.description && (
                  <div className="text-left lg:text-center text-lg mt-4">
                    <CustomPortableText value={service.description as any} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section >
  );
}

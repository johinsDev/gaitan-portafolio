"use client";

import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { PropertyDocument } from "@/types";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  properties: PropertyDocument[];
};

export function ListingProperties({ properties }: Props) {
  const params = useSearchParams();

  const country = params.get("country") || "";

  const state = params.get("state") || "";

  const filteredProperties = properties.filter((property) => {
    const JSONString = JSON.stringify(property.location);

    return JSONString.includes(country) && JSONString.includes(state);
  });

  if (!filteredProperties.length) {
    return (
      <div className="text-center text-2xl font-bold">
        No encontramos propiedades
      </div>
    );
  }

  return filteredProperties.map((property, i) => {
    const link = resolveHref("property", property.slug);

    const image = urlForImage(property.gallery?.images?.[0])
      ?.width(500)
      .auto("format")
      .url();

    if (!link) {
      return null;
    }

    return (
      <Link
        href={link}
        className="flex flex-col bg-gray-200 rounded-2xl overflow-hidden"
        key={i}
      >
        {!!image && (
          <Image
            src={image}
            width={370}
            height={240}
            alt="Real Estate"
            className="object-cover w-full aspect-video rounded-t-2xl"
          />
        )}

        <div className="p-6 flex flex-col items-center justify-center text-center text-2xl">
          <div>
            {property.location?.city ||
              property.location?.country ||
              property.location?.state}
          </div>
          <div className="font-bold">{property.name}</div>
          <div className="font-bold text-3xl mt-6">{property.price}</div>
          {property.description && (
            <div className="text-xl line-clamp-2">
              {toPlainText(property.description)}
            </div>
          )}
        </div>
      </Link>
    );
  });
}

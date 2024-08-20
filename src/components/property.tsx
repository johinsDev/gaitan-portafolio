import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { InvestPagePayload, PropertyDocument } from "@/types";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

type Props = {
  property: PropertyDocument;
  investPage: InvestPagePayload
};

export function Property({ property, investPage }: Props) {
  const link = resolveHref("property", property.slug)?.replace(
    "/listing",
    `/${investPage?.slug ?? 'listing'}`
  );

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
          {property.location?.city || property.location?.state},{" "}
          {property.location?.country}
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
}

import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { InvestPagePayload, PropertyDocument } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  property: PropertyDocument;
  investPage: InvestPagePayload;
};

function calcMonths(date: string) {
  if (!date) {
    return 0;
  }

  const now = new Date();
  const then = new Date(date);

  return (
    (then.getFullYear() - now.getFullYear()) * 12 +
    then.getMonth() -
    now.getMonth()
  );
}

function formatPrice(price: number | undefined | null) {
  if (!price) {
    return "";
  }

  return (
    "$ " +
    price.toLocaleString("es-MX", {
      notation: "compact",
      maximumFractionDigits: 0,
    })
  );
}

export function Property({ property, investPage }: Props) {
  const link = resolveHref("property", property.slug)?.replace(
    "/listing",
    `/${investPage?.slug ?? "listing"}`,
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

      <div className="p-6 flex flex-col items-start justify-center text-left text-lg lg:text-xl">
        <strong className="text-xl lg:text-2xl">{property.name}</strong>
        <div>
          {property.location?.city || property.location?.state},{" "}
          {property.location?.country}
        </div>

        <div className="flex items-center justify-between gap-2 w-full mb-1 mt-8">
          <div>
            Valorización:
          </div>
          <strong>
            {formatPrice(property.price)}
          </strong>
        </div>

        <div className="flex items-center justify-between gap-2 w-full mb-1">
          <div>
            Ocupación zona:
          </div>
          <strong>
            {property.occupancy ?? 0}%
          </strong>
        </div>

        <div className="flex items-center justify-between gap-2 w-full mb-1">
          <div>
            Entrega:
          </div>
          <strong>
            {calcMonths(property.deliveryDate ?? "")} meses
          </strong>
        </div>
      </div>
    </Link>
  );
}

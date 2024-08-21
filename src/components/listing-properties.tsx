"use client";

import { InvestPagePayload, PropertyDocument } from "@/types";
import { useSearchParams } from "next/navigation";
import { Property } from "./property";

type Props = {
  properties: PropertyDocument[];
  investPage: InvestPagePayload;
};

export function ListingProperties({ properties, investPage }: Props) {
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
    return <Property key={i} property={property} investPage={investPage} />;
  });
}

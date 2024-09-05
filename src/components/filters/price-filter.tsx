"use client";

import { eventMitt } from "@/lib/event";
import { parseAsInteger, useQueryState } from "next-usequerystate";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select/select";

type Price = {
  min: number;
  max: number;
  label: string;
};

const PRICES: Price[] = [
  {
    min: 1,
    max: 200000000,
    label: "$ 0 a $ 200.000.000",
  },
  {
    min: 201000000,
    max: 400000000,
    label: "$ 201.000.000 a $ 400.000.000",
  },
  {
    min: 401000000,
    max: 600000000,
    label: "$ 401.000.000 a $ 600.000.000",
  },
  {
    min: 601000000,
    max: 800000000,
    label: "$ 601.000.000 a $ 800.000.000",
  },
  {
    min: 801000000,
    max: 1000000000,
    label: "$ 801.000.000 a $ 1000.000.000",
  },
  {
    min: 1001000000,
    max: Infinity,
    label: "$ 1.000.000.001 o más",
  },
];

export function PriceFilter() {
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsInteger.withDefault(0),
  );

  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsInteger.withDefault(Infinity),
  );

  const updatePrice = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const onValueChange = (price: string) => {
    const { max, min } = PRICES.find((p) => p.label === price) || {};


    if (!max || !min) {
      return;
    }

    updatePrice(min, max);
  };

  useEffect(() => {
    eventMitt.on("clear-params", () => {
      updatePrice(null, null);
    });

    return () =>
      eventMitt.off("clear-params", () => {
        updatePrice(null, null);
      });
  }, []);


  const value = PRICES.find(
    (price) => price.min === minPrice && price.max === maxPrice,
  )?.label;

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Precio" />
      </SelectTrigger>
      <SelectContent>
        {PRICES.map((price) => (
          <SelectItem key={price.label} value={price.label}>
            {price.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

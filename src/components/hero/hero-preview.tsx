"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { homePageQuery } from "@/sanity/lib/queries";
import { HomePagePayload } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { HeroLayout } from "./hero-layout";

type Props = {
  initial: QueryResponseInitial<HomePagePayload>;
};

export default function HeroPreview(props: Props) {
  const { data: home } = useQuery<HomePagePayload>(
    homePageQuery,
    {},
    {
      initial: props.initial,
    },
  );

  return <HeroLayout hero={home?.hero} />;
}

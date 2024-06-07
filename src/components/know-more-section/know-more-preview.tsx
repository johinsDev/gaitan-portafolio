"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { homePageQuery } from "@/sanity/lib/queries";
import { getSection } from "@/sanity/lib/utils";
import { HomePagePayload, KnowMore, SectionsList } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { KnowMoreSectionLayout } from "./know-more-layout";

type Props = {
  initial: QueryResponseInitial<HomePagePayload>;
  _key: string;
};

export default function KnowMorePreview(props: Props) {
  const { data: home } = useQuery<HomePagePayload>(
    homePageQuery,
    {},
    {
      initial: props.initial,
    },
  );

  const accordion = getSection<KnowMore>(
    home?.sections ?? [],
    SectionsList.KNOW_MORE,
    props._key,
  );

  return <KnowMoreSectionLayout data={accordion} />;
}

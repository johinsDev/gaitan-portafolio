"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { homePageQuery } from "@/sanity/lib/queries";
import { getSection } from "@/sanity/lib/utils";
import { AccordionSection, HomePagePayload, SectionsList } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { AccordionSectionLayout } from "./accordion-layout";

type Props = {
  initial: QueryResponseInitial<HomePagePayload>;
  _key: string;
};

export default function AccordionPreview(props: Props) {
  const { data: home } = useQuery<HomePagePayload>(
    homePageQuery,
    {},
    {
      initial: props.initial,
    },
  );

  const accordion = getSection<AccordionSection>(
    home?.sections ?? [],
    SectionsList.ACCORDION_SECTION,
    props._key,
  );

  return <AccordionSectionLayout data={accordion} />;
}

"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { homePageQuery } from "@/sanity/lib/queries";
import { getSection } from "@/sanity/lib/utils";
import { HomePagePayload, SectionsList, YoutubeSection } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { YoutubeSectionLayout } from "./youtube-layout";

type Props = {
  initial: QueryResponseInitial<HomePagePayload>;
  _key: string;
};

export default function YoutubeSectionPreview(props: Props) {
  const { data: home } = useQuery<HomePagePayload>(
    homePageQuery,
    {},
    {
      initial: props.initial,
    },
  );

  const feature = getSection<YoutubeSection>(
    home?.sections ?? [],
    SectionsList.YOUTUBE_SECTION,
    props._key,
  );

  return <YoutubeSectionLayout data={feature} />;
}

import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import { SectionsList, YoutubeSection as YoutubeSectionPayload } from "@/types";
import { YoutubeSectionLayout } from "./youtube-layout";

const YoutubeSectionPreview = dynamic(() => import("./youtube-preview"));

type Props = {
  _key: string;
};

export async function YoutubeSection({ _key: key }: Props) {
  const home = await loadHomePage();

  const feature = getSection<YoutubeSectionPayload>(
    home.data.sections ?? [],
    SectionsList.YOUTUBE_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <YoutubeSectionPreview initial={home} _key={key} />;
  }

  return <YoutubeSectionLayout data={feature} />;
}

import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import {
  SectionsList,
  Singletons,
  YoutubeSection as YoutubeSectionPayload,
} from "@/types";
import { YoutubeSectionLayout } from "./youtube-layout";

const YoutubeSectionPreview = dynamic(() => import("./youtube-preview"));

type Props = {
  _key: string;
  load?: Singletons;
};

export async function YoutubeSection({ _key: key, load }: Props) {
  const data = await loadSingleton(load);

  const feature = getSection<YoutubeSectionPayload>(
    data.data.sections ?? [],
    SectionsList.YOUTUBE_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <YoutubeSectionPreview initial={data} _key={key} load={load} />;
  }

  return <YoutubeSectionLayout data={feature} />;
}

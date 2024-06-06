import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import { SectionsList, StatsSection } from "@/types";
import { StatsLAyout } from "./stats-layout";

const StatsPreview = dynamic(() => import("./stats-preview"));

type Props = {
  _key: string;
};

export async function Stats({ _key: key }: Props) {
  const home = await loadHomePage();

  const stats = getSection<StatsSection>(
    home.data.sections ?? [],
    SectionsList.STATS_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <StatsPreview initial={home} _key={key} />;
  }

  return <StatsLAyout data={stats} />;
}

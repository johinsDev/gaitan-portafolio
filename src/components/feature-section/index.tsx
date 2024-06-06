import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import { FeatureSection, SectionsList } from "@/types";
import { FeatureSectionLayout } from "./feature-layout";

const FeaturePreview = dynamic(() => import("./feature-preview"));

type Props = {
  _key: string;
};

export async function Feature({ _key: key }: Props) {
  const home = await loadHomePage();

  const feature = getSection<FeatureSection>(
    home.data.sections ?? [],
    SectionsList.FEATURE_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <FeaturePreview initial={home} _key={key} />;
  }

  return <FeatureSectionLayout data={feature} />;
}

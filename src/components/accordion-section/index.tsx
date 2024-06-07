import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import { SectionsList, AccordionSection as TypeAccordionSection } from "@/types";
import { AccordionSectionLayout } from "./accordion-layout";

const FeaturePreview = dynamic(() => import("./accordion-preview"));

type Props = {
  _key: string;
};

export async function AccordionSection({ _key: key }: Props) {
  const home = await loadHomePage();

  const feature = getSection<TypeAccordionSection>(
    home.data.sections ?? [],
    SectionsList.ACCORDION_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <FeaturePreview initial={home} _key={key} />;
  }

  return <AccordionSectionLayout data={feature} />;
}

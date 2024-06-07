import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import {
  SectionsList,
  Singletons,
  AccordionSection as TypeAccordionSection,
} from "@/types";
import { AccordionSectionLayout } from "./accordion-layout";

const FeaturePreview = dynamic(() => import("./accordion-preview"));

type Props = {
  _key: string;
  load?: Singletons;
};

export async function AccordionSection({ _key: key, load }: Props) {
  const data = await loadSingleton(load);

  const feature = getSection<TypeAccordionSection>(
    data.data.sections ?? [],
    SectionsList.ACCORDION_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <FeaturePreview initial={data} _key={key} load={load} />;
  }

  return <AccordionSectionLayout data={feature} />;
}

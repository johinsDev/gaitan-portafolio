import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import { SectionsList, KnowMore as TypeKnowMoreSection } from "@/types";
import { KnowMoreSectionLayout } from "./know-more-layout";

const KnowMorePreview = dynamic(() => import("./know-more-preview"));

type Props = {
  _key: string;
};

export async function KnowMoreSection({ _key: key }: Props) {
  const home = await loadHomePage();

  const feature = getSection<TypeKnowMoreSection>(
    home.data.sections ?? [],
    SectionsList.KNOW_MORE,
    key,
  );

  if (draftMode().isEnabled) {
    return <KnowMorePreview initial={home} _key={key} />;
  }

  return <KnowMoreSectionLayout data={feature} />;
}

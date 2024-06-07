import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadResources } from "@/sanity/loader/loadQuery";
import { ResourcesLayout } from "./resources-layout";

const ResourcesPreview = dynamic(() => import("./resources-preview"));

export async function ResourcesSection() {
  const data = await loadResources();

  if (draftMode().isEnabled) {
    return <ResourcesPreview initial={data} />;
  }

  return <ResourcesLayout resources={data.data} />;
}

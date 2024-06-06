import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadHomePage } from "@/sanity/loader/loadQuery";
import { HeroLayout } from "./hero-layout";

const HeroPreview = dynamic(() => import("./hero-preview"));

export async function Hero() {
  const home = await loadHomePage();

  if (draftMode().isEnabled) {
    return <HeroPreview initial={home} />;
  }

  return <HeroLayout hero={home.data?.hero} />;
}

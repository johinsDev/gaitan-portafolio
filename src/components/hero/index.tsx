import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadSingleton } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { HeroLayout } from "./hero-layout";

const HeroPreview = dynamic(() => import("./hero-preview"));

type HeroProps = {
  load?: Singletons;
};

export async function Hero({ load = Singletons.HOME }: HeroProps) {
  const data = await loadSingleton(load);

  if (draftMode().isEnabled) {
    return <HeroPreview initial={data} load={load} />;
  }

  return <HeroLayout hero={data?.data.hero} />;
}

import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { Sections } from "@/components/sections";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadAboutPage } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadAboutPage();

  return _generateMetadata(data.seo);
}

export default function AboutMe() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero load={Singletons.ABOUT} />
      </Suspense>

      <Suspense>
        <Sections load={Singletons.ABOUT} />
      </Suspense>
    </div>
  );
}

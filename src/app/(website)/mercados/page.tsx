import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { Sections } from "@/components/sections";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadMarketPage } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadMarketPage();

  return _generateMetadata(data.seo);
}

export default async function MarketPage() {
  const { data: marketPage } = await loadMarketPage();

  console.log(marketPage);

  return (

    <div className="flex flex-col gap-4 py-16">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero load={Singletons.MARKET} />
      </Suspense>

      <Suspense>
        <Sections load={Singletons.MARKET} />
      </Suspense>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero/hero-skeleton";
import { Sections } from "@/components/sections";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { _generateMetadata } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadPage } from "@/sanity/loader/loadQuery";
import { Singletons } from "@/types";
import { Suspense } from "react";
// const PagePreview = dynamic(
//   () => import("@/components/pages/page/PagePreview"),
// );

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: page } = await loadPage(params.slug);

  return _generateMetadata(page?.seo);
}

export function generateStaticParams() {
  return generateStaticSlugs("page");
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadPage(params.slug);

  // if (draftMode().isEnabled) {
  //   return <PagePreview params={params} initial={initial} />;
  // }

  if (!initial.data) {
    notFound();
  }

  return (
    <div>
      <div className="mb-14">
        {/* Header */}
        <Suspense fallback={<HeroSkeleton />}>
          <Hero slug={params.slug} load={Singletons.PAGE} />
        </Suspense>

        {/* Body */}
        {initial.data.body && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
            value={initial.data.body as any}
          />
        )}
      </div>
      <div className="absolute left-0 w-screen border-t" />

      <Suspense>
        <Sections load={Singletons.PAGE} slug={params.slug} />
      </Suspense>
    </div>
  );
}

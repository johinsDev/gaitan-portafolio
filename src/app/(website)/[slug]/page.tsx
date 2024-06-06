import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { Page } from "@/components/pages/page/Page";
import { _generateMetadata } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadPage } from "@/sanity/loader/loadQuery";
const PagePreview = dynamic(
  () => import("@/components/pages/page/PagePreview"),
);

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

  if (draftMode().isEnabled) {
    return <PagePreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <Page data={initial.data} />;
}

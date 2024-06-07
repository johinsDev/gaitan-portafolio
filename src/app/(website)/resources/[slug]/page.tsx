import { _generateMetadata } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadResource } from "@/sanity/loader/loadQuery";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: page } = await loadResource(params.slug);

  return _generateMetadata({
    description: page?.seo?.description ?? page?.description,
    image: page?.seo?.image ?? page?.image?.image,
    title: page?.seo?.title ?? page?.title,
  });
}

export function generateStaticParams() {
  return generateStaticSlugs("resource");
}

export default async function Resource(props: Props) {
  const resource = await loadResource(props.params.slug);
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        {JSON.stringify(resource.data)}
      </div>
    </div>
  );
}

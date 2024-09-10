import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { _generateMetadata, urlForImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadResource } from "@/sanity/loader/loadQuery";
import { Metadata } from "next";
import Image from "next/image";

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

  const imageURL =
    resource.data?.image &&
    urlForImage(resource.data.image.image)
      ?.width(1200)
      .height(450)
      .fit("crop")
      .url();

  return (
    <div className="pt-16">
      <section className="w-full flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="font-bold text-lg md:text-4xl">
            {resource.data?.title}
          </div>

          {!!resource.data?.description && (
            <CustomPortableText value={resource.data?.description as any} />
          )}
        </div>
        <div className="w-full md:w-1/2 aspect-video relative">
          {imageURL && (
            <Image
              fill
              src={imageURL}
              alt={resource.data?.image?.alt ?? "resource"}
              className="object-contain rounded-2xl"
            />
          )}
        </div>
      </section>

      <div className="full-width bg-gray-50 py-20">
        <div className="main_container bg-white rounded-lg py-10 flex flex-col text-center items-center gap-8">
          <div className="font-bold text-2xl text-center">
            Lorem ipsum dolor sit amet
          </div>

          <form className="flex flex-col gap-4 w-full">
            <Input placeholder="Nombre comleto*" required className="h-14" />
            <Input
              placeholder="Email*"
              required
              type="email"
              className="h-14"
            />
            <Button className="mt-8">Descargar plantilla</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

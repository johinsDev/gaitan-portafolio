import { urlForImage } from "@/sanity/lib/utils";
import { Resource } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  resources: Resource[] | null;
};

export function ResourcesLayout({ resources }: Props) {
  if (!resources) {
    return null;
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 mt-6">
      {resources.map((resource) => {
        const image = resource?.image?.image;

        const imageUrl =
          image && urlForImage(image)?.height(220).width(420).fit("crop").url();

        if (!imageUrl || !resource.resource) return null;

        return (
          <Link
            href={resource.resource}
            key={resource._id}
            className="flex flex-col items-center gap-8 text-center"
            download={resource.title}
            target="_blank"
          >
            <Image
              src={imageUrl}
              width={420}
              height={220}
              alt={resource.title}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              blurDataURL={image.asset?.metadata?.lqip}
              placeholder="blur"
              className="object-cover object-top aspect-video w-full"
            />
            <div className="font-bold text-3xl">{resource.title}</div>
          </Link>
        );
      })}
    </section>
  );
}

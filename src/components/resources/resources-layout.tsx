import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { Resource } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  resources: Resource[] | null;
};

export function ResourcesLayout({ resources }: Props) {
  console.log(resources);
  if (!resources) {
    return null;
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 mt-6">
      {
        resources.map((resource) => {
          const image = resource?.image?.image;

          const imageUrl =
            image && urlForImage(image)?.height(220).width(420).fit("crop").url();

          const href = resolveHref(resource._type, resource.slug);

          if (!imageUrl || !href) return null;

          return (
            <Link
              href={href}
              key={resource._id}
              className="flex flex-col items-center gap-8 text-center"
            >
              <Image
                src={imageUrl}
                width={420}
                height={220}
                alt={resource.title}
                sizes="(min-width: 1024px) 33cw, (min-width: 640px) 50vw, 100vw"
                blurDataURL={image.asset?.metadata?.lqip}
                placeholder="blur"
                className="object-cover object-top aspect-video w-full"
              />
              <div className="font-bold text-3xl">{resource.title}</div>
            </Link>
          );
        }
        )
      }
    </section>
  );
}

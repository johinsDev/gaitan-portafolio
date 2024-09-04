"use client";
import { resolveHref, urlForImage } from "@/sanity/lib/utils";
import { BlogPagePayload, LastEntriesSection, Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "../carousel";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  data?: LastEntriesSection | null;
  lastEntries?: Post[];
  blogPage?: BlogPagePayload | null;
};

export function LastEntriesSectionLayout({ data, lastEntries, blogPage }: Props) {
  if (!data) return null;

  return (
    <section className="bg-white py-12 w-full full-width">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        {data.title}{" "}
      </div>
      {!!data.description && (
        <div className="text-center text-body mt-8">
          <CustomPortableText value={data.description as any} />
        </div>
      )}
      <div className="main_container mt-12">
        <Carousel className="w-full">
          <CarouselContent className="-ml-8">
            {lastEntries?.map((post) => {
              const image = post?.image?.image;

              const imageUrl =
                image && urlForImage(image)?.height(220).width(420).fit("crop").url();

              const href = resolveHref(post._type, post.slug)?.replace(
                "/blog",
                `/${blogPage?.slug ?? "blog"}`,
              );

              if (!imageUrl || !href) return null;

              return (
                <CarouselItem
                  key={post._id}
                  className="basis-3/4 lg:basis-1/3 pl-8"
                >
                  <Link
                    href={href}
                    className="flex flex-col items-center gap-8 text-center"
                  >
                    <Image
                      src={imageUrl}
                      width={420}
                      height={220}
                      alt={post.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      blurDataURL={image.asset?.metadata?.lqip}
                      placeholder="blur"
                      className="object-cover w-full aspect-video rounded-2xl"
                    />

                    <div className="p-6 py-2 flex flex-col items-center justify-center text-center">
                      <div className="font-bold text-3xl mt-6">{post.title}</div>
                    </div>
                  </Link>
                </CarouselItem>

              );
            }
            )}
          </CarouselContent>
        </Carousel>

      </div>
    </section >
  );
}

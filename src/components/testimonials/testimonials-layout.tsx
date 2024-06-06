"use client";
import { urlForImage } from "@/sanity/lib/utils";
import { TestimonialSection } from "@/types";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../carousel";

type Props = {
  data?: TestimonialSection | null;
};

export function TestimonialsLayout({ data }: Props) {
  if (!data) return null;

  return (
    <section className="bg-gray-100 py-12 w-full full-width">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        {data?.title}
      </div>

      <div className="main_container mt-12">
        <Carousel className="w-full">
          <CarouselContent className="-ml-12">
            {data.testimonials?.map((testimonial, index) => {
              const image = testimonial.image?.image;

              const imageURL =
                image &&
                urlForImage(image)?.height(560).width(420).fit("crop").url();

              return (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-12"
                >
                  <div className="flex flex-col gap-4 items-center text-center">
                    {imageURL && (
                      <Image
                        src={imageURL}
                        width={54}
                        height={54}
                        alt={
                          testimonial.image?.alt ??
                          testimonial.name ??
                          "Testimonial Image"
                        }
                        blurDataURL={image.asset.metadata.lqip}
                        placeholder="blur"
                        className="rounded-full size-14 object-cover aspect-square flex-shrink-0"
                      />
                    )}
                    <div className="font-bold text-xl font-noto">
                      {testimonial.name}
                    </div>
                    <div>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index} className="text-yellow-400">
                          ⭐️
                        </span>
                      ))}
                    </div>
                    <div className="text-base line-clamp-4">
                      {testimonial.review}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

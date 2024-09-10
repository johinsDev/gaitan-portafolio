'use client';

import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";
import { Hero } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../carousel";
import { Cta } from "../cta";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  hero?: Hero;
};

export function HeroLayout({ hero }: Props) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onChange = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onChange);

    return () => {
      api.off("select", onChange);
    };
  }, [api]);

  if (!hero?.slides?.length) return null;

  return (
    <header
      className="full-width"
      style={{ backgroundColor: hero?.bgColor?.hex }}
    >
      <Carousel className="w-full main_container py-8 lg:py-24" setApi={setApi}>
        <CarouselContent>
          {hero?.slides?.map((slide, index) => {
            const image = slide.image?.image;

            const imageURL = image && urlForImage(image)?.url();

            return (
              <CarouselItem
                key={index}
                className="flex items-center flex-col-reverse lg:flex-row gap-12 lg:gap-4"
              >
                <div className="flex flex-col w-full items-center text-center lg:text-left lg:items-start lg:w-1/2 xl:w-2/3">
                  <CustomPortableText value={slide.content as any} />

                  {slide.cta && <Cta className="mt-12 w-fit" {...slide.cta} />}
                </div>

                <div className="relative w-full lg:w-1/2 xl:w-1/3 aspect-square max-h-80 lg:aspect-square overflow-hidden rounded-lg lg:max-h-none">
                  {!!imageURL && (
                    <Image
                      src={imageURL}
                      alt="hero"
                      fill
                      className="object-contain rounded-lg"
                      priority
                      blurDataURL={image.asset.metadata.lqip}
                    />
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div>
          <div className="flex gap-4 justify-center mt-8 lg:mt-12">
            {hero?.slides?.map((_, index) => (
              <button
                onClick={() => api?.scrollTo(index)}
                key={index}
                className={cn("size-3 lg:size-4 bg-neutral-400 rounded-full focus:outline-none", {
                  "bg-neutral-600": currentSlide === index
                })}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </header>
  );
}

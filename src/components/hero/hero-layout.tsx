"use client";

import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";
import { Hero } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../carousel";
import { Cta } from "../cta";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  hero?: Hero;
};

export function HeroLayout({ hero }: Props) {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
  }, [api]);

  if (!hero?.slides?.length) return null;

  return (
    <header
      className="full-width"
      style={{ backgroundColor: hero?.bgColor?.hex }}
    >
      <Carousel
        className="w-full main_container py-8 lg:py-12"
        setApi={setApi}
        plugins={[
          Autoplay({
            playOnInit: true,
            delay: 3000,
            active: hero.slides.length > 1,
            stopOnLastSnap: false,
            stopOnFocusIn: false,
            stopOnInteraction: false,
          }) as any,
        ]}
        opts={{
          active: hero.slides.length > 1,
        }}
      >
        <CarouselContent>
          {hero?.slides?.map((slide, index) => {
            const image = slide.image?.image;

            const imageURL = image && urlForImage(image)?.url();

            return (
              <CarouselItem
                key={index}
                className={cn(
                  "flex items-center flex-col-reverse lg:flex-row gap-12 lg:gap-4",
                  {
                    "lg:gap-12": hero.slides.length === 1,
                  },
                )}
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
      </Carousel>
    </header>
  );
}

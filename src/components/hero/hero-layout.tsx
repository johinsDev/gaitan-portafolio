import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/utils";
import { Hero } from "@/types";
import Image from "next/image";
import { Cta } from "../cta";
import { CustomPortableText } from "../shared/CustomPortableText";

type Props = {
  hero?: Hero;
};

export function HeroLayout({ hero }: Props) {
  const image = hero?.image?.image;

  const imageUrl =
    image && urlForImage(image)?.height(560).width(420).fit("crop").url();

  if (hero?.content) {
    return (
      <div className={cn("flex items-center flex-col lg:gap-4")}>
        <div className="w-full flex flex-col items-center">
          <h1 className="text-title font-bold leading-title text-center md:text-left">
            {hero?.title}
          </h1>
        </div>

        <div
          className={cn(
            "w-full flex lg:mt-12 mt-4 items-center text-center gap-6",
            {
              "flex-col lg:flex-row-reverse lg:text-left":
                hero?.position === "left",
              "flex-col-reverse lg:flex-row lg:text-left":
                hero?.position === "right",
            },
          )}
        >
          <div className="w-full flex flex-col md:items-start lg:w-7/12">
            <CustomPortableText value={hero?.content as any} />
            {!!hero?.cta && <Cta className="w-40 mt-8" {...hero.cta} />}
          </div>

          {!!imageUrl && (
            <div
              className={cn(
                "flex-shrink-0 w-full lg:w-5/12 flex mt-4 lg:mt-0 justify-center",
              )}
            >
              <Image
                src={imageUrl}
                width={420}
                height={560}
                alt={"hero"}
                className="w-full object-contain aspect-[3/4] lg:object-cover md:aspect-video lg:aspect-[3/4] lg:max-w-sm"
                priority
                blurDataURL={image.asset.metadata.lqip}
                placeholder="blur"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col-reverse md:flex-row lg:gap-4">
      <div>
        <CustomPortableText value={hero?.content as any} />
      </div>

      <div className="w-full flex flex-col items-center md:w-7/12 md:items-start">
        <h1 className="text-title font-bold leading-title text-center mt-10 md:text-left">
          {hero?.title}
        </h1>

        {!!hero?.cta && <Cta className="w-40 mt-8" {...hero.cta} />}
      </div>

      {!!imageUrl && (
        <div className="flex-shrink-0 w-full md:w-5/12 flex justify-end">
          <Image
            src={imageUrl}
            width={420}
            height={560}
            alt={"hero"}
            className="w-full object-contain aspect-[3/4] max-w-sm"
            priority
            blurDataURL={image.asset.metadata.lqip}
            placeholder="blur"
          />
        </div>
      )}
    </div>
  );
}

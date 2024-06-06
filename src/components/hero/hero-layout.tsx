import { urlForImage } from "@/sanity/lib/utils";
import { Hero } from "@/types";
import Image from "next/image";
import { Cta } from "../cta";

type Props = {
  hero?: Hero;
};

export function HeroLayout({ hero }: Props) {
  const image = hero?.image?.image;

  const imageUrl =
    image && urlForImage(image)?.height(560).width(420).fit("crop").url();

  return (
    <div className="flex items-center flex-col-reverse md:flex-row lg:gap-4">
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
            className="w-full object-cover aspect-[3/4] max-w-sm"
            priority
          />
        </div>
      )}
    </div>
  );
}

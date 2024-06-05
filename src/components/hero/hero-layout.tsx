import { getVariantButton, resolveHref } from "@/sanity/lib/utils";
import { Hero } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";

type Props = {
  hero?: Hero
}

export function HeroLayout({ hero }: Props) {
  const href = resolveHref(hero?.cta?.link?._type, hero?.cta?.link?.slug) || hero?.cta?.externalLink || "#"

  return <div className="flex items-center flex-col-reverse md:flex-row lg:gap-4">
    <div className="w-full flex flex-col items-center md:w-7/12 md:items-start">
      <h1 className="text-title font-bold leading-title text-center mt-10 md:text-left">
        {hero?.title}
      </h1>

      {
        !!hero?.cta && (
          <Button className="w-40 mt-8" variant={getVariantButton(hero.cta.variant)} asChild>
            <Link href={href}>
              {hero.cta?.title}
            </Link>
          </Button>
        )
      }

    </div>

    <div className="flex-shrink-0 w-full md:w-5/12 flex justify-end">
      <Image src='/main.jpg' width={427} height={534} alt='Juan Gaitan' />
    </div>
  </div>

}

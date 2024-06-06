import { CallToActionSection } from "@/components/call-to-action-section";
import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";
import { Feature } from "@/components/feature-section";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats-section";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import { SectionsList } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data: homePage } = await loadHomePage()

  return _generateMetadata(homePage.seo)
}

export default async function Home() {
  const home = await loadHomePage();

  return (
    <div className="flex flex-col gap-4">
      <Suspense>
        <Hero />
      </Suspense>

      <Suspense>
        {home.data?.sections?.map((section, index) => {
          switch (section._type) {
            case SectionsList.CTA_SECTION:
              return <CallToActionSection _key={section._key} key={section._key} />;
            case SectionsList.STATS_SECTION:
              return <Stats key={section._key} _key={section._key} />;
            case SectionsList.FEATURE_SECTION:
              return <Feature key={section._key} _key={section._key} />;
            default:
              return null;
          }
        })}
      </Suspense>

      <section className="bg-gray-100 py-12 w-full full-width">
        <div className='text-sub-title leading-sub-title font-bold text-center'>
          Testimonios
        </div>

        <div className="main_container mt-12">
          <Carousel className="w-full">
            <CarouselContent className="-ml-12">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-12">
                  <div className="flex flex-col gap-4 items-center text-center">
                    <Image src='/main.jpg' width={54} height={54} alt='Juan Gaitan' className="rounded-full size-14 flex-shrink-0" />
                    <div className="font-bold text-xl font-noto">
                      Client, name {index}
                    </div>
                    <div>
                      ⭐️⭐️⭐️⭐️⭐️
                    </div>
                    <div className="text-base line-clamp-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur piscing elit Lorem ipsum dolor sit amet, consectetur .
                    </div>
                  </div>
                </CarouselItem>
              ))}


            </CarouselContent>
          </Carousel>

        </div>
      </section >
    </div >
  )
}

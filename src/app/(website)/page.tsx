import { Button } from "@/components/button";
import { CallToActionSection } from "@/components/call-to-action-section";
import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";
import { Hero } from "@/components/hero";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import cn from "clsx";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  const home = await loadHomePage();

  console.log(home.data.sections);
  return (
    <div className="flex flex-col gap-4">
      <Suspense>
        <Hero />
      </Suspense>

      <Suspense>
        {home.data?.sections?.map((section, index) => {
          switch (section._type) {
            case "ctaSection":
              return <CallToActionSection key={index} />;
            default:
              return null;
          }
        })}
      </Suspense>


      <section className="py-12">
        <h2 className={cn("text-sub-title font-bold text-center font-noto")}>Lorem ipsumdolo sit amet</h2>

        <div className="mt-8 lg:mt-16 grid lg:grid-cols-3 lg:*:border-r-black lg:*:border-r-[1.5px] lg:[&>*:first-child]:border-l-black lg:[&>*:first-child]:border-l-[1.5px]">
          <div className="py-4 lg:px-16 flex items-center lg:items-start lg:flex-col gap-4">
            <div className="text-metrics leading-metrics font-bold flex-1">$150K</div>
            <div className="h-full w-0.5 bg-foreground lg:hidden" />
            <div className="text-body2 leading-body2 flex-1 md:flex-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </div>

          <div className="py-4 lg:px-16 flex items-center lg:items-start lg:flex-col gap-4">
            <div className="text-metrics leading-metrics font-bold flex-1">7.9%</div>
            <div className="h-full w-0.5 bg-foreground lg:hidden" />
            <div className="text-body2 leading-body2 flex-1 md:flex-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </div>

          <div className="py-4 lg:px-16 flex items-center lg:items-start lg:flex-col gap-4">
            <div className="text-metrics leading-metrics font-bold flex-1">40%</div>
            <div className="h-full w-0.5 bg-foreground lg:hidden" />
            <div className="text-body2 leading-body2 flex-1 md:flex-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 flex items-center flex-col-reverse md:flex-row gap-4">
        <div className="flex-1 flex flex-col items-center text-center md:text-left md:items-start">
          <div className="text-body1 leading-body1 w-full lg:w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur piscing elit Lorem ipsum dolor sit amet, consectetur .
          </div>

          <Button className="w-40 mt-8">
            Empezar!
          </Button>
        </div>
        <div className="flex-shrink-0 flex justify-end">
          <Image src='/main.jpg' width={444} height={300} alt='Juan Gaitan' className="object-cover object-top aspect-video" />
        </div>
      </section>

      <section className="py-8 md:py-12 flex items-center gap-4 flex-col md:flex-row">
        <div className="flex-shrink-0 flex justify-start">
          <Image src='/main.jpg' width={444} height={300} alt='Juan Gaitan' className="object-cover object-top aspect-video" />
        </div>

        <div className="flex-1 items-center md:items-end flex flex-col">
          <div className="text-body1 leading-body1 lg:w-3/4 text-center md:text-right w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur piscing elit Lorem ipsum dolor sit amet, consectetur .
          </div>

          <Button className="w-40 mt-8">
            Empezar!
          </Button>
        </div>
      </section>


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

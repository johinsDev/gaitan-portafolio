import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";
import { CallToAction } from "@/components/home/call-to-action";
import { YoutubeVideo } from "@/components/home/youtube-video";
import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="flex flex-col gap-4">
      <div className='text-sub-title leading-sub-title font-bold text-center'>Sobre mi</div>

      <section>
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 mt-16">
          <div className="w-full md:w-2/3">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan pretium pretium. Nullam eros erat, imperdiet vel ante ut, rhoncus ullamcorper diam. Duis dictum rutrum vulputate. Suspendisse eu urna mi..
              mperdiet vel ante ut, rhoncus ullamcorper diam. Duis dictum rutrum vulputate. Suspendisse eu urna mi..
            </p>

            <ul className="mt-9 space-y-4 pl-2">
              <li className="flex items-center gap-2">
                <div className="size-1.5 bg-foreground rounded-full" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="size-1.5 bg-foreground rounded-full" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="size-1.5 bg-foreground rounded-full" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="size-1.5 bg-foreground rounded-full" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing</span>
              </li>
            </ul>
          </div>

          <div className="flex-shrink-0 w-full md:w-1/3">
            <Image src='/main.jpg' width={427} height={534} alt='Juan Gaitan' />
          </div>
        </div>
      </section>

      <YoutubeVideo />

      <section className="bg-gray-200 py-12 mt-24 w-full full-width">
        <div className='text-sub-title leading-sub-title font-bold text-center'>
          Conoce mas
        </div>

        <div className="main_container mt-12">
          <Carousel className="w-full">
            <CarouselContent className="-ml-12">
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-12">
                  <div className="bg-white rounded-2.5xl aspect-video">

                  </div>
                </CarouselItem>
              ))}


            </CarouselContent>
          </Carousel>

          <CallToAction className="mt-16" />
        </div>
      </section>
    </div>
  )
}

import { CallToAction } from "@/components/home/call-to-action"
import Image from "next/image"
import Link from "next/link"

export default function Resources() {
  return (
    <div className="flex flex-col gap-4">
      <div className='text-sub-title leading-sub-title font-bold text-center'>Recursos gratuitos</div>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 mt-24">
        <Link
          href='/resources/my-resource'
          className="flex flex-col items-center gap-8 text-center">
          <Image src='/main.jpg' width={315} height={210} alt='Juan Gaitan' className="object-cover object-top aspect-video w-full" />
          <div className="font-bold text-3xl">título de  recurso</div>
        </Link>

        <Link
          href='/resources/my-resource'
          className="flex flex-col items-center gap-8 text-center">
          <Image src='/main.jpg' width={315} height={210} alt='Juan Gaitan' className="object-cover object-top aspect-video w-full" />
          <div className="font-bold text-3xl">título de  recurso</div>
        </Link>

        <Link
          href='/resources/my-resource'
          className="flex flex-col items-center gap-8 text-center">
          <Image src='/main.jpg' width={315} height={210} alt='Juan Gaitan' className="object-cover object-top aspect-video w-full" />
          <div className="font-bold text-3xl">título de  recurso</div>
        </Link>

        <Link
          href='/resources/my-resource'
          className="flex flex-col items-center gap-8 text-center">
          <Image src='/main.jpg' width={315} height={210} alt='Juan Gaitan' className="object-cover object-top aspect-video w-full" />
          <div className="font-bold text-3xl">título de  recurso</div>
        </Link>

        <Link
          href='/resources/my-resource'
          className="flex flex-col items-center gap-8 text-center">
          <Image src='/main.jpg' width={315} height={210} alt='Juan Gaitan' className="object-cover object-top aspect-video w-full" />
          <div className="font-bold text-3xl">título de  recurso</div>
        </Link>

        <Link
          href='/resources/my-resource'
          className="flex flex-col items-center gap-8 text-center">
          <Image src='/main.jpg' width={315} height={210} alt='Juan Gaitan' className="object-cover object-top aspect-video w-full" />
          <div className="font-bold text-3xl">título de  recurso</div>
        </Link>
      </section>


      <section className="bg-gray-200 py-20 mt-24 w-full full-width">
        <div className="main_container">
          <CallToAction />
        </div>
      </section>
    </div>
  )
}

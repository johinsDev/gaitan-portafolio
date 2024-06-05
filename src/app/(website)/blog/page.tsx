import Image from "next/image";
import Link from "next/link";


export default function Blog() {
  return (
    <div className="flex flex-col gap-4">
      <div className='text-sub-title leading-sub-title font-bold text-center'>Blog</div>

      <section className="flex flex-col gap-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {
            new Array(18).fill(0).map((_, i) => (
              <Link href="/blog/1" className="flex flex-col bg-white rounded-2xl overflow-hidden" key={i}>
                <Image src="/real-estate.jpg" width={370} height={240} alt="Real Estate" className="object-cover w-full aspect-video rounded-2xl" />

                <div className="p-6 py-2 flex flex-col items-center justify-center text-center">
                  <div className="font-bold text-3xl mt-6">
                    Título de la entrada del blog
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </section>

      <section className="bg-gray-200 py-12 mt-24 w-full full-width">
        <div className="main_container">
          {/* <CallToAction /> */}
        </div>
      </section>
    </div>
  )
}

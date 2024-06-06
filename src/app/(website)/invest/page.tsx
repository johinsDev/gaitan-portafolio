import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Image from "next/image";
import Link from "next/link";

export default function Invest() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        Listings
      </div>

      <section className="flex flex-col gap-8 py-12">
        <div className="flex flex-col items-center lg:flex-row gap-8">
          <Input type="text" placeholder="Pais" className="flex-1" />
          <Input type="text" placeholder="Ciudad" className="flex-1" />
          <Button className="w-40 flex-shrink-0">Limpiar</Button>
        </div>

        <div className="w-full h-0.5 bg-gray-200" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {new Array(18).fill(0).map((_, i) => (
            <Link
              href="/listing/1"
              className="flex flex-col bg-gray-200 rounded-2xl overflow-hidden"
              key={i}
            >
              <Image
                src="/real-estate.jpg"
                width={370}
                height={240}
                alt="Real Estate"
                className="object-cover w-full aspect-video rounded-t-2xl"
              />

              <div className="p-6 flex flex-col items-center justify-center text-center text-2xl">
                <div>City</div>
                <div className="font-bold">Property name</div>
                <div className="font-bold text-3xl mt-6">8.9%*</div>
                <div className="text-xl">Lorem ipsum sit amet</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

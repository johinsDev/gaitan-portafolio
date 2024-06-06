import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";
import { Button } from "@/components/button";
import Image from "next/image";

export default function Course() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        Cursos
      </div>

      <section className="flex items-center flex-col-reverse justify-between gap-8 py-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-lg md:text-xl">
            <div className="inline md:block">
              Genera más del 30% de rentabilidad con{" "}
            </div>
            <div className="inline md:block">
              inversiones en Real Estate en el 2024
            </div>
          </div>
          <Button className="w-40 mt-8 md:mt-14">Empezar!</Button>
        </div>

        <div className="flex-shrink-0">
          <Image
            src="/real-estate.jpg"
            width={450}
            height={300}
            alt="Real Estate"
            className="object-cover h-[300px] aspect-video rounded-2xl"
          />
        </div>
      </section>

      <section className="flex flex-col items-center justify-between gap-8 py-12">
        <div className="text-sub-title leading-sub-title font-bold text-center">
          Preguntas frecuentes
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}

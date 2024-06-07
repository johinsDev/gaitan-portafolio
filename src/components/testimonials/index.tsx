import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import { SectionsList, Singletons, TestimonialSection } from "@/types";
import { TestimonialsLayout } from "./testimonials-layout";

const TestimonialsPreview = dynamic(() => import("./testimonials-preview"));

type Props = {
  _key: string;
  load?: Singletons;
};

export async function Testimonials({ _key: key, load }: Props) {
  const data = await loadSingleton(load);

  const testimonials = getSection<TestimonialSection>(
    data.data.sections ?? [],
    SectionsList.TESTIMONIAL_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <TestimonialsPreview initial={data} _key={key} load={load} />;
  }

  return <TestimonialsLayout data={testimonials} />;
}

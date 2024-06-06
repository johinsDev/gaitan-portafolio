import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { getSection } from "@/sanity/lib/utils";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import { SectionsList, TestimonialSection } from "@/types";
import { TestimonialsLayout } from "./testimonials-layout";

const TestimonialsPreview = dynamic(() => import("./testimonials-preview"));

type Props = {
  _key: string;
};

export async function Testimonials({ _key: key }: Props) {
  const home = await loadHomePage();

  const testimonials = getSection<TestimonialSection>(
    home.data.sections ?? [],
    SectionsList.TESTIMONIAL_SECTION,
    key,
  );

  if (draftMode().isEnabled) {
    return <TestimonialsPreview initial={home} _key={key} />;
  }

  return <TestimonialsLayout data={testimonials} />;
}

"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { homePageQuery } from "@/sanity/lib/queries";
import { getSection } from "@/sanity/lib/utils";
import { HomePagePayload, SectionsList, TestimonialSection } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { TestimonialsLayout } from "./testimonials-layout";

type Props = {
  initial: QueryResponseInitial<HomePagePayload>;
  _key: string;
};

export default function TestimonialsPreview(props: Props) {
  const { data: home } = useQuery<HomePagePayload>(
    homePageQuery,
    {},
    {
      initial: props.initial,
    },
  );

  const testimonials = getSection<TestimonialSection>(
    home?.sections ?? [],
    SectionsList.TESTIMONIAL_SECTION,
    props._key,
  );

  return <TestimonialsLayout data={testimonials} />;
}

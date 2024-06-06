// define testimonial schema document, name, review, rating, image

import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "text",
      name: "review",
      title: "Review",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "number",
      name: "rating",
      title: "Rating",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "customImage",
      name: "image",
      title: "Image",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "name",
      review: "review",
      rating: "rating",
      media: "image",
    },
    prepare(selection) {
      const { name, review, rating, media } = selection;
      return {
        title: name,
        subtitle: `${rating} stars`,
        media,
      };
    },
  },
});

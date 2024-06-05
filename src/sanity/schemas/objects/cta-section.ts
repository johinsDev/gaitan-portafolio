import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaSection",
  title: "Call to action section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "cta",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No title",
      };
    },
  },
});

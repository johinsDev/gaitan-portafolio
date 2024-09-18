import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSlide",
  title: "Hero slide",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "customImage",
    }),
    defineField({
      name: "content",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                title: "Inline Icon",
                name: "inlineicon",
                type: "image",
                icon: () => "🖼️",
              },
            ],
          },
        },
      ],
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
      description: "description",
    },
    prepare({ title, description }) {
      return {
        title: title || "No title",
        subtitle: `Hero slide: ${description || "No description"}`,
      };
    },
  },
});

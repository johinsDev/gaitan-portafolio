//define resource schema title, description image

import { Pickaxe } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  icon: Pickaxe,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: "title",
      description: "This field is the title of your personal website.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    // seo
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    // slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "customImage",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});

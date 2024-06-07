import { CogIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    // title navbar
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of your site.",
    }),
    // color theme
    defineField({
      name: "theme",
      title: "Theme",
      type: "color",
      description: "The color theme of your site.",
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: "menuItems",
      title: "Menu Item list",
      description: "Links displayed on the header of your site.",
      type: "array",
      of: [
        {
          title: "Reference",
          type: "reference",
          to: [
            {
              type: "home",
            },
            {
              type: "page",
            },
            {
              type: "about",
            },
            {
              type: "course",
            },
            {
              type: "resources",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "footer",
      description:
        "This is a block of text that will be displayed at the bottom of the page.",
      title: "Footer Info",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "SEO settings default for all pages.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Menu Items",
      };
    },
  },
});

// create allied section schema with title(optional), description(optional), and list of allieds image

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "lastEntriesSection",
  title: "Last entries section",
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
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
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
          type: "block",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No title",
        subtitle: "Last entries section",
      };
    },
  },
});

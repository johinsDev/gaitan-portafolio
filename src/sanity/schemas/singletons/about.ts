import { PackageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: PackageIcon,
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
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "hero",
      title: "Hero section",
      type: "hero",
    }),
    // define array of sections
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "ctaSection",
        }),
        defineArrayMember({
          type: "stats",
        }),
        defineArrayMember({
          type: "featureSection",
        }),
        defineArrayMember({
          type: "testimonialSection",
        }),
        defineArrayMember({
          type: "youtubeSection",
        }),
        defineArrayMember({
          type: "accordion",
        }),
        defineArrayMember({
          type: "know_more",
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
        subtitle: "About",
        title,
      };
    },
  },
});

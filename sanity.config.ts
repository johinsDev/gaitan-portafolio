"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import * as resolve from "@/sanity/plugins/resolve";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import page from "@/sanity/schemas/documents/page";
import project from "@/sanity/schemas/documents/project";
import testimonial from "@/sanity/schemas/documents/testimonial";
import cta from "@/sanity/schemas/objects/cta";
import ctaSection from "@/sanity/schemas/objects/cta-section";
import duration from "@/sanity/schemas/objects/duration";
import feature from "@/sanity/schemas/objects/feature";
import hero from "@/sanity/schemas/objects/hero";
import image from "@/sanity/schemas/objects/image";
import milestone from "@/sanity/schemas/objects/milestone";
import seo from "@/sanity/schemas/objects/seo";
import stat from "@/sanity/schemas/objects/stat";
import stats from "@/sanity/schemas/objects/stats";
import testimonialSection from "@/sanity/schemas/objects/testimonial-section";
import timeline from "@/sanity/schemas/objects/timeline";
import home from "@/sanity/schemas/singletons/home";
import settings from "@/sanity/schemas/singletons/settings";

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  "Next.js Personal Website with Sanity.io";

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      testimonial,
      duration,
      page,
      project,
      // Objects
      milestone,
      timeline,
      cta,
      hero,
      ctaSection,
      image,
      seo,
      stat,
      stats,
      feature,
      testimonialSection,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft",
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

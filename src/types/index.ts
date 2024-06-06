import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

import type { Image, PortableTextBlock } from "sanity";

export enum SectionsList {
  CTA_SECTION = "ctaSection",
  STATS_SECTION = "stats",
  FEATURE_SECTION = "featureSection",
  TESTIMONIAL_SECTION = "testimonialSection",
}

export interface Seo {
  description?: PortableTextBlock[];
  image?: Image;
  title?: string;
}

export interface CustomImage {
  alt?: string;
  image?: Image;
}
export interface Cta {
  externalLink?: string;
  link?: {
    _type: string;
    slug?: string;
    title?: string;
  };
  title?: string;
  variant?: string;
}

export interface Stat {
  description?: string;
  icon?: CustomImage;
  title?: string;
  value?: string;
}

export interface StatsSection {
  stats?: Stat[];
  title?: string;
  _type: SectionsList.STATS_SECTION;
  _key: string;
}

export interface TestimonialSection {
  testimonials?: TestimonialPayload[];
  title?: string;
  _type: SectionsList.TESTIMONIAL_SECTION;
  _key: string;
}

export interface FeatureSection {
  content?: PortableTextBlock[];
  image?: CustomImage;
  position?: PositionImageList;
  title?: string;
  _type: SectionsList.FEATURE_SECTION;
  cta?: Cta;
  _key: string;
}

export interface CtaSection {
  cta?: Cta;
  description?: string;
  title?: string;
  _type: SectionsList.CTA_SECTION;
  _key: string;
}

export type PositionImageList = "left" | "right";

export interface Hero {
  description?: string;
  image?: CustomImage;
  title?: string;
  cta?: Cta;
}

export interface MenuItem {
  _type: string;
  slug?: string;
  title?: string;
}

export interface MilestoneItem {
  description?: string;
  duration?: {
    start?: string;
    end?: string;
  };
  image?: Image;
  tags?: string[];
  title?: string;
}

export interface ShowcaseProject {
  _type: string;
  coverImage?: Image;
  overview?: PortableTextBlock[];
  slug?: string;
  tags?: string[];
  title?: string;
}

// Page payloads

export type Sections =
  | CtaSection
  | StatsSection
  | FeatureSection
  | TestimonialSection;

export interface HomePagePayload {
  footer?: PortableTextBlock[];
  showcaseProjects?: ShowcaseProject[];
  title?: string;
  hero?: Hero;
  sections?: Sections[];
  seo?: Seo;
}

export interface PagePayload {
  body?: PortableTextBlock[];
  name?: string;
  title?: string;
  slug?: string;
  seo?: Seo;
}

export interface ProjectPayload {
  client?: string;
  coverImage?: Image;
  description?: PortableTextBlock[];
  duration?: {
    start?: string;
    end?: string;
  };
  overview?: PortableTextBlock[];
  site?: string;
  slug: string;
  tags?: string[];
  title?: string;
}

export interface SettingsPayload {
  footer?: PortableTextBlock[];
  menuItems?: MenuItem[];
  title?: string;
  seo?: Seo;
}

export interface TestimonialPayload {
  image?: CustomImage;
  name?: string;
  rating?: number;
  review?: string;
}

import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

import type { Image, ImageAsset, PortableTextBlock } from "sanity";

export enum SectionsList {
  CTA_SECTION = "ctaSection",
  STATS_SECTION = "stats",
  FEATURE_SECTION = "featureSection",
  TESTIMONIAL_SECTION = "testimonialSection",
  YOUTUBE_SECTION = "youtubeSection",
  ACCORDION_SECTION = "accordion",
  KNOW_MORE = "know_more",
}

export interface Seo {
  description?: PortableTextBlock[];
  image?: Image;
  title?: string;
}

export interface CustomImage {
  alt?: string;
  image?: Image & {
    asset: ImageAsset;
  };
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

export interface KnowMore {
  customPortableText?: PortableTextBlock[];
  description?: PortableTextBlock[];
  gallery?: Gallery;
  title?: string;
  _type: SectionsList.KNOW_MORE;
  _key: string;
}

export interface TestimonialSection {
  testimonials?: TestimonialPayload[];
  title?: string;
  _type: SectionsList.TESTIMONIAL_SECTION;
  _key: string;
}

export interface YoutubeSection {
  description?: PortableTextBlock[];
  title?: string;
  url: string;
  _type: SectionsList.YOUTUBE_SECTION;
  _key: string;
  videoTitle?: string;
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
  description?: PortableTextBlock[];
  title?: string;
  _type: SectionsList.CTA_SECTION;
  _key: string;
}

export type PositionImageList = "left" | "right";

export interface Hero {
  content?: PortableTextBlock[];
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
  | TestimonialSection
  | YoutubeSection
  | AccordionSection
  | KnowMore;

export enum Singletons {
  ABOUT = "about",
  HOME = "home",
  SETTINGS = "settings",
  COURSE = "course",
  RESOURCES = "resources",
  BLOG = "blog",
}

export interface HomePagePayload extends FullPagePayload {
  _type: Singletons.HOME;
}

export interface AboutPagePayload extends FullPagePayload {
  _type: Singletons.ABOUT;
}

export interface ResourcesPagePayload extends FullPagePayload {
  _type: Singletons.RESOURCES;
}

export interface CoursePagePayload extends FullPagePayload {
  _type: Singletons.COURSE;
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
  theme?: {
    alpha: 1;
    _type: "color";
    hex: string;
  } | null;
  contactCta?: Cta;
}

export interface AccordionSection {
  title?: string;
  description?: PortableTextBlock[];
  items?: {
    title?: string;
    description?: PortableTextBlock[];
    _key: string;
  }[];
  _type: SectionsList.ACCORDION_SECTION;
  _key: string;
}

export interface TestimonialPayload {
  image?: CustomImage;
  name?: string;
  rating?: number;
  review?: string;
}

type GalleryImage = CustomImage["image"] & {
  alt?: string;
};

export type GalleryDisplay = "stacked" | "inline" | "carousel";
export interface Gallery {
  images: GalleryImage[];
  display: GalleryDisplay;
  zoom: boolean;
}

export type ColorVariables = {
  "--background": string;
  "--foreground": string;
  "--card": string;
  "--card-foreground": string;
  "--popover": string;
  "--popover-foreground": string;
  "--primary": string;
  "--primary-foreground": string;
  "--secondary": string;
  "--secondary-foreground": string;
  "--muted": string;
  "--muted-foreground": string;
  "--accent": string;
  "--accent-foreground": string;
  "--destructive": string;
  "--destructive-foreground": string;
  "--border": string;
  "--input": string;
  "--ring": string;
};

export type FullPagePayload = {
  footer?: PortableTextBlock[];
  showcaseProjects?: ShowcaseProject[];
  title?: string;
  hero?: Hero;
  sections?: Sections[];
  seo?: Seo;
};

export type Resource = {
  _id: string;
  description: PortableTextBlock[];
  image: CustomImage;
  title: string;
  _type: string;
  slug: string;
  seo?: Seo;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  content: PortableTextBlock[];
  image: CustomImage;
  seo?: Seo;
  _type: string;
};

export interface BlogPagePayload extends FullPagePayload {
  _type: Singletons.BLOG;
}

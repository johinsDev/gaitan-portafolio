import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

import type { Image, PortableTextBlock } from "sanity";

export enum SectionsList {
  CTA_SECTION = "ctaSection",
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

export interface CtaSection {
  cta?: Cta;
  description?: string;
  title?: string;
  _type: SectionsList.CTA_SECTION;
}

export interface Hero {
  description?: string;
  image?: Image;
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

export type Sections = CtaSection;

export interface HomePagePayload {
  footer?: PortableTextBlock[];
  overview?: PortableTextBlock[];
  showcaseProjects?: ShowcaseProject[];
  title?: string;
  hero?: Hero;
  sections?: Sections[];
}

export interface PagePayload {
  body?: PortableTextBlock[];
  name?: string;
  overview?: PortableTextBlock[];
  title?: string;
  slug?: string;
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
  ogImage?: Image;
}

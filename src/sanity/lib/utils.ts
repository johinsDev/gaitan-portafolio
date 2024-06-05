import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { ButtonProps } from "@/components/button";
import { dataset, projectId } from "@/sanity/lib/api";
import { Sections, SectionsList, Seo } from "@/types";
import capitalize from "just-capitalize";
import flush from "just-flush";
import { Metadata } from "next";
import { toPlainText } from "next-sanity";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}

export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case "home":
      return "/";
    case "page":
      return slug ? `/${slug}` : undefined;
    case "project":
      return slug ? `/projects/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}

export function getVariantButton(
  variant: string | null | undefined
): ButtonProps["variant"] {
  if (variant === "primary") {
    return "default";
  }

  return variant as ButtonProps["variant"];
}

export function getSection<T>(
  sections: Sections[],
  type: SectionsList
): T | null {
  return (sections.find((section) => section._type === type) as T) ?? null;
}

export function _generateMetadata(seo?: Seo): Metadata {
  const ogImage = urlForOpenGraphImage(seo?.image);

  return flush({
    title: seo?.title ? capitalize(seo?.title) : undefined,
    description: seo?.description ? toPlainText(seo?.description) : undefined,
    image: ogImage ? { url: ogImage } : undefined,
  });
}

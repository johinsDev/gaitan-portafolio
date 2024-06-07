import { groq } from "next-sanity";

const DEFAULT_QUERY = `
  _id,
  overview,
  seo{
    description,
    image,
    title,
  },
  hero{
    title,
    content,
    cta{
      externalLink,
      link->{
        _type,
        "slug": slug.current,
        title
      },
      title,
      variant,
    },
    image{
      ...,
      image{
        asset->{
          ...,
          "_ref": _id,
        },
      },
    },
  },
  sections[]{
    ...,
    _type,
    title,
    _type == "testimonialSection" => {
      ...,
      testimonials[]->{
        ...,
        image{
          ...,
          image{
            asset->{
              ...,
              "_ref": _id,
            },
          },
        },
        name,
        review,
        rating,
      },
    },
    _type == "stats" => {
      ...,
      stats[]{
        description,
        icon,
        title,
        value,
      },
    },
    _type == "ctaSection" => {
      ...,
      description,
      cta{
        externalLink,
        link->{
          _type,
          "slug": slug.current,
          title
        },
        title,
        variant,
      },
    },
    _type == "youtubeSection" => {
      ...,
      description,
      title,
      url,
      videoTitle,
    },
    _type == "accordion" => {
      ...,
      title,
      items[]{
        ...,
        description,
        title,
      },
    },
    _type == "know_more" => {
      ...,
      customPortableText,
      description,
      gallery{
        ...,
        images[]{
          ...,
          asset->{
            ...,
            "_ref": _id,
          },
        },
      },
      title,
    },
    _type == "featureSection" => {
      ...,
      content,
      image{
        ...,
        image{
          asset->{
            ...,
            "_ref": _id,
          },
        },
      },
      position,
      cta{
        externalLink,
        link->{
          _type,
          "slug": slug.current,
          title
        },
        title,
        variant,
      },
    },
  },
`;

export const homePageQuery = groq`
  *[_type == "home"][0]{
   ${DEFAULT_QUERY}
  }
`;

export const aboutPageQuery = groq`
  *[_type == "about"][0]{
   ${DEFAULT_QUERY}
  }
`;

export const coursePageQuery = groq`
  *[_type == "course"][0]{
   ${DEFAULT_QUERY}
  }
`;

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
    seo{
      description,
      image,
      title,
    },
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    title,
    seo{
      description,
      image,
      title,
    },
    theme,
  }
`;

import { groq } from "next-sanity";

const SECTIONS_QUERY = `
 sections[]{
    ...,
    _type,
    title,
    _type == "newsletterSection" => {
      ...,
      description,
      title,
      successMessage,
      submitText,
      placeholderName,
      placeholderEmail,
    },
    _type == "servicesSection" => {
      ...,
      description,
      title,
      services[]->{
        _id,
        title,
        "slug": slug.current,
        shortDescription,
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
    },
    _type == "alliedSection" => {
      ...,
      allieds[]{
        ...,
        image{
          ...,
          asset->{
            ...,
            "_ref": _id,
          },
        },
        name,
        url,
      },
    },
    _type == "portableTextSection" => {
      ...,
      body,
    },
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
        subtitle
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

const DEFAULT_QUERY = `
  _id,
  overview,
  title,
  "slug": slug.current,
  seo{
    description,
    image,
    title,
  },
  hero{
    position,
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
 ${SECTIONS_QUERY}
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

export const resourcesPageQuery = groq`
  *[_type == "resources"][0]{
   ${DEFAULT_QUERY}
  }
`;

export const queryServicesPage = groq`
  *[_type == "services"][0]{
   ${DEFAULT_QUERY}
  }
`;

export const blogPageQuery = groq`
  *[_type == "blog"][0]{
   ${DEFAULT_QUERY}
  }
`;

export const investPageQuery = groq`
  *[_type == "invest"][0]{
   ${DEFAULT_QUERY}
  }
`;

export const queryServiceBySlug = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    description,
    shortDescription,
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
    ${SECTIONS_QUERY}
  }
`;

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    body,
    "slug": slug.current,
    ${DEFAULT_QUERY}
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
    privacyPolicy->{
      ...,
      _id,
      seo,
      content,
      title,
      "slug": slug.current,
    },
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    title,
    seo,
    theme,
    socialMedia,
    phone,
    address,
    email,
    logo{
      ...,
      image{
        ...,
        asset->{
          ...,
          "_ref": _id,
        },
      },
    },
    contactCta{
      externalLink,
      link->{
        _type,
        "slug": slug.current,
        title
      },
      title,
      variant,
    },
  }
`;

export const queryAllServices = groq`
  *[_type == "service"]{
    ...,
    _id,
    title,
    description,
    shortDescription,
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
    "slug": slug.current,
  }
`;

export const resourcesQuery = groq`
  *[_type == "resource"]{
    ...,
    _id,
    seo,
    description,
    "resource": download.asset->url,
    image{
      ...,
      image{
        asset->{
          ...,
          "_ref": _id,
        },
      },
    },
    title,
    "slug": slug.current,
  }
`;

export const resourceBySlug = groq`
  *[_type == "resource" && slug.current == $slug][0]{
    ...,
    _id,
    seo,
    description,
    "resource": download.asset->url,
    image{
      ...,
      image{
        asset->{
          ...,
          "_ref": _id,
        },
      },
    },
    title,
    "slug": slug.current,
  }
`;

export const postsQuery = groq`
  *[_type == "post"]{
    ...,
    _id,
    seo,
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
    title,
    "slug": slug.current,
  }
`;

export const postBySlug = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ...,
    _id,
    seo,
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
    title,
    "slug": slug.current,
  }
`;

export const propertiesQuery = groq`
  *[_type == "property"]{
    ...,
    _id,
    seo,
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
    "slug": slug.current,
    kindOfDepartments[]{
      ...,
      image{
        ...,
        asset->{
          ...,
          "_ref": _id,
        },
      },
    },
    similarProperties[]->{
      ...,
      _id,
      seo,
      description,
      kindOfDepartments[]{
        ...,
        image{
          ...,
          asset->{
            ...,
            "_ref": _id,
          },
        },
      },
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
      "slug": slug.current,
    },
  }
`;

export const propertyBySlug = groq`
  *[_type == "property" && slug.current == $slug][0]{
    ...,
    _id,
    seo,
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
    "slug": slug.current,
    location{
      ...,
      map{
        ...,
        asset->{
          ...,
          "_ref": _id,
        },
      },
    },
    kindOfDepartments[]{
      ...,
      image{
        ...,
        asset->{
          ...,
          "_ref": _id,
        },
      },
    },
    similarProperties[]->{
      ...,
      _id,
      seo,
      description,
      location{
        ...,
        map{
          ...,
          asset->{
            ...,
            "_ref": _id,
          },
        },
      },
      kindOfDepartments[]{
        ...,
        image{
          ...,
          asset->{
            ...,
            "_ref": _id,
          },
        },
      },
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
      "slug": slug.current,
    },
  }
`;

export const queryLastEntries = groq`
  *[_type == "post"] | order(publishedAt desc) [0...3]{
    ...,
    _id,
    seo,
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
    title,
    "slug": slug.current,
  }
`;

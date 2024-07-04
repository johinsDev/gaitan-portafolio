import "server-only";

import * as queryStore from "@sanity/react-loader";
import { draftMode } from "next/headers";

import { client } from "@/sanity/lib/client";
import {
  aboutPageQuery,
  blogPageQuery,
  coursePageQuery,
  homePageQuery,
  pagesBySlugQuery,
  postBySlug,
  postsQuery,
  projectBySlugQuery,
  propertiesQuery,
  propertyBySlug,
  resourceBySlug,
  resourcesPageQuery,
  resourcesQuery,
  settingsQuery,
} from "@/sanity/lib/queries";
import { token } from "@/sanity/lib/token";
import {
  AboutPagePayload,
  BlogPagePayload,
  HomePagePayload,
  PagePayload,
  Post,
  ProjectPayload,
  PropertyDocument,
  Resource,
  ResourcesPagePayload,
  SettingsPayload,
  Singletons,
} from "@/types";

const serverClient = client.withConfig({
  token,
  // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
  stega: process.env.VERCEL_ENV === "preview",
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? "previewDrafts" : "published",
  } = options;
  // Don't cache by default
  let revalidate: NextFetchRequestConfig["revalidate"] = 0;
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false;
  } else if (usingCdn) {
    revalidate = 60;
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
    stega: draftMode().isEnabled,
  });
}) satisfies typeof queryStore.loadQuery;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
  return loadQuery<SettingsPayload>(
    settingsQuery,
    {},
    { next: { tags: ["settings", "home", "page", "project"] } },
  );
}

export function loadHomePage() {
  return loadQuery<HomePagePayload>(
    homePageQuery,
    {},
    { next: { tags: ["home", "project"] } },
  );
}

export function loadProject(slug: string) {
  return loadQuery<ProjectPayload | null>(
    projectBySlugQuery,
    { slug },
    { next: { tags: [`project:${slug}`] } },
  );
}

export function loadPage(slug?: string) {
  return loadQuery<PagePayload>(
    pagesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } },
  );
}

export function loadAboutPage() {
  return loadQuery<AboutPagePayload>(
    aboutPageQuery,
    {},
    { next: { tags: ["about", "page"] } },
  );
}

export function loadCoursePage() {
  return loadQuery<AboutPagePayload>(
    coursePageQuery,
    {},
    { next: { tags: ["course", "page"] } },
  );
}

export function loadResourcePage() {
  return loadQuery<ResourcesPagePayload>(
    resourcesPageQuery,
    {},
    { next: { tags: ["resources", "page"] } },
  );
}

export function loadResources() {
  return loadQuery<Resource[]>(
    resourcesQuery,
    {},
    { next: { tags: ["resources", "documents"] } },
  );
}

export function loadResource(slug: string) {
  return loadQuery<Resource | null>(
    resourceBySlug,
    { slug },
    { next: { tags: [`resource:${slug}`] } },
  );
}

export function loadBlogPage() {
  return loadQuery<BlogPagePayload>(
    blogPageQuery,
    {},
    { next: { tags: ["blog", "page"] } },
  );
}

export function loadBlog(slug: string) {
  return loadQuery<Post | null>(
    postBySlug,
    { slug },
    { next: { tags: [`post:${slug}`] } },
  );
}

export function loadBlogPosts() {
  return loadQuery<Post[]>(
    postsQuery,
    {},
    { next: { tags: ["blog", "posts"] } },
  );
}

export function loadSingleton(load?: Singletons, slug?: string) {
  if (load === Singletons.ABOUT) {
    return loadAboutPage();
  }

  if (load === Singletons.HOME) {
    return loadHomePage();
  }

  if (load === Singletons.COURSE) {
    return loadCoursePage();
  }

  if (load === Singletons.RESOURCES) {
    return loadResourcePage();
  }

  if (load === Singletons.BLOG) {
    return loadBlogPage();
  }

  if (load === Singletons.PAGE) {
    return loadPage(slug);
  }

  return loadHomePage();
}

export function loadProperties() {
  return loadQuery<PropertyDocument[]>(
    propertiesQuery,
    {},
    { next: { tags: ["properties"] } },
  );
}

export function loadProperty(slug: string) {
  return loadQuery<PropertyDocument | null>(
    propertyBySlug,
    { slug },
    { next: { tags: [`property:${slug}`] } },
  );
}

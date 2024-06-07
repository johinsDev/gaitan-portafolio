import {
  aboutPageQuery,
  coursePageQuery,
  homePageQuery,
  resourcesPageQuery,
} from "@/sanity/lib/queries";
import { Singletons } from "@/types";

export function useGetQueryLoad(load?: Singletons) {
  switch (load) {
    case Singletons.ABOUT:
      return aboutPageQuery;
    case Singletons.HOME:
      return homePageQuery;
    case Singletons.COURSE:
      return coursePageQuery;
    case Singletons.RESOURCES:
      return resourcesPageQuery;
    default:
      return homePageQuery;
  }
}

import { aboutPageQuery, homePageQuery } from "@/sanity/lib/queries";
import { Singletons } from "@/types";

export function useGetQueryLoad(load?: Singletons) {
  switch (load) {
    case Singletons.ABOUT:
      return aboutPageQuery;
    case Singletons.HOME:
      return homePageQuery;
    default:
      return homePageQuery;
  }
}

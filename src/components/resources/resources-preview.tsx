"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { resourcesQuery } from "@/sanity/lib/queries";
import { Resource } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { ResourcesLayout } from "./resources-layout";

type Props = {
  initial: QueryResponseInitial<Resource[]>;
};

export default function ResourcesPreview(props: Props) {
  const { data } = useQuery<Resource[]>(
    resourcesQuery,
    {},
    {
      initial: props.initial,
    },
  );

  return <ResourcesLayout resources={data} />;
}

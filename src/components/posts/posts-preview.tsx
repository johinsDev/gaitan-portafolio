"use client";

import { useQuery } from "@/sanity/loader/useQuery";

import { postsQuery } from "@/sanity/lib/queries";
import { Post } from "@/types";
import { QueryResponseInitial } from "@sanity/react-loader";
import { PostsLayout } from "./posts-layout";

type Props = {
  initial: QueryResponseInitial<Post[]>;
};

export default function ResourcesPreview(props: Props) {
  const { data } = useQuery<Post[]>(
    postsQuery,
    {},
    {
      initial: props.initial,
    },
  );

  return <PostsLayout posts={data} />;
}

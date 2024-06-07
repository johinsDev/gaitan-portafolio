import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadBlogPosts } from "@/sanity/loader/loadQuery";
import { PostsLayout } from "./posts-layout";

const PostsPreview = dynamic(() => import("./posts-preview"));

export async function PostsSection() {
  const data = await loadBlogPosts();

  if (draftMode().isEnabled) {
    return <PostsPreview initial={data} />;
  }

  return <PostsLayout posts={data.data} />;
}

"use client";
import { extractYoutubeId } from "@/sanity/lib/utils";
import { YoutubeSection } from "@/types";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { CustomPortableText } from "../shared/CustomPortableText";
import './youtube.css';

type Props = {
  data?: YoutubeSection | null;
};

export function YoutubeSectionLayout({ data }: Props) {
  if (!data) return null;

  const id = extractYoutubeId(data.url);


  if (!id) return null;

  return (
    <section className="py-16 w-full aspect-video">
      {!!data.title && <h2 className="text-sub-title leading-sub-title font-bold text-center mb-12">{data.title}</h2>}
      {!!data.description && <p className="text-center mb-12"><CustomPortableText value={data.description as any} /></p>}
      <LiteYouTubeEmbed
        id={id}
        title={data.videoTitle || ""}
        aspectHeight={9}
        aspectWidth={16}
        poster="hqdefault"
      />
    </section>
  );
}

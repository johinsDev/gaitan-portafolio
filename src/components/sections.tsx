import { CallToActionSection } from "@/components/call-to-action-section";
import { Feature } from "@/components/feature-section";
import { Stats } from "@/components/stats-section";
import { Testimonials } from "@/components/testimonials";
import { loadSingleton } from "@/sanity/loader/loadQuery";
import { SectionsList, Singletons } from "@/types";
import { AccordionSection } from "./accordion-section";
import { KnowMoreSection } from "./know-more-section";
import { YoutubeSection } from "./youtube-section";

type SectionProps = {
  load?: Singletons;
};

export async function Sections({ load = Singletons.HOME }: SectionProps) {
  const data = await loadSingleton(load);

  return (
    <>
      {data?.data?.sections?.map((section) => {
        switch (section._type) {
          case SectionsList.CTA_SECTION:
            return (
              <CallToActionSection
                _key={section._key}
                key={section._key}
                load={load}
              />
            );
          case SectionsList.STATS_SECTION:
            return <Stats key={section._key} _key={section._key} load={load} />;
          case SectionsList.FEATURE_SECTION:
            return (
              <Feature key={section._key} _key={section._key} load={load} />
            );
          case SectionsList.TESTIMONIAL_SECTION:
            return (
              <Testimonials
                key={section._key}
                _key={section._key}
                load={load}
              />
            );
          case SectionsList.YOUTUBE_SECTION:
            return (
              <YoutubeSection
                key={section._key}
                _key={section._key}
                load={load}
              />
            );
          case SectionsList.ACCORDION_SECTION:
            return (
              <AccordionSection
                key={section._key}
                _key={section._key}
                load={load}
              />
            );
          case SectionsList.KNOW_MORE:
            return (
              <KnowMoreSection
                key={section._key}
                _key={section._key}
                load={load}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

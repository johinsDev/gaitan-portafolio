import { CallToActionSection } from "@/components/call-to-action-section";
import { Feature } from "@/components/feature-section";
import { Stats } from "@/components/stats-section";
import { Testimonials } from "@/components/testimonials";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import { SectionsList } from "@/types";

export async function Sections() {
  const home = await loadHomePage();

  return <>
    {home.data?.sections?.map((section) => {
      switch (section._type) {
        case SectionsList.CTA_SECTION:
          return (
            <CallToActionSection _key={section._key} key={section._key} />
          );
        case SectionsList.STATS_SECTION:
          return <Stats key={section._key} _key={section._key} />;
        case SectionsList.FEATURE_SECTION:
          return <Feature key={section._key} _key={section._key} />;
        case SectionsList.TESTIMONIAL_SECTION:
          return <Testimonials key={section._key} _key={section._key} />;
        default:
          return null;
      }
    })}
  </>
}

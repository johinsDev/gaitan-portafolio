import { CtaSection } from "@/types";
import { Cta } from "../cta";

type Props = {
  data: CtaSection | null;
}

export function CallToActionSectionLayout({ data }: Props) {
  if (!data) {
    return null
  }


  return <section className="bg-gray-100 py-12 w-full full-width">
    <div className="main_container">
      <div className="w-full rounded-2.5xl aspect-[16/4] py-12 bg-white flex flex-col gap-8 justify-center items-center">
        <div className="text-sub-title leading-sub-title font-bold text-center">
          {data.title}
        </div>

        <div className="text-body1 leading-body1 w-full lg:w-3/4 text-center text-gray-600">
          {data.description}
        </div>

        <Cta className="w-40" {...data.cta} />
      </div>
    </div>
  </section>
}
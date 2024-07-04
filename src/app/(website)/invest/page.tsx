import ButtonClearParams from "@/components/button-clear-params";
import InputQueryParam from "@/components/input-query-param";
import { ListingProperties } from "@/components/listing-properties";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadInvestPage, loadProperties } from "@/sanity/loader/loadQuery";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadInvestPage();

  return _generateMetadata(data.seo);
}


export default async function Invest() {
  const { data } = await loadProperties();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sub-title leading-sub-title font-bold text-center">
        Listings
      </div>

      <section className="flex flex-col gap-8 py-12">
        <div className="flex flex-col items-center lg:flex-row gap-8">
          <InputQueryParam
            type="text"
            placeholder="Pais"
            className="flex-1"
            name="country"
          />
          <InputQueryParam
            type="text"
            placeholder="Ciudad o Estado"
            className="flex-1"
            name="state"
          />
          <ButtonClearParams className="w-40 flex-shrink-0">
            Limpiar
          </ButtonClearParams>
        </div>

        <div className="w-full h-0.5 bg-gray-200" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <ListingProperties properties={data} />
        </div>
      </section>
    </div>
  );
}

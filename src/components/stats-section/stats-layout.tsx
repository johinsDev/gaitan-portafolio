import { cn } from "@/lib/cn";
import { StatsSection } from "@/types";

type Props = {
  data?: StatsSection | null;
};

export function StatsLAyout({ data }: Props) {
  if (!data) return null;

  if (!data.stats && !data.title) return null;

  return (
    <section className="bg-gray-50 py-12 w-full full-width" style={{ backgroundColor: data.bgColor?.hex }}>
      <h2 className={cn("text-sub-title font-bold text-center font-noto")}>
        {data?.title}
      </h2>

      <div className="main_container">
        {!!data.stats?.length && (
          <div className="mt-8 lg:mt-16 grid lg:grid-cols-4">
            {data?.stats?.map((stat, index) => {
              return (
                <div
                  key={index}
                  className="py-4 lg:px-6 flex items-center lg:text-center lg:flex-col gap-4"
                >
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold truncate w-full flex-1">
                    {stat.value}
                  </div>
                  <div className="h-full w-0.5 bg-foreground lg:hidden" />
                  <div className="text-lg flex-1">
                    {stat.title ?? stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </section>
  );
}

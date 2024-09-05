"use client";

import { cn } from "@/lib/cn";
import { eventMitt } from "@/lib/event";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { createParser, useQueryStates } from "next-usequerystate";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { useDebounce } from "react-use";
import { Button } from "../button";
import { Calendar } from "../ui/calendar/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover/popover";

const parserDate = createParser({
  parse: (value: string) => {
    try {
      const date = new Date(value);
      // format to YYYY-MM-DD
      return isNaN(date.getTime()) ? undefined : date;
    } catch (e) {
      return undefined;
    }
  },
  serialize: (value: Date) => {
    if (!value) return "";

    return format(value, "yyyy-MM-dd");
  },
});

export function DatePickerFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const [_date, _setDate] = useQueryStates({
    from: parserDate,
    to: parserDate,
  });

  useDebounce(
    () => {
      _setDate({
        from: date?.from,
        to: date?.to,
      });
    },
    500,
    [date],
  );

  React.useEffect(() => {
    eventMitt.on("clear-params", () => {
      setDate(undefined);
    });

    return () =>
      eventMitt.off("clear-params", () => {
        setDate(undefined);
      });
  }, []);


  return (
    <div className={cn("grid gap-2 flex-1", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size="lg"
            className={cn(
              "border border-input bg-background px-3 py-4 text-sm rounded h-10 text-muted-foreground text-left justify-start",
              {
                "text-primary": !!date?.from,
              },
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

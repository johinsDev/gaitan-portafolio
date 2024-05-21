import { Button } from "@/components/button";
import { cn } from "@/lib/cn";
import { HtmlHTMLAttributes } from "react";

type CallToActionProps = HtmlHTMLAttributes<HTMLDivElement>

export function CallToAction({ className, ...props }: CallToActionProps) {
  return <div className={cn("w-full rounded-2.5xl aspect-[16/4] py-12 bg-white flex flex-col gap-8 justify-center items-center", className)} {...props}>
    <div className="text-sub-title leading-sub-title font-bold text-center">
      Call to action
    </div>

    <Button className="w-40">
      Empezar!
    </Button>
  </div>
}

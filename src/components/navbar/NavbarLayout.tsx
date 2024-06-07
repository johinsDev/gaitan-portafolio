"use client";

import { Button } from "@/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { resolveHref } from "@/sanity/lib/utils";
import { MenuItem, SettingsPayload } from "@/types";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  settings: SettingsPayload;
};

const MAP_SINGLETONS_SLUGS = {
  home: "/",
  about: "/about",
};

const Navbar = (props: Props) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const { settings } = props;

  const menuItems = settings?.menuItems || ([] as MenuItem[]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <nav className="h-24 bg-primary text-background flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden size-11">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <Link href="/">
            <p className="font-bold text-xl xl:text-3xl">
              {settings?.title ?? "Juan Felipe Gaitán"}.
            </p>
          </Link>
        </div>

        <ul className="flex-1 lg:flex gap-8 justify-center ml-2 items-center h-full hidden">
          {menuItems.map((item) => {
            const href = resolveHref(item?._type, item?.slug);

            if (!href) return null;

            const isActive = pathname === href;

            return (
              <li
                key={href}
                className={cn(
                  "font-noto text-lg font-medium border-transparent border-b pb-1 transition-all hover:border-input duration-750",
                  {
                    "border-input": isActive,
                  },
                )}
              >
                <Link href={href} onClick={() => setOpen(false)}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        <Button asChild variant="outline" className="hidden lg:flex">
          <Link href={siteConfig.links.contact}>Contacto</Link>
        </Button>
      </nav>

      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {menuItems.map((item) => {
            const href = resolveHref(item?._type, item?.slug);

            if (!href) return null;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {item.title}
              </Link>
            );
          })}

          <Button asChild size="lg" variant="outline" className="lg:hidden">
            <Link href={siteConfig.links.contact}>Contacto</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;

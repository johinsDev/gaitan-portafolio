'use client'

import { Button } from "@/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return <Sheet>
    <nav className="h-24 bg-foreground text-background flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <SheetTrigger asChild>
          <Button size="icon" variant="outline-inverted" className="lg:hidden size-11">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>

        <Link href="/">
          <p className="font-bold text-xl xl:text-3xl">Juan Felipe Gaitán.</p>
        </Link>
      </div>

      <ul className="flex-1 lg:flex gap-8 justify-center ml-2 items-center h-full hidden">
        {siteConfig.navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className={cn("font-noto text-lg font-medium border-transparent border-b pb-1 transition-all hover:border-input duration-750", {
              "border-input": isActive,
            })}
            >
              <Link
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>

      <Button
        asChild
        variant='outline-inverted'
        className="hidden lg:flex"
      >
        <Link href={siteConfig.links.contact}>Contacto</Link>
      </Button>


    </nav>

    <SheetContent side="left" className="sm:max-w-xs">
      <nav className="grid gap-6 text-lg font-medium">
        {
          siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))
        }

        <Button
          asChild
          size='lg'
          variant='outline'
          className="lg:hidden"
        >
          <Link href={siteConfig.links.contact}>Contacto</Link>
        </Button>

      </nav>
    </SheetContent>
  </Sheet>
};

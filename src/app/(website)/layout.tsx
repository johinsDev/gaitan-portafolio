import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { _generateMetadata } from "@/sanity/lib/utils";
import { loadSettings } from "@/sanity/loader/loadQuery";
import "@/styles/globals.css";
import { Metadata } from "next";
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { Suspense } from "react";

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
)

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await loadSettings()

  return {
    ..._generateMetadata({
      description: undefined,
      image: settings?.ogImage,
      title: settings?.title,
    }),
    title: {
      template: `%s | ${settings?.title}`,
      default: settings?.title || 'Personal website',
    },
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="relative flex flex-col overflow-x-hidden flex-1">
        <Suspense>
          <Navbar />
        </Suspense>
        <main className="main_container flex-grow pt-16">
          {children}
        </main>
        <footer className="w-full flex items-center justify-center py-3 h-28 bg-foreground">

        </footer>
      </div>
      {draftMode().isEnabled && <LiveVisualEditing />}
    </ThemeProvider>

  );
}

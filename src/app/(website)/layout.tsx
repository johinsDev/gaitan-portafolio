import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="relative flex flex-col overflow-x-hidden flex-1">
        <Navbar />
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

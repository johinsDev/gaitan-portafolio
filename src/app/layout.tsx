import { fontNoto, fontSans } from "@/config/fonts";
import { cn } from "@/lib/cn";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable,
          fontNoto.variable
        )}
      >
        {children}

      </body>

    </html>
  );
}

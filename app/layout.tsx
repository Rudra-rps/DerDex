import type { Metadata } from "next";
import "./globals.css";
import { QubicProvider } from "@/hooks/QubicProvider";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QubicProvider>{children}</QubicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

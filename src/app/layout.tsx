import type { Metadata } from "next";
import "./globals.css";
import "../styles/enhanced-animations.css";
import "../styles/splash-animations.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashProvider } from "@/contexts/SplashContext";
import "@fontsource/share-tech-mono";

export const metadata: Metadata = {
  title: "Avish Kaushik",
  description:
    "I am Avish Kaushik, a Full Stack Developer with a passion for building innovative web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.cdnfonts.com/css/agustina" rel="stylesheet" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className="bg-background text-foreground selection:bg-primary/30">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SplashProvider>{children}</SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

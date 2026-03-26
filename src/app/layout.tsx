import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Software Architect & Full-Stack Engineer | Manarix",
  description:
    "I design scalable systems that solve real business problems — from fintech to SaaS platforms.",
  applicationName: "Manarix",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Software Architect & Full-Stack Engineer",
    description:
      "Scalable architecture, SaaS systems, and fintech integrations — built for the real world.",
    url: siteUrl,
    siteName: "Manarix",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Architect & Full-Stack Engineer",
    description: "Scalable systems, SaaS platforms, and fintech integrations.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg-base text-text-primary">
        <ThemeProvider>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-100 -translate-y-16 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

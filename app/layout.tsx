import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { CalendlyResourceHints } from "./calendly-resource-hints";
import { BookingProvider } from "./components/booking";
import { FloatingActions } from "./components/floating-actions";
import { Header } from "./components/header";
import { JsonLd } from "./components/json-ld";
import { shareImage, siteName, siteUrl } from "./lib/seo";
import { siteGraph } from "./lib/structured-data";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Defaults for every page. Each page sets its own title, description and
// canonical address through pageMetadata() in app/lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Intimacy Masters | Christian Marriage & Intimacy Coach",
    template: `%s | ${siteName}`,
  },
  description:
    "Faith-centered marriage and intimacy coaching with clinical sexologist Jessica Sampson. Private sessions, courses and books for couples, wives and parents.",
  applicationName: siteName,
  authors: [{ name: "Jessica Sampson", url: `${siteUrl}/about` }],
  creator: "Jessica Sampson",
  publisher: siteName,
  category: "Marriage and relationship coaching",
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    siteName,
    type: "website",
    locale: "en_NG",
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", images: [shareImage] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Set these on the host once the search consoles hand out their codes.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#4B1530",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${sans.variable} ${display.variable}`}>
        <a href="#content" className="skip-link">Skip to content</a>
        <JsonLd data={siteGraph()} />
        <CalendlyResourceHints />
        <BookingProvider>
          <Header />
          {children}
          <FloatingActions />
        </BookingProvider>
      </body>
    </html>
  );
}

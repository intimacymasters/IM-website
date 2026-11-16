import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { CalendlyResourceHints } from "./calendly-resource-hints";
import { BookingProvider } from "./components/booking";
import { FloatingActions } from "./components/floating-actions";
import { Header } from "./components/header";
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

export const metadata: Metadata = {
  title: {
    default: "The Intimacy Masters | Faith-centered intimacy guidance",
    template: "%s | The Intimacy Masters",
  },
  description:
    "Compassionate, faith-centered support for deeper connection, healthier conversations, and more fulfilling relationships.",
  openGraph: {
    title: "The Intimacy Masters",
    description: "A deeper connection. A more fulfilling marriage.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${sans.variable} ${display.variable}`}>
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

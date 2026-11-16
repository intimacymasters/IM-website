import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "./components/page-shell";
import { SpiceCouple } from "./components/spice-characters";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist. Find your way back to The Intimacy Masters.",
};

const places = [
  { href: "/coaching", label: "Private coaching", note: "The first call is free" },
  { href: "/couples", label: "For couples", note: "From roommates back to lovers" },
  { href: "/shop", label: "Shop", note: "Books, courses and tools" },
  { href: "/spice", label: "Spice check", note: "How hot is it at your house?" },
];

/**
 * Shown for any address that does not match a page. Next.js ships this file
 * with every route, so it stays light: no client components of its own.
 */
export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-[#2A111E] px-6 pb-20 pt-36 text-white sm:px-8 sm:pt-44 lg:pb-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div className="hero-rise mx-auto w-full max-w-[260px] lg:max-w-xs">
            <SpiceCouple mood={0} />
          </div>
          <div className="hero-rise hero-rise-late">
            <p className="eyebrow text-[#F3A6BD]">Error 404</p>
            <h1 className="page-title mt-5">
              This page has gone to <em className="font-display italic text-[#F6B7C9]">bed.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/72 sm:text-xl">
              The address may be mistyped, or the page may have moved. Here is where most people are headed.
            </p>
            <ul className="mt-9 divide-y divide-white/14 border-y border-white/14">
              {places.map((place) => (
                <li key={place.href}>
                  <Link href={place.href} className="group flex items-baseline justify-between gap-4 py-4">
                    <span className="font-display text-2xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-[#F6B7C9] sm:text-3xl">{place.label}</span>
                    <span className="flex items-center gap-3 text-sm font-semibold text-white/55">
                      <span className="hidden sm:inline">{place.note}</span>
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/" className="group mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F6B7C9] px-6 py-3 text-sm font-bold text-[#381626] hover:bg-[#F9CAD7]">
              Back to the home page <ArrowRight size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect } from "react";
import { BookingButton } from "./booking";

export function HomeHero() {
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    // A refresh starts again from the top. A first visit keeps its #section
    // link, and back/forward keeps the browser's own scroll position.
    const [navigation] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navigation?.type !== "reload") return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const resetToTop = () => {
      if (window.location.hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    resetToTop();
    const firstFrame = window.requestAnimationFrame(resetToTop);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-[#FFF3EE] hero-wide:min-h-[900px] hero-wide:bg-[#F6B7C9] hero-wide:pt-28">
      <div className="hero-photo">
        <Image
          src="/images/jessica-hero.jpg"
          alt="Jessica Sampson smiling in a professional portrait"
          fill
          priority
          sizes="(max-width: 639px) 125vw, 100vw"
          className="object-cover object-[64%_0%] hero-wide:object-[58%_27%]"
        />
        <div className="hero-veil absolute inset-0" />
      </div>
      <div className="hero-content relative mx-auto flex max-w-7xl items-start px-6 sm:px-8 hero-wide:min-h-[690px] hero-wide:items-center lg:px-10">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 26 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.75 }}
          className="hero-copy"
        >
          <p className="eyebrow mb-4 text-[#8D2F5B] hero-wide:mb-6">Faith-centered intimacy guidance</p>
          <h1 className="hero-title text-[#321321]">
            A deeper connection.<br />
            <span className="text-[#8D2F5B]">A more fulfilling marriage.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4F3A44] sm:text-xl hero-wide:mt-7">
            Honest conversations and practical support for Christians who want to reconnect emotionally, relationally, and physically.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap hero-wide:mt-9">
            <BookingButton />
            <motion.a
              href="#start"
              whileTap={{ scale: 0.97 }}
              className="hero-mobile-support inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#4B1530]/20 bg-white/65 px-6 py-3 text-sm font-bold text-[#4B1530] backdrop-blur-md hover:bg-white"
            >
              Find your starting point <ChevronDown size={17} />
            </motion.a>
          </div>
          <p className="mt-7 text-sm font-semibold text-[#5B4650] hero-wide:mt-10">First call is free · Confidential · Practical</p>
        </motion.div>
      </div>
      </section>
  );
}

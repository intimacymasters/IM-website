"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "../lib/site";
import { Reveal } from "./reveal";
import { SectionIntro } from "./sections";

export function Testimonials() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const cards = Array.from(track.children) as HTMLElement[];
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || "20");
      const step = cards[0] ? cards[0].offsetWidth + gap : track.clientWidth;
      setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, track.scrollLeft / maxScroll)) : 0);
      setActive(Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / step))));
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "20");
    track.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section id="stories" className="section-pad bg-[#FFF9F5]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionIntro
            title="Small conversations. Meaningful change."
            text="Shared anonymously and lightly edited for clarity to protect the privacy of clients and community members."
          />
        </Reveal>

        <div
          ref={trackRef}
          tabIndex={0}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || !trackRef.current) return;
            dragRef.current = { active: true, startX: event.clientX, startScroll: trackRef.current.scrollLeft };
            setDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!dragRef.current.active || !trackRef.current) return;
            trackRef.current.scrollLeft = dragRef.current.startScroll - (event.clientX - dragRef.current.startX);
          }}
          onPointerUp={(event) => {
            dragRef.current.active = false;
            setDragging(false);
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            dragRef.current.active = false;
            setDragging(false);
          }}
          className={`testimonial-scroll mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 ${dragging ? "is-dragging" : ""}`}
          aria-label="Client testimonials"
        >
          {testimonials.map((item) => (
            <blockquote
              key={item.quote}
              className={`min-w-[86%] snap-start rounded-[2rem] p-7 transition-shadow duration-300 hover:shadow-[0_22px_55px_rgba(78,28,52,0.11)] sm:min-w-[58%] lg:min-w-[38%] border border-[#4B1530]/10 bg-white`}
            >
              <Quote size={30} className="text-[#8D2F5B]" fill="currentColor" />
              <p className="mt-8 font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-[#381626] sm:text-3xl">“{item.quote}”</p>
              <footer className="mt-9 flex items-end justify-between gap-4 border-t border-[#4B1530]/12 pt-5">
                <div>
                  <p className="text-sm font-bold text-[#4B1530]">{item.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#6F5863]">{item.tag}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-7 flex items-center gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-[#E9D9E0]" aria-hidden="true">
              <motion.div
                className="h-full origin-left rounded-full bg-[#8D2F5B]"
                animate={{ scaleX: (1 + progress * (testimonials.length - 1)) / testimonials.length }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.35 }}
              />
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6F5863]">
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={progress <= 0.01}
              className="grid size-12 place-items-center rounded-full border border-[#4B1530]/15 bg-white text-[#4B1530] shadow-[0_8px_28px_rgba(78,28,52,0.08)] transition-colors hover:bg-[#FDE2E8] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={progress >= 0.99}
              className="grid size-12 place-items-center rounded-full bg-[#4B1530] text-white shadow-[0_10px_30px_rgba(78,28,52,0.2)] transition-colors hover:bg-[#6A2044] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Next testimonial"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { productBySlug } from "../lib/site";
import { BookingButton } from "./booking";
import { Price } from "./sections";

type Path = {
  id: string;
  statement: string;
  bg: string;
  dark: boolean;
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  product?: string;
};

const paths: Path[] = [
  {
    id: "couples",
    statement: "We feel more like roommates than lovers.",
    bg: "#2A111E",
    dark: true,
    eyebrow: "For couples",
    title: "From roommates back to lovers.",
    text: "You are not broken, and you are not the only ones. Most couples who drift apart need a plan they can follow together, not another argument.",
    href: "/couples",
    cta: "See the couples path",
    product: "marriage-maintenance",
  },
  {
    id: "wives",
    statement: "I want to enjoy intimacy, not just endure it.",
    bg: "#F6B7C9",
    dark: false,
    eyebrow: "For wives",
    title: "Pleasured, not pressured.",
    text: "Sex was made for you too. Join women who are finding their voice, their confidence and their joy, without shame.",
    href: "/wives",
    cta: "See the wives path",
    product: "woman-sex-was-made-for-you-too",
  },
  {
    id: "coaching",
    statement: "Something feels painful or wrong, and I need help.",
    bg: "#FFF3EE",
    dark: false,
    eyebrow: "Private coaching",
    title: "Say it out loud, in private.",
    text: "Pain, low desire, performance worries, things that feel hard to name. Clinical guidance in a confidential space, starting with a free call.",
    href: "/coaching",
    cta: "How coaching works",
  },
  {
    id: "parents",
    statement: "I need to talk to my child about their body.",
    bg: "#E3F5EE",
    dark: false,
    eyebrow: "For parents",
    title: "Home is the first school.",
    text: "Age appropriate words for every stage, from toddler to teenager, so your child hears it from you first.",
    href: "/parents",
    cta: "See the parents path",
    product: "sex-educate-your-child",
  },
  {
    id: "speaking",
    statement: "I am planning an event or a school programme.",
    bg: "#3D162A",
    dark: true,
    eyebrow: "Speaking",
    title: "Bring the conversation to your room.",
    text: "Churches, schools, conferences and bridal showers. Thoughtful sessions shaped around your audience and your values.",
    href: "/speaking",
    cta: "Plan a session",
  },
];

/**
 * Lets a visitor say where they are in their own words. The whole section
 * shifts colour to match and shows one clear place to begin.
 */
export function PathFinder() {
  const [activeId, setActiveId] = useState(paths[0].id);
  const reduceMotion = useReducedMotion();
  const active = paths.find((path) => path.id === activeId) ?? paths[0];
  const product = active.product ? productBySlug(active.product) : null;
  const ink = active.dark ? "text-white" : "text-[#381626]";
  const soft = active.dark ? "text-white/70" : "text-[#5F4B55]";

  return (
    <motion.section
      id="start"
      className="section-pad relative overflow-hidden"
      initial={false}
      animate={{ backgroundColor: active.bg }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`eyebrow transition-colors duration-500 ${active.dark ? "text-[#F3A6BD]" : "text-[#8D2F5B]"}`}>Find your starting point</p>
          <h2 className={`section-title mt-4 transition-colors duration-500 ${ink}`}>Where are you right now?</h2>
          <p className={`mt-5 max-w-lg text-lg leading-relaxed transition-colors duration-500 ${soft}`}>
            Pick the sentence that sounds most like you. There is no wrong answer, and nothing is recorded.
          </p>
          <div role="radiogroup" aria-label="Where are you right now?" className="mt-8 grid gap-2.5">
            {paths.map((path) => {
              const selected = path.id === active.id;
              return (
                <button
                  key={path.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setActiveId(path.id)}
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left text-base font-bold transition-all duration-300 sm:text-lg ${
                    selected
                      ? active.dark
                        ? "border-[#F6B7C9] bg-[#F6B7C9] text-[#381626]"
                        : "border-[#4B1530] bg-[#4B1530] text-white"
                      : active.dark
                        ? "border-white/15 bg-white/[0.06] text-white/85 hover:bg-white/[0.12]"
                        : "border-[#4B1530]/12 bg-white/55 text-[#381626] hover:bg-white"
                  }`}
                >
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-current" : active.dark ? "border-white/40" : "border-[#4B1530]/30"}`}>
                    {selected && <Check size={13} strokeWidth={3.5} />}
                  </span>
                  {path.statement}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:pt-14" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: "spring", bounce: 0, duration: reduceMotion ? 0.15 : 0.5 }}
              className={`rounded-[2.2rem] border p-7 sm:p-10 ${active.dark ? "border-white/14 bg-white/[0.07]" : "border-white/80 bg-white/70 shadow-[0_24px_70px_rgba(70,33,54,0.1)]"}`}
            >
              <p className={`eyebrow ${active.dark ? "text-[#F3A6BD]" : "text-[#8D2F5B]"}`}>{active.eyebrow}</p>
              <h3 className={`mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl ${ink}`}>{active.title}</h3>
              <p className={`mt-5 text-lg leading-relaxed ${soft}`}>{active.text}</p>

              {product ? (
                <a
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group mt-7 flex items-center gap-4 rounded-2xl border p-3 pr-5 transition-colors ${active.dark ? "border-white/14 hover:bg-white/[0.08]" : "border-[#4B1530]/10 bg-white hover:bg-[#FFF4F7]"}`}
                >
                  <span className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-[#F4E4E9]">
                    <Image src={product.cover} alt="" fill sizes="80px" className="object-contain" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-xs font-bold uppercase tracking-[0.12em] ${active.dark ? "text-[#F3A6BD]" : "text-[#8D2F5B]"}`}>A small first step</span>
                    <span className={`mt-1 block font-bold leading-tight ${ink}`}>{product.title}</span>
                    <Price ngn={product.ngn} usd={product.usd} wasNgn={product.wasNgn} light={active.dark} className="mt-1" />
                  </span>
                  <ArrowRight size={18} className={`shrink-0 transition-transform group-hover:translate-x-1 ${ink}`} />
                </a>
              ) : (
                <p className={`mt-7 rounded-2xl border px-5 py-4 text-sm font-semibold ${active.dark ? "border-white/14 text-white/75" : "border-[#4B1530]/10 bg-white text-[#5F4B55]"}`}>
                  The first conversation is free. One hour, private, and no obligation to book anything after.
                </p>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={active.href}
                  className={`group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-colors ${
                    active.dark ? "bg-[#F6B7C9] text-[#381626] hover:bg-[#F9CAD7]" : "bg-[#4B1530] text-white hover:bg-[#6A2044]"
                  }`}
                >
                  {active.cta} <ArrowRight size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
                </Link>
                {active.id !== "speaking" && (
                  <BookingButton tone={active.dark ? "light" : "pink"}>Talk it through, free</BookingButton>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

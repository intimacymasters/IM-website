"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lock } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { freeGuide, productBySlug } from "../lib/site";
import { Price } from "./sections";

export type Application = {
  who: string;
  topics: string[];
  duration: string;
  support: string;
  note: string;
  name: string;
  email: string;
  phone: string;
};

export const emptyApplication: Application = { who: "", topics: [], duration: "", support: "", note: "", name: "", email: "", phone: "" };

const whoOptions = ["Me, a wife or wife to be", "Me, a husband or husband to be", "My spouse and me, together", "My child or my family"];

const topicOptions = [
  "We rarely or never have sex",
  "Pain, dryness or low desire",
  "Performance or lasting longer",
  "We feel disconnected",
  "Intimacy after childbirth",
  "More pleasure and spice",
  "Talking to my child",
  "Something else",
];

const durationOptions = ["A few weeks", "Some months", "A year or more", "Many years"];

const supportOptions = [
  { id: "coaching", label: "Private coaching with Jessica", hint: "From ₦120,000 or $100 a session" },
  { id: "programme", label: "A programme or community to follow", hint: "From ₦39,500 or $29" },
  { id: "small", label: "Something small to start with", hint: "From ₦1,000 or $3" },
  { id: "unsure", label: "Not sure yet, I want to talk first", hint: "That is what the call is for" },
];

/** Picks up to three resources that fit the answers, for people who want to start smaller. */
function recommend(answers: Application) {
  const picks: string[] = [];
  const add = (...slugs: string[]) => slugs.forEach((slug) => !picks.includes(slug) && picks.push(slug));
  if (answers.who.includes("child") || answers.topics.includes("Talking to my child")) add("sex-educate-your-child", "children-checklist");
  if (answers.support === "programme") {
    if (answers.who.includes("wife")) add("wifestars", "sensual-you");
    add("marriage-maintenance");
  }
  if (answers.who.includes("together") || answers.topics.includes("We rarely or never have sex") || answers.topics.includes("We feel disconnected")) add("marriage-maintenance", "intimacy-card");
  if (answers.who.includes("wife")) add("woman-sex-was-made-for-you-too", "feminine-energy-challenge");
  add("bedroom-tips", "intimacy-card", "love-language");
  return picks.slice(0, 3).map(productBySlug);
}

/** Short summary that travels into the Calendly booking so the team can review it. */
export function summarise(answers: Application) {
  const support = supportOptions.find((option) => option.id === answers.support)?.label ?? answers.support;
  return [
    `For: ${answers.who}`,
    `Help with: ${answers.topics.join("; ")}`,
    `How long: ${answers.duration}`,
    `Looking for: ${support}`,
    answers.phone && `WhatsApp: ${answers.phone}`,
    answers.note && `In their words: ${answers.note}`,
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 1400);
}

const STEPS = ["who", "topics", "duration", "support", "suggest", "note", "contact"] as const;
type Step = (typeof STEPS)[number];

const optionClass = (selected: boolean) =>
  `flex min-h-14 w-full items-center gap-3 rounded-2xl border px-5 py-3.5 text-left text-base font-bold transition-colors ${
    selected ? "border-[#4B1530] bg-[#4B1530] text-white" : "border-[#4B1530]/12 bg-white text-[#381626] hover:border-[#4B1530]/40 hover:bg-[#FFF4F7]"
  }`;

const inputClass =
  "mt-2 w-full rounded-2xl border border-[#4B1530]/15 bg-white px-4 py-3.5 text-base text-[#381626] placeholder:text-[#A8959E] focus:border-[#8D2F5B] focus:outline-none focus:ring-2 focus:ring-[#8D2F5B]/25";

export function DiscoveryApplication({
  initial,
  onComplete,
  onNavigate,
}: {
  initial: Application;
  onComplete: (answers: Application) => void;
  onNavigate: () => void;
}) {
  const [answers, setAnswers] = useState<Application>(initial);
  const [step, setStep] = useState<Step>("who");
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const reduceMotion = useReducedMotion();

  const wantsSmaller = answers.support === "small" || answers.support === "programme";
  const order = STEPS.filter((item) => item !== "suggest" || wantsSmaller);
  const index = order.indexOf(step);
  const set = <K extends keyof Application>(key: K, value: Application[K]) => setAnswers((current) => ({ ...current, [key]: value }));

  const go = (next: Step, dir = 1) => {
    setDirection(dir);
    setStep(next);
  };
  const forward = (from: Step = step, current: Application = answers) => {
    const smaller = current.support === "small" || current.support === "programme";
    const list = STEPS.filter((item) => item !== "suggest" || smaller);
    const next = list[list.indexOf(from) + 1];
    if (next) go(next, 1);
  };
  const back = () => {
    const previous = order[index - 1];
    if (previous) go(previous, -1);
  };

  const choose = (key: "who" | "duration" | "support", value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    // Single choice questions move on by themselves after a beat.
    window.setTimeout(() => forward(key, next), reduceMotion ? 0 : 220);
  };

  const submit = () => {
    const nextErrors: typeof errors = {};
    if (answers.name.trim().length < 2) nextErrors.name = "Please add your first name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(answers.email.trim())) nextErrors.email = "Please add an email address we can confirm your call on.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onComplete({ ...answers, name: answers.name.trim(), email: answers.email.trim(), phone: answers.phone.trim() });
  };

  const picks = step === "suggest" ? recommend(answers) : [];

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#FFF9F5]">
      <div className="px-5 pt-5 sm:px-9 sm:pt-7">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.12em] text-[#6F5863]">
          <span>Step {index + 1} of {order.length}</span>
          <span className="flex items-center gap-1.5"><Lock size={12} /> Private</span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#EFD9E1]" role="progressbar" aria-valuemin={1} aria-valuemax={order.length} aria-valuenow={index + 1} aria-label="Progress">
          <motion.div className="h-full origin-left rounded-full bg-[#C20C78]" initial={false} animate={{ scaleX: (index + 1) / order.length }} transition={{ type: "spring", bounce: 0, duration: reduceMotion ? 0 : 0.5 }} />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-6 sm:px-9 sm:pt-8">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -36 }}
            transition={{ type: "spring", bounce: 0, duration: reduceMotion ? 0.12 : 0.38 }}
            className="mx-auto max-w-xl"
          >
            {step === "who" && (
              <fieldset>
                <legend className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#381626] sm:text-4xl">Who is this call for?</legend>
                <p className="mt-3 text-[#67545D]">A few quick questions help Jessica prepare. It takes about two minutes.</p>
                <div className="mt-6 grid gap-2.5">
                  {whoOptions.map((option) => (
                    <button key={option} type="button" onClick={() => choose("who", option)} className={optionClass(answers.who === option)} aria-pressed={answers.who === option}>
                      {option}
                    </button>
                  ))}
                </div>
                <p className="mt-5 text-sm text-[#6F5863]">
                  Booking a speaker for an event?{" "}
                  <Link href="/speaking" onClick={onNavigate} className="font-bold text-[#8D2F5B] underline underline-offset-4">Go to speaking</Link>
                </p>
              </fieldset>
            )}

            {step === "topics" && (
              <fieldset>
                <legend className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#381626] sm:text-4xl">What would you like help with?</legend>
                <p className="mt-3 text-[#67545D]">Choose all that apply. Nothing here will shock us.</p>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {topicOptions.map((option) => {
                    const selected = answers.topics.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            topics: current.topics.includes(option) ? current.topics.filter((item) => item !== option) : [...current.topics, option],
                          }))
                        }
                        className={optionClass(selected)}
                        aria-pressed={selected}
                      >
                        <span className={`grid size-5 shrink-0 place-items-center rounded-md border-2 ${selected ? "border-white" : "border-[#4B1530]/30"}`}>
                          {selected && <Check size={12} strokeWidth={4} />}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === "duration" && (
              <fieldset>
                <legend className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#381626] sm:text-4xl">How long has this been on your mind?</legend>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {durationOptions.map((option) => (
                    <button key={option} type="button" onClick={() => choose("duration", option)} className={optionClass(answers.duration === option)} aria-pressed={answers.duration === option}>
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === "support" && (
              <fieldset>
                <legend className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#381626] sm:text-4xl">What kind of support fits you right now?</legend>
                <p className="mt-3 text-[#67545D]">The discovery call itself is free. This helps us point you to the right next step.</p>
                <div className="mt-6 grid gap-2.5">
                  {supportOptions.map((option) => (
                    <button key={option.id} type="button" onClick={() => choose("support", option.id)} className={optionClass(answers.support === option.id)} aria-pressed={answers.support === option.id}>
                      <span>
                        <span className="block">{option.label}</span>
                        <span className={`block text-sm font-semibold ${answers.support === option.id ? "text-white/70" : "text-[#7A626D]"}`}>{option.hint}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === "suggest" && (
              <div>
                <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#381626] sm:text-4xl">You can begin today.</h3>
                <p className="mt-3 text-[#67545D]">Based on your answers, these are good places to start. You can still request a call.</p>
                <div className="mt-6 grid gap-2.5">
                  <Link href="/#free-guide" onClick={onNavigate} className="group flex items-center gap-4 rounded-2xl border border-[#1F5A44]/15 bg-[#E3F5EE] p-3 pr-4 transition-colors hover:bg-[#D3EEE3]">
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white">
                      <Image src={freeGuide.cover} alt="" fill sizes="64px" className="object-contain" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold leading-tight text-[#1E3A30]">{freeGuide.title}</span>
                      <span className="mt-0.5 block text-sm font-black text-[#1F5A44]">Free guide</span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 text-[#1F5A44] transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  {picks.map((product) => (
                    <a key={product.slug} href={product.href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-[#4B1530]/10 bg-white p-3 pr-4 transition-colors hover:bg-[#FFF4F7]">
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#F4E4E9]">
                        <Image src={product.cover} alt="" fill sizes="64px" className="object-contain" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold leading-tight text-[#381626]">{product.title}</span>
                        <Price ngn={product.ngn} usd={product.usd} wasNgn={product.wasNgn} className="mt-0.5" />
                      </span>
                      <ArrowUpRight size={18} className="shrink-0 text-[#8D2F5B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
                <Link href="/shop" onClick={onNavigate} className="mt-4 inline-block text-sm font-bold text-[#8D2F5B] underline underline-offset-4">See the whole shop</Link>
              </div>
            )}

            {step === "note" && (
              <div>
                <label htmlFor="application-note" className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#381626] sm:text-4xl">
                  Anything you want Jessica to know first?
                </label>
                <p className="mt-3 text-[#67545D]">Optional. Share as much or as little as you like.</p>
                <textarea
                  id="application-note"
                  value={answers.note}
                  onChange={(event) => set("note", event.target.value.slice(0, 600))}
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="In your own words"
                />
                <p className="mt-2 text-right text-xs font-semibold text-[#8A7480]">{answers.note.length} / 600</p>
              </div>
            )}

            {step === "contact" && (
              <div>
                <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#381626] sm:text-4xl">Where should we confirm your call?</h3>
                <p className="mt-3 text-[#67545D]">Next you will choose a time. The team reviews each request and confirms by email.</p>
                <div className="mt-6 grid gap-4">
                  <label className="block text-sm font-bold text-[#4B1530]">
                    First name
                    <input value={answers.name} onChange={(event) => set("name", event.target.value)} autoComplete="given-name" aria-invalid={!!errors.name} className={inputClass} />
                    {errors.name && <span className="mt-1.5 block text-sm font-semibold text-[#B3261E]">{errors.name}</span>}
                  </label>
                  <label className="block text-sm font-bold text-[#4B1530]">
                    Email
                    <input type="email" inputMode="email" value={answers.email} onChange={(event) => set("email", event.target.value)} autoComplete="email" aria-invalid={!!errors.email} className={inputClass} />
                    {errors.email && <span className="mt-1.5 block text-sm font-semibold text-[#B3261E]">{errors.email}</span>}
                  </label>
                  <label className="block text-sm font-bold text-[#4B1530]">
                    WhatsApp number <span className="font-semibold text-[#8A7480]">(optional)</span>
                    <input type="tel" inputMode="tel" value={answers.phone} onChange={(event) => set("phone", event.target.value)} autoComplete="tel" className={inputClass} placeholder="+234" />
                  </label>
                </div>
                <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-[#6F5863]">
                  <Lock size={15} className="mt-0.5 shrink-0" />
                  <span>
                    Your answers are sent to Jessica&apos;s team with your booking, through Calendly. This website does not store them.{" "}
                    <Link href="/privacy" onClick={onNavigate} className="font-bold text-[#8D2F5B] underline underline-offset-4">Privacy policy</Link>
                  </span>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#4B1530]/10 px-5 py-3.5 sm:px-9">
        <button
          type="button"
          onClick={back}
          disabled={index === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-[#4B1530] transition-colors hover:bg-[#F4E4E9] disabled:invisible"
        >
          <ArrowLeft size={16} /> Back
        </button>
        {step === "topics" && (
          <button type="button" onClick={() => forward()} disabled={answers.topics.length === 0} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#4B1530] px-6 text-sm font-bold text-white transition-colors hover:bg-[#6A2044] disabled:opacity-40">
            Continue <ArrowRight size={16} />
          </button>
        )}
        {step === "suggest" && (
          <button type="button" onClick={() => forward()} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#4B1530] px-6 text-sm font-bold text-white transition-colors hover:bg-[#6A2044]">
            I still want a call <ArrowRight size={16} />
          </button>
        )}
        {step === "note" && (
          <button type="button" onClick={() => forward()} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#4B1530] px-6 text-sm font-bold text-white transition-colors hover:bg-[#6A2044]">
            {answers.note.trim() ? "Continue" : "Skip"} <ArrowRight size={16} />
          </button>
        )}
        {step === "contact" && (
          <button type="button" onClick={submit} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#C20C78] px-6 text-sm font-bold text-white transition-colors hover:bg-[#A80A68]">
            Choose a time <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

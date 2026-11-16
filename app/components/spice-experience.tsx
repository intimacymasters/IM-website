"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarHeart, Dices, Droplets, Flame, HandHeart, Heart, KeyRound, Lock, MessageCircleHeart, RotateCcw, Send, Shirt, Sparkles, Target } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { productBySlug } from "../lib/site";
import { BookingButton } from "./booking";
import { GuideForm } from "./guide-form";
import { Price } from "./sections";
import { type Mood, SpiceCouple } from "./spice-characters";

/* ---------- Content ---------- */

const myths = [
  { myth: "Spicy means acrobatics.", truth: "It means being wanted, and saying so." },
  { myth: "It should just happen.", truth: "The best nights are planned. Ask any couple who still has them." },
  { myth: "Good wives do not ask.", truth: "It was made for both of you. Ask. Loudly, if you like." },
  { myth: "Needing help means something is wrong.", truth: "Athletes have coaches. Lovers can too." },
  { myth: "After children, that season is over.", truth: "It changes. It does not end." },
  { myth: "Talking about it kills the mood.", truth: "Talking about it is the mood." },
];

const questions = [
  {
    q: "Open your chat with your spouse. What is in there?",
    options: ["Bills, school runs and groceries", "The occasional “love you”", "Some flirting, now and then", "Things we would never show anyone"],
  },
  {
    q: "Who usually starts it?",
    options: ["Nobody, lately", "Always the same one of us", "We take turns", "Whoever gets there first"],
  },
  {
    q: "When did you last try something new together?",
    options: ["I honestly cannot remember", "More than a year ago", "Some time this year", "This month"],
  },
  {
    q: "Can you tell your spouse exactly what you enjoy?",
    options: ["I would rather hide", "I hint and hope", "Yes, if they ask", "Yes, in detail"],
  },
  {
    q: "How do you both feel afterwards?",
    options: ["Relieved it is over", "Fine", "Close", "Already planning round two"],
  },
];

type Level = {
  name: string;
  line: string;
  text: string;
  mood: Mood;
  color: string;
  product?: string;
  call?: boolean;
};

const levels: Level[] = [
  {
    name: "Room temperature",
    line: "The bed is for sleeping. For now.",
    text: "You love each other. The fire has not gone out, it just needs lighting again, and that takes a plan rather than luck.",
    mood: 0,
    color: "#7FA6C9",
    product: "marriage-maintenance",
    call: true,
  },
  {
    name: "Warming up",
    line: "Sparks on birthdays and anniversaries.",
    text: "Good things happen, mostly on special occasions. A few small habits will make them happen on ordinary Tuesdays too.",
    mood: 1,
    color: "#F5A623",
    product: "intimacy-card",
  },
  {
    name: "Properly hot",
    line: "You flirt in the kitchen and finish upstairs.",
    text: "This is a healthy, happy intimate life. Now keep it interesting, so that it never slides back into routine.",
    mood: 2,
    color: "#FF6B4A",
    product: "outercourse",
  },
  {
    name: "Pepper soup",
    line: "On fire. The neighbours may have questions.",
    text: "You have what most couples want. Protect it, keep learning each other, and pass the secret on to a couple who needs it.",
    mood: 3,
    color: "#E0263C",
    product: "couples-bundle",
  },
];

const ways = [
  { icon: MessageCircleHeart, title: "Say it plainly", text: "“I want you tonight.” Or the four letter version, if that is how the two of you talk." },
  { icon: Send, title: "Send the text", text: "Not about bills. Not about the children. “I am the menu tonight.” Then put the phone down." },
  { icon: KeyRound, title: "Invent a code", text: "A word, an emoji, a look across a crowded room. Only the two of you know what it means." },
  { icon: Shirt, title: "Dress for one", text: "“I wore this for your eyes only.” Or wear nothing at all, and say that instead." },
  { icon: Heart, title: "Kiss like you mean it", text: "Slow, deep, unhurried. The kind that forgets dinner is on the stove." },
  { icon: Droplets, title: "Shower for two", text: "Warm water, a locked door, soap in the wrong hands. See where it goes." },
  { icon: Target, title: "Be specific", text: "“Slower.” “There.” “Do not stop.” Nobody can read your mind, so say it." },
  { icon: HandHeart, title: "Skin to skin", text: "Clothes off, under the covers, no agenda for ten minutes. It rarely stays at ten." },
  { icon: Sparkles, title: "The slow build", text: "A long hug at 8am. A whisper at noon. By evening, nobody needs an invitation." },
  { icon: CalendarHeart, title: "Book the night", text: "Put sex in the diary. Wanting it all day is half the pleasure." },
];

const dares: Record<string, { color: string; items: string[] }> = {
  Mild: {
    color: "#F5A623",
    items: [
      "Send one flirty text before 5pm. No emoji to soften it.",
      "Hold a hug for twenty full seconds when they walk in.",
      "Tell them one thing they did this week that turned your head.",
      "Phones off at nine. Go to bed at the same time.",
      "Kiss them goodbye like you are not coming back until midnight.",
    ],
  },
  Hot: {
    color: "#FF6B4A",
    items: [
      "Undress each other. Slowly. No helping yourself.",
      "Warm oil, warm hands, twenty minutes. Clothes are in the way.",
      "Shower together tonight. You do the washing.",
      "Text them at work exactly what tonight involves.",
      "Wear the thing. You know the one. Or wear nothing.",
    ],
  },
  "Pepper soup": {
    color: "#E0263C",
    items: [
      "Tell them one thing you have always wanted to try. Then try it.",
      "Lights on. Eyes open. No rushing.",
      "You are in charge tonight. Say exactly what you want done.",
      "Not the bedroom. Anywhere but the bedroom.",
      "Tell them where you want to be kissed. Be precise.",
      "Make them wait. Then make them wait a little longer.",
    ],
  },
};

const teaseWords = ["Slower", "Deeper", "Closer", "Longer", "Louder", "Again"];

const whispers = [
  "I have been thinking about you all day.",
  "Come to bed early tonight.",
  "Lock the door.",
  "Wear nothing to bed.",
  "Do not make plans for Saturday morning.",
  "I want you. That is the whole message.",
];


/* ---------- Small pieces ---------- */

const ease = [0.16, 1, 0.3, 1] as const;

function Rise({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 46, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function MythCard({ myth, truth, index }: { myth: string; truth: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      className="spice-flip group h-56 w-full text-left sm:h-60"
    >
      <span className={`spice-flip-inner ${flipped ? "is-flipped" : ""}`}>
        <span className="spice-flip-face border border-white/14 bg-white/[0.07] backdrop-blur-sm">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">Myth {String(index + 1).padStart(2, "0")}</span>
          <span className="font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white">{myth}</span>
          <span className="flex items-center gap-2 text-sm font-bold text-[#FFB6C8]"><RotateCcw size={14} /> Tap for the truth</span>
        </span>
        <span className="spice-flip-face spice-flip-back bg-[#F6B7C9] text-[#381626]">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8D2F5B]">Truth</span>
          <span className="font-display text-[1.7rem] font-semibold italic leading-[1.08] tracking-[-0.03em]">{truth}</span>
          <Flame size={20} className="text-[#C20C78]" />
        </span>
      </span>
    </button>
  );
}

/* ---------- The spice meter ---------- */

function SpiceMeter() {
  const [answers, setAnswers] = useState<number[]>([]);
  const reduceMotion = useReducedMotion();
  const step = answers.length;
  const done = step >= questions.length;
  const score = answers.reduce((sum, value) => sum + value, 0);
  const level = levels[Math.min(levels.length - 1, Math.floor(score / 4))];
  const product = done && level.product ? productBySlug(level.product) : null;
  const liveMood = (done ? level.mood : Math.min(3, Math.floor((score / Math.max(1, step * 3)) * 3.99))) as Mood;

  return (
    <div className="grid gap-8 rounded-[2.4rem] border border-white/14 bg-[#1F0A14]/55 p-6 backdrop-blur-md sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
      <div className="mx-auto w-full max-w-[280px] lg:max-w-none">
        <SpiceCouple mood={step === 0 ? 0 : liveMood} />
        <div className="mt-6" aria-hidden="true">
          <div className="h-3 overflow-hidden rounded-full bg-white/12">
            <motion.div
              className="h-full origin-left rounded-full"
              initial={false}
              animate={{ scaleX: done ? Math.max(0.08, score / 15) : step / questions.length, backgroundColor: done ? level.color : "#F6B7C9" }}
              transition={{ type: "spring", bounce: 0, duration: reduceMotion ? 0 : 0.7 }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
            <span>Mild</span>
            <span>Pepper soup</span>
          </div>
        </div>
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <motion.div
              key={step}
              role="group"
              aria-label={questions[step].q}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -40, filter: "blur(8px)" }}
              transition={{ duration: reduceMotion ? 0.12 : 0.45, ease }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FFB6C8]">Question {step + 1} of {questions.length}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-4xl">{questions[step].q}</h3>
              <div className="mt-6 grid gap-2.5">
                {questions[step].options.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers((current) => [...current, index])}
                    className="group flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-white/16 bg-white/[0.06] px-5 py-3.5 text-left text-base font-bold text-white transition-colors hover:border-[#F6B7C9] hover:bg-[#F6B7C9] hover:text-[#381626]"
                  >
                    {option}
                    <ArrowRight size={17} className="shrink-0 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-white/50"><Lock size={13} /> Nothing you tap is saved or sent anywhere.</p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: reduceMotion ? 0.12 : 0.7, ease }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FFB6C8]">Your spice level</p>
              <h3 className="mt-3 font-display text-5xl font-semibold italic leading-[0.98] tracking-[-0.04em] sm:text-6xl" style={{ color: level.color }}>{level.name}.</h3>
              <p className="mt-4 text-xl font-bold text-white">{level.line}</p>
              <p className="mt-3 max-w-xl leading-relaxed text-white/72">{level.text}</p>

              {product && (
                <a href={product.href} target="_blank" rel="noreferrer" className="group mt-6 flex items-center gap-4 rounded-2xl border border-white/14 bg-white/[0.06] p-3 pr-5 transition-colors hover:bg-white/[0.12]">
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#F4E4E9]">
                    <Image src={product.cover} alt="" fill sizes="64px" className="object-contain" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#FFB6C8]">Made for this level</span>
                    <span className="mt-0.5 block font-bold leading-tight text-white">{product.title}</span>
                    <Price ngn={product.ngn} usd={product.usd} wasNgn={product.wasNgn} light className="mt-0.5" />
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#unlock" className="group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#F6B7C9] px-6 py-3 text-sm font-bold text-[#381626] hover:bg-[#F9CAD7]">
                  Get the free 20 ways guide <ArrowDown size={16} />
                </a>
                {level.call && <BookingButton tone="light">Talk to Jessica, free</BookingButton>}
                <button type="button" onClick={() => setAnswers([])} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-sm font-bold text-white hover:bg-white/10">
                  <RotateCcw size={15} /> Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function WayCard({ way, index }: { way: (typeof ways)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      aria-expanded={open}
      className={`spice-way group h-full w-full rounded-[1.8rem] border border-white/14 bg-[#1F0A14]/45 p-6 text-left backdrop-blur-sm ${open ? "is-open" : ""}`}
    >
      <span className="flex items-start justify-between">
        <span className="grid size-13 place-items-center rounded-2xl bg-[#F6B7C9] p-3 text-[#4B1530] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"><way.icon size={24} /></span>
        <span className="numeral text-5xl text-white/18">{String(index + 1).padStart(2, "0")}</span>
      </span>
      <span className="mt-7 block font-display text-[1.7rem] font-semibold leading-tight tracking-[-0.03em]">{way.title}</span>
      <span className="spice-peek mt-3 block leading-relaxed text-white/80">{way.text}</span>
      <span className="spice-peek-hint mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#FFB6C8]"><Flame size={12} /> Tap to uncover</span>
    </button>
  );
}

/* ---------- Things to whisper ---------- */

function Whispers() {
  const reduceMotion = useReducedMotion();
  const [line, setLine] = useState(0);
  const [length, setLength] = useState(reduceMotion ? whispers[0].length : 0);

  useEffect(() => {
    if (reduceMotion) return;
    const full = whispers[line].length;
    // Type the line out, hold it, then move to the next one.
    const timer = window.setTimeout(
      () => {
        if (length < full) setLength(length + 1);
        else {
          setLine((line + 1) % whispers.length);
          setLength(0);
        }
      },
      length < full ? 55 : 2200,
    );
    return () => window.clearTimeout(timer);
  }, [length, line, reduceMotion]);

  if (reduceMotion) {
    return (
      <ul className="mx-auto max-w-3xl space-y-3 text-center font-display text-3xl italic text-white">
        {whispers.map((item) => <li key={item}>“{item}”</li>)}
      </ul>
    );
  }
  return (
    <p className="spice-quote mx-auto min-h-[3.2em] max-w-4xl text-center italic text-white" aria-live="off">
      <span aria-hidden="true">“{whispers[line].slice(0, length)}</span>
      <span className="spice-caret" aria-hidden="true" />
      <span className="sr-only">{whispers.join(" ")}</span>
    </p>
  );
}

/* ---------- The door ---------- */

const GATE_KEY = "tim-spice-entered";

function SpiceGate({ onEnter }: { onEnter: () => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="spice-gate-title"
      className="spice-gate fixed inset-0 grid place-items-center overflow-y-auto bg-[#1A0811] px-6 pb-10 pt-28 text-center text-white"
      exit={reduceMotion ? { opacity: 0 } : { clipPath: "circle(0% at 50% 62%)" }}
      initial={false}
      animate={{ clipPath: "circle(150% at 50% 62%)" }}
      transition={{ duration: reduceMotion ? 0.2 : 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative max-w-xl">
        <div className="mx-auto w-44"><SpiceCouple mood={2} /></div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#FFB6C8]">18+ · Married couples</p>
        <h2 id="spice-gate-title" className="mt-3 font-display text-5xl font-semibold italic leading-[0.98] tracking-[-0.04em] sm:text-6xl">Grown ups only.</h2>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-white/75">
          What is behind this door talks plainly, and playfully, about sex in marriage.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={onEnter} autoFocus className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#F6B7C9] px-8 text-base font-bold text-[#381626] hover:bg-[#F9CAD7]">
            <KeyRound size={18} className="transition-transform duration-500 group-hover:rotate-45" /> I am grown. Let me in
          </button>
          <Link href="/" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 px-7 text-base font-bold text-white hover:bg-white/10">
            Take me back
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Tonight's dare ---------- */

function DareDealer() {
  const heats = Object.keys(dares);
  const [heat, setHeat] = useState(heats[1]);
  const [deal, setDeal] = useState<{ text: string; count: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const set = dares[heat];

  const dealOne = (from = heat) => {
    const pool = dares[from].items.filter((item) => item !== deal?.text);
    setDeal({ text: pool[Math.floor(Math.random() * pool.length)], count: (deal?.count ?? 0) + 1 });
  };

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div role="radiogroup" aria-label="How hot?" className="inline-flex flex-wrap justify-center gap-2 rounded-full border border-white/16 bg-[#1F0A14]/50 p-1.5 backdrop-blur-sm">
        {heats.map((name) => {
          const selected = name === heat;
          return (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => {
                setHeat(name);
                if (deal) dealOne(name);
              }}
              className="relative min-h-11 rounded-full px-5 text-sm font-bold text-white transition-colors"
            >
              {selected && <motion.span layoutId="dare-heat" className="absolute inset-0 rounded-full" style={{ backgroundColor: dares[name].color }} transition={{ type: "spring", bounce: 0.2, duration: reduceMotion ? 0 : 0.5 }} />}
              <span className="relative flex items-center gap-1.5">
                {name}
                <span className="flex" aria-hidden="true">
                  {Array.from({ length: heats.indexOf(name) + 1 }).map((_, index) => <Flame key={index} size={12} fill="currentColor" />)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="spice-flip mt-8 h-64 sm:h-72" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={deal ? `${heat}-${deal.count}` : "back"}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: -90, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: 90, scale: 0.9 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.45, ease }}
            className="flex h-full flex-col items-center justify-center rounded-[2rem] border p-8 shadow-[0_40px_90px_rgba(0,0,0,0.4)]"
            style={deal ? { backgroundColor: "#FFF9F5", borderColor: set.color, color: "#381626" } : { backgroundColor: "rgba(31,10,20,0.6)", borderColor: "rgba(255,255,255,0.2)" }}
          >
            {deal ? (
              <>
                <span className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: set.color }}>Tonight&apos;s dare · {heat}</span>
                <p className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">{deal.text}</p>
              </>
            ) : (
              <>
                <Dices size={40} className="text-[#F6B7C9]" />
                <p className="mt-5 font-display text-3xl font-semibold italic tracking-[-0.03em] text-white sm:text-4xl">Feeling brave?</p>
                <p className="mt-2 text-white/65">Pick your heat, then deal.</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => dealOne()}
        className="group mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#F6B7C9] px-8 text-base font-bold text-[#381626] hover:bg-[#F9CAD7]"
      >
        <Dices size={19} className="transition-transform duration-500 group-hover:rotate-180" />
        {deal ? "Deal another" : "Deal me a dare"}
      </button>
    </div>
  );
}

/* ---------- The page ---------- */

export function SpiceExperience() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  // The whole page heats up as you scroll, then cools for the closing sections.
  const background = useTransform(smooth, [0, 0.2, 0.42, 0.62, 0.8, 1], ["#1A0811", "#4B1530", "#8A1045", "#C2123F", "#7A1238", "#2A111E"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.14], [1, 0.86]);
  const heroFade = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.12], ["blur(0px)", "blur(14px)"]);

  // The door: shown until the visitor says they are a married adult.
  const [gate, setGate] = useState(true);
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(GATE_KEY)) setGate(false);
    } catch {
      // Storage blocked: the door simply shows each visit.
    }
  }, []);
  useEffect(() => {
    if (!gate) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [gate]);
  const enter = () => {
    try {
      window.sessionStorage.setItem(GATE_KEY, "1");
    } catch {
      // Ignore: entering still works for this visit.
    }
    setGate(false);
  };

  return (
    <motion.div className="spice-page relative text-white" style={{ backgroundColor: reduceMotion ? "#3D162A" : background }}>
      <AnimatePresence>{gate && <SpiceGate onEnter={enter} />}</AnimatePresence>

      <div className="spice-embers" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index} style={{ left: `${(index * 37) % 100}%`, animationDelay: `${(index * 1.3) % 9}s`, animationDuration: `${9 + (index % 5) * 2}s` }} />
        ))}
      </div>

      {/* Thermometer: fills as the page heats up. */}
      <div className="pointer-events-none fixed left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex" aria-hidden="true">
        <Flame size={18} className="text-[#FF8A3D]" />
        <div className="h-44 w-2 overflow-hidden rounded-full bg-white/12">
          <motion.div className="h-full w-full origin-bottom rounded-full bg-[#FF6B4A]" style={{ scaleY: smooth }} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 [writing-mode:vertical-rl]">Heat</span>
      </div>

      {/* 1. Opening */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-16 pt-32 sm:px-8">
        <motion.div
          className="relative mx-auto max-w-5xl text-center"
          style={reduceMotion ? undefined : { scale: heroScale, opacity: heroFade, filter: heroBlur }}
        >
          <p className="hero-rise inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FFB6C8]">
            <Flame size={14} /> 18+ · For married couples only
          </p>
          <h1 className="spice-title mt-7">
            <span className="hero-rise block">What is a</span>
            <span className="hero-rise hero-rise-late spice-shimmer block italic">spicy</span>
            <span className="hero-rise spice-rise-3 block">sex life?</span>
          </h1>
          <p className="hero-rise spice-rise-4 mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Not what the films told you. Hotter, slower, and entirely yours. Let Pepper and Honey show you.
          </p>
          <div className="hero-rise spice-rise-4 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#meter" className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#F6B7C9] px-7 text-base font-bold text-[#381626] hover:bg-[#F9CAD7]">
              Check your spice level <Flame size={18} className="transition-transform group-hover:scale-125" />
            </a>
            <a href="#dare" className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-base font-bold text-white hover:bg-white/10">
              <Dices size={18} className="transition-transform duration-500 group-hover:rotate-180" /> Deal me a dare
            </a>
          </div>
        </motion.div>
        <a href="#story" aria-label="Scroll to the story" className="spice-scroll-cue absolute bottom-7 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-full border border-white/25 text-white/80">
          <ArrowDown size={18} />
        </a>
      </section>

      <div className="spice-tease relative overflow-hidden border-y border-white/12 py-5 sm:py-7" aria-hidden="true">
        <div className="phrase-track">
          {[...teaseWords, ...teaseWords, ...teaseWords, ...teaseWords].map((word, index) => (
            <span key={index} className="flex items-center gap-8 pr-8 font-display text-5xl font-semibold italic tracking-[-0.04em] sm:text-7xl">
              <span className={index % 2 ? "spice-outline" : "text-[#F6B7C9]"}>{word}.</span>
              <Flame size={24} className="shrink-0 text-[#FF8A3D]" fill="currentColor" />
            </span>
          ))}
        </div>
      </div>

      {/* 2. Meet the couple */}
      <section id="story" className="relative px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Rise className="mx-auto w-full max-w-sm">
            <SpiceCouple mood={0} />
          </Rise>
          <Rise delay={0.1}>
            <p className="eyebrow text-[#FFB6C8]">Meet Pepper and Honey</p>
            <h2 className="spice-heading mt-4">Married eight years. Asleep by <em className="italic text-[#F6B7C9]">nine.</em></h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/75">
              <p>Two children. One shared calendar. A group chat that is entirely about school fees.</p>
              <p>They love each other. They are also, if they are honest, <strong className="text-white">roommates.</strong></p>
              <p>Sound like anyone you know?</p>
            </div>
          </Rise>
        </div>
      </section>

      {/* 3. Myths */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Rise className="max-w-3xl">
            <h2 className="spice-heading mt-4">Six things nobody should have <em className="italic text-[#F6B7C9]">told you.</em></h2>
            <p className="mt-5 text-lg text-white/70">Tap each card to turn it over.</p>
          </Rise>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myths.map((item, index) => (
              <Rise key={item.myth} delay={(index % 3) * 0.08}>
                <MythCard myth={item.myth} truth={item.truth} index={index} />
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The definition */}
      <section className="relative overflow-hidden px-6 py-24 text-center sm:px-8 sm:py-36">
        <Rise className="mx-auto max-w-4xl">
          <p className="spice-quote mt-6">
            Spicy is two people who <em className="italic text-[#FFD9A8]">want</em> each other, <em className="italic text-[#FFD9A8]">say</em> so, and take their <em className="italic text-[#FFD9A8]">time.</em>
          </p>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/80">No performance. No pressure. Just heat, on purpose. And it can be learned.</p>
        </Rise>
      </section>

      {/* Things to whisper */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-32">
        <Rise className="mx-auto max-w-3xl text-center">
          <h2 className="spice-heading mt-4">Things to <em className="italic text-[#FFD9A8]">whisper.</em></h2>
          <p className="mt-5 text-lg text-white/80">In their ear. In the kitchen. With the children in the next room.</p>
        </Rise>
        <Rise className="mt-12" delay={0.1}>
          <Whispers />
        </Rise>
      </section>

      {/* 5. The meter */}
      <section id="meter" className="relative px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Rise className="mx-auto max-w-3xl text-center">
            <h2 className="spice-heading mt-4">How hot is it at <em className="italic text-[#FFD9A8]">your</em> house?</h2>
            <p className="mt-5 text-lg text-white/80">Five honest taps. About a minute. Watch what happens to Pepper and Honey.</p>
          </Rise>
          <Rise className="mt-12" delay={0.1}>
            <SpiceMeter />
          </Rise>
        </div>
      </section>

      {/* 6. The ways */}
      <section id="ways" className="relative px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Rise className="max-w-3xl">
            <h2 className="spice-heading mt-4">Ten ways to start <em className="italic text-[#F6B7C9]">something.</em></h2>
            <p className="mt-5 text-lg text-white/75">Try one tonight. There are ten more where these came from.</p>
          </Rise>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {ways.map((way, index) => (
              <Rise key={way.title} delay={(index % 5) * 0.06} className="h-full">
                <WayCard way={way} index={index} />
              </Rise>
            ))}
          </div>
          <Rise className="mt-4">
            <a href="#unlock" className="group flex flex-col items-start justify-between gap-4 rounded-[1.8rem] border border-dashed border-white/30 bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.09] sm:flex-row sm:items-center">
              <span className="flex items-center gap-4">
                <span className="grid size-13 shrink-0 place-items-center rounded-2xl border border-white/25 p-3"><Lock size={22} /></span>
                <span>
                  <span className="block font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Ways 11 to 20 are in the guide.</span>
                  <span className="mt-1 block text-white/65">They get bolder. It is free.</span>
                </span>
              </span>
              <span className="inline-flex items-center gap-2 font-bold text-[#F6B7C9]">Unlock all 20 <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" /></span>
            </a>
          </Rise>
        </div>
      </section>

      {/* Tonight's dare */}
      <section id="dare" className="relative px-6 py-24 sm:px-8 sm:py-32">
        <Rise className="mx-auto max-w-3xl text-center">
          <h2 className="spice-heading mt-4">Tonight&apos;s <em className="italic text-[#FFD9A8]">dare.</em></h2>
          <p className="mt-5 text-lg text-white/80">Choose how hot. Deal a card. Do it before midnight.</p>
        </Rise>
        <Rise className="mt-10" delay={0.1}>
          <DareDealer />
        </Rise>
      </section>

      {/* 7. Unlock */}
      <section id="unlock" className="relative px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Rise>
            <p className="eyebrow text-[#FFB6C8]">Free guide</p>
            <h2 className="spice-heading mt-4">Take all 20 ways <em className="italic text-[#F6B7C9]">home.</em></h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
              Jessica&apos;s 56 page guide for married couples. Frank, grown up language. Read it together.
            </p>
            <div className="mt-8 w-full max-w-[240px]">
              <SpiceCouple mood={3} />
            </div>
          </Rise>
          <Rise delay={0.1}>
            <GuideForm />
          </Rise>
        </div>
      </section>

      {/* 8. The woman behind it */}
      <section className="relative px-6 pb-28 pt-12 sm:px-8 sm:pb-36">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[2.4rem] border border-white/14 bg-[#1F0A14]/50 p-7 backdrop-blur-sm sm:p-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
          <Rise className="mx-auto w-[220px] sm:w-[260px]">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-[#F6B7C9]">
              <Image src="/images/jessica-laughing.jpg" alt="Jessica Sampson laughing" fill sizes="260px" className="object-cover object-[50%_15%]" />
            </div>
          </Rise>
          <Rise delay={0.1}>
            <p className="eyebrow text-[#FFB6C8]">The woman behind Pepper and Honey</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl">Jessica Sampson has taught more than 1,500 people to have this conversation.</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Licensed clinical sexologist. A believer. Very hard to shock. If you would rather talk than read, the first call is free.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BookingButton tone="pink">Request a free discovery call</BookingButton>
              <Link href="/couples" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                See the couples path <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Rise>
        </div>
      </section>
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Heart,
  Mail,
  Menu,
  MessageCircleHeart,
  Quote,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const bookingUrl = "https://selar.co/bookacallwithcoachjess";
const consultationUrl = "https://selar.co/IntimateConsultation";

const audiences = [
  {
    icon: Heart,
    title: "Wives & individuals",
    text: "Find your voice, understand your needs, and approach intimacy with confidence rather than shame.",
    color: "bg-[#FDE2E8]",
  },
  {
    icon: Users,
    title: "Couples",
    text: "Make space for honest conversations, renewed closeness, and a relationship that feels like home again.",
    color: "bg-[#F2E7FF]",
  },
  {
    icon: School,
    title: "Parents & communities",
    text: "Build age-appropriate conversations about bodies, boundaries, consent, and growing up safely.",
    color: "bg-[#E3F5EE]",
  },
];

const services = [
  {
    number: "01",
    title: "Discovery call",
    text: "A gentle first conversation to understand what you need and choose a clear next step.",
    href: bookingUrl,
    cta: "Book a discovery call",
  },
  {
    number: "02",
    title: "Private consultation",
    text: "Personal support for intimacy, relationship, and sexuality concerns, whether individually or as a couple.",
    href: consultationUrl,
    cta: "Book a consultation",
  },
  {
    number: "03",
    title: "Speaking & workshops",
    text: "Thoughtful sessions for churches, schools, events, and organisations, shaped around your audience.",
    href: "mailto:Intimacymasters@gmail.com?subject=Speaking%20and%20workshop%20enquiry",
    cta: "Invite Jessica",
  },
  {
    number: "04",
    title: "Books & resources",
    text: "Practical tools for marriage, intimacy, parenting conversations, and healthier connection at home.",
    href: "https://selar.co/womansexwasmadeforyoutoo",
    cta: "Explore resources",
  },
];

const testimonials = [
  {
    quote:
      "I cannot remember the last time I enjoyed myself like this. Thank you for helping us reconnect.",
    label: "Private coaching client",
    tag: "Renewed connection",
  },
  {
    quote:
      "I found you speaking and realised: this is my marriage too. Intimacy can be good for both of us.",
    label: "Community member",
    tag: "Confidence & voice",
  },
  {
    quote:
      "You helped me through a battle I had carried for years. I can now love my wife more intentionally.",
    label: "Anonymous client",
    tag: "Personal breakthrough",
  },
  {
    quote:
      "The practical guidance brought playfulness back into our home. We feel close again.",
    label: "Programme participant",
    tag: "Marriage enrichment",
  },
];

const faqs = [
  {
    q: "Is The Intimacy Masters for Christians?",
    a: "Yes. Jessica's work is faith-centered and creates room to explore emotional and sexual connection while respecting Christian values, personal dignity, and the realities of married life.",
  },
  {
    q: "Do we need to be experiencing a serious problem?",
    a: "Not at all. You can seek support when something feels difficult or simply because you want to invest in communication, closeness, and a more fulfilling relationship.",
  },
  {
    q: "I feel embarrassed talking about sex. Where do I start?",
    a: "You do not need perfect words. Begin with the question or concern that feels most important. The conversation is compassionate, practical, and free of shame.",
  },
  {
    q: "Can I work with Jessica as an individual?",
    a: "Yes. Jessica works with individuals and couples, with private support shaped around your questions, needs, and relationship experience.",
  },
  {
    q: "Do you work with schools, churches, or organisations?",
    a: "Yes. Jessica offers teaching, workshops, group coaching, parent-child communication sessions, and age-appropriate sexuality education for schools and communities.",
  },
];

function ButtonLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
        light
          ? "bg-white text-[#381626] hover:bg-[#FFF4F7] focus-visible:outline-white"
          : "bg-[#4B1530] text-white hover:bg-[#6A2044] focus-visible:outline-[#4B1530]"
      }`}
    >
      {children}
      <ArrowRight size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#67545D]">{text}</p>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { type: "spring" as const, bounce: 0, duration: 0.65 },
      };

  return (
    <main className="overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-[#fff8f5]/80 px-5 py-3 shadow-[0_12px_45px_rgba(67,20,42,0.09)] backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-2.5" aria-label="The Intimacy Masters home">
            <span className="grid size-9 place-items-center rounded-full bg-[#4B1530] text-white">
              <Heart size={17} fill="currentColor" />
            </span>
            <span className="text-[13px] font-black uppercase leading-[1.05] tracking-[0.08em] text-[#381626] sm:text-sm">
              The Intimacy<br />Masters
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-[#4F3A44] lg:flex">
            <a href="#about" className="nav-link">About Jessica</a>
            <a href="#support" className="nav-link">Who she serves</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#stories" className="nav-link">Stories</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="hidden lg:block">
            <ButtonLink href={bookingUrl}>Let&apos;s talk</ButtonLink>
          </div>
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full bg-[#4B1530] text-white lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="mx-auto mt-2 grid max-w-7xl gap-1 rounded-[2rem] border border-white/80 bg-[#fff8f5]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              {[
                ["About Jessica", "#about"],
                ["Who she serves", "#support"],
                ["Services", "#services"],
                ["Testimonials", "#stories"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-bold text-[#381626] hover:bg-[#FDE2E8]"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2"><ButtonLink href={bookingUrl}>Book a discovery call</ButtonLink></div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="top" className="relative min-h-[820px] bg-[#F6B7C9] pt-28 sm:min-h-[900px]">
        <Image
          src="/images/jessica-hero.jpg"
          alt="Jessica Sampson smiling in a professional portrait"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[57%_56%] sm:object-[58%_52%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,243,238,0.97)_0%,rgba(255,243,238,0.82)_39%,rgba(255,243,238,0.12)_68%,rgba(75,21,48,0.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(255,243,238,0.96)_0%,rgba(255,243,238,0.72)_49%,rgba(75,21,48,0.08)_100%)]" />
        <div className="relative mx-auto flex min-h-[690px] max-w-7xl items-start px-6 pt-20 sm:px-8 md:items-center md:pt-4 lg:px-10">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 26 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.75 }}
            className="max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4B1530]/10 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4B1530] backdrop-blur-md">
              <Sparkles size={14} /> Faith-centered intimacy guidance
            </div>
            <h1 className="hero-title text-[#321321]">
              A deeper connection.<br />
              <span className="text-[#8D2F5B]">A more fulfilling marriage.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#4F3A44] sm:text-xl">
              Honest conversations and practical support for Christians who want to reconnect emotionally, relationally, and physically.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={bookingUrl}>Book a discovery call</ButtonLink>
              <motion.a
                href="#services"
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#4B1530]/20 bg-white/65 px-6 py-3 text-sm font-bold text-[#4B1530] backdrop-blur-md hover:bg-white"
              >
                Explore support <ChevronDown size={17} />
              </motion.a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#5B4650]">
              {["Compassionate", "Confidential", "Practical"].map((item) => (
                <span key={item} className="flex items-center gap-2"><Check size={15} /> {item}</span>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold text-[#4B1530] backdrop-blur-lg md:flex">
          <ShieldCheck size={15} /> A shame-free space for honest questions
        </div>
      </section>

      <section aria-label="Recognition and community" className="border-y border-[#4B1530]/10 bg-[#3D162A] py-5 text-white">
        <div className="marquee">
          <div className="marquee-track">
            {[...Array(2)].flatMap((_, group) => [
              "ELOY Awards 2022",
              "20,000+ women educated",
              "5,000+ men reached",
              "Schools & parent communities",
              "Churches & organisations",
            ].map((item, index) => (
              <div key={`${group}-${index}`} className="flex items-center gap-4 px-7 text-sm font-bold uppercase tracking-[0.14em] text-white/85">
                <Heart size={13} fill="currentColor" className="text-[#F3A6BD]" /> {item}
              </div>
            )))}
          </div>
        </div>
      </section>

      <section id="about" className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
          <motion.div {...reveal} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] bg-[#F6B7C9] shadow-[0_30px_80px_rgba(75,21,48,0.14)]">
              <Image
                src="/images/jessica-about.jpg"
                alt="Jessica Sampson, founder of The Intimacy Masters"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[51%_42%]"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 max-w-[235px] rounded-[1.6rem] border border-white bg-white/88 p-5 shadow-xl backdrop-blur-xl sm:-right-6">
              <p className="font-display text-4xl font-semibold text-[#8D2F5B]">25,000+</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-[#5B4650]">women and men educated on healthier intimacy and relationships</p>
            </div>
          </motion.div>

          <motion.div {...reveal}>
            <SectionIntro
              eyebrow="Meet Jessica"
              title="The woman behind the honest conversations."
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#5F4B55]">
              <p>
                Jessica Sampson is an award-winning licensed clinical sexologist, family life practitioner, author, and founder of The Intimacy Masters.
              </p>
              <p>
                She helps couples and individuals find language for questions that are often hard to say out loud, including marriage, desire, emotional connection, and sexual wellbeing.
              </p>
              <p>
                Her approach brings faith-centered understanding together with practical intimacy education, creating room for your values, your questions, and your desire for something better.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Clinical sexologist", "Family life practitioner", "Author", "Sexual assault referral practitioner"].map((tag) => (
                <span key={tag} className="rounded-full bg-[#F7E6EB] px-4 py-2 text-sm font-bold text-[#6A2044]">{tag}</span>
              ))}
            </div>
            <div className="mt-9"><ButtonLink href={bookingUrl}>Find your next step</ButtonLink></div>
          </motion.div>
        </div>
      </section>

      <section id="support" className="section-pad bg-[#F5EBFF]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal}>
            <SectionIntro
              eyebrow="Who Jessica serves"
              title="Support for the season you are in."
              text="Whether you are finding your voice, navigating disconnection, or preparing a child for the world, there is a thoughtful place to begin."
            />
          </motion.div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {audiences.map((audience, index) => (
              <motion.article
                key={audience.title}
                {...reveal}
                transition={{ type: "spring", bounce: 0, duration: 0.55, delay: index * 0.08 }}
                className="group rounded-[2rem] border border-white/70 bg-white/65 p-7 shadow-[0_18px_55px_rgba(70,33,74,0.07)] backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className={`grid size-14 place-items-center rounded-2xl ${audience.color} text-[#4B1530]`}>
                  <audience.icon size={25} />
                </div>
                <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em] text-[#381626]">{audience.title}</h3>
                <p className="mt-4 leading-relaxed text-[#67545D]">{audience.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section-pad bg-[#3D162A] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal}>
            <p className="eyebrow text-[#F3A6BD]">Services & resources</p>
            <h2 className="section-title mt-4 max-w-3xl text-white">Choose the support that meets you where you are.</h2>
          </motion.div>
          <div className="mt-14 divide-y divide-white/15 border-y border-white/15">
            {services.map((service) => (
              <motion.a
                key={service.number}
                href={service.href}
                target={service.href.startsWith("http") ? "_blank" : undefined}
                rel={service.href.startsWith("http") ? "noreferrer" : undefined}
                {...reveal}
                whileTap={{ scale: 0.995 }}
                className="group grid gap-5 py-8 sm:grid-cols-[75px_1fr_auto] sm:items-center sm:py-10"
              >
                <span className="font-display text-4xl text-[#F3A6BD]">{service.number}</span>
                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{service.title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-white/66">{service.text}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition-colors group-hover:bg-white group-hover:text-[#3D162A]">
                  {service.cta}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-16 grid gap-5 rounded-[2.3rem] bg-[#F6B7C9] p-7 text-[#381626] md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="eyebrow text-[#6A2044]">Keep learning</p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Honest reflections for marriage and family life.</h3>
              <p className="mt-3 max-w-2xl text-[#644452]">Join Jessica&apos;s newsletter for thoughtful guidance you can return to at your own pace.</p>
            </div>
            <ButtonLink href="https://theintimacymasters.substack.com/">Read the newsletter</ButtonLink>
          </div>
        </div>
      </section>

      <section id="stories" className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionIntro
              eyebrow="Real stories"
              title="Small conversations. Meaningful change."
              text="Shared anonymously and lightly edited for clarity to protect the privacy of clients and community members."
            />
            <div className="hidden items-center gap-2 text-sm font-bold text-[#6A2044] sm:flex"><MessageCircleHeart size={18} /> In their own words</div>
          </motion.div>

          <div className="testimonial-scroll mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5">
            {testimonials.map((item, index) => (
              <motion.blockquote
                key={item.quote}
                {...reveal}
                transition={{ type: "spring", bounce: 0, duration: 0.55, delay: index * 0.05 }}
                className={`min-w-[86%] snap-start rounded-[2rem] p-7 sm:min-w-[58%] lg:min-w-[38%] ${index % 2 ? "bg-[#F2E7FF]" : "bg-[#FDE2E8]"}`}
              >
                <Quote size={30} className="text-[#8D2F5B]" fill="currentColor" />
                <p className="mt-8 font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-[#381626] sm:text-3xl">“{item.quote}”</p>
                <footer className="mt-9 flex items-end justify-between gap-4 border-t border-[#4B1530]/12 pt-5">
                  <div>
                    <p className="text-sm font-bold text-[#4B1530]">{item.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#7A626D]">{item.tag}</p>
                  </div>
                  <Heart size={19} className="text-[#8D2F5B]" />
                </footer>
              </motion.blockquote>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold text-[#7A626D] sm:hidden">Swipe to read more →</p>
        </div>
      </section>

      <section id="faq" className="section-pad bg-[#E3F5EE]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <motion.div {...reveal}>
            <SectionIntro eyebrow="Good questions" title="You are allowed to ask." text="No question is too awkward, and you do not need to have everything figured out before you begin." />
            <div className="mt-8"><ButtonLink href={bookingUrl}>Ask your question</ButtonLink></div>
          </motion.div>
          <motion.div {...reveal} className="divide-y divide-[#315547]/20 border-y border-[#315547]/20">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-bold tracking-[-0.02em] text-[#263E35] sm:text-xl">{item.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full bg-white/70">
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.36 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-8 leading-relaxed text-[#516A60]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F6B7C9] px-6 py-8 sm:px-8 lg:px-10">
        <motion.div
          {...reveal}
          className="relative mx-auto min-h-[560px] max-w-7xl overflow-hidden rounded-[2.6rem] bg-[#4B1530] p-8 text-white sm:p-12 lg:p-16"
        >
          <div className="absolute -right-24 -top-24 size-96 rounded-full bg-[#E98BB0]/30 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 size-80 rounded-full bg-[#B882E8]/20 blur-3xl" />
          <div className="relative z-10 flex min-h-[430px] max-w-3xl flex-col justify-center">
            <p className="eyebrow text-[#F6B7C9]">Your next chapter</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              A closer relationship can begin with one honest conversation.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/72">
              You do not have to figure it all out before reaching out. Let&apos;s find the right place for you to begin.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={bookingUrl} light>Book a discovery call</ButtonLink>
              <motion.a
                href={consultationUrl}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Book a private consultation
              </motion.a>
            </div>
          </div>
          <Heart className="absolute -bottom-16 -right-10 size-72 rotate-[-12deg] text-white/[0.06]" fill="currentColor" />
        </motion.div>
      </section>

      <footer className="bg-[#2A111E] px-6 pb-8 pt-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-[#F6B7C9] text-[#4B1530]"><Heart size={20} fill="currentColor" /></span>
                <span className="font-display text-2xl font-semibold">The Intimacy Masters</span>
              </div>
              <p className="mt-6 max-w-md leading-relaxed text-white/62">Faith-centered guidance. Honest conversations. Practical intimacy education for marriage and family life.</p>
              <div className="mt-7 flex gap-3">
                <a href="https://www.instagram.com/theintimacymasters/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white hover:text-[#2A111E]"><Camera size={18} /></a>
                <a href="mailto:Intimacymasters@gmail.com" aria-label="Email" className="grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white hover:text-[#2A111E]"><Mail size={18} /></a>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#F6B7C9]">Explore</p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-white/70">
                <a href="#about" className="hover:text-white">About Jessica</a>
                <a href="#support" className="hover:text-white">Who she serves</a>
                <a href="#services" className="hover:text-white">Services & resources</a>
                <a href="#stories" className="hover:text-white">Testimonials</a>
                <a href="#faq" className="hover:text-white">FAQ</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#F6B7C9]">Work with Jessica</p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-white/70">
                <a href={bookingUrl} target="_blank" rel="noreferrer" className="hover:text-white">Discovery call</a>
                <a href={consultationUrl} target="_blank" rel="noreferrer" className="hover:text-white">Private consultation</a>
                <a href="mailto:Intimacymasters@gmail.com" className="hover:text-white">Speaking & workshops</a>
                <a href="tel:+2348034206121" className="hover:text-white">+234 803 420 6121</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} The Intimacy Masters. All rights reserved.</p>
            <p>Education and coaching are not a substitute for emergency, medical, or psychiatric care.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

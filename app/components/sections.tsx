import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BookingButton } from "./booking";
import { Reveal } from "./reveal";

export function SectionIntro({
  eyebrow,
  title,
  text,
  light = false,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${light ? "text-[#F3A6BD]" : "text-[#8D2F5B]"}`}>{eyebrow}</p>}
      <h2 className={`section-title ${light ? "text-white" : "text-[#381626]"}`}>{title}</h2>
      {text && (
        <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${center ? "mx-auto" : ""} ${light ? "text-white/68" : "text-[#67545D]"}`}>{text}</p>
      )}
    </div>
  );
}

/** Italic serif accent used inside headings. */
export function Accent({ children, className = "text-[#C20C78]" }: { children: React.ReactNode; className?: string }) {
  return <em className={`font-display italic ${className}`}>{children}</em>;
}

type HeroTheme = "cream" | "wine" | "pink" | "mint" | "plum";

const heroThemes: Record<HeroTheme, { section: string; eyebrow: string; title: string; text: string; frame: string; dark: boolean }> = {
  cream: { section: "bg-[#FFF3EE]", eyebrow: "text-[#8D2F5B]", title: "text-[#321321]", text: "text-[#4F3A44]", frame: "bg-[#F6B7C9]", dark: false },
  wine: { section: "bg-[#2A111E]", eyebrow: "text-[#F3A6BD]", title: "text-white", text: "text-white/72", frame: "bg-[#4B1530]", dark: true },
  pink: { section: "bg-[#F6B7C9]", eyebrow: "text-[#6A2044]", title: "text-[#321321]", text: "text-[#4F2E3C]", frame: "bg-[#FFF3EE]", dark: false },
  mint: { section: "bg-[#E3F5EE]", eyebrow: "text-[#1F5A44]", title: "text-[#1E3A30]", text: "text-[#3F5C51]", frame: "bg-[#BFE5D6]", dark: false },
  plum: { section: "bg-[#3D162A]", eyebrow: "text-[#F3A6BD]", title: "text-white", text: "text-white/72", frame: "bg-[#6A2044]", dark: true },
};

/**
 * Opening section for the focused pages: copy on the left, an arched portrait
 * frame on the right (stacked on small screens).
 */
export function PageHero({
  theme,
  eyebrow,
  title,
  text,
  image,
  children,
  note,
}: {
  theme: HeroTheme;
  eyebrow: string;
  title: React.ReactNode;
  text: React.ReactNode;
  image: { src: string; alt: string; position?: string; fit?: "cover" | "contain"; aspect?: string; shape?: "arch" | "soft" };
  children: React.ReactNode;
  note?: React.ReactNode;
}) {
  const t = heroThemes[theme];
  return (
    <section className={`relative overflow-hidden pt-32 sm:pt-36 ${t.section}`}>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-24">
        <div className="hero-rise">
          <p className={`eyebrow ${t.eyebrow}`}>{eyebrow}</p>
          <h1 className={`page-title mt-5 ${t.title}`}>{title}</h1>
          <p className={`mt-6 max-w-xl text-lg leading-relaxed sm:text-xl ${t.text}`}>{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div>
          {note && <p className={`mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold ${t.text}`}>{note}</p>}
        </div>
        <div className="hero-rise hero-rise-late relative mx-auto w-full max-w-md lg:max-w-none">
          <div className={`${image.shape === "soft" ? "rounded-[2rem]" : "arch"} relative overflow-hidden shadow-[0_40px_90px_rgba(42,17,30,0.22)] ${image.aspect ?? "aspect-[4/5]"} ${t.frame}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1023px) 90vw, 42vw"
              className={image.fit === "contain" ? "object-contain p-6 sm:p-10" : "object-cover"}
              style={{ objectPosition: image.position ?? "50% 20%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroNote({ items }: { items: string[] }) {
  return <span>{items.join(" · ")}</span>;
}

export function Price({ ngn, usd, wasNgn, light = false, className = "" }: { ngn: string; usd: string; wasNgn?: string; light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 ${className}`}>
      <span className={`text-lg font-black tracking-[-0.02em] ${light ? "text-white" : "text-[#381626]"}`}>{ngn}</span>
      {wasNgn && <s className={`text-sm font-semibold ${light ? "text-white/45" : "text-[#9A8590]"}`}>{wasNgn}</s>}
      <span className={`text-sm font-semibold ${light ? "text-white/60" : "text-[#7A626D]"}`}>or {usd}</span>
    </span>
  );
}

export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline ${light ? "text-[#F6B7C9]" : "text-[#8D2F5B]"}`}>
      {children} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Closing invitation used at the bottom of every page. */
export function FinalCta({
  title = "A closer relationship can begin with one honest conversation.",
  text = "The first call is free, private, and without pressure.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-[#F6B7C9] px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
      <Reveal className="relative mx-auto min-h-[600px] max-w-7xl overflow-hidden rounded-[2.2rem] bg-[#4B1530] p-7 text-white sm:rounded-[2.6rem] sm:p-12 lg:p-16">
        <div className="absolute inset-x-0 top-0 h-[46%] md:inset-y-0 md:left-auto md:h-auto md:w-[58%]">
          <Image
            src="/images/jessica-pink-suit.jpg"
            alt="Jessica Sampson in a pink suit"
            fill
            sizes="(max-width: 767px) 100vw, 58vw"
            className="object-cover object-[50%_22%]"
          />
        </div>
        <div className="final-cta-veil absolute inset-0" />
        <Image src="/brand/intimacy-masters-symbol.png" alt="" width={360} height={360} className="absolute -bottom-12 -left-12 opacity-[0.08]" />
        <div className="relative z-10 flex min-h-[540px] max-w-3xl flex-col justify-end md:min-h-[470px] md:justify-center">
          <h2 className="font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">{title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/78">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingButton tone="light" />
            <a
              href="https://selar.com/IntimateConsultation"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Book a 1:1 consultation <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

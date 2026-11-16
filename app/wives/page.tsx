import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { BookingButton, WhatsAppButton } from "../components/booking";
import { GuideSignup } from "../components/guide-signup";
import { PageShell } from "../components/page-shell";
import { ProductCard } from "../components/product-card";
import { Reveal } from "../components/reveal";
import { Accent, FinalCta, HeroNote, PageHero, Price, SectionIntro } from "../components/sections";
import { productBySlug } from "../lib/site";

export const metadata: Metadata = {
  title: "For wives",
  description:
    "Wifestars is a private community for wives who want to enjoy intimacy with confidence and without shame. Courses, challenges and personal coaching from Jessica Sampson.",
};

const weeks = ["Pain", "Patience", "Progress", "Purpose"];

const more = ["feminine-energy-challenge", "woman-sex-was-made-for-you-too", "riders-class", "bedroom-tips", "love-language"].map(productBySlug);

export default function WivesPage() {
  const wifestars = productBySlug("wifestars");
  const sensual = productBySlug("sensual-you");
  return (
    <PageShell>
      <PageHero
        theme="pink"
        eyebrow="For wives and wives to be"
        title={<>Sex was made for <Accent className="text-[#8D2F5B]">you</Accent> too.</>}
        text="Tired of it, avoiding it, or quietly faking it? You are not the problem. Learn to enjoy your marriage alongside women who understand."
        image={{ src: "/images/jessica-laughing.jpg", alt: "Jessica Sampson laughing, founder of the Wifestars community", position: "50% 15%" }}
        note={<HeroNote items={["Women only", "Private community", "Faith-centered"]} />}
      >
        <a href={wifestars.href} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#4B1530] px-6 py-3 text-sm font-bold text-white hover:bg-[#6A2044]">
          Become a Wifestar <ArrowUpRight size={17} strokeWidth={2.4} />
        </a>
        <WhatsAppButton message="Hello Jessica, I would like to know more about the Wifestars community.">Ask about Wifestars</WhatsAppButton>
      </PageHero>

      <section className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10">
          <Reveal>
            <SectionIntro
              eyebrow="The community"
              title={<>Wifestars. A circle of women who <Accent>talk about it.</Accent></>}
              text="A private, women only community where wives heal, grow and reclaim their sensuality together. More than 1,000 women have been part of it."
            />
            <ul className="mt-8 grid gap-3">
              {wifestars.points?.map((point) => (
                <li key={point} className="flex items-start gap-3 text-lg text-[#4F3A44]"><Check size={20} className="mt-1 shrink-0 text-[#C20C78]" /> {point}</li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
              <a href={wifestars.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#4B1530] px-6 py-3 text-sm font-bold text-white hover:bg-[#6A2044]">
                Join Wifestars <ArrowUpRight size={17} strokeWidth={2.4} />
              </a>
              <Price ngn={wifestars.ngn} usd={wifestars.usd} />
            </div>
            <p className="mt-4 text-sm text-[#6F5863]">After payment, send your receipt to be added to the group.</p>
          </Reveal>
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-[#F6B7C9] shadow-[0_30px_80px_rgba(75,21,48,0.16)]">
              <Image src={wifestars.cover} alt="Two hands held together, the Wifestars community cover" fill sizes="(max-width: 1023px) 90vw, 40vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[#3D162A] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <Reveal>
              <p className="eyebrow text-[#F3A6BD]">The course</p>
              <h2 className="section-title mt-4">The Sensual You. Four weeks to <Accent className="text-[#F6B7C9]">wanting it</Accent> again.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                {sensual.blurb} It blends science, education and faith, and you finish with a certificate, a graduation class, and free access to the Wifestars community.
              </p>
            </Reveal>
            <Reveal className="flex flex-col gap-4 lg:items-end">
              <Price ngn={sensual.ngn} usd={sensual.usd} light />
              <a href={sensual.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#F6B7C9] px-6 py-3 text-sm font-bold text-[#381626] hover:bg-[#F9CAD7]">
                Enrol in the course <ArrowUpRight size={17} strokeWidth={2.4} />
              </a>
            </Reveal>
          </div>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {weeks.map((week, index) => (
              <Reveal as="li" key={week} delay={index * 0.08} className="h-full">
                <div className="h-full rounded-[1.8rem] border border-white/12 bg-white/[0.07] p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F3A6BD]">Week {index + 1}</p>
                  <p className="mt-3 font-display text-4xl font-semibold italic tracking-[-0.03em] sm:text-5xl">{week}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Reveal>
            <SectionIntro
              title={<>Something for <Accent>this week.</Accent></>}
              text="Not ready for a community or a course? Begin with a short read, a gentle 30 day reset, or a private class."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 3) * 0.06} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
            <Reveal delay={0.12} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[1.8rem] bg-[#F6B7C9] p-8 text-[#381626]">
                <div>
                  <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em]">Tell Jessica what is really going on.</h3>
                  <p className="mt-4 leading-relaxed text-[#5A3A48]">A free, private hour. No one else needs to know you asked.</p>
                </div>
                <div className="mt-7"><BookingButton className="w-full" /></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <GuideSignup />
      <FinalCta
        title="Dear wife, your pleasure is not an afterthought."
        text="Start with a free, private conversation. Bring the question you have never asked anyone."
      />
    </PageShell>
  );
}

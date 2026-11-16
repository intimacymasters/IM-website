import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Flame } from "lucide-react";
import { BookingButton } from "./components/booking";
import { CountUp } from "./components/count-up";
import { Faq } from "./components/faq";
import { HomeHero } from "./components/home-hero";
import { TrustedBy } from "./components/logo-marquee";
import { GuideSignup } from "./components/guide-signup";
import { PageShell } from "./components/page-shell";
import { PathFinder } from "./components/path-finder";
import { ProductCard } from "./components/product-card";
import { Reveal } from "./components/reveal";
import { SpiceCouple } from "./components/spice-characters";
import { Accent, FinalCta, Price, SectionIntro, TextLink } from "./components/sections";
import { Testimonials } from "./components/testimonials";
import { productBySlug } from "./lib/site";

const credentials = ["Licensed clinical sexologist", "Family life coach", "Sexual assault referral practitioner", "Author of five books"];

const learnFromHer = ["marriage-maintenance", "woman-sex-was-made-for-you-too", "intimacy-card", "sex-educate-your-child"].map(productBySlug);

// Order follows the brief: build trust, show her expertise, let reviews speak,
// invite one to one work, then offer the digital products as the lower cost path.
export default function Home() {
  const call = productBySlug("call-consultation");
  const consultation = productBySlug("private-consultation");

  return (
    <PageShell>
      <HomeHero />

      <Link href="/spice" className="spice-strip group relative block overflow-hidden text-white">
        <span className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5 sm:gap-7 sm:px-8 sm:py-6 lg:px-10">
          <span className="hidden w-24 shrink-0 translate-y-3 transition-transform duration-500 group-hover:translate-y-1 sm:block" aria-hidden="true">
            <SpiceCouple mood={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80"><Flame size={13} /> New · for married couples</span>
            <span className="mt-1 block font-display text-2xl font-semibold italic leading-tight tracking-[-0.03em] sm:text-4xl">How spicy is your marriage?</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-[#381626] transition-transform group-hover:scale-105 sm:px-6">
            <span className="hidden sm:inline">Take the spice check</span>
            <ArrowRight size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
          </span>
        </span>
      </Link>

      <TrustedBy />

      <section id="about" className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-10">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-[#F6B7C9] shadow-[0_30px_80px_rgba(75,21,48,0.16)]">
              <Image src="/images/jessica-portrait.jpg" alt="Jessica Sampson, founder of The Intimacy Masters" fill sizes="(max-width: 1023px) 90vw, 40vw" className="object-cover object-[50%_15%]" />
            </div>
            <div className="absolute -bottom-6 right-0 max-w-[220px] rounded-[1.6rem] border border-white bg-white/92 p-5 shadow-xl backdrop-blur-xl sm:-right-6">
              <p className="font-display text-4xl font-semibold text-[#8D2F5B]"><CountUp to={1500} suffix="+" /></p>
              <p className="mt-1 text-sm font-semibold leading-snug text-[#5B4650]">women and men taught healthier intimacy</p>
            </div>
          </Reveal>
          <Reveal>
            <SectionIntro eyebrow="About Jessica" title={<>A marriage and sex therapist who <Accent>believes.</Accent></>} />
            <div className="mt-7 space-y-4 text-lg leading-relaxed text-[#5F4B55]">
              <p>
                Jessica Sampson is an award-winning licensed clinical sexologist and the founder of The Intimacy Masters. She helps Christian couples overcome the challenges that affect intimacy.
              </p>
              <p>Clinical knowledge, practical steps, and no shame.</p>
            </div>
            <p className="mt-7 border-t border-[#4B1530]/12 pt-6 text-sm font-bold uppercase leading-relaxed tracking-[0.1em] text-[#6A2044]">{credentials.join(" · ")}</p>
            <div className="mt-8"><TextLink href="/about">Read her story</TextLink></div>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      <section id="work-with-jessica" className="section-pad bg-[#3D162A] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              light
              eyebrow="Work with Jessica"
              title={<>One to one, and the first call is <Accent className="text-[#F6B7C9]">free.</Accent></>}
              text="Private sessions for men, women and couples."
            />
            <TextLink href="/coaching" light>How coaching works</TextLink>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-[2rem] bg-[#F6B7C9] p-8 text-[#381626]">
                <span className="numeral text-5xl text-[#8D2F5B]">01</span>
                <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em]">Discovery call</h3>
                <p className="mt-3 flex-1 leading-relaxed text-[#5A3A48]">One private hour to understand what is going on and what would help. Answer a few questions first.</p>
                <p className="mt-5 text-lg font-black">Free</p>
                <div className="mt-5"><BookingButton className="w-full">Request a free call</BookingButton></div>
              </div>
            </Reveal>
            {[call, consultation].map((item, index) => (
              <Reveal key={item.slug} delay={(index + 1) * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-[2rem] border border-white/14 bg-white/[0.07] p-8">
                  <span className="numeral text-5xl text-[#F3A6BD]">0{index + 2}</span>
                  <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-white/68">{item.blurb}</p>
                  <Price ngn={item.ngn} usd={item.usd} light className="mt-5" />
                  <a href={item.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#3D162A]">
                    Book this session <ArrowUpRight size={16} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="learn" className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionIntro
              eyebrow="Learn from Jessica"
              title={<>Start at your own pace, from <Accent>₦1,000.</Accent></>}
              text="Books, courses and tools for couples, wives and parents."
            />
            <Link href="/shop" className="group inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#4B1530] px-6 py-3 text-sm font-bold text-white hover:bg-[#6A2044]">
              See all 16 <ArrowRight size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="card-rail mt-12 sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {learnFromHer.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.06} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PathFinder />
      <Faq />
      <GuideSignup />
      <FinalCta />
    </PageShell>
  );
}

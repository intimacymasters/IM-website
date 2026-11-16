import { ArrowUpRight } from "lucide-react";
import { BookingButton, WhatsAppButton } from "../components/booking";
import { Faq } from "../components/faq";
import { PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { Accent, FinalCta, HeroNote, PageHero, Price, SectionIntro } from "../components/sections";
import { Testimonials } from "../components/testimonials";
import { productBySlug } from "../lib/site";
import { JsonLd } from "../components/json-ld";
import { pageMetadata } from "../lib/seo";
import { pageGraph, serviceGraph } from "../lib/structured-data";

const seo = {
  title: "Private Intimacy Coaching for Couples",
  description:
    "Private, confidential intimacy coaching with licensed clinical sexologist Jessica Sampson, for men, women and couples. Start with a free discovery call.",
  path: "/coaching",
};

export const metadata = pageMetadata(seo);

const tracks = [
  {
    title: "Clinical intimacy coaching",
    text: "For concerns with a medical side: vaginismus, painful sex, low libido, erectile and performance difficulties, changes around menopause, and sexual addictions or disorders that call for professional, clinical guidance.",
  },
  {
    title: "Pleasure and spice coaching",
    text: "For individuals and couples ready to bring passion back. Build confidence, learn specific skills, understand how your bodies experience pleasure, and fall in love with intimacy again.",
  },
  {
    title: "Parenting and sexuality coaching",
    text: "For parents raising aware, confident children, navigating conversations about purity, or balancing their own intimate life with the demands of parenting.",
  },
  {
    title: "Marriage maintenance coaching",
    text: "For couples who want to review, rebuild and reignite their relationship on purpose, and create a passionate, deeply connected marriage.",
  },
];

export default function CoachingPage() {
  const call = productBySlug("call-consultation");
  const consultation = productBySlug("private-consultation");
  const riders = productBySlug("riders-class");

  return (
    <PageShell>
      <JsonLd data={[...pageGraph({ path: seo.path, name: seo.title, description: seo.description }), serviceGraph({ path: seo.path, name: "Private intimacy coaching", description: seo.description, serviceType: "Intimacy and relationship coaching", products: [call, consultation, riders], freeCall: true })]} />
      <PageHero
        theme="cream"
        eyebrow="Private coaching for men, women and couples"
        title={<>Say the thing you have <Accent>never</Accent> said out loud.</>}
        text="Private sessions with Jessica Sampson, a licensed clinical sexologist. Clinical knowledge, practical steps, and no judgement."
        image={{ src: "/images/jessica-blazer.jpg", alt: "Jessica Sampson smiling in a black blazer", position: "50% 12%" }}
        note={<HeroNote items={["First call is free", "1 hour", "Completely confidential"]} />}
      >
        <BookingButton />
        <WhatsAppButton>Message first on WhatsApp</WhatsAppButton>
      </PageHero>

      <section className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Reveal>
            <SectionIntro
              title={<>Coaching shaped around <Accent>your</Accent> question.</>}
              text="You do not need to know which one before you call."
            />
          </Reveal>
          <ol className="mt-12 divide-y divide-[#4B1530]/12 border-y border-[#4B1530]/12">
            {tracks.map((track, index) => (
              <Reveal as="li" key={track.title} className="grid gap-3 py-8 sm:grid-cols-[70px_0.9fr_1.5fr] sm:items-baseline sm:gap-8 sm:py-10">
                <span className="numeral text-4xl text-[#C20C78]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#381626] sm:text-3xl">{track.title}</h3>
                <p className="text-lg leading-relaxed text-[#67545D]">{track.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-[#3D162A] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Reveal>
            <SectionIntro
              light
              eyebrow="How it works"
              title={<>Three steps, and the first one is <Accent className="text-[#F6B7C9]">free.</Accent></>}
              text="You see every price before you commit."
            />
          </Reveal>
          <ol className="mt-14 divide-y divide-white/15 border-y border-white/15">
            <Reveal as="li" className="grid gap-5 py-9 sm:grid-cols-[90px_1fr_auto] sm:items-center">
              <span className="numeral text-6xl text-[#F3A6BD]">01</span>
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">Free discovery call</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-white/68">
                  One hour, online and private. Answer a few questions, choose a time, and the team confirms by email. No obligation to continue.
                </p>
                <p className="mt-3 text-lg font-black text-[#F6B7C9]">Free</p>
              </div>
              <BookingButton tone="pink">Request a free call</BookingButton>
            </Reveal>
            <Reveal as="li" className="grid gap-5 py-9 sm:grid-cols-[90px_1fr_auto] sm:items-center">
              <span className="numeral text-6xl text-[#F3A6BD]">02</span>
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{call.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-white/68">
                  A private clarity session by call. After booking you receive a short intake form, then leave the session with a clear picture, tailored practical steps and a roadmap. It is coaching, not therapy.
                </p>
                <Price ngn={call.ngn} usd={call.usd} light className="mt-3" />
              </div>
              <a href={call.href} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#3D162A]">
                Book on Selar <ArrowUpRight size={16} />
              </a>
            </Reveal>
            <Reveal as="li" className="grid gap-5 py-9 sm:grid-cols-[90px_1fr_auto] sm:items-center">
              <span className="numeral text-6xl text-[#F3A6BD]">03</span>
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{consultation.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-white/68">
                  In depth private work for couples who still love each other but feel disconnected, and for new brides and grooms. A safe, respectful space to understand what is going wrong and how to feel close again, emotionally and sexually.
                </p>
                <Price ngn={consultation.ngn} usd={consultation.usd} light className="mt-3" />
              </div>
              <a href={consultation.href} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#3D162A]">
                Book on Selar <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </ol>

          <Reveal className="mt-12 grid gap-6 rounded-[2rem] border border-white/14 bg-white/[0.06] p-7 sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="eyebrow text-[#F3A6BD]">Also available one to one</p>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em]">{riders.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-white/68">{riders.blurb}</p>
              <Price ngn={riders.ngn} usd={riders.usd} light className="mt-3" />
            </div>
            <a href={riders.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#F6B7C9] px-6 py-3 text-sm font-bold text-[#381626] hover:bg-[#F9CAD7]">
              Book the class <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-b border-[#4B1530]/10 bg-[#FFF9F5]">
        <Reveal className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="section-title text-[#381626]">What you share stays with us.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#67545D]">
            Sessions are confidential. Stories on this site are anonymous and edited so no one can be recognised. You will never be asked to share more than you are ready to.
          </p>
        </Reveal>
      </section>

      <Testimonials />
      <Faq />
      <FinalCta title="One private conversation can change the direction of things." />
    </PageShell>
  );
}

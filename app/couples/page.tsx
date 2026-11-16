import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { BookingButton } from "../components/booking";
import { GuideSignup } from "../components/guide-signup";
import { PageShell } from "../components/page-shell";
import { ProductCard } from "../components/product-card";
import { Reveal } from "../components/reveal";
import { Accent, FinalCta, HeroNote, PageHero, Price, SectionIntro, TextLink } from "../components/sections";
import { Testimonials } from "../components/testimonials";
import { amazonLinks, productBySlug } from "../lib/site";
import { JsonLd } from "../components/json-ld";
import { pageMetadata } from "../lib/seo";
import { pageGraph, productListGraph } from "../lib/structured-data";

const seo = {
  title: "Sexless Marriage Help for Couples",
  description:
    "Feel more like roommates than lovers? The 100 day Marriage Maintenance programme, couples tools and private coaching to rebuild intimacy in your marriage.",
  path: "/couples",
};

export const metadata = pageMetadata(seo);

const signs = [
  "Your chats are all school runs, bills and groceries.",
  "You share a bed but rarely reach for each other.",
  "One of you is guessing, the other is pretending.",
  "It has been months, and nobody mentions it.",
];

const tools = ["couples-bundle", "intimacy-card", "bedroom-tips", "outercourse", "love-language", "private-consultation"].map(productBySlug);

export default function CouplesPage() {
  const programme = productBySlug("marriage-maintenance");
  return (
    <PageShell>
      <JsonLd data={[...pageGraph({ path: seo.path, name: seo.title, description: seo.description }), productListGraph(seo.path, "Programmes and tools for couples", [programme, ...tools])]} />
      <PageHero
        theme="wine"
        eyebrow="For married couples"
        title={<>From roommates back to <Accent className="text-[#F6B7C9]">lovers.</Accent></>}
        text="You share a roof, the bills and the children. If closeness is the one thing you no longer share, there is a way back."
        image={{ src: "/products/couples-bundle.jpg", alt: "A married couple standing side by side, smiling", position: "50% 50%", aspect: "aspect-[3/2]", shape: "soft" }}
        note={<HeroNote items={["Start at ₦39,500 or $29", "Work through it at home", "Or talk to Jessica first, free"]} />}
      >
        <a href={programme.href} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#F6B7C9] px-6 py-3 text-sm font-bold text-[#381626] hover:bg-[#F9CAD7]">
          Start Marriage Maintenance <ArrowUpRight size={17} strokeWidth={2.4} />
        </a>
        <BookingButton tone="light">Book a free discovery call</BookingButton>
      </PageHero>

      <section className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
          <Reveal>
            <SectionIntro
              title={<>Nothing is wrong. And yet <Accent>something</Accent> is.</>}
              text="Jessica calls it the sibling effect: two people who love each other, living like housemates. It is common, and it can change."
            />
            <div className="mt-7"><TextLink href="/spice">Not sure where you stand? Take the spice check</TextLink></div>
          </Reveal>
          <ul className="grid gap-3">
            {signs.map((sign, index) => (
              <Reveal as="li" key={sign} delay={index * 0.07}>
                <div className="flex items-center gap-4 rounded-2xl border border-[#4B1530]/8 bg-white px-6 py-5 text-lg font-bold text-[#381626] shadow-[0_10px_35px_rgba(70,33,54,0.05)]">
                  <span className="numeral text-3xl text-[#C20C78]">{index + 1}</span>
                  {sign}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-[#3D162A] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-10">
          <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_90px_rgba(0,0,0,0.4)] rotate-[-2deg]">
              <Image src={programme.cover} alt="Marriage Maintenance workbook cover" fill sizes="(max-width: 1023px) 80vw, 36vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow text-[#F3A6BD]">The programme</p>
            <h2 className="section-title mt-4">Marriage Maintenance. <Accent className="text-[#F6B7C9]">100 days</Accent> of intentional connection.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              A practical framework you work through together at home, rebuilding friendship, affection and sexual intimacy one step at a time.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {programme.points?.map((point) => (
                <li key={point} className="flex items-start gap-3 text-white/85"><Check size={18} className="mt-1 shrink-0 text-[#F6B7C9]" /> {point}</li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
              <a href={programme.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#F6B7C9] px-6 py-3 text-sm font-bold text-[#381626] hover:bg-[#F9CAD7]">
                Get instant access <ArrowUpRight size={17} strokeWidth={2.4} />
              </a>
              <Price ngn={programme.ngn} usd={programme.usd} light />
            </div>
            <p className="mt-5 text-sm text-white/50">Not a substitute for medical or specialist support.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionIntro
              title={<>Small things to do <Accent>together.</Accent></>}
              text="Cards, books, a video course, and private work with Jessica."
            />
            <TextLink href="/shop">Browse the whole shop</TextLink>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 3) * 0.06} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-col gap-3 rounded-[1.6rem] bg-[#F7E6EB] p-6 text-[#4B1530] sm:flex-row sm:items-center sm:justify-between">
            <p className="font-bold">Outside Nigeria? Outercourse is also on Amazon.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
              <a href={amazonLinks.outercourseForHer} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4">Edition for her <ArrowUpRight size={15} /></a>
              <a href={amazonLinks.outercourseForHim} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4">Edition for him <ArrowUpRight size={15} /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <GuideSignup />
      <FinalCta
        title="You do not have to keep pretending everything is fine."
        text="Talk to Jessica together or on your own. The first call is free, one hour, and completely private."
      />
    </PageShell>
  );
}

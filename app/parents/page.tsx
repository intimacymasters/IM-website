import { ArrowUpRight } from "lucide-react";
import { BookingButton } from "../components/booking";
import { PageShell } from "../components/page-shell";
import { ProductCard } from "../components/product-card";
import { Reveal } from "../components/reveal";
import { Accent, FinalCta, HeroNote, PageHero, Price, SectionIntro, TextLink } from "../components/sections";
import { productBySlug } from "../lib/site";
import { JsonLd } from "../components/json-ld";
import { pageMetadata } from "../lib/seo";
import { pageGraph, productListGraph } from "../lib/structured-data";

const seo = {
  title: "Child Sex Education for Parents",
  description:
    "Age appropriate, values based sex education for children and teenagers. Books, a mini course and a checklist that give parents the words for every stage.",
  path: "/parents",
};

export const metadata = pageMetadata(seo);

const stages = [
  { age: "0 to 3", name: "Identification" },
  { age: "3 to 5", name: "Question and answer" },
  { age: "5 to 8", name: "Puberty dialogue" },
  { age: "8 to 10", name: "Puberty proper" },
  { age: "10 to 13", name: "Puberty upgrade" },
  { age: "13 to 18", name: "Safe talk" },
  { age: "18+", name: "Adulthood awakened" },
];

const resources = ["sex-educate-your-child", "child-education-mini-course", "children-checklist"].map(productBySlug);

export default function ParentsPage() {
  const book = productBySlug("sex-educate-your-child");
  return (
    <PageShell>
      <JsonLd data={[...pageGraph({ path: seo.path, name: seo.title, description: seo.description }), productListGraph(seo.path, "Sex education resources for parents", resources)]} />
      <PageHero
        theme="mint"
        eyebrow="For parents and guardians"
        title={<>Let them hear it from <Accent className="text-[#1F7A5A]">you</Accent> first.</>}
        text="Protecting a child begins with educating a child. Get clear, age appropriate words for every stage."
        image={{ src: "/products/sex-educate-your-child.jpg", alt: "The book How to Sex Educate Your Child by Jessica Sampson", position: "50% 50%", aspect: "aspect-[4/5]" }}
        note={<HeroNote items={["From toddlers to teens", "Values based", "Readable in about an hour"]} />}
      >
        <a href={book.href} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1E3A30] px-6 py-3 text-sm font-bold text-white hover:bg-[#2A5143]">
          Get the book, {book.ngn} <ArrowUpRight size={17} strokeWidth={2.4} />
        </a>
        <BookingButton tone="light">Talk to Jessica, free</BookingButton>
      </PageHero>

      <section className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Reveal>
            <SectionIntro
              title={<>The right words at the <Accent>right age.</Accent></>}
              text="Not one big talk. Many small ones, for boys and for girls."
            />
          </Reveal>
          <ol className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
            {stages.map((stage, index) => (
              <Reveal as="li" key={stage.age} delay={index * 0.06} className="h-full">
                <div className="group flex h-full flex-col rounded-[1.6rem] border border-[#1E3A30]/10 bg-[#E3F5EE] p-5 transition-colors duration-300 hover:bg-[#1E3A30] hover:text-white">
                  <span className="numeral text-4xl text-[#1F7A5A] transition-colors group-hover:text-[#BFE5D6]">{index + 1}</span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#3F5C51] transition-colors group-hover:text-white/70">Age {stage.age}</p>
                  <p className="mt-2 text-lg font-bold leading-tight tracking-[-0.02em] text-[#1E3A30] transition-colors group-hover:text-white">{stage.name}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a href={book.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#4B1530] px-6 py-3 text-sm font-bold text-white hover:bg-[#6A2044]">
              Get How to Sex Educate Your Child <ArrowUpRight size={17} strokeWidth={2.4} />
            </a>
            <Price ngn={book.ngn} usd={book.usd} />
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-[#4B1530]/10 bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Reveal>
            <SectionIntro
              title={<>Home is the <Accent className="text-[#1F7A5A]">first school.</Accent></>}
              text="Read the book, follow the video course, or keep the checklist on your phone as a daily guide."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.06} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#3D162A] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10">
          <Reveal className="rounded-[2rem] border border-white/14 bg-white/[0.06] p-8 sm:p-10">
            <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.04em]">For schools and parent groups.</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Age appropriate, values based sexuality education for pupils, and practical sessions for parents and teachers. Shaped around your school and your community.
            </p>
            <div className="mt-7"><TextLink href="/speaking" light>Plan a school session</TextLink></div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[2rem] border border-white/14 bg-white/[0.06] p-8 sm:p-10">
            <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.04em]">Worried about something specific?</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              If you are unsure how to respond to a question, a change in behaviour or something your child has seen, talk it through privately. Jessica is also a sexual assault referral practitioner.
            </p>
            <div className="mt-7"><BookingButton tone="pink" /></div>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title="A confident child starts with a prepared parent."
        text="If you would like to talk through your own family's situation, the first call is free and private."
      />
    </PageShell>
  );
}

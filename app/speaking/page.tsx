import { WhatsAppButton } from "../components/booking";
import { EnquiryForm } from "../components/enquiry-form";
import { TrustedBy } from "../components/logo-marquee";
import { PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { Accent, FinalCta, HeroNote, PageHero, SectionIntro } from "../components/sections";
import { JsonLd } from "../components/json-ld";
import { pageMetadata } from "../lib/seo";
import { pageGraph, serviceGraph } from "../lib/structured-data";

const seo = {
  title: "Book a Marriage and Intimacy Speaker",
  description:
    "Invite Jessica Sampson to speak at your church, school, conference or bridal shower. Values based sessions on marriage, intimacy and sexuality education.",
  path: "/speaking",
};

export const metadata = pageMetadata(seo);

const formats = [
  {
    title: "Churches and faith communities",
    text: "Marriage seminars, couples nights and women's meetings that honour your values while speaking plainly about intimacy.",
  },
  {
    title: "Schools",
    text: "Age appropriate, values based sexuality education that gives pupils knowledge, preparedness and confidence, with sessions for parents and teachers.",
  },
  {
    title: "Conferences and organisations",
    text: "Keynotes, panels and workshops on relationships, wellbeing and family life, including hosting and moderating.",
  },
  {
    title: "Bridal showers and intimacy classes",
    text: "Equipping brides to be with the confidence and wisdom to enjoy married life from the very beginning.",
  },
];

export default function SpeakingPage() {
  return (
    <PageShell>
      <JsonLd data={[...pageGraph({ path: seo.path, name: seo.title, description: seo.description }), serviceGraph({ path: seo.path, name: "Speaking and workshops", description: seo.description, serviceType: "Public speaking, workshops and sexuality education for schools" })]} />
      <PageHero
        theme="plum"
        eyebrow="Speaking, schools and workshops"
        title={<>Bring the <Accent className="text-[#F6B7C9]">honest</Accent> conversation to your room.</>}
        text="Jessica speaks to churches, schools, conferences and communities. Every session is shaped around your audience and your values."
        image={{ src: "/images/jessica-standing.jpg", alt: "Jessica Sampson standing, smiling, in a white blouse", position: "50% 12%" }}
        note={<HeroNote items={["In person or online", "Tailored to your audience", "Nigeria and beyond"]} />}
      >
        <a href="#enquire" className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#F6B7C9] px-6 py-3 text-sm font-bold text-[#381626] hover:bg-[#F9CAD7]">
          Plan a session
        </a>
        <WhatsAppButton tone="outline-light" message="Hello Jessica, I would like to enquire about a speaking session.">Enquire on WhatsApp</WhatsAppButton>
      </PageHero>

      <section className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Reveal>
            <SectionIntro
              title={<>One message, shaped for <Accent>every</Accent> room.</>}
              text="From a hall of married couples to a classroom of ten year olds, the tone changes. The honesty does not."
            />
          </Reveal>
          <ol className="mt-12 divide-y divide-[#4B1530]/12 border-y border-[#4B1530]/12">
            {formats.map((format, index) => (
              <Reveal as="li" key={format.title} className="grid gap-3 py-8 sm:grid-cols-[70px_0.9fr_1.5fr] sm:items-baseline sm:gap-8 sm:py-10">
                <span className="numeral text-4xl text-[#C20C78]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#381626] sm:text-3xl">{format.title}</h3>
                <p className="text-lg leading-relaxed text-[#67545D]">{format.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <TrustedBy
        title="Rooms she has already been trusted with."
        text="Businesses, schools, wellness communities and professional organisations have invited The Intimacy Masters in."
      />

      <section id="enquire" className="section-pad bg-[#3D162A] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
          <Reveal>
            <SectionIntro
              light
              title={<>Tell us about your <Accent className="text-[#F6B7C9]">event.</Accent></>}
              text="Share a few details and send them straight to Jessica's team."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <FinalCta
        title="Looking for support for yourself, not an audience?"
        text="Private coaching starts with a free, confidential one hour call."
      />
    </PageShell>
  );
}

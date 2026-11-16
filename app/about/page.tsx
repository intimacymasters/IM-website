import Image from "next/image";
import { BookingButton } from "../components/booking";
import { CountUp } from "../components/count-up";
import { TrustedBy } from "../components/logo-marquee";
import { PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { Accent, FinalCta, HeroNote, PageHero, SectionIntro, TextLink } from "../components/sections";
import { Testimonials } from "../components/testimonials";
import { JsonLd } from "../components/json-ld";
import { pageMetadata } from "../lib/seo";
import { pageGraph } from "../lib/structured-data";

const seo = {
  title: "Jessica Sampson, Clinical Sexologist",
  description:
    "Jessica Sampson is an award-winning licensed clinical sexologist, family life coach, author and founder of The Intimacy Masters in Nigeria.",
  path: "/about",
};

export const metadata = pageMetadata(seo);

const credentials = [
  { title: "Licensed clinical sexologist", text: "Clinical training for intimate concerns that need more than advice." },
  { title: "Sexual assault referral practitioner", text: "Certified to support and refer with care." },
  { title: "Family life coach", text: "Coaching for individuals, couples and families." },
  { title: "Child and teen sexuality educator", text: "Body safety, consent, puberty and values, in schools and at home." },
  { title: "Author of five books", text: "Including Outercourse and Woman, Sex Was Made for You Too." },
  { title: "Award-winning", text: "Recognised at the ELOY Awards in 2022." },
];

const numbers = [
  { value: 1000, label: "women taught" },
  { value: 500, label: "men reached" },
  { value: 30, label: "at her sex conference" },
  { value: 350, label: "Wifestars members" },
];

const books = ["Woman, Sex Was Made for You Too", "Outercourse", "How to Sex Educate Your Child", "The A to Z Smart Up", "100 Checklist for Sexually Aware Children and Teens"];

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={pageGraph({ path: seo.path, name: seo.title, description: seo.description, type: "ProfilePage" })} />
      <PageHero
        theme="cream"
        eyebrow="About Jessica Sampson"
        title={<>She says what others <Accent>whisper.</Accent></>}
        text="Jessica is a licensed clinical sexologist and a believer. She founded The Intimacy Masters to help Christian marriages enjoy the intimacy they were made for."
        image={{ src: "/images/jessica-studio.jpg", alt: "Jessica Sampson standing in a white outfit, smiling", position: "50% 30%" }}
        note={<HeroNote items={["Clinical sexologist", "Family life coach", "Author and speaker"]} />}
      >
        <BookingButton>Request a free discovery call</BookingButton>
      </PageHero>

      <section className="bg-[#3D162A] py-14 text-white sm:py-16">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 sm:px-8 lg:grid-cols-4 lg:px-10">
          {numbers.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.06} className="text-center">
              <dd className="numeral text-5xl text-[#F6B7C9] sm:text-6xl"><CountUp to={item.value} suffix="+" /></dd>
              <dt className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-white/70">{item.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-10">
          <Reveal>
            <SectionIntro title={<>Rooting for your <Accent>marriage.</Accent></>} />
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-[#5F4B55]">
              <p>
                The Intimacy Masters is a family-centred organisation. It serves every stage of family life, from a child learning about their body to a couple finding their way back to each other.
              </p>
              <p>
                Jessica convened a sex conference that brought together more than 12 sexologists, online and on site, to talk openly about a subject most people only whisper about.
              </p>
              <p className="font-display text-2xl font-medium italic leading-snug text-[#8D2F5B]">
                Her goal is bold: to support one million marriages.
              </p>
            </div>
            <div className="mt-8"><TextLink href="/coaching">Work with Jessica</TextLink></div>
          </Reveal>
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-[#F6B7C9] shadow-[0_30px_80px_rgba(75,21,48,0.16)]">
              <Image src="/images/jessica-purple.jpg" alt="Jessica Sampson laughing in a purple dress" fill sizes="(max-width: 1023px) 90vw, 40vw" className="object-cover object-[45%_20%]" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-y border-[#4B1530]/10 bg-[#FFF9F5]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
          <Reveal>
            <SectionIntro title="Training and recognition." />
          </Reveal>
          <dl className="divide-y divide-[#4B1530]/12 border-y border-[#4B1530]/12">
            {credentials.map((item) => (
              <Reveal key={item.title} className="grid gap-1 py-6 sm:grid-cols-[1fr_1.2fr] sm:gap-8">
                <dt className="text-xl font-bold tracking-[-0.025em] text-[#381626]">{item.title}</dt>
                <dd className="leading-relaxed text-[#67545D]">{item.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-10">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(20,80,80,0.2)]">
              <Image src="/images/jessica-boxing.jpg" alt="Jessica Sampson with boxing gloves over her shoulder" fill sizes="(max-width: 1023px) 90vw, 40vw" className="object-cover object-[50%_30%]" />
            </div>
          </Reveal>
          <Reveal>
            <SectionIntro title={<>Author. Speaker. <Accent>Boxer.</Accent></>} />
            <p className="mt-6 text-lg leading-relaxed text-[#5F4B55]">Five books, and a pair of gloves for the days that need them.</p>
            <ul className="mt-6 divide-y divide-[#4B1530]/10 border-y border-[#4B1530]/10">
              {books.map((book, index) => (
                <li key={book} className="flex items-baseline gap-4 py-3.5">
                  <span className="numeral text-xl text-[#C20C78]">{index + 1}</span>
                  <span className="text-lg font-bold text-[#381626]">{book}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8"><TextLink href="/shop">Visit the shop</TextLink></div>
          </Reveal>
        </div>
      </section>

      <TrustedBy />
      <Testimonials />
      <FinalCta />
    </PageShell>
  );
}

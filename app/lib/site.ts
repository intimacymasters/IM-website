// Single source of truth for links, prices and copy that several pages share.
// Prices are copied from Jessica's Selar store. Update them here when the store changes.

export const contact = {
  email: "theintimacymasters@gmail.com",
  phoneDisplay: "+234 803 420 6121",
  phoneHref: "tel:+2348034206121",
  whatsappNumber: "2348034206121",
  instagram: "https://www.instagram.com/theintimacymasters/",
  tiktok: "https://www.tiktok.com/@theintimacymasters",
  newsletter: "https://theintimacymasters.substack.com/",
  newsletterEmbed: "https://theintimacymasters.substack.com/embed",
  store: "https://selar.com/m/theintimacymasters",
};

export const calendlyUrl = "https://calendly.com/theintimacymasters/30min";

export function whatsappLink(message = "Hello Jessica, I found you through your website and I would like to ask a question.") {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body = "") {
  const query = [`subject=${encodeURIComponent(subject)}`, body ? `body=${encodeURIComponent(body)}` : ""].filter(Boolean).join("&");
  return `mailto:${contact.email}?${query}`;
}

export const navLinks = [
  { href: "/coaching", label: "Coaching", note: "Private sessions with Jessica" },
  { href: "/couples", label: "Couples", note: "From roommates back to lovers" },
  { href: "/wives", label: "Wives", note: "The Wifestars community" },
  { href: "/parents", label: "Parents", note: "Body safety and honest talks" },
  { href: "/speaking", label: "Speaking", note: "Churches, schools and events" },
  { href: "/shop", label: "Shop", note: "Books, courses and tools" },
  { href: "/spice", label: "Spice check", note: "How hot is it at your house?" },
  { href: "/about", label: "About", note: "Meet Jessica Sampson" },
] as const;

export type Audience = "couples" | "wives" | "parents" | "sessions";

export type Product = {
  slug: string;
  title: string;
  kind: string;
  audiences: Audience[];
  ngn: string;
  usd: string;
  wasNgn?: string;
  blurb: string;
  points?: string[];
  href: string;
  cover: string;
};

export const products: Product[] = [
  {
    slug: "marriage-maintenance",
    title: "Marriage Maintenance",
    kind: "100 day programme",
    audiences: ["couples"],
    ngn: "₦39,500",
    usd: "$29",
    blurb: "A practical 100 day framework for couples who have slipped into living like roommates and want to be lovers again.",
    points: [
      "Emotional reconnection",
      "Physical and sexual intimacy",
      "Desire and initiation",
      "Quality time and accountability",
      "Private community for follow up",
    ],
    href: "https://selar.com/marriagemaintenanceworkshop",
    cover: "/products/marriage-maintenance.jpg",
  },
  {
    slug: "couples-bundle",
    title: "Couples Intimacy Bundle",
    kind: "Video course",
    audiences: ["couples"],
    ngn: "₦100,000",
    usd: "$100",
    blurb: "A self paced video series with three days of tasks to complete together, worksheets, and a guide to renewing your vows.",
    href: "https://selar.com/couplesintimacybundle",
    cover: "/products/couples-bundle.jpg",
  },
  {
    slug: "intimacy-card",
    title: "Digital Intimacy Card",
    kind: "Conversation cards",
    audiences: ["couples"],
    ngn: "₦5,000",
    wasNgn: "₦10,000",
    usd: "$10",
    blurb: "Thirty Talk, Do and Bond tasks in play card form. Pick a number, take turns, and get to know each other again.",
    href: "https://selar.com/Intimacycard",
    cover: "/products/intimacy-card.jpg",
  },
  {
    slug: "bedroom-tips",
    title: "100 Bedroom Tips",
    kind: "eBook in card form",
    audiences: ["couples", "wives"],
    ngn: "₦5,000",
    usd: "$10",
    blurb: "One hundred short, witty, easy to apply tips for couples whose intimate life has started to feel routine.",
    href: "https://selar.com/100bedroomtips",
    cover: "/products/bedroom-tips.jpg",
  },
  {
    slug: "outercourse",
    title: "Outercourse",
    kind: "Printed book, for him and for her",
    audiences: ["couples"],
    ngn: "₦15,000",
    usd: "$30",
    blurb: "Fifty questions that let a couple act as their own coach. Sacred yet sensual, and a thoughtful gift for newly weds.",
    href: "https://selar.com/OUTERCOURSE",
    cover: "/products/outercourse.jpg",
  },
  {
    slug: "love-language",
    title: "Know Your Love Language",
    kind: "Assessment",
    audiences: ["couples", "wives"],
    ngn: "₦5,000",
    wasNgn: "₦10,000",
    usd: "$10",
    blurb: "Stop guessing. A few minutes to find out how you and your partner each give and receive love.",
    href: "https://selar.com/lovelanguageassesment",
    cover: "/products/love-language.jpg",
  },
  {
    slug: "wifestars",
    title: "Wifestars",
    kind: "Private women's community",
    audiences: ["wives"],
    ngn: "₦100,000",
    usd: "$100",
    blurb: "Monthly challenges, personal feedback, follow up meetings and a circle of women committed to their marriages.",
    points: [
      "Monthly challenges",
      "Personalised feedback from coaches",
      "Regular follow up meetings",
      "Exclusive lectures and materials",
      "A supportive, private circle of wives",
    ],
    href: "https://selar.com/Becomeawifestar",
    cover: "/products/wifestars.jpg",
  },
  {
    slug: "sensual-you",
    title: "The Sensual You",
    kind: "4 week course",
    audiences: ["wives"],
    ngn: "₦100,000",
    usd: "$100",
    blurb: "A step by step course for wives who are tired of sex, avoid it, or fake it, and want to enjoy and initiate it with confidence.",
    points: ["Week 1: Pain", "Week 2: Patience", "Week 3: Progress", "Week 4: Purpose", "Certificate, bonuses and Wifestars access on completion"],
    href: "https://selar.com/thesensualyou",
    cover: "/products/sensual-you.jpg",
  },
  {
    slug: "feminine-energy-challenge",
    title: "30 Day Feminine Energy Challenge",
    kind: "Guided journal",
    audiences: ["wives"],
    ngn: "₦1,000",
    wasNgn: "₦5,000",
    usd: "$3",
    blurb: "Daily prompts, a soft habits checklist and weekly reflections for women who have been living in survival mode.",
    href: "https://selar.com/6426u17u87",
    cover: "/products/feminine-energy-challenge.jpg",
  },
  {
    slug: "woman-sex-was-made-for-you-too",
    title: "Woman, Sex Was Made for You Too",
    kind: "eBook",
    audiences: ["wives"],
    ngn: "₦5,000",
    usd: "$5",
    blurb: "A short, candid read that moves a wife from giving sex to enjoying it. Pleasured, not pressured.",
    href: "https://selar.com/womansexwasmadeforyoutoo",
    cover: "/products/woman-sex-was-made-for-you-too.jpg",
  },
  {
    slug: "riders-class",
    title: "Riders Class, Private",
    kind: "1:1 class",
    audiences: ["wives", "sessions"],
    ngn: "₦50,000",
    usd: "$50",
    blurb: "A one to one class on enjoying being on top, with body confidence and positions that are kind to your knees.",
    href: "https://selar.com/privateridersclass",
    cover: "/products/riders-class.jpg",
  },
  {
    slug: "sex-educate-your-child",
    title: "How to Sex Educate Your Child",
    kind: "eBook",
    audiences: ["parents"],
    ngn: "₦5,000",
    usd: "$15",
    blurb: "Age appropriate conversations from toddler to adult, in seven stages. Readable in about an hour.",
    href: "https://selar.com/childeducation",
    cover: "/products/sex-educate-your-child.jpg",
  },
  {
    slug: "child-education-mini-course",
    title: "Sex Educate Your Child, Mini Course",
    kind: "Video course",
    audiences: ["parents"],
    ngn: "₦15,000",
    usd: "$20",
    blurb: "How to have the talk, how not to, and how to build your own plan at home. Includes a recorded question and answer session with parents.",
    href: "https://selar.com/childeducationminicourse",
    cover: "/products/child-education-mini-course.jpg",
  },
  {
    slug: "children-checklist",
    title: "100 Checklist for Sexually Aware Children and Teens",
    kind: "Checklist",
    audiences: ["parents"],
    ngn: "₦5,000",
    usd: "$5",
    blurb: "A daily guide to what to say and do, and when, across hygiene, body awareness, personal development and health.",
    href: "https://selar.com/100checklist",
    cover: "/products/children-checklist.jpg",
  },
  {
    slug: "call-consultation",
    title: "Call Consultation",
    kind: "Private clarity session",
    audiences: ["sessions"],
    ngn: "₦120,000",
    usd: "$100",
    blurb: "A one to one private call with Jessica. You leave with a clear picture, tailored steps and a roadmap for what comes next.",
    href: "https://selar.com/bookacallwithcoachjess",
    cover: "/products/call-consultation.jpg",
  },
  {
    slug: "private-consultation",
    title: "1:1 Private Consultation",
    kind: "In depth consultation",
    audiences: ["sessions", "couples"],
    ngn: "₦650,000",
    usd: "$650",
    blurb: "In depth private work for couples who still love each other but feel disconnected, and for new brides and grooms.",
    href: "https://selar.com/IntimateConsultation",
    cover: "/products/private-consultation.jpg",
  },
];

export const productBySlug = (slug: string) => {
  const product = products.find((item) => item.slug === slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
};

// Free guide, unlocked with a first name, email and phone number. The link to
// the file itself is kept on the server (app/api/guide/route.ts) so it is only
// handed out after the form is filled.
export const freeGuide = {
  title: "20 Ways to Initiate Love Making With Your Spouse",
  edition: "Couples edition",
  pages: 56,
  cover: "/guides/20-ways-cover.jpg",
};

// Press coverage, newest first. `date` is the day the piece was published.
export type PressItem = { outlet: string; title: string; date?: string; href: string };

export const press: PressItem[] = [
  {
    outlet: "Vanguard Allure",
    title: "Cover story: Jessica Sampson, The Intimacy Master",
    date: "2024-07-21",
    href: "https://allure.vanguardngr.com/2024/07/jessica-sampson-the-intimacy-master/",
  },
  {
    outlet: "Vanguard",
    title: "Jessica Sampson convenes first-ever sex conference",
    date: "2024-07-01",
    href: "https://www.vanguardngr.com/2024/07/jessica-sampson-convenes-first-ever-sex-conference-july-20/",
  },
  {
    outlet: "The Nation",
    title: "Jessica Sampson to convene first sex health conference in Lagos",
    href: "https://thenationonlineng.net/jessica-sampson-to-convene-first-ever-s3x-health-conference-in-lagos/",
  },
];

export const pressCover = {
  src: "/images/press/allure-cover-2024.jpg",
  alt: "Jessica Sampson on the cover of Vanguard Allure magazine, 21 July 2024, under the headline The Intimacy Master",
};

export const amazonLinks = {
  outercourseForHer: "https://a.co/d/2TiXvAu",
  outercourseForHim: "https://amazon.co.uk/dp/B0BK2L1YFB",
};

export const trustedLogos = [
  { name: "Craftsman", src: "/logos/craftsman.png" },
  { name: "DataKirk", src: "/logos/datakirk.png" },
  { name: "DKT International Nigeria", src: "/logos/dkt-international.png" },
  { name: "The Dr. Rachael Institute", src: "/logos/dr-rachael-institute.jpg" },
  { name: "Dr. Seyil Absolute Wellness", src: "/logos/dr-seyil.png" },
  { name: "Eat 2 Live", src: "/logos/eat2live.png" },
  { name: "Engraced Life", src: "/logos/engraced-life.png" },
  { name: "Exquisite Magazine", src: "/logos/exquisite-magazine.png" },
  { name: "Food World Emporium", src: "/logos/food-world-emporium.png" },
  { name: "Goz", src: "/logos/goz.png" },
  { name: "JPosh Services", src: "/logos/jposh-services.png" },
  { name: "JR Scents", src: "/logos/jr-scents.png" },
  { name: "Kiss Lube Gel", src: "/logos/kiss-lube-gel.png" },
  { name: "Kudos Healthy Living", src: "/logos/kudos-healthy-living.png" },
  { name: "LadyCare", src: "/logos/ladycare.jpg" },
  { name: "Laurels Property", src: "/logos/laurels-property.png" },
  { name: "Learnify Africa", src: "/logos/learnify-africa.png" },
  { name: "Mmiri", src: "/logos/mmiri.png" },
  { name: "NGH", src: "/logos/ngh.png" },
  { name: "Oasis Global Properties", src: "/logos/oasis-global-properties.png" },
  { name: "Opus Homes", src: "/logos/opus-homes.png" },
  { name: "Peadville Schools", src: "/logos/peadville-schools.png" },
  { name: "Rotary District 9111", src: "/logos/rotary-district-9111.png" },
  { name: "Segz", src: "/logos/segz.png" },
  { name: "Senora Secrets", src: "/logos/senora-secrets.png" },
  { name: "SexTalk with Soulspice", src: "/logos/sextalk.png" },
  { name: "Triple S Fabrics", src: "/logos/triple-s-fabrics.png" },
  { name: "True Envy", src: "/logos/true-envy.png" },
  { name: "Zuife Naturals", src: "/logos/zuife-naturals.png" },
];

export const testimonials = [
  {
    quote: "I cannot remember the last time I enjoyed myself like this. Thank you for helping us reconnect.",
    label: "Private coaching client",
    tag: "Renewed connection",
  },
  {
    quote: "I found you speaking and realised: this is my marriage too. Intimacy can be good for both of us.",
    label: "Community member",
    tag: "Confidence & voice",
  },
  {
    quote: "You helped me through a battle I had carried for years. I can now love my wife more intentionally.",
    label: "Anonymous client",
    tag: "Personal breakthrough",
  },
  {
    quote: "The practical guidance brought playfulness back into our home. We feel close again.",
    label: "Programme participant",
    tag: "Marriage enrichment",
  },
  {
    quote: "Excitement wants to kill me. My husband is now chasing me round the house every day.",
    label: "Wifestars member",
    tag: "Playfulness restored",
  },
  {
    quote: "Thank you for giving me the confidence to try again.",
    label: "Wifestars member",
    tag: "Confidence",
  },
];

export const faqs = [
  {
    q: "Is the discovery call really free?",
    a: "Yes. The discovery call is a free, private one hour conversation. You share what is on your mind, ask your questions, and leave knowing your best next step. There is no obligation to book anything else.",
  },
  {
    q: "Is The Intimacy Masters for Christians?",
    a: "Yes. Our work is faith-centered and creates room to explore emotional and sexual connection while respecting Christian values, personal dignity, and the realities of married life.",
  },
  {
    q: "Do we need to be experiencing a serious problem?",
    a: "Not at all. You can seek support when something feels difficult or simply because you want to invest in communication, closeness, and a more fulfilling relationship.",
  },
  {
    q: "I feel embarrassed talking about sex. Where do I start?",
    a: "You do not need perfect words. Begin with the question or concern that feels most important. The conversation is compassionate, practical, and free of shame. If a call feels like too much today, send a WhatsApp message instead.",
  },
  {
    q: "Can I book individual support?",
    a: "Yes. The Intimacy Masters supports men, women and couples, with private guidance shaped around your questions, needs, and relationship experience.",
  },
  {
    q: "What happens to what I share?",
    a: "It stays private. Sessions are confidential, and stories shared on this site are anonymous and used only with care. You can read more in our privacy policy.",
  },
];

import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { contact, mailtoLink } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How The Intimacy Masters handles your information, in plain language.",
};

const sections = [
  {
    title: "The short version",
    body: [
      "What you share with The Intimacy Masters is private. We use it only to respond to you and to provide the service you asked for. We do not sell it, and we do not share your story with anyone.",
    ],
  },
  {
    title: "What this website collects",
    body: [
      "This website does not ask you to create an account.",
      "When you unlock a free guide, we keep your first name, email address and phone number. We use them to give you the guide, to send you Jessica's newsletter, and occasionally to tell you about her programmes. You can ask us to remove them at any time.",
      "When you request a discovery call, your answers and your name and email are passed to Calendly together with your booking, so that Jessica's team can review your request and confirm your call. This website does not keep a copy.",
      "When you send an enquiry, your message opens in WhatsApp or your own email app, and you choose whether to send it.",
    ],
  },
  {
    title: "Services we rely on",
    body: [
      "Calendly handles call bookings. Selar handles payments for books, courses and sessions. Substack delivers the weekly newsletter. Supabase securely stores free guide signups. WhatsApp and Gmail carry messages you choose to send us. Each of these services has its own privacy policy and holds the information you give it directly.",
      "We never see or store your card details. Payments are processed by Selar and its payment partners.",
    ],
  },
  {
    title: "Confidentiality in coaching",
    body: [
      "Sessions are confidential. Testimonials on this website are shared anonymously and edited so that no one can be identified.",
      "The only exception is where there is a serious risk of harm to you or to someone else, where we may need to involve the appropriate help.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. You can unsubscribe from the newsletter at any time using the link in every email.",
    ],
  },
  {
    title: "A note on care",
    body: [
      "Education and coaching are not a substitute for emergency, medical or psychiatric care. If you are in danger, please contact your local emergency services.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="bg-[#FFF9F5] pb-20 pt-36 sm:pt-44 lg:pb-28">
        <div className="hero-rise mx-auto max-w-3xl px-6 sm:px-8">
          <p className="eyebrow text-[#8D2F5B]">Privacy policy</p>
          <h1 className="page-title mt-5 text-[#321321]">Your privacy matters here.</h1>
          <p className="mt-6 text-lg leading-relaxed text-[#5F4B55]">Last updated November 2026.</p>
          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#381626]">{section.title}</h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-[#5F4B55]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            <section>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#381626]">Contact</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#5F4B55]">
                Questions about your privacy? Email{" "}
                <a href={mailtoLink("Privacy question")} className="font-bold text-[#8D2F5B] underline underline-offset-4">{contact.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

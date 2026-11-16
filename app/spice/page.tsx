import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { SpiceExperience } from "../components/spice-experience";

export const metadata: Metadata = {
  title: "The spice check",
  description:
    "What is a spicy sex life? A playful, honest look for married couples, with a one minute spice meter and a free guide from clinical sexologist Jessica Sampson.",
};

export default function SpicePage() {
  return (
    <PageShell>
      <SpiceExperience />
    </PageShell>
  );
}

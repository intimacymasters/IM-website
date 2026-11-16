import { PageShell } from "../components/page-shell";
import { SpiceExperience } from "../components/spice-experience";
import { JsonLd } from "../components/json-ld";
import { pageMetadata } from "../lib/seo";
import { pageGraph } from "../lib/structured-data";

const seo = {
  title: "How Spicy Is Your Marriage? | The Intimacy Masters",
  description:
    "What is a spicy sex life? A playful, honest spice check for married couples, with a one minute quiz and a free guide from sexologist Jessica Sampson.",
  path: "/spice",
  absoluteTitle: true,
};

export const metadata = pageMetadata(seo);

export default function SpicePage() {
  return (
    <PageShell>
      <JsonLd data={pageGraph({ path: seo.path, name: "The spice check", description: seo.description })} />
      <SpiceExperience />
    </PageShell>
  );
}

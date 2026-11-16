// Free guide gate. A visitor gives a first name, email and phone number; the
// lead is saved first, and only then is the guide link returned. The link is
// kept here on the server so it never ships inside the page.
//
// Where leads go: the guide_leads table in The Intimacy Masters' Supabase
// project (see .env.example). The website's key can only add rows there; it
// cannot read, change or delete them. Substack has no API for adding
// subscribers, so the newsletter is handled separately: the visitor gets a one
// tap confirm link, and the team can export this table and import it in Substack.

const GUIDE_URL = "https://drive.google.com/file/d/1Qk-eFPck-uH8MGnId3pLIM_ifyM-Ce-f/view";
const GUIDE_NAME = "20 Ways to Initiate Love Making With Your Spouse";

type FieldErrors = Partial<Record<"firstName" | "email" | "phone", string>>;

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

async function saveLead(lead: { first_name: string; email: string; phone: string; guide: string; page: string }) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return "not-configured" as const;
  try {
    const response = await fetch(`${url}/rest/v1/guide_leads`, {
      method: "POST",
      headers: { apikey: key, "content-type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok ? ("saved" as const) : ("failed" as const);
  } catch {
    return "failed" as const;
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, message: "We could not read that. Please try again." }, { status: 400 });
  }

  // Hidden field that people never see. Anything typed here came from a bot.
  if (clean(body.company, 80)) return Response.json({ ok: true });

  const firstName = clean(body.firstName, 60);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 24);

  const errors: FieldErrors = {};
  if (firstName.length < 2) errors.firstName = "Please add your first name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please add a valid email address.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) errors.phone = "Please add a phone number, with country code.";
  if (Object.keys(errors).length > 0) return Response.json({ ok: false, errors }, { status: 422 });

  const result = await saveLead({ first_name: firstName, email, phone, guide: GUIDE_NAME, page: clean(body.page, 120) });

  if (result !== "saved") {
    // Never log the lead itself; only that saving did not work.
    console.error(`[guide] lead was not saved (${result}). Check SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.`);
    // On the live site the guide stays locked until the lead is safely stored.
    if (process.env.NODE_ENV === "production") {
      return Response.json(
        { ok: false, message: "Something went wrong on our side. Please try again in a moment, or message us on WhatsApp." },
        { status: 503 },
      );
    }
  }

  return Response.json({ ok: true, guideUrl: GUIDE_URL, saved: result === "saved" });
}

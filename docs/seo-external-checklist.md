# SEO: what is left to do outside the code

Last updated: 16 November 2026

The website code is finished for SEO. Everything below needs a login, a decision or content that only Jessica and the team can supply. It is ordered by impact.

Main address: `https://www.theintimacymaster.com`
Sitemap: `https://www.theintimacymaster.com/sitemap.xml`

---

## 1. Do this week

### 1.1 Google Search Console (highest priority)

Without this, Google is not told the site exists and you cannot see what people search for.

- [ ] Go to [search.google.com/search-console](https://search.google.com/search-console) and sign in with the business Google account.
- [ ] Add a **Domain** property for `theintimacymaster.com`. Google gives a TXT record. Add it where the domain was bought (DNS settings).
- [ ] If DNS is not accessible, add a **URL prefix** property for `https://www.theintimacymaster.com`, choose "HTML tag", copy the code, and add it on Vercel as an environment variable named `GOOGLE_SITE_VERIFICATION`. Redeploy. The site already reads this value.
- [ ] Sitemaps: submit `sitemap.xml`.
- [ ] URL inspection: paste each of the ten pages and click "Request indexing".

### 1.2 Bing Webmaster Tools

Bing also feeds DuckDuckGo, Yahoo and ChatGPT search.

- [ ] Go to [bing.com/webmasters](https://www.bing.com/webmasters) and choose "Import from Google Search Console". It takes two minutes once 1.1 is done.
- [ ] If Bing asks for a meta tag instead, add the code on Vercel as `BING_SITE_VERIFICATION` and redeploy.

### 1.3 Analytics

There is no visitor tracking yet, so nobody can see which pages bring enquiries.

- [ ] Choose one: **Vercel Web Analytics** (simplest, no cookie banner) or **Google Analytics 4** (more detail, needs a consent notice).
- [ ] Tell the developer which one. Connecting it is a small code change.
- [ ] Events worth tracking: discovery call application sent, call booked, free guide unlocked, shop link clicked, WhatsApp opened.

### 1.4 Point the Vercel address at the real domain

`im-website-rose.vercel.app` shows the same site. The code already tells search engines not to list it. A redirect is cleaner.

- [ ] Vercel → Project → Settings → Domains → `im-website-rose.vercel.app` → Edit → Redirect to `www.theintimacymaster.com`.

---

## 2. Domain name

The brand is "The Intimacy **Masters**" but the domain is `theintimacymaster.com` (no "s"). People who type the brand name land nowhere: `theintimacymasters.com` does not load today.

- [ ] Check whether `theintimacymasters.com` can be bought. If yes, buy it and redirect it to the main address.
- [ ] Decide which one is the long-term address. If it changes, set `NEXT_PUBLIC_SITE_URL` on Vercel and every SEO address on the site follows.
- [ ] Until then, always share the full link, never just the name.

---

## 3. Links from Jessica's own profiles

Links from trusted profiles are how Google connects the website to the person. Use the same name and the same one-line description everywhere.

Suggested line: *Jessica Sampson, licensed clinical sexologist and founder of The Intimacy Masters. Faith-centered marriage and intimacy coaching.*

- [ ] Instagram bio link
- [ ] TikTok bio link
- [ ] Linktree: put the website first
- [ ] Substack: About page and publication website field
- [ ] Selar store: description and website field
- [ ] Calendly profile
- [ ] Amazon author page (Outercourse)
- [ ] LinkedIn, Facebook, YouTube and X, if they exist. Send the developer the links so they can be added to the site's structured data.

---

## 4. Google Business Profile

This is what shows the panel on the right of Google with photo, reviews and a call button.

- [ ] Create a profile at [business.google.com](https://business.google.com).
- [ ] Category: "Marriage or relationship counselor". Second category: "Sex therapist" or "Life coach".
- [ ] Set it as a **service area business** (clients are served online) and hide the street address.
- [ ] Add the website, phone, WhatsApp, opening hours and ten or more photos.
- [ ] Ask ten past clients for a Google review. Send them the direct review link.

---

## 5. Trust signals

Sex and marriage advice is a sensitive topic. Google ranks it by how clearly the expert can be verified. The About page states Jessica's credentials. These details would make them checkable:

- [ ] The exact name of each licence or certification, who issued it, and the year.
- [ ] The name and year of each award.
- [ ] Press features, podcast interviews and TV or radio appearances, with links.
- [ ] Permission to show first name and city on a few reviews. Named reviews are trusted more than anonymous ones.
- [ ] A review of the privacy policy by Jessica or her adviser.

Send these to the developer and they go on the About page and into the structured data.

---

## 6. Links from other websites

Each link from a respected site is a vote. Jessica has already earned these; they only need asking for.

- [ ] Organisations in the "Trusted by" row: ask each to link to the Speaking page from their event or speaker page.
- [ ] Churches, schools and conferences where she has spoken.
- [ ] Podcasts and blogs that have hosted her: ask for the website link in the show notes.
- [ ] Two or three guest articles a year on Nigerian marriage, parenting or faith publications.
- [ ] Do not buy links or use link exchange groups. Google penalises both.

---

## 7. Content (the biggest long-term lever)

The site has ten pages. To be found for the questions people type, it needs articles that answer them. Jessica already writes this material for Substack and social media.

- [ ] Agree to add an **Articles** section to the site. This is code work.
- [ ] Publish two articles a month, 800 to 1,200 words each, in Jessica's voice.
- [ ] Start with questions people already search:
  - What to do in a sexless marriage
  - How to talk to your husband about sex
  - Is it a sin to enjoy sex in marriage?
  - Why a wife loses interest in sex, and what helps
  - How to explain sex to a child, age by age
  - How to rebuild intimacy after having a baby
- [ ] End every article with one next step: the free guide or the discovery call.
- [ ] Consider a page per book and course on the site. Today each product opens on Selar, so the site cannot rank for the product names.
- [ ] Video: a YouTube channel with the same talks gives a second way to be found. Send the links for embedding.

---

## 8. Files the developer still needs

- [ ] Original logo files for the partner organisations. Some are cropped in the current files.
- [ ] Any new professional photos, at full size.

---

## 9. Check after the site is live for a few days

- [ ] [Rich Results Test](https://search.google.com/test/rich-results): test the home, Coaching and Shop pages. No errors expected.
- [ ] [PageSpeed Insights](https://pagespeed.web.dev): test the home page on mobile. Send the developer the result if any score is under 80.
- [ ] Share a page link on WhatsApp and check the card shows the photo and title.
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/): paste the home page and click "Scrape again".
- [ ] Search Google for `site:theintimacymaster.com`. All ten pages should appear within two to four weeks.

---

## 10. Every month

- [ ] Search Console → Performance: note the top ten searches and which page each lands on.
- [ ] Search Console → Pages: fix anything listed as "Not indexed".
- [ ] Search Console → Core Web Vitals: all pages should be "Good".
- [ ] Add any new product, page or figure to the site so it stays current.

---

## Already done in the code

For reference. Nothing here needs action.

| Area | What is in place |
| --- | --- |
| Titles and descriptions | A unique, keyword-led title and description on every page |
| Canonical addresses | Every page names its one true address on `www.theintimacymaster.com` |
| Sitemap and robots | `sitemap.xml` and `robots.txt` are generated automatically |
| Share cards | Branded picture, title and description for WhatsApp, Instagram, X and LinkedIn |
| Structured data | Organisation, Jessica as a person, website, breadcrumbs, FAQs, services, and products with prices |
| Duplicate address | The `vercel.app` copy is marked "do not index" |
| 404 page | Branded, with links back in, and hidden from search |
| Headings | One main heading per page, in a clean order |
| Images | Descriptive alt text; the main photo loads first, the rest load as you scroll |
| Accessibility | "Skip to content" link, labelled landmarks and buttons |
| Mobile | Theme colour, app icons and web manifest |
| Verification | Ready for Google and Bing codes through environment variables |

### Search terms each page targets

| Page | Main search term |
| --- | --- |
| Home | Christian marriage and intimacy coach |
| Coaching | Private intimacy coaching for couples |
| Couples | Sexless marriage help |
| Wives | Community for wives (Wifestars) |
| Parents | Child sex education for parents |
| Speaking | Marriage and intimacy speaker |
| Shop | Marriage books and courses |
| About | Jessica Sampson, clinical sexologist |
| Spice check | How spicy is your marriage |

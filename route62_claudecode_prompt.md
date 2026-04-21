# Claude Code Prompt — Route 62 Holdings Website

## Project Overview

Build a multi-page, production-grade static website for **Route 62 Holdings**, a self-funded search fund / operator-led acquisition vehicle based in Denver, Colorado (Est. 2025). The site is aimed at business owners considering selling, and must convey credibility, warmth, and operator-first positioning — NOT a slick Wall Street PE vibe.

The site will be deployed on a custom GoDaddy domain. Build in **plain HTML/CSS/JS** — no frameworks, no build step, fully portable.

---

## Design Direction

### Aesthetic
Cinematic, refined, American West luxury. Think open highway at golden hour — not corporate glass towers. The brand name "Route 62" should feel like a journey, a road, a destination. Warm, confident, human.

- **NOT**: Cold blue PE website, generic finance template, purple gradients, Inter font
- **YES**: Deep charcoal/near-black backgrounds for hero sections; warm gold/amber accents (#C9A96E or similar); cream/off-white (#F7F4EE) for content sections; generous white space; cinematic full-bleed imagery

### Typography
- Display/headings: A distinctive serif or refined slab — something with character. Suggest **Playfair Display** or **Cormorant Garamond** for large headings (Google Fonts)
- Body: Clean, readable — **DM Sans** or **Lato** (NOT Inter, NOT Roboto)
- Nav: Spaced caps or light weight sans

### Color Palette (CSS variables)
```css
--color-bg-dark: #0D0D0B;
--color-bg-light: #F7F4EE;
--color-accent: #C9A96E;
--color-accent-hover: #B8935A;
--color-text-primary: #1A1A18;
--color-text-light: #FFFFFF;
--color-text-muted: #6B6B60;
--color-card-bg: #EDE9E0;
```

### Motion
- Smooth scroll behavior
- Fade-in + subtle translateY on scroll for section reveals (Intersection Observer)
- Nav: transparent on hero, becomes solid dark on scroll
- Hover states on all buttons and cards
- Logo carousel: smooth infinite auto-scroll

---

## File Structure

```
/
├── index.html          (Home)
├── about.html          (About Us)
├── investment.html     (Investment Criteria)
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── logo/
│   │   └── route62_logo.jpg    (provided — use this)
│   └── images/
│       └── (placeholders — use Unsplash source URLs for Route 62 road/highway/Colorado themed images)
```

Use `https://source.unsplash.com` or `https://images.unsplash.com` for placeholder images. Choose photos that match the Route 62 theme: open highways, American West roads, mountain passes, golden hour landscapes, Denver skyline, aerial road shots.

---

## Navigation (all pages)

Sticky nav bar, transparent over hero → solid `#0D0D0B` background on scroll.

**Left**: Route 62 logo (use `assets/logo/route62_logo.jpg`, white/inverted treatment on dark backgrounds)
**Center**: Pill-shaped nav container with links — `Home` · `About Us` · `Investment Criteria` — active page highlighted with pill background `#C9A96E` text dark
**Right**: `Get in Touch →` button — outlined pill, white border, fills on hover

Mobile: hamburger menu, full-screen overlay nav.

---

## PAGE 1: index.html (Home)

### Section 1 — Hero
- Full viewport height, full-bleed background: cinematic highway/road photo (placeholder from Unsplash)
- Dark overlay gradient (bottom-heavy, 60% opacity)
- **Breadcrumb**: none on home
- **Headline** (large, serif): `Backing the Next Generation of Acquisition Entrepreneurs`
- **Subtext**: `We are a search fund providing flexible capital, real-world experience, and aligned partnership for acquisition entrepreneurs and long-term holding companies.`
- **Floating stat card** (bottom-right, glassmorphism dark card):
  - `$90M+` large · `Assets Under Management` small
- **CTAs** bottom-left: `Get in Touch →` (white pill) + `Learn More` (dark pill)
- **Bottom-right**: `Scroll to Explore ↓` small text

### Section 2 — Founder Story
Light background (`#F7F4EE`). Two-column layout.

**Left col**: 
- Small label: `OUR STORY`
- Heading: `Built by Operators. Backed by Experience.`
- Body copy:
  > Route 62 Holdings was founded by Max Araya and Nicole B — two finance professionals who spent years working inside private equity and wealth management before deciding to bet on themselves.
  >
  > After years of analyzing businesses from the outside, they found themselves most drawn to one question: how do you actually make a great business better? That curiosity led them away from careers with capped upside and toward a decision to step into ownership directly.
  >
  > Their approach is simple: find one outstanding business, step in as hands-on operators, preserve what the owner built, and grow it the right way — for the long term.
- CTA: `About Our Team →` linking to about.html

**Right col**: 
- A warm, atmospheric image (placeholder: two people in a business meeting, overhead shot or similar)

### Section 3 — Company Logos Carousel
Dark background (`#0D0D0B`). Section label: `TRUSTED BY OPERATORS AND PARTNERS`.
- Infinite auto-scrolling logo strip (left to right)
- Placeholder: 8–10 grey rectangle boxes with company name placeholder text (e.g. "Partner Co. 1") — these will be replaced with real logos
- Smooth CSS animation, no JS required for scroll

### Section 4 — Leadership Team
Light background. Centered heading: `Our Leadership Team`

Two cards side by side (stack on mobile). Each card:
- Top half: headshot placeholder (grey avatar box, rounded corners)
- Name (large), Title below
- Gold horizontal rule
- Italic tagline in bold
- LinkedIn button (pill, gold background)
- Bullet list of experience highlights

**Card 1 — Max Araya** · Co-Founder
- Tagline: *"Drawn to how businesses actually work — and driven to make them better."*
- LinkedIn: `https://www.linkedin.com/in/max-araya/` ← placeholder, update later
- Experience bullets:
  - VP, Fruition Partners Private Equity — Denver, CO (Dec 2023–Present)
  - Associate, Oaktree Capital Management — New York (2020–2022, Mezzanine Fund)
  - Investment Banking Analyst, J.P. Morgan — New York (2016–2020, Leveraged Finance / TMT)
  - Education: Middlebury College, B.A. International Politics & Economics; LSE, Accounting & Finance

**Card 2 — Nicole B** · Co-Founder
- Tagline: *"Operational instincts shaped by family business roots and a decade of working with owners."*
- LinkedIn: placeholder `#`
- Experience bullets:
  - Wealth Management, Family Office — Connecticut
  - Background in operations, client relations, and family business dynamics
  - Education: Bentley University, Finance
  - Grew up around family-owned businesses; deep appreciation for succession and continuity

### Section 5 — Let's Connect
Dark background (`#0D0D0B`). Centered, generous padding.
- Small label: `GET IN TOUCH`
- Heading: `Ready to Start a Conversation?`
- Subtext: `Whether you're a business owner thinking about the future, or an entrepreneur exploring partnership — we'd love to hear from you.`
- Two large CTA buttons side by side:
  - `Schedule a Call →` (gold pill)
  - `Send Us a Message →` (outlined white pill)
- Below: email placeholder `team@route62holdings.com`

---

## PAGE 2: about.html (About Us)

### Section 1 — Hero
Full viewport. Split image: left half sky/clouds, right half glass building facade (placeholder Unsplash).
- Breadcrumb: `Home • About`
- Headline: `About Us`
- Bottom tagline: `An Investment Philosophy Shaped by Real Operating Experience and Deep Alignment with Entrepreneurs`
- `Scroll to Explore ↓` bottom-right

### Section 2 — Company in Numbers
Two-column layout. Light background.

**Left col**: 
- Rounded image card (overhead shot of two businessmen in conversation)
- Overlaid glassmorphism card bottom of image:
  - `Our Funds Over Time`
  - `$35M` Fund I (2024) · `$55M` Fund II (2025)

**Right col**:
- Heading: `Route 62 in Numbers`
- Body: `From capital deployed to businesses scaled —` *`these figures reflect our journey`* (accent color) *`and results.`* (accent color)
- CTA: `Get in Touch →` (gold pill button)

**Below (full width)** — 5-column stat strip:
| `$90M+` | `25+` | `20+` | `8+` | `18+` |
|---|---|---|---|---|
| Assets under management | Transactions completed | Searchers backed | Independent sponsor deals | Years of experience |

Large number in heading font, label below in muted small text.

### Section 3 — Leadership Team
Identical to Home page Section 4. Reuse the same HTML structure.

---

## PAGE 3: investment.html (Investment Criteria)

### Section 1 — Hero
Full viewport. Upward-looking skyscraper photo (Unsplash placeholder — glass tower from below against sky).
- Breadcrumb: `Home • Investment Criteria`
- Headline: `Investment Criteria`
- Bottom tagline: `We Are Flexible and Evaluate Every Opportunity on its Own Merits`
- `Scroll to Explore ↓` bottom-right

### Section 2 — What Defines the Right Opportunity
Two-column layout. Light background.

**Left col** (sticky on scroll or static):
- Heading: `What Defines the Right Opportunity`
- Body: `Our most successful partnerships tend to align with these principles.`

**Right col**: 2-column grid of cards (slate-blue/grey rounded cards matching reference screenshots):

```
Card color: #8A9BB0 background, white text, rounded-2xl, padding generous
```

| Card | Title | Body |
|---|---|---|
| 1 | Investment Size | We typically invest between $500K–$5M of minority equity, with a preferred range of $1–3M per deal. |
| 2 | Geography | Our core focus is the United States, with select investments in Canada. |
| 3 | ETA Model | We are open to all ETA models, including traditional search funds, self-funded searchers, committed capital vehicles, long-term holds, and independent sponsors. |
| 4 | Industry Focus | We are industry-agnostic, investing in companies with strong profitability, recurring revenues, low customer concentration, healthy margins, high switching costs, and defensible advantages. |
| 5 | Deal Structure | We look for an attractive deal price and structure with a clear alignment of incentives. |
| 6 | Buyer Edge | Seeking a credible, compelling right to win. |
| 7 | Cap Table | For traditional search funds, we target a cap table allocation of 5–15%. |

Cards 1–6 in 2-col grid (3 rows). Card 7 spans full width or sits centered below.

---

## Shared Components

### Footer (all pages)
Dark background. Three columns:
- Col 1: Logo + tagline: `Backing the next generation of acquisition entrepreneurs.`
- Col 2: Quick links — Home · About Us · Investment Criteria
- Col 3: Contact — `team@route62holdings.com` · Denver, Colorado · Est. 2025
- Bottom bar: `© 2025 Route 62 Holdings LLC. All rights reserved.`

---

## JavaScript (main.js)

1. **Sticky nav**: Add `.scrolled` class to nav after 80px scroll → changes background
2. **Scroll reveal**: `IntersectionObserver` on all `.reveal` elements → fade in + translateY(20px) → translateY(0)
3. **Logo carousel**: CSS `@keyframes` infinite scroll on `.carousel-track`
4. **Mobile hamburger**: Toggle `.nav-open` class
5. **Smooth scroll**: `scroll-behavior: smooth` on html + JS for anchor links

---

## Placeholder Assets

Use these Unsplash URLs for placeholders (swap later):
- Highway/road hero: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920`
- About hero (building): `https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920`
- Investment criteria hero (skyscraper): `https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920`
- Business meeting: `https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800`
- Team headshot placeholder: grey `#C9C9C9` div with centered person icon SVG

---

## Important Notes

- All placeholder text marked with `[PLACEHOLDER]` comment in HTML for easy find/replace later
- Logo file is at `assets/logo/route62_logo.jpg` — use it in nav and footer
- Contact links, LinkedIn URLs, calendar links all use `href="#"` placeholder
- The site must look polished and complete even with all placeholders in place
- Mobile-first responsive: breakpoints at 768px and 1024px
- No external JS dependencies except Google Fonts
- Accessibility: proper alt tags, semantic HTML, focus states on interactive elements

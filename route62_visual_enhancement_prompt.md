# Claude Code Prompt — Route 62 Visual Enhancements & Animations

## Context
This is an addendum to the existing Route 62 Holdings website build. Apply all of the following visual and animation enhancements across all three pages (index.html, about.html, investment.html). These changes are modeled after careful observation of the SIWA Capital website (siwacap.com).

---

## 1. ROUNDED HERO FRAME (Highest Priority)

The hero section on every page must NOT be full-bleed to the browser edges. It must sit as a rounded card with a gap from the viewport.

**Exact implementation** (confirmed from SIWA's DOM):
```css
.hero-wrapper {
  margin: 8px;                    /* gap from all viewport edges */
  border-radius: 24px;            /* ~23.78px rounded on all corners */
  overflow: hidden;               /* clips the video/image inside */
  position: relative;
  width: calc(100vw - 16px);      /* full width minus 2x margin */
  height: calc(100vh - 16px);     /* full height minus 2x margin */
}
```

The page background behind the hero wrapper must be `#0D0D0B` (near-black) so the rounding reads clearly as a floating card. The nav bar sits INSIDE this rounded wrapper — it is part of the hero card, not outside it.

On mobile (< 768px): reduce margin to 4px, border-radius to 16px.

---

## 2. HERO GRADIENT OVERLAY — FIX THE WARMTH

The current hero background skews cold/blue at the top. Replace with a warmer, directional gradient:

```css
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 8, 5, 0.25) 0%,       /* subtle warm dark at very top */
    rgba(10, 8, 5, 0.05) 30%,       /* nearly transparent in middle — let image breathe */
    rgba(10, 8, 5, 0.55) 65%,       /* starts darkening for text legibility */
    rgba(10, 8, 5, 0.82) 100%       /* heavy dark at bottom where text lives */
  );
  z-index: 1;
}
```

Additionally add a subtle warm amber tint layer:
```css
.hero-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(180, 120, 40, 0.08); /* very subtle warm amber wash */
}
```

---

## 3. HEADLINE TYPOGRAPHY — ANCHOR BOTTOM LEFT

The hero headline must feel anchored and cinematic — heavy, tight, large. Adjust:

```css
.hero-headline {
  font-size: clamp(2.8rem, 5.5vw, 5rem);  /* responsive large */
  font-weight: 700;
  line-height: 1.05;                        /* tight */
  letter-spacing: -0.02em;                  /* slightly tighter tracking */
  max-width: 65%;                           /* don't let it run full width */
}
```

Position the entire hero text block at bottom-left:
```css
.hero-content {
  position: absolute;
  bottom: 10%;
  left: 6%;
  z-index: 2;
}
```

---

## 4. STAT CARD — COMPACT GLASSMORPHISM

Tighten the AUM stat card. It should feel like a compact badge, not a large box:

```css
.stat-card {
  position: absolute;
  bottom: 10%;
  right: 6%;
  z-index: 2;
  background: rgba(20, 18, 14, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px 28px;
  min-width: 200px;
}

.stat-card .stat-number {
  font-size: 2.4rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-card .stat-label {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.65);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 6px;
}
```

---

## 5. ANIMATIONS — USE GSAP + ScrollTrigger

Add GSAP via CDN in the `<head>` of all pages:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

Implement ALL of the following in `js/main.js`:

---

### 5a. Hero Load Animation — Word-by-Word Headline Reveal

Split the hero headline into individual `<span>` words on page load, then animate each word in sequence:

```javascript
function initHeroWordReveal() {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;

  // Split into word spans
  const words = headline.textContent.trim().split(' ');
  headline.innerHTML = words
    .map(w => `<span class="word" style="opacity:0.15; display:inline-block; margin-right:0.25em;">${w}</span>`)
    .join('');

  // Animate each word sequentially
  gsap.to('.hero-headline .word', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.12,       // 120ms between each word
    ease: 'power2.out',
    delay: 0.3,
    onStart: function() {
      gsap.set('.hero-headline .word', { y: 12 });
    }
  });
}
```

Words start at `opacity: 0.15` (ghost/muted white), move to `opacity: 1` (full white) with a subtle 12px upward drift. Stagger 120ms between words — same as SIWA.

---

### 5b. Hero Load Animation — Subtext and CTAs Fade In

After headline completes, fade in subtext and CTA buttons:

```javascript
function initHeroSubReveal() {
  gsap.fromTo('.hero-subtext',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 1.8 }
  );

  gsap.fromTo('.hero-ctas',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 2.1 }
  );

  gsap.fromTo('.scroll-hint',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, delay: 2.5 }
  );
}
```

---

### 5c. AUM Counter — Count Up on Page Load

The stat card number counts up from 0 to the target value simultaneously with the word reveal:

```javascript
function initAUMCounter() {
  const statEl = document.querySelector('.stat-number[data-target]');
  if (!statEl) return;

  const target = parseInt(statEl.getAttribute('data-target')); // e.g. 90
  const suffix = statEl.getAttribute('data-suffix') || 'M+';  // e.g. 'M+'
  const prefix = statEl.getAttribute('data-prefix') || '$';   // e.g. '$'

  let current = 0;
  const duration = 2800; // ms — same slow count as SIWA
  const startTime = Date.now() + 400; // slight delay

  function update() {
    const elapsed = Date.now() - startTime;
    if (elapsed < 0) { requestAnimationFrame(update); return; }
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    current = Math.round(eased * target);
    statEl.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

In HTML, add data attributes to the stat number:
```html
<div class="stat-number" data-target="90" data-prefix="$" data-suffix="M+">$0M+</div>
```

---

### 5d. Scroll-Triggered Word Reveal — Section Headings

Apply the same word-by-word reveal to ALL major section headings when they scroll into view:

```javascript
function initScrollWordReveals() {
  document.querySelectorAll('.section-heading').forEach(heading => {
    const words = heading.textContent.trim().split(' ');
    heading.innerHTML = words
      .map(w => `<span class="scroll-word" style="opacity:0.12; display:inline-block; margin-right:0.22em;">${w}</span>`)
      .join('');

    gsap.to(heading.querySelectorAll('.scroll-word'), {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%',
        once: true
      },
      onStart: function() {
        gsap.set(heading.querySelectorAll('.scroll-word'), { y: 10 });
      }
    });
  });
}
```

Apply the class `section-heading` to ALL major headings across all three pages.

---

### 5e. Scroll-Triggered Number Counters — Stats Section

All stat numbers in the About page "in numbers" strip count up when scrolled into view:

```javascript
function initScrollCounters() {
  document.querySelectorAll('.stat-counter[data-target]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-target'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '+';
    let triggered = false;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (triggered) return;
        triggered = true;
        const duration = 1800;
        const startTime = Date.now();

        function update() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 2.5);
          const current = Math.round(eased * target);
          el.textContent = prefix + current + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      }
    });
  });
}
```

In HTML, update all stat numbers in the stats strip:
```html
<div class="stat-counter" data-target="90" data-prefix="$" data-suffix="M+">$0M+</div>
<div class="stat-counter" data-target="25" data-prefix="" data-suffix="+">0+</div>
<div class="stat-counter" data-target="20" data-prefix="" data-suffix="+">0+</div>
<div class="stat-counter" data-target="8" data-prefix="" data-suffix="+">0+</div>
<div class="stat-counter" data-target="18" data-prefix="" data-suffix="+">0+</div>
```

---

### 5f. Scroll-Triggered Section Reveals — Cards and Content Blocks

All cards, team cards, investment criteria cards, and content sections fade and rise into view on scroll:

```javascript
function initScrollReveals() {
  // Generic reveal for sections
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      }
    );
  });

  // Staggered reveal for card grids
  gsap.utils.toArray('.card-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          once: true
        }
      }
    );
  });
}
```

Add class `reveal` to: founder story section, leadership team section, "Let's Connect" section, and any image blocks.
Add class `card-grid` to the parent container of: investment criteria cards, leadership team cards.

---

### 5g. Numbered List Stagger Reveal (About/Why Us section)

If a numbered list section (01, 02, 03...) exists, stagger each row in:

```javascript
function initListReveal() {
  gsap.utils.toArray('.numbered-list .list-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          once: true
        },
        delay: i * 0.08
      }
    );
  });
}
```

---

### 5h. Parallax on Hero Background

The hero video/image moves at 60% of scroll speed creating depth:

```javascript
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  gsap.to(heroBg, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}
```

The hero background (video or image) must be set to `height: 120%` and `top: -10%` to allow room for parallax movement without showing gaps.

---

### 5i. Nav Scroll Behavior

```javascript
function initNavScroll() {
  const nav = document.querySelector('.nav');
  
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.progress > 0) {
        nav.classList.add('nav-scrolled'); // adds dark background
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }
  });
}
```

```css
.nav {
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
  background: transparent;
}
.nav.nav-scrolled {
  background: rgba(13, 13, 11, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

---

### 5j. Init All on DOMContentLoaded

```javascript
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  initHeroWordReveal();
  initHeroSubReveal();
  initAUMCounter();
  initScrollWordReveals();
  initScrollCounters();
  initScrollReveals();
  initListReveal();
  initHeroParallax();
  initNavScroll();
});
```

---

## 6. LOGO CAROUSEL — SMOOTH INFINITE SCROLL

Pure CSS infinite scroll, no JS required:

```css
.carousel-track {
  display: flex;
  gap: 80px;
  align-items: center;
  width: max-content;
  animation: carousel-scroll 30s linear infinite;
}

@keyframes carousel-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.carousel-track:hover {
  animation-play-state: paused;
}
```

Duplicate the logo list twice inside `.carousel-track` so it loops seamlessly. Each logo: `height: 36px`, `opacity: 0.55`, `filter: grayscale(100%)`. On hover: `opacity: 1`, `filter: none`, smooth transition.

---

## 7. ABOUT PAGE HERO — SPLIT IMAGE LAYOUT

The About hero uses a split-screen layout:
- Left 55%: sky/clouds image
- Right 45%: glass building facade image
- Both images inside the rounded hero wrapper
- A subtle vertical dividing line between them (1px, rgba white, 30% opacity)

```css
.hero-split {
  display: grid;
  grid-template-columns: 55% 45%;
  height: 100%;
}
.hero-split-left, .hero-split-right {
  background-size: cover;
  background-position: center;
}
```

Breadcrumb, headline, and tagline overlay both panels at bottom-left with z-index above.

---

## 8. INVESTMENT CRITERIA CARDS — CORRECT COLORS

The cards in the Investment Criteria section must use this exact color:
```css
.criteria-card {
  background: #8A9BB0;   /* slate-blue/grey matching SIWA reference */
  border-radius: 20px;
  padding: 32px 28px;
  color: #ffffff;
  transition: transform 0.25s ease, background 0.25s ease;
}
.criteria-card:hover {
  transform: translateY(-4px);
  background: #7A8EA3;
}
.criteria-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
}
.criteria-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
}
```

---

## 9. SCROLL-TO-EXPLORE INDICATOR

Bottom right of every hero. Subtle bounce animation:
```css
.scroll-hint {
  position: absolute;
  bottom: 28px;
  right: 32px;
  z-index: 2;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  gap: 8px;
}
.scroll-hint .arrow {
  animation: bounce-down 1.8s ease infinite;
}
@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(5px); }
}
```

---

## 10. BUTTON HOVER STATES

All buttons across the site:
```css
.btn-primary {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}

/* The arrow inside CTA buttons slides right on hover */
.btn-arrow .arrow-icon {
  transition: transform 0.2s ease;
  display: inline-block;
}
.btn-arrow:hover .arrow-icon {
  transform: translateX(4px);
}
```

---

## Summary of Classes to Add in HTML

| Element | Class to Add |
|---|---|
| Hero wrapper div | `hero-wrapper` |
| Hero bg video/image div | `hero-bg` |
| Hero overlay div | `hero-overlay` |
| Hero content block | `hero-content` |
| Hero headline | `hero-headline` |
| Hero subtext | `hero-subtext` |
| Hero CTA buttons wrapper | `hero-ctas` |
| Scroll to explore | `scroll-hint` |
| AUM counter number | `stat-number` with `data-target`, `data-prefix`, `data-suffix` |
| All major section headings | `section-heading` |
| About stats numbers | `stat-counter` with `data-target`, `data-prefix`, `data-suffix` |
| Section content blocks | `reveal` |
| Card parent containers | `card-grid` |
| Individual cards | `card` |
| Logo carousel track | `carousel-track` |
| Nav bar | `nav` |

Apply all of the above. Do not change any existing content, copy, or structure — only add the visual styles and animations specified here.

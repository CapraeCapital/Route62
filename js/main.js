/* ============================================================
   ROUTE 62 HOLDINGS — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV SCROLL (hide on down, show on up, always transparent) ── */
  const nav = document.getElementById('nav');
  let lastScrollY = window.scrollY;

  if (nav) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80) {
        nav.style.transform = 'translateY(0)';
      } else if (currentScrollY > lastScrollY) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  /* ── HAMBURGER MENU ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    function openMenu() {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) closeMenu();
      else openMenu();
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── ACTIVE NAV LINK ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ── GSAP ANIMATIONS ── */
  if (typeof gsap === 'undefined') {
    /* Fallback: CSS-class reveal via IntersectionObserver */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
      );
      revealEls.forEach(el => observer.observe(el));
    }
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero word-by-word headline reveal ── */
  function initHeroWordReveal() {
    const headline = document.querySelector('.hero-headline');
    if (!headline) return;

    const words = headline.textContent.trim().split(/\s+/);
    headline.innerHTML = words
      .map(w => `<span class="word" style="display:inline-block; margin-right:0.25em;">${w}</span>`)
      .join('');

    gsap.set('.hero-headline .word', { opacity: 0.15, y: 12 });
    gsap.to('.hero-headline .word', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.3
    });
  }

  /* ── Hero subtext, CTAs, and stat card fade in ── */
  function initHeroSubReveal() {
    const sub      = document.querySelector('.hero-sub');
    const ctas     = document.querySelector('.hero-ctas');
    const hint     = document.querySelector('.scroll-hint');
    const statCard = document.querySelector('.hero-stat-card');

    if (sub)      { gsap.set(sub,      { opacity: 0, y: 16 }); gsap.to(sub,      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 1.8 }); }
    if (ctas)     { gsap.set(ctas,     { opacity: 0, y: 12 }); gsap.to(ctas,     { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 2.1 }); }
    if (hint)     { gsap.set(hint,     { opacity: 0 });         gsap.to(hint,     { opacity: 1, duration: 0.8, delay: 2.5 }); }
    if (statCard) { gsap.set(statCard, { opacity: 0, y: 16 }); gsap.to(statCard, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.5 }); }
  }

  /* ── AUM hero counter ── */
  function initAUMCounter() {
    const statEl = document.querySelector('.stat-number[data-target]');
    if (!statEl) return;

    const target   = parseInt(statEl.getAttribute('data-target'), 10);
    const suffix   = statEl.getAttribute('data-suffix') || 'M+';
    const prefix   = statEl.getAttribute('data-prefix') || '$';
    const duration = 2800;
    const start    = Date.now() + 400;

    function tick() {
      const elapsed  = Date.now() - start;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      statEl.textContent = prefix + Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ── Scroll-triggered word reveals for section headings ── */
  function initScrollWordReveals() {
    document.querySelectorAll('.section-heading').forEach(heading => {
      const words = heading.textContent.trim().split(/\s+/);
      heading.innerHTML = words
        .map(w => `<span class="scroll-word" style="display:inline-block; margin-right:0.22em;">${w}</span>`)
        .join('');

      const wordEls = heading.querySelectorAll('.scroll-word');
      gsap.set(wordEls, { opacity: 0.12, y: 10 });

      gsap.to(wordEls, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: heading, start: 'top 80%', once: true }
      });
    });
  }

  /* ── Scroll-triggered number counters (stats strip) ── */
  function initScrollCounters() {
    document.querySelectorAll('.stat-counter[data-target]').forEach(el => {
      const target  = parseFloat(el.getAttribute('data-target'));
      const prefix  = el.getAttribute('data-prefix') || '';
      const suffix  = el.getAttribute('data-suffix') || '+';
      let triggered = false;

      ScrollTrigger.create({
        trigger: el,
        start:   'top 85%',
        once:    true,
        onEnter: () => {
          if (triggered) return;
          triggered = true;
          const duration  = 1800;
          const startTime = Date.now();

          function tick() {
            const elapsed  = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 2.5);
            el.textContent = prefix + Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      });
    });
  }

  /* ── Scroll-triggered section and card reveals ── */
  function initScrollReveals() {
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    gsap.utils.toArray('.card-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.card');
      if (!cards.length) return;
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true }
        }
      );
    });
  }

  /* ── Hero video parallax ── */
  function initHeroParallax() {
    const heroBg   = document.querySelector('.hero-bg');
    const heroWrap = document.querySelector('.hero');
    if (!heroBg || !heroWrap) return;

    gsap.to(heroBg, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: { trigger: heroWrap, start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  initHeroWordReveal();
  initHeroSubReveal();
  initAUMCounter();
  initScrollWordReveals();
  initScrollCounters();
  initScrollReveals();
  initHeroParallax();

})();

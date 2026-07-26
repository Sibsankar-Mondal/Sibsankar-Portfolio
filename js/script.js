/* ==========================================================================
   SIBSANKAR MONDAL — PORTFOLIO v3 — script.js
   ==========================================================================
   This file expects a global CONFIG object (defined in js/config.js, loaded
   BEFORE this file) shaped roughly like:

   CONFIG = {
     personal:  { name, initials, status, photo, resumeUrl, resumeThumbnail },
     hero:      { eyebrow, masthead, subhead },
     about:     { story, philosophy, timeline: [{date,title,subtitle,description}] },
     education: [{date,title,subtitle,description}],
     experience:[{date,title,subtitle,description}],
     internship:{ company, role, duration, description, highlights:[text,...] },
     projects:  [{ slug, title, role, shortDescription, coverImage, tags:[],
                   discipline: 'mechanical'|'electronics'|'software', ...detail fields }],
     skills:    [{ category, icon, discipline, items:[text,...] }],
     achievements:  [{ icon, date, title, description }],
     certifications:[{ image, title, issuer, date }],
     gallery:   [{ image, caption }],
     social:    { linkedin, github, instagram, emailHref },
     contact:   { emailjsServiceId, emailjsTemplateId, emailjsPublicKey }
   }

   Nothing in this file should ever need editing to update site content —
   that's what js/config.js is for. See README.md.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- utilities ---------- */

  function getValue(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
  }

  function queryIncludingSelf(root, selector) {
    const results = Array.from(root.querySelectorAll(selector));
    if (root.matches && root.matches(selector)) results.unshift(root);
    return results;
  }

  function throttle(fn, wait) {
    let lastTime = 0;
    let timeout = null;
    return function throttled(...args) {
      const now = Date.now();
      const remaining = wait - (now - lastTime);
      if (remaining <= 0) {
        clearTimeout(timeout);
        lastTime = now;
        fn.apply(this, args);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          lastTime = Date.now();
          fn.apply(this, args);
        }, remaining);
      }
    };
  }

  function hasConfig() {
    if (typeof CONFIG === 'undefined') {
      console.warn('[portfolio] CONFIG not found — make sure js/config.js loads before js/script.js. Dynamic sections stay empty until config.js has content.');
      return false;
    }
    return true;
  }

  /* ---------- static text/attribute binding: data-bind / data-bind-src / data-bind-href ---------- */

  function bindText(el) {
    const path = el.getAttribute('data-bind');
    const value = getValue(CONFIG, path);
    if (value == null) return;
    if (el.hasAttribute('data-bind-html')) {
      el.innerHTML = String(value)
        .split(/\n\s*\n/)
        .map((para) => `<p>${para.trim()}</p>`)
        .join('');
    } else {
      el.textContent = value;
    }
  }

  function bindSrc(el) {
    const path = el.getAttribute('data-bind-src');
    const value = getValue(CONFIG, path);
    if (value) el.src = value;
  }

  function bindHref(el) {
    const path = el.getAttribute('data-bind-href');
    const value = getValue(CONFIG, path);
    if (value) el.href = value;
  }

  function hydrateStaticBindings() {
    if (!hasConfig()) return;
    document.querySelectorAll('[data-bind]').forEach(bindText);
    document.querySelectorAll('[data-bind-src]').forEach(bindSrc);
    document.querySelectorAll('[data-bind-href]').forEach(bindHref);
  }

  /* ---------- repeated content: data-repeat + <template> cloning ---------- */

  function populateFields(root, item) {
    if (root.hasAttribute('data-discipline') && item.discipline) {
      root.setAttribute('data-discipline', item.discipline);
    }

    queryIncludingSelf(root, '[data-field]').forEach((el) => {
      const key = el.getAttribute('data-field');
      const value = item[key];
      if (value != null) el.textContent = value;
    });

    queryIncludingSelf(root, '[data-field-src]').forEach((el) => {
      const key = el.getAttribute('data-field-src');
      if (item[key]) el.src = item[key];
      const altKey = el.getAttribute('data-field-alt');
      if (altKey && item[altKey]) el.alt = item[altKey];
      if (el.tagName === 'IMG') {
        el.loading = 'lazy';
        el.decoding = 'async';
      }
    });

    queryIncludingSelf(root, '[data-field-href]').forEach((el) => {
      const key = el.getAttribute('data-field-href');
      let value = item[key];
      if (!value && key === 'detailUrl' && item.slug) {
        value = `projects/project.html?slug=${encodeURIComponent(item.slug)}`;
      }
      if (value) el.href = value;
    });

    queryIncludingSelf(root, '[data-field-icon]').forEach((el) => {
      const key = el.getAttribute('data-field-icon');
      if (item[key]) el.className = `${el.className} ${item[key]}`.trim();
    });

    queryIncludingSelf(root, '[data-field-list]').forEach((el) => {
      const key = el.getAttribute('data-field-list');
      const list = item[key];
      if (Array.isArray(list)) {
        el.innerHTML = '';
        list.forEach((text) => {
          const span = document.createElement('span');
          span.textContent = text;
          el.appendChild(span);
        });
      }
    });
  }

  function renderRepeat(container) {
    const path = container.getAttribute('data-repeat');
    const templateId = container.getAttribute('data-template');
    const template = document.getElementById(templateId);
    const items = getValue(CONFIG, path);
    if (!template || !Array.isArray(items)) return;

    container.innerHTML = '';
    items.forEach((item) => {
      const fragment = template.content.cloneNode(true);
      const rootEl = fragment.firstElementChild;
      populateFields(rootEl, item);
      container.appendChild(fragment);
    });
  }

  function renderAllRepeats() {
    if (!hasConfig()) return;
    document.querySelectorAll('[data-repeat]').forEach(renderRepeat);
  }

  /* ---------- skills: group cards by discipline with labels ---------- */

  function groupSkillCards() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    const labels = {
      mechanical: 'MECHANICAL',
      electronics: 'ELECTRONICS & ROBOTICS',
      software: 'SOFTWARE & PROGRAMMING',
    };
    let lastDiscipline = null;
    Array.from(grid.children).forEach((card) => {
      const discipline = card.getAttribute('data-discipline');
      if (discipline && discipline !== lastDiscipline) {
        const header = document.createElement('div');
        header.className = 'skills-group-label mono';
        header.textContent = labels[discipline] || discipline.toUpperCase();
        grid.insertBefore(header, card);
        lastDiscipline = discipline;
      }
    });
  }

  /* ---------- loading screen ---------- */

  function initLoadingScreen() {
    const screen = document.getElementById('loading-screen');
    if (!screen) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        screen.classList.add('is-hidden');
        setTimeout(() => {
          screen.style.display = 'none';
        }, 700);
      }, 400);
    });
  }

  /* ---------- mobile nav ---------- */

  function initMobileNav() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('primary-nav');
    const scrim = document.getElementById('mobile-nav-scrim');
    if (!toggle || !nav) return;

    const main = document.querySelector('main');

    function closeNav() {
      toggle.classList.remove('is-open');
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (scrim) scrim.hidden = true;
      if (main) main.removeAttribute('aria-hidden');
    }
    function openNav() {
      toggle.classList.add('is-open');
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      if (scrim) scrim.hidden = false;
      if (main) main.setAttribute('aria-hidden', 'true');
    }

    toggle.addEventListener('click', () => {
      nav.classList.contains('is-open') ? closeNav() : openNav();
    });
    if (scrim) scrim.addEventListener('click', closeNav);
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- scroll spy (sheet counter + active nav) + scroll progress ---------- */

  function initScrollSpyAndProgress() {
    const sections = document.querySelectorAll('main .sheet');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentSheetEl = document.getElementById('current-sheet');

    if (sections.length && currentSheetEl) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sheet = entry.target.getAttribute('data-sheet');
              currentSheetEl.textContent = sheet;
              navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('data-sheet') === sheet);
              });
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      sections.forEach((section) => observer.observe(section));
    }

    const progressFill = document.getElementById('scroll-progress');
    if (progressFill) {
      const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressFill.style.width = `${pct}%`;
      };
      window.addEventListener('scroll', throttle(updateProgress, 50), { passive: true });
      updateProgress();
    }
  }

  /* ---------- scroll reveal ---------- */

  function markRevealTargets() {
    document
      .querySelectorAll(
        '.timeline-item, .project-card, .skill-card, .skills-group-label, .achievement-card, .certification-card, .gallery-item, .internship-card, .about-grid > *, .section-header, .project-section'
      )
      .forEach((el) => el.classList.add('reveal'));
  }

  function initScrollReveal() {
    const revealables = document.querySelectorAll('.reveal');
    if (!revealables.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealables.forEach((el) => observer.observe(el));
  }

  /* ---------- project filters ---------- */

  function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const grid = document.getElementById('project-grid');
    if (!buttons.length || !grid) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        grid.querySelectorAll('.project-card').forEach((card) => {
          const match = filter === 'all' || card.getAttribute('data-discipline') === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- back to top ---------- */

  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    const toggle = () => {
      btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', throttle(toggle, 100), { passive: true });
    toggle();
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- hero photo fallback (handles a missing/broken image gracefully) ---------- */

  function initHeroPhotoFallback() {
    const media = document.querySelector('.hero-media');
    const photo = document.querySelector('.hero-photo');
    if (!media || !photo) return;
    const flag = () => media.classList.add('photo-missing');
    if (photo.complete) {
      if (photo.naturalWidth === 0) flag();
    } else {
      photo.addEventListener('error', flag, { once: true });
    }
  }

  /* ---------- hero eyebrow typewriter (real ongoing motion, respects reduced-motion) ---------- */

  function initTypewriterEyebrow() {
    const el = document.querySelector('.hero .eyebrow');
    if (!el || !hasConfig()) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const source = (CONFIG.hero && CONFIG.hero.eyebrow) || '';
    const phrases = source.split(/\s*—\s*/).map((s) => s.trim()).filter(Boolean);
    if (phrases.length < 2) return; // not enough variety — leave the static text alone

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 30 : 55);
    }
    tick();
  }

  /* ---------- hero cursor coordinate readout (desktop, motion-safe only) ---------- */

  function initHeroCursorReadout() {
    const hero = document.querySelector('.hero');
    const xEl = document.getElementById('cursor-x');
    const yEl = document.getElementById('cursor-y');
    if (!hero || !xEl || !yEl) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      xEl.textContent = `X: ${String(Math.max(x, 0)).padStart(3, '0')}`;
      yEl.textContent = `Y: ${String(Math.max(y, 0)).padStart(3, '0')}`;
    });
  }

  /* ---------- lightbox (shared by index.html gallery/certifications and project.html media grids) ---------- */

  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxLastFocused = null;

  function updateLightbox() {
    const item = lightboxItems[lightboxIndex];
    if (!item) return;
    const img = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    img.src = item.src;
    img.alt = item.caption || '';
    caption.textContent = item.caption || '';
    const multi = lightboxItems.length > 1;
    document.getElementById('lightbox-prev').style.display = multi ? '' : 'none';
    document.getElementById('lightbox-next').style.display = multi ? '' : 'none';
  }

  function openLightbox(items, index) {
    if (!items || !items.length) return;
    lightboxItems = items;
    lightboxIndex = index;
    lightboxLastFocused = document.activeElement;
    updateLightbox();
    const lb = document.getElementById('lightbox');
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    const main = document.querySelector('main');
    if (main) main.setAttribute('aria-hidden', 'true');
    document.getElementById('lightbox-close').focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    const main = document.querySelector('main');
    if (main) main.removeAttribute('aria-hidden');
    document.body.style.overflow = '';
    if (lightboxLastFocused) lightboxLastFocused.focus();
  }

  function getLightboxFocusable() {
    return Array.from(
      document.querySelectorAll('#lightbox-close, #lightbox-prev, #lightbox-next')
    ).filter((el) => el.offsetParent !== null);
  }

  function initLightboxControls() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => {
      lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
      updateLightbox();
    });
    document.getElementById('lightbox-next').addEventListener('click', () => {
      lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
      updateLightbox();
    });
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
      if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();

      // basic focus trap: keep Tab cycling within the lightbox controls
      if (e.key === 'Tab') {
        const focusable = getLightboxFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // exposed so project-render.js (Phase 4, project.html) can reuse the same lightbox
    window.__openLightbox = openLightbox;
  }

  function initGalleryLightbox() {
    if (!hasConfig() || !Array.isArray(CONFIG.gallery)) return;
    const items = CONFIG.gallery.map((g) => ({ src: g.image, caption: g.caption || '' }));
    document.querySelectorAll('#gallery-grid .gallery-item').forEach((el, index) => {
      el.addEventListener('click', () => openLightbox(items, index));
    });
  }

  function initCertificationLightbox() {
    if (!hasConfig() || !Array.isArray(CONFIG.certifications)) return;
    const items = CONFIG.certifications.map((c) => ({
      src: c.image,
      caption: [c.title, c.issuer].filter(Boolean).join(' — '),
    }));
    document.querySelectorAll('#certifications-grid .certification-card').forEach((el, index) => {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.addEventListener('click', () => openLightbox(items, index));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(items, index);
        }
      });
    });
  }

  /* ---------- contact form (Web3Forms) ----------
     Get a free access key at https://web3forms.com (enter your email, the
     key arrives instantly) and paste it into CONFIG.contact.web3formsAccessKey
     in js/config.js. Full walkthrough is in README.md.
  ------------------------------------------------------------------------- */

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fields = Array.from(form.querySelectorAll('input:not([name="botcheck"]), textarea'));
      fields.forEach((field) => field.removeAttribute('aria-invalid'));

      if (!form.checkValidity()) {
        const firstInvalid = fields.find((field) => !field.checkValidity());
        if (firstInvalid) {
          firstInvalid.setAttribute('aria-invalid', 'true');
          firstInvalid.focus();
        }
        status.textContent = 'Please fill in every field before sending.';
        return;
      }

      const cfg = (hasConfig() && CONFIG.contact) || {};
      const accessKey = cfg.web3formsAccessKey;

      if (!accessKey) {
        status.textContent = "Contact form isn't connected yet — add your Web3Forms access key in js/config.js (see README.md).";
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      status.textContent = 'Sending…';

      try {
        const formData = new FormData(form);
        formData.append('access_key', accessKey);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          status.textContent = "Message sent — thanks! I'll get back to you soon.";
          form.reset();
        } else {
          throw new Error(result.message || 'Unknown error');
        }
      } catch (err) {
        console.error('[portfolio] Web3Forms error:', err);
        status.textContent = 'Something went wrong sending that — please email me directly instead.';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* ---------- structured data (SEO) ---------- */

  function injectStructuredData() {
    if (!hasConfig()) return;
    const p = CONFIG.personal || {};
    const sameAs = Object.values(CONFIG.social || {}).filter(
      (url) => url && url.startsWith('http')
    );

    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: p.name,
      jobTitle: 'Production Engineering Student',
      description: (CONFIG.hero && CONFIG.hero.subhead) || undefined,
      image: p.photo || undefined,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Jadavpur University',
      },
      sameAs: sameAs.length ? sameAs : undefined,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /* ---------- footer year ---------- */

  function initFooterYear() {
    document.querySelectorAll('#footer-year').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- init ---------- */

  document.addEventListener('DOMContentLoaded', () => {
    hydrateStaticBindings();
    renderAllRepeats();
    groupSkillCards();

    initLoadingScreen();
    initMobileNav();
    initScrollSpyAndProgress();
    initProjectFilters();
    initBackToTop();
    initHeroPhotoFallback();
    initTypewriterEyebrow();
    initHeroCursorReadout();
    initLightboxControls();
    initGalleryLightbox();
    initCertificationLightbox();
    initContactForm();
    initFooterYear();
    injectStructuredData();

    // must run after dynamic content exists so cards/timeline items get marked
    markRevealTargets();
    initScrollReveal();
  });
})();

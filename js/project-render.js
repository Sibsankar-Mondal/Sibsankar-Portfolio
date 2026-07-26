/* ==========================================================================
   SIBSANKAR MONDAL — PORTFOLIO v3 — project-render.js
   ==========================================================================
   Runs only on projects/project.html. Reads ?slug=xxx from the URL, finds
   the matching entry in CONFIG.projects (js/config.js), and fills in every
   field on the page. Reuses the shared lightbox from script.js via
   window.__openLightbox (script.js must load before this file — see the
   <script> order at the bottom of project.html).

   Expected shape of a single CONFIG.projects[] entry (Phase 5 will define
   the real data — this is the contract this file relies on):

   {
     slug: 'ornithopter',
     title: 'Autonomous Ornithopter',
     role: 'Team Lead',
     shortDescription: '...',
     tags: ['Robotics', 'CAD', 'Sensors & Actuators'],
     discipline: 'mechanical',           // used for card accent on index.html
     coverImage: 'assets/images/projects/ornithopter-cover.jpg',
     links: { github: '', docs: '', demo: '' },
     overview: '...',
     problem: '...',
     designProcess: '...',
     cad:           { text: '...', images: ['url', ...] },
     manufacturing: { text: '...', images: ['url', ...] },
     electronics:   { text: '...', images: ['url', ...] },
     challenges: '...',
     iterations: '...',
     finalSolution: '...',
     gallery: ['url', ...],
     videos: [{ embedUrl: '' } | { src: '' }],
     downloads: [{ label: 'CAD files (.zip)', url: '' }]
   }
   ========================================================================== */

(function () {
  'use strict';

  function getSlugFromUrl() {
    return new URLSearchParams(window.location.search).get('slug');
  }

  function findProject(slug) {
    if (typeof CONFIG === 'undefined' || !Array.isArray(CONFIG.projects)) return null;
    return CONFIG.projects.find((p) => p.slug === slug) || null;
  }

  function renderTextBlock(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    const section = el.closest('.project-section');
    if (value == null || value === '') {
      if (section) section.style.display = 'none';
      return;
    }
    el.innerHTML = String(value)
      .split(/\n\s*\n/)
      .map((para) => `<p>${para.trim()}</p>`)
      .join('');
  }

  function normalizeMediaItem(img) {
    return typeof img === 'string' ? { src: img, caption: '' } : { src: img.src, caption: img.caption || '' };
  }

  function renderMediaGrid(id, images) {
    const el = document.getElementById(id);
    if (!el) return;
    const section = el.closest('.project-section');
    if (!Array.isArray(images) || !images.length) {
      if (section) section.style.display = 'none';
      return;
    }
    el.innerHTML = '';
    const items = images.map(normalizeMediaItem);
    items.forEach((item, index) => {
      const imgEl = document.createElement('img');
      imgEl.src = item.src;
      imgEl.alt = item.caption || '';
      imgEl.loading = 'lazy';
      imgEl.decoding = 'async';
      imgEl.addEventListener('click', () => {
        if (typeof window.__openLightbox === 'function') window.__openLightbox(items, index);
      });
      el.appendChild(imgEl);
    });
  }

  function renderVideos(id, videos) {
    const el = document.getElementById(id);
    if (!el) return;
    const section = el.closest('.project-section');
    if (!Array.isArray(videos) || !videos.length) {
      if (section) section.style.display = 'none';
      return;
    }
    el.innerHTML = '';
    videos.forEach((video) => {
      if (video.embedUrl) {
        const iframe = document.createElement('iframe');
        iframe.src = video.embedUrl;
        iframe.title = video.title || 'Project video';
        iframe.allowFullscreen = true;
        el.appendChild(iframe);
      } else if (video.src) {
        const videoEl = document.createElement('video');
        videoEl.src = video.src;
        videoEl.controls = true;
        el.appendChild(videoEl);
      }
    });
  }

  function renderDownloads(id, downloads) {
    const el = document.getElementById(id);
    if (!el) return;
    const section = el.closest('.project-section');
    if (!Array.isArray(downloads) || !downloads.length) {
      if (section) section.style.display = 'none';
      return;
    }
    el.innerHTML = '';
    downloads.forEach((d) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = d.url;
      a.setAttribute('download', '');
      a.innerHTML = `<i class="fa-solid fa-file-arrow-down"></i> ${d.label || 'Download'}`;
      li.appendChild(a);
      el.appendChild(li);
    });
  }

  function renderLinks(id, links) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    if (!links) return;
    const map = [
      { key: 'github', label: 'GitHub', icon: 'fa-brands fa-github' },
      { key: 'docs', label: 'Documentation', icon: 'fa-solid fa-book' },
      { key: 'demo', label: 'Live Demo', icon: 'fa-solid fa-arrow-up-right-from-square' },
    ];
    map.forEach(({ key, label, icon }) => {
      if (links[key]) {
        const a = document.createElement('a');
        a.href = links[key];
        a.className = 'btn btn-secondary';
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML = `<i class="${icon}"></i> ${label}`;
        el.appendChild(a);
      }
    });
  }

  function renderPagination(project) {
    const all = CONFIG.projects;
    if (all.length < 2) {
      const nav = document.querySelector('.project-pagination');
      if (nav) nav.style.display = 'none';
      return;
    }
    const index = all.findIndex((p) => p.slug === project.slug);
    const prev = all[(index - 1 + all.length) % all.length];
    const next = all[(index + 1) % all.length];

    const prevEl = document.getElementById('project-prev');
    const nextEl = document.getElementById('project-next');
    if (prevEl && prev) {
      prevEl.href = `project.html?slug=${encodeURIComponent(prev.slug)}`;
      prevEl.querySelector('span').textContent = prev.title;
    }
    if (nextEl && next) {
      nextEl.href = `project.html?slug=${encodeURIComponent(next.slug)}`;
      nextEl.querySelector('span').textContent = next.title;
    }
  }

  function showNotFound() {
    const main = document.getElementById('project-main');
    if (main) {
      main.innerHTML =
        '<section class="project-section"><h2>Project not found</h2>' +
        '<p><a href="../index.html#projects">← Back to all projects</a></p></section>';
    }
  }

  function init() {
    if (typeof CONFIG === 'undefined') {
      console.warn('[portfolio] CONFIG not found — js/config.js must load before project-render.js.');
      return;
    }

    const project = findProject(getSlugFromUrl());
    if (!project) {
      showNotFound();
      return;
    }

    document.title = `${project.title} — Sibsankar Mondal`;
    const descTag = document.getElementById('project-description-tag');
    if (descTag) descTag.setAttribute('content', project.shortDescription || '');

    const coverImg = document.getElementById('project-cover-image');
    if (coverImg) {
      coverImg.src = project.coverImage || '';
      coverImg.alt = project.title || '';
    }

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || '';
    };
    setText('project-role', project.role);
    setText('project-title', project.title);
    setText('project-short-description', project.shortDescription);

    const tagsEl = document.getElementById('project-tags');
    if (tagsEl) {
      tagsEl.innerHTML = '';
      (project.tags || []).forEach((tag) => {
        const span = document.createElement('span');
        span.textContent = tag;
        tagsEl.appendChild(span);
      });
    }

    renderLinks('project-links', project.links);

    renderTextBlock('project-overview', project.overview);
    renderTextBlock('project-problem', project.problem);
    renderTextBlock('project-design-process', project.designProcess);
    renderTextBlock('project-cad-text', project.cad && project.cad.text);
    renderTextBlock('project-manufacturing-text', project.manufacturing && project.manufacturing.text);
    renderTextBlock('project-electronics-text', project.electronics && project.electronics.text);
    renderTextBlock('project-challenges', project.challenges);
    renderTextBlock('project-iterations', project.iterations);
    renderTextBlock('project-final-solution', project.finalSolution);

    renderMediaGrid('project-cad-gallery', project.cad && project.cad.images);
    renderMediaGrid('project-manufacturing-gallery', project.manufacturing && project.manufacturing.images);
    renderMediaGrid('project-electronics-gallery', project.electronics && project.electronics.images);
    renderMediaGrid('project-gallery', project.gallery);

    renderVideos('project-videos', project.videos);
    renderDownloads('project-downloads', project.downloads);
    renderPagination(project);

    // scroll-reveal + back-to-top + lightbox controls + progress bar are all
    // already wired by script.js's DOMContentLoaded handler, which runs before
    // this file (see script order in project.html). We just re-mark reveal
    // targets since this content was injected after that handler ran.
    document.querySelectorAll('.project-section').forEach((el) => el.classList.add('reveal'));
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
    document.querySelectorAll('.project-section.reveal').forEach((el) => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', init);
})();

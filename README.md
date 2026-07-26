# Sibsankar Mondal — Portfolio (v3)

A dark, technical-drawing–styled portfolio built with plain HTML, CSS and vanilla JavaScript — no frameworks, no build step, no backend. Every piece of content lives in one file, `js/config.js`, so updating the site never means touching HTML.

---

## 0. Start here — what to do, in order

1. **Get the remaining project/gallery images** — your photo and resume are already in; what's left is project covers, CAD/manufacturing/electronics shots, general gallery photos, and at least one certification.
2. **Drop them into `assets/`** (see §4) and **update the matching paths in `js/config.js`** — not `js/preview-config.js`, which is a separate, disposable file only used to preview the design before you had real photos. Delete `js/preview-config.js` and `preview.html` whenever you like; they're not part of the real site.
3. **Connect Web3Forms** (§9) so the contact form actually sends you messages — takes about 2 minutes, one key. This is the only functional (not just cosmetic) gap left.
4. **Fill in any remaining `⚠ REPLACE` blanks** in `config.js`: GitHub/Instagram links if you want them, and the estimated dates that are still estimates (METNMAT start month, achievement years) — confirm or correct those.
5. **Open `index.html` locally** and check it with your real content in place.
6. **Deploy** (§10 Vercel or §11 GitHub Pages — Vercel is the lower-friction pick for a personal site).
7. **After deploying**, swap `your-domain-here.com` for your real URL in `index.html` (canonical + `og:url`), `robots.txt`, and `sitemap.xml`.

Everything below is the reference doc for each of those steps.

---

## 1. Folder structure

```
portfolio/
├── index.html                 ← main single-page site
├── projects/
│   └── project.html           ← one reusable template for every project (driven by ?slug=)
├── css/
│   └── style.css              ← all styling + design tokens
├── js/
│   ├── config.js              ← ALL editable content lives here — edit this file, not HTML
│   ├── script.js               ← rendering engine + interactions (don't need to touch this)
│   └── project-render.js       ← populates project.html from config.js (don't need to touch this)
├── assets/
│   ├── images/
│   │   ├── hero/               ← your portrait
│   │   ├── projects/           ← project cover + gallery images
│   │   ├── gallery/             ← general gallery section
│   │   └── certificates/        ← certification images
│   └── resume/
│       └── sibsankar-mondal-resume.pdf
└── README.md                    ← this file
```

## 2. Quick start

Just open `index.html` in a browser — no server, no build, no `npm install`. Double-click it, or drag it into a browser tab.

If you want to test locally with a lightweight server (optional, but avoids some browsers' quirks with `file://` links between pages):

```bash
# from inside the portfolio/ folder
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 3. How to edit content

Open `js/config.js`. Every section of the site — hero text, about, education, experience, internship, projects, skills, achievements, certifications, gallery, social links, contact — is a field or array in that one file. Change the text, save, refresh the page. That's the whole workflow.

Look for `⚠ REPLACE` comments in the file — those mark placeholders (images I didn't have, your social URLs, EmailJS keys) that still need your real values.

---

## 4. How to replace images

1. Drop your image file into the matching folder under `assets/images/...` (e.g. your portrait goes in `assets/images/hero/`).
2. In `js/config.js`, update the relevant path to match your filename exactly, including the extension:
   ```js
   personal: {
     photo: 'assets/images/hero/portrait.jpg',   // ← change this path
   }
   ```
3. Save and refresh. No other file needs to change.

This applies the same way to project cover images, project galleries, the gallery section, and certification images — they're all just paths in `config.js`.

**Image size tip:** keep hero/cover photos under ~500KB and gallery images under ~300KB (export at ~1600px on the long edge) so the site stays fast. Any online compressor (e.g. squoosh.app) works fine.

---

## 5. How to add a new project

Open `js/config.js`, find the `projects` array, and copy one existing project object as a starting point. You need at minimum:

```js
{
  slug: 'your-project-slug',        // used in the URL: project.html?slug=your-project-slug
  title: 'Project Name',
  role: 'Your Role',
  shortDescription: 'One or two sentences for the project card.',
  tags: ['Tag One', 'Tag Two'],
  discipline: 'mechanical',         // 'mechanical' | 'electronics' | 'software' — controls card accent color
  coverImage: 'assets/images/projects/your-cover.jpg',
  links: { github: '', docs: '', demo: '' },
  overview: '...',
  problem: '...',
  designProcess: '...',
  cad: { text: '...', images: [] },
  manufacturing: { text: '...', images: [] },
  electronics: { text: '...', images: [] },
  challenges: '...',
  iterations: '...',
  finalSolution: '...',
  gallery: [],
  videos: [],       // e.g. [{ embedUrl: 'https://www.youtube.com/embed/VIDEO_ID' }]
  downloads: [],    // e.g. [{ label: 'CAD files (.zip)', url: 'assets/downloads/file.zip' }]
}
```

That's it — the project automatically appears in the Projects grid, gets its own page at `projects/project.html?slug=your-project-slug`, and shows up in the prev/next navigation on other project pages. You never create a new HTML file.

Leave any text field as an empty string (`''`) or any image/video/download array empty (`[]`) and that section simply won't render on the project page — no broken empty headers.

---

## 6. How to change your resume

1. Put your PDF in `assets/resume/`.
2. Update the path in `js/config.js`:
   ```js
   personal: {
     resumeUrl: 'assets/resume/your-filename.pdf',
   }
   ```
3. For the preview image in the Résumé section, export page 1 of your PDF as a `.jpg` or `.png`, drop it in `assets/images/`, and point `resumeThumbnail` at it.

---

## 7. How to update social links

In `js/config.js`:

```js
social: {
  linkedin: 'https://linkedin.com/in/your-handle',
  github: 'https://github.com/your-handle',
  instagram: 'https://instagram.com/your-handle',
  emailHref: 'mailto:you@example.com',
}
```

Leaving any of these blank (`''`) just means that icon's link stays inactive — nothing breaks.

---

## 8. How to change theme colors

All colors are CSS custom properties at the top of `css/style.css`, under `:root`:

```css
--color-void: #0A0B0E;     /* background */
--color-panel: #14171C;    /* card/panel base */
--color-steel: #8B93A1;    /* secondary text, borders */
--color-chalk: #F2F4F7;    /* primary text */
--color-argon: #4FD1FF;    /* electronics/software accent */
--color-copper: #E08A4B;   /* mechanical/manufacturing accent */
```

Change a hex value here and it updates everywhere that token is used across the whole site — you don't need to hunt through the CSS for individual colors.

Fonts (`--font-display`, `--font-body`, `--font-mono`) and spacing (`--space-*`) work the same way if you ever want to adjust those.

---

## 9. How to connect Web3Forms (contact form)

The contact form is wired for [Web3Forms](https://web3forms.com) — no backend, and unlike some alternatives, no template configuration either. Just one key.

1. Go to **web3forms.com** and enter the email you want messages sent to (`msibsankar305@gmail.com`).
2. You'll get an **Access Key** back instantly (check your inbox).
3. Paste it into `js/config.js`:
   ```js
   contact: {
     web3formsAccessKey: 'your-access-key-here',
   }
   ```

That's it — no service setup, no separate template with matching variable names. The form already sends `name`, `email`, `subject`, and `message` fields, which Web3Forms picks up automatically.

Until this is filled in, the form shows a friendly "not connected yet" message instead of failing silently. A hidden honeypot field (`botcheck`) is already in place for basic spam filtering — you don't need to do anything with it.

---

## 10. How to deploy on Vercel

**Option A — Dashboard (recommended):**
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo.
3. Framework Preset: **Other**. Build Command: leave blank. Output Directory: leave as root (or set to `portfolio` if that's a subfolder of your repo).
4. Deploy.

**Editing after deployment:** with this option, every push to the connected branch auto-redeploys — edit `config.js` (or anything else), commit, push, and it's live within about a minute. No extra steps.

**Option B — CLI:**
```bash
npm i -g vercel
cd portfolio
vercel
```
Follow the prompts — no configuration needed since there's no build step.

**Editing after deployment:** this option does *not* auto-redeploy on file changes — after editing, re-run `vercel --prod` from the project folder to push the update live. Option A is less to remember long-term.

## 11. How to deploy on GitHub Pages

1. Push this folder to a GitHub repository (the contents of `portfolio/` should be at the repo root, or in a `/docs` folder — either works).
2. In the repo: **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, pick your branch (e.g. `main`) and the folder (`/` or `/docs` to match step 1).
4. Save — GitHub gives you a `https://your-username.github.io/repo-name/` URL within a minute or two.

Because every internal link in this site is a relative path (`../`, `assets/...`, `projects/...`), it works the same whether it's hosted at a domain root or in a GitHub Pages subpath — no path rewriting needed either way.

**Editing after deployment:** same as Vercel Option A — GitHub Pages auto-rebuilds on every push to the configured branch. Edit, commit, push, done.

---

## 12. Maintaining the portfolio

- **New project?** Add one object to `CONFIG.projects` in `js/config.js` — see §5.
- **New certification/achievement?** Same pattern — add an object to the matching array in `config.js`.
- **Keep images compressed** as you add more — a growing gallery is the most common way a static site slows down over time.
- **Check your links occasionally** — GitHub/demo URLs in old projects have a way of rotting.
- **Resume changes?** Just swap the PDF file — no code change needed if you keep the same filename, or update the path once if you rename it.

---

## 13. Outstanding placeholders (from initial build)

These were flagged with `⚠ REPLACE` in `config.js` and still need your input:

- [x] ~~Hero photo~~ — done (`assets/images/hero/portrait.webp`), floating-cutout treatment with grounding shadow and glow
- [x] ~~Resume PDF + thumbnail~~ — done (`assets/resume/sibsankar-mondal-resume.pdf`). Note: this was rebuilt from a processed copy of your resume (image-based, not the original text PDF) — swap in your actual original PDF file if you have it, for a smaller file size and selectable text.
- [ ] All project cover/CAD/manufacturing/electronics/gallery images
- [ ] General gallery images (`gallery[]`)
- [ ] At least one real certification (`certifications[]`)
- [x] ~~Social URLs and contact email~~ — LinkedIn and email filled in from your resume. GitHub/Instagram still blank if you want them.
- [ ] Web3Forms access key (`contact.web3formsAccessKey`) — see §9
- [x] ~~Confirm club join dates~~ — corrected from your resume (May 2025 / Sep 2025)
- [ ] Confirm METNMAT start month (still estimated)
- [ ] Confirm achievement years (currently estimated)
- [ ] Review project narrative fields (overview/problem/challenges/iterations) for accuracy
- [ ] Add a real `favicon.png` to `assets/images/`
- [ ] Set your real deployed URL in place of `your-domain-here.com` — it appears in `index.html` (`<link rel="canonical">`, `og:url`), `robots.txt`, and `sitemap.xml`
- [ ] If you add projects, add a matching `<url>` entry to `sitemap.xml` (see §5)

---

## 14. Browser support

Built with standard modern CSS (custom properties, `backdrop-filter`, `IntersectionObserver`) and vanilla JS — works in current versions of Chrome, Firefox, Safari and Edge. `backdrop-filter` (the glass-panel blur) degrades gracefully to a solid panel color on older browsers that don't support it.

# minnie-landing

Marketing site for **Minnie** — a native macOS AI desktop pet that runs the coding
agent you already pay for, asks permission out loud before it touches anything, and
keeps everything on your Mac. The app itself lives in
[Pratik-Singh-web/Minnie](https://github.com/Pratik-Singh-web/Minnie).

Live: <https://pratik-singh-web.github.io/minnie-landing/>

## Stack

Astro (static output) + Tailwind, no UI framework — every interactive piece is
plain vanilla JS in the component that owns it.

```sh
npm install
npm run dev      # http://localhost:4321/minnie-landing/
npm run build    # → dist/
npm run preview  # serve dist/ locally
```

## Design system

Neo-brutalist "paper & ink": a cream paper ground, 3px ink outlines, hard offset
shadows with no blur, and four flat accents (green / yellow / pink / red). Nothing
is rounded and nothing is soft. Hover = the element slides into its own shadow.

Tokens live in [`src/styles/global.css`](src/styles/global.css) — light is the
default and dark inverts paper/ink while brightening the accents. Type is
**Outfit** (heavy uppercase display), **Karla** (body) and **Space Mono** (labels,
code, terminal). Shared primitives: `.wrap`, `.sec`, `.card`, `.btn`, `.eyebrow`,
`.h1` / `.h2`, `.slab`, `.tag`, `.marquee`.

Entrances use CSS scroll-driven animations (`animation-timeline: view()`). Where
that isn't supported the animation has no duration, so `both` pins the final
keyframe and content is simply visible — no JS fallback needed.

## Layout

```
src/
├─ layouts/Layout.astro     # head, SEO, OG, JSON-LD, theme bootstrap, analytics
├─ components/
│  ├─ Pet.astro             # Minnie's SVG — both poses inline, pick via data-pose
│  ├─ Navbar.astro          # sticky nav + scroll-progress bar + theme toggle
│  ├─ Marquee.astro         # the scrolling bands between sections
│  ├─ WaitlistForm.astro    # email capture → Google Apps Script (see below)
│  └─ Footer.astro
├─ sections/                # one file per band, in page order
└─ pages/
   ├─ index.astro           # composes the sections
   └─ privacy.astro         # privacy policy
```

Two sections carry real logic, both framework-free:

- **`Demo.astro`** — the live playground. Canned scripts keyed off what you type;
  each step is a delay, a log line, a spoken line and a mood. Steps flagged
  `consent` halt the run until you answer, mirroring the app's real consent gate.
  Note: its log rows are built in JS, so their CSS must stay in the `is:global`
  block — scoped rules never reach elements Astro didn't render.
- **`Customize.astro`** — species / personality / name previewer.

## Waitlist

Signups POST to a Google Apps Script web app that appends to a Sheet you own — no
third party, no cost. Endpoint and the honeypot check are in
[`src/components/WaitlistForm.astro`](src/components/WaitlistForm.astro); setup
steps and the `Code.gs` to paste are in [WAITLIST_SETUP.md](WAITLIST_SETUP.md).

## Deployment

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows),
which builds with Astro and publishes to GitHub Pages.

Because it's served from a project subpath, `astro.config.mjs` sets
`site: 'https://pratik-singh-web.github.io'` and `base: '/minnie-landing/'`. Always
build asset URLs from `import.meta.env.BASE_URL`. When a custom domain arrives:
point `site` at it, drop `base`, add `public/CNAME`, and update the sitemap URL in
`public/robots.txt`.

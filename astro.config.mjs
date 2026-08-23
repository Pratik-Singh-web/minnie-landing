// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Custom domain since 2026-08-23. `base` is deliberately ABSENT: on a custom
  // domain the site is served from the root, and leaving `/minnie-landing/` in
  // would prefix every asset and link with a path that no longer exists.
  // `public/CNAME` is what actually tells GitHub Pages the domain — it is copied
  // into the build output, and Pages reads it on deploy.
  site: 'https://heyminnie.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
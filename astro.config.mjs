// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Deployed on GitHub Pages as a project site → served under /<repo>/.
  // When you move to a custom domain (e.g. https://minnie.app): set `site` to it,
  // remove `base`, and add a public/CNAME file containing the domain.
  site: 'https://pratik-singh-web.github.io',
  base: '/minnie-landing/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
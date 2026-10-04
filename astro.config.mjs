// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Post dates, read straight off the Markdown so the sitemap can carry a real
// `lastmod`. Without one Google recrawls on its own guess, which on a small
// site means an edited post can sit stale for weeks.
//
// Two plain date lines are not worth a YAML parser as a build dependency, so
// this reads them with a regex — and throws if a post ever lacks a pubDate,
// rather than silently shipping a sitemap entry with no lastmod.
const postDates = Object.fromEntries(
  readdirSync('./src/content/blog')
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const src = readFileSync(`./src/content/blog/${f}`, 'utf8');
      const read = (key) => src.match(new RegExp(`^${key}:\\s*(\\S+)`, 'm'))?.[1];
      const d = read('updatedDate') ?? read('pubDate');
      if (!d) throw new Error(`sitemap: ${f} has no pubDate`);
      return [`/blog/${f.replace(/\.md$/, '')}/`, new Date(d).toISOString()];
    })
);

// Newest post date doubles as the blog index's lastmod.
const newestPost = Object.values(postDates).sort().at(-1);

// https://astro.build/config
export default defineConfig({
  // Custom domain since 2026-08-23. `base` is deliberately ABSENT: on a custom
  // domain the site is served from the root, and leaving `/minnie-landing/` in
  // would prefix every asset and link with a path that no longer exists.
  // `public/CNAME` is what actually tells GitHub Pages the domain — it is copied
  // into the build output, and Pages reads it on deploy.
  site: 'https://heyminnie.com',
  integrations: [
    sitemap({
      // 404.html is served by Pages for unknown paths; listing it in the
      // sitemap would be submitting a URL that is meant to 404.
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const lastmod = postDates[path] ?? (path === '/blog/' ? newestPost : undefined);
        return {
          ...item,
          ...(lastmod ? { lastmod } : {}),
          // The home page and the download page are what we actually want
          // ranked; the policies are there to be found, not promoted.
          priority:
            path === '/' ? 1.0
            : path === '/download/' ? 0.9
            : path.startsWith('/blog/') ? 0.7
            : 0.4,
          changefreq:
            path === '/' || path === '/blog/' ? 'weekly' : 'monthly',
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});

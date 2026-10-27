import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">["data"];

// A post goes live when it isn't a draft AND its pubDate has arrived. pubDate
// "2026-10-31" parses as midnight UTC (05:30 in India), and the daily scheduled
// deploy in .github/workflows/deploy.yml rebuilds just after that, so a post
// written ahead of time publishes itself on its date. Keep `draft: true` for
// posts that aren't finished; a future pubDate alone is enough to hold one back.
export const isLive = (data: Post) => !data.draft && data.pubDate.getTime() <= Date.now();

// `astro dev` shows everything, drafts and future posts included, so you can
// preview a post before its date.
export const isVisible = (data: Post) => import.meta.env.DEV || isLive(data);

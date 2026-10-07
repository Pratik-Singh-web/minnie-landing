import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgCard } from "../../og";
import { tagSlug } from "../../site";

/* One card per post, plus one for the blog index and one per topic hub.
 *
 * These live under /og/ rather than beside the post at /blog/<slug>/og.png
 * because src/pages/blog/[...slug].astro is a rest route: it matches
 * `anything/og.png` too, and relying on Astro's route-priority rules to break
 * that tie is a bet with no upside. A separate tree cannot collide.
 *
 * Hub cards are prefixed `tag-` so they share this one route without colliding
 * with a post slug. A post literally named `tag-something` would clash; none
 * is, and the build would fail loudly on a duplicate path if one ever were.
 */
export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  // Mirrors the MIN_POSTS rule in blog/tags/[tag].astro: a hub only exists
  // once a tag has two posts, so only those need a card.
  const tagCount = new Map<string, number>();
  for (const post of posts)
    for (const t of post.data.tags) tagCount.set(t, (tagCount.get(t) ?? 0) + 1);

  const hubs = [...tagCount.entries()]
    .filter(([, n]) => n >= 2)
    .map(([label, n]) => ({
      params: { slug: `tag-${tagSlug(label)}` },
      props: {
        title: label.replace(/\b[a-z]/g, (c) => c.toUpperCase()),
        eyebrow: "Guides",
        footnote: `${n} posts`,
      },
    }));

  return [
    // The two cards that get shared most. The home page previously used a
    // hand-made og-image.png from the site's PREVIOUS design system — pink and
    // black, built around the paw icon, with copy that no longer matches the
    // page ("your agent, now with legs"). The site is warm coral and peach with
    // Minnie herself, so the most-shared link on the site was advertising a
    // design that no longer exists.
    {
      params: { slug: "home" },
      props: {
        title: "Give your AI agent a body.",
        eyebrow: "Free for Mac · macOS 14+",
        subtitle:
          "A desktop pet that runs the coding agent you already pay for. Talk to her, watch her work, and say yes before she touches anything.",
        bubble: "\u201CI want to run pytest. Ok?\u201D",
        worksWith: ["Claude Code", "Gemini CLI", "Codex"],
      },
    },
    {
      params: { slug: "download" },
      props: {
        title: "Download Minnie for Mac",
        eyebrow: "Free · open beta",
        subtitle: "No trial, no subscription, no card. Bring the coding agent you already pay for.",
        chips: ["Apple Silicon", "macOS 14+", "~148 MB"],
      },
    },
    {
      params: { slug: "blog" },
      props: {
        title: "Running an AI coding agent on your Mac",
        eyebrow: "The Minnie blog",
        footnote: `${posts.length} guides`,
      },
    },
    ...hubs,
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: {
        title: post.data.title,
        eyebrow: post.data.tags[0] ?? "guide",
        footnote: fmt(post.data.updatedDate ?? post.data.pubDate),
      },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgCard(props as Parameters<typeof renderOgCard>[0]);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  });
};

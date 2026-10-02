import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Hand-rolled RSS 2.0 so the site needs no extra dependency. Linked from every
// page's <head> (Layout.astro), which is how readers and aggregators find it.
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const GET: APIRoute = async ({ site }) => {
  const base = new URL(import.meta.env.BASE_URL, site ?? "https://heyminnie.com/");
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
  const items = posts
    .map((p) => {
      const url = new URL(`blog/${p.id}/`, base).href;
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.data.description)}</description>
      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>
${p.data.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Minnie blog</title>
    <link>${new URL("blog/", base).href}</link>
    <atom:link href="${new URL("rss.xml", base).href}" rel="self" type="application/rss+xml" />
    <description>Notes on running an AI coding agent on your Mac: voice, permissions, MCP and building a desktop pet.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};

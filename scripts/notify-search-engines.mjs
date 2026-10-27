// Tells search engines about posts that just went live. Runs in the deploy
// workflow after GitHub Pages has published, so every URL it sends resolves.
//
// - IndexNow (Bing, Yandex, Seznam, Naver): sends the URLs directly. The key
//   file in public/ proves we own the host.
// - Google: has no equivalent for blog posts. Its Indexing API is limited to
//   job postings and livestreams, so using it here would break its terms. The
//   supported nudge is resubmitting the sitemap through the Search Console API,
//   which this does when the GSC_SERVICE_ACCOUNT secret is set.
//
// Usage: node scripts/notify-search-engines.mjs [--dry-run]

import { readdirSync } from "node:fs";
import { createSign } from "node:crypto";

const SITE = "https://heyminnie.com";
const SITEMAP_INDEX = `${SITE}/sitemap-index.xml`;
const GSC_PROPERTY = "sc-domain:heyminnie.com";
// Posts whose lastmod falls in this window count as new. Two days covers a
// scheduled run that GitHub started late or skipped.
const WINDOW_MS = 2 * 24 * 60 * 60 * 1000;
const dryRun = process.argv.includes("--dry-run");

const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("No IndexNow key file (32 hex chars + .txt) in public/");
const key = keyFile.replace(/\.txt$/, "");

async function recentUrls() {
  const xml = await (await fetch(`${SITE}/sitemap-0.xml`)).text();
  const now = Date.now();
  const urls = [];
  for (const [, block] of xml.matchAll(/<url>(.*?)<\/url>/gs)) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
    if (!loc || !lastmod) continue;
    const t = Date.parse(lastmod);
    if (t <= now && now - t <= WINDOW_MS) urls.push(loc);
  }
  return urls;
}

async function indexNow(urls) {
  const body = { host: new URL(SITE).host, key, keyLocation: `${SITE}/${keyFile}`, urlList: urls };
  if (dryRun) return console.log("IndexNow (dry run):", JSON.stringify(body));
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200 = accepted, 202 = accepted while the key is still being verified.
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow returned ${res.status}: ${await res.text()}`);
  }
  console.log(`IndexNow: sent ${urls.length} URL(s), status ${res.status}`);
}

// Service-account OAuth without a Google client library: sign a JWT with the
// account's private key and trade it for an access token.
async function googleToken(sa) {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const iat = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters",
    aud: "https://oauth2.googleapis.com/token",
    iat,
    exp: iat + 3600,
  })}`;
  const sig = createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${sig}`,
    }),
  });
  if (!res.ok) throw new Error(`Google token request failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function resubmitSitemap() {
  const raw = process.env.GSC_SERVICE_ACCOUNT;
  if (!raw) {
    return console.log("Google: skipped, GSC_SERVICE_ACCOUNT secret not set");
  }
  if (dryRun) return console.log(`Google (dry run): would resubmit ${SITEMAP_INDEX}`);
  const token = await googleToken(JSON.parse(raw));
  const url =
    "https://www.googleapis.com/webmasters/v3/sites/" +
    `${encodeURIComponent(GSC_PROPERTY)}/sitemaps/${encodeURIComponent(SITEMAP_INDEX)}`;
  const res = await fetch(url, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Search Console sitemap submit failed: ${res.status} ${await res.text()}`);
  console.log(`Google: resubmitted ${SITEMAP_INDEX}`);
}

const urls = await recentUrls();
if (urls.length === 0) {
  console.log("No posts went live or changed in the last 2 days; nothing to send.");
} else {
  console.log("New or updated:\n  " + urls.join("\n  "));
  await indexNow(urls);
  await resubmitSitemap();
}

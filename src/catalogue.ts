// What is on sale, read from the ONE place a price lives (C6b).
//
// The site must never hardcode a figure — that is the whole point of
// `character_products` + `/catalogue`. `Pricing.astro` renders whatever this
// returns and nothing when it returns nothing.
//
// ⚠️ THIS IS A BUILD-TIME FETCH, so the site is as current as its last deploy.
// A price changed in the database reaches the APP within a minute and reaches
// THIS page only when the site is rebuilt (any push, or re-running the Pages
// workflow). That is a real limitation and it is written down rather than
// discovered: change a price, then redeploy the site.
//
// 🔴 Every failure path returns an EMPTY list, never a placeholder. A build that
// cannot reach the catalogue must ship a page with no prices on it — not a page
// with a guess on it. A wrong price on a public page is worse than no price, and
// an unreachable endpoint must never be able to break the build either.

const ENDPOINT = "https://wytvopdirhaszdeqdtau.supabase.co/functions/v1/catalogue";

export type CatalogueItem = {
  id: string;
  product_id: string;
  name: string;
  blurb: string | null;
  /** null means "exists, not priced yet". NEVER render it as 0. */
  price_cents: number | null;
  currency: string;
};

/** Formatted price, or null when there is no honest answer. */
export function priceText(item: CatalogueItem): string | null {
  if (item.price_cents == null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: item.currency,
    maximumFractionDigits: item.price_cents % 100 === 0 ? 0 : 2,
  }).format(item.price_cents / 100);
}

export async function fetchCatalogue(): Promise<CatalogueItem[]> {
  try {
    const r = await fetch(ENDPOINT, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) return [];
    const d = await r.json();
    return Array.isArray(d?.characters) ? (d.characters as CatalogueItem[]) : [];
  } catch {
    // Silent and empty on purpose — see the header.
    return [];
  }
}

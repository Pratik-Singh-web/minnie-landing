// Shared constants for the legal pages (privacy, terms, refund, support).
//
// ⚠️ FILL THESE BEFORE SUBMITTING DODO'S PRODUCT VERIFICATION FORM.
// Dodo checks that the site's stated details match what you told them, so a
// placeholder here is a rejection — and the appeal is one-shot.
//
// Filled 2026-08-23. If any of these change, they change in ONE place and all
// four pages follow — which is the only reason this file exists.

/** The legal name the Dodo account is verified under. Appears on all four pages. */
export const legalName = "Anita Singh";

/**
 * Country whose law governs the terms and whose courts hear disputes.
 */
export const jurisdiction = "India";

/**
 * ⚠️ This address must actually RECEIVE before the PVF is submitted. Dodo's
 * verification checklist asks for a "monitored support address", and a reviewer
 * who emails a bouncing address is worse than one who emails a Gmail. It is
 * served by Cloudflare Email Routing (free), forwarding to Pratik's inbox.
 */
export const contactEmail = "support@heyminnie.com";

/** Kept in one place so all four pages carry the same date. */
export const updated = "23 August 2026";

/** Price shown on the pricing section, repeated in terms + refund. */
export const price = "$29 per year";

/** How long after purchase a refund is unconditional. */
export const refundDays = 30;

/** Macs one licence may run on at once — matches the licence key's activation limit. */
export const deviceLimit = 3;

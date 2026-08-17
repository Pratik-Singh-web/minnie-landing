// Shared constants for the legal pages (privacy, terms, refund, support).
//
// ⚠️ FILL THESE BEFORE SUBMITTING DODO'S PRODUCT VERIFICATION FORM.
// Dodo checks that the site's stated details match what you told them, so a
// placeholder here is a rejection — and the appeal is one-shot.
//
// Everything marked TODO is a value nobody but Pratik can supply.

/** TODO: the real legal name the Dodo account is verified under. */
export const legalName = "TODO — the name on the Dodo account";

/**
 * TODO: country/state whose law governs the terms, and whose courts hear
 * disputes. Normally where `legalName` actually lives.
 */
export const jurisdiction = "TODO — e.g. India";

/**
 * TODO: swap for support@<domain> once the domain exists.
 * A personal Gmail is legal but reads as a hobby project to a compliance
 * reviewer and to anyone about to type in a card.
 */
export const contactEmail = "pratiksingh30701@gmail.com";

/** Kept in one place so all four pages carry the same date. */
export const updated = "17 August 2026";

/** Price shown on the pricing section, repeated in terms + refund. */
export const price = "$29 per year";

/** How long after purchase a refund is unconditional. */
export const refundDays = 30;

/** Macs one licence may run on at once — matches the licence key's activation limit. */
export const deviceLimit = 3;

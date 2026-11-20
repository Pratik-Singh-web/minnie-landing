// Count one click on a Download button (Minnie repo, docs/ACTIVATION_PLAN.md W1-1),
// and the install-card taps that follow it (W4).
//
// GitHub's download count also includes the app's self-updater and bots, so it
// can't say how many PEOPLE downloaded Minnie. This posts one row to the
// `downloads` table instead: the version, which button, the referring host and a
// rough chip guess. No cookie, no id, nothing that identifies a person (see /privacy).
//
// Fire-and-forget, and never awaited: if Supabase is down, the download still
// starts. A counter must never be able to cost us a user.

import type { Arch } from "./chip";

const endpoint = "https://wytvopdirhaszdeqdtau.supabase.co/functions/v1/download";

function post(payload: Record<string, string>) {
  try {
    const body = JSON.stringify(payload);
    // sendBeacon posts text/plain, so there is no CORS preflight, and it survives
    // the navigation that follows. Older browsers fall back to a keepalive fetch.
    if (!(navigator.sendBeacon && navigator.sendBeacon(endpoint, body))) {
      fetch(endpoint, { method: "POST", body, keepalive: true, mode: "no-cors" }).catch(() => {});
    }
  } catch {}
}

export function countDownload(version: string, src: string, arch?: Arch) {
  let ref = "";
  try { ref = document.referrer ? new URL(document.referrer).hostname : ""; } catch {}
  post({ version, src, ref, ...(arch ? { arch } : {}) });
}

/** What happened after the click (W4). Totals only: nothing ties two signals, or a
 *  signal and a click, together. Each name is sent at most once per page view. */
export type Signal = "copy_install" | "still_blocked_open" | "cant_open" | "intel_warned";
const sent = new Set<string>();

export function sendSignal(version: string, signal: Signal, value?: string) {
  if (sent.has(signal)) return;
  sent.add(signal);
  post({ version, signal, ...(value ? { value } : {}) });
}

// Count one click on a Download button (Minnie repo, docs/ACTIVATION_PLAN.md W1-1).
//
// GitHub's download count also includes the app's self-updater and bots, so it
// can't say how many PEOPLE downloaded Minnie. This posts one row to the
// `downloads` table instead: the version, which button, and the referring host.
// No cookie, no id, nothing that identifies a person (see /privacy).
//
// Fire-and-forget, and never awaited: if Supabase is down, the download still
// starts. A counter must never be able to cost us a user.

const endpoint = "https://wytvopdirhaszdeqdtau.supabase.co/functions/v1/download";

export function countDownload(version: string, src: string) {
  try {
    let ref = "";
    try { ref = document.referrer ? new URL(document.referrer).hostname : ""; } catch {}
    const body = JSON.stringify({ version, src, ref });
    // sendBeacon posts text/plain, so there is no CORS preflight, and it survives
    // the navigation that follows. Older browsers fall back to a keepalive fetch.
    if (!(navigator.sendBeacon && navigator.sendBeacon(endpoint, body))) {
      fetch(endpoint, { method: "POST", body, keepalive: true, mode: "no-cors" }).catch(() => {});
    }
  } catch {}
}

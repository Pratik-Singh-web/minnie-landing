# Waitlist → Google Sheet (3-minute setup)

Signups from the site save **straight into a Google Sheet you own** — no third-party
service, no cost, no data leaving your control. It works on a static host (GitHub
Pages) because a Google **Apps Script Web App** does the writing.

## Steps

1. **Create the Sheet** you want emails in (e.g. "Minnie Waitlist"). Open it.
2. **Extensions ▸ Apps Script**. Delete the boilerplate `function myFunction() {}`.
3. Paste the entire **`Code.gs`** below. Click **Save** (💾).
4. **Deploy ▸ New deployment**. Click the gear ⚙ ▸ **Web app**.
   - **Description:** `Minnie waitlist`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
   - **Deploy** → **Authorize access** → pick your account → *Advanced ▸ Go to
     project (unsafe)* → **Allow**. (It's your own script; the warning is standard.)
5. Copy the **Web app URL** (ends in `/exec`).
6. Open **`src/components/WaitlistForm.astro`** and replace `WAITLIST_ENDPOINT`
   with that URL.
7. Reload the site and submit the form → a row appears in your Sheet. 🎉

> **After editing the script later**, redeploy as a **new version**:
> Deploy ▸ Manage deployments ▸ ✏️ edit ▸ Version: **New version** ▸ Deploy.
> (Otherwise the old code keeps running.)

## Code.gs

```javascript
// Minnie waitlist → this Google Sheet. Bound script — created from inside the
// Sheet (Extensions ▸ Apps Script). Deploy as a Web app (Execute as: Me,
// Who has access: Anyone). It appends one row per signup and skips duplicates.

function doPost(e) {
  try {
    var email = ((e && e.parameter && e.parameter.email) || '').trim();
    if (!email) return json({ result: 'error', message: 'missing email' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Waitlist') || ss.insertSheet('Waitlist');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source']);
    }

    // Skip if this email is already in column B.
    var last = sheet.getLastRow();
    var existing = last > 1
      ? sheet.getRange(2, 2, last - 1, 1).getValues().map(function (r) { return r[0]; })
      : [];
    if (existing.indexOf(email) === -1) {
      sheet.appendRow([new Date(), email, (e.parameter.source || '')]);
    }

    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', message: String(err) });
  }
}

function doGet() {
  return json({ result: 'ok' }); // lets you open the /exec URL to sanity-check
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Notes

- The form posts `email` + `source` (`hero` or `final-cta`) as form-encoded data,
  which avoids CORS preflight — the reliable pattern for Apps Script from a browser.
- Want an email notification per signup? Add inside `doPost`, after `appendRow`:
  `MailApp.sendEmail('you@example.com', 'New Minnie signup', email);`
- **Prefer a hosted dashboard instead?** Swap the endpoint for a
  [Formspree](https://formspree.io) form URL — the form code already sends a plain
  `email` field, so it works with no other changes.

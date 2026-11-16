---
title: "Codex \"401 Unauthorized: Incorrect API key provided: sk-svcac\", fixed"
description: "Codex says your API key is incorrect, but it's a key you never made. When it's an OpenAI outage you should wait out, and when signing in again fixes it."
pubDate: 2026-11-22
tags: ["codex", "errors"]
hero:
  motif: terminal
  lines: ["unexpected status 401 Unauthorized:", "Incorrect API key provided:", "sk-svcac***"]
  pose: stand
---

Codex was working, and now every message fails with something like:

```text
unexpected status 401 Unauthorized: Incorrect API key provided: sk-svcac***…
url: https://chatgpt.com/backend-api/codex/responses
```

Or, during a long session:

```text
Error running remote compact task: unexpected status 401 Unauthorized …
Compaction interrupted
```

The odd part is the key. You sign in with ChatGPT, you never made an
`sk-svcac` key, and Codex says it's wrong.

**Short answer:** if the URL in the error is `chatgpt.com` and the key
starts with `sk-svcac`, it isn't your key and it isn't your setup. Check
OpenAI's status page and wait. Don't delete your Codex settings.

Checked against the GitHub issues in November 2026.

## Read the error before you fix anything

Two details tell you which problem you have:

| In the error | What it means |
|---|---|
| `url: https://chatgpt.com/...` and `sk-svcac…` | OpenAI's own service key was refused. Their side. |
| `url: https://api.openai.com/...` | Codex is using an API key. Could be yours. |

`sk-svcac` is the start of a *service account* key. When you sign in with
ChatGPT, Codex talks to OpenAI's servers on your behalf, and the key in the
message belongs to that service, not to you.

## Case 1: chatgpt.com and sk-svcac, wait it out

This error hit Codex CLI 0.158.0, the desktop app and the VS Code extension
from **25 September 2026**. In [openai/codex issue
#48237](https://github.com/openai/codex/issues/48237), with over 100
reactions, an OpenAI team member called it a widespread outage and later
wrote that it had been mitigated.

So when it appears:

1. Check [status.openai.com](https://status.openai.com).
2. Wait, and retry in a while.

What not to do: delete `~/.codex`, reinstall, or create a new API key.
None of that touches a key on OpenAI's side, and deleting `~/.codex` throws
away your settings and sign-in for nothing.

The issue is still open as we write. Some users report it keeps happening
for them after the outage ended, but nobody has confirmed why, so we can't
give you a tested fix for that case. If it lasts more than a few hours
while status shows everything working, try case 2's steps, then add your
details to the issue.

## Case 2: signing in again

If the error points at `api.openai.com`, or the outage is clearly over and
yours isn't, the sign-in Codex has stored may be stale. Sign out and in:

```bash
codex logout
codex login
codex login status
```

The last command shows how you're signed in. If it says you're using an
API key and you meant to use ChatGPT, or the other way round, that mix-up
is the problem. If you deliberately use an API key, check that it's
active in your OpenAI account and that `OPENAI_API_KEY` in your shell
isn't an old one:

```bash
echo ${OPENAI_API_KEY:0:8}
```

That prints only the first few characters, enough to recognise the key
without putting the whole thing on screen.

If the `codex` command itself is the problem, see [Install Codex CLI on a
Mac](/blog/install-codex-cli-mac/). For the Codex app's other big recent
error, see [Codex app "Cannot serialize
value"](/blog/codex-cannot-serialize-value/).

[Minnie](/download/), our desktop pet, runs Codex, Claude Code or Gemini
CLI, so when one is down you can ask another.

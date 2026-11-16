---
title: "Gemini CLI \"Untrusted Command Flags Detected\" warning, fixed"
description: "Gemini CLI asks you to approve ls -la with a CRITICAL SECURITY WARNING, even in YOLO mode. Why it's a false alarm, the update that fixes it, and the rollback."
pubDate: 2026-11-18
tags: ["gemini cli", "errors"]
hero:
  motif: terminal
  lines: ["CRITICAL SECURITY WARNING:", "Untrusted Command Flags Detected"]
  pose: stand
---

Gemini CLI wants to run something ordinary, like `ls -la` or `git diff`,
and instead of running it, stops you with:

```text
⚠️ CRITICAL SECURITY WARNING: Untrusted Command Flags Detected
The following flags/arguments were sourced from external untrusted input…
```

It asks for approval every time, even when you started Gemini CLI with
`--yolo`, which is supposed to mean no confirmations.

**Quick fix:** update Gemini CLI. If it still happens, roll back to 0.62
until it's sorted.

Here's what's going on, checked against Gemini CLI's GitHub issues and
pull requests in November 2026.

## What the warning is for

The warning comes from a real safety feature, added in
[PR #29250](https://github.com/google-gemini/gemini-cli/pull/29250). It
guards against **prompt injection**: a web page or file that tries to
smuggle command flags into what the agent runs. If a flag in a command
came from untrusted text Gemini read, it stops and asks you. That part is
sensible.

## Why it fires on harmless commands

[Issue #29579](https://github.com/google-gemini/gemini-cli/issues/29579)
traced the false alarms. The check collected words from **every** block of
untrusted content in the session, and the output of Gemini's own shell
commands counted as untrusted. So once any command had printed `-la` or
`--stat`, the next command using that flag looked like it was
copying untrusted input.

The result: ordinary flags trip a "critical" warning, and YOLO mode stops
being hands-off. It started in 0.61.0 (preview) and 0.63.0, and users
were still reporting it on 0.65.0 and 0.67.0-preview.

## Fix 1: update

The fix, [PR #29833](https://github.com/google-gemini/gemini-cli/pull/29833),
*scope untrusted flag checks to external output and remember approved
flags*, was merged on 21 October 2026. It checks only text from outside
sources, and remembers flags you've already approved. Releases since
then include it. The latest stable when we checked was 0.68.0, from 10
November.

If you installed with npm:

```bash
npm install -g @google/gemini-cli@latest
gemini --version
```

If you installed with Homebrew, `brew upgrade gemini-cli`.

One caution: [issue #30004](https://github.com/google-gemini/gemini-cli/issues/30004),
still open, reports that YOLO mode still breaks on paths in the project's
temp folder. So the update may not fix every case.

## Fix 2: roll back to 0.62

If you still hit it after updating and it's blocking your work, users in
[issue #29682](https://github.com/google-gemini/gemini-cli/issues/29682)
report that 0.62 works:

```bash
npm install -g @google/gemini-cli@0.62
```

Then turn off auto-update in `/settings`, or Gemini CLI will update itself
back. Remember to turn it on again once a fixed release lands, because
you'll also miss security fixes while it's off.

## What not to do

One user patched Gemini CLI's code to switch the check off entirely. Don't.
The warning exists because prompt injection is real: a coding agent that
reads web pages and files can be tricked into running something you'd
never approve. A rollback keeps you on a released version. A patch keeps
you on one nobody else runs.

When the warning appears and you're not sure, read the flags it lists. If
they're ones you'd type yourself (`-la`, `--stat`, `-n`), approving is fine.
If you see a URL, a `curl`, or a path you don't recognise, say no.

## Still on Gemini CLI?

If you're weighing a move, [Gemini CLI stopped working? Moving to
Antigravity on Mac](/blog/gemini-cli-to-antigravity-cli-mac/) covers it.
[Minnie](/download/), our desktop pet, runs Gemini CLI, Claude Code or
Codex for you and talks you through approvals out loud.

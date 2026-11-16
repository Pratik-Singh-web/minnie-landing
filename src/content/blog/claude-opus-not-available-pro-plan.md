---
title: "\"Claude Opus is not available with the Claude Pro plan\", fixed"
description: "Claude Code says Opus isn't on your plan, even after you upgraded? Your sign-in still carries the old plan. The two-command fix, and how to pick another model."
pubDate: 2026-11-20
tags: ["claude code", "errors"]
hero:
  motif: terminal
  lines: ["Claude Opus is not available", "with the Claude Pro plan"]
  pose: stand
---

You pick Opus in Claude Code, or a session starts on it, and you get:

```text
Claude Opus is not available with the Claude Pro plan. If you have updated
your subscription plan recently, run /logout and /login for the plan to
take effect.
```

In the Claude desktop app the message ends with *sign out and sign in
again* instead.

There are two different situations behind it, with different fixes.
Checked against [Anthropic's errors
page](https://code.claude.com/docs/en/errors.md) in November 2026.

## If you just upgraded: sign out and in

This is the case that confuses people. You've paid for a higher plan, the
Claude website shows it, and Claude Code still says no.

The reason is in the docs: the stored sign-in *reflects your plan at the
time you signed in*. Claude Code doesn't check your subscription again on
every request. Until you sign in again, it still believes you're on the
old plan.

Inside Claude Code, run:

```text
/logout
```

then:

```text
/login
```

and finish the sign-in in your browser. Make sure you sign in with the
same account you upgraded. If you have a personal and a work account,
this is an easy place to mix them up. Run `/status` afterwards to see
which account and plan Claude Code is using.

If `/login` itself fails before the browser opens, see [Claude Code
"Couldn't start the local listener"](/blog/claude-code-local-listener-sign-in/).
If it keeps asking for your Mac password, see [Claude Code and the Mac
keychain](/blog/claude-code-keychain-mac/).

## If you haven't upgraded: pick another model

Then the message is accurate: your plan doesn't include that model in
Claude Code. Switch to one it does:

```text
/model
```

and choose from the list. Which models each plan includes changes from
time to time, so check [Anthropic's pricing page](https://claude.com/pricing)
for the current list rather than trusting an old forum answer, including
this one.

If a session keeps starting on Opus, look for a model set somewhere that
outlives the session:

- a `model` line in `~/.claude/settings.json` or the project's
  `.claude/settings.json`
- the `ANTHROPIC_MODEL` environment variable in your shell config
- a `--model` flag in an alias or script that starts Claude Code

Remove it or change it to a model your plan includes.

## Still seeing it after signing in again?

Quit Claude Code completely, including any other terminal windows running
it, then start it fresh. If you use it inside an editor, quit the editor
too. Each running copy holds its own sign-in until it restarts.

[Minnie](/download/), our desktop pet, runs Claude Code on the plan you
already have, so there's no second subscription to keep in sync.

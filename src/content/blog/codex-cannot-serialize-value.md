---
title: "Codex app \"Cannot serialize value (couldn't stringify value)\", fixed"
description: "Error starting chat in the Codex app? It hits new Worktree chats in version 26.1016.51333. The update that fixed it, and two workarounds if you can't update."
pubDate: 2026-11-08
tags: ["codex", "errors"]
hero:
  motif: terminal
  lines: ["Error starting chat", "Cannot serialize value:", "(couldn't stringify value)"]
  pose: stand
---

You open the Codex app, start a new chat, type your first message, and get:

```text
Error starting chat
Cannot serialize value: (couldn't stringify value)
```

Restarting doesn't help. Reinstalling doesn't help. Even a one-word
message fails.

**Quick fix:** update the Codex app. If you can't yet, switch the new chat
from **Worktree** to **Local** and it will send.

Everything below comes from [openai/codex issue
#55744](https://github.com/openai/codex/issues/55744) and its two
duplicates for Linux and Windows. No one from OpenAI has commented on
them, so treat these as fixes many users confirmed, not as an official
statement. Checked in November 2026.

## When it happens

The error showed up after the **21 October 2026** update to Codex desktop
**26.1016.51333**, on macOS, Windows and Linux. It hits one case:

- a **new** chat,
- with **Worktree** (*New worktree*) selected,
- on its **first** message.

Local chats work. Existing chats work. Attachments have nothing to do with
it: plain text fails the same way.

If you open the app's logs, the failing line looks like this:

```text
[Composer] submit failed errorName=TypeError
errorMessage="Cannot serialize value: (couldn't stringify value)" mode=worktree
```

`mode=worktree` is the giveaway. If your log says `mode=local`, you have a
different problem.

## The fix: update the app

According to users in the issue, the next builds fixed it:

| Platform | Fixed in |
|---|---|
| macOS | 26.1016.61520 |
| Windows | 26.1016.62342 (22 October 2026) |

Four users confirmed the macOS build fixed it, including the person who
opened the issue, who then closed it. One user confirmed the Windows build.
OpenAI's [changelog](https://developers.openai.com/codex/changelog) doesn't
mention the bug or these version numbers, so this rests on those reports.

To check your version on a Mac, open the **Codex** menu and choose **About
Codex**. Anything from 61520 on should be fine.

## If you can't update yet

### Workaround 1: start the chat in Local mode

Switch the new chat from Worktree to **Local** before you send. This was
the most-confirmed workaround in the thread, by around ten people. The
catch is that Codex now works in your main checkout, not an isolated copy.

### Workaround 2: start Local, then ask for a worktree

If you need the isolation, start a Local chat and ask Codex to create a
managed worktree for the task using the app's own worktree tool. About
seven users said this worked end to end. It's one extra message, and you
end up in the same place as a Worktree chat.

## What doesn't work

Users tried these and they didn't help, so you can skip them:

- quitting and reopening the app, including Cmd+Q
- reinstalling from the website
- picking the branch again
- plain-text mode

## Why it breaks (users' analysis)

Two users traced it with a debugger. Starting a Worktree chat sends your
first message to the part of the app that creates the worktree, and the
message carries some formatting data from the text editor in a form that
can't be converted for sending. So the send fails before the worktree is
made. OpenAI hasn't confirmed this, but it fits every report: only
Worktree, only the first message, and the content doesn't matter.

If you use worktrees outside the Codex app too, [Claude Code and git
worktrees](/blog/claude-code-worktrees/) explains how they
work. For Codex on the command line instead of the app, see [Install Codex
CLI on a Mac](/blog/install-codex-cli-mac/).

[Minnie](/download/), our desktop pet, runs Codex, Claude Code or Gemini
CLI for you, so you can just ask for the task out loud.

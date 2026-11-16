---
title: "Claude Code \"API Error: 400 due to tool use concurrency issues\", fixed"
description: "Run /rewind to recover the conversation, it says, and sometimes that isn't enough. What the 400 means, why updating comes first, and when to start fresh."
pubDate: 2026-11-16
tags: ["claude code", "errors"]
hero:
  motif: terminal
  lines: ["API Error: 400 due to tool use", "concurrency issues. Run /rewind", "to recover the conversation."]
  pose: stand
---

Claude is halfway through a task, running a few tools at once, and then:

```text
API Error: 400 due to tool use concurrency issues. Run /rewind to recover
the conversation.
```

Sometimes it's worded differently, with the same cause:

```text
orphaned tool_result in conversation history
duplicate tool_use ID in conversation history
```

**Quick fix:** run `claude update`, restart Claude Code, then run
`/rewind` and pick a point before the turn that failed.

The order matters, and that's the part most guides leave out. Here's why,
checked against [Anthropic's errors
page](https://code.claude.com/docs/en/errors.md) in November 2026.

## What the error means

Every time Claude uses a tool, the conversation records two matching
pieces: the request (`tool_use`) and the answer (`tool_result`). Claude's
thinking blocks sit alongside them. The API checks that these line up
before it accepts the next message.

The error means they don't any more. In Anthropic's words, the sequence
of tool use, tool result and thinking blocks in the history *no longer
matches what the API expects*. Something left a result without its
request, or recorded the same request twice. That happens most easily
when Claude runs several tools in parallel and one of them is interrupted
or fails, which is where "concurrency" in the message comes from.

Nothing is wrong with your code or your Mac. The conversation's own record
is damaged, and the API refuses every message after that point.

## Fix 1: update first

Anthropic's docs carry a note that explains most of the "/rewind didn't
work" complaints: on Opus 4.7 or 4.8, **Claude Code versions before
2.1.156 can trigger this error during normal tool use, and `/rewind`
doesn't clear it there.** On those versions you can rewind as often as you
like and hit it again.

So update before anything else:

```bash
claude update
claude --version
```

Then quit and start Claude Code again so the new version is the one
running.

## Fix 2: /rewind

`/rewind` takes the conversation back to a checkpoint, dropping the
damaged part. Run it, or press **Esc twice**, and pick a point before the
turn that failed. Then ask for the step again.

You lose the work from the turns you rewind past in the conversation, so
pick the latest point before the error rather than going far back.

## Fix 3: start a new session

If the error keeps coming back in the same conversation, people on
GitHub describe the session as "poisoned": once it happens, even single
tool calls fail. Their fix is a new session. That's a user report, not
from Anthropic's docs, but it's cheap to try:

```bash
claude
```

Before you leave the old session, ask Claude, if it still answers, to
summarise what it was doing. Paste that into the new one so you don't
start from zero. Files Claude already changed stay changed. Only the
conversation is lost.

## Where it shows up most

From the large GitHub threads ([#8763](https://github.com/anthropics/claude-code/issues/8763),
with 277 reactions, and
[#20571](https://github.com/anthropics/claude-code/issues/20571)), users
saw it most often:

- in the VS Code extension, and over Remote SSH
- in long sessions with lots of parallel tool calls
- with third-party models run through Claude Code, which can produce tool
  calls in a shape the history check doesn't expect

Those threads are from 2025 and early 2026 and are now closed. We found no
recent reports on current models, so if you're up to date it should be
rare. If it still happens on the latest version, run `/feedback` so
Anthropic gets the details.

## Related errors

If Claude stops mid-reply instead, see ["Stream idle timeout" in Claude
Code](/blog/claude-code-stream-idle-timeout/). If it refuses commands in
auto mode, see [auto mode classifier gave no
verdict](/blog/claude-code-auto-mode-no-verdict/).

[Minnie](/download/), our desktop pet, runs Claude Code for you and shows
at a glance when it's stuck, so a broken session doesn't sit there
unnoticed.

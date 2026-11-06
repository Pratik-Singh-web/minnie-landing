---
title: "Claude Code \"auto mode classifier gave no verdict\", fixed"
description: "Auto mode cannot determine the safety of Bash, and Claude stops after 10 tries. What the no-verdict error means, and the fixes in the order to try them."
pubDate: 2026-11-10
tags: ["claude code", "errors"]
hero:
  motif: terminal
  lines: ["$ claude", "auto mode classifier gave", "no verdict (timed out)"]
  pose: stand
---

You're in auto mode, Claude goes to run something as harmless as `pwd`, and
instead you get:

```text
The server-side auto mode classifier gave no verdict (timed out), so auto
mode cannot determine the safety of Bash.
```

Keep going and it can turn into this:

```text
Auto mode is unavailable — the server returned no safety verdict for the
last 10 responses, so Claude stopped. Send a message to try again, or
switch out of auto mode.
```

**Quick fix:** send another message to retry. If it keeps happening,
switch out of auto mode with Shift+Tab and approve commands yourself until
it clears.

Nothing is wrong with your command or your Mac. Here's what the error
means and what else to try, checked against [Anthropic's errors
page](https://code.claude.com/docs/en/errors.md#the-server-returned-no-safety-verdict)
and changelog in November 2026.

## What "no verdict" means

In auto mode, Claude doesn't ask you before each action. A second model,
the **classifier**, reviews each one and blocks anything that goes beyond
what you asked for, as Anthropic's [permission modes
page](https://code.claude.com/docs/en/permission-modes.md) explains. Since
version 2.1.283 it's the mode interactive sessions start in, which is why
many people meet this error without having turned anything on.

On most connections that check now runs **on Anthropic's servers**, as part
of the same request that produces Claude's reply. "No verdict" means the
check didn't come back with an answer in time. Anthropic's issue for it
puts it plainly: it's a failure of the check, *not a judgment about the
action*.

When there's no verdict, Claude Code **refuses the action** rather than run
it unreviewed. There's no fallback to asking you. That's the safe choice,
and it's why everything stops at once.

Read-only actions, like reading a file, don't go through the classifier,
so those keep working while commands fail.

## What Claude Code does about it

- It **waits and retries.** You may see a countdown labelled *Auto mode
  check unavailable*. Each retry waits a little longer.
- After **10 responses in a row** with no verdict, it stops the turn and
  shows the *Auto mode is unavailable* message. In a `claude -p` script,
  that counts as an error. This stop arrived in version 2.1.280. Before it,
  each action was refused and the turn carried on.
- Since 2.1.296, an interactive session may show a quieter dim line,
  *Not run · auto mode's check had no usable answer*, instead of the red
  error. Press Ctrl+O to see the full text.

## Fixes, in the order to try them

### 1. Send another message

The simplest fix and the one the docs list first. Something as short as
"try again" restarts the count. In the reports on [GitHub issue
#97854](https://github.com/anthropics/claude-code/issues/97854), the
problem cleared on its own after a few minutes, and a retry worked.

### 2. Switch out of auto mode for a while

Press **Shift+Tab** to change permission mode and approve actions yourself.
One user in that thread said switching to the default mode fixed it
immediately. You lose the hands-off part, but you keep working, and you can
switch back later.

### 3. If it says the conversation is too long, compact

If the refusal mentions that the conversation is too long for the check,
run:

```text
/compact
```

Since 2.1.302, Claude Code compacts on its own in this case on a direct API
connection, so make sure you're up to date with `claude update`.

### 4. Use Claude Code's own classifier

You can tell Claude Code to run the check itself rather than rely on the
server:

```bash
CLAUDE_CODE_AUTO_MODE_SERVER=0 claude
```

On a direct API connection this needs version 2.1.281 or later. Run
`/status` and look at the **Auto mode server** row to see which one your
session is using. One caution: the docs say Claude Code's own classifier
requests may be billed, so try this when the server-side check keeps
failing, not as a default.

### 5. Behind a company proxy or gateway? Check it

The docs name one cause you can fix: an LLM gateway or proxy that cuts
streaming responses short or rewrites them. The verdict travels with the
response, so if something in the middle trims it, Claude Code never sees
an answer. If this happens every time at work and never at home, that's
the likely cause. Ask whoever runs the proxy.

## Is it a bug in your setup?

Probably not. The GitHub issue, open since 28 September 2026, has reports
from macOS, Windows, Linux and WSL users, which points at the service
rather than anyone's machine. Recent fixes (2.1.314 and 2.1.316) tidied up
how the failure is reported, but no changelog entry says the timeouts
themselves are fixed. Expect to see it now and then.

If Claude Code is failing in other ways at the same moment, check whether
it's a wider outage. ["Stream idle timeout" in Claude
Code](/blog/claude-code-stream-idle-timeout/) covers the related case where
the whole response stalls, and [Claude Code permission
prompts](/blog/claude-code-permission-prompts/) explains the mode you're
falling back to.

[Minnie](/download/), our desktop pet that runs Claude Code, puts those
permission prompts in a bubble you can answer with a click, so stepping out
of auto mode for an afternoon costs less.

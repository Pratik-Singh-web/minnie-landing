---
title: "Claude Code \"Stream idle timeout\": what it means, fixed"
description: "API Error: Stream idle timeout in Claude Code means the response went quiet. Why it happens, the Mac sleep case, and when raising the timeout helps."
pubDate: 2026-10-31
tags: ["claude code", "macos", "errors"]
draft: false
hero:
  motif: terminal
  lines: ["$ claude", "API Error: Stream idle timeout", "$ claude update"]
  pose: stand
---

Claude Code was halfway through a task, went quiet, and then printed one of
these:

```text
API Error: Stream idle timeout - partial response received
API Error: Stream idle timeout - no chunks received
```

It looks like something broke. Usually nothing did. The connection to the
model went silent for longer than Claude Code is willing to wait, so it
gave up on that connection. Your files are fine, and in most cases you can
just ask it to carry on.

This is one of the most reported Claude Code errors. The main GitHub issue
for it, [#46987](https://github.com/anthropics/claude-code/issues/46987), has
well over a hundred reactions. Here's what it means and what actually
helps, checked against Claude Code 2.1.310 in late October 2026.

## What the error means

Claude Code streams the model's answer to you a piece at a time. If that
stream stops arriving, it can't tell a slow answer from a dead connection
just by waiting. So it runs watchdog timers. When nothing arrives for long
enough, the watchdog aborts the connection, so a dead one fails and gets
retried instead of hanging forever.

[Anthropic's network docs](https://code.claude.com/docs/en/network-config.md#streaming-idle-watchdogs)
list the timers. On a normal connection to Anthropic's API, once the answer
has started, two matter:

| Timer | Fires when | Default |
| --- | --- | --- |
| Byte-level watchdog | No bytes at all arrive, including keep-alive pings | 180 seconds |
| Event-level watchdog | No complete response event arrives | 300 seconds |

The byte-level one is the important detail. The API sends keep-alive pings
while the model is thinking, and those count. So on a healthy connection, a
long think alone shouldn't trip it. When it fires, something between you and
the API stopped passing data: the Wi-Fi dropped, a VPN reconnected, a proxy
held the response back, or your Mac went to sleep.

The two wordings tell you how far it got. **No chunks received** means
nothing of the answer had arrived. **Partial response received** means some
had.

## Newer versions say it differently

If you're on a recent version, you may not see "Stream idle timeout" at all
for a stall that happens mid-answer. Claude Code now names the cause and
keeps what it already had:

```text
API Error: Your computer went to sleep mid-response. The response above may be incomplete.
API Error: The response stopped arriving. The response above may be incomplete.
API Error: Connection lost mid-response. The response above may be incomplete.
```

The [errors reference](https://code.claude.com/docs/en/errors.md#the-response-above-may-be-incomplete)
explains why it doesn't simply retry at that point. Once Claude has finished
a block of text or a tool call, re-sending the request could run the same
tool calls twice. So Claude Code keeps the finished part, runs any tool call
that was complete, and stops. Type `continue` and it picks up from there.

Earlier in a response, before any of it had arrived, Claude Code does retry
on its own, up to 10 times with backoff. When you see an error, those retries
have already been used up.

## Step 1: update Claude Code

A lot of "Stream idle timeout" reports came from bugs that have since been
fixed, so check this first:

```bash
claude --version
claude update
```

From the [changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md):

- **2.1.126** fixed the error after waking a Mac from sleep mid-request, and
  fixed background and remote sessions aborting with it during long thinking
  pauses.
- **2.1.139** fixed a spurious timeout five minutes after a response had
  already finished.
- **2.1.222** fixed it firing on custom `ANTHROPIC_BASE_URL` gateways while
  keep-alive pings were still arriving.
- **2.1.232** fixed it failing the request instead of recovering on Bedrock,
  Vertex and gateway setups.

If you're on anything older than those, update before you change any
settings.

## The Mac sleep case

This is the one Mac users hit most. You start a long task, walk away, the
Mac sleeps, and you come back to a timeout.

Sleep freezes every process, Claude Code included. When the Mac wakes, the
connection to the API is gone, and the watchdog finds a stream that's been
silent for as long as you were away. Recent versions detect this and say
`Your computer went to sleep` instead, but the answer is the same either
way. The task didn't run while you were gone.

The fix is to stop the Mac sleeping while Claude Code works:

```bash
caffeinate -i claude
```

That keeps the Mac awake for exactly as long as that Claude Code session
runs. [Keep your Mac awake while Claude Code
works](/blog/keep-mac-awake-claude-code/) covers the other options and what
closing the lid does.

## VPNs, proxies and flaky networks

If you see the error without sleeping, look at what sits between you and
the API.

- **VPNs** that reconnect or switch servers drop the stream. Try the same
  task with the VPN off. If the errors stop, that's your answer.
- **Corporate proxies and gateways** sometimes hold the response back and
  deliver it all at once at the end. To the watchdog, that looks exactly
  like a dead connection. Anthropic's docs have a section on [long thinking
  ending in proxy timeouts](https://code.claude.com/docs/en/claude-apps-gateway-deploy.md#long-thinking-ends-in-proxy-timeouts)
  for that setup.
- **Weak Wi-Fi** does the same thing on a smaller scale. If it only happens
  in one place, it's probably the network there.

## Raising the timeout

If your connection is genuinely slow rather than broken, you can give it
longer. One environment variable sets both watchdogs:

```bash
echo 'export CLAUDE_STREAM_IDLE_TIMEOUT_MS=600000' >> ~/.zshrc
source ~/.zshrc
```

That's 10 minutes. Two rules from the docs: Claude Code raises any value
under 5 minutes to 5 minutes, and caps the byte-level watchdog at 30
minutes.

Know the trade-off. A longer timeout also means a connection that really
is dead takes longer to notice, and Claude Code sits there doing nothing
until it does. Raise it if you're behind a slow proxy. Don't raise it to
paper over sleep or a dropping VPN. It won't help with either.

Two settings people reach for that don't do what they expect:

- **`API_TIMEOUT_MS`** only limits the wait for the response to *start*. It
  doesn't change how long a stream may stay silent once it's going.
- **Turning the watchdogs off** (`CLAUDE_ENABLE_STREAM_WATCHDOG=0`) swaps an
  error for a hang. A dead connection then just never finishes.

## If it keeps happening

Check [status.claude.com](https://status.claude.com) first. If the API is
having a bad day, nothing on your Mac will fix it. If the status page is
clear, you're on the latest version, the Mac isn't sleeping and you've tried
without the VPN, add your version and what you were doing to
[#46987](https://github.com/anthropics/claude-code/issues/46987).

The other half of this problem is noticing. A session that hit a timeout ten
minutes ago looks the same as one that's still working.
[Claude Code notifications on Mac](/blog/claude-code-notifications-mac/) sets
up an alert for when a session stops. [Minnie](/download/), our desktop pet
for the Mac, does it visually: she shows whether your agent is working,
finished or waiting on you, so a stalled session doesn't sit unnoticed.

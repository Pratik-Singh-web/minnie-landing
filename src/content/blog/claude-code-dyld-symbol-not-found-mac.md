---
title: "Claude Code \"dyld: Symbol not found\" on Mac, fixed"
description: "dyld: Symbol not found: _ubrk_clone or Abort trap: 6 when you run Claude Code means your macOS is too old. How to check, and what to do if you can't update."
pubDate: 2026-11-06
tags: ["claude code", "macos", "errors"]
hero:
  motif: terminal
  lines: ["$ claude", "dyld: Symbol not found: _ubrk_clone", "Abort trap: 6"]
  pose: stand
---

You install Claude Code on an older Mac, type `claude`, and get this instead:

```text
dyld: Symbol not found: _ubrk_clone
  Referenced from: claude-darwin-x64 (which was built for Mac OS X 13.0)
  Expected in: /usr/lib/libicucore.A.dylib
```

Or this, from the installer or the first run:

```text
dyld: cannot load 'claude-2.1.42-darwin-x64' (load command 0x80000034 is unknown)
Abort trap: 6
```

Both mean the same thing: **your version of macOS is older than Claude Code
supports.** Nothing is wrong with the install, and reinstalling won't
help. Here's how to confirm it and what your options are, checked against
[Anthropic's troubleshooting guide](https://code.claude.com/docs/en/troubleshoot-install.md#dyld-cannot-load-on-macos)
in November 2026.

## What the error is saying

`dyld` is the part of macOS that loads a program and links it to the system
libraries it needs. Claude Code is built for **macOS 13 Ventura or later**,
which is the minimum in Anthropic's [system
requirements](https://code.claude.com/docs/en/setup.md#system-requirements).

On an older macOS, two things can go wrong:

- **`Symbol not found`** means Claude Code asked for a function the system
  library doesn't have yet. `_ubrk_clone` lives in `libicucore`, Apple's
  text-handling library, and older macOS versions don't include it. The
  error even says so: the binary *was built for Mac OS X 13.0*.
- **`cannot load … load command … is unknown`** followed by
  **`Abort trap: 6`** means the loader doesn't recognise the format of the
  file at all. It's newer than your macOS understands.

## Check your macOS version

Open the Apple menu and choose **About This Mac**, or run:

```bash
sw_vers -productVersion
```

Anything below `13.0` is the cause. If it says 13 or higher and you still
see one of these errors, something else is going on. Skip to the end.

## The fix: update macOS

Open **System Settings > General > Software Update** (or **System
Preferences > Software Update** on older versions) and update to macOS 13
or later.

One thing that won't work: switching installers. Homebrew, npm and the
native installer all end up running the same Claude Code binary, and the
docs say plainly that an alternative install method won't resolve this
error. If one fails with `dyld`, they all will.

## If your Mac can't run macOS 13

This is the hard case. Every Apple Silicon Mac can run macOS 13, so if you
have an M-series Mac, update and you're done. The error is mostly a
problem on older Intel Macs: roughly a 2016 or older MacBook Pro or iMac,
or a 2017 or older MacBook Air or Mac mini, which Apple stopped updating at
macOS 12 Monterey or earlier.

On those, you have three honest options:

- **Run Claude Code somewhere else and connect to it.** Claude Code works
  over SSH, so it can run on a newer Mac, a Linux machine or a cloud server
  while you type into it from the old Mac's Terminal.
- **Use Claude Code in the browser.** Claude Code on the web runs the agent
  in Anthropic's cloud, so your Mac's version doesn't matter. It works on a
  GitHub repository rather than files on your Mac, which suits some work
  and not other work.
- **Stay on the edge, knowingly.** The changelog shows Anthropic fixed
  Claude Code failing to launch on macOS 12 Monterey in version 2.1.258,
  after a regression in 2.1.255. So recent versions have, at times, run on
  Monterey. But 13 is the documented minimum, and an update can stop
  working on 12 again without notice. If you depend on it, don't.

We'd skip anything that patches a newer macOS onto an unsupported Mac
just to run one tool. It's a lot of risk for a command-line program.

## If your macOS is 13 or newer

Then the version isn't the problem, and these errors are unusual. Check
that you're running the copy you think you are:

```bash
which -a claude
claude --version
```

More than one path means more than one install, and an old one may be
winning. [zsh: command not found: claude on Mac,
fixed](/blog/claude-command-not-found-mac/) covers untangling those (cause
5), and [Uninstall Claude Code from a Mac
completely](/blog/uninstall-claude-code-mac/) shows how to start clean.
Once `claude --version` works at all, `claude doctor` checks the rest.

If macOS blocks `claude` with a malware warning rather than a `dyld` error,
that's a different problem: see ["Apple could not verify claude" on Mac: is
it safe?](/blog/apple-could-not-verify-claude-mac/)

[Minnie](/download/), our desktop pet that runs your coding agent, is built
for Apple Silicon Macs, and every one of those can run macOS 13, so this
error never stands between you and her.

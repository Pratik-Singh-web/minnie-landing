---
title: "Claude Code keeps asking to access data from other apps"
description: "\"2.1.xxx would like to access data from other apps\" on your Mac is Claude Code. Why the prompt names a version and returns after updates, and what to do."
pubDate: 2026-11-04
tags: ["claude code", "macos", "errors"]
draft: true
hero:
  motif: dialog
  lines: ["“2.1.218” would like to access data from other apps", "~/.local/share/claude/versions/2.1.218"]
  bubble: "Who is 2.1.218?"
  pose: stand
---

A macOS privacy prompt pops up while you're working, and the app it names is
just a number:

```text
“2.1.218” would like to access data from other apps.
```

Sometimes it's iCloud Drive instead: *wants to access files managed by
iCloud Drive*. You allow it. A day later it asks again, with a different
number.

That number is a Claude Code version, and the prompt is Claude Code asking.
It isn't malware, but the way it keeps coming back is a real, open bug. Here's
how to check it's genuine, why it repeats, and what you can do, as of Claude
Code 2.1.310 in late October 2026.

## First, check it's really Claude Code

The number in the prompt should match your installed version and the folder
it runs from:

```bash
claude --version
ls -la ~/.local/bin/claude
```

The second command shows the `claude` command pointing into
`~/.local/share/claude/versions/`, at a file named after the version. If that
number matches the prompt, it's your Claude Code.

To confirm the file was signed by Anthropic, check its signature. A genuine
copy shows Developer ID Application: **Anthropic PBC (Q6L2SF6YDW)**.
["Apple could not verify claude" on Mac: is it
safe?](/blog/apple-could-not-verify-claude-mac/) walks through the
one-command check and how to read it.

## Why the prompt shows a number

macOS remembers privacy permissions per program. For an ordinary Mac app,
that program is an app bundle with a name, which is why you see "Terminal"
or "Claude" in these dialogs.

Claude Code's native installer doesn't install an app bundle. It installs a
single executable file, and it puts each version in its own place:

```text
~/.local/share/claude/versions/2.1.217
~/.local/share/claude/versions/2.1.218
```

The `claude` command is a link to whichever one is current. With no bundle
to take a name from, macOS names the program after its file, which is the
version number.

## Why it comes back after every update

This is the part people find maddening, and it's well documented by users.
The reports on GitHub,
[#49282](https://github.com/anthropics/claude-code/issues/49282) and
[#80899](https://github.com/anthropics/claude-code/issues/80899), explain it
like this:

1. macOS keys permissions for a bare executable like this by its **full
   path**.
2. Every Claude Code update lands at a **new** path, the next version's
   folder.
3. So to macOS, every update is a brand-new program with no permissions,
   and it asks again.

The reporters checked the signature too. Every version is signed by
Anthropic with the same identity, so it isn't a signing problem. It's the
changing path. Claude Code updates itself in the background and new versions
ship often, so one reporter describes re-approving prompts several times a
day. In **System Settings >
Privacy & Security > Full Disk Access**, the same thing shows up as a list of
version numbers, one per update you approved.

Anthropic fixed part of this. Version 2.1.153 made background agents appear
as "Claude Code" in Privacy & Security and keep their permissions across
upgrades. The main CLI still behaves as described. Both issues are open and
have had no reply from Anthropic.

## What the prompts are actually asking

- **"Would like to access data from other apps"** is macOS protecting
  other apps' private data. It usually means a command or search Claude Code
  ran reached into `~/Library`, where apps keep their own files.
- **"Wants to access files managed by iCloud Drive"** means it read a file
  in iCloud Drive. If your Desktop and Documents folders sync to iCloud and
  your project lives there, every project read counts.

Saying **Don't Allow** is fine when the task doesn't need those files. Claude
Code just can't read them, and the command that tried will fail. Say
**Allow** when it does need them, such as when the project sits in iCloud.

## What you can do about it

There's no setting that stops the prompts entirely while the bug is open.
These cut them down:

- **Keep projects out of iCloud-synced folders.** A project in a plain local
  folder, such as `~/code`, never triggers the iCloud prompt.
- **Start Claude Code in the project folder, not your home folder.** From
  your home folder, a broad search is more likely to wander into
  `~/Library`.
- **Update on your schedule, not continuously.** Fewer updates means fewer
  new paths and fewer prompts. Setting `DISABLE_AUTOUPDATER=1` turns off
  background updates, and `claude update` still works when you choose to run
  it:

  ```bash
  echo 'export DISABLE_AUTOUPDATER=1' >> ~/.zshrc
  source ~/.zshrc
  ```

  The cost is that you get fixes later. If you do this, run `claude update`
  once a week or so.
- **Clear out old entries.** In **Full Disk Access**, select the old version
  numbers and remove them with the minus button. They no longer point at
  anything you run.

Don't reach for bigger hammers like turning off System Integrity Protection
or resetting all privacy permissions. They affect every app on the Mac and
don't fix this.

If it's bothering you, add a 👍 and your macOS version to
[#49282](https://github.com/anthropics/claude-code/issues/49282). It carries
the `platform:macos` label and is the older of the two reports.

## Related

Claude Code's other Mac-specific friction has its own posts: [the keychain
login errors](/blog/claude-code-keychain-mac/), [the "Apple could not
verify" warning](/blog/apple-could-not-verify-claude-mac/), and [command not
found after install](/blog/claude-command-not-found-mac/).

If the reason you keep missing these prompts is that Claude Code runs in a
terminal you're not looking at, [Minnie](/download/), our desktop pet for the
Mac, shows when your agent is waiting on you, so you notice sooner.

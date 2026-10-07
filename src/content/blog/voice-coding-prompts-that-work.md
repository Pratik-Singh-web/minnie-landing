---
title: "Voice coding: speaking prompts your agent understands"
description: "Talking to a coding agent is different from typing to it. Practical habits for spoken prompts that are short, specific and hard to misunderstand."
pubDate: 2026-10-02
updatedDate: 2026-10-07
tags: ["voice", "prompting", "productivity"]
draft: false
---

Typing a prompt gives you time to edit. Speaking one doesn't. You say it, it's
gone, and the agent starts working on whatever it heard. That changes what a good
prompt looks like.

These are the habits that make spoken requests work well with a coding agent,
whether you use Minnie or another voice setup.

## 1. Say the goal, then the limit

The most useful spoken prompt has two parts: what you want, and where to stop.

- "Fix the failing login test. Don't change the API."
- "Rename `userId` to `accountId` in the auth module only."
- "Find why the build is slow. Just report back, don't change anything."

The limit is the part people skip when talking, and it's the part that prevents the
most surprises.

There's a reason it gets dropped specifically in speech. When you type, the
constraint is a clause you add while re-reading the sentence. When you talk, the
sentence is finished the moment the thought is, and the thought was about the goal.
Say the limit out loud as a separate sentence, after a pause. It feels unnatural for
about two days.

## 2. Ask for a plan when the task is big

For anything that touches several files, start with: "Tell me how you'd do this
first." The agent proposes, you listen, and you correct the misunderstanding before
it becomes a diff. With Claude Code, plan mode does this explicitly — `shift+tab`
cycles into it. Nothing changes until you say go.

This matters more with voice than with typing. A typed prompt you got wrong is a
prompt you can see on screen and reason about afterwards. A spoken one is gone, so
when the result is strange you have no record of what you actually said, only what
you meant. A plan read back to you closes that gap.

## 3. Spell out names that sound alike

Speech recognition is very good at English and much less sure about identifiers.
`getUserById` and "get user by ID" are not the same thing to a search.

- Point at files by what they do: "the test file for checkout".
- Spell short, ambiguous names: "the variable spelled t-x-n".
- When it really matters, type the identifier and speak the rest.

The general principle, and the single highest-value habit on this list: **speak
intent, type identifiers.** Agents are extremely good at resolving "the migration
that adds the email column" into a filename. They are not good at recovering from
`user_id` transcribed as "user ID".

Some specific traps, all of which transcribe badly:

| You say | You probably get |
|---|---|
| "dot env" | "dot envy", ".nv" |
| "pee gee" (pg) | "PG", "page" |
| "cd dot dot" | "CD dot dot", "see de" |
| "null" | "knull", "no" |
| snake_case names | spaces |

None of these is fatal, because the agent reads context. All of them cost you a
round trip.

## 4. One request at a time

"Fix the test, update the docs, bump the version and open a PR" is four tasks in one
breath, and the agent has to guess the order and what "done" means for each. Say
one, let it finish, say the next. It's slower to describe and much faster to finish.

The exception is a genuine sequence where each step depends on the last and you want
it unattended — "run the tests, and if they pass, commit". That is one task with a
condition in it, not four tasks, and agents handle it well.

## 5. Use your eyes for the result, your voice for the request

Voice is great for asking and approving. It's worse for reviewing code. Let the
agent work, then read the diff with your eyes before you commit. Minnie helps here
by asking out loud before edits and commands, so approving is quick but still
deliberate.

The anti-pattern worth naming: asking the agent to *read the diff to you*. It is
slower than reading it, and it launders the one thing you were supposed to check
through the same system that produced it. Listen to what it plans; look at what it
did.

## 6. Correct, don't restart

If the agent heads the wrong way, interrupt with a correction rather than starting
over: "No, keep the old function and add a new one." Agents handle course
corrections well, and you keep the useful context.

Starting over also throws away everything it learned about your codebase in the last
two minutes — which files matter, how the tests run, where the config lives. A
correction keeps all of that.

## 7. Say no without guilt

When she asks "I want to run the migration. Ok?" and the answer is no, just say no.
A denial is an ordinary answer, not a failure. The agent adjusts and nothing is left
half-done.

This is worth practising deliberately, because the failure mode of every approval
system is not that people approve something terrible — it is that saying yes becomes
reflexive, so by the time something terrible arrives the "yes" is muscle memory.
Refusing things occasionally keeps the prompt meaningful.

## 8. Keep requests short enough to say in one breath

Not a style rule — a practical one. A long spoken request is a long window in which
you can lose your thread, the recogniser can mishear a clause, and you cannot see
what has been captured so far. If a request needs three sentences of setup, that is
a sign it should be a plan-mode request or a typed one.

A good test: if you'd need to say "um, and also" in the middle, split it.

## Where voice shines

Spoken prompts are at their best for the small, frequent requests that break your
flow when you have to switch to a terminal:

- "Run the tests."
- "What changed since this morning?"
- "Commit this with a sensible message."
- "Any PRs waiting on me?"

Notice what these have in common: short to say, long to type, and the output is
something you read rather than something you have to verify line by line. That is
the sweet spot.

Where voice is worse: anything where the exact characters matter. Regexes. Shell
one-liners with flags. A specific error string. Type those.

## The cheat sheet

- Goal first, limit second, as two sentences.
- Plan mode for anything touching several files.
- Speak intent, type identifiers.
- One request per breath.
- Voice to ask and approve; eyes to review.
- Correct mid-run instead of restarting.
- "No" is a normal answer.

Voice in Minnie runs on device by default, so your microphone audio stays on your
Mac. For the setup, and an honest comparison with the other ways to add voice to a
coding agent, see [Talk to Claude Code with your voice on a
Mac](/blog/talk-to-claude-code-with-your-voice/).

[Download the free beta →](/download/)

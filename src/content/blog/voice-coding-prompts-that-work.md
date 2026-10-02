---
title: "Voice coding: how to speak prompts your agent understands"
description: "Talking to a coding agent is different from typing to it. Practical tips for spoken prompts that are short, specific and hard to misunderstand."
pubDate: 2026-10-02
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

## 2. Ask for a plan when the task is big

For anything that touches several files, start with: "Tell me how you'd do this
first." The agent proposes, you listen, and you correct the misunderstanding before
it becomes a diff. With Claude Code, plan mode does this explicitly. Nothing changes
until you say go.

## 3. Spell out names that sound alike

Speech recognition is very good at English and much less sure about identifiers.
`getUserById` and "get user by ID" are not the same thing to a search.

- Point at files by what they do: "the test file for checkout".
- Spell short, ambiguous names: "the variable spelled t-x-n".
- When it really matters, type the identifier and speak the rest.

## 4. One request at a time

"Fix the test, update the docs, bump the version and open a PR" is four tasks in one
breath, and the agent has to guess the order and what "done" means for each. Say
one, let it finish, say the next. It's slower to describe and much faster to finish.

## 5. Use your eyes for the result, your voice for the request

Voice is great for asking and approving. It's worse for reviewing code. Let the
agent work, then read the diff with your eyes before you commit. Minnie helps here
by asking out loud before edits and commands, so approving is quick but still
deliberate.

## 6. Correct, don't restart

If the agent heads the wrong way, interrupt with a correction rather than starting
over: "No, keep the old function and add a new one." Agents handle course
corrections well, and you keep the useful context.

## 7. Say no without guilt

When she asks "I want to run the migration. Ok?" and the answer is no, just say no.
A denial is an ordinary answer, not a failure. The agent adjusts and nothing is left
half-done.

## Where voice shines

Spoken prompts are at their best for the small, frequent requests that break your
flow when you have to switch to a terminal:

- "Run the tests."
- "What changed since this morning?"
- "Commit this with a sensible message."
- "Any PRs waiting on me?"

Voice in Minnie runs on device by default, so your microphone audio stays on your
Mac. For the setup, see [Talk to Claude Code with your voice on a Mac](/blog/talk-to-claude-code-with-your-voice/).

[Download the free beta →](/download/)

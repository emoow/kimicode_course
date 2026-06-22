---
name: writing-plans
description: Use when you have an approved idea from brainstorming and you're about to start building. Breaks the idea into tiny, friendly steps the person can follow along with.
---

# Writing a Building Plan

## What this is for

Take the plan you agreed on during brainstorming and break it into tiny steps — small enough that each one takes just a few minutes and the person can see what happened after each. Every step says what you're doing and, briefly, *why* it matters, so the person learns as you go.

You're writing this for someone who is brand new. Keep it concrete and kind. No jargon without a quick explanation.

**Say at the start:** "Let me turn our idea into a step-by-step plan we can follow together."

**Save the plan to:** `docs/weakerpowers/plans/YYYY-MM-DD-<idea>.md` (you may already have started this file during brainstorming — add the steps to it).

## Keep it small

If the idea is big, build the heart of it first. A plan should produce something the person can actually see and try as soon as possible. Seeing it work early is what keeps building fun. Save the extra features for a follow-up plan.

## What a step looks like

Each step is one small action the person can watch happen. Write it in plain language and include a short "why" so it never feels like magic.

A good step:
- Does one thing.
- Takes a few minutes.
- Ends with something visible or checkable — "now if you open the page, you'll see a heading."
- Explains *why* in a sentence: "We start with the heading so the page has a clear title at the top."

## Plan layout

Start the plan with a short, friendly header:

```markdown
# Building: [What we're making]

**What we're making:** [One plain sentence.]

**How it'll feel:** [The vibe we agreed on.]

**What we're building it with:** [The tools you chose, in plain words.]

**Saving for later:** [Anything we're intentionally skipping for now.]

---
```

Then list the steps in order:

```markdown
### Step 1: [What this step does]

**Why:** [One sentence on why this matters.]

[What to do, in plain language. If there's code, show the whole thing — don't leave blanks for the person to fill in.]

**You'll know it worked when:** [What the person should see or be able to do.]
```

## No blanks

Every step has to contain the real thing. Never leave placeholders like "add the rest here," "TODO," or "you figure out this part." If a step involves code, write out the full code. The person is following along, not filling in gaps.

## Checking the work — by looking, not by tests

Weakerpowers doesn't ask beginners to write automated tests. Instead, each step ends with a plain-language "You'll know it worked when..." so the person can check with their own eyes. The checking-your-work skill covers how to look things over together once the building is done.

## Quick self-check

After you've written the plan, read it back as if you were the beginner:

1. **Does each step make sense on its own?** No step should assume knowledge from nowhere.
2. **Any blanks or jargon?** Fill in the blanks. Explain or remove the jargon.
3. **Can they see something happen early?** If the first visible result is ten steps in, reorder so there's a win sooner.

Fix anything you find, then move on.

## Handing off to building

Once the plan is saved, tell the person it's ready and move into building:

> "Our plan is ready and saved. I'll start on the first step and show you what changes each time. Ready to build?"

Then use the executing-plans skill to build it step by step.

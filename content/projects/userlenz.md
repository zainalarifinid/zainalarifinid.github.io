---
title: 'Userlenz'
date: '2026-07-05'
description: 'An AI-moderated user research platform — teams write a prompt, Userlenz turns it into a guided research workflow, runs it through a voice AI agent while capturing session activity, then generates a report from the results.'
imageUrl: '/images/projects/userlenz-homepage.png'
tags: ['Next.js', 'Firebase', 'Firestore', 'Cloud Functions', 'ElevenLabs', 'rrweb', 'Claude API']
liveUrl: 'https://userlenz-dev.web.app/'
sourceUrl: 'https://userlenz-dev.web.app/'
---

# Userlenz

Userlenz started as a friend's idea for a startup: make user research something a small team could run on its own, without hiring a researcher or scheduling a round of manual interviews. I built the product end to end — the tech stack, the MVP, the demo environment, and every decision about how data gets stored and turned into a report.

## Project Overview

Most teams know they should talk to users more often, but running a proper research session — writing a discussion guide, moderating it, taking notes, then synthesizing everything into something the team can act on — takes time most small teams don't have. Userlenz automates the parts of that process that don't need a human in the room, while still capturing real conversational responses instead of a static form.

## How It Works

1. **Prompt in** — a team writes a plain-language research question (e.g. "why are users dropping off during onboarding?").
2. **Workflow generation** — Userlenz turns that prompt into a structured research workflow: a sequence of questions designed to actually get at the underlying answer, not just surface-level feedback.
3. **AI-moderated sessions** — an ElevenLabs voice agent runs the session with each participant, asking the generated questions conversationally and following up in real time, so responses aren't limited to whatever a form anticipated.
4. **Session capture** — while the voice agent talks with the participant, `rrweb` records their on-screen activity in parallel, so the session data includes both what they said and what they did.
5. **Report generation** — once responses come in, the raw transcript and session data are processed through the Claude API, which synthesizes them into a structured report the team can actually read and act on, instead of a pile of raw transcripts.

## My Role

This wasn't a co-founding role — the idea and the startup are my friend's. My job was turning that idea into a working product: choosing the stack, building the MVP, standing up a demo environment, and making every technical call about how the feature set actually gets implemented — down to how each entity is modeled in the database and how raw responses get turned into a report.

## Technical Architecture

- **Frontend**: Next.js, deployed as a static/SPA build to Firebase Hosting (the `userlenz-dev.web.app` domain).
- **Auth & Data**: Firebase Auth for user accounts, Firestore as the primary data store.
- **Backend logic**: Firebase Cloud Functions handle the workflow-generation step, orchestrating the ElevenLabs session, and triggering report generation once a session completes.
- **Voice moderation**: ElevenLabs' conversational agent conducts the actual research conversation with participants.
- **Session recording**: rrweb captures and replays on-screen activity during a session, so a report isn't just "what they said" but "what they were looking at when they said it."
- **Report synthesis**: Claude API, given the session transcript and captured activity, generates the final report.

## Data Model & Reporting Pipeline

One of the harder design decisions was how to model a "research session" so that a prompt, its generated workflow, a participant's spoken responses, and their recorded screen activity all stay linked to each other in Firestore — without over-normalizing the data to the point where generating a report meant stitching together a dozen queries. The collections are structured around a session as the central document, with responses and rrweb capture references nested or linked underneath it, so the report-generation function can pull everything it needs for a session in a single pass before handing it to Claude.

## Building the MVP and Demo Environment

Because this is a friend's startup idea rather than an established product, scope mattered as much as implementation. I prioritized the smallest end-to-end slice that could prove the concept — prompt in, session out, report generated — before adding anything else, and built a separate demo environment so the product could be shown to prospective users without touching real session data.

## Screenshots

![Userlenz research workflow](/images/projects/userlenz-workflow-page.png)

## Challenges and Decisions

- **Keeping AI-moderated sessions on-topic**: the generated workflow has to constrain the voice agent enough that it stays focused on the research question, while still leaving room for it to follow up naturally.
- **Syncing two data streams**: the voice session and the rrweb recording happen in parallel and need to be correlated afterward so the report can reference "what the user did" at the right point in "what they said."
- **Report quality**: getting the Claude API to produce a report that's genuinely useful to a non-researcher, rather than a restated transcript, took iteration on how session data is framed in the prompt sent to it.

## Future Improvements

- Support for multiple concurrent research workflows per team
- Deeper analytics across sessions (trends across multiple participants, not just per-session reports)
- Expanding beyond voice-only sessions to include async/text-based research flows

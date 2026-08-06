---
title: 'Eazy Pass - Client Management App'
date: '2026-07-28'
description: 'An internal Client Management App built for my own web dev agency, Eazy Pass Solution — a lead pipeline, project delivery tracking, and AI-drafted client proposals (Google Gemini) in one multi-tenant-ready NestJS/Prisma + React app.'
imageUrl: 'https://placehold.co/600x400/1e293b/64748b?text=Eazy+Pass+Client+Management'
tags: ['NestJS', 'Prisma', 'PostgreSQL', 'React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Google Gemini']
liveUrl: 'https://client-management.zainalarifin.id/'
sourceUrl: ''
featured: false
---

# Eazy Pass - Client Management App

## The Situation

Eazy Pass Solution is my own web development agency, and before this existed, its sales pipeline and active client work lived across spreadsheets and chat threads. It's easy for a small agency to lose track of follow-ups, slow to produce a consistent client proposal, and hard to see pipeline health at a glance when everything is informal.

Try it live: [client-management.zainalarifin.id](https://client-management.zainalarifin.id/) — demo login `demo@zainalarifin.id` / `passworddemo123`.

## The Task

This is my own product for my own agency — I made every call: the stack, the data model, the multi-tenancy approach, and which AI features were worth building first. The goal was to give the business owner (and any teammates added to the organization) one place to see every lead and its stage, convert a won lead straight into a delivery project with its own timeline and tasks, generate a professional client-ready proposal in minutes instead of hours, and get a fast read on pipeline value and delivery risk without digging through records.

## The Action

**Core features:**

- **Lead pipeline (Kanban)** — a 7-column board (New → Contacted → Qualified → Proposal Sent → Negotiation → Won / Lost) with drag-and-drop status changes; winning a lead auto-creates a linked project.
- **Project delivery tracking** — each project gets a Gantt-style timeline, tasks with their own timeline grid, milestones, risks (likelihood/impact/mitigation/owner), and stakeholders.
- **Notes, activity & attachments** — a typed interaction feed per lead (note/call/meeting/email) plus file uploads or links, including a Google Drive picker integration.
- **AI proposal generation** — pick a project-type template (landing page, e-commerce, custom web app, mobile app) and Google Gemini returns a structured JSON proposal (executive summary, sections, milestones, pricing table, closing) that renders straight into a rich-text editor. The prompt never guesses the client PIC's honorific (Bapak/Ibu/Mas/Mbak) — it's taken verbatim from the lead record or left out.
- **Dashboard** — pipeline value, win rate, active milestones, org-wide recent activity, recent AI-generated proposals, and a quick-proposal widget that creates a lead and opens the proposal flow in one step.
- **AI monthly stakeholder report** — an on-demand, plain-text executive summary of deal flow, win rate, top opportunities, and delivery risk, generated from the organization's live data.
- **Automated follow-up scheduling** — setting a lead's next-follow-up date queues a delayed BullMQ job that fires an SSE event.

**Technical architecture:**

- **Backend**: NestJS, modules mirroring the domain (leads, projects, tasks, milestones, risks, stakeholders, interactions, ai, dashboard, follow-up, auth, activity-log). Prisma ORM against PostgreSQL, JWT auth, BullMQ/Redis for the follow-up queue.
- **Frontend**: React + Vite + TypeScript, Tailwind CSS with hand-rolled shadcn-style primitives on CSS variables (so theming is a token swap), Tiptap for the proposal rich-text editor, Context API for auth/theme.
- **Multi-tenancy**: every request carries an `x-organization-id` header, scoped server-side by an interceptor, so cross-tenant data leakage isn't possible even if a client sends the wrong ID.
- **AI provider**: Google Gemini via raw REST calls (no SDK dependency) — all calls are server-side, the frontend never talks to Gemini directly.
- **Deployment**: Docker Compose for backend/frontend/Postgres/Redis.

**Challenges and decisions:**

- **Structured AI output over free text**: proposal generation asks Gemini for a typed JSON object rather than prose to parse, so the rendered pricing table and milestone list are real HTML, not reformatted text.
- **Multi-tenancy from the start**: scoping every table to an organization from day one, even with a single real tenant today, so adding a second client doesn't mean a migration later.
- **Being honest about what's not built**: a few sidebar entries (granular permissions, a full activity log, a template management page) are deliberately shown as "coming soon" rather than hidden or faked, so the app's own navigation doesn't misrepresent what actually works yet.

## The Result

Today the app runs in production for one real tenant — my own agency — plus a seeded demo tenant for review, live at [client-management.zainalarifin.id](https://client-management.zainalarifin.id/). It's also a living system rather than a one-off build: the PRD/TRD docs I keep alongside the code track what's shipped, what's an intentional "coming soon" placeholder, and what's next, so the tool's own documentation stays honest about its current state instead of overclaiming.

## Future Improvements

- **AI follow-up email drafter** — draft a ready-to-send email from a lead's fields and interaction history, giving the already-built (but currently idle) follow-up scheduler a real payoff.
- **Role-based permission enforcement** — the `OWNER`/`ADMIN`/`MEMBER` roles are stored per membership today but not yet enforced anywhere.
- **Full activity log & audit trail** — an append-only log across every entity (not just lead interactions), so "who changed this deal's value" always has an answer.
- **Google Workspace integrations** — one-click proposal export to Google Docs, pipeline export to Sheets, and "Schedule Meeting" via Calendar.
- **A real proposal template library** — moving the four hardcoded templates into a browsable page, ahead of eventually letting the agency define its own custom templates.

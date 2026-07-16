---
title: 'Technical Assessment — Vue.js Admin Dashboard + Express API'
date: '2026-07-06'
description: 'A Tech Lead technical assessment: cloned, built, and deployed a Vue.js admin dashboard against an Express.js backend, including database migration/seeding and a working authentication flow.'
imageUrl: '/images/projects/takehome-vue-login.png'
tags: ['Vue.js', 'Express.js', 'Node.js', 'SQL', 'REST API']
liveUrl: 'https://visiongroup-vuedashboard.zainalarifin.id/'
sourceUrl: 'https://visiongroup-vuedashboard.zainalarifin.id/'
---

# Vue.js Admin Dashboard — Technical Assessment

As part of a Tech Lead hiring process, I was given a take-home assessment: clone, build, and run a pre-built Vue.js admin frontend against an Express.js backend template, complete the database migration/seed step, and get the login flow working end to end.

## The Assignment

- Clone, build, and run an Express.js backend from a provided template repo
- Migrate and seed the database
- Clone, build, and run a Vue.js (Ant Design Vue) frontend from a provided template repo
- Configure environment files so the frontend authenticates against the backend
- Confirm a successful login lands on a working dashboard

## What I Did

- Set up both repos on a Linux-based deployment environment rather than just running locally, so the reviewer could access a live, working instance instead of relying on a screen-share
- Resolved environment configuration between the frontend and backend (API base URL, auth/session handling) so the login flow actually authenticates end to end
- Ran the database migrations and seed scripts, then verified the seeded data surfaces correctly in the dashboard's data tables — pagination, filtering, and CRUD actions all wired to real data
- Deployed the result under my own domain so it stays reachable for review rather than depending on a local dev server

## Screenshots

![Login screen](/images/projects/takehome-vue-login.png)

![Admin dashboard after login](/images/projects/takehome-vue-dashboard.png)

![Seeded data table with pagination and CRUD actions](/images/projects/takehome-vue-students-table.png)

## Why It's Worth Sharing

This wasn't a from-scratch build — the value here was less "wrote every line" and more "got two separate unfamiliar codebases talking to each other, correctly migrated the data layer, and shipped it somewhere reviewable within the requested turnaround," which is a reasonable proxy for the kind of ramp-up work a Tech Lead role actually involves.

*Note: this was a take-home technical assessment for a hiring process, not a production product — details of the hiring company have intentionally been left out.*

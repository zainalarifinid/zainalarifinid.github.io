---
title: 'Technical Assessment — Real-Time Polling API (C#)'
date: '2026-07-06'
description: 'A Tech Lead technical assessment: deployed a REST API and a WebSocket-based real-time polling and voting application in C# on Linux.'
imageUrl: '/images/projects/takehome-csharp-polling.png'
tags: ['C#', '.NET', 'REST API', 'WebSocket', 'Linux']
liveUrl: 'https://visiongroup-netapp.zainalarifin.id/'
sourceUrl: 'https://visiongroup-netapp.zainalarifin.id/'
---

# Real-Time Polling API — Technical Assessment

The second half of this Tech Lead technical assessment asked for two things to be deployed on Linux using C#: a simple REST API application, and a simple WebSocket application. I combined both requirements into one working example: a live polling and voting app.

## The Assignment

- Deploy a simple REST API application using C# on Linux
- Deploy a simple WebSocket application using C# on Linux

## What I Built

A "Live Polling & Voting" app where:
- The REST API handles poll creation — submitting a question and a set of options
- Votes are cast and results update in real time via WebSocket, so anyone viewing the poll sees vote counts and percentages change live without refreshing
- Everything runs on a Linux host, deployed under my own domain so it's reachable for review

## Screenshot

![Live polling and voting app, built with a C# REST API and WebSocket](/images/projects/takehome-csharp-polling.png)

## Why It's Worth Sharing

Rather than building two disconnected toy endpoints to satisfy the letter of the requirement, I picked one small feature — live polling — that genuinely needs both a REST API (create/fetch polls) and a WebSocket connection (live vote updates) to work, so the two requirements demonstrate one real-time system instead of two unrelated snippets.

*Note: this was a take-home technical assessment for a hiring process, not a production product — details of the hiring company have intentionally been left out.*

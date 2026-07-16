---
title: 'Container Wise'
date: '2018-12-01'
description: 'A React Native app for Android and iOS built around Queensland''s container refund scheme — users scan a container barcode, photograph it as proof, and submit their details to claim a "Reduced Refund Reward," with an awareness feed and achievements built in.'
imageUrl: '/images/projects/container-wise.jpg'
tags: ['React Native', 'iOS', 'Android', 'REST API', 'Barcode Scanning']
liveUrl: ''
sourceUrl: ''
---

# Container Wise

I was hired directly to build Container Wise, a React Native mobile app for Android and iOS built around Queensland's container refund scheme: "Reduced Refund Reward."

## How It Works

1. **Scan** — from the Barcode tab, the user scans the barcode on a drink container.
2. **Capture** — they take a photo of the container as proof of the item being submitted.
3. **Submit** — a short form collects the user's name, email, mobile number, and post code, plus an optional comment, then submits the claim.
4. **Confirmation** — a "Thank you" screen confirms the submission, with a one-tap option to scan another bottle.

Beyond the core scan-and-submit flow, the app also has a Feed tab with shareable environmental-awareness content (litter/recycling facts, like/share actions), an Achievement tab that gamifies participation, and a Profile tab for the user's own account and history.

## Demo

![Container Wise — scan, capture, and submit a container for a refund reward](/videos/projects/container-wise.mp4)

## Technical Architecture

- **Mobile app**: React Native, built for both Android and iOS from a single codebase.
- **Barcode scanning**: an in-app camera-based scanner identifies the container/product.
- **Photo capture**: the same in-app camera flow captures a photo of the physical container as submission proof.
- **Backend**: a custom REST API handling barcode lookups, photo uploads, and reward-claim submissions.

## My Role

I was hired directly to build this app end to end in React Native, covering both the Android and iOS builds from a single codebase, along with the barcode scanning and photo-capture flow and its integration with the backend API.

## Looking Back

Container Wise was my first hands-on mobile app built with React Native for a real client, shipped for both Android and iOS from one codebase — a different kind of build from the web-first work before it.

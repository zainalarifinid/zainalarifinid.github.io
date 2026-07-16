---
title: 'Oracle — Zuellig Pharma CPQ & Web Platforms'
date: '2018-06-01'
description: 'Working on an Oracle-led implementation team, I built the UI and order flow for Zuellig Pharma''s CPQ system as it expanded from Singapore into Taiwan, the Philippines, Malaysia, Vietnam, and Thailand, plus the UI for LifePlus and the Asian Development Bank website.'
imageUrl: '/images/projects/oracle-zuellig-pharma.jpg'
tags: ['Oracle CPQ', 'BigMachines', 'BML', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'SAP Integration']
liveUrl: ''
sourceUrl: ''
---

# Oracle — Zuellig Pharma CPQ & Web Platforms

Working as a contractor on an Oracle-led implementation team, I built and maintained the UI and order flow for Zuellig Pharma's CPQ (Configure, Price, Quote) system, alongside UI work for two other Oracle-related web properties: LifePlus and the Asian Development Bank website.

## CPQ Framework for Zuellig Pharma

Zuellig Pharma runs its ordering process — customer search, material/product selection, cart, order submission, and approval — through Oracle CPQ Cloud (built on the BigMachines platform). The project started in Singapore and expanded into Taiwan, the Philippines, Malaysia, Vietnam, and Thailand, each configured as its own business unit (`ZP_SG`, `ZP_TW`, `ZP_PH`, `ZP_MY`, `ZP_VT`, `ZP_TH`) inside the same platform.

I was responsible for the UI and order-flow logic across this expansion: page layouts and BML (BigMachines Markup Language) scripting inside the CPQ platform, plus custom HTML/CSS/JavaScript (jQuery) templates layered on top for the parts that needed a more tailored experience — including a mobile-responsive material-selection view and localized flows like Taiwan's Chinese-language customer search.

Orders ultimately integrate with SAP for fulfillment, so part of the UI work included surfacing integration status and failures clearly back to the sales/CS team (e.g. a failed SAP hand-off shown directly on the order's draft details) rather than leaving them to dig through logs.

![Mobile CPQ material-selection view (Taiwan order)](/images/projects/oracle-zuellig-pharma.jpg)

![CPQ Admin Platform — business units for each expanded country](/images/projects/oracle-zuellig-pharma-2.png)

![Order draft details showing a SAP integration failure surfaced in the UI](/images/projects/oracle-zuellig-pharma-4.jpg)

![Customer search step in the order wizard](/images/projects/oracle-zuellig-pharma-5.jpg)

![Taiwan customer search in Chinese, part of the localized rollout](/images/projects/oracle-zuellig-pharma-8.PNG)

## LifePlus

LifePlus is a customer-facing ordering portal for Zuellig Pharma's healthcare and pharmacy customers (hospitals, dental centres, dispensaries) to view and track their orders — separate from the internal CPQ tooling above. I was responsible for its UI.

![LifePlus customer order portal](/images/projects/oracle-zuellig-pharma-7.png)

## Asian Development Bank Website

I was also responsible for UI work on the Asian Development Bank website, a separate project alongside the Zuellig Pharma work.

## My Role

I worked as a contractor on an Oracle-led implementation team, focused on UI and order-flow work: building out the CPQ experience as it rolled out to each new country, building the LifePlus customer portal UI, and contributing UI work for the Asian Development Bank site.

## Looking Back

This project was my first real exposure to enterprise CPQ tooling and a genuine multi-country rollout — the same order flow had to keep working as it was configured, localized, and re-configured for one country after another, all while staying integrated with a backend system (SAP) I didn't control.

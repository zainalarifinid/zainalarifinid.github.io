---
title: 'KKP — Fisheries Ministry Systems'
date: '2017-01-01'
description: 'From 2015 to 2017 I worked through a vendor company building web systems for Indonesia''s Ministry of Marine Affairs and Fisheries (KKP) — a fishing-vessel registration system and a national fisheries port information platform.'
imageUrl: '/images/projects/kkp-web-pipp.jpg'
tags: ['Laravel', 'CodeIgniter', 'PHP', 'jQuery', 'MySQL']
liveUrl: ''
sourceUrl: ''
---

# KKP — Fisheries Ministry Systems (2015–2017)

From 2015 to 2017 I worked through a vendor/contractor company building web systems for Indonesia's Ministry of Marine Affairs and Fisheries (Kementerian Kelautan dan Perikanan, KKP) — spanning two different divisions' needs: a fishing-vessel registration system, and a national fisheries port information platform.

## Sistem Pendaftaran Kapal — KAPI & Sipalka

KAPI was the ministry's original fishing-vessel registration system, tracking a vessel's paperwork (called a "Pendok") from intake through verification and issuance of its official vessel registration book (Buku Kapal Perikanan / BKP) — built on CodeIgniter with jQuery on the frontend.

Sipalka (internally labeled "PKP" in its own UI) was the next-generation replacement: the same registration workflow rebuilt on Laravel, with a much more detailed multi-stage monitoring view — tracking every application through scan/upload, disposition, data entry, multiple verification steps, and final book handover — against the same MySQL database KAPI used.

![KAPI — ship registration process table](/images/projects/kkp-kapiv2-1.PNG)

![Sipalka (PKP) — registration monitoring dashboard by stage](/images/projects/kkp-sipalka.jpg)

![Sipalka (PKP) — scan/upload queue for a registration loket](/images/projects/kkp-sipalka-2.PNG)

## PIPP — Pusat Informasi Pelabuhan Perikanan

A separate division needed a system for managing Indonesia's fishing ports nationally — PIPP (Fisheries Port Information Center). This split into two applications, both built on Laravel with jQuery and MySQL:

- **Internal dashboard** — a large operations tool covering maps, fish catch data, fish marketing/pricing, non-tax revenue (PNBP), vessel data, labor, fuel distribution, port land, supplies, investment tracking, port operational status, and operator performance evaluation across every registered fishing port, plus a report/"book" generator for port visit reports.
- **Public website** — the public face of the same data: an interactive map of every fishing port in Indonesia, daily fish production and pricing, port activity news, and national fishing forecast maps, published for anyone to view.

![PIPP internal dashboard — module overview](/images/projects/kkp-dashboard-pipp.png)

![PIPP internal dashboard — port operational status monitoring](/images/projects/kkp-dashboard-pipp-3.PNG)

![PIPP internal dashboard — port visit report/book generator](/images/projects/kkp-pipp-book.PNG)

![PIPP public website — national port map and fish production data](/images/projects/kkp-web-pipp.jpg)

## My Role

I worked as a developer through the vendor company contracted to build and maintain these systems, contributing across both the vessel-registration and PIPP applications — server-side logic in CodeIgniter and Laravel, MySQL schema and queries, and the jQuery-driven frontends typical of that generation of government systems.

## Looking Back

These were some of the first large-scale production systems I worked on — real government workflows with real operational data (thousands of vessel registrations, 1,400+ ports tracked), built for divisions that depended on them daily. It was also an early, hands-on look at a legacy CodeIgniter → Laravel migration, a pattern I'd see repeated later in my career.

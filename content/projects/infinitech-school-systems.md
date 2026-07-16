---
title: 'Infinitec — School Portal & Security Systems'
date: '2018-01-01'
description: 'A school-systems suite built for Infinitec: a C# Windows Service that converts documents into images, a student/teacher file portal, a school-level Active Directory management system, and an offline log reader.'
imageUrl: '/images/projects/infinitech.co.jp-awd.jpg'
tags: ['C#', 'Windows Service', 'Node.js', 'PHP', 'Active Directory', 'jQuery']
liveUrl: ''
sourceUrl: ''
---

# Infinitec — School Portal & Security Systems (2017–2018)

Working through a vendor/contractor arrangement with Infinitec, a Japan-based company, I contributed to a suite of systems built for schools — covering document conversion, a student/teacher file portal, school-level Active Directory management, and offline log tooling.

## File-to-Image Conversion Service (C#)

A Windows Service application responsible for converting uploaded files — Office documents (Word/Excel/PowerPoint), PDFs, Adobe Illustrator files, Adobe Photoshop files, and more — into images, so they could be viewed page by page in the browser without needing the original desktop application installed. The web portal (AWD, below) calls into this service as its file converter. I was responsible for maintaining and improving it.

## AWD — Student & Teacher File Portal

"Active Web Document" (AWD) is the web portal students and teachers use to upload and download files (Office documents, PDFs, Illustrator/Photoshop files, etc.), organize them into folders, and set access privileges for other users. I fixed bugs across the existing application and added a new feature: teachers and students can leave a memo attached to any page of a converted document — pick a background color, write or draw a note on that page, and have it persist and reappear whenever that page is viewed again.

![AWD portal — file and folder listing](/images/projects/infinitech.co.jp-awd.jpg)

![Converted document viewer with per-page memo tool](/images/projects/infinitech.co.jp-coco.jpg)

![Memo history for a document, with per-memo length validation](/images/projects/infinitech.co.jp-coco-2.PNG)

## School Management & Active Directory Integration

A separate application handles registering schools into the system's Active Directory. ADC Manager (ADCUM) registers each school as an "affiliation," and from there school admins can manage sub-admin, teacher, and student accounts and permissions. On top of that, D-Protector enforces role-based access to shared network folders per school — separate secure folders for teachers, vice-principals, and students, each mapped to its own network drive letter, plus a full audit log of every folder and permission change.

![ADC Manager — login](/images/projects/infinitech.co.jp-adcum.png)

![ADC Manager — school/affiliation records](/images/projects/infinitech.co.jp-adcum-2.png)

![D-Protector — role-based secure folders per school](/images/projects/infinitech.co.jp-dprotectorum-4.png)

## Offline Log Reader

D-Protector's web console includes a full audit log of activity — folder creation, permission changes, IP address, timestamp, admin ID — running to thousands of entries. For environments without internet connectivity, I built a standalone Log Reader that reads the same ADCUM log data locally, so admins at those schools could still review activity without needing to reach the hosted console.

![D-Protector — audit log manager](/images/projects/infinitech.co.jp-dprotectorum.jpg)

## Technical Architecture

- **Conversion service**: the Windows Service described above, written in C#.
- **Backend**: Node.js, serving as the shared backend layer behind the applications.
- **Frontend**: AWD, ADC Manager, and D-Protector are each PHP applications on top of that backend.
- **Authentication & directory**: the PHP layer connects to Windows Active Directory, so school accounts, roles, and folder permissions are enforced against the same AD structure the school already runs on rather than a separate user store.

## My Role

I worked through a vendor/contractor arrangement with Infinitec, responsible for maintaining and extending this system across both the C# Windows Service layer and the web applications built on top of it — fixing existing bugs, adding the per-page memo feature, developing the school/Active Directory management application, and building the offline log reader for disconnected environments.

## Looking Back

This project put me in the middle of a full Windows/Active-Directory enterprise stack — a background conversion service, several interconnected web apps, and real permission and security requirements for real schools — a different shape of work from the more standalone systems I'd built before it.

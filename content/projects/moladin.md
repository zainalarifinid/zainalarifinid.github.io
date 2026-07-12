---
title: 'Moladin'
date: '2026-03-01'
description: "Contributed three core car-discovery pages — search, brand listing, and model detail — to Moladin's website, built on WordPress with custom PHP templates and jQuery-driven interactivity."
imageUrl: '/images/projects/moladin-homepage.png'
tags: ['WordPress', 'PHP', 'jQuery', 'JavaScript', 'MySQL']
liveUrl: 'https://moladin.com/'
sourceUrl: 'https://moladin.com/'
---

# Moladin

Moladin is an Indonesian car marketplace — new and used car search, financing (Pembiayaan), a used-car inspection service (MoInspeksi), rentals (Sewa Milik), and editorial content, all in one platform. From November 2025 to March 2026 I worked full-time on the team rebuilding the site, focused on the car-discovery experience: the search page, brand-specific search pages, and the car model detail page.

## My Role

I was a full-time contributor on the team building Moladin's new website over a five-month engagement (Nov 2025 – Mar 2026), responsible for three of the site's core page types end to end — from WordPress data structure to the PHP templates and jQuery interactivity that render them.

## Cari Mobil (Search Page)

The main car-search page lets visitors browse all available cars with:
- A breadcrumb and hero header ("Cari Mobil Baru") introducing the search experience
- A brand filter sidebar with its own search-within-filter input, so visitors can quickly narrow a long brand list
- A sort dropdown ("Urutkan dari — Terpopuler")
- A MoInspeksi promo widget cross-selling the inspection service alongside search
- A result grid of car cards, each showing a price range and a "Lihat Harga" call to action into that model's detail page

## Brand-Specific Search Page

Each brand (e.g. "Cari Mobil Toyota") gets its own search page rather than just a filtered view — with an ad slot above the fold, a dynamically generated intro paragraph summarizing that brand's lineup (model count, body styles like coupe/double-cabin/hatchback pulled from structured brand data), a vehicle-type filter (MPV, SUV, Hatchback, …), and the same filtered result grid as the main search page.

## Detail Model Page

The model detail page (e.g. Suzuki Fronx) is the most information-dense of the three:
- Breadcrumb showing category > brand > model
- A quick-facts spec row: fuel type, transmission, engine cc, horsepower, seat count
- An image gallery with exterior/interior toggles and a color-swatch count ("Terdapat 6 warna mobil")
- A sticky price panel with "Dapatkan Promo" and "Bandingkan" (compare) CTAs
- An editorial "Ulasan Moladin" review block
- A "Pajak mulai dari" tax-estimate widget

## Technical Implementation

- **WordPress** as the CMS/backend — car specs, brand info, pricing, and editorial reviews are modeled as custom post types and taxonomies rather than hardcoded per page.
- **PHP templates** per page type (search, brand search, model detail) pull from those post types/taxonomies to render each page server-side.
- **jQuery** drives all client-side interactivity: brand/type filtering, sorting, gallery image switching, expand/collapse sections ("Lihat Lebih Banyak"), and dynamic ad slot placement — no JS framework, since the rest of the site is a traditional WordPress theme.

## Challenges and Decisions

- **Dynamic brand copy**: the brand-page intro paragraph had to be generated from structured data (model counts, body styles) rather than hand-written per brand, since Moladin lists dozens of brands.
- **Filtering without a framework**: keeping brand/type filtering and sorting responsive using PHP + jQuery instead of a client-side framework required careful use of AJAX partial reloads rather than full page refreshes.
- **Gallery UX**: building the exterior/interior toggle and color-swatch gallery on the detail page to feel as responsive as a native app, within a traditional WordPress template structure.

## Screenshots

![Moladin car search page](/images/projects/moladin-search-page.png)

![Moladin Toyota brand search page](/images/projects/moladin-brand-page.png)

![Moladin Suzuki Fronx detail page](/images/projects/moladin-detail-page.png)

## Future Improvements

- A saved-search / alerts feature for specific brands or price ranges
- A side-by-side comparison view built out from the existing "Bandingkan" entry point
- Progressive migration of the most interaction-heavy pages toward a lighter client-side framework

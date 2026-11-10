# Mythri Restaurant — website MVP

Editorial restaurant website inspired by Northern Vessel's visual pacing, with Mythri's own identity and exact brand colors. Built as a dependency-free, accessible web application using semantic HTML, CSS and vanilla JavaScript.

## Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:4173. The development preview serves the most recently built files; restart it after editing source.

## Checks and production build

```bash
npm run check
npm run preview
```

The resulting `dist/` can be deployed to a static host. `public/_headers` provides a baseline set of headers for hosts supporting Netlify-style `_headers`; for other hosts, configure equivalent headers at the platform/edge level. `upgrade-insecure-requests` assumes production is served via HTTPS.

## Features

- Native menu browsing — 99 items in 13 categories, searchable, category-filtered and vegetarian-filtered; data stored in `src/menu.json`.
- Responsive editorial layout, mobile navigation, contact/directions and accessible form controls.
- Reservation *enquiry preparation* only: data stays in the browser and the user must call Mythri; **no table is booked, submitted, or stored**.
- Stable, reviewed design tokens: cream `#F9F6F0`, sage `#8A9A86`, walnut `#3E3227`, aged gold `#D4AF37`, brass `#C5A059`.

## Content status

Menu content was transcribed from https://mythri.com.au/menu/ for the prototype. Item descriptions are shortened/adapted: verify every dish, ingredient, price, dietary tag, public-holiday surcharge, and permission to reuse photography/text with the restaurant before going live. The official homepage currently indicates the restaurant is **opening soon**. Business contact: 2 Rebound Court, Narre Warren South, VIC 3805; (03) 9704 7684. Opening hours are deliberately not asserted.

## Security and deployment notes

This is a front-end MVP, **not** an authenticated full-stack production reservation service. It does not collect/store booking information on a server and never claims a reservation is confirmed. For real bookings, build a trusted server-side service with availability inventory, atomic booking, anti-abuse limits, CSRF controls as needed, validation, confirmation notifications, appropriate retention and a protected admin dashboard. Harden CSP by bundling/self-hosting fonts, removing inline styling, and restricting image origins. Assess accessibility and carry out penetration, dependency and browser testing prior to launch.

## Structure

- `index.html`: semantic page content
- `src/styles.css`: design system and responsive layouts
- `src/main.js`: menu filtering, navigation and local enquiry interaction
- `src/menu.json` and `src/categories.json`: editable restaurant content
- `tests/menu.test.js`: data integrity tests
- `.github/workflows/ci.yml`: build-and-test CI
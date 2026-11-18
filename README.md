## SEO and demo conversion (v0.3.0)

The GitHub Pages instance is an independent **demo** and is not the official `mythri.com.au` website. Canonical URLs are self-referencing for the demo. Do not present the demo as the canonical business listing without the restaurant's approval.

The build creates `sitemap.xml`, includes all published menu dishes in initial HTML, and preserves interactive filters. The project-path `/mythri/robots.txt` does not control the GitHub Pages origin-level `/robots.txt`. The sitemap can be submitted to Search Console by a verified owner.

Phone and directions links are real actions. Enquiries only prepare copyable text and **do not** book a table. No order checkout has been added because no official ordering-provider account or link has been verified. Do not claim conversions or revenue without proper attribution and consent-aware analytics integration. Verify the address, menu prices, dietary details, opening hours and business status before publishing as the restaurant's production site.

# Mythri Restaurant — website MVP

Editorial restaurant website inspired by Northern Vessel's visual pacing, with Mythri's own identity and exact brand colors. Built as a dependency-free, accessible web application using semantic HTML, CSS and vanilla JavaScript.

## Run locally

```bash
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

## GitHub Pages deployment

The site is configured to publish automatically from `main` to:

`https://deepakthota.github.io/mythri/`

The workflow `.github/workflows/deploy-pages.yml` builds with `PUBLIC_BASE_PATH=/mythri`, checks menu routes and local assets, and deploys the `dist/` directory.

**One-time repository-owner setup is required:** open [Settings → Pages](https://github.com/deepakthota/mythri/settings/pages). Under **Build and deployment → Source**, choose **GitHub Actions**. GitHub Actions cannot create the initial Pages site with the current repository token (403). After enabling it, open [Deploy Mythri to GitHub Pages](https://github.com/deepakthota/mythri/actions/workflows/deploy-pages.yml), select **Run workflow** on `main` (or rerun the most recent failed job). Wait for the deploy action to complete before treating the website URL as live.

Note: GitHub Pages is a static hosting platform. The `public/_headers` file is not interpreted by GitHub Pages; configure enforceable security headers on a host that supports them if you migrate to production. Reservation enquiries are not submitted or confirmed server-side.

## Browser compatibility

The site uses progressive enhancement and established browser features. `npm run check` verifies application tests and builds. GitHub Actions now also runs smoke tests on Chromium, Firefox and WebKit. They cover menu filters, history, mobile keyboard navigation and reduced motion. Browser-engine smoke tests do not guarantee identical visual rendering or full accessibility.

To run browser smoke tests locally (optional):

```bash
npm install --no-save @playwright/test
npx playwright install chromium firefox webkit
npx playwright test
```

## Structure

- `index.html`: semantic page content
- `src/styles.css`: design system and responsive layouts
- `src/main.js`: menu filtering, navigation and local enquiry interaction
- `src/menu.json` and `src/categories.json`: editable restaurant content
- `tests/menu.test.js`: data integrity tests
- `.github/workflows/ci.yml`: build-and-test CI

## V3 menu browsing (v0.2.0)

- Homepage now contains four featured dishes with vegetarian/non-vegetarian avatar indicators. No generated or unverified dish photos are used for featured menu items.
- `/menu/` is a dedicated full menu explorer with 13 category tabs, search, vegetarian filter, show-more pagination, and shareable URL state (`category`, `q`, `veg`).
- All 99 dishes and prices remain in `src/menu.json`; the UI never fetches a third-party menu site.
- Desktop: sticky category sidebar; tablet/mobile: horizontally scrolling category tabs.
- All menu photography is intentionally omitted where an exact photo match and reuse rights were not verified. Existing editorial Unsplash photographs outside the new menu browsing UI remain unchanged.
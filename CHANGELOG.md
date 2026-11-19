## v0.3.1 — Hero, shared footer, and gallery UX

- Update hero to “Authentic Indian Food in Narre Warren South” with emphasized locality and a smaller “Crafted for Family & Friends” line.
- Separate Explore Our Menu and Call Mythri actions with clearer spacing and hierarchy.
- Remove the nonfunctional reservation-enquiry preparation form; replace it with genuine call and directions actions in the Visit section.
- Reuse a single shared footer template across homepage and menu; avoid duplicating the full street address right above it.
- Change full menu to a compact image-led card grid on larger screens, with space-efficient horizontal rows on narrow phones.
- Keep only previously verified free-use food photographs; color-coded avatars are used for all unmatched dishes.
- Preserve crawlable menu HTML, search/category filters, URLs, SEO tags and GitHub Pages deployment.

## v0.3.0 — Demo SEO, local discovery and conversion

- Localized titles, descriptions, H1 copy, social metadata and canonicals for the GitHub Pages demo.
- Enriched existing Restaurant JSON-LD without unverified hours, reviews or ordering claims.
- Generated initial HTML for all menu dishes; client-side filters still work.
- Generated XML sitemap and project-site robots reference.
- Added prominent phone CTA and crawlable restaurant contact information in the footer.
- No changes to the actual mythri.com.au website or reservation/order functionality.

# v0.2.2 — Interop compatibility

- Preserve keyboard focus on category selection.
- Keep scroll-reveal content visible when scripting fails or reduced motion is enabled.
- Ensure hidden controls are actually hidden across engines.
- Close mobile navigation with Escape and restore focus.
- Serve SVG with the correct media type.
- Add no-script guidance, regression tests and cross-browser smoke tests in Chromium, Firefox and WebKit.

# v0.2.1 — menu polish

- Title Case navigation and Table Enquiries on home and menu pages.
- Color-coded menu avatars (solid green vegetarian / red non-vegetarian) across both pages.
- Add three photo-matched, free-to-use Unsplash images for biryani, butter chicken and masala dosa, with avatar fallback and photo credits.
- Let the From Our Kitchen photo fill the highlights column on laptop/desktop, with a larger minimum height at 1600px+ and bounded mobile sizing.
- Add regression tests; keep menu content and reservation behavior unchanged.

# Changelog

## v0.2.0 — Menu experience V3

- Replace the long homepage menu with four verified featured dishes.
- Add the dedicated `/menu/` page with responsive category navigation, search, vegetarian filtering, URL persistence, and ten-at-a-time show-more results.
- Use neutral dish avatars and red/green dietary dots instead of generated or ambiguously matched food photos.
- Preserve all 99 menu items, 13 categories, prices, and the enquiry-only booking workflow.

## v0.1.1 — 2026-11-09

- Removed the decorative `01 / 04` marker beside “A TABLE FOR EVERY STORY”.
- Replaced the biryani photograph in “FROM OUR KITCHEN” with an Unsplash-licensed biryani image (Steve Tsang, https://unsplash.com/photos/OterGMpkdsM).
- Left “SCROLL TO DISCOVER ↓” as a non-interactive visual scroll cue by design.
- No changes to menu data or reservation enquiry handling.
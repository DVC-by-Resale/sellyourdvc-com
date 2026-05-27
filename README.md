# sellyourdvc-com

Standalone landing page for [sellyourdvc.com](https://sellyourdvc.com) — a seller-focused funnel for DVC By Resale.

## Purpose

A seller-focused landing page for DVC By Resale, targeting seller-intent search ("sell your DVC", "DVC resale", etc.). The goal is to capture seller leads from search and direct traffic, route them into the existing DVC By Resale intake system, and measure conversion in GA4.

## How it works

- **Hosting:** GitHub Pages, served from the `main` branch.
- **DNS:** GoDaddy. Forwarding is disabled on `sellyourdvc.com`; A records point to GitHub Pages IPs and `www` is a CNAME to `dvc-by-resale.github.io`.
- **Form submission:** The seller intake form POSTs to the existing DVC By Resale intake endpoint (the same one the main site uses). A hidden `referral` field tags the lead source for attribution.
- **Lead flow:** On submit, the lead enters the DVC By Resale intake system, the seller receives an automated follow-up, and the user continues into the main funnel.
- **Analytics:** GA4 (shared with the main site, configured for cross-domain measurement). Conversion events: `form_submit`, `phone_click`.

## Project structure

```
.
├── index.html          # Single-page funnel
├── style.css           # Page styling
├── script.js           # Form validation, conversion event firing
├── images/             # Page assets
├── CNAME               # Custom domain for GitHub Pages
└── README.md           # This file
```

## Local development

This is a static site — no build step. To preview locally:

```bash
# From the repo root
python -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000.

## Deployment

Push to `main`. GitHub Pages rebuilds and republishes automatically (~1–2 minutes).

## Owner

Maintained by Milan G. on behalf of DVC By Resale. Questions: contact via the engagement channel.

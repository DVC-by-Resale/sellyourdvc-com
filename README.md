# sellyourdvc-com

Standalone landing page for [sellyourdvc.com](https://sellyourdvc.com) — a seller-focused funnel for DVC By Resale.

## Purpose

This is the first of five planned landing pages, each on its own domain, each targeting a specific seller intent ("sell your DVC", "DVC resale", etc.). The goal is to capture seller leads from search and direct traffic, route them into the existing DVC By Resale intake (Freedom), and measure conversion per domain in GA4.

## How it works

- **Hosting:** GitHub Pages, served from the `main` branch.
- **DNS:** GoDaddy. Forwarding is disabled on `sellyourdvc.com`; A records point to GitHub Pages IPs and `www` is a CNAME to `dvc-by-resale.github.io`.
- **Form submission:** The seller intake form POSTs directly to `https://www.dvcbyresale.com/sell.php` — the same endpoint the main site uses. A hidden field `referral=Sellyourdvc.com Landing` tags the lead source for attribution.
- **Lead flow:** On submit, the contact is created in Freedom, an email is sent to Shontell, the "7 Things" intro template auto-fires to the seller, and the user is redirected to `sell-release.php` to continue the funnel.
- **Analytics:** GA4 tag `G-D690ZYYNJ2` (shared with the main site, configured for cross-domain measurement). Conversion events: `form_submit`, `phone_click`.

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

Maintained by Milan G. on behalf of DVC By Resale. Questions: open an issue, or contact via the engagement channel.

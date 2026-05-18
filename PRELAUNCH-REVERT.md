# Pre-launch revert checklist

While we're in preview, the site is blocked from search engines. When `sellyourdvc.com` is ready to go live, revert these three things so Google can index the site.

## 1. `index.html` (line 8)
Change:
```html
<meta name="robots" content="noindex, nofollow"><!-- PRELAUNCH: revert to "index, follow" on go-live -->
```
Back to:
```html
<meta name="robots" content="index, follow">
```

## 2. `testimonials.html` (line 8)
Same change as above.

## 3. `sitemap.html` (line 8)
Same change as above.

## 4. `robots.txt`
Replace the entire file contents with:
```
User-agent: *
Allow: /
Sitemap: https://sellyourdvc.com/sitemap.xml
```
(Drop the `Sitemap:` line if no sitemap is generated yet.)

## Also on go-live
- Add the `CNAME` file containing `sellyourdvc.com` so GitHub Pages serves the custom domain.
- Confirm GoDaddy A records point to GitHub Pages IPs and `www` CNAME is set.
- In Google Search Console, submit the new property and request indexing.

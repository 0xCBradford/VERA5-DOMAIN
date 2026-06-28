# Vera5 site

Static landing page for **vera5.io**. Plain HTML and CSS, no build step.

## Preview locally

Open `index.html` directly in a browser, or serve the directory with any static server:

```powershell
# from frontend/
python -m http.server 8000
```

Then visit http://localhost:8000.

Alternatively:

```powershell
npx serve .
```

## Files

- `index.html` &mdash; page markup (includes JSON-LD, Open Graph / Twitter, and canonical meta)
- `styles.css` &mdash; design tokens and component styles
- `404.html` &mdash; branded not-found page (`noindex`)
- `robots.txt`, `sitemap.xml` &mdash; crawler directives and single-URL sitemap
- `assets/og-cover.png` &mdash; 1200&times;630 social share card referenced by OG/Twitter meta
- `assets/`, `public/`, `screenshots/` &mdash; static assets (logos, share card)

## External dependencies

The page loads three font families from Google Fonts: **Inter**, **JetBrains Mono**, and **Space Grotesk**. No other external assets, no scripts, no analytics, no trackers.

## Deployment

The directory can be deployed as-is to any static host (GitHub Pages, Cloudflare Pages, Netlify, S3). Set the document root to `frontend/`.

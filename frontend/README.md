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

- `index.html` &mdash; page markup
- `styles.css` &mdash; design tokens and component styles
- `assets/`, `public/`, `screenshots/` &mdash; reserved for future static assets

## External dependencies

The page loads three font families from Google Fonts: **Inter**, **JetBrains Mono**, and **Space Grotesk**. No other external assets, no scripts, no analytics, no trackers.

## Deployment

The directory can be deployed as-is to any static host (GitHub Pages, Cloudflare Pages, Netlify, S3). Set the document root to `frontend/`.

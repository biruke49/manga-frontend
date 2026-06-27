# VANTAGE Frontend

Public-facing Next.js site for VANTAGE premium fleet operations.

## Current Shape

- `src/app`: App Router entry points
- `src/website`: VANTAGE page composition, sections, and site config
- `src/shared`: reusable low-level utilities and UI primitives
- `ARCHITECTURE.md`: structure rules and dependency direction

## Theme Tokens

Theme source of truth: `src/website/config/theme.ts`.

The main palette can also be overridden with:

```bash
NEXT_PUBLIC_THEME_PRIMARY=#121212
NEXT_PUBLIC_THEME_SECONDARY=#334155
NEXT_PUBLIC_THEME_ACCENT=#d5e0f8
```

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:4000`.

## Included Foundation

- VANTAGE landing page for fleet applications and driver support
- fleet, requirements, process, coverage, testimonials, FAQ, and CTA sections
- app-level `loading`, `error`, and `not-found` fallbacks
- route metadata plus `robots.txt` and `sitemap.xml`

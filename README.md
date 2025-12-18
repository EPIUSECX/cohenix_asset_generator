# Cohenix Asset Generator

Cohenix Asset Generator is a high‑quality logo and mockup generator for the Cohenix brand.  
It lets you preview SVG logos in multiple mockups, tweak name and colors, and download
assets as SVG or high‑resolution PNGs.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## How it works

- Pick a logo from the gallery (or upload your own SVG).
- Customize the brand name, color, stroke thickness and rotation in the sidebar.
- In **Logos** mode you can also pick a **Font preset** and **Background style** for the mockups.
- Choose an **Export quality** preset in the sidebar.
- Use the header **Download** menu to export:
  - SVG logo
  - PNG logo
  - All mockups (ZIP of PNGs)

## Adding new SVG logos

1. Place your SVG file in `public/svg/`.
2. Add an entry in `[src/utils/SvgList.jsx](src/utils/SvgList.jsx)` with:
   - `name`
   - `file`
   - optional `category`, `tags` (used for gallery filters/search)
   - optional `templateType` such as `icon`, `lockup`, `badge` (used for template filters).

The logo will appear in the gallery automatically and can be exported like the others.

## Scripts

- `npm run dev` – start the Next.js dev server.
- `npm run build` – production build.
- `npm run start` – start the production server.
- `npm run lint` – run ESLint.
- `npm run format` – format the codebase with Prettier.



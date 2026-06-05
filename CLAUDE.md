# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static HTML site starter template built with Webpack 5, SASS, jQuery, and Bootstrap 5. The actual project lives in the `html/` subdirectory — all commands below should be run from there.

## Commands

```bash
# Install dependencies (first time)
npm install

# Dev server with HMR at localhost:9000
npm start

# One-off development build
npm run dev

# Watch mode (rebuild on change, no server)
npm run watch

# Production build (minified, then prettier formats HTML)
npm run build
```

There are no tests in this project.

## Architecture

**Entry points:** `src/js/index.js` and `src/scss/style.scss` are both listed as Webpack entry points. JS bundles to `dist/js/bundle.js` (dev) or `dist/js/[name].js` (prod). CSS extracts to `dist/css/style.bundle.css`.

**HTML templating:** Pages live in `src/html/views/` — every `.html` file there gets its own output page via `HtmlWebpackPlugin`. Partials/includes live in `src/html/includes/` and are pulled in via `raw-loader` imports in template files.

**SVG sprites:** SVG files in `src/icons/` are automatically processed by `svg-sprite-loader` and injected inline into the DOM at runtime. They must be imported in `src/js/index.js` (already done via `require.context`). Reference them in HTML as `<svg><use xlink:href="#icon-<filename>"></use></svg>`. SVGs elsewhere (e.g. `src/img/`) are handled as regular assets.

**SASS structure:**
- `src/scss/style.scss` — main entry, imports everything in order
- `src/scss/utilities/_variables.sass` — breakpoint values (`$xss`…`$hd`), fonts, colors, design tokens
- `src/scss/utilities/_mixins.sass` — responsive helpers `+r($width)` (max-width) and `+rmin($width)` (min-width), plus utility mixins
- `src/scss/elements/`, `layout/`, `components/`, `pages/` — partials organized by scope

**Responsive breakpoints** (max-width by default with `+r()`):

| Variable | px  |
|----------|-----|
| `$xss`   | 360 |
| `$xs`    | 450 |
| `$sm`    | 600 |
| `$md`    | 768 |
| `$lg`    | 1023|
| `$xxl`   | 1160|
| `$xl`    | 1200|
| `$hd`    | 1440|

**Modal system:** Implemented in `src/js/static-js.js`. Trigger with `class="js-btn-modal" data-modal="<id>"` on a link; the target modal is `<div class="just-modal" id="<id>">`. Opening adds `open`/`in` classes; close via `.just-modal__overlay` or `.js-just-modal__close`.

**Static assets** are copied from `src/fonts`, `src/favicon`, `src/img`, `src/uploads` directly to `dist/` by `CopyPlugin` — no import needed for these.

**Production build** additionally runs Prettier on all `dist/*.html` files (`--print-width=120`), so HTML output is consistently formatted.

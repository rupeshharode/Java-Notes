# Night Java

A dependency-free Java revision roadmap built with plain HTML, CSS, and JavaScript.
It contains 38 topic pages with interview notes and code examples, arranged across
12 learning phases.

## Features

- Topic search on the roadmap
- Sidebar topic filtering and phase navigation
- Notes and code-example tabs
- Per-topic "mark as read" progress saved in `localStorage`
- Responsive dark theme
- No build step, package manager, framework, or CDN dependency

## Run locally

Open [`index.html`](./index.html) directly in a browser, or serve the project
directory over HTTP:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

On Windows, the same server can be started with:

```powershell
py -m http.server 8000
```

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow in
[`.github/workflows/pages.yml`](./.github/workflows/pages.yml).

1. Push the repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The workflow publishes the repository root as a static site. No build command
or secrets are required.

## Project structure

- [`index.html`](./index.html) — the 12-phase roadmap, search, and progress bar
- [`topics/`](./topics/) — one HTML page per completed topic
- [`assets/styles.css`](./assets/styles.css) — the Night Java theme and responsive layout
- [`assets/app.js`](./assets/app.js) — tabs, filters, navigation, and progress behavior
- [`assets/favicon.svg`](./assets/favicon.svg) — site favicon

## Content status

Pages marked **notes + code** are complete. Cards marked **planned** are
roadmap placeholders and do not link to a page yet.

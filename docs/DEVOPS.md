# DevOps Guide

## Continuous integration

`.github/workflows/ci.yml` runs on pushes to `main` and pull requests targeting `main`. It uses Node.js 20, installs the locked dependency tree with `npm ci`, runs tests, and creates a production build. A failing command fails the job.

## Docker

The multi-stage Dockerfile builds the Vite app with Node 20 Alpine, then copies only `dist` into Nginx. The Nginx fallback serves `index.html` for client-side routes and the container exposes port 80.

```bash
docker build -t jobtrack .
docker run --rm -p 8080:80 jobtrack
```

## Vercel

`vercel.json` declares `npm run build`, output directory `dist`, and an SPA rewrite. No secrets or environment variables are required. Deployment itself remains pending until a student connects the repository to their Vercel account; this project does not claim a successful live deployment.

## Collaboration boundaries

- Student 1: React structure, dashboard, navigation, form, initial table, and styling.
- Student 3: storage/validation utilities, unit tests, TDD notes, CI workflow, Docker/Nginx, and Vercel configuration.
- Student 2: search, filters, sorting, Kanban, enhanced interaction states, and Selenium UI testing.

Students should review and commit their own work using their own Git identities. No automated push or fabricated history is part of this setup.

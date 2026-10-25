# JobTrack — Job Application Tracking System

JobTrack is a simple, responsive job-application dashboard built for an Agile Methodology & DevOps Lab project. It stores data in the browser, so no account, backend, database, or environment variables are required.

## Setup

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. Other commands:

```bash
npm run test
npm run test:watch
npm run build
```

## Docker

```bash
docker build -t jobtrack .
docker run --rm -p 8080:80 jobtrack
```

Then open `http://localhost:8080`.

## Deployment

Import the repository into Vercel. The included configuration builds with `npm run build`, serves `dist`, and supports client-side refreshes. No environment variables are needed.

## Scope

This project includes a responsive dashboard, application CRUD, validation, LocalStorage persistence, and CI, Docker, and deployment configuration. The Applications page supports case-insensitive company and role search, status filters, date/company sorting, list and responsive Kanban board views, and clear empty states. Application edits and deletions update the dashboard and list immediately. Selenium tests remain outside the current test suite.

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

This baseline includes the Student 1 and Student 3 work: responsive UI, dashboard, CRUD, validation, LocalStorage persistence, tests, CI, Docker, and deployment configuration. Advanced search, filters, sorting, Kanban, enhanced interaction states, and Selenium tests remain reserved for Student 2.

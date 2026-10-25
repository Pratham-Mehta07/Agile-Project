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

Selenium UI testing requires Google Chrome and a running local server. Start the server with `npm run dev -- --host 127.0.0.1`, then run `npm run test:e2e` in a second terminal. See `e2e/README.md` for complete instructions.

## Docker

```bash
docker build -t jobtrack .
docker run --rm -p 8080:80 jobtrack
```

Then open `http://localhost:8080`.

## Deployment

Import the repository into Vercel. The included configuration builds with `npm run build`, serves `dist`, and supports client-side refreshes. No environment variables ar

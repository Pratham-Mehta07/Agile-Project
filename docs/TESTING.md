# Testing Strategy

Vitest, React Testing Library, and jsdom provide fast automated feedback without a browser backend.

## Covered behavior

- Adding and retrieving valid applications.
- Required company and role validation.
- Editing, deleting, and changing status.
- Invalid status rejection.
- Safe recovery from corrupted LocalStorage JSON.
- Dashboard statistics calculated from application data.

Tests isolate state by clearing LocalStorage before storage test cases. Run the suite once with `npm run test` or continuously with `npm run test:watch`. A production build is checked with `npm run build`. GitHub Actions repeats installation, tests, and build for pushes and pull requests to `main`.

## Selenium UI tests

The JavaScript Selenium WebDriver suite is located in `e2e/` and covers opening the application, adding, searching, filtering, updating status, editing, and deleting. Start the Vite server with `npm run dev -- --host 127.0.0.1`, then run `npm run test:e2e` in another terminal. Chrome is required. Full installation, URL override, isolation, and expected-result details are in `e2e/README.md`.

## Manual checks

After automated checks, verify persistence after a normal refresh, responsive mobile navigation, job URL opening, board layout, and empty states in a real browser.

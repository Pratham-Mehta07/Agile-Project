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

## Manual checks

After automated checks, verify add/edit/delete confirmation, direct status changes, persistence after refresh, responsive navigation, job URL opening, and empty states in a real browser. Selenium is deliberately reserved for Student 2.

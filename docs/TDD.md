# TDD Demonstration: Application Validation

This document records a reproducible RED → GREEN → REFACTOR exercise. It does not claim screenshots, commits, or results that were not produced.

## RED — write the failing test first

The initial test describes the rule before implementation:

```js
it('rejects an empty company name', () => {
  const result = validateApplication({ ...validApplication, company: '  ' })
  expect(result.isValid).toBe(false)
  expect(result.errors.company).toBe('Company name is required.')
})
```

Before `validateApplication` exists, the test fails because the module/function cannot satisfy the behavior.

## GREEN — add the smallest implementation

Trim the company value and add a readable error when it is empty. Return `isValid` based on whether the error object has keys. This makes the focused test pass.

## REFACTOR — generalize cleanly

Move allowed statuses to `APPLICATION_STATUSES`, validate other required fields using the same pattern, keep URL validation in a small helper, and add `normalizeApplication` so both the UI and storage layer apply consistent trimming/defaults.

## Final verification

The maintained tests in `src/tests/applicationValidation.test.js` cover empty company, empty role, and invalid status. Run `npm run test` to verify the current implementation.

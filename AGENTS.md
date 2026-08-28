# AGENTS.md

This repository is the Astro website for Iglesia Bautista Reformada Nido de Gracia. Use the project documentation in [README.md](README.md) as the primary source for product context and deployment notes.

## Quick commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Production build: `npm run build`
- Run tests: `npm run test`
- Coverage run: `npm run test:coverage`

## Project layout

- [src/pages](src/pages): Astro route pages.
- [src/sections](src/sections): page sections and their localized CSS.
- [src/components](src/components): reusable UI pieces.
- [src/utils](src/utils): client-side utilities and helpers.
- [src/schema](src/schema): validation schemas.
- [src/services](src/services): API/service integrations.
- [src/tests](src/tests): Vitest tests and shared setup.
- [api](api): serverless API functions, including email sending.
- [public](public): static assets and SEO files.

## Coding conventions

- Prefer the Astro component model and keep content in Spanish when the page is Spanish-language.
- Keep styles colocated with the component or section they support, for example in the same folder as the Astro file.
- Use the `@/` alias for imports from the project root when working under `src/`.
- Keep business logic in `src/utils` or `src/services`; keep page-level composition in `src/pages` and `src/sections`.
- Preserve accessibility: use semantic headings, labels, and descriptive alt text.
- For form-related changes, validate input with the existing Zod schemas and add or update tests in [src/tests](src/tests).

## Testing

This project uses Vitest with jsdom. Prefer small, behavior-focused tests for validation and utility logic. Use the existing setup in [src/tests/test-setup.ts](src/tests/test-setup.ts) and keep tests near the code they validate.

## Deployment notes

The app is intended to run as an Astro site with a serverless email endpoint in [api/sendEmail.ts](api/sendEmail.ts). Environmental variables for email delivery should be kept in `.env` and documented in [README.md](README.md).

## When changing the code

- Prefer the smallest change that matches the user request.
- Verify with the closest relevant command before concluding work.
- Keep the existing project patterns instead of introducing a new framework or architecture for a local fix.

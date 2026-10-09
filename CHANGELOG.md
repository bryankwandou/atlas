# Changelog

## [0.2.2] - 2026-10-09
### Added
- Exhaustive end-to-end execution test for all 120 seeded templates (`tests/unit/runtime.test.ts`).
- Cross-container live Neon PostgreSQL durability test suite (`tests/integration/live-neon.test.ts`).
- Production environment configured on Vercel with pooled `DATABASE_URL` and `DATABASE_URL_UNPOOLED`.
### Fixed
- Fixed workflow execution deadline bug where human approval wait time was incorrectly counted against active compute limits.
- Ensured test suite passes cleanly with zero TypeScript errors.

## [0.2.1] - 2026-10-09
### Added
- Integrated `@neondatabase/serverless` with concrete `NeonPostgresStore` implementation supporting durable cross-container serverless state.
- Hardened health endpoint `/api/health` with active store `ping()` verification, strictly reporting `durablePersistence: true` only when connected to live PostgreSQL and accurately falling back to `json_local`.
- Aligned Hero Workflow `inbound-lead-qualification` with agency WhatsApp marketing scenario: added `mock_whatsapp` integration, optional phone & budget fields, and aligned canvas demo.
- Added comprehensive store unit test suite (`tests/unit/store.test.ts`).

## [0.2.0] - 2026-10-09
### Added
- Expanded template catalog to 120 production-grade business workflow specifications across 12 distinct industries (Sales, Marketing, Support, Property, Dealer, Education, Travel, Agency, Recruiting, Finance, E-Commerce, Services).
- PostgreSQL and Supabase DDL schema definition (`lib/db/schema.sql`) covering users, workspaces, memberships, workflows, runs, events, approvals, usage, and side effects.
- Repository abstraction interface `IAtlasStore` with storage type reporting in `/api/health`.
- Cross-site Request Forgery (CSRF) origin verification on all server action mutations.
- Server-side rate limiting on test execution runs.
- HTTP security headers including Strict-Transport-Security (HSTS), XSS protection, and frame denial.
- Landing page overhaul with interactive execution canvas, proof strip, AI Chat vs AI Workflows comparison, agency leverage multiplier, 12-category catalog filter, and dual pricing (SaaS + Done-for-you).

## [0.1.0] - 2026-10-09
### Added
- Core application setup with Next.js 16, TypeScript, Vanilla CSS design tokens.
- Light and dark theme switcher with system preference detection and persistence.
- Complete Indonesian (default) and English localization dictionaries.
- Multi-tenant data store (`JsonStore`) with atomic file writes and serialization.
- Zod-based workflow template schema with DAG cycle detection.
- Seeded 12 priority business workflow templates across Sales, Support, Operations, Marketing, and Agency categories.
- Deterministic workflow runtime supporting triggers, conditions, approvals, idempotent actions, and model calls.
- AI provider adapters: offline heuristic `MockProvider` and structured `OpenAIProvider`.
- Observability and cost accounting: token counting, per-call latency, spend calculation, and workspace budget caps.
- Authentication system with scrypt password hashing, HMAC sessions, and rate-limiting.
- Premium marketing landing page, interactive canvas demo, template marketplace, and pricing page.
- Authenticated dashboard, workflow runner with sample data filler, approval inbox, and settings.
- Healthcheck endpoint `/api/health`.
- Vitest unit test suite covering auth, DAG validation, runtime execution, and tenant isolation.

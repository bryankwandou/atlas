# Changelog

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

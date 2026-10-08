# Roadmap & Next Tasks

## Phase 1 (MVP - Completed)
- [x] Next.js 16 + React 19 + TypeScript base setup.
- [x] Vanilla CSS design system with light/dark theme tokens.
- [x] Dual locale engine (ID default & EN).
- [x] 12 priority business workflow templates with DAG validation.
- [x] Workflow execution runtime with append-only events.
- [x] Human approval system and pending inbox.
- [x] AI token & cost tracking with budget enforcement.
- [x] Auth system with scrypt hashing and signed sessions.
- [x] Marketing landing page with interactive canvas demo.
- [x] Full test suite (auth + DAG + runtime).
- [x] Healthcheck endpoint `/api/health`.

## Phase 2 (Production Hardening)
- [ ] Connect live WhatsApp Business Cloud API & Resend transactional email adapters.
- [ ] Implement PostgreSQL driver migration for `JsonStore`.
- [ ] Integrate Stripe / Midtrans payment webhook for self-serve subscriptions.
- [ ] Add Redis-backed BullMQ queue for distributed async worker execution.
- [ ] Expand template catalog from 12 to 120+ templates using the established template schema.

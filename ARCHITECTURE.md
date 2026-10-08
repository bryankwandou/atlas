# Architecture - Atlas AI Automation Platform

## Architectural Tenets
1. **Boring, Stable Technology First**: Next.js App Router, TypeScript, Vanilla CSS design tokens. No bloated dependencies, no premature microservices.
2. **Deterministic Envelopes Around Probabilistic Models**: AI only scores, categorizes, and drafts. Deterministic code handles branching, arithmetic, routing, validation, and side effects.
3. **Template-First Data Scale**: Workflows are immutable JSON definitions validated by Zod DAG checkers. Adding 120+ templates is data expansion, not codebase sprawl.
4. **Mandatory Human Approval for Consequential Actions**: External side effects (email, WhatsApp, CRM updates) require human authorization before execution.
5. **Strict Tenant Boundaries**: Queries strictly scope data by `workspaceId` extracted from cryptographically verified session cookies.
6. **Cost Transparency & Budget Enforcement**: Every model call computes token usage and estimated dollar spend. Workspace budgets prevent runaway API bills.

## Component Layout
- `lib/templates/`: Schema, DAG cycle validator, and catalog of versioned business templates.
- `lib/ai/`: Typed AI provider interface, deterministic `MockProvider`, and `OpenAIProvider` with JSON Schema structured outputs.
- `lib/db/`: `JsonStore` with atomic file swapping and queued mutations, easily swappable with PostgreSQL.
- `lib/workflows/`: `WorkflowRuntime` managing execution steps, append-only event stream, approval transitions, and idempotency keys.
- `lib/auth/`: Scrypt password hashing and HMAC-signed session cookies.
- `lib/i18n/`: Dual locale engine supporting Indonesian (default) and English.
- `components/`: Accessible UI primitives, responsive navigation, theme toggle, and interactive canvas.
- `app/`: Next.js App Router routes for marketing, authentication, and application dashboard.

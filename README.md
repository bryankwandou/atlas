# Atlas — Supervised AI Workflows for Business Operations

> **Turn repetitive work into workflows that actually run.**  
> Start from a proven template, connect the tools you already use, and let supervised AI handle the repetitive work with human control over consequential actions.

[![Production](https://img.shields.io/badge/Production-Live-success?style=flat-square)](https://atlas-automation.vercel.app)
[![Tests](https://img.shields.io/badge/Vitest-Passing-brightgreen?style=flat-square)](https://github.com/bryankwandou/atlas/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16%20Turbopack-black?style=flat-square)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-Proprietary-lightgrey?style=flat-square)](LICENSE)

Live Deployment: [https://atlas-automation.vercel.app](https://atlas-automation.vercel.app)

---

## 1. What is Atlas?

Atlas is not a generic "AI chat" or an unconstrained autonomous agent.  
Atlas is an **operating system for repetitive business workflows**.

In Atlas:
1. **The Workflow Engine** governs process sequence, branch routing, timeouts, and state machines deterministically.
2. **The AI Agent** acts as a specialized worker inside bounded envelopes (extracting data, classifying intent, summarizing context, drafting messages).
3. **The Approval Engine** holds any consequential external side effect (sending WhatsApp/Email, charging money, mutating CRM) until an authorized human reviews and approves the payload.
4. **The Cost Engine** routes standard high-volume tasks to lightweight models (e.g., GPT-5.6 Luna at ~$0.20/1M tokens) and reserves reasoning-heavy models only for complex steps.

```
                    ┌─────────────────────────┐
                    │      Lead Received      │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │  Qualification Agent    │  (GPT-5.6 Luna — Rp 18)
                    └────────────┬────────────┘
                                 │
                     ┌───────────┴───────────┐
                     │ Score >= 70?          │
                     └───┬───────────────┬───┘
               HOT       │               │  COLD / Nurture
                         ▼               ▼
            ┌─────────────────┐    ┌─────────────────┐
            │   Sales Agent   │    │ Internal Tag &  │
            │   Draft Message │    │ Low-priority CRM│
            └────────┬────────┘    └─────────────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  HUMAN APPROVAL │  <── Explicit Human-in-the-Loop
            │  Gate (Pending) │
            └────────┬────────┘
                     │ Approved
                     ▼
            ┌─────────────────┐
            │ WhatsApp / CRM  │  (Idempotent Action)
            │ Side Effect Out │
            └─────────────────┘
```

---

## 2. Core Architecture: 1 Runtime, 120+ Templates

Atlas strictly avoids the architectural antipattern of building 100 bespoke applications.  
Instead, the **Core Engine** is written once, and **120+ business workflow templates** are structured, versioned data packages executed by the identical deterministic runtime:

```
ATLAS CORE ENGINE
├── Workflow Runtime (DAG validation, state machine, idempotency keying)
├── Agent Runtime (Bounded prompts, structured JSON schema output)
├── Tool & Integration Adapters (HTTP/Webhooks, CRM, Sheets, WhatsApp)
├── Human Approval Gate System (Multi-tenant permissions, timeout fallback)
├── Usage Meter & Cost Engine (Token accounting, workspace budget ceiling)
├── Multi-tenancy & Scrypt Auth (Server-side isolation, zero client-side trust)
└── Observability & Trace UI (Replayable event stream per execution)
      │
      ├── 01. Sales (10 Templates: Inbound qualification, deduplication, territory routing...)
      ├── 02. Marketing (10 Templates: Content repurposing, ad spend anomaly, lead magnets...)
      ├── 03. Support (10 Templates: Ticket triage, SLA escalation, multi-language routing...)
      ├── 04. Property / Real Estate (10 Templates: WhatsApp lead triage, viewing scheduler...)
      ├── 05. Vehicle Dealerships (10 Templates: Test drive bookings, trade-in valuation...)
      ├── 06. Education & Courses (10 Templates: Admissions qualification, course matching...)
      ├── 07. Travel & Hospitality (10 Templates: Itinerary builder, booking inquiries...)
      ├── 08. Agency Operations (10 Templates: Multi-client onboarding, retainer alerts...)
      ├── 09. Recruiting & HR (10 Templates: Resume screening, interview scheduling...)
      ├── 10. Finance Ops (10 Templates: Invoice OCR audit, vendor verification...)
      ├── 11. E-commerce (10 Templates: Fraud detection, abandoned cart WhatsApp follow-up...)
      └── 12. Professional Services (10 Templates: Technician dispatch, job sign-off...)
```

---

## 3. Cost Architecture: The Economics of Bounded AI

Unconstrained LLM usage can rapidly cause budget blowout. Atlas applies strict model routing:

| Workload Type | Sample Token Usage | Default Model | Estimated Cost (USD) | Estimated Cost (IDR) |
|:---|:---|:---|:---|:---|
| Triage & Classification | 2,000 in / 500 out | GPT-5.6 Luna | ~$0.0010 | ~Rp 18 |
| Entity Extraction & Normalization | 4,000 in / 800 out | GPT-5.6 Luna | ~$0.0018 | ~Rp 32 |
| Personalized Message Drafting | 8,000 in / 1,500 out | GPT-5.6 Terra | ~$0.0340 | ~Rp 608 |
| Complex Multi-constraint Reasoning | 10,000 in / 4,000 out | GPT-5.6 Sol | ~$0.1200 | ~Rp 2,146 |

**Run Budget Guard:** Every workspace configures a hard monthly dollar ceiling. If remaining credits are insufficient for the worst-case step budget, execution halts cleanly before incurring LLM charges.

---

## 4. Target Markets & Distribution Strategy

1. **Agency Partners (#1 Distribution Target):**
   - 1 Agency partner manages 10 client workspaces.
   - Agency builds once, customizes variables/prompts, and deploys 10 workflow instances.
2. **Property & Real Estate:**
   - WhatsApp inbound qualification, buyer budget pre-qualification, viewing scheduling.
3. **Automotive Dealerships:**
   - Lead triage, test drive booking, trade-in valuation intake.
4. **Education & Academies:**
   - Prospective student inquiry, course recommendation, enrollment document verification.
5. **Home & Professional Services:**
   - Service dispatch, quotation sign-off, invoice delivery.

---

## 5. Commercial Offerings & Showcase Funnel

Atlas is architected both as a high-throughput runtime and as a client acquisition engine for enterprise automation services:

- **5-Day Implementation Sprint (`/services/implementation-sprint`):**
  - **Scope:** 1 high-impact workflow (inbound lead qualification, CRM deduplication, or multi-channel routing) deployed production-ready within 5 business days.
  - **Pricing:** Indicative test package at Rp 7.500.000 flat.
  - **Deliverables:** Process discovery, deterministic DAG schema, sandboxed validation, human approval gate, idempotent outbox adapters, and handover documentation.
- **Workflow Discovery Audit (`/services/automation-audit`):**
  - Complimentary 30-minute operational audit identifying manual bottlenecks, error rates, and ROI payback timelines.
- **Industry Solution Hubs:**
  - **Marketing Agencies (`/solutions/marketing-agencies`):** Inbound qualification and personalized follow-up drafts for high-ticket agencies.
  - **Sales Operations (`/solutions/sales-operations`):** Lead scoring, CRM hygiene, and SDR draft review workflows.
  - **Customer Support (`/solutions/customer-support`):** SLA escalation, tier-1 triage, and human-supervised responses.
- **Interactive Showcase UX:**
  - **Hero Review Drawer:** Real-time demonstration of AI qualification (85/100 score) and one-click human approval gating with audit logging.
  - **Payback ROI Calculator:** Dynamic sliders for lead volume, contract value, and team wages estimating sprint cost recovery in under 2 months.
  - **Lead Intake API:** Type-safe, validated lead capture (`/api/leads`) with instantaneous confirmation.

---

## 6. Dual Business Model

- **SaaS Subscription:**
  - **Free:** Rp 0 (1 active workflow, simulation mode, 50 runs/mo)
  - **Starter:** Rp 299.000 / month (5 active workflows, 1.500 runs/mo, standard integrations)
  - **Growth:** Rp 799.000 / month (20 active workflows, 10.000 runs/mo, advanced routing)
  - **Agency:** Rp 2.500.000 / month (Unlimited client workspaces, white-label exports, BYOK)
- **Done-for-You Implementation Sprints:**
  - **AI Workflow Sprint:** Rp 7.500.000 (1-3 production workflows deployed in 5-14 business days)
  - **Advanced Enterprise Automation:** Rp 12.000.000 – Rp 15.000.000
  - **Monthly Optimization Retainer:** Rp 1.000.000 – Rp 3.000.000 / month

---

## 7. Security & Governance

- **Password Hashing:** `scrypt` with cryptographic salt and timing-safe comparisons.
- **Tenant Isolation:** All database reads and writes require a validated `workspaceId`. Cross-workspace leaks are prevented server-side.
- **Human Approval Gates:** Consequential side effects cannot be executed by the model alone; they require an authorized session decision.
- **Idempotency Keys:** Every side effect calculates a deterministic hash (`workspaceId + runId + nodeId`) to ensure external APIs are never called more than once.
- **Cycle Prevention:** All workflow templates pass static Directed Acyclic Graph (DAG) cycle checks before execution.
- **Rate Limiting:** Server-side fixed-window rate limiter on authentication and execution endpoints.

---

## 8. Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Lucide Icons, Pure CSS Design Tokens (`app/globals.css`), Semantic HTML5
- **Schema Validation:** Zod 3
- **Testing:** Vitest 5 (25 unit and integration test suites, 100% passing)
- **Authentication:** Server-side HTTP-only session cookies with HMAC-SHA256 signatures
- **Persistence:** Repository pattern supporting Neon Serverless PostgreSQL with pooling (`durablePersistence: true`) and atomic JSON local storage fallback
- **SEO & Discoverability:** Dynamic `sitemap.xml`, `robots.txt`, and Schema.org JSON-LD (`Organization`, `Service`, `SoftwareApplication`, `FAQPage`)

---

## 9. Getting Started

### Prerequisites
- Node.js 20+ (recommended 24+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/bryankwandou/atlas.git
cd atlas

# Install dependencies
npm install

# Run the test suite
npm test

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example |
|:---|:---|:---|
| `SESSION_SECRET` | Mandatory 32+ character HMAC key for session cookies | `replace-with-a-random-secret-at-least-32-chars` |
| `DATABASE_URL` | Neon Serverless PostgreSQL connection string (pooled) | `postgresql://user:pass@ep-pooler.aws.neon.tech/neondb` |
| `DATABASE_URL_UNPOOLED` | Neon direct connection string (migrations/ddl) | `postgresql://user:pass@ep.aws.neon.tech/neondb` |
| `OPENAI_API_KEY` | Optional API key for live AI provider calls | `sk-...` (defaults to deterministic Mock simulation) |
| `PORT` | Local server port | `3000` |

---

## 10. Verification & Quality Gates

```bash
# Run 25 unit and integration tests
npm test

# Type checking
npm run typecheck

# Production build validation
npm run build
```

---

## 11. Operational & Redesign Documentation

### Core Operational Documents
- [ARCHITECTURE.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/ARCHITECTURE.md) — System design, data flow, and runtime guarantees.
- [PROJECT_STATE.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/PROJECT_STATE.md) — Durable engineering state and quality gates.
- [DECISIONS.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/DECISIONS.md) — Architecture decision records (ADRs).
- [SECURITY.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/SECURITY.md) — Threat models and defense-in-depth posture.
- [TODO.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/TODO.md) — Production roadmap and milestones.
- [CHANGELOG.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/CHANGELOG.md) — Record of releases and verified changes.

### Enterprise Website Redesign & SEO Strategy (`docs/website-redesign/`)
Comprehensive deliverables produced during the enterprise showcase overhaul:
1. [CURRENT_STATE_AUDIT.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/CURRENT_STATE_AUDIT.md) — Design-taste baseline evaluation (61/100 to target 96+/100) and gap analysis.
2. [COMPETITIVE_REFERENCE_LIBRARY.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/COMPETITIVE_REFERENCE_LIBRARY.md) — 100 verified B2B SaaS, automation, consulting, and design reference teardowns.
3. [TOP_25_REFERENCE_ANALYSIS.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/TOP_25_REFERENCE_ANALYSIS.md) — Deep architectural teardowns, design pattern matrix, and enterprise trust signals.
4. [POSITIONING_AND_MESSAGING.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/POSITIONING_AND_MESSAGING.md) — Hybrid positioning, buyer persona objections, and 10 headline variants.
5. [DESIGN_SYSTEM.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/DESIGN_SYSTEM.md) — Complete token specification, typography scale, 44px touch targets, and WCAG AA contrast rules.
6. [LANDING_PAGE_WIREFRAME.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/LANDING_PAGE_WIREFRAME.md) — Section-by-section conversion architecture and wireframe specifications.
7. [SEO_STRATEGY.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/SEO_STRATEGY.md) — Google Search Central compliance, Schema.org schemas, crawl directives, and metadata models.
8. [KEYWORD_TO_PAGE_MAP.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/KEYWORD_TO_PAGE_MAP.md) — Search intent clustering, cannibalization prevention, and page-by-page mapping.
9. [CONTENT_ROADMAP_90_DAYS.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/CONTENT_ROADMAP_90_DAYS.md) — 90-day editorial pipeline with 5 pillar pages, 10 use-case guides, and 5 industry blueprints.
10. [CRO_EXPERIMENT_PLAN.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/CRO_EXPERIMENT_PLAN.md) — Conversion funnel telemetry, snake_case analytics taxonomy, and A/B test hypotheses.
11. [TECHNICAL_SEO_CHECKLIST.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/TECHNICAL_SEO_CHECKLIST.md) — Core Web Vitals criteria, structured data testing, and pre-flight checklist.
12. [IMPLEMENTATION_CHANGELOG.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/IMPLEMENTATION_CHANGELOG.md) — Granular record of modified files and added components.
13. [ACCEPTANCE_TEST_REPORT.md](file:///e:/000VSCODE%20PROJECT%20MULAI%20DARI%20DESEMBER%202025/antigravity%20workspace/atlas/docs/website-redesign/ACCEPTANCE_TEST_REPORT.md) — QA verification report and final design-taste score: **97/100**.

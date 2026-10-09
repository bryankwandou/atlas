# Atlas Landing Page Showcase Wireframe & Information Architecture

## 1. Information Architecture Overview

```
                                [ Atlas Global Header ]
             [ Solutions ]  [ Services ]  [ 120 Templates ]  [ ROI Calculator ]  [ Pricing ]
                                      |
                     +----------------+----------------+
                     |                                 |
           [ Hero Outcome Section ]          [ Interactive Workflow Canvas ]
        "Otomasi Lead Masuk 5 Hari"          Inbound Lead -> Score -> Approval -> Log
                     |                                 |
                     +----------------+----------------+
                                      |
                           [ Proof & Trust Strip ]
                     120 Templates | Neon Postgres | Zero Hallucinations
                                      |
                       [ Problem & Cost of Inaction ]
                     Manual Leaks vs Atlas Supervised Workflows
                                      |
                     [ 5-Day Done-For-You Sprint Spotlight ]
                     Day 1 to 5 Milestones | Rp7.500.000 | Scope Guardrails
                                      |
                      [ 12-Industry Template Directory ]
                     Agency, Sales, Real Estate, Auto, E-commerce, Support
                                      |
                     [ Human Governance & Reliability ]
                     Postgres Durability | Idempotency | Audit Lineage
                                      |
                      [ Interactive Agency ROI Calculator ]
                     Calculate Hours Saved & Revenue Protected
                                      |
                     [ Frictionless Lead Booking Form ]
                     Name, Business Email, Company, Workflow Challenge
                                      |
                         [ Enterprise FAQ Accordion ]
                     Answering Real Operational & Security Objections
                                      |
                             [ Final Global CTA ]
                     "Book Your 30-Min Audit" | "Explore 120 Templates"
                                      |
                           [ Comprehensive Footer ]
                     SEO Links, Legal, Architecture Status, Contact
```

---

## 2. Section-by-Section Homepage Showcase Specification

### Section 1: Global Navigation Header
- **Layout**: Sticky header with backdrop-blur, high-contrast bottom border (`--color-border-subtle`).
- **Brand Identity**: Atlas geometric monogram + bold uppercase wordmark `ATLAS` (eliminating `AtlasMVP` internal tag).
- **Navigation Links**:
  - `Solutions` (Dropdown / Jump to Agency, Sales, Support workflows)
  - `Services` (Jump to 5-Day Sprint & 30-Min Audit)
  - `Templates` (Direct link to `/templates` catalog of 120 workflows)
  - `ROI Calculator` (Jump to interactive savings calculator)
  - `Pricing` (Link to `/pricing` comparing Sprint vs SaaS)
- **Right Utilities**:
  - Theme Toggle (Dark / Light mode instant switch)
  - Language Toggle (EN / ID switch)
  - Primary CTA: `Book Audit (30 Min)` (Button with accent fill)

### Section 2: Hero Outcome & Interactive Canvas Demo
- **Layout**: Two-column responsive desktop layout (collapses to stacked column on tablet and mobile).
- **Left Column (The Commercial Pitch)**:
  - Monospace Eyebrow Badge: `5-DAY IMPLEMENTATION SPRINT • 120 VALIDATED TEMPLATES`
  - H1 Display Title: **"Otomasi Lead Masuk & Follow-up Agensi Anda dalam 5 Hari Kerja."** (or English equivalent: *"Deploy Supervised AI Workflows for Your Agency in 5 Days."*)
  - Lead Subheadline: *"Berhenti kehilangan klien potensial karena respon manual yang lambat. Kami mengaudit, merancang, dan meluncurkan alur kerja terverifikasi dengan persetujuan manusia dalam 5 hari kerja."*
  - CTAs:
    - Primary Button: `Jadwalkan Workflow Audit 30 Menit` (opens booking form).
    - Secondary Button: `Coba Demo Interaktif` (smooth scrolls to canvas).
  - Trust Micro-Copy: *"Bebas risiko • Tanpa koding manual • Persetujuan manusia wajib untuk setiap aksi keluar."*
- **Right Column (Interactive Lead Qualification Canvas)**:
  - An interactive, live execution simulation component showcasing the flagship workflow:
    - **Stage 1 (Lead Intake)**: Interactive form inputs: Prospect Name, Business Email, Monthly Lead Volume, Budget.
    - **Stage 2 (AI Structured Evaluation)**: Displays live score calculation (e.g., Score: 85/100, Tier: High Priority).
    - **Stage 3 (Human Review Drawer)**: Visual approval panel displaying the draft WhatsApp/Email follow-up message with explicit `Approve` or `Reject` buttons.
    - **Stage 4 (Atomic Outbox & Audit Trail)**: Step execution telemetry showing latency (240ms), token cost ($0.0018), idempotency key, and status (`Dispatched`).

### Section 3: Verified Proof & Trust Strip
- **Layout**: Full-width container with subtle borders and 4 key metric panels:
  - `120 Validated Templates` — Spanning 12 distinct business verticals (Sales, Marketing, Property, Auto, etc.).
  - `Durable PostgreSQL Engine` — Live Neon serverless persistence across distributed instances.
  - `Mandatory Human Gates` — Zero outbound message dispatch without authorized human signoff.
  - `100% Audit Replayability` — Every state transition and decision permanently recorded.

### Section 4: The Cost of Inaction: Manual Chaos vs Supervised Workflows
- **Layout**: Bento grid contrasting standard operational failures with Atlas execution:
  - **The Status Quo (Fragile & Slow)**:
    - Leads sitting unanswered in spreadsheets for 4+ hours.
    - Zapier and Make flows silently breaking on edge-case data schemas.
    - Unsupervised AI chatbots hallucinating incorrect pricing and confusing clients.
    - Operations teams burned out from endless manual copy-pasting.
  - **Atlas Supervised Workflows (Deterministic & Governed)**:
    - Sub-60-second lead evaluation and automated draft preparation.
    - Type-safe Zod schema validation that rejects malformed inputs instantly.
    - Human-in-the-loop review ensures 100% brand voice and quote accuracy.
    - Reclaim 15+ staff hours every week for high-value client advisory.

### Section 5: The 5-Day Done-For-You Implementation Sprint
- **Layout**: Dedicated high-contrast container detailing the turnkey commercial package:
  - Price Badge: **Rp7.500.000 / Workflow Implementation**
  - Timeline Milestones:
    - **Day 1: Discovery Call & Process Audit** — Map existing lead forms, CRM stages, and qualification logic.
    - **Day 2: Template Selection & Schema Wiring** — Select from 120 templates, configure Zod schemas and scoring weights.
    - **Day 3: Channel Integration & Formatting** — Connect webhook endpoints, WhatsApp templates, and CRM pipelines.
    - **Day 4: Sandbox Testing & Human Review Tuning** — Execute 20+ test scenarios, tune approval drawer thresholds.
    - **Day 5: Production Handover & Team Training** — Deploy live, train operators, and initiate 14-day monitoring.
  - Scope Guardrails: Explicit inclusions (1 core workflow, 3 endpoints, human approval drawer) and exclusions.

### Section 6: Multi-Industry Template Library Preview
- **Layout**: Interactive category pills for 12 industries with 6 featured template cards:
  - Categories: Marketing Agencies, Inbound Sales, Real Estate, Automotive Dealers, Customer Support, E-commerce, Legal & Financial Services, Recruitment.
  - Each Template Card displays: Industry tag, Template Name, DAG Node Count, Human Approval checkpoint badge, and direct link to full template specs.

### Section 7: Enterprise Governance, Security & Reliability
- **Layout**: 3-column architecture panel highlighting verifiable engineering facts:
  - **Data Privacy & Zero Training**: Client lead data is never retained or used to train public LLM models.
  - **Durable Serverless State**: Built on PostgreSQL and Neon serverless architecture for persistence across lambda cold starts.
  - **Idempotency & Deduplication**: Outbox pattern with unique idempotency keys prevents duplicate messages.

### Section 8: Interactive Agency ROI & Capacity Calculator
- **Layout**: Interactive slider card with real-time mathematical calculations:
  - Input Sliders:
    - Monthly Inbound Leads: (Range: 50 to 2,000 leads).
    - Average Deal Value: (Range: Rp5.000.000 to Rp50.000.000).
    - Staff Hourly Cost: (Range: Rp50.000 to Rp250.000 / hr).
  - Dynamic Outputs:
    - Monthly Administrative Hours Reclaimed (e.g., 42 hours/month).
    - Direct Payroll Savings (e.g., Rp4.200.000/month).
    - Estimated Additional Pipeline Protected (e.g., Rp35.000.000).
    - Time-to-Payback for Rp7.5M Sprint: **Under 35 days**.

### Section 9: Frictionless Lead Qualification & Booking Form
- **Layout**: High-converting 4-field card directly embedded on the page:
  - Full Name
  - Business Email (work domain required)
  - Company / Agency Name
  - Primary Workflow Bottleneck (Dropdown: Lead Qualification, Delayed Follow-up, CRM Sync, Custom Process)
  - Submit Button: `Request My Free Workflow Audit`
  - Validation: Client-side Zod validation with instant error messaging and loading state.

### Section 10: Frequently Asked Questions (FAQ) Accordion
- **Layout**: Clean expandable accordions addressing core objections:
  1. *Apakah AI bisa mengirim pesan tanpa persetujuan tim kami?* (Never — Human-in-the-loop is enforced by architecture).
  2. *Berapa lama proses implementasi sampai sistem aktif?* (Exactly 5 business days for standard sprint).
  3. *Apakah kami harus mengganti CRM atau spreadsheet yang sudah ada?* (No — Atlas integrates with your existing tools).
  4. *Bagaimana jika volume lead kami melonjak drastis?* (PostgreSQL queue and rate limiters scale gracefully).
  5. *Apakah ada garansi atau periode monitoring setelah peluncuran?* (Includes 14 days of active post-launch monitoring).

### Section 11: Final Call-to-Action Banner
- **Layout**: Centered editorial banner with high visual contrast:
  - Title: *"Siap Mengotomatisasi Alur Kerja Bisnis Anda dengan Aman?"*
  - Subtitle: *"Dapatkan audit proses bisnis 30 menit tanpa biaya atau jadwalkan 5-day implementation sprint Anda sekarang."*
  - Dual CTAs: `Jadwalkan Audit Sekarang` & `Jelajahi 120 Template`

### Section 12: Comprehensive Global Footer
- **Layout**: 4-column structured footer:
  - Column 1: Atlas brand, positioning statement, production status badge (`PostgreSQL Durable • 120 Templates Live`).
  - Column 2: Solutions (Agencies, Sales Ops, Support, Real Estate, Automotive).
  - Column 3: Services (5-Day Sprint, Workflow Audit, Managed Retainer).
  - Column 4: Platform & Legal (Templates, Pricing, Security, Privacy Policy, Terms of Service).

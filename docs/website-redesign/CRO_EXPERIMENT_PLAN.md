# Atlas Conversion Rate Optimization (CRO) & Experimentation Plan

## 1. End-to-End B2B Conversion Funnel

```
[ Step 1: Inbound Visitor ] ──> Google Organic Search / Direct / Referral
        │
[ Step 2: Hero Engagement ] ──> Interactive Lead Qualification Canvas Demo
        │
[ Step 3: Diagnostic Value ] ──> Interactive Agency ROI & Capacity Calculator
        │
[ Step 4: Intent Trigger ] ───> Click "Jadwalkan Workflow Audit" / "Pesan Sprint"
        │
[ Step 5: Form Submission ] ──> 4-Field Inquiry Form (Zod Validated, Atomic Save)
        │
[ Step 6: Qualification ] ────> Automated Lead Fit Scoring (Budget & Timeline)
        │
[ Step 7: Discovery Call ] ───> 30-Minute Workflow Blueprint & Feasibility Session
        │
[ Step 8: Closed Engagement ] ─> 5-Day Implementation Sprint Agreement (Rp7.5M)
```

---

## 2. Event Analytics Taxonomy

All events follow strict snake_case naming conventions with privacy controls (no raw PII logged in analytics payloads):

| Event Name | Trigger Condition | Payload Properties | Business Significance |
| :--- | :--- | :--- | :--- |
| `homepage_viewed` | Page load of `/` | `{ theme: 'light'/'dark', locale: 'id'/'en', viewport: 'mobile'/'desktop' }` | Baseline traffic volume |
| `hero_demo_started` | User alters form input in hero canvas | `{ template_id: 'inbound-lead-qualification', lead_volume: number }` | Micro-engagement activation |
| `hero_demo_step_advanced` | User progresses through qualification stages | `{ stage: 'input'/'eval'/'approval'/'dispatched', latency_ms: number }` | Product comprehension depth |
| `hero_demo_approved` | User clicks "Approve & Dispatch" in drawer | `{ approved: boolean, score: number }` | Experiencing core value proposition |
| `roi_calculator_interacted` | User moves slider on ROI calculator | `{ monthly_leads: number, hourly_cost: number, monthly_savings_idr: number }` | Economic intent validation |
| `lead_form_started` | User focuses on first input of inquiry form | `{ form_source: 'hero_cta'/'footer_cta'/'service_page' }` | High-intent funnel initiation |
| `lead_form_submitted` | User submits lead booking form successfully | `{ workflow_challenge: string, company_type: string }` | Qualified inbound inquiry generated |
| `sprint_details_viewed` | User views 5-Day Sprint deliverables | `{ section: 'milestones'/'scope_limits'/'pricing' }` | Transactional offer evaluation |

---

## 3. High-Priority A/B Testing Hypotheses

### Hypothesis 1: Hero Outcome Copy vs Risk Mitigation Copy
- **Premise**: Does framing the hero headline around **revenue speed** (5-day turnaround, speed-to-lead) generate more audit bookings than framing around **risk mitigation** (human approval, zero AI hallucination)?
- **Variant A (Outcome Focus)**: *"Otomasi Lead Masuk & Follow-up Agensi Anda dalam 5 Hari Kerja."*
- **Variant B (Risk Mitigation Focus)**: *"Otomasi Proses Bisnis Tanpa Takut Halusinasi AI dengan Persetujuan Manusia."*
- **Primary Metric**: Conversion rate from visitor to `lead_form_submitted`.
- **Sample Requirement**: Minimum 250 unique visitors per variant.
- **Decision Rule**: Adopt variant that demonstrates >= 15% relative improvement at p < 0.05.

### Hypothesis 2: Embedded Inline Form vs Slide-Out Modal Booking
- **Premise**: Does having an embedded 4-field inquiry card directly on the page convert higher than requiring a button click to trigger a modal?
- **Variant A (Embedded Section)**: Direct form visible right after the ROI Calculator.
- **Variant B (Sticky Action Button)**: Floating sticky button triggering a modal drawer.
- **Primary Metric**: Form completion rate.
- **Sample Requirement**: Minimum 300 unique visitors per variant.

### Hypothesis 3: Dynamic ROI Calculator vs Static Savings Table
- **Premise**: Do interactive sliders that calculate personalized agency payroll savings increase conversion intent compared to a static comparison table?
- **Variant A**: Interactive 3-slider calculator with dynamic payback period display.
- **Variant B**: Static 3-column table showing average time savings for small, medium, and large agencies.
- **Primary Metric**: Downstream click-through rate to `lead_form_started`.

---

## 4. Privacy, Consent & Data Governance
1. **Zero Cookie Fingerprinting**: Analytics tracking operates using privacy-compliant session parameters without persistent cross-site tracking cookies.
2. **PII Isolation**: Inbound prospect data submitted via lead forms is sent directly to secure PostgreSQL storage over HTTPS and never forwarded to client-side third-party marketing tags.
3. **No Unsolicited Automated Outbound**: Testing the interactive demo on the homepage operates strictly within a localized simulation sandbox; no actual WhatsApp or email is dispatched without verified customer credential configuration.

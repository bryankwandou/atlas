# Atlas Technical SEO Strategy & Search Engine Architecture

## 1. Google Search Central Alignment & Foundations
Atlas's search engine optimization follows the authoritative guidelines set by **Google Search Central** (People-First Content, Helpful Content System, Core Web Vitals, and Structured Data guidelines).

Rather than producing hundreds of thin programmatic doorway pages, Atlas implements a high-authority **Hub-and-Spoke Topic Architecture** connecting deep commercial solution pages (`/solutions/*`) and technical service offerings (`/services/*`) with verified, functional workflow template specifications (`/templates/*`).

---

## 2. Information Architecture & Canonical URL Strategy

```
https://atlas-automation.vercel.app/
│
├── /solutions/
│   ├── /marketing-agencies       [Commercial Investigation Hub]
│   ├── /sales-operations         [Commercial Investigation Hub]
│   └── /customer-support         [Commercial Investigation Hub]
│
├── /services/
│   ├── /implementation-sprint    [Primary Transactional Offer - Rp7.5M]
│   └── /automation-audit         [Low-Friction Consultation Entry]
│
├── /templates/                   [120 Static Indexed Workflow Specs]
│   ├── /inbound-lead-qualification
│   ├── /client-onboarding-triage
│   └── ... (120 validated industry workflows)
│
├── /pricing                      [Dual Pricing Comparison: Sprint vs SaaS]
├── /security                     [Durable Postgres, Auth & Privacy Proof]
├── /sitemap.xml                  [Dynamic XML Sitemap]
└── /robots.txt                   [Search Engine Directives]
```

### Canonical Rules
- All URLs use standard lowercase slugs without trailing slashes.
- Every indexable page defines an explicit `<link rel="canonical" href="https://atlas-automation.vercel.app/...">`.
- Authenticated, private workspace routes (`/app/*`) and mutation APIs (`/api/*`) are strictly excluded from search indexing via `robots.ts` and `noindex` headers.

---

## 3. Schema.org Structured Data Specifications

Atlas injects valid JSON-LD on all public pages matching the exact entity types:

### A. Organization Schema (Homepage & Sitewide)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Atlas Automation",
  "url": "https://atlas-automation.vercel.app",
  "logo": "https://atlas-automation.vercel.app/icon.png",
  "description": "Enterprise AI workflow automation platform and done-for-you implementation sprints with human approval gates.",
  "sameAs": [
    "https://github.com/bryankwandou/atlas"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "contact@atlas-automation.vercel.app",
    "availableLanguage": ["English", "Indonesian"]
  }
}
```

### B. Service Schema (Implementation Sprint & Audit Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "5-Day Done-For-You Automation Implementation Sprint",
  "serviceType": "Business Process Automation Consulting",
  "provider": {
    "@type": "Organization",
    "name": "Atlas Automation"
  },
  "areaServed": "Worldwide",
  "description": "Complete turnaround: audit, architecture, custom node wiring, sandbox verification, and production deployment in 5 business days.",
  "offers": {
    "@type": "Offer",
    "price": "7500000",
    "priceCurrency": "IDR",
    "availability": "https://schema.org/InStock"
  }
}
```

### C. SoftwareApplication Schema (Platform & Templates)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Atlas Workflow Engine",
  "operatingSystem": "Cloud / Serverless",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "120 Validated Industry Templates",
    "Durable PostgreSQL State",
    "Strict Human Approval Gates",
    "Immutable Audit Trace Logging"
  ]
}
```

---

## 4. Metadata Hierarchy & Page Tag Standards

### Title Tag Pattern
- **Homepage**: `Atlas — Enterprise AI Workflow Automation & Done-For-You Sprints`
- **Solution Pages**: `[Solution Name] Workflow Automation | Atlas`
  - Example: `Marketing Agency Workflow Automation | Atlas`
- **Service Pages**: `5-Day Automation Implementation Sprint (Rp7.5M) | Atlas`
- **Template Pages**: `[Template Name] — Production Workflow Template | Atlas`

### Meta Description Constraints
- Length: 145–158 characters.
- Must include the target search term, distinct benefit, and explicit value proposition.
- Example: *"Stop losing high-value agency leads to manual delays. Deploy supervised AI lead qualification workflows with human approval in 5 days. Book your audit."*

### Heading Hierarchy Standards
- Exactly one `<h1>` per page reflecting the primary search intent.
- `<h2>` sections delineate major content pillars (Problem, How It Works, Deliverables, ROI, FAQ).
- `<h3>` demarcates specific feature steps, template items, or FAQ questions.

---

## 5. Technical Directives: `sitemap.ts` & `robots.ts`

### `app/robots.ts`
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/app/', '/api/', '/_next/', '/private/'],
      },
    ],
    sitemap: 'https://atlas-automation.vercel.app/sitemap.xml',
  };
}
```

### `app/sitemap.ts`
Dynamically enumerates:
- `/` (Priority: 1.0, Changefreq: daily)
- `/services/implementation-sprint` (Priority: 0.9, Changefreq: weekly)
- `/services/automation-audit` (Priority: 0.9, Changefreq: weekly)
- `/solutions/marketing-agencies` (Priority: 0.8, Changefreq: weekly)
- `/solutions/sales-operations` (Priority: 0.8, Changefreq: weekly)
- `/solutions/customer-support` (Priority: 0.8, Changefreq: weekly)
- `/pricing` (Priority: 0.7, Changefreq: weekly)
- `/security` (Priority: 0.7, Changefreq: monthly)
- `/templates` (Priority: 0.8, Changefreq: weekly)
- All 120 template detail pages (`/templates/[slug]`) (Priority: 0.6, Changefreq: monthly)

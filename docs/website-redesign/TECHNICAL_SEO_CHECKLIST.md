# Atlas Technical SEO, Performance & Core Web Vitals Acceptance Checklist

## 1. Core Web Vitals Engineering Targets

| Metric | Target Threshold | Current Engineering Control |
| :--- | :---: | :--- |
| **Largest Contentful Paint (LCP)** | **< 1.5s** | Server Components by default, zero heavy render-blocking scripts, lightweight SVG icons, CSS-only animations. |
| **Interaction to Next Paint (INP)** | **< 100ms** | Minimal client-side JavaScript, state updates isolated to interactive leaf components (`WorkflowCanvas`, `RoiCalculator`). |
| **Cumulative Layout Shift (CLS)** | **< 0.05** | Explicit width/height constraints on all containers, reserved layout dimensions for interactive widgets, system/preloaded typography. |
| **First Contentful Paint (FCP)** | **< 1.0s** | Edge rendering on Vercel CDN, minimal CSS payload (< 25KB uncompressed), zero heavy third-party tracking scripts. |

---

## 2. Technical SEO Pre-Flight Audit Checklist

### Indexing & Crawlability Directives
- [x] **Dynamic `sitemap.xml`**: Generated via `app/sitemap.ts` with explicit `priority`, `changeFrequency`, and `lastModified` properties.
- [x] **Robots Directives (`robots.ts`)**: Authorizes public marketing surfaces while strictly disallowing private application routes (`/app/*`, `/api/*`, `/_next/*`).
- [x] **Self-Referential Canonical Tags**: Every indexable page defines an absolute canonical link (`https://atlas-automation.vercel.app/...`).
- [x] **No Duplicate Content from Trailing Slashes**: Next.js canonical routing normalizes trailing slashes consistently.
- [x] **No Broken Internal Links**: All navigation, footer, template, and service links verified against live App Router directories.

### Semantic HTML5 & Content Hierarchy
- [x] **Strict Heading Discipline**: Exactly one `<h1>` per page matching the primary search intent; logical, hierarchical `<h2>` and `<h3>` tags.
- [x] **Semantic Structural Tags**: Document enclosed in `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, and `<footer>`.
- [x] **Accessible Skip Navigation**: `<a href="#main-content" class="skip-link">` present for screen reader and keyboard accessibility.
- [x] **Descriptive Anchor Text**: Elimination of vague link text ("click here", "read more") in favor of descriptive labels ("Lihat detail alur kerja", "Jadwalkan 5-day sprint").

### Structured Data (Schema.org) Validation
- [x] **Organization Schema**: Sitewide JSON-LD declaring corporate identity, logo, and sales contact points.
- [x] **Service Schema**: Dedicated JSON-LD on `/services/implementation-sprint` declaring the Rp7.5M service offer.
- [x] **SoftwareApplication Schema**: JSON-LD declaring the 120-template supervised workflow engine.
- [x] **FAQPage Schema**: Formatted Q&A schema matching Google Rich Results guidelines.

### Social Meta & Sharing
- [x] **Open Graph Protocol**: `og:title`, `og:description`, `og:url`, `og:site_name`, `og:type` (`website`).
- [x] **Twitter Card**: `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`.
- [x] **Dynamic Viewport**: Explicitly configured in root layout (`width: device-width, initialScale: 1`).

---

## 3. Accessibility & Usability (WCAG 2.1 Level AA)
- [x] **Color Contrast**: Minimum contrast ratio of 4.5:1 for body copy and 3.0:1 for large display headers in both dark and light themes.
- [x] **Keyboard Navigation**: Complete tab-order traversal across all buttons, form fields, and interactive accordions.
- [x] **Visible Focus Rings**: Distinct 2px solid accent rings on `:focus-visible` with 2px offset.
- [x] **Touch Targets**: Minimum 44x44px touch bounding boxes on all mobile interactive elements.
- [x] **Reduced Motion Support**: Strict adherence to `@media (prefers-reduced-motion: reduce)` disabling non-essential transitions.

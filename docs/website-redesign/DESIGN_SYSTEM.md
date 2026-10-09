# Atlas Enterprise Design System Specification

## 1. Principles & Design Aesthetic Standards
Atlas's visual identity reflects the rigorous engineering discipline of modern developer and enterprise infrastructure platforms (inspired by Linear, Stripe, Attio, and Vercel). It avoids generic "AI startup" tropes (no purple-blue neon gradients, no gaudy drop shadows, no floating robot avatars) in favor of high-contrast typography, precision 1px borders, monospaced metadata callouts, and restrained purposeful motion.

---

## 2. Color Tokens (Dark & Light Modes)

### Light Mode (`:root`)
```css
:root {
  /* Surfaces & Backgrounds */
  --color-bg: #f8f7f4;                 /* Warm architectural off-white */
  --color-surface: #ffffff;            /* Crisp elevated white */
  --color-surface-2: #f2efe9;          /* Secondary container background */
  --color-surface-elevated: #ffffff;   /* Modal, popup & drawer surface */

  /* Borders & Dividers */
  --color-border: #e6e2d8;             /* Subtle dividing border */
  --color-border-strong: #d1ccbf;      /* High-contrast container border */
  --color-border-focus: #c2410c;       /* Focused input border */

  /* Typography */
  --color-text: #171614;               /* Charcoal black (WCAG AAA contrast) */
  --color-text-secondary: #4a473f;     /* Balanced body readability */
  --color-muted: #736e63;              /* Secondary labels and captions */

  /* Accents & Brand Identity */
  --color-accent: #c2410c;             /* Industrial amber-orange */
  --color-accent-hover: #9a3412;       /* Deepened hover state */
  --color-accent-soft: #ffedd5;        /* Soft tinted badges and highlights */
  --color-on-accent: #ffffff;          /* Text on top of accent fill */

  /* Feedback & Semantic States */
  --color-success: #15803d;            /* Approved / Passed status */
  --color-success-soft: #dcfce7;
  --color-warning: #b45309;            /* Pending human approval */
  --color-warning-soft: #fef3c7;
  --color-danger: #b91c1c;             /* Rejected / Error */
  --color-danger-soft: #fee2e2;
  --color-on-danger: #ffffff;

  /* Overlays & Shadows */
  --color-overlay: rgb(23 22 20 / 0.45);
  --shadow-sm: 0 1px 2px rgb(23 22 20 / 0.05);
  --shadow-md: 0 4px 12px -2px rgb(23 22 20 / 0.08), 0 2px 4px -1px rgb(23 22 20 / 0.04);
  --shadow-raised: 0 12px 32px -8px rgb(23 22 20 / 0.12), 0 4px 8px -2px rgb(23 22 20 / 0.06);
}
```

### Dark Mode (`[data-theme="dark"]`)
```css
[data-theme="dark"] {
  /* Surfaces & Backgrounds */
  --color-bg: #0c0c0b;                 /* Ultra-deep obsidian */
  --color-surface: #141412;            /* Primary dark surface */
  --color-surface-2: #1b1b19;          /* Secondary card surface */
  --color-surface-elevated: #22221f;   /* Floating drawers & modals */

  /* Borders & Dividers */
  --color-border: #262522;             /* Precision 1px dark border */
  --color-border-strong: #383632;      /* Elevated card border */
  --color-border-focus: #fb923c;       /* Focused element highlight */

  /* Typography */
  --color-text: #f5f3ee;               /* Bright off-white */
  --color-text-secondary: #c7c3ba;     /* High-legibility body */
  --color-muted: #8c877d;              /* Monospace captions & badges */

  /* Accents & Brand Identity */
  --color-accent: #ea580c;             /* Radiant industrial amber */
  --color-accent-hover: #f97316;
  --color-accent-soft: #381a0b;        /* Dark tinted badge container */
  --color-on-accent: #ffffff;

  /* Feedback & Semantic States */
  --color-success: #22c55e;
  --color-success-soft: #142e1d;
  --color-warning: #eab308;
  --color-warning-soft: #382c0b;
  --color-danger: #ef4444;
  --color-danger-soft: #381414;
  --color-on-danger: #ffffff;

  /* Overlays & Shadows */
  --color-overlay: rgb(0 0 0 / 0.75);
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.5);
  --shadow-md: 0 4px 16px -2px rgb(0 0 0 / 0.6);
  --shadow-raised: 0 16px 40px -8px rgb(0 0 0 / 0.8), 0 0 0 1px #383632;
}
```

---

## 3. Typography Scale & Fonts

- **Primary Sans Font**: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.
- **Monospace Accent Font**: JetBrains Mono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, monospace.

### Scaled Tokens
| Token | REM Size | Approximate Pixels | Line Height | Usage |
| :--- | :---: | :---: | :---: | :--- |
| `--text-12` | 0.75rem | 12px | 1.4 | Eyebrows, timestamps, badges, schema tags |
| `--text-14` | 0.875rem | 14px | 1.5 | Navigation links, table cells, secondary copy |
| `--text-16` | 1.0rem | 16px | 1.6 | Standard body text, input fields, button labels |
| `--text-18` | 1.125rem | 18px | 1.5 | Card titles, feature headlines, sub-bullets |
| `--text-20` | 1.25rem | 20px | 1.4 | Section subheadings, modal titles |
| `--text-24` | 1.5rem | 24px | 1.3 | H3 headings, category titles |
| `--text-32` | 2.0rem | 32px | 1.2 | H2 section titles, primary value props |
| `--text-40` | 2.5rem | 40px | 1.15 | Major section display headers |
| `--text-48` | 3.0rem | 48px | 1.1 | H1 Display hero title on desktop |

---

## 4. Spacing, Radius & Layout Grid

### Spacing Scale
- `--space-1`: 4px
- `--space-2`: 8px
- `--space-3`: 12px
- `--space-4`: 16px
- `--space-5`: 24px
- `--space-6`: 32px
- `--space-7`: 48px
- `--space-8`: 64px
- `--space-9`: 96px
- `--space-10`: 128px

### Border Radius
- `--radius-sm`: 6px (Input fields, small badges, inline code tags)
- `--radius-md`: 10px (Buttons, standard panels, dropdown menus)
- `--radius-lg`: 16px (Feature cards, bento grid items, modals)
- `--radius-full`: 9999px (Pill tags, status chips)

### Container Dimensions
- `--container-max`: 1200px (Centered primary grid)
- `--container-narrow`: 840px (Article reading width & form containers)

---

## 5. Component Interaction Guidelines

### Buttons (`.btn`)
- **Minimum Touch Target**: 44px height across all mobile devices (WCAG AA).
- **Hover Micro-interaction**: `transform: translateY(-1px)`, subtle background blend via `color-mix`.
- **Active State**: `transform: translateY(1px)`.
- **Focus Visible**: 2px solid `--color-border-focus` with 2px offset.

### Forms & Inputs (`.input`, `.select`, `.textarea`)
- **Default State**: 1px solid `--color-border-strong`, background `--color-surface`.
- **Focus State**: Border color transitions to `--color-accent` with matching box-shadow ring.
- **Error State**: Border color `--color-danger`, inline error message below field with `aria-live="polite"`.

### Human Approval Review Drawer
- **Visual Design**: High-contrast surface elevation (`--color-surface-elevated`), 1px solid `--color-border-strong`.
- **Action Hierarchy**:
  - `Approve`: Prominent green or accent button with confirmation dialog.
  - `Reject`: Secondary outline button with optional rejection reason textarea.

---

## 6. Accessibility & Motion Guidelines

### Accessibility Standards
- **Color Contrast**: All text elements adhere to WCAG 2.1 Level AA (minimum 4.5:1 for body copy, 3.0:1 for large display titles).
- **Keyboard Navigation**: Complete tab-index support with visible focus indicators on all interactive inputs, buttons, and accordions.
- **Screen Reader Support**: Semantic HTML5 tags (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`), `<label for="...">` associations, and aria tags.

### Motion Parameters
```css
:root {
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-base: 220ms;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

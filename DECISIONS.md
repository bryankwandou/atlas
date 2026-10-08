# Architectural Decision Records (ADR)

## ADR-001: Vanilla CSS with Design Tokens instead of Tailwind CSS
- **Context**: Need maximum control over theme variables, light/dark mode transitions, accessibility contrast, and Silicon Valley-grade aesthetics without framework lock-in.
- **Decision**: Implemented `globals.css` with semantic CSS custom properties (`--color-bg`, `--color-surface`, `--color-accent`, etc.) supporting light and dark themes.

## ADR-002: Modular Single Data Store (JsonStore with Atomic Rename)
- **Context**: MVP needs zero external infrastructure requirements (no Docker or cloud DB mandatory for local boot), while maintaining strict serial mutation safety and full tenant filtering.
- **Decision**: Created `JsonStore` in `lib/db/store.ts` using in-memory queue and atomic temp-file rename. All reads and mutations go through typed functional closures, making transition to PostgreSQL straightforward.

## ADR-003: Deterministic Offline MockProvider
- **Context**: LLM keys should not be required for development, evaluation, and end-to-end testing. System must operate gracefully in degraded or offline modes.
- **Decision**: Implemented heuristic `MockProvider` that computes token metrics, classifies intent, and drafts realistic responses, matching the exact interface of live provider adapters.

## ADR-004: DAG Validation & Cycle Prevention
- **Context**: Prevent accidental infinite execution loops in workflow templates.
- **Decision**: `validateTemplateGraph` performs cycle detection (DFS with 3-color marks), enforces single triggers, and strictly mandates approval steps before external side effects.

## ADR-005: Dual-Language System (ID default, EN secondary)
- **Context**: Project caters primarily to Indonesian businesses and agencies while retaining global compatibility.
- **Decision**: Full string dictionary parity in `locales/id.json` and `locales/en.json` loaded via lightweight server helper and client switcher.

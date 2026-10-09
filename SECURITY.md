# Security Policy - Atlas Platform

## Security Standards & Safeguards

### 1. Tenant Isolation
- Every API endpoint, server action, and database query filters data strictly by `workspaceId` sourced from the cryptographically verified user session.
- Client requests cannot spoof `workspaceId`.

### 2. Password Storage
- Passwords are hashed using `scrypt` with parameters `N=16384, r=8, p=1`, random 16-byte salt, and 64-byte key length.
- Verification uses `timingSafeEqual` to eliminate timing attacks.

### 3. Session Management
- Sessions use HMAC-SHA256 signatures with `SESSION_SECRET`.
- Stored in `httpOnly`, `sameSite: "lax"`, secure cookies.
- Secret is required in production environment (minimum 32 characters).

### 4. Rate Limiting & Abuse Prevention
- In-memory rate limiting applied to authentication endpoints (login and registration) to prevent brute-force attacks.
- Server-side rate limiting on test execution actions (`runTestAction`) to prevent compute and token exhaustion.

### 5. CSRF & Cross-Origin Request Protection
- Mutation actions (`signupAction`, `loginAction`, `runTestAction`, `decideApprovalAction`) cryptographically verify the HTTP `Origin` header against `NEXT_PUBLIC_APP_URL` and the incoming `Host` header to reject cross-site request forgery attacks.

### 6. HTTP Security Headers
- HSTS enabled via `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` applied to all routes in `next.config.ts`.

### 7. AI Guardrails & Human Approvals
- Workflows cannot execute external customer-facing actions without passing through a human approval gate.
- Approvals have hard expiration limits.

### 8. Side-Effect Idempotency
- External actions compute an idempotency key (`${runId}:${nodeId}`) stored in the database to prevent duplicate side effects on retries.

### 9. Privacy Modes
- `FULL`: Complete input retained.
- `REDACTED`: PII (emails and phone numbers) masked in operational traces.
- `MINIMAL`: Metadata only; input bodies discarded.

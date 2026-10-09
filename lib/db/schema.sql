-- ATLAS WORKFLOW OS - PRODUCTION POSTGRESQL / SUPABASE SCHEMA
-- Version: 1.0.0
-- Enforces tenant isolation, idempotency constraints, and auditability.

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workspaces (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  monthly_budget_usd NUMERIC(10, 4) NOT NULL DEFAULT 50.0000,
  privacy_mode VARCHAR(32) NOT NULL DEFAULT 'REDACTED',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS memberships (
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id VARCHAR(64) NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  role VARCHAR(32) NOT NULL DEFAULT 'member',
  PRIMARY KEY (user_id, workspace_id)
);

CREATE TABLE IF NOT EXISTS workflows (
  id VARCHAR(64) PRIMARY KEY,
  workspace_id VARCHAR(64) NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  template_slug VARCHAR(128) NOT NULL,
  template_version VARCHAR(32) NOT NULL,
  name VARCHAR(255) NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  definition JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS runs (
  id VARCHAR(64) PRIMARY KEY,
  workspace_id VARCHAR(64) NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  workflow_id VARCHAR(64) NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  workflow_version VARCHAR(32) NOT NULL,
  status VARCHAR(32) NOT NULL,
  input JSONB NOT NULL DEFAULT '{}'::jsonb,
  cursor VARCHAR(64),
  agent_output JSONB,
  cost_usd NUMERIC(10, 6) NOT NULL DEFAULT 0.000000,
  step_count INT NOT NULL DEFAULT 0,
  error TEXT,
  is_demo BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS run_events (
  id VARCHAR(64) PRIMARY KEY,
  workspace_id VARCHAR(64) NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  run_id VARCHAR(64) NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  seq INT NOT NULL,
  node_id VARCHAR(64) NOT NULL,
  type VARCHAR(64) NOT NULL,
  attempt INT NOT NULL DEFAULT 1,
  detail JSONB NOT NULL DEFAULT '{}'::jsonb,
  at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_run_seq UNIQUE (run_id, seq)
);

CREATE TABLE IF NOT EXISTS approvals (
  id VARCHAR(64) PRIMARY KEY,
  workspace_id VARCHAR(64) NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  run_id VARCHAR(64) NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  node_id VARCHAR(64) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  reason TEXT NOT NULL,
  draft TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  decided_by VARCHAR(64) REFERENCES users(id),
  decided_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usage_records (
  id VARCHAR(64) PRIMARY KEY,
  workspace_id VARCHAR(64) NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  run_id VARCHAR(64) NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  provider VARCHAR(64) NOT NULL,
  model VARCHAR(64) NOT NULL,
  input_tokens INT NOT NULL DEFAULT 0,
  output_tokens INT NOT NULL DEFAULT 0,
  cost_usd NUMERIC(10, 6) NOT NULL DEFAULT 0.000000,
  latency_ms INT NOT NULL DEFAULT 0,
  at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS side_effect_records (
  idempotency_key VARCHAR(128) PRIMARY KEY,
  workspace_id VARCHAR(64) NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  run_id VARCHAR(64) NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  integration VARCHAR(64) NOT NULL,
  at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES FOR TENANT PERFORMANCE & FAST AUDIT TRAILS
CREATE INDEX IF NOT EXISTS idx_memberships_workspace ON memberships(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workflows_workspace ON workflows(workspace_id);
CREATE INDEX IF NOT EXISTS idx_runs_workspace ON runs(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_run_events_run ON run_events(run_id, seq ASC);
CREATE INDEX IF NOT EXISTS idx_approvals_workspace_status ON approvals(workspace_id, status);
CREATE INDEX IF NOT EXISTS idx_usage_workspace ON usage_records(workspace_id, at DESC);
CREATE INDEX IF NOT EXISTS idx_side_effects_workspace ON side_effect_records(workspace_id);

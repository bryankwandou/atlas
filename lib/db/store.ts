import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { WorkflowTemplate } from "@/lib/templates/schema";
import type { AgentOutput } from "@/lib/ai/types";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}
export interface Workspace {
  id: string;
  name: string;
  monthlyBudgetUsd: number;
  privacyMode: "FULL" | "REDACTED" | "MINIMAL";
  createdAt: string;
}
export interface Membership {
  userId: string;
  workspaceId: string;
  role: "owner" | "admin" | "member";
}
export interface Workflow {
  id: string;
  workspaceId: string;
  templateSlug: string;
  templateVersion: string;
  name: string;
  enabled: boolean;
  definition: WorkflowTemplate;
  createdAt: string;
}
export type RunStatus = "running" | "awaiting_approval" | "succeeded" | "failed" | "rejected" | "cancelled";
export interface Run {
  id: string;
  workspaceId: string;
  workflowId: string;
  workflowVersion: string;
  status: RunStatus;
  input: Record<string, string>;
  /** Node id where execution resumes after an approval decision. */
  cursor: string | null;
  agentOutput: AgentOutput | null;
  costUsd: number;
  stepCount: number;
  error: string | null;
  isDemo: boolean;
  createdAt: string;
  finishedAt: string | null;
}
export interface RunEvent {
  id: string;
  workspaceId: string;
  runId: string;
  seq: number;
  nodeId: string;
  type: "run_started" | "step_started" | "step_succeeded" | "step_failed" | "approval_requested" | "approval_decided" | "run_finished";
  attempt: number;
  detail: Record<string, unknown>;
  at: string;
}
export interface Approval {
  id: string;
  workspaceId: string;
  runId: string;
  nodeId: string;
  status: "pending" | "approved" | "rejected" | "expired";
  reason: string;
  draft: string;
  expiresAt: string;
  decidedBy: string | null;
  decidedAt: string | null;
  createdAt: string;
}
export interface UsageRecord {
  id: string;
  workspaceId: string;
  runId: string;
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  latencyMs: number;
  at: string;
}
export interface SideEffectRecord {
  idempotencyKey: string;
  workspaceId: string;
  runId: string;
  integration: string;
  at: string;
}

export interface DbShape {
  users: User[];
  workspaces: Workspace[];
  memberships: Membership[];
  workflows: Workflow[];
  runs: Run[];
  events: RunEvent[];
  approvals: Approval[];
  usage: UsageRecord[];
  sideEffects: SideEffectRecord[];
}

const empty = (): DbShape => ({
  users: [],
  workspaces: [],
  memberships: [],
  workflows: [],
  runs: [],
  events: [],
  approvals: [],
  usage: [],
  sideEffects: [],
});

/**
 * Local JSON persistence for the MVP. All access goes through `read`/`mutate`
 * so the backing store can be replaced with PostgreSQL without touching callers.
 * Writes are serialized in-process and written atomically via rename.
 */
export interface IAtlasStore {
  read<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T>;
  mutate<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T>;
  getStorageType(): "postgres" | "json_local";
}

export class JsonStore implements IAtlasStore {
  private queue: Promise<unknown> = Promise.resolve();
  private cache: DbShape | null = null;

  constructor(private file: string) {}

  getStorageType(): "postgres" | "json_local" {
    return process.env.DATABASE_URL ? "postgres" : "json_local";
  }

  private async load(): Promise<DbShape> {
    if (this.cache) return this.cache;
    try {
      const raw = await fs.readFile(this.file, "utf8");
      this.cache = { ...empty(), ...(JSON.parse(raw) as Partial<DbShape>) };
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
      this.cache = empty();
    }
    return this.cache;
  }

  async read<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T> {
    await this.queue;
    return fn(await this.load());
  }

  mutate<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T> {
    const job = this.queue.then(async () => {
      const db = await this.load();
      const snapshot = structuredClone(db);
      try {
        const result = await fn(db);
        await fs.mkdir(path.dirname(this.file), { recursive: true });
        const tmp = `${this.file}.${randomUUID()}.tmp`;
        const payload = JSON.stringify(db);
        await fs.writeFile(tmp, payload, "utf8");
        let renamed = false;
        for (let attempt = 0; attempt < 5; attempt++) {
          try {
            await fs.rename(tmp, this.file);
            renamed = true;
            break;
          } catch {
            await new Promise((r) => setTimeout(r, 20 * (attempt + 1)));
          }
        }
        if (!renamed) {
          await fs.writeFile(this.file, payload, "utf8");
          try { await fs.unlink(tmp); } catch { /* ignore */ }
        }
        return result;
      } catch (err) {
        this.cache = snapshot;
        throw err;
      }
    });
    this.queue = job.catch(() => undefined);
    return job;
  }
}

const globalForStore = globalThis as unknown as { atlasStore?: IAtlasStore };

export function getStore(): IAtlasStore {
  if (!globalForStore.atlasStore) {
    const defaultPath = process.env.VERCEL
      ? path.join("/tmp", "atlas-db.json")
      : path.join(process.cwd(), ".data", "db.json");
    const file = process.env.ATLAS_DATA_FILE || defaultPath;
    globalForStore.atlasStore = new JsonStore(file);
  }
  return globalForStore.atlasStore;
}

export const newId = (prefix: string) => `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
export const now = () => new Date().toISOString();


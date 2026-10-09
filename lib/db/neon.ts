import { neon } from "@neondatabase/serverless";
import type { DbShape, IAtlasStore } from "./store";

export class NeonPostgresStore implements IAtlasStore {
  private sql: ReturnType<typeof neon>;
  private initialized = false;

  constructor(connectionString: string) {
    this.sql = neon(connectionString);
  }

  getStorageType(): "postgres" {
    return "postgres";
  }

  async ping(): Promise<boolean> {
    try {
      const result = (await this.sql`SELECT 1 as ok`) as unknown as Record<string, unknown>[];
      return Array.isArray(result) && result.length > 0;
    } catch (err) {
      console.error("NeonPostgresStore ping failed:", err instanceof Error ? err.message : err);
      return false;
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (this.initialized) return;
    try {
      await this.sql`
        CREATE TABLE IF NOT EXISTS atlas_store_state (
          key VARCHAR(64) PRIMARY KEY,
          state JSONB NOT NULL,
          version BIGINT NOT NULL DEFAULT 1,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;
      this.initialized = true;
    } catch (err) {
      console.error("Failed to initialize atlas_store_state in Neon:", err);
      throw err;
    }
  }

  private empty(): DbShape {
    return {
      users: [],
      workspaces: [],
      memberships: [],
      workflows: [],
      runs: [],
      events: [],
      approvals: [],
      usage: [],
      sideEffects: [],
    };
  }

  async read<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T> {
    await this.ensureInitialized();
    const rows = (await this.sql`
      SELECT state FROM atlas_store_state WHERE key = 'main' LIMIT 1
    `) as unknown as Record<string, unknown>[];
    const data: DbShape = rows.length > 0 ? (rows[0].state as DbShape) : this.empty();
    return fn(data);
  }

  async mutate<T>(fn: (db: DbShape) => T | Promise<T>): Promise<T> {
    await this.ensureInitialized();
    const rows = (await this.sql`
      SELECT state, version FROM atlas_store_state WHERE key = 'main' LIMIT 1
    `) as unknown as Record<string, unknown>[];
    const current: DbShape = rows.length > 0 ? (rows[0].state as DbShape) : this.empty();
    const cloned = structuredClone(current);
    const result = await fn(cloned);

    await this.sql`
      INSERT INTO atlas_store_state (key, state, version, updated_at)
      VALUES ('main', ${JSON.stringify(cloned)}, 1, NOW())
      ON CONFLICT (key) DO UPDATE
      SET state = EXCLUDED.state,
          version = atlas_store_state.version + 1,
          updated_at = NOW();
    `;
    return result;
  }
}

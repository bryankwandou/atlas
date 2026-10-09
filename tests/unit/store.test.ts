import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { JsonStore, getStore, type DbShape } from "@/lib/db/store";
import { NeonPostgresStore } from "@/lib/db/neon";

describe("store durability and storage detection", () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), "atlas-store-test-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
    delete process.env.DATABASE_URL;
  });

  it("JsonStore strictly reports json_local and never falsely claims postgres", () => {
    const store = new JsonStore(path.join(dir, "db.json"));
    expect(store.getStorageType()).toBe("json_local");
  });

  it("JsonStore passes ping check and persists across instances", async () => {
    const file = path.join(dir, "db.json");
    const store1 = new JsonStore(file);
    expect(await store1.ping()).toBe(true);

    await store1.mutate((db) => {
      db.workspaces.push({
        id: "ws_test_persist",
        name: "Test Workspace",
        monthlyBudgetUsd: 10,
        privacyMode: "FULL",
        createdAt: new Date().toISOString(),
      });
    });

    const store2 = new JsonStore(file);
    const loaded = await store2.read((db) => db.workspaces);
    expect(loaded).toHaveLength(1);
    expect(loaded[0].id).toBe("ws_test_persist");
  });

  it("NeonPostgresStore reports postgres storage type", () => {
    const store = new NeonPostgresStore("postgres://dummy:dummy@localhost:5432/dummydb");
    expect(store.getStorageType()).toBe("postgres");
  });

  it("NeonPostgresStore ping gracefully returns false when database is unreachable", async () => {
    const store = new NeonPostgresStore("postgres://invalid_user:invalid_pass@invalid_host:5432/invalid_db");
    const pingResult = await store.ping();
    expect(pingResult).toBe(false);
  });
});

import { NextResponse } from "next/server";
import { getStore } from "@/lib/db/store";
import { templates } from "@/lib/templates/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const started = Date.now();
  let dbOk = false;
  let workspaceCount = 0;
  let runCount = 0;

  try {
    const stats = await getStore().read((db) => ({
      workspaces: db.workspaces.length,
      runs: db.runs.length,
    }));
    dbOk = true;
    workspaceCount = stats.workspaces;
    runCount = stats.runs;
  } catch (err) {
    dbOk = false;
  }

  const liveProvider = !!process.env.OPENAI_API_KEY;

  const payload = {
    status: dbOk ? "healthy" : "degraded",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    checks: {
      database: dbOk ? "ok" : "fail",
      storageType: getStore().getStorageType(),
      durablePersistence: getStore().getStorageType() === "postgres",
      templatesSeeded: templates.length,
      aiProvider: liveProvider ? "openai" : "mock_simulation",
      simulationMode: !liveProvider,
    },
    metrics: {
      workspaces: workspaceCount,
      totalRuns: runCount,
      latencyMs: Date.now() - started,
    },
  };

  return NextResponse.json(payload, { status: dbOk ? 200 : 503 });
}

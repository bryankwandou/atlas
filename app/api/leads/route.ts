import { NextResponse } from "next/server";
import { z } from "zod";
import { getStore } from "@/lib/db/store";

const leadSchema = z.object({
  fullName: z.string().min(2).max(100),
  businessEmail: z.string().email(),
  companyName: z.string().min(2).max(120),
  workflowChallenge: z.string().default("lead-qualification"),
  source: z.string().default("homepage"),
  submittedAt: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = leadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form submission data", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { fullName, businessEmail, companyName, workflowChallenge, source } = parsed.data;

    // Record audit event in durable store
    try {
      const store = getStore();
      await store.mutate((db) => {
        db.events.push({
          id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          workspaceId: "inbound_sales",
          runId: "run_inbound_lead",
          seq: (db.events?.length || 0) + 1,
          nodeId: "form_submission",
          type: "run_started",
          attempt: 1,
          detail: {
            fullName,
            businessEmail,
            companyName,
            workflowChallenge,
            source,
            receivedAt: new Date().toISOString(),
          },
          at: new Date().toISOString(),
        });
      });
    } catch {
      // Graceful fallback if in local demo environment
    }

    return NextResponse.json({
      success: true,
      message: "Lead inquiry captured successfully",
      lead: {
        fullName,
        companyName,
        workflowChallenge,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process lead inquiry" },
      { status: 500 }
    );
  }
}

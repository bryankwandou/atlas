import { templateSchema, validateTemplateGraph, type WorkflowTemplate } from "./schema";
import { allSpecs, type Spec } from "./specs";

/**
 * All templates share one deterministic runtime shape:
 * trigger -> agent -> condition(score) -> [approval -> external action] | [internal action] -> output.
 * Templates differ strictly by data configuration; no template has bespoke code.
 */
function build(s: Spec): WorkflowTemplate {
  const tpl: WorkflowTemplate = {
    id: `tpl_${s.num}`,
    slug: s.slug,
    version: "1.0.0",
    status: "published",
    category: s.category,
    name: s.name,
    summary: s.summary,
    ownerExplanation: s.ownerExplanation,
    tags: s.tags,
    inputs: s.inputs,
    nodes: [
      { id: "trigger", type: "trigger", label: { id: "Data masuk", en: "Input received" } },
      {
        id: "agent",
        type: "agent",
        label: s.agentLabel,
        agent: s.agent,
        tier: "low",
        maxOutputTokens: 600,
        instruction: s.instruction,
      },
      {
        id: "route",
        type: "condition",
        label: { id: `Skor >= ${s.threshold}?`, en: `Score >= ${s.threshold}?` },
        field: "score",
        operator: "gte",
        value: s.threshold,
        onTrue: "review",
        onFalse: "log_low",
      },
      {
        id: "review",
        type: "approval",
        label: { id: "Persetujuan manusia", en: "Human approval" },
        reason: {
          id: "Tindakan ini mengirim pesan ke pihak luar. Tinjau draf sebelum dikirim.",
          en: "This action reaches an external party. Review the draft before sending.",
        },
        expiresInHours: 48,
      },
      {
        id: "act",
        type: "action",
        label: s.actionLabel,
        integration: s.integration,
        sideEffect: "external",
        requiresApproval: true,
      },
      {
        id: "log_low",
        type: "action",
        label: s.lowPathLabel,
        integration: s.lowIntegration,
        sideEffect: "internal",
        requiresApproval: false,
      },
      { id: "done", type: "output", label: { id: "Selesai", en: "Done" } },
    ],
    edges: [
      ["trigger", "agent"],
      ["agent", "route"],
      ["review", "act"],
      ["act", "done"],
      ["log_low", "done"],
    ],
    kpis: s.kpis,
    limits: { timeoutMs: 60_000, maxSteps: 20, maxCostUsd: 0.05 },
    sampleInput: s.sampleInput,
  };
  return templateSchema.parse(tpl);
}

export const templates: WorkflowTemplate[] = allSpecs.map(build);

// Validate every template graph statically at module evaluation time
for (const t of templates) {
  const issues = validateTemplateGraph(t);
  if (issues.length) throw new Error(`Template ${t.slug} invalid: ${JSON.stringify(issues)}`);
}

export function getTemplate(slug: string): WorkflowTemplate | undefined {
  return templates.find((t) => t.slug === slug);
}

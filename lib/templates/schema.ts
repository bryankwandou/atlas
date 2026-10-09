import { z } from "zod";

export const modelTierSchema = z.enum(["low", "balanced", "flagship"]);
export type ModelTier = z.infer<typeof modelTierSchema>;

export const fieldSchema = z.object({
  key: z.string().regex(/^[a-z][a-zA-Z0-9_]*$/),
  label: z.object({ id: z.string(), en: z.string() }),
  type: z.enum(["text", "longtext", "email", "number"]),
  required: z.boolean(),
  maxLength: z.number().int().positive().default(2000),
});
export type TemplateField = z.infer<typeof fieldSchema>;

const baseNode = z.object({
  id: z.string().regex(/^[a-z][a-z0-9_]*$/),
  label: z.object({ id: z.string(), en: z.string() }),
});

/**
 * Node contracts for the MVP runtime. Every node is data, never code:
 * templates cannot execute arbitrary logic.
 */
export const nodeSchema = z.discriminatedUnion("type", [
  baseNode.extend({ type: z.literal("trigger") }),
  baseNode.extend({
    type: z.literal("agent"),
    agent: z.enum(["qualification", "copywriting", "operations", "summarizer"]),
    tier: modelTierSchema,
    maxOutputTokens: z.number().int().min(64).max(4000),
    instruction: z.string().min(10),
  }),
  baseNode.extend({
    type: z.literal("condition"),
    field: z.string(),
    operator: z.enum(["gte", "lte", "eq", "neq"]),
    value: z.union([z.number(), z.string()]),
    onTrue: z.string(),
    onFalse: z.string(),
  }),
  baseNode.extend({
    type: z.literal("approval"),
    reason: z.object({ id: z.string(), en: z.string() }),
    expiresInHours: z.number().int().min(1).max(168),
  }),
  baseNode.extend({
    type: z.literal("action"),
    integration: z.enum(["mock_email", "mock_crm", "mock_sheet", "mock_chat"]),
    sideEffect: z.enum(["internal", "external"]),
    requiresApproval: z.boolean(),
  }),
  baseNode.extend({ type: z.literal("output") }),
]);
export type WorkflowNode = z.infer<typeof nodeSchema>;

export const templateSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  status: z.enum(["published", "draft", "archived"]),
  category: z.enum([
    "sales",
    "support",
    "marketing",
    "operations",
    "agency",
    "property",
    "dealer",
    "education",
    "travel",
    "recruiting",
    "finance",
    "ecommerce",
    "services",
  ]),
  name: z.object({ id: z.string(), en: z.string() }),
  summary: z.object({ id: z.string(), en: z.string() }),
  ownerExplanation: z.object({ id: z.string(), en: z.string() }),
  tags: z.array(z.string()),
  inputs: z.array(fieldSchema).min(1),
  nodes: z.array(nodeSchema).min(2),
  /** Linear edges; condition nodes declare their own branches. */
  edges: z.array(z.tuple([z.string(), z.string()])),
  kpis: z.array(z.string()).min(1),
  limits: z.object({
    timeoutMs: z.number().int().positive(),
    maxSteps: z.number().int().min(2).max(50),
    maxCostUsd: z.number().positive(),
  }),
  sampleInput: z.record(z.string(), z.string()),
});
export type WorkflowTemplate = z.infer<typeof templateSchema>;

export interface ValidationIssue {
  path: string;
  message: string;
}

/**
 * Static validation beyond the zod shape: graph references must resolve,
 * exactly one trigger must exist and the graph must be acyclic so that a
 * run cannot loop forever.
 */
export function validateTemplateGraph(t: WorkflowTemplate): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = new Set(t.nodes.map((n) => n.id));
  if (ids.size !== t.nodes.length) issues.push({ path: "nodes", message: "duplicate node id" });

  const triggers = t.nodes.filter((n) => n.type === "trigger");
  if (triggers.length !== 1) issues.push({ path: "nodes", message: "exactly one trigger required" });

  const adjacency = new Map<string, string[]>();
  for (const n of t.nodes) adjacency.set(n.id, []);
  for (const [from, to] of t.edges) {
    if (!ids.has(from) || !ids.has(to)) {
      issues.push({ path: "edges", message: `unknown edge ${from}->${to}` });
      continue;
    }
    adjacency.get(from)!.push(to);
  }
  for (const n of t.nodes) {
    if (n.type === "condition") {
      for (const target of [n.onTrue, n.onFalse]) {
        if (!ids.has(target)) issues.push({ path: `nodes.${n.id}`, message: `unknown branch ${target}` });
        else adjacency.get(n.id)!.push(target);
      }
    }
    if (n.type === "action" && n.sideEffect === "external" && !n.requiresApproval) {
      issues.push({ path: `nodes.${n.id}`, message: "external side effects must require approval in MVP" });
    }
  }

  const state = new Map<string, 0 | 1 | 2>();
  const visit = (id: string): boolean => {
    if (state.get(id) === 1) return false;
    if (state.get(id) === 2) return true;
    state.set(id, 1);
    for (const next of adjacency.get(id) ?? []) if (!visit(next)) return false;
    state.set(id, 2);
    return true;
  };
  for (const id of ids) {
    if (!visit(id)) {
      issues.push({ path: "edges", message: "cycle detected" });
      break;
    }
  }
  return issues;
}

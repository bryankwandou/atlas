import { z } from "zod";
import type { ModelTier } from "@/lib/templates/schema";

export const agentOutputSchema = z.object({
  score: z.number().int().min(0).max(100),
  category: z.string().min(1).max(60),
  summary: z.string().min(1).max(1200),
  draft: z.string().max(3000),
});
export type AgentOutput = z.infer<typeof agentOutputSchema>;

export interface AgentRequest {
  agent: string;
  instruction: string;
  tier: ModelTier;
  maxOutputTokens: number;
  input: Record<string, string>;
}

export interface Usage {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  latencyMs: number;
}

export type ProviderErrorKind = "timeout" | "rate_limit" | "invalid_output" | "auth" | "unavailable";

export class ProviderError extends Error {
  constructor(
    public kind: ProviderErrorKind,
    message: string,
    public retryable: boolean,
  ) {
    super(message);
  }
}

export interface AIProvider {
  name: string;
  run(req: AgentRequest): Promise<{ output: AgentOutput; usage: Usage }>;
}

/** USD per 1M tokens. Time-sensitive: verify against provider pricing before launch. */
export const PRICING: Record<string, { input: number; output: number }> = {
  "mock-low": { input: 0.2, output: 1.2 },
  "mock-balanced": { input: 2, output: 12 },
  "mock-flagship": { input: 4, output: 20 },
};

export function estimateCost(model: string, inputTokens: number, outputTokens: number): number {
  const p = PRICING[model] ?? PRICING["mock-low"];
  return Number(((inputTokens * p.input + outputTokens * p.output) / 1_000_000).toFixed(6));
}

/** Rough token estimate (~4 chars/token) used only by the mock provider. */
export const approxTokens = (text: string) => Math.max(1, Math.ceil(text.length / 4));

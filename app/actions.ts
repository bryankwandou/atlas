"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getStore, newId, now } from "@/lib/db/store";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { endSession, requireSession, startSession } from "@/lib/auth/session";
import { getProvider } from "@/lib/ai/providers";
import { WorkflowRuntime, RuntimeError } from "@/lib/workflows/runtime";
import { installTemplate, ServiceError, setWorkflowEnabled } from "@/lib/workflows/service";
import { LOCALE_COOKIE } from "@/lib/i18n";
import { allowAttempt } from "@/lib/security/rate-limit";

export interface FormState {
  error?: string;
  fields?: Record<string, string>;
  ok?: boolean;
}

const emailSchema = z.string().trim().toLowerCase().email().max(200);

async function clientKey(prefix: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  return `${prefix}:${ip}`;
}

const signupSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: emailSchema,
  password: z.string().min(10).max(200),
  workspace: z.string().trim().min(2).max(80),
});

export async function signupAction(_prev: FormState, form: FormData): Promise<FormState> {
  if (!allowAttempt(await clientKey("signup"), 10, 15 * 60_000)) return { error: "rateLimited" };
  const parsed = signupSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { error: "validation", fields: Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])) };
  }
  const { name, email, password, workspace } = parsed.data;
  const passwordHash = await hashPassword(password);
  const created = await getStore().mutate((db) => {
    if (db.users.some((u) => u.email === email)) return null;
    const userId = newId("usr");
    const workspaceId = newId("ws");
    db.users.push({ id: userId, email, name, passwordHash, createdAt: now() });
    db.workspaces.push({ id: workspaceId, name: workspace, monthlyBudgetUsd: 5, privacyMode: "REDACTED", createdAt: now() });
    db.memberships.push({ userId, workspaceId, role: "owner" });
    return { userId, workspaceId };
  });
  if (!created) return { error: "exists" };
  await startSession(created.userId, created.workspaceId);
  redirect("/app");
}

const loginSchema = z.object({ email: emailSchema, password: z.string().min(1).max(200) });

export async function loginAction(_prev: FormState, form: FormData): Promise<FormState> {
  if (!allowAttempt(await clientKey("login"), 10, 15 * 60_000)) return { error: "rateLimited" };
  const parsed = loginSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "invalid" };
  const found = await getStore().read((db) => {
    const user = db.users.find((u) => u.email === parsed.data.email);
    const membership = user && db.memberships.find((m) => m.userId === user.id);
    return user && membership ? { user, workspaceId: membership.workspaceId } : null;
  });
  // Always run a hash comparison to keep timing similar for unknown emails.
  const ok = await verifyPassword(parsed.data.password, found?.user.passwordHash ?? "scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$AAAA");
  if (!found || !ok) return { error: "invalid" };
  await startSession(found.user.id, found.workspaceId);
  redirect("/app");
}

export async function logoutAction() {
  await endSession();
  redirect("/");
}

export async function installTemplateAction(form: FormData) {
  const session = await requireSession();
  const slug = z.string().regex(/^[a-z0-9-]+$/).parse(form.get("slug"));
  const wf = await installTemplate(getStore(), session.workspace.id, slug);
  revalidatePath("/app", "layout");
  redirect(`/app/workflows/${wf.id}`);
}

export async function toggleWorkflowAction(form: FormData) {
  const session = await requireSession();
  const id = z.string().min(1).max(64).parse(form.get("workflowId"));
  const enabled = form.get("enabled") === "true";
  await setWorkflowEnabled(getStore(), session.workspace.id, id, enabled);
  revalidatePath(`/app/workflows/${id}`);
}

export async function runTestAction(_prev: FormState, form: FormData): Promise<FormState> {
  const session = await requireSession();
  const workflowId = String(form.get("workflowId") ?? "");
  const input: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (k.startsWith("in_") && typeof v === "string") input[k.slice(3)] = v;
  }
  let runId: string;
  try {
    const run = await new WorkflowRuntime(getStore(), getProvider()).start({
      workspaceId: session.workspace.id,
      workflowId,
      input,
      isDemo: true,
    });
    runId = run.id;
  } catch (err) {
    if (err instanceof RuntimeError) return { error: err.code === "invalid_input" ? `invalid_input:${err.message}` : err.code };
    console.error("runTestAction failed", err instanceof Error ? err.message : "unknown");
    return { error: "generic" };
  }
  revalidatePath("/app", "layout");
  redirect(`/app/runs/${runId}`);
}

export async function decideApprovalAction(form: FormData) {
  const session = await requireSession();
  const approvalId = z.string().min(1).max(64).parse(form.get("approvalId"));
  const decision = z.enum(["approved", "rejected"]).parse(form.get("decision"));
  let runId: string | null = null;
  try {
    const run = await new WorkflowRuntime(getStore(), getProvider()).decide({
      workspaceId: session.workspace.id,
      approvalId,
      userId: session.user.id,
      decision,
    });
    runId = run.id;
  } catch (err) {
    if (!(err instanceof RuntimeError)) throw err;
  }
  revalidatePath("/app", "layout");
  if (runId && form.get("redirect") === "run") redirect(`/app/runs/${runId}`);
}

const settingsSchema = z.object({
  name: z.string().trim().min(2).max(80),
  monthlyBudgetUsd: z.coerce.number().min(0).max(10_000),
  privacyMode: z.enum(["FULL", "REDACTED", "MINIMAL"]),
});

export async function updateSettingsAction(_prev: FormState, form: FormData): Promise<FormState> {
  const session = await requireSession();
  if (session.role === "member") return { error: "forbidden" };
  const parsed = settingsSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "validation" };
  await getStore().mutate((db) => {
    const ws = db.workspaces.find((w) => w.id === session.workspace.id);
    if (!ws) throw new ServiceError("not_found", "workspace not found");
    Object.assign(ws, parsed.data);
  });
  revalidatePath("/app", "layout");
  return { ok: true };
}

export async function setLocaleAction(locale: string) {
  if (locale !== "id" && locale !== "en") return;
  (await cookies()).set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  revalidatePath("/", "layout");
}

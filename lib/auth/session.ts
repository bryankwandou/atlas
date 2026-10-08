import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getStore, type Membership, type User, type Workspace } from "@/lib/db/store";
import { decodeSession, encodeSession, getSessionSecret, SESSION_COOKIE, SESSION_TTL_SECONDS } from "./token";

export interface SessionContext {
  user: Pick<User, "id" | "email" | "name">;
  workspace: Workspace;
  role: Membership["role"];
}

export async function getSession(): Promise<SessionContext | null> {
  const jar = await cookies();
  const payload = decodeSession(jar.get(SESSION_COOKIE)?.value, await getSessionSecret());
  if (!payload) return null;
  return getStore().read((db) => {
    const user = db.users.find((u) => u.id === payload.uid);
    const membership = db.memberships.find((m) => m.userId === payload.uid && m.workspaceId === payload.wid);
    const workspace = db.workspaces.find((w) => w.id === payload.wid);
    if (!user || !membership || !workspace) return null;
    return { user: { id: user.id, email: user.email, name: user.name }, workspace: { ...workspace }, role: membership.role };
  });
}

/** Resolves the current workspace before any tenant data is loaded. */
export async function requireSession(): Promise<SessionContext> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

export async function startSession(userId: string, workspaceId: string) {
  const jar = await cookies();
  const token = encodeSession({ uid: userId, wid: workspaceId, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }, await getSessionSecret());
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

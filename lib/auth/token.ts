import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export const SESSION_COOKIE = "atlas_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export interface SessionPayload {
  uid: string;
  wid: string;
  exp: number;
}

let cachedSecret: string | null = null;

/**
 * SESSION_SECRET is mandatory in production. In development a random secret
 * is generated once and kept in the git-ignored .data directory.
 */
export async function getSessionSecret(): Promise<string> {
  if (cachedSecret) return cachedSecret;
  const fromEnv = process.env.SESSION_SECRET;
  if (fromEnv && fromEnv.length >= 32) return (cachedSecret = fromEnv);
  const baseDir = process.env.VERCEL
    ? path.join("/tmp", "atlas")
    : path.join(process.cwd(), ".data");
  const file = path.join(baseDir, "session-secret");
  try {
    cachedSecret = (await fs.readFile(file, "utf8")).trim();
  } catch {
    cachedSecret = randomBytes(48).toString("base64url");
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, cachedSecret, "utf8");
  }
  return cachedSecret;
}

const sign = (data: string, secret: string) => createHmac("sha256", secret).update(data).digest("base64url");

export function encodeSession(payload: SessionPayload, secret: string): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data, secret)}`;
}

export function decodeSession(token: string | undefined, secret: string, nowSec = Math.floor(Date.now() / 1000)): SessionPayload | null {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = Buffer.from(sign(data, secret));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as SessionPayload;
    if (typeof payload.uid !== "string" || typeof payload.wid !== "string" || typeof payload.exp !== "number") return null;
    return payload.exp > nowSec ? payload : null;
  } catch {
    return null;
  }
}

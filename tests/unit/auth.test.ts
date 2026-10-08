import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { decodeSession, encodeSession } from "@/lib/auth/token";

const secret = "a".repeat(48);

describe("password hashing", () => {
  it("verifies correct password and rejects wrong one", async () => {
    const hash = await hashPassword("correct horse battery");
    expect(hash.startsWith("scrypt$")).toBe(true);
    expect(await verifyPassword("correct horse battery", hash)).toBe(true);
    expect(await verifyPassword("wrong", hash)).toBe(false);
    expect(await verifyPassword("x", "garbage")).toBe(false);
  });
});

describe("session token", () => {
  const payload = { uid: "u1", wid: "w1", exp: 2_000_000_000 };

  it("round-trips a signed payload", () => {
    expect(decodeSession(encodeSession(payload, secret), secret, 1_000)).toEqual(payload);
  });

  it("rejects tampered payloads and wrong secrets", () => {
    const token = encodeSession(payload, secret);
    const [, sig] = token.split(".");
    const forged = `${Buffer.from(JSON.stringify({ ...payload, wid: "w2" })).toString("base64url")}.${sig}`;
    expect(decodeSession(forged, secret, 1_000)).toBeNull();
    expect(decodeSession(token, "b".repeat(48), 1_000)).toBeNull();
  });

  it("rejects expired tokens", () => {
    expect(decodeSession(encodeSession({ ...payload, exp: 10 }, secret), secret, 11)).toBeNull();
  });
});

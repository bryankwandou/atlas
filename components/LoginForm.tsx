"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type FormState } from "@/app/actions";
import type { Dict } from "@/lib/i18n";

interface Props {
  dict: Dict;
}

const initialState: FormState = {};

export function LoginForm({ dict }: Props) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} style={{ display: "grid", gap: "var(--space-4)" }}>
      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error === "invalid" && dict.auth.invalid}
          {state.error === "rateLimited" && dict.auth.rateLimited}
          {state.error === "validation" && dict.auth.validation}
          {!["invalid", "rateLimited", "validation"].includes(state.error) && dict.errors.generic}
        </div>
      )}

      <div className="field">
        <label htmlFor="login-email">{dict.auth.email}</label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="input"
          placeholder="nama@perusahaan.com"
        />
      </div>

      <div className="field">
        <label htmlFor="login-password">{dict.auth.password}</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="input"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary"
        style={{ width: "100%", marginTop: "var(--space-2)" }}
      >
        <span>{isPending ? dict.auth.pending : dict.auth.submitLogin}</span>
      </button>

      <div style={{ textAlign: "center", fontSize: "var(--text-14)", marginTop: "var(--space-2)" }}>
        <Link href="/signup" className="muted" style={{ textDecoration: "underline" }}>
          {dict.auth.toSignup}
        </Link>
      </div>
    </form>
  );
}

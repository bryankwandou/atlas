"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction, type FormState } from "@/app/actions";
import type { Dict } from "@/lib/i18n/locales";

interface Props {
  dict: Dict;
}

const initialState: FormState = {};

export function SignupForm({ dict }: Props) {
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

  return (
    <form action={formAction} style={{ display: "grid", gap: "var(--space-4)" }}>
      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error === "exists" && dict.auth.exists}
          {state.error === "rateLimited" && dict.auth.rateLimited}
          {state.error === "validation" && dict.auth.validation}
          {!["exists", "rateLimited", "validation"].includes(state.error) && dict.errors.generic}
        </div>
      )}

      <div className="field">
        <label htmlFor="signup-name">{dict.auth.name}</label>
        <input
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="input"
          placeholder="Nama Anda"
          aria-invalid={!!state.fields?.name}
        />
        {state.fields?.name && <span className="field-error">{state.fields.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="signup-workspace">{dict.auth.workspace}</label>
        <input
          id="signup-workspace"
          name="workspace"
          type="text"
          required
          className="input"
          placeholder="PT Maju Bersama / Agensi Kreatif"
          aria-invalid={!!state.fields?.workspace}
        />
        <span className="hint">{dict.auth.workspaceHint}</span>
        {state.fields?.workspace && <span className="field-error">{state.fields.workspace}</span>}
      </div>

      <div className="field">
        <label htmlFor="signup-email">{dict.auth.email}</label>
        <input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="input"
          placeholder="nama@perusahaan.com"
          aria-invalid={!!state.fields?.email}
        />
        {state.fields?.email && <span className="field-error">{state.fields.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="signup-password">{dict.auth.password}</label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
          className="input"
          aria-invalid={!!state.fields?.password}
        />
        <span className="hint">{dict.auth.passwordHint}</span>
        {state.fields?.password && <span className="field-error">{state.fields.password}</span>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary"
        style={{ width: "100%", marginTop: "var(--space-2)" }}
      >
        <span>{isPending ? dict.auth.pending : dict.auth.submitSignup}</span>
      </button>

      <div style={{ textAlign: "center", fontSize: "var(--text-14)", marginTop: "var(--space-2)" }}>
        <Link href="/login" className="muted" style={{ textDecoration: "underline" }}>
          {dict.auth.toLogin}
        </Link>
      </div>
    </form>
  );
}

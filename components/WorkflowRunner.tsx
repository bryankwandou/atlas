"use client";

import { useState, useActionState } from "react";
import { Play, Sparkles } from "lucide-react";
import { runTestAction, type FormState } from "@/app/actions";
import type { TemplateField } from "@/lib/templates/schema";
import { type Dict, type Locale, pick } from "@/lib/i18n/locales";

interface Props {
  workflowId: string;
  inputs: TemplateField[];
  sampleInput: Record<string, string>;
  enabled: boolean;
  dict: Dict;
  locale: Locale;
}

const initialState: FormState = {};

export function WorkflowRunner({ workflowId, inputs, sampleInput, enabled, dict, locale }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [state, formAction, isPending] = useActionState(runTestAction, initialState);

  function fillSample() {
    setValues({ ...sampleInput });
  }

  function handleChange(key: string, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div className="panel" style={{ display: "grid", gap: "var(--space-4)" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "var(--space-3)",
        }}
      >
        <h2 style={{ fontSize: "var(--text-18)" }}>{dict.wf.inputTitle}</h2>

        <button
          type="button"
          onClick={fillSample}
          className="btn btn-secondary btn-sm"
          disabled={!enabled}
        >
          <Sparkles size={14} aria-hidden="true" />
          <span>{dict.wf.fillSample}</span>
        </button>
      </div>

      {!enabled && (
        <div className="alert alert-warning">
          {dict.wf.disabledNote}
        </div>
      )}

      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error.startsWith("invalid_input")
            ? `${dict.errors.invalid_input}: ${state.error.slice(14)}`
            : state.error === "disabled"
            ? dict.errors.disabled
            : dict.errors.generic}
        </div>
      )}

      <form action={formAction} style={{ display: "grid", gap: "var(--space-4)" }}>
        <input type="hidden" name="workflowId" value={workflowId} />

        {inputs.map((inp) => {
          const currentVal = values[inp.key] ?? "";
          return (
            <div key={inp.key} className="field">
              <label htmlFor={`field-${inp.key}`}>
                {pick(inp.label, locale)}
                {inp.required && <span style={{ color: "var(--color-accent)", marginLeft: "4px" }}>*</span>}
              </label>

              {inp.type === "longtext" ? (
                <textarea
                  id={`field-${inp.key}`}
                  name={`in_${inp.key}`}
                  required={inp.required}
                  maxLength={inp.maxLength}
                  value={currentVal}
                  onChange={(e) => handleChange(inp.key, e.target.value)}
                  className="textarea"
                  disabled={!enabled || isPending}
                  rows={4}
                />
              ) : (
                <input
                  id={`field-${inp.key}`}
                  name={`in_${inp.key}`}
                  type={inp.type === "email" ? "email" : "text"}
                  required={inp.required}
                  maxLength={inp.maxLength}
                  value={currentVal}
                  onChange={(e) => handleChange(inp.key, e.target.value)}
                  className="input"
                  disabled={!enabled || isPending}
                />
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={!enabled || isPending}
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "var(--space-2)" }}
        >
          <Play size={16} aria-hidden="true" />
          <span>{isPending ? dict.wf.testRunning : dict.wf.testRun}</span>
        </button>
      </form>
    </div>
  );
}

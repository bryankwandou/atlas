"use client";

import { useActionState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { updateSettingsAction, type FormState } from "@/app/actions";
import type { Workspace, Membership } from "@/lib/db/store";
import type { Dict } from "@/lib/i18n";

interface Props {
  workspace: Workspace;
  role: Membership["role"];
  dict: Dict;
}

const initialState: FormState = {};

export function SettingsForm({ workspace, role, dict }: Props) {
  const [state, formAction, isPending] = useActionState(updateSettingsAction, initialState);
  const canEdit = role === "owner" || role === "admin";

  return (
    <form action={formAction} style={{ display: "grid", gap: "var(--space-5)" }}>
      {state.ok && (
        <div className="alert alert-success" role="status">
          <Check size={16} aria-hidden="true" style={{ display: "inline", marginRight: "6px" }} />
          <span>Pengaturan workspace berhasil diperbarui.</span>
        </div>
      )}

      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error === "forbidden" ? dict.errors.forbidden : dict.errors.generic}
        </div>
      )}

      {!canEdit && (
        <div className="alert alert-warning">
          {dict.settings.ownerOnly}
        </div>
      )}

      <div className="field">
        <label htmlFor="settings-name">{dict.settings.workspaceName}</label>
        <input
          id="settings-name"
          name="name"
          type="text"
          required
          defaultValue={workspace.name}
          disabled={!canEdit || isPending}
          className="input"
        />
      </div>

      <div className="field">
        <label htmlFor="settings-budget">{dict.settings.budget}</label>
        <input
          id="settings-budget"
          name="monthlyBudgetUsd"
          type="number"
          step="0.5"
          min="0"
          max="10000"
          required
          defaultValue={workspace.monthlyBudgetUsd}
          disabled={!canEdit || isPending}
          className="input"
        />
        <span className="hint">
          Jika tercapai, run baru akan berhenti sebelum panggilan model AI baru dieksekusi.
        </span>
      </div>

      <div className="field">
        <label htmlFor="settings-privacy">{dict.settings.privacy}</label>
        <select
          id="settings-privacy"
          name="privacyMode"
          defaultValue={workspace.privacyMode}
          disabled={!canEdit || isPending}
          className="select"
        >
          <option value="FULL">{dict.settings.privacyFULL}</option>
          <option value="REDACTED">{dict.settings.privacyREDACTED}</option>
          <option value="MINIMAL">{dict.settings.privacyMINIMAL}</option>
        </select>
        <span className="hint">
          Menentukan seberapa banyak data input yang disimpan di jejak eksekusi.
        </span>
      </div>

      {canEdit && (
        <div>
          <button type="submit" disabled={isPending} className="btn btn-primary">
            <span>{isPending ? "Menyimpan..." : dict.common.save}</span>
          </button>
        </div>
      )}
    </form>
  );
}

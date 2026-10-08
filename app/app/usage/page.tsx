import Link from "next/link";
import { Coins, AlertTriangle, AlertCircle, Cpu, ArrowRight } from "lucide-react";
import { requireSession } from "@/lib/auth/session";
import { getLocale, getDict } from "@/lib/i18n";
import { getStore } from "@/lib/db/store";
import { monthlySpend } from "@/lib/workflows/runtime";

export default async function UsagePage() {
  const session = await requireSession();
  const locale = await getLocale();
  const { t } = await getDict();

  const data = await getStore().read((db) => {
    const wid = session.workspace.id;
    const usage = db.usage
      .filter((u) => u.workspaceId === wid)
      .sort((a, b) => Date.parse(b.at) - Date.parse(a.at));

    const totalCost = monthlySpend(usage, wid);
    const totalInputTokens = usage.reduce((s, u) => s + u.inputTokens, 0);
    const totalOutputTokens = usage.reduce((s, u) => s + u.outputTokens, 0);

    return {
      usage,
      totalCost,
      totalCalls: usage.length,
      totalInputTokens,
      totalOutputTokens,
    };
  });

  const budget = session.workspace.monthlyBudgetUsd;
  const percent = budget > 0 ? (data.totalCost / budget) * 100 : 0;

  return (
    <div style={{ display: "grid", gap: "var(--space-6)" }}>
      <div>
        <h1 style={{ fontSize: "var(--text-28)" }}>{t.usage.title}</h1>
        <p className="muted" style={{ fontSize: "var(--text-14)" }}>
          {t.usage.lead}
        </p>
      </div>

      {/* Budget alerts */}
      {percent >= 100 && (
        <div className="alert alert-danger" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <AlertCircle size={18} aria-hidden="true" />
          <span>{t.usage.alert100}</span>
        </div>
      )}
      {percent >= 80 && percent < 100 && (
        <div className="alert alert-warning" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <AlertTriangle size={18} aria-hidden="true" />
          <span>{t.usage.alert80}</span>
        </div>
      )}
      {percent >= 50 && percent < 80 && (
        <div className="alert alert-warning" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <AlertTriangle size={18} aria-hidden="true" />
          <span>{t.usage.alert50}</span>
        </div>
      )}

      {/* Usage summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        <div className="panel" style={{ display: "grid", gap: "var(--space-1)" }}>
          <span className="muted" style={{ fontSize: "var(--text-12)" }}>{t.usage.month}</span>
          <div style={{ fontSize: "var(--text-28)", fontWeight: 700 }}>
            ${data.totalCost.toFixed(6)}
          </div>
          <div className="muted" style={{ fontSize: "var(--text-12)" }}>
            Anggaran: ${budget} ({percent.toFixed(1)}%)
          </div>
        </div>

        <div className="panel" style={{ display: "grid", gap: "var(--space-1)" }}>
          <span className="muted" style={{ fontSize: "var(--text-12)" }}>{t.usage.calls}</span>
          <div style={{ fontSize: "var(--text-28)", fontWeight: 700 }}>
            {data.totalCalls}
          </div>
          <div className="muted" style={{ fontSize: "var(--text-12)" }}>
            Panggilan model AI tercatat
          </div>
        </div>

        <div className="panel" style={{ display: "grid", gap: "var(--space-1)" }}>
          <span className="muted" style={{ fontSize: "var(--text-12)" }}>{t.usage.tokens}</span>
          <div style={{ fontSize: "var(--text-24)", fontWeight: 700 }}>
            {data.totalInputTokens} / {data.totalOutputTokens}
          </div>
          <div className="muted" style={{ fontSize: "var(--text-12)" }}>
            Total: {data.totalInputTokens + data.totalOutputTokens} token
          </div>
        </div>
      </div>

      {/* Calls table */}
      <div className="panel" style={{ display: "grid", gap: "var(--space-3)" }}>
        <h2 style={{ fontSize: "var(--text-18)" }}>Riwayat Panggilan Model ({data.usage.length})</h2>

        {data.usage.length === 0 ? (
          <p className="muted" style={{ fontSize: "var(--text-14)" }}>{t.usage.empty}</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Penyedia</th>
                  <th>Token In</th>
                  <th>Token Out</th>
                  <th>Latensi</th>
                  <th>Biaya (USD)</th>
                  <th>Waktu</th>
                  <th>Run</th>
                </tr>
              </thead>
              <tbody>
                {data.usage.map((u) => (
                  <tr key={u.id}>
                    <td><code>{u.model}</code></td>
                    <td><span className="badge">{u.provider}</span></td>
                    <td>{u.inputTokens}</td>
                    <td>{u.outputTokens}</td>
                    <td>{u.latencyMs}ms</td>
                    <td><code>${u.costUsd.toFixed(6)}</code></td>
                    <td className="muted" style={{ fontSize: "var(--text-12)" }}>
                      {new Date(u.at).toLocaleTimeString(locale === "id" ? "id-ID" : "en-US")}
                    </td>
                    <td>
                      <Link href={`/app/runs/${u.runId}`} className="btn btn-ghost btn-sm">
                        <span>Lihat</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

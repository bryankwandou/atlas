import { requireSession } from "@/lib/auth/session";
import { getLocale, getDict } from "@/lib/i18n";
import { SettingsForm } from "@/components/SettingsForm";

export default async function SettingsPage() {
  const session = await requireSession();
  const locale = await getLocale();
  const { t } = await getDict();

  return (
    <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "680px" }}>
      <div>
        <h1 style={{ fontSize: "var(--text-28)" }}>{t.settings.title}</h1>
        <p className="muted" style={{ fontSize: "var(--text-14)" }}>
          Kelola nama, anggaran model AI, dan kebijakan privasi data untuk ruang kerja ini
        </p>
      </div>

      <div className="panel">
        <SettingsForm
          workspace={session.workspace}
          role={session.role}
          dict={t}
        />
      </div>
    </div>
  );
}

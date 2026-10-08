import Link from "next/link";
import {
  LayoutDashboard,
  GitBranch,
  History,
  Boxes,
  ShieldAlert,
  Coins,
  Settings,
  LogOut,
  Cpu,
  User as UserIcon,
} from "lucide-react";
import { requireSession } from "@/lib/auth/session";
import { getLocale, getDict } from "@/lib/i18n";
import { getStore } from "@/lib/db/store";
import { logoutAction } from "@/app/actions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleToggle } from "@/components/LocaleToggle";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const locale = await getLocale();
  const { t } = await getDict();

  const pendingApprovals = await getStore().read((db) =>
    db.approvals.filter((a) => a.workspaceId === session.workspace.id && a.status === "pending").length
  );

  const isLiveProvider = !!process.env.OPENAI_API_KEY;

  const navItems = [
    { href: "/app", label: t.app.dashboard, icon: LayoutDashboard },
    { href: "/app/workflows", label: t.app.workflows, icon: GitBranch },
    { href: "/app/runs", label: t.app.runs, icon: History },
    { href: "/templates", label: t.app.templates, icon: Boxes },
    {
      href: "/app/approvals",
      label: t.app.approvals,
      icon: ShieldAlert,
      badge: pendingApprovals > 0 ? pendingApprovals : null,
      badgeType: "warning",
    },
    { href: "/app/usage", label: t.app.usage, icon: Coins },
    { href: "/app/settings", label: t.app.settings, icon: Settings },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Topbar */}
      <header
        role="banner"
        style={{
          height: "60px",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 var(--space-5)",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <Link
            href="/app"
            style={{
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "var(--text-18)",
              letterSpacing: "-0.03em",
            }}
          >
            Atlas
          </Link>

          <span className="muted" style={{ fontSize: "var(--text-14)" }}>/</span>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span style={{ fontWeight: 600, fontSize: "var(--text-14)" }}>
              {session.workspace.name}
            </span>
            <span className="badge" style={{ fontSize: "11px" }}>
              {session.workspace.privacyMode}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          {/* Provider status */}
          <div className="desktop-header-status">
            <span className={`badge ${isLiveProvider ? "badge-success" : "badge-accent"}`}>
              <Cpu size={12} aria-hidden="true" />
              <span>{isLiveProvider ? t.app.providerLive : t.app.providerMock}</span>
            </span>

            {pendingApprovals > 0 && (
              <Link href="/app/approvals" style={{ textDecoration: "none" }}>
                <span className="badge badge-warning">
                  <ShieldAlert size={12} aria-hidden="true" />
                  <span>{pendingApprovals} {t.app.pendingApprovals}</span>
                </span>
              </Link>
            )}
          </div>

          <LocaleToggle currentLocale={locale} />
          <ThemeToggle />

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", borderLeft: "1px solid var(--color-border)", paddingLeft: "var(--space-3)" }}>
            <span className="muted" style={{ fontSize: "var(--text-14)", display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
              <UserIcon size={14} aria-hidden="true" />
              <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {session.user.name}
              </span>
            </span>

            <form action={logoutAction}>
              <button
                type="submit"
                className="icon-btn"
                title={t.auth.logout}
                aria-label={t.auth.logout}
                style={{ width: "36px", height: "36px", minWidth: "36px", minHeight: "36px" }}
              >
                <LogOut size={16} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main shell layout: sidebar + content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside
          role="navigation"
          aria-label="Navigasi aplikasi"
          style={{
            width: "240px",
            borderRight: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            padding: "var(--space-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
          className="app-sidebar"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-2) var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-14)",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "var(--color-text)",
                  minHeight: "44px",
                }}
                className="sidebar-link"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Icon size={18} aria-hidden="true" style={{ color: "var(--color-muted)" }} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="badge badge-warning" style={{ fontSize: "11px" }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </aside>

        {/* Content Area */}
        <main
          id="main-content"
          style={{
            flex: 1,
            padding: "var(--space-6) var(--space-6)",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Navigasi cepat ponsel"
        style={{
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          position: "sticky",
          bottom: 0,
          zIndex: 30,
          display: "flex",
          justifyContent: "space-around",
          padding: "var(--space-2) 0",
        }}
        className="app-mobile-nav"
      >
        <Link href="/app" style={{ display: "grid", placeItems: "center", padding: "var(--space-2)", textDecoration: "none" }}>
          <LayoutDashboard size={20} aria-hidden="true" />
          <span style={{ fontSize: "10px", marginTop: "2px" }}>Dasbor</span>
        </Link>
        <Link href="/app/workflows" style={{ display: "grid", placeItems: "center", padding: "var(--space-2)", textDecoration: "none" }}>
          <GitBranch size={20} aria-hidden="true" />
          <span style={{ fontSize: "10px", marginTop: "2px" }}>Workflow</span>
        </Link>
        <Link href="/app/approvals" style={{ display: "grid", placeItems: "center", padding: "var(--space-2)", textDecoration: "none", position: "relative" }}>
          <ShieldAlert size={20} aria-hidden="true" />
          {pendingApprovals > 0 && (
            <span style={{ position: "absolute", top: "4px", right: "8px", width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-warning)" }} />
          )}
          <span style={{ fontSize: "10px", marginTop: "2px" }}>Persetujuan</span>
        </Link>
        <Link href="/app/runs" style={{ display: "grid", placeItems: "center", padding: "var(--space-2)", textDecoration: "none" }}>
          <History size={20} aria-hidden="true" />
          <span style={{ fontSize: "10px", marginTop: "2px" }}>Riwayat</span>
        </Link>
        <Link href="/app/settings" style={{ display: "grid", placeItems: "center", padding: "var(--space-2)", textDecoration: "none" }}>
          <Settings size={20} aria-hidden="true" />
          <span style={{ fontSize: "10px", marginTop: "2px" }}>Pengaturan</span>
        </Link>
      </nav>
    </div>
  );
}

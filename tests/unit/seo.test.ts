import { describe, it, expect } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { templates } from "@/lib/templates/catalog";

describe("Technical SEO & Crawlability Configuration", () => {
  it("robots.ts allows root and restricts private application paths", () => {
    const config = robots();
    expect(config.sitemap).toContain("sitemap.xml");

    const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules;
    expect(rules.allow).toBe("/");
    expect(rules.disallow).toContain("/app/");
    expect(rules.disallow).toContain("/api/");
  });

  it("sitemap.ts includes all high-priority service, solution and 120 template pages", () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThanOrEqual(125);

    const urls = entries.map((e) => e.url);

    // Verify root & services
    expect(urls).toContain("https://atlas-automation.vercel.app");
    expect(urls).toContain("https://atlas-automation.vercel.app/services/implementation-sprint");
    expect(urls).toContain("https://atlas-automation.vercel.app/services/automation-audit");

    // Verify solutions
    expect(urls).toContain("https://atlas-automation.vercel.app/solutions/marketing-agencies");
    expect(urls).toContain("https://atlas-automation.vercel.app/solutions/sales-operations");
    expect(urls).toContain("https://atlas-automation.vercel.app/solutions/customer-support");

    // Verify template pages
    templates.slice(0, 10).forEach((tpl) => {
      expect(urls).toContain(`https://atlas-automation.vercel.app/templates/${tpl.slug}`);
    });
  });
});

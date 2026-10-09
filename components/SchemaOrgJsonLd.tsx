import React from "react";

interface SchemaOrgJsonLdProps {
  type: "organization" | "service" | "software" | "faq";
  data?: Record<string, unknown>;
}

export function SchemaOrgJsonLd({ type, data }: SchemaOrgJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://atlas-automation.vercel.app";

  let schema: Record<string, unknown>;

  if (type === "organization") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Atlas Automation",
      url: baseUrl,
      logo: `${baseUrl}/icon.png`,
      description:
        "Enterprise AI workflow automation platform and done-for-you implementation sprints with human approval gates.",
      sameAs: ["https://github.com/bryankwandou/atlas"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "contact@atlas-automation.vercel.app",
        availableLanguage: ["English", "Indonesian"],
      },
    };
  } else if (type === "service") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "5-Day Done-For-You Automation Implementation Sprint",
      serviceType: "Business Process Automation Consulting",
      provider: {
        "@type": "Organization",
        name: "Atlas Automation",
        url: baseUrl,
      },
      areaServed: "Worldwide",
      description:
        "Full-cycle implementation: workflow audit, custom schema architecture, channel integration, human approval drawer, and production deployment in 5 business days.",
      offers: {
        "@type": "Offer",
        price: "7500000",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
      },
      ...data,
    };
  } else if (type === "software") {
    schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Atlas Workflow Engine",
      operatingSystem: "Cloud / Serverless",
      applicationCategory: "BusinessApplication",
      url: baseUrl,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "120 Validated Industry Templates",
        "Durable PostgreSQL State",
        "Strict Human Approval Gates",
        "Immutable Audit Trace Logging",
      ],
      ...data,
    };
  } else if (type === "faq") {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      ...data,
    };
  } else {
    schema = {
      "@context": "https://schema.org",
      "@type": "Thing",
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

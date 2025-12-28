"use client";

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  searchUrlTemplate?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

// Organization Schema Component
export function OrganizationSchema({
  name = "Akdenar",
  url = "https://www.akdenar.com",
  logo = "https://www.akdenar.com/logo.svg",
  description = "India's leading B2B e-commerce platform connecting wholesalers, retailers, and manufacturers",
  sameAs = [
    "https://www.facebook.com/akdenar",
    "https://www.twitter.com/akdenar",
    "https://www.linkedin.com/company/akdenar",
    "https://www.instagram.com/akdenar",
  ],
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-92026-52922",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Third Floor, 69, New Mangalpuri",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110030",
      addressCountry: "IN",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema with Sitelinks Search Box
export function WebsiteSchema({
  name = "Akdenar",
  url = "https://www.akdenar.com",
  searchUrlTemplate = "https://www.akdenar.com/search?q={search_term_string}",
}: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: searchUrlTemplate,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema Component
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined SEO Schemas for Homepage
export function HomepageSEOSchemas() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
    </>
  );
}

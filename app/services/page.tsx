import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Study Abroad Consultancy Services | Nexsus Education Nepal",
  description:
    "Comprehensive study abroad services: career counseling, SOP writing, test preparation (IELTS/PTE/GRE), student visa assistance, scholarship guidance & pre-departure support for Nepali students.",
  keywords: [
    "study abroad services Nepal",
    "education consultancy services",
    "IELTS preparation Nepal",
    "student visa assistance Nepal",
    "SOP writing service",
    "career counseling Nepal",
    "scholarship guidance Nepal",
    "pre-departure support",
    "Nexsus education services",
    "study abroad consultancy Nepal",
  ],
  openGraph: {
    title: "Study Abroad Services | Nexsus Education Nepal",
    description:
      "Complete study abroad support: counseling, test prep, SOP writing, visa assistance, scholarships & pre-departure briefing.",
    type: "website",
  },
  alternates: {
    canonical: "/services",
  },
};

function ServicesJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Educational Consultancy",
    provider: {
      "@type": "EducationalOrganization",
      name: "Nexsus Educational Consultancy",
      url: "https://nexsuseducation.com",
    },
    areaServed: { "@type": "Country", name: "Nepal" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Study Abroad Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Career Counseling" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Test Preparation (IELTS, PTE, GRE, SAT)" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SOP & Application Writing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Student Visa Assistance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Scholarship Guidance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pre-Departure Support" } },
      ],
    },
    url: "https://nexsuseducation.com/services",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ServicesPage() {
  return (
    <>
      <ServicesJsonLd />
      <ServicesClient />
    </>
  );
}

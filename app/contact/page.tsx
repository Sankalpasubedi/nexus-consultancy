import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Nexsus Educational Consultancy | Free Consultation | Study Abroad Nepal",
  description:
    "Contact Nexsus Educational Consultancy for a free study abroad consultation. Visit our branches in Kathmandu, Pokhara, Chitwan & across Nepal. Call, email or visit us today.",
  keywords: [
    "contact Nexsus education",
    "study abroad consultation Nepal",
    "free consultation study abroad",
    "Nexsus Kathmandu address",
    "Nexsus branches Nepal",
    "education consultancy contact",
    "study abroad inquiry Nepal",
    "Nexsus phone number",
  ],
  openGraph: {
    title: "Contact Us | Nexsus Educational Consultancy Nepal",
    description: "Get a free study abroad consultation. Visit our branches across Nepal.",
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
};

function ContactJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "EducationalOrganization",
      name: "Nexsus Educational Consultancy",
      url: "https://nexsuseducation.com",
      telephone: "+977-1-4444444",
      email: "info@nexsuseducation.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Putalisadak",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+977-1-4444444",
        availableLanguage: ["English", "Nepali"],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactJsonLd />
      <ContactClient />
    </>
  );
}

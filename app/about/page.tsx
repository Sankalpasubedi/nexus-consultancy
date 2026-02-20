import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Nexsus Educational Consultancy | Leading Study Abroad Agency in Nepal",
  description:
    "Nexsus Educational Consultancy is Nepal's leading study abroad agency with 15+ years of experience. 10,000+ students placed at top universities across 8 countries. Multiple branches across Nepal.",
  keywords: [
    "about Nexsus education",
    "Nexsus educational consultancy",
    "study abroad consultancy Nepal",
    "best education consultancy Nepal",
    "study abroad agency Kathmandu",
    "Nepal education consultant",
    "Nexsus branches Nepal",
    "trusted education consultancy Nepal",
  ],
  openGraph: {
    title: "About Nexsus Educational Consultancy | Nepal's Leading Study Abroad Agency",
    description: "15+ years of experience. 10,000+ students placed worldwide. Nepal's trusted study abroad partner.",
    type: "website",
  },
  alternates: {
    canonical: "/about",
  },
};

function AboutJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "EducationalOrganization",
      name: "Nexsus Educational Consultancy",
      url: "https://nexsuseducation.com",
      foundingDate: "2009",
      description: "Nepal's leading study abroad consultancy with 15+ years of experience.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Putalisadak",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      areaServed: [
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "New Zealand" },
        { "@type": "Country", name: "Japan" },
        { "@type": "Country", name: "South Korea" },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutJsonLd />
      <AboutClient />
    </>
  );
}

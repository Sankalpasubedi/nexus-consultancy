import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search Courses, Scholarships & Universities",
  description:
    "Search for study abroad courses, scholarships, universities, and events. Find the perfect program at top universities worldwide. Expert guidance from Nexsus Educational Consultancy.",
  keywords: [
    "search courses abroad",
    "find scholarships",
    "university search",
    "study abroad programs",
    "international education",
    "course finder",
    "scholarship search",
  ],
  openGraph: {
    title: "Search Study Abroad Programs | Nexsus Education Nepal",
    description:
      "Find courses, scholarships, and universities for studying abroad. Start your international education journey today.",
    type: "website",
  },
  alternates: {
    canonical: "/search",
  },
};

function SearchJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nexsus Educational Consultancy",
    url: "https://nexsuseducation.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://nexsuseducation.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function SearchPage() {
  return (
    <>
      <SearchJsonLd />
      <SearchClient />
    </>
  );
}

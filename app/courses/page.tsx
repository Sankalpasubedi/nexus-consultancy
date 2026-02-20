import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Study Abroad Courses & Programs | Nexsus Education Nepal",
  description:
    "Explore 1000+ study abroad courses in Information Technology, Business, Engineering, Health Sciences, Arts, Law & Social Sciences at top universities. Expert guidance for Nepali students.",
  keywords: [
    "study abroad courses",
    "courses for Nepali students",
    "international programs",
    "IT courses abroad",
    "business management abroad",
    "engineering abroad",
    "health sciences abroad",
    "study abroad from Nepal",
    "university programs abroad",
    "Nexsus education consultancy",
  ],
  openGraph: {
    title: "Study Abroad Courses & Programs | Nexsus Education Nepal",
    description:
      "Explore 1000+ study abroad courses at top universities worldwide. Get expert guidance from Nexsus Educational Consultancy.",
    type: "website",
  },
  alternates: {
    canonical: "/courses",
  },
};

function CoursesJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Study Abroad Course Categories",
    description: "Browse popular course categories for studying abroad",
    url: "https://nexsuseducation.com/courses",
    numberOfItems: 7,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Information Technology", url: "https://nexsuseducation.com/courses/information-technology" },
      { "@type": "ListItem", position: 2, name: "Business & Management", url: "https://nexsuseducation.com/courses/business-management" },
      { "@type": "ListItem", position: 3, name: "Engineering", url: "https://nexsuseducation.com/courses/engineering" },
      { "@type": "ListItem", position: 4, name: "Health Sciences", url: "https://nexsuseducation.com/courses/health-sciences" },
      { "@type": "ListItem", position: 5, name: "Arts & Design", url: "https://nexsuseducation.com/courses/arts-and-design" },
      { "@type": "ListItem", position: 6, name: "Law & Legal Studies", url: "https://nexsuseducation.com/courses/law-and-legal-studies" },
      { "@type": "ListItem", position: 7, name: "Social Sciences", url: "https://nexsuseducation.com/courses/social-sciences" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function CoursesPage() {
  return (
    <>
      <CoursesJsonLd />
      <CoursesClient />
    </>
  );
}

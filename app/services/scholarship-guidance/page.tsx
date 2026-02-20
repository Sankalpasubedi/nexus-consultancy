import type { Metadata } from "next";
import ScholarshipClient from "./ScholarshipClient";

export const metadata: Metadata = {
  title: "Scholarship Guidance | Study Abroad Scholarships | Nexsus Education Nepal",
  description:
    "Find and win scholarships for studying abroad. Over NPR 5 Billion in scholarships secured. Expert guidance for merit, need-based & country-specific scholarships. Nexsus Education Nepal.",
  keywords: [
    "scholarship guidance Nepal",
    "study abroad scholarships",
    "scholarships for Nepali students",
    "merit scholarships abroad",
    "need-based scholarships",
    "university scholarships abroad",
    "scholarship application help",
    "Nexsus scholarship guidance",
    "Australia scholarships Nepal",
    "USA scholarships Nepal",
  ],
  openGraph: {
    title: "Scholarship Guidance | Study Abroad Scholarships | Nexsus Education Nepal",
    description: "NPR 5 Billion+ in scholarships secured. Expert scholarship guidance for Nepali students.",
    type: "website",
  },
  alternates: {
    canonical: "/services/scholarship-guidance",
  },
};

export default function ScholarshipGuidancePage() {
  return <ScholarshipClient />;
}

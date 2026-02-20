import type { Metadata } from "next";
import DocumentsClient from "./DocumentsClient";

export const metadata: Metadata = {
  title: "Documents Required for Study Abroad | Complete Checklist | Nexsus Education Nepal",
  description:
    "Complete document checklist for studying abroad from Nepal. Academic transcripts, financial documents, visa requirements, SOP & recommendation letters for all major destinations.",
  keywords: [
    "documents required study abroad",
    "study abroad document checklist Nepal",
    "documents for student visa",
    "academic documents study abroad",
    "financial documents study abroad",
    "SOP documents required",
    "study abroad paperwork Nepal",
    "visa documents checklist",
  ],
  openGraph: {
    title: "Documents Required for Study Abroad | Nexsus Education Nepal",
    description: "Complete document checklist for Nepali students planning to study abroad.",
    type: "website",
  },
  alternates: {
    canonical: "/study-abroad/documents-required",
  },
};

export default function DocumentsRequiredPage() {
  return <DocumentsClient />;
}

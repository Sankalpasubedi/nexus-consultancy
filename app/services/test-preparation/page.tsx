import type { Metadata } from "next";
import TestPrepClient from "./TestPrepClient";

export const metadata: Metadata = {
  title: "Test Preparation | IELTS, PTE, TOEFL, GRE, SAT Coaching | Nexsus Education Nepal",
  description:
    "Expert test preparation for IELTS, PTE, TOEFL, GRE, GMAT & SAT. Small batch sizes, experienced instructors, mock tests & score improvement guarantee. Nexsus Education Nepal.",
  keywords: [
    "IELTS preparation Nepal",
    "PTE coaching Nepal",
    "TOEFL preparation Kathmandu",
    "GRE coaching Nepal",
    "SAT preparation Nepal",
    "GMAT coaching Nepal",
    "test preparation study abroad",
    "English proficiency test Nepal",
    "Nexsus test preparation",
    "IELTS coaching Kathmandu",
  ],
  openGraph: {
    title: "Test Preparation | IELTS, PTE, GRE, SAT | Nexsus Education Nepal",
    description: "Expert coaching for IELTS, PTE, TOEFL, GRE & SAT with proven score improvement.",
    type: "website",
  },
  alternates: {
    canonical: "/services/test-preparation",
  },
};

export default function TestPreparationPage() {
  return <TestPrepClient />;
}

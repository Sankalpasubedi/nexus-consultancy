import type { Metadata } from "next";
import CounselingClient from "./CounselingClient";

export const metadata: Metadata = {
  title: "Career Counseling for Study Abroad | Expert Guidance | Nexsus Education Nepal",
  description:
    "Personalized career counseling for Nepali students planning to study abroad. Expert university selection, course matching & career pathway mapping. Free initial consultation.",
  keywords: [
    "career counseling Nepal",
    "study abroad counseling",
    "education counseling Nepal",
    "university selection help",
    "course matching Nepal",
    "study abroad guidance",
    "career pathway mapping",
    "Nexsus career counseling",
  ],
  openGraph: {
    title: "Career Counseling for Study Abroad | Nexsus Education Nepal",
    description: "Expert career counseling for Nepali students planning to study abroad.",
    type: "website",
  },
  alternates: {
    canonical: "/services/career-counseling",
  },
};

export default function CareerCounselingPage() {
  return <CounselingClient />;
}

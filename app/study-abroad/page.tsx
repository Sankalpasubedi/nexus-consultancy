import type { Metadata } from "next";
import StudyAbroadClient from "./StudyAbroadClient";

export const metadata: Metadata = {
  title: "Study Abroad from Nepal | Complete Guide & Resources | Nexsus Education",
  description:
    "Everything you need to study abroad from Nepal. Compare destinations, check document requirements, understand the application process & get expert guidance. Nexsus Educational Consultancy.",
  keywords: [
    "study abroad Nepal",
    "study abroad from Nepal",
    "study abroad guide Nepal",
    "how to study abroad Nepal",
    "study abroad consultancy Nepal",
    "international education Nepal",
    "Nexsus study abroad",
    "Nepal students abroad",
  ],
  openGraph: {
    title: "Study Abroad from Nepal | Nexsus Education",
    description: "Your complete guide to studying abroad from Nepal — destinations, documents, process & more.",
    type: "website",
  },
  alternates: {
    canonical: "/study-abroad",
  },
};

export default function StudyAbroadPage() {
  return <StudyAbroadClient />;
}

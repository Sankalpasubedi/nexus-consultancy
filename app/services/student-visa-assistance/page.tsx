import type { Metadata } from "next";
import VisaClient from "./VisaClient";

export const metadata: Metadata = {
  title: "Student Visa Assistance | Visa Application Support | Nexsus Education Nepal",
  description:
    "Expert student visa assistance with 98% success rate. Complete visa application support for Australia, Canada, USA, UK, New Zealand, Japan, South Korea & Europe. Nexsus Education Nepal.",
  keywords: [
    "student visa assistance Nepal",
    "visa application support",
    "student visa for Australia from Nepal",
    "student visa for Canada from Nepal",
    "USA student visa Nepal",
    "UK student visa assistance",
    "visa success rate Nepal",
    "Nexsus visa service",
    "study abroad visa help",
  ],
  openGraph: {
    title: "Student Visa Assistance | Nexsus Education Nepal",
    description: "98% visa success rate. Expert student visa application support for all major destinations.",
    type: "website",
  },
  alternates: {
    canonical: "/services/student-visa-assistance",
  },
};

export default function StudentVisaPage() {
  return <VisaClient />;
}

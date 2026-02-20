import type { Metadata } from "next";
import PreDepartureClient from "./PreDepartureClient";

export const metadata: Metadata = {
  title: "Pre-Departure Support | Prepare for Study Abroad | Nexsus Education Nepal",
  description:
    "Comprehensive pre-departure briefings for Nepali students going abroad. Accommodation guidance, cultural orientation, banking setup, airport assistance & student community connections.",
  keywords: [
    "pre-departure support Nepal",
    "pre-departure briefing study abroad",
    "prepare for study abroad",
    "accommodation abroad guidance",
    "cultural orientation Nepal",
    "study abroad preparation",
    "Nexsus pre-departure",
    "settle abroad help Nepal",
  ],
  openGraph: {
    title: "Pre-Departure Support | Nexsus Education Nepal",
    description: "Complete pre-departure preparation for Nepali students heading abroad.",
    type: "website",
  },
  alternates: {
    canonical: "/services/pre-departure-support",
  },
};

export default function PreDeparturePage() {
  return <PreDepartureClient />;
}

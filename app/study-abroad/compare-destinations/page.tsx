import type { Metadata } from "next";
import CompareDestinationsClient from "./CompareDestinationsClient";

export const metadata: Metadata = {
  title: "Compare Study Abroad Destinations | Best Countries for Nepali Students | Nexsus",
  description:
    "Compare 8 top study abroad destinations side-by-side: Australia, Canada, USA, UK, New Zealand, Japan, South Korea & Europe. Costs, education quality, work opportunities & visa requirements.",
  keywords: [
    "compare study abroad destinations",
    "best country to study abroad from Nepal",
    "study abroad destinations comparison",
    "cheapest country to study abroad Nepal",
    "best universities abroad for Nepali students",
    "Australia vs Canada study abroad",
    "UK vs USA study abroad",
    "study abroad cost comparison",
  ],
  openGraph: {
    title: "Compare Study Abroad Destinations | Nexsus Education Nepal",
    description: "Side-by-side comparison of 8 top study abroad destinations for Nepali students.",
    type: "website",
  },
  alternates: {
    canonical: "/study-abroad/compare-destinations",
  },
};

export default function CompareDestinationsPage() {
  return <CompareDestinationsClient />;
}

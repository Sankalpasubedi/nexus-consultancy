import type { Metadata } from "next";
import DestinationsClient from "./DestinationsClient";

export const metadata: Metadata = {
  title: "Study Abroad Destinations | Top 8 Countries for Nepali Students | Nexsus Education",
  description:
    "Explore 8 top study abroad destinations: Australia, Canada, USA, UK, New Zealand, Japan, South Korea & Europe. Universities, costs, visa info & admission requirements for Nepali students.",
  keywords: [
    "study abroad destinations",
    "best countries to study abroad from Nepal",
    "study in Australia from Nepal",
    "study in Canada from Nepal",
    "study in USA from Nepal",
    "study in UK from Nepal",
    "study in New Zealand from Nepal",
    "study in Japan from Nepal",
    "study in South Korea from Nepal",
    "study in Europe from Nepal",
    "Nexsus destinations",
  ],
  openGraph: {
    title: "Study Abroad Destinations | Nexsus Education Nepal",
    description: "Explore 8 top study abroad destinations for Nepali students.",
    type: "website",
  },
  alternates: {
    canonical: "/destinations",
  },
};

function DestinationsJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Study Abroad Destinations",
    description: "Top 8 study abroad destinations for Nepali students",
    url: "https://nexsuseducation.com/destinations",
    numberOfItems: 8,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Study in Australia", url: "https://nexsuseducation.com/destinations/study-in-australia" },
      { "@type": "ListItem", position: 2, name: "Study in Canada", url: "https://nexsuseducation.com/destinations/study-in-canada" },
      { "@type": "ListItem", position: 3, name: "Study in USA", url: "https://nexsuseducation.com/destinations/study-in-usa" },
      { "@type": "ListItem", position: 4, name: "Study in UK", url: "https://nexsuseducation.com/destinations/study-in-uk" },
      { "@type": "ListItem", position: 5, name: "Study in New Zealand", url: "https://nexsuseducation.com/destinations/study-in-new-zealand" },
      { "@type": "ListItem", position: 6, name: "Study in Japan", url: "https://nexsuseducation.com/destinations/study-in-japan" },
      { "@type": "ListItem", position: 7, name: "Study in South Korea", url: "https://nexsuseducation.com/destinations/study-in-south-korea" },
      { "@type": "ListItem", position: 8, name: "Study in Europe", url: "https://nexsuseducation.com/destinations/study-in-europe" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function DestinationsPage() {
  return (
    <>
      <DestinationsJsonLd />
      <DestinationsClient />
    </>
  );
}

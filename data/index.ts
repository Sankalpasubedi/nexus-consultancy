import australiaData from "./australia";
import canadaData from "./canada";
import usaData from "./usa";
import ukData from "./uk";
import newZealandData from "./newzealand";
import japanData from "./japan";
import southKoreaData from "./southkorea";
import europeData from "./europe";
import { CountryDataType } from "@/types/country";

export const countryDataMap: Record<string, CountryDataType> = {
  australia: australiaData,
  canada: canadaData,
  usa: usaData,
  uk: ukData,
  "new-zealand": newZealandData,
  japan: japanData,
  "south-korea": southKoreaData,
  europe: europeData,
};

export const destinations = [
  { id: "usa", name: "United States", slug: "usa", image: "/destinations/USA.png", description: "Pursue excellence at the world's leading universities", flagCode: "us" },
  { id: "australia", name: "Australia", slug: "australia", image: "/destinations/Australia.png", description: "Experience world-class education in the land down under", flagCode: "au" },
  { id: "new-zealand", name: "New Zealand", slug: "new-zealand", image: "/destinations/newzeland.png", description: "Experience innovative education in stunning natural beauty", flagCode: "nz" },
  { id: "canada", name: "Canada", slug: "canada", image: "/destinations/canada.png", description: "World-class education with excellent post-study work opportunities", flagCode: "ca" },
  { id: "south-korea", name: "South Korea", slug: "south-korea", image: "/destinations/skorea.png", description: "Cutting-edge technology and rich cultural heritage await you", flagCode: "kr" },
  { id: "europe", name: "Europe", slug: "europe", image: "/destinations/europe.png", description: "Diverse cultures and world-renowned academic institutions", flagCode: "eu" },
  { id: "uk", name: "United Kingdom", slug: "uk", image: "/destinations/uk.png", description: "Study at prestigious institutions with centuries of academic excellence", flagCode: "gb" },
  { id: "japan", name: "Japan", slug: "japan", image: "/destinations/japan.png", description: "Blend of tradition and innovation in world-class universities", flagCode: "jp" },
];

export {
  australiaData,
  canadaData,
  usaData,
  ukData,
  newZealandData,
  japanData,
  southKoreaData,
  europeData,
};

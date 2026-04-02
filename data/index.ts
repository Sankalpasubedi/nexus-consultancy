import australiaData from "./australia";
import canadaData from "./canada";
import usaData from "./usa";
import ukData from "./uk";
import newZealandData from "./newzealand";
import japanData from "./japan";
import southKoreaData from "./southkorea";
import europeData from "./europe";
import georgiaData from "./georgia";
import philippinesData from "./philippines";
import belarusData from "./belarus";
import { CountryDataType } from "@/types/country";

export const countryDataMap: Record<string, CountryDataType> = {
  "study-in-australia": australiaData,
  "study-in-canada": canadaData,
  "study-in-usa": usaData,
  "study-in-uk": ukData,
  "study-in-new-zealand": newZealandData,
  "study-in-japan": japanData,
  "study-in-south-korea": southKoreaData,
  "study-in-europe": europeData,
  "study-in-georgia": georgiaData,
  "study-in-philippines": philippinesData,
  "study-in-belarus": belarusData,
};

export const destinations = [
  { id: "study-in-usa", name: "United States", slug: "study-in-usa", image: "/destinations/USA.png", description: "Pursue excellence at the world's leading universities", flagCode: "us" },
  { id: "study-in-australia", name: "Australia", slug: "study-in-australia", image: "/destinations/Australia.png", description: "Experience world-class education in the land down under", flagCode: "au" },
  { id: "study-in-new-zealand", name: "New Zealand", slug: "study-in-new-zealand", image: "/destinations/newzeland.png", description: "Experience innovative education in stunning natural beauty", flagCode: "nz" },
  { id: "study-in-canada", name: "Canada", slug: "study-in-canada", image: "/destinations/canada.png", description: "World-class education with excellent post-study work opportunities", flagCode: "ca" },
  { id: "study-in-south-korea", name: "South Korea", slug: "study-in-south-korea", image: "/destinations/skorea.png", description: "Cutting-edge technology and rich cultural heritage await you", flagCode: "kr" },
  { id: "study-in-europe", name: "Europe", slug: "study-in-europe", image: "/destinations/europe.png", description: "Diverse cultures and world-renowned academic institutions", flagCode: "eu" },
  { id: "study-in-uk", name: "United Kingdom", slug: "study-in-uk", image: "/destinations/uk.png", description: "Study at prestigious institutions with centuries of academic excellence", flagCode: "gb" },
  { id: "study-in-japan", name: "Japan", slug: "study-in-japan", image: "/destinations/japan.png", description: "Blend of tradition and innovation in world-class universities", flagCode: "jp" },
  { id: "study-in-georgia", name: "Georgia", slug: "study-in-georgia", image: "/destinations/Georgia.jpg", description: "Affordable European-style study with simple admissions and welcoming campuses", flagCode: "ge" },
  { id: "study-in-philippines", name: "Philippines", slug: "study-in-philippines", image: "/destinations/Philippines.jpg", description: "English-friendly education and popular health science programs", flagCode: "ph" },
  { id: "study-in-belarus", name: "Belarus", slug: "study-in-belarus", image: "/destinations/Belarus.jpg", description: "Affordable medical and technical study options in Europe", flagCode: "by" },
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

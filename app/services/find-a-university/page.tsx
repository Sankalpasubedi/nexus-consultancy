import type { Metadata } from "next";
import FindUniversityClient from "./FindUniversityClient";

export const metadata: Metadata = {
  title: "Find a University | Nexsus Education",
  description:
    "Search and compare universities by destination, ranking, scholarship options, and campus profile to shortlist the right university.",
  alternates: {
    canonical: "/services/find-a-university",
  },
};

export default function FindUniversityPage() {
  return <FindUniversityClient />;
}

import AccommodationClient from "./AccommodationClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Accommodation Guide | Nexsus Education",
  description: "Find the perfect student housing abroad. Explore university dorms, private apartments, homestays, and shared housing options.",
};

export default function AccommodationPage() {
  return <AccommodationClient />;
}

import BranchesClient from "./BranchesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Branches | Nexsus Education",
  description: "Find Nexsus Education offices near you. Visit our branches across Nepal for personalized study abroad consultation and support.",
};

export default function BranchesPage() {
  return <BranchesClient />;
}

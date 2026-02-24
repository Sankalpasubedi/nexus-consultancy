import InsuranceClient from "./InsuranceClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Insurance Guide | Nexsus Education",
  description: "Comprehensive guide to health and travel insurance for international students. Learn about OSHC, UK health surcharge, and more.",
};

export default function InsurancePage() {
  return <InsuranceClient />;
}

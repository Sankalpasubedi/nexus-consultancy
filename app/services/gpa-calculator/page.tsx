import type { Metadata } from "next";
import GpaCalculatorClient from "./GpaCalculatorClient";

export const metadata: Metadata = {
  title: "GPA Calculator | Nexsus Education",
  description:
    "Convert percentage to GPA on 4.0, 7.0, and 10.0 scales with a simple calculator for students applying abroad.",
  keywords: [
    "GPA calculator",
    "percentage to GPA",
    "4.0 GPA scale",
    "7.0 GPA scale",
    "10.0 GPA scale",
    "study abroad GPA conversion",
  ],
  alternates: {
    canonical: "/services/gpa-calculator",
  },
};

export default function GpaCalculatorPage() {
  return <GpaCalculatorClient />;
}

import type { Metadata } from "next";
import HealthInsuranceClient from "./HealthInsuranceClient";

export const metadata: Metadata = {
  title: "Health Insurance | Nexsus Education",
  description:
    "Compare student health insurance options such as Bupa, Allianz Care, NZ Student Health, Medibank, travel insurance OVC, and OVSC.",
};

export default function HealthInsurancePage() {
  return <HealthInsuranceClient />;
}

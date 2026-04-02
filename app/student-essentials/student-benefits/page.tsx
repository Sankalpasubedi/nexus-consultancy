import type { Metadata } from "next";
import StudentBenefitsClient from "./StudentBenefitsClient";

export const metadata: Metadata = {
  title: "Student Benefits by Country | Nexsus Education",
  description:
    "Compare student-friendly bank cards, SIM options, and other benefits by destination country before you travel.",
};

export default function StudentBenefitsPage() {
  return <StudentBenefitsClient />;
}

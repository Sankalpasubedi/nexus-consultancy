import type { Metadata } from "next";
import GuardianshipClient from "./GuardianshipClient";

export const metadata: Metadata = {
  title: "Student Guardianship Support | Nexsus Education",
  description:
    "Guardianship and welfare support for international students under 18. Learn the process, responsibilities, and get help with compliant arrangements.",
};

export default function GuardianshipPage() {
  return <GuardianshipClient />;
}

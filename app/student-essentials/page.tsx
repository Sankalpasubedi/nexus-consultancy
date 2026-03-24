import type { Metadata } from "next";
import StudentEssentialsClient from "./StudentEssentialsClient";

export const metadata: Metadata = {
  title: "Student Essentials | Nexsus Education",
  description:
    "Explore housing, insurance, banking, guardianship, ISIC, and practical support services for students preparing to study abroad.",
};

export default function StudentEssentialsPage() {
  return <StudentEssentialsClient />;
}

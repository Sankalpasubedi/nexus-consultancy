import type { Metadata } from "next";
import StudentBankingClient from "./StudentBankingClient";

export const metadata: Metadata = {
  title: "Student Banking Support | Nexsus Education",
  description:
    "Open a student-friendly bank account before you arrive. Get guidance on documents, account setup, transfers, and banking essentials.",
};

export default function StudentBankingPage() {
  return <StudentBankingClient />;
}

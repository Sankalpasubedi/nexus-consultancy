import DashboardClient from "./DashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard | Nexsus Education",
  description: "Track your study abroad application progress, upcoming tasks, and connect with your counselor.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}

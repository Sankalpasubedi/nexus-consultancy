import type { Metadata } from "next";
import WhyStudyAbroadClient from "./WhyStudyAbroadClient";

export const metadata: Metadata = {
  title: "Why Study Abroad | Benefits of International Education | Nexsus",
  description:
    "Discover the top benefits of studying abroad: world-class education, career advancement, personal growth, and global networking opportunities for Nepali students.",
  keywords: [
    "why study abroad",
    "benefits of studying abroad",
    "advantages of international education",
    "study abroad from Nepal",
    "international student benefits",
    "career opportunities abroad",
    "global education",
    "study abroad destinations",
  ],
  openGraph: {
    title: "Why Study Abroad | Benefits of International Education | Nexsus",
    description:
      "Discover the top benefits of studying abroad for Nepali students.",
    images: ["/services/NEX-_-1.jpg"],
  },
};

export default function WhyStudyAbroadPage() {
  return <WhyStudyAbroadClient />;
}

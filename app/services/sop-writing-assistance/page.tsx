import type { Metadata } from "next";
import SopClient from "./SopClient";

export const metadata: Metadata = {
  title: "SOP Writing Assistance | Statement of Purpose Help | Nexsus Education Nepal",
  description:
    "Professional SOP, personal statement & recommendation letter writing assistance for university applications. Expert writers with 98% acceptance rate. Nexsus Educational Consultancy Nepal.",
  keywords: [
    "SOP writing service Nepal",
    "statement of purpose writing",
    "personal statement help",
    "university application writing",
    "recommendation letter writing",
    "SOP for study abroad",
    "application essay help Nepal",
    "Nexsus SOP service",
  ],
  openGraph: {
    title: "SOP Writing Assistance | Nexsus Education Nepal",
    description: "Professional SOP & application writing with 98% acceptance rate.",
    type: "website",
  },
  alternates: {
    canonical: "/services/sop-writing-assistance",
  },
};

export default function SopWritingPage() {
  return <SopClient />;
}

import type { Metadata } from "next";
import GuideClient from "./GuideClient";

export const metadata: Metadata = {
  title: "Complete Guide to Studying Abroad | Nexsus Education Nepal",
  description:
    "Your complete roadmap to studying abroad from Nepal. Everything from choosing a destination, preparing finances, applications, visas, to settling in your new country.",
  keywords: [
    "complete guide study abroad",
    "study abroad guide Nepal",
    "how to study abroad from Nepal",
    "study abroad tips Nepal",
    "study abroad planning",
    "study abroad roadmap",
    "international education guide",
    "Nexsus study abroad guide",
  ],
  openGraph: {
    title: "Complete Guide to Studying Abroad | Nexsus Education Nepal",
    description: "Your complete roadmap to studying abroad from Nepal.",
    type: "website",
  },
  alternates: {
    canonical: "/study-abroad/complete-guide",
  },
};

export default function CompleteGuidePage() {
  return <GuideClient />;
}

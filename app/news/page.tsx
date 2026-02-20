import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "News & Events | Study Abroad Updates | Nexsus Education Nepal",
  description:
    "Latest news, events & updates from Nexsus Educational Consultancy. Education fairs, scholarship deadlines, visa policy changes & study abroad events in Nepal.",
  keywords: [
    "study abroad news Nepal",
    "education events Nepal",
    "scholarship deadlines Nepal",
    "visa policy updates",
    "education fair Nepal",
    "Nexsus education events",
    "study abroad updates",
    "university events Nepal",
  ],
  openGraph: {
    title: "News & Events | Nexsus Education Nepal",
    description: "Latest study abroad news, events & updates for Nepali students.",
    type: "website",
  },
  alternates: {
    canonical: "/news",
  },
};

export default function NewsPage() {
  return <NewsClient />;
}

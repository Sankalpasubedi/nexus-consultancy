import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Study Abroad Blog | Tips, Guides & Resources | Nexsus Education Nepal",
  description:
    "Expert study abroad tips, IELTS preparation guides, scholarship advice, SOP writing tips & destination guides for Nepali students. Updated weekly by Nexsus Educational Consultancy.",
  keywords: [
    "study abroad blog",
    "IELTS tips Nepal",
    "study abroad tips Nepal",
    "scholarship advice Nepal",
    "SOP writing tips",
    "study abroad guides",
    "Nexsus education blog",
    "international student tips",
  ],
  openGraph: {
    title: "Study Abroad Blog | Nexsus Education Nepal",
    description: "Expert tips, guides & resources for Nepali students studying abroad.",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}

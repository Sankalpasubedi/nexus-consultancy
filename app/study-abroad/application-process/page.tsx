import type { Metadata } from "next";
import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
  title: "Study Abroad Application Process | Step-by-Step Guide | Nexsus Education Nepal",
  description:
    "Step-by-step guide to the study abroad application process for Nepali students. From university research to visa approval — timelines, tips & expert guidance at every stage.",
  keywords: [
    "study abroad application process",
    "how to apply study abroad Nepal",
    "study abroad step by step",
    "university application process",
    "study abroad timeline",
    "application process for abroad study",
    "Nexsus application support",
    "study abroad process Nepal",
  ],
  openGraph: {
    title: "Study Abroad Application Process | Nexsus Education Nepal",
    description: "Step-by-step guide to applying for study abroad from Nepal.",
    type: "website",
  },
  alternates: {
    canonical: "/study-abroad/application-process",
  },
};

export default function ApplicationProcessPage() {
  return <ProcessClient />;
}

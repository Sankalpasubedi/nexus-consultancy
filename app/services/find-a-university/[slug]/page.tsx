import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UniversityDetailClient from "./UniversityDetailClient";
import { getAllUniversities, getUniversityBySlug } from "../universityData";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllUniversities().map((university) => ({
    slug: university.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);

  if (!university) {
    return { title: "University Not Found | Nexsus Education" };
  }

  return {
    title: `${university.name} | University Details | Nexsus Education`,
    description: `${university.name} in ${university.country}. Ranking, tuition estimate, scholarship options, and application support guidance from Nexsus.`,
    alternates: {
      canonical: `/services/find-a-university/${university.slug}`,
    },
  };
}

export default async function UniversityDetailPage({ params }: Props) {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);

  if (!university) {
    notFound();
  }

  return <UniversityDetailClient university={university} />;
}

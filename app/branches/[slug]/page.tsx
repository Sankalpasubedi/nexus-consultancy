import type { Metadata } from "next";
import BranchDetailClient from "./BranchDetailClient";

const branchData: Record<string, { name: string; city: string }> = {
  "find-us-at-dillibazar": { name: "Dillibazar Main Office", city: "Kathmandu" },
  "find-us-at-baneshwor": { name: "Baneshwor Branch", city: "Kathmandu" },
  "find-us-at-samakhusi": { name: "Samakhusi Branch", city: "Kathmandu" },
  "find-us-at-banepa": { name: "Banepa Branch", city: "Banepa" },
  "find-us-at-birtamode": { name: "Birtamode Branch", city: "Birtamode" },
  "find-us-at-dhulabari": { name: "Dhulabari Branch", city: "Dhulabari" },
  // Legacy slugs for backwards compatibility
  "dillibazar": { name: "Dillibazar Main Office", city: "Kathmandu" },
  "baneshwor": { name: "Baneshwor Branch", city: "Kathmandu" },
  "samakhusi": { name: "Samakhusi Branch", city: "Kathmandu" },
  "banepa": { name: "Banepa Branch", city: "Banepa" },
  "birtamode": { name: "Birtamode Branch", city: "Birtamode" },
  "dhulabari": { name: "Dhulabari Branch", city: "Dhulabari" },
  "kathmandu": { name: "Kathmandu Main Office", city: "Kathmandu" },
  "pokhara": { name: "Pokhara Branch", city: "Pokhara" },
  "chitwan": { name: "Chitwan Branch", city: "Chitwan" },
};

export function generateStaticParams() {
  // Generate params for both new and legacy slug formats
  return [
    { slug: "find-us-at-dillibazar" },
    { slug: "find-us-at-baneshwor" },
    { slug: "find-us-at-samakhusi" },
    { slug: "find-us-at-banepa" },
    { slug: "find-us-at-birtamode" },
    { slug: "find-us-at-dhulabari" },
    // Legacy slugs for backwards compatibility
    { slug: "dillibazar" },
    { slug: "baneshwor" },
    { slug: "samakhusi" },
    { slug: "banepa" },
    { slug: "birtamode" },
    { slug: "dhulabari" },
    { slug: "kathmandu" },
    { slug: "pokhara" },
    { slug: "chitwan" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();
  const branch = branchData[normalizedSlug];

  if (!branch) {
    return { title: "Branch Not Found | Nexsus Education" };
  }

  return {
    title: `${branch.name} | Nexsus Education Nepal`,
    description: `Visit Nexsus Education ${branch.city} branch for personalized study abroad consultation. Get expert guidance on universities, visas, and scholarships.`,
  };
}

export default async function BranchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BranchDetailClient slug={slug.toLowerCase()} />;
}

import type { Metadata } from "next";
import BranchDetailClient from "./BranchDetailClient";

const branchData: Record<string, { name: string; city: string }> = {
  kathmandu: { name: "Kathmandu Main Office", city: "Kathmandu" },
  pokhara: { name: "Pokhara Branch", city: "Pokhara" },
  chitwan: { name: "Chitwan Branch", city: "Chitwan" },
};

export function generateStaticParams() {
  return Object.keys(branchData).map((slug) => ({ slug }));
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

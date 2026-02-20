import type { Metadata } from "next";
import { courseCategories } from "@/data/courses";
import CourseDetailClient from "./CourseDetailClient";

/* ─── Static Params (generate at build time) ─── */
export function generateStaticParams() {
  return courseCategories.map((cat) => ({ slug: cat.slug }));
}

/* ─── SEO Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courseCategories.find((c) => c.slug === slug);
  if (!course) {
    return { title: "Course Not Found" };
  }

  const title = `Study ${course.title} Abroad | Programs & Universities | Nexsus Education`;
  const description = `${course.description} Explore ${course.programs} ${course.title.toLowerCase()} programs at top universities worldwide. Get expert guidance from Nexsus Educational Consultancy Nepal.`;

  return {
    title,
    description,
    keywords: [
      `study ${course.title.toLowerCase()} abroad`,
      `${course.title.toLowerCase()} courses for Nepali students`,
      `${course.title.toLowerCase()} programs abroad`,
      `${course.title.toLowerCase()} universities`,
      `best ${course.title.toLowerCase()} courses`,
      "study abroad Nepal",
      "Nexsus education consultancy",
      "international education",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: course.image, width: 1200, height: 630, alt: course.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/courses/${slug}`,
    },
  };
}

/* ─── JSON-LD Structured Data ─── */
function CourseJsonLd({ slug }: { slug: string }) {
  const course = courseCategories.find((c) => c.slug === slug);
  if (!course) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.title} Programs Abroad`,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Nexsus Educational Consultancy",
      url: "https://nexsuseducation.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
    },
    numberOfCredits: course.programs,
    occupationalCategory: course.careers?.map((c) => c.title) ?? [],
    coursePrerequisites: course.requirements?.undergraduate?.join(", ") ?? "",
    image: course.image,
    url: `https://nexsuseducation.com/courses/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ─── Page ─── */
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <CourseJsonLd slug={slug} />
      <CourseDetailClient />
    </>
  );
}

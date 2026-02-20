import type { MetadataRoute } from "next";
import { countryDataMap } from "@/data";
import { courseCategories } from "@/data/courses";

const BASE_URL = "https://nexsuseducation.com";

const allSections = [
  "why-study-here",
  "universities",
  "admission",
  "student-visa",
  "living-cost",
  "work-and-jobs",
  "scholarships",
  "culture",
];

const blogSlugs = [
  "ielts-speaking-tips",
  "study-in-canada-guide",
  "winning-sop-guide",
  "scholarships-nepali-students",
  "student-life-melbourne",
  "ielts-vs-pte",
  "post-study-work-visa-australia",
  "budget-planning-uk",
  "university-application-mistakes",
];

const newsSlugs = [
  "australia-visa-rules-2026",
  "canada-study-permit-guide",
  "uk-graduate-route-guide",
  "nz-immigration-update",
  "japan-english-programs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const countries = Object.keys(countryDataMap);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/test-preparation`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/services/career-counseling`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/services/sop-writing-assistance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/services/student-visa-assistance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/services/pre-departure-support`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/services/scholarship-guidance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/study-abroad`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/study-abroad/compare-destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/study-abroad/documents-required`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/study-abroad/complete-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/study-abroad/application-process`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Course category pages
  const coursePages: MetadataRoute.Sitemap = courseCategories.map((cat) => ({
    url: `${BASE_URL}/courses/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Destination country pages (high priority)
  const destinationPages: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${BASE_URL}/destinations/${country}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Destination section pages
  const sectionPages: MetadataRoute.Sitemap = countries.flatMap((country) =>
    allSections.map((section) => ({
      url: `${BASE_URL}/destinations/${country}/${section}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // News article pages
  const newsPages: MetadataRoute.Sitemap = newsSlugs.map((slug) => ({
    url: `${BASE_URL}/news/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...coursePages, ...destinationPages, ...sectionPages, ...blogPages, ...newsPages];
}

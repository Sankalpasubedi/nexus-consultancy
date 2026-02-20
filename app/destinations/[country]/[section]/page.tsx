import type { Metadata } from "next";
import { countryDataMap } from "@/data";
import DestinationSectionClient from "./DestinationSectionClient";

/* ─── Section SEO metadata ────────────────────────── */

const sectionSeo: Record<
  string,
  { titleTemplate: string; descTemplate: string; keywords: string[] }
> = {
  "why-study-here": {
    titleTemplate: "Why Study in {country} from Nepal | Top Reasons & Benefits",
    descTemplate:
      "Discover the top reasons to study in {country} from Nepal. World-class education, career opportunities, quality of life & more. Expert guidance from Nexsus Educational Consultancy.",
    keywords: [
      "why study in {slug}", "reasons to study in {slug}", "benefits of studying in {slug}",
      "study in {slug} advantages", "{slug} education quality", "{slug} for nepali students",
    ],
  },
  universities: {
    titleTemplate: "Top Universities in {country} for Nepali Students | Rankings & Programs",
    descTemplate:
      "Explore the best universities in {country} for international students from Nepal. Rankings, programs, tuition fees, scholarships & admission requirements. Apply with Nexsus.",
    keywords: [
      "universities in {slug}", "best universities {slug}", "top colleges {slug}",
      "{slug} university ranking", "{slug} university admission", "study at {slug} university",
      "{slug} university for nepali students", "{slug} university programs",
    ],
  },
  admission: {
    titleTemplate: "Admission Requirements for {country} Universities | Complete Guide",
    descTemplate:
      "Complete admission requirements guide for studying in {country}. Academic qualifications, English proficiency (IELTS/PTE/TOEFL), documents needed & application process. Nexsus helps you apply.",
    keywords: [
      "{slug} admission requirements", "{slug} university application", "how to apply {slug} university",
      "IELTS score for {slug}", "PTE score for {slug}", "{slug} admission for nepali students",
      "{slug} undergraduate admission", "{slug} masters admission", "{slug} document requirements",
    ],
  },
  "student-visa": {
    titleTemplate: "{country} Student Visa from Nepal | Requirements, Process & Documents",
    descTemplate:
      "Step-by-step {country} student visa guide for Nepali students. Visa requirements, documents, processing time, fees & tips for success. 98% visa success rate with Nexsus.",
    keywords: [
      "{slug} student visa", "{slug} visa from nepal", "{slug} student visa requirements",
      "{slug} visa process", "{slug} visa documents", "{slug} visa processing time",
      "{slug} visa fees", "{slug} visa success rate", "how to get {slug} student visa",
    ],
  },
  "living-cost": {
    titleTemplate: "Cost of Living in {country} for Students | Accommodation, Food & Transport",
    descTemplate:
      "Detailed breakdown of living costs in {country} for international students. Monthly expenses for accommodation, food, transport, utilities & lifestyle. Budget planning guide from Nexsus.",
    keywords: [
      "cost of living in {slug}", "{slug} living expenses for students",
      "{slug} accommodation cost", "{slug} student budget", "how much to study in {slug}",
      "{slug} monthly expenses", "affordable living in {slug}",
    ],
  },
  "work-and-jobs": {
    titleTemplate: "Work While Studying in {country} | Part-time Jobs & Post-Study Work Visa",
    descTemplate:
      "Guide to working while studying in {country}. Part-time work rights, average pay, post-study work visa options & career opportunities for Nepali students. Nexsus career guidance.",
    keywords: [
      "work while studying in {slug}", "{slug} part-time jobs for students",
      "{slug} post study work visa", "{slug} work rights for students",
      "{slug} student jobs", "{slug} career opportunities after study",
      "earn while studying {slug}", "{slug} work permit for students",
    ],
  },
  scholarships: {
    titleTemplate: "{country} Scholarships for Nepali Students | Grants & Financial Aid",
    descTemplate:
      "Comprehensive list of scholarships in {country} for Nepali students. Government scholarships, university grants, merit-based & need-based financial aid. Apply through Nexsus.",
    keywords: [
      "{slug} scholarship for nepali students", "{slug} scholarships",
      "{slug} financial aid", "{slug} grants for students", "{slug} merit scholarship",
      "free education in {slug}", "{slug} scholarship application",
      "{slug} fully funded scholarship",
    ],
  },
  culture: {
    titleTemplate: "Student Life & Culture in {country} | What to Expect as a Student",
    descTemplate:
      "Everything about student life and culture in {country}. Lifestyle, traditions, food, weather, social life & tips for Nepali students adapting to life abroad. Nexsus pre-departure guide.",
    keywords: [
      "student life in {slug}", "{slug} culture for students", "living in {slug} as a student",
      "{slug} lifestyle", "{slug} food and culture", "{slug} weather for students",
      "nepali community in {slug}", "adapting to {slug}",
    ],
  },
};

const allSections = [
  "why-study-here", "universities", "admission", "student-visa",
  "living-cost", "work-and-jobs", "scholarships", "culture",
];

/* ─── Static Params ───────────────────────────────── */

export function generateStaticParams() {
  const countries = Object.keys(countryDataMap);
  const params: { country: string; section: string }[] = [];
  for (const country of countries) {
    for (const section of allSections) {
      params.push({ country, section });
    }
  }
  return params;
}

/* ─── Dynamic Metadata ────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; section: string }>;
}): Promise<Metadata> {
  const { country, section } = await params;
  const data = countryDataMap[country];
  const seo = sectionSeo[section];

  if (!data || !seo) {
    return { title: "Page Not Found | Nexsus Educational Consultancy" };
  }

  const countryName = data.country;
  const slugName = country.replace("study-in-", "");
  const title = seo.titleTemplate.replace(/{country}/g, countryName);
  const description = seo.descTemplate.replace(/{country}/g, countryName);
  const keywords = seo.keywords.map((k) =>
    k.replace(/{slug}/g, slugName).replace(/{country}/g, countryName)
  );
  const canonicalUrl = `https://nexsuseducation.com/destinations/${country}/${section}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Nexsus Educational Consultancy",
      type: "article",
      images: [
        {
          url: data.carouselData.CountryImages[0]?.url || "/destinations/Australia.png",
          width: 1200,
          height: 630,
          alt: `${title} - Nexsus Educational Consultancy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

/* ─── Page Component with JSON-LD ─────────────────── */

const sectionMeta: Record<string, { title: string; icon: string }> = {
  "why-study-here": { title: "Why Study Here", icon: "Lightbulb" },
  universities: { title: "Universities & Institutions", icon: "GraduationCap" },
  admission: { title: "Admission Requirements", icon: "ClipboardList" },
  "student-visa": { title: "Student Visa Guide", icon: "ShieldCheck" },
  "living-cost": { title: "Cost of Living", icon: "DollarSign" },
  "work-and-jobs": { title: "Work & Career Opportunities", icon: "Briefcase" },
  scholarships: { title: "Scholarships & Financial Aid", icon: "Trophy" },
  culture: { title: "Culture & Student Life", icon: "Globe" },
};

export default async function DestinationSectionPage({
  params,
}: {
  params: Promise<{ country: string; section: string }>;
}) {
  const { country, section } = await params;
  const data = countryDataMap[country];
  const seo = sectionSeo[section];
  const meta = sectionMeta[section];

  const countryName = data?.country || "Unknown";
  const sectionTitle = meta?.title || section;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://nexsuseducation.com/destinations/${country}/${section}#webpage`,
        url: `https://nexsuseducation.com/destinations/${country}/${section}`,
        name: seo
          ? seo.titleTemplate.replace(/{country}/g, countryName)
          : `${sectionTitle} - Study in ${countryName}`,
        description: seo
          ? seo.descTemplate.replace(/{country}/g, countryName)
          : "",
        isPartOf: {
          "@id": `https://nexsuseducation.com/destinations/${country}#webpage`,
        },
        breadcrumb: {
          "@id": `https://nexsuseducation.com/destinations/${country}/${section}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://nexsuseducation.com/destinations/${country}/${section}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://nexsuseducation.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Destinations",
            item: "https://nexsuseducation.com/destinations",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Study in ${countryName}`,
            item: `https://nexsuseducation.com/destinations/${country}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: sectionTitle,
            item: `https://nexsuseducation.com/destinations/${country}/${section}`,
          },
        ],
      },
      {
        "@type": "Article",
        headline: seo
          ? seo.titleTemplate.replace(/{country}/g, countryName)
          : `${sectionTitle} - Study in ${countryName}`,
        description: seo
          ? seo.descTemplate.replace(/{country}/g, countryName)
          : "",
        author: {
          "@type": "Organization",
          name: "Nexsus Educational Consultancy",
        },
        publisher: {
          "@type": "Organization",
          name: "Nexsus Educational Consultancy",
          url: "https://nexsuseducation.com",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationSectionClient />
    </>
  );
}

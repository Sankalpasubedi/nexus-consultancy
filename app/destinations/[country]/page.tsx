import type { Metadata } from "next";
import { countryDataMap, destinations } from "@/data";
import DestinationDetailClient from "./DestinationDetailClient";

/* ─── SEO data per destination ────────────────────── */

const seoData: Record<string, { title: string; description: string; keywords: string[] }> = {
  "study-in-australia": {
    title: "Study in Australia from Nepal | Top Universities, Visa & Scholarships",
    description:
      "Complete guide to studying in Australia from Nepal. Explore top-ranked Australian universities, student visa requirements, scholarships, living costs, work rights & admission process. 98% visa success rate with Nexsus.",
    keywords: [
      "study in australia", "study in australia from nepal", "australian student visa",
      "australia university admission", "australia scholarship for nepali students",
      "IELTS for australia", "PTE for australia", "australian education consultancy nepal",
      "cost of living in australia for students", "work while studying in australia",
      "post study work visa australia", "best universities in australia",
      "australia PR pathway", "study abroad australia", "education in australia",
      "australia student visa requirements", "australia tuition fees",
      "nursing in australia", "IT courses in australia", "MBA in australia",
      "engineering in australia", "australia education consultancy kathmandu",
    ],
  },
  "study-in-canada": {
    title: "Study in Canada from Nepal | Universities, Immigration & Scholarships",
    description:
      "Your complete guide to studying in Canada from Nepal. Discover Canadian universities, student visa process, PR pathways, scholarships, tuition fees & post-graduation work permit. Expert guidance from Nexsus.",
    keywords: [
      "study in canada", "study in canada from nepal", "canada student visa",
      "canada university admission", "canada scholarship for nepali students",
      "IELTS for canada", "PTE for canada", "canada education consultancy nepal",
      "cost of living in canada for students", "work while studying in canada",
      "post graduation work permit canada", "PGWP canada", "best universities in canada",
      "canada PR from student visa", "study abroad canada", "education in canada",
      "canada student visa requirements", "canada tuition fees",
      "MBA in canada", "IT courses in canada", "nursing in canada",
      "canada education consultancy kathmandu", "express entry canada",
    ],
  },
  "study-in-usa": {
    title: "Study in USA from Nepal | Ivy League, Visa & Scholarships Guide",
    description:
      "Ultimate guide to studying in the USA from Nepal. Explore Ivy League universities, F1 student visa, OPT/CPT work authorization, scholarships, GRE/SAT prep & admission requirements. Nexsus experts help you succeed.",
    keywords: [
      "study in usa", "study in usa from nepal", "usa student visa",
      "F1 visa usa", "usa university admission", "usa scholarship for nepali students",
      "IELTS for usa", "TOEFL for usa", "GRE preparation", "SAT preparation",
      "OPT usa", "CPT usa", "best universities in usa", "ivy league universities",
      "study abroad usa", "education in usa", "usa student visa requirements",
      "usa tuition fees", "MBA in usa", "STEM courses in usa",
      "computer science in usa", "usa education consultancy kathmandu",
      "usa education consultancy nepal",
    ],
  },
  "study-in-uk": {
    title: "Study in UK from Nepal | Top Universities, Visa & Graduate Route",
    description:
      "Complete guide to studying in the UK from Nepal. Explore Russell Group universities, student visa requirements, Graduate Route work visa, scholarships, tuition fees & living costs. Trusted guidance from Nexsus.",
    keywords: [
      "study in uk", "study in uk from nepal", "uk student visa",
      "uk university admission", "uk scholarship for nepali students",
      "IELTS for uk", "PTE for uk", "uk education consultancy nepal",
      "cost of living in uk for students", "work while studying in uk",
      "graduate route visa uk", "best universities in uk", "russell group universities",
      "study abroad uk", "education in united kingdom", "uk student visa requirements",
      "uk tuition fees", "MBA in uk", "engineering in uk",
      "oxford cambridge admission", "uk education consultancy kathmandu",
      "masters in uk", "uk visa from nepal",
    ],
  },
  "study-in-new-zealand": {
    title: "Study in New Zealand from Nepal | Universities, Visa & Work Rights",
    description:
      "Your guide to studying in New Zealand from Nepal. Discover NZ universities, student visa process, post-study work visa, scholarships, affordable tuition & stunning campus life. Nexsus consultants guide you.",
    keywords: [
      "study in new zealand", "study in new zealand from nepal", "new zealand student visa",
      "nz university admission", "new zealand scholarship for nepali students",
      "IELTS for new zealand", "PTE for new zealand", "new zealand education consultancy nepal",
      "cost of living in new zealand", "work while studying in new zealand",
      "post study work visa new zealand", "best universities in new zealand",
      "study abroad new zealand", "education in new zealand",
      "new zealand student visa requirements", "new zealand tuition fees",
      "nursing in new zealand", "IT courses in new zealand",
      "new zealand education consultancy kathmandu",
    ],
  },
  "study-in-japan": {
    title: "Study in Japan from Nepal | Universities, Visa, JLPT & Scholarships",
    description:
      "Complete guide to studying in Japan from Nepal. Explore Japanese universities, student visa requirements, MEXT scholarships, JLPT preparation, tuition fees & work opportunities. Expert support from Nexsus.",
    keywords: [
      "study in japan", "study in japan from nepal", "japan student visa",
      "japanese university admission", "japan scholarship for nepali students",
      "JLPT preparation", "MEXT scholarship", "japan education consultancy nepal",
      "cost of living in japan for students", "work while studying in japan",
      "best universities in japan", "study abroad japan", "education in japan",
      "japan student visa requirements", "japan tuition fees",
      "japanese language course", "engineering in japan", "IT in japan",
      "japan education consultancy kathmandu", "japan from nepal",
    ],
  },
  "study-in-south-korea": {
    title: "Study in South Korea from Nepal | Universities, TOPIK & Scholarships",
    description:
      "Your guide to studying in South Korea from Nepal. Discover Korean universities, student visa process, KGSP scholarships, TOPIK preparation, tuition fees & K-culture experience. Guided by Nexsus experts.",
    keywords: [
      "study in south korea", "study in south korea from nepal", "south korea student visa",
      "korean university admission", "korea scholarship for nepali students",
      "TOPIK preparation", "KGSP scholarship", "korea education consultancy nepal",
      "cost of living in south korea", "work while studying in south korea",
      "best universities in south korea", "study abroad south korea",
      "education in south korea", "south korea student visa requirements",
      "south korea tuition fees", "korean language course",
      "korea education consultancy kathmandu", "D-2 visa korea",
    ],
  },
  "study-in-europe": {
    title: "Study in Europe from Nepal | Universities, Visa & Scholarships Guide",
    description:
      "Complete guide to studying in Europe from Nepal. Explore universities in Germany, France, Netherlands, Ireland & more. Schengen visa guide, Erasmus scholarships, tuition-free options & living costs.",
    keywords: [
      "study in europe", "study in europe from nepal", "europe student visa",
      "european university admission", "europe scholarship for nepali students",
      "schengen visa for students", "erasmus scholarship", "europe education consultancy nepal",
      "cost of living in europe for students", "study in germany from nepal",
      "study in france from nepal", "study in netherlands", "study in ireland",
      "best universities in europe", "study abroad europe", "education in europe",
      "europe tuition fees", "tuition free universities europe",
      "europe education consultancy kathmandu", "masters in europe",
    ],
  },
};

/* ─── Static Params ───────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(countryDataMap).map((country) => ({ country }));
}

/* ─── Dynamic Metadata ────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const data = countryDataMap[country];
  const seo = seoData[country];

  if (!data || !seo) {
    return { title: "Destination Not Found | Nexsus Educational Consultancy" };
  }

  const countryName = data.country;
  const canonicalUrl = `https://nexsuseducation.com/destinations/${country}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: "Nexsus Educational Consultancy",
      type: "website",
      images: [
        {
          url: data.carouselData.CountryImages[0]?.url || "/destinations/Australia.png",
          width: 1200,
          height: 630,
          alt: `Study in ${countryName} - Nexsus Educational Consultancy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Study in ${countryName} from Nepal | Nexsus`,
      description: seo.description,
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

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const data = countryDataMap[country];
  const seo = seoData[country];

  const countryName = data?.country || "Unknown";

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://nexsuseducation.com/destinations/${country}#webpage`,
        url: `https://nexsuseducation.com/destinations/${country}`,
        name: seo?.title || `Study in ${countryName}`,
        description: seo?.description || "",
        isPartOf: { "@id": "https://nexsuseducation.com/#website" },
        breadcrumb: { "@id": `https://nexsuseducation.com/destinations/${country}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://nexsuseducation.com/destinations/${country}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://nexsuseducation.com" },
          { "@type": "ListItem", position: 2, name: "Destinations", item: "https://nexsuseducation.com/destinations" },
          { "@type": "ListItem", position: 3, name: `Study in ${countryName}`, item: `https://nexsuseducation.com/destinations/${country}` },
        ],
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://nexsuseducation.com/#organization",
        name: "Nexsus Educational Consultancy",
        url: "https://nexsuseducation.com",
        description: "Nepal's leading education consultancy for studying abroad. Expert guidance for Australia, Canada, USA, UK, New Zealand, Japan, South Korea & Europe.",
        areaServed: {
          "@type": "Country",
          name: "Nepal",
        },
        serviceArea: [
          { "@type": "Country", name: countryName },
        ],
        knowsAbout: [
          `Study in ${countryName}`,
          `${countryName} student visa`,
          `${countryName} university admission`,
          `${countryName} scholarships`,
          "IELTS preparation",
          "Education consultancy Nepal",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How to study in ${countryName} from Nepal?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `To study in ${countryName} from Nepal, you need to: 1) Choose a university and program, 2) Meet admission requirements including English proficiency tests like IELTS/PTE, 3) Apply and get an offer letter, 4) Apply for a student visa, 5) Arrange finances and travel. Nexsus Educational Consultancy guides you through every step with a 98% visa success rate.`,
            },
          },
          {
            "@type": "Question",
            name: `What is the cost of studying in ${countryName}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The cost of studying in ${countryName} varies by university and program. Contact Nexsus Educational Consultancy for detailed cost breakdowns including tuition fees, living expenses, and available scholarships.`,
            },
          },
          {
            "@type": "Question",
            name: `Can I work while studying in ${countryName}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes, most countries allow international students to work part-time while studying. Visit our detailed work and career opportunities section for ${countryName}-specific information about work rights, hours allowed, and post-study work visas.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationDetailClient />
    </>
  );
}

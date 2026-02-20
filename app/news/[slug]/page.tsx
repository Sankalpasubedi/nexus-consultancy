import type { Metadata } from "next";
import NewsArticleClient from "./NewsArticleClient";

const newsArticleMeta: Record<string, { title: string; excerpt: string; image: string; category: string }> = {
  "australia-visa-rules-2026": {
    title: "Australia Introduces New Post-Study Work Visa Rules for 2026",
    excerpt: "The Australian government has announced significant changes to post-study work visa rules.",
    image: "/destinations/Australia.png",
    category: "News",
  },
  "canada-study-permit-guide": {
    title: "Step-by-Step Guide to the Study Permit Application for Canada",
    excerpt: "A detailed walkthrough of the Canadian study permit application process.",
    image: "/destinations/canada.png",
    category: "Guides",
  },
  "uk-graduate-route-guide": {
    title: "UK Graduate Route Visa: Everything You Need to Know",
    excerpt: "Complete guide to the UK Graduate Route visa for international students.",
    image: "/destinations/uk.png",
    category: "Guides",
  },
  "nz-immigration-update": {
    title: "New Zealand Updates Immigration Points System",
    excerpt: "New Zealand has updated its immigration points system affecting international students.",
    image: "/destinations/newzeland.png",
    category: "News",
  },
  "japan-english-programs": {
    title: "Japan Expands English-Taught Programs for International Students",
    excerpt: "Japan announces expansion of English-taught degree programs across universities.",
    image: "/destinations/japan.png",
    category: "News",
  },
};

export function generateStaticParams() {
  return Object.keys(newsArticleMeta).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticleMeta[slug];

  if (!article) {
    return { title: "News Article Not Found" };
  }

  const title = `${article.title} | Nexsus Education News`;
  const description = article.excerpt;

  return {
    title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
    alternates: {
      canonical: `/news/${slug}`,
    },
  };
}

function NewsJsonLd({ slug }: { slug: string }) {
  const article = newsArticleMeta[slug];
  if (!article) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: {
      "@type": "Organization",
      name: "Nexsus Educational Consultancy",
    },
    publisher: {
      "@type": "Organization",
      name: "Nexsus Educational Consultancy",
      url: "https://nexsuseducation.com",
    },
    url: `https://nexsuseducation.com/news/${slug}`,
    mainEntityOfPage: `https://nexsuseducation.com/news/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <NewsJsonLd slug={slug} />
      <NewsArticleClient />
    </>
  );
}

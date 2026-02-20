import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

/* ─── Blog Post Data (for metadata generation) ─── */
const blogPostMeta: Record<string, { title: string; excerpt: string; image: string; category: string }> = {
  "ielts-speaking-tips": {
    title: "10 Tips for Acing Your IELTS Speaking Test",
    excerpt: "Master the IELTS speaking section with these proven strategies from our expert trainers.",
    image: "/destinations/Australia.png",
    category: "Test Prep",
  },
  "study-in-canada-guide": {
    title: "Complete Guide to Studying in Canada 2026",
    excerpt: "Everything you need to know about studying in Canada — from visa requirements to top universities.",
    image: "/destinations/canada.png",
    category: "Country Guides",
  },
  "winning-sop-guide": {
    title: "How to Write a Winning Statement of Purpose",
    excerpt: "Expert tips for crafting a compelling SOP that gets you into your dream university.",
    image: "/destinations/USA.png",
    category: "Study Tips",
  },
  "scholarships-nepali-students": {
    title: "Top Scholarships for Nepali Students in 2026",
    excerpt: "Discover the best scholarship opportunities available for Nepali students studying abroad.",
    image: "/destinations/uk.png",
    category: "Scholarships",
  },
  "student-life-melbourne": {
    title: "Student Life in Melbourne: What to Expect",
    excerpt: "A comprehensive guide to student life in one of Australia's most vibrant cities.",
    image: "/destinations/Australia.png",
    category: "Student Life",
  },
  "ielts-vs-pte": {
    title: "IELTS vs PTE: Which Test Is Right for You?",
    excerpt: "A detailed comparison of IELTS and PTE to help you choose the best English proficiency test.",
    image: "/destinations/canada.png",
    category: "Test Prep",
  },
  "post-study-work-visa-australia": {
    title: "How to Get a Post-Study Work Visa in Australia",
    excerpt: "Step-by-step guide to obtaining a post-study work visa in Australia.",
    image: "/destinations/Australia.png",
    category: "Visa Guide",
  },
  "budget-planning-uk": {
    title: "Budget Planning for International Students in the UK",
    excerpt: "Essential budgeting tips for Nepali students planning to study in the UK.",
    image: "/destinations/uk.png",
    category: "Finance",
  },
  "university-application-mistakes": {
    title: "5 Mistakes to Avoid in Your University Application",
    excerpt: "Common pitfalls that can hurt your university application and how to avoid them.",
    image: "/destinations/USA.png",
    category: "Study Tips",
  },
};

export function generateStaticParams() {
  return Object.keys(blogPostMeta).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostMeta[slug];

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  const title = `${post.title} | Nexsus Education Blog`;
  const description = post.excerpt;

  return {
    title,
    description,
    keywords: [
      post.category.toLowerCase(),
      "study abroad blog",
      "Nepali students",
      "Nexsus education",
      ...post.title.toLowerCase().split(" ").filter((w) => w.length > 3),
    ],
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

function BlogJsonLd({ slug }: { slug: string }) {
  const post = blogPostMeta[slug];
  if (!post) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      "@type": "Organization",
      name: "Nexsus Educational Consultancy",
    },
    publisher: {
      "@type": "Organization",
      name: "Nexsus Educational Consultancy",
      url: "https://nexsuseducation.com",
    },
    url: `https://nexsuseducation.com/blog/${slug}`,
    mainEntityOfPage: `https://nexsuseducation.com/blog/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <BlogJsonLd slug={slug} />
      <BlogPostClient />
    </>
  );
}

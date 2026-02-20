"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect } from "react";

/* ─── Blog Data ────────────────────────────────────── */

const categories = [
  "All",
  "Study Tips",
  "Country Guides",
  "Scholarships",
  "Test Prep",
  "Student Life",
  "Career",
];

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Acing Your IELTS Speaking Test",
    excerpt:
      "Master the IELTS speaking section with these proven strategies from our expert trainers. Learn how to stay calm, articulate, and score band 7+.",
    category: "Test Prep",
    author: "Suman Adhikari",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    image: "/destinations/Australia.png",
    slug: "ielts-speaking-tips",
    featured: true,
  },
  {
    id: 2,
    title: "Complete Guide to Studying in Canada 2026",
    excerpt:
      "Everything you need to know about studying in Canada — from visa requirements, tuition fees, and top universities to part-time work rights.",
    category: "Country Guides",
    author: "Priya Sharma",
    date: "Jan 10, 2026",
    readTime: "10 min read",
    image: "/destinations/canada.png",
    slug: "study-in-canada-guide",
  },
  {
    id: 3,
    title: "How to Write a Winning Statement of Purpose",
    excerpt:
      "Expert tips and strategies for crafting a compelling SOP that stands out to admissions committees at top universities worldwide.",
    category: "Study Tips",
    author: "Rajesh Poudel",
    date: "Jan 5, 2026",
    readTime: "8 min read",
    image: "/destinations/USA.png",
    slug: "winning-sop-guide",
  },
  {
    id: 4,
    title: "Top Scholarships for Nepali Students in 2026",
    excerpt:
      "Discover the best scholarship opportunities available for Nepali students across popular destinations including Australia, USA, and UK.",
    category: "Scholarships",
    author: "Anita Gurung",
    date: "Dec 28, 2025",
    readTime: "7 min read",
    image: "/destinations/uk.png",
    slug: "scholarships-nepali-students",
  },
  {
    id: 5,
    title: "Student Life in Melbourne: What to Expect",
    excerpt:
      "An insider's look at living and studying in Melbourne — from cost of living, public transport, and cultural diversity to nightlife and food.",
    category: "Student Life",
    author: "Bikash Thapa",
    date: "Dec 20, 2025",
    readTime: "5 min read",
    image: "/destinations/Australia.png",
    slug: "student-life-melbourne",
  },
  {
    id: 6,
    title: "IELTS vs PTE: Which Test Is Right for You?",
    excerpt:
      "A comprehensive comparison of IELTS and PTE Academic to help you choose the right English proficiency test for your study abroad goals.",
    category: "Test Prep",
    author: "Suman Adhikari",
    date: "Dec 15, 2025",
    readTime: "6 min read",
    image: "/destinations/europe.png",
    slug: "ielts-vs-pte",
  },
  {
    id: 7,
    title: "How to Get a Post-Study Work Visa in Australia",
    excerpt:
      "Step-by-step guide to applying for a post-study work visa in Australia, including eligibility, required documents, and processing times.",
    category: "Career",
    author: "Priya Sharma",
    date: "Dec 10, 2025",
    readTime: "9 min read",
    image: "/destinations/Australia.png",
    slug: "post-study-work-visa-australia",
  },
  {
    id: 8,
    title: "Budget Planning for International Students in the UK",
    excerpt:
      "Learn how to plan your finances for studying in the UK, including tuition, accommodation, food, and travel expenses with money-saving tips.",
    category: "Country Guides",
    author: "Anita Gurung",
    date: "Dec 5, 2025",
    readTime: "7 min read",
    image: "/destinations/uk.png",
    slug: "budget-planning-uk",
  },
  {
    id: 9,
    title: "5 Mistakes to Avoid in Your University Application",
    excerpt:
      "Don't let common errors derail your application. Learn the top 5 mistakes students make and how to avoid them for a successful submission.",
    category: "Study Tips",
    author: "Rajesh Poudel",
    date: "Nov 28, 2025",
    readTime: "5 min read",
    image: "/destinations/USA.png",
    slug: "university-application-mistakes",
  },
];

/* ─── Component ────────────────────────────────────── */

export default function BlogPage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  const featured = blogPosts.find((p) => p.featured)!;
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[420px] md:min-h-[480px] overflow-hidden">
        <Image
          src="/contact/image.png"
          alt="Students learning"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/80 via-[#002d5e]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafaf8] to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-[#00ab18]/90 text-white text-xs font-semibold tracking-wide">
              Insights & Resources
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-lg leading-[1.15]">
              Our Blog
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed">
              Expert insights, study tips, and guides to help you navigate your
              study abroad journey with confidence.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="bg-[#fafaf8] pt-4 pb-2 px-6 sticky top-[72px] z-20 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Post ── */}
      <section className="py-12 px-6 bg-[#fafaf8]">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <Link href={`/blog/${featured.slug}`} className="block group">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="grid md:grid-cols-2 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative h-[280px] md:h-full min-h-[320px] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00ab18] text-white text-xs font-semibold">
                      <Icon name="Star" size={12} />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="inline-flex self-start items-center px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4">
                    {featured.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 group-hover:text-[#003975] transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                    <span className="flex items-center gap-1.5">
                      <Icon name="User" size={14} />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Calendar" size={14} />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Clock" size={14} />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#003975] group-hover:gap-3 transition-all">
                    Read Article <Icon name="ArrowRight" size={14} />
                  </span>
                </div>
              </motion.div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="pb-20 px-6 bg-[#fafaf8]">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Latest Articles
            </h2>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <StaggerItem key={post.id}>
                <HoverCard>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#003975] uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#003975] transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={12} />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={12} />
                              {post.readTime}
                            </span>
                          </div>
                          <Icon
                            name="ArrowRight"
                            size={14}
                            className="text-slate-400 group-hover:text-[#003975] transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Pagination */}
          <FadeUp delay={0.2}>
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="w-10 h-10 rounded-full bg-slate-900 text-white text-sm font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                3
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />

        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-6">
              <Icon name="Mail" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Stay Updated
            </h2>
            <p className="text-slate-500 text-base mb-8 max-w-md mx-auto">
              Subscribe to our newsletter and never miss the latest tips,
              guides, and scholarship opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975]"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

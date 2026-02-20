"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { motion } from "framer-motion";

const articles = [
  {
    id: 1,
    title: "Complete Guide to Studying in Australia 2026",
    category: "Country Guide",
    readTime: "8 min read",
    image: "/destinations/Australia.png",
    slug: "#",
    excerpt:
      "Everything you need to know about studying in Australia, from visa requirements to living costs and top universities.",
  },
  {
    id: 2,
    title: "How to Write a Winning Statement of Purpose",
    category: "Application Tips",
    readTime: "5 min read",
    image: "/destinations/USA.png",
    slug: "#",
    excerpt:
      "Expert tips and strategies for crafting a compelling SOP that stands out to admissions committees.",
  },
  {
    id: 3,
    title: "IELTS vs TOEFL: Which Test Should You Take?",
    category: "Test Prep",
    readTime: "6 min read",
    image: "/destinations/UK.png",
    slug: "#",
    excerpt:
      "A comprehensive comparison to help you choose the right English proficiency test for your goals.",
  },
  {
    id: 4,
    title: "Top Scholarships for Nepali Students in 2026",
    category: "Scholarships",
    readTime: "7 min read",
    image: "/destinations/Canada.png",
    slug: "#",
    excerpt:
      "Discover the best scholarship opportunities available for Nepali students across popular destinations.",
  },
];

export default function NewsSection() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium border border-gray-200">
              <svg
                className="w-4 h-4 text-[#003975]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              Resources
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Latest News & Guides
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Stay informed with expert insights and guides for your study
              abroad journey
            </p>
          </div>
        </FadeUp>

        {/* Articles Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Featured Article */}
          <StaggerItem>
            <Link href={featured.slug} className="block h-full group">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden h-full premium-card"
              >
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#003975]">
                      {featured.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#003975] transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400 flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {featured.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#003975] group-hover:gap-2.5 transition-all">
                      Read More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </StaggerItem>

          {/* Smaller Articles Stack */}
          <StaggerItem className="flex flex-col gap-6">
            {rest.map((article) => (
              <Link key={article.id} href={article.slug} className="block group">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="flex gap-5 p-4 bg-white rounded-2xl border border-gray-100 premium-card"
                >
                  <div className="relative w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1.5 line-clamp-2 group-hover:text-[#003975] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {article.readTime}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </StaggerItem>
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.3}>
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/news"
                className="inline-flex items-center gap-2 bg-[#003975] text-white px-8 py-4 rounded-full font-medium hover:bg-[#002d5e] transition-colors shadow-lg shadow-blue-500/20"
              >
                View All Articles
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

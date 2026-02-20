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

/* ─── Data ─────────────────────────────────────────── */

const tabs = ["All", "News", "Guides", "Updates", "Events"];

const newsItems = [
  {
    id: 1,
    title: "Australia Introduces New Post-Study Work Visa Rules for 2026",
    excerpt:
      "The Australian government has announced significant changes to post-study work visa rules that affect international students graduating in 2026 and beyond.",
    category: "News",
    date: "Jan 20, 2026",
    readTime: "4 min read",
    image: "/destinations/Australia.png",
    slug: "australia-visa-rules-2026",
    featured: true,
  },
  {
    id: 2,
    title: "Step-by-Step Guide to the Study Permit Application for Canada",
    excerpt:
      "A detailed walkthrough of the Canadian study permit application process, including required documents, fees, timelines, and common pitfalls to avoid.",
    category: "Guides",
    date: "Jan 18, 2026",
    readTime: "12 min read",
    image: "/destinations/canada.png",
    slug: "canada-study-permit-guide",
    featured: true,
  },
  {
    id: 3,
    title: "NEXSUS Education Fair 2026: Meet Top Universities in Kathmandu",
    excerpt:
      "Join us at the NEXSUS Education Fair on March 15, 2026, where representatives from 50+ universities across 8 countries will be available for one-on-one sessions.",
    category: "Events",
    date: "Jan 15, 2026",
    readTime: "3 min read",
    image: "/destinations/europe.png",
    slug: "nexsus-education-fair-2026",
  },
  {
    id: 4,
    title: "UK Graduate Route Visa: Everything You Need to Know",
    excerpt:
      "The UK Graduate Route allows international students to stay and work for up to 2 years after graduation. Here's your complete guide to eligibility and application.",
    category: "Guides",
    date: "Jan 12, 2026",
    readTime: "9 min read",
    image: "/destinations/uk.png",
    slug: "uk-graduate-route-guide",
  },
  {
    id: 5,
    title: "New Zealand Updates Immigration Points System",
    excerpt:
      "New Zealand's updated immigration points system introduces new criteria that could benefit international graduates with STEM qualifications.",
    category: "News",
    date: "Jan 8, 2026",
    readTime: "5 min read",
    image: "/destinations/newzeland.png",
    slug: "nz-immigration-update",
  },
  {
    id: 6,
    title: "How to Choose the Right University: A Complete Guide",
    excerpt:
      "Selecting the right university is one of the most important decisions in your study abroad journey. This guide helps you evaluate rankings, courses, location, and more.",
    category: "Guides",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    image: "/destinations/USA.png",
    slug: "choosing-right-university",
  },
  {
    id: 7,
    title: "Japan Expands English-Taught Programs for International Students",
    excerpt:
      "Japanese universities are significantly expanding their English-taught degree programs, making it easier than ever for international students to study in Japan.",
    category: "News",
    date: "Jan 2, 2026",
    readTime: "4 min read",
    image: "/destinations/japan.png",
    slug: "japan-english-programs",
  },
  {
    id: 8,
    title: "NEXSUS Partners with 15 New Universities Across Europe",
    excerpt:
      "We are excited to announce new partnerships with 15 prestigious universities across Germany, France, Netherlands, and Ireland, expanding options for our students.",
    category: "Updates",
    date: "Dec 28, 2025",
    readTime: "3 min read",
    image: "/destinations/europe.png",
    slug: "nexsus-europe-partnerships",
  },
  {
    id: 9,
    title: "Complete IELTS Preparation Timeline: 90-Day Plan",
    excerpt:
      "A structured 90-day preparation plan for the IELTS exam, broken down week by week with specific tasks, resources, and milestones to track your progress.",
    category: "Guides",
    date: "Dec 22, 2025",
    readTime: "11 min read",
    image: "/destinations/skorea.png",
    slug: "ielts-90-day-plan",
  },
];

const categoryColors: Record<string, string> = {
  News: "#003975",
  Guides: "#00ab18",
  Updates: "#8b5cf6",
  Events: "#f59e0b",
};

/* ─── Component ────────────────────────────────────── */

export default function NewsPage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  const featured = newsItems.filter((n) => n.featured);
  const rest = newsItems.filter((n) => !n.featured);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[420px] md:min-h-[480px] overflow-hidden">
        <Image
          src="/contact/image.png"
          alt="Students discussing"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/80 via-[#002d5e]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-[#00ab18]/90 text-white text-xs font-semibold tracking-wide">
              Stay Informed
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-lg leading-[1.15]">
              News & Guides
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed">
              Latest updates, immigration news, and comprehensive guides to help
              you make informed decisions about studying abroad.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="bg-white pt-4 pb-2 px-6 sticky top-[72px] z-20 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-slate-900 text-white"
                    : "bg-gray-50 text-slate-600 hover:bg-slate-100 border border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Posts (top 2 side-by-side) ── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Featured Stories
            </h2>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {featured.map((item) => (
              <StaggerItem key={item.id}>
                <HoverCard>
                  <Link
                    href={`/news/${item.slug}`}
                    className="block h-full group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                            style={{
                              backgroundColor:
                                categoryColors[item.category] || "#003975",
                            }}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-7 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#003975] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3 flex-1">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={12} />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={12} />
                              {item.readTime}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#003975] group-hover:gap-2.5 transition-all">
                            Read <Icon name="ArrowRight" size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── All News & Guides Grid ── */}
      <section className="pb-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              All Articles
            </h2>
          </FadeUp>

          <StaggerContainer className="space-y-4">
            {rest.map((item) => (
              <StaggerItem key={item.id}>
                <Link href={`/news/${item.slug}`} className="block group">
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col sm:flex-row gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="relative w-full sm:w-56 h-40 sm:h-36 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                          style={{
                            backgroundColor:
                              categoryColors[item.category] || "#003975",
                          }}
                        >
                          {item.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1.5 line-clamp-2 group-hover:text-[#003975] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={12} />
                          {item.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#003975] font-semibold group-hover:gap-2 transition-all">
                          Read More <Icon name="ArrowRight" size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Load More */}
          <FadeUp delay={0.2}>
            <div className="flex justify-center mt-12">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 text-slate-700 rounded-full text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Load More Articles
                <Icon name="ChevronDown" size={14} />
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="relative py-24 px-6 bg-[#fafaf8] overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />

        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-6">
              <Icon name="Bell" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Never Miss an Update
            </h2>
            <p className="text-slate-500 text-base mb-8 max-w-md mx-auto">
              Get the latest immigration news, visa updates, and study abroad
              guides delivered straight to your inbox.
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

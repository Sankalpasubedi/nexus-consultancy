"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem, HoverCard } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect } from "react";
import { useParams } from "next/navigation";

/* ─── Sample News Data ─────────────────────────────── */

const categoryColors: Record<string, string> = {
  News: "#003975",
  Guides: "#00ab18",
  Updates: "#8b5cf6",
  Events: "#f59e0b",
};

const newsArticles: Record<
  string,
  {
    title: string;
    excerpt: string;
    category: string;
    author: string;
    authorRole: string;
    date: string;
    readTime: string;
    image: string;
    content: string[];
    tags: string[];
  }
> = {
  "australia-visa-rules-2026": {
    title: "Australia Introduces New Post-Study Work Visa Rules for 2026",
    excerpt:
      "The Australian government has announced significant changes to post-study work visa rules that affect international students graduating in 2026.",
    category: "News",
    author: "Editorial Team",
    authorRole: "NEXSUS News Desk",
    date: "Jan 20, 2026",
    readTime: "4 min read",
    image: "/destinations/Australia.png",
    content: [
      "The Australian Department of Home Affairs has released new guidelines for the Temporary Graduate Visa (subclass 485), which will take effect from July 1, 2026. These changes are designed to better align post-study work opportunities with Australia's skills needs while continuing to attract high-quality international students.",
      "## Key Changes at a Glance\n\nThe most significant changes include extended work visa durations for graduates in critical skills areas, new regional incentives that provide additional stay periods for graduates who live and work in regional Australia, and updated eligibility criteria that prioritize graduates from accredited institutions with strong employment outcomes.",
      "## Extended Duration for STEM Graduates\n\nGraduates with qualifications in Science, Technology, Engineering, and Mathematics (STEM) fields will now be eligible for up to 4 years of post-study work rights, up from the previous 3 years. This change reflects Australia's growing demand for skilled professionals in technology and innovation sectors.",
      "## Regional Australia Incentives\n\nStudents who study and subsequently work in regional areas will receive an additional 2-year extension on their post-study work visa. This is part of the government's broader strategy to distribute population growth and economic activity across the country, reducing pressure on major cities like Sydney and Melbourne.",
      "## What This Means for Nepali Students\n\nFor Nepali students planning to study in Australia, these changes present excellent opportunities. Choosing courses in high-demand fields and considering regional universities could significantly enhance your post-graduation options. Our counselors at NEXSUS can help you identify the best programs and institutions that align with these new policies.",
      "## How NEXSUS Can Help\n\nOur team stays up-to-date with the latest immigration policy changes to provide you with accurate, timely advice. Whether you're planning your study journey or considering your options after graduation, we're here to guide you through every step of the process.",
    ],
    tags: ["Australia", "Visa", "Immigration", "Post-Study Work"],
  },
  "canada-study-permit-guide": {
    title: "Step-by-Step Guide to the Study Permit Application for Canada",
    excerpt:
      "A detailed walkthrough of the Canadian study permit application process.",
    category: "Guides",
    author: "Priya Sharma",
    authorRole: "Senior Counselor — Canada",
    date: "Jan 18, 2026",
    readTime: "12 min read",
    image: "/destinations/canada.png",
    content: [
      "Applying for a Canadian study permit can seem complex, but with proper preparation and guidance, the process is straightforward. This step-by-step guide breaks down everything you need to know to submit a successful application.",
      "## Step 1: Receive Your Letter of Acceptance\n\nBefore applying for a study permit, you must first receive a Letter of Acceptance (LOA) from a Designated Learning Institution (DLI) in Canada. Apply to your chosen programs, meet the admission requirements, and secure your acceptance letter. Make sure the institution is on the official DLI list maintained by Immigration, Refugees and Citizenship Canada (IRCC).",
      "## Step 2: Gather Required Documents\n\nYou'll need the following documents: a valid passport, your Letter of Acceptance, proof of financial support (typically CAD $20,635 per year plus tuition), passport-sized photographs, an Immigration Medical Examination (IME) if required, a police clearance certificate, and a statement of purpose explaining why you want to study in Canada.",
      "## Step 3: Create Your IRCC Account\n\nVisit the IRCC website and create an online account. This is where you'll submit your application and track its progress. Make sure to use accurate personal information that matches your passport details.",
      "## Step 4: Complete the Application Form\n\nFill out the study permit application form carefully. Double-check all information for accuracy. Any errors or inconsistencies can delay processing or lead to rejection. Common mistakes include incorrect passport numbers, mismatched dates, and incomplete educational history.",
      "## Step 5: Pay Fees and Submit Biometrics\n\nThe study permit application fee is CAD $150. You'll also need to provide biometrics (fingerprints and photo) at a designated collection center, which costs an additional CAD $85. Schedule your biometrics appointment promptly after submitting your application.",
      "## Step 6: Attend the Visa Interview (If Required)\n\nSome applicants may be asked to attend an interview at the Canadian embassy or consulate. Prepare by reviewing your application, understanding your study plans, and being ready to explain your ties to your home country and your plans after graduation.",
      "## Processing Times and Tips\n\nProcessing times vary by country but typically range from 8-16 weeks for Nepal. To avoid delays, submit a complete application with all required documents, apply well in advance of your program start date, and respond promptly to any requests from IRCC.",
    ],
    tags: ["Canada", "Study Permit", "Visa Guide", "Application Process"],
  },
};

const relatedNews = [
  {
    id: 1,
    title: "UK Graduate Route Visa: Everything You Need to Know",
    category: "Guides",
    date: "Jan 12, 2026",
    readTime: "9 min read",
    image: "/destinations/uk.png",
    slug: "uk-graduate-route-guide",
  },
  {
    id: 2,
    title: "New Zealand Updates Immigration Points System",
    category: "News",
    date: "Jan 8, 2026",
    readTime: "5 min read",
    image: "/destinations/newzeland.png",
    slug: "nz-immigration-update",
  },
  {
    id: 3,
    title: "Japan Expands English-Taught Programs for International Students",
    category: "News",
    date: "Jan 2, 2026",
    readTime: "4 min read",
    image: "/destinations/japan.png",
    slug: "japan-english-programs",
  },
];

/* ─── Component ────────────────────────────────────── */

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  const article =
    newsArticles[slug] || newsArticles["australia-visa-rules-2026"];

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[380px] md:min-h-[440px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-[800px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/70 text-sm font-medium mb-6 hover:text-white transition-colors"
            >
              <Icon name="ArrowLeft" size={14} />
              Back to News & Guides
            </Link>
          </FadeUp>
          <FadeUp delay={0.05}>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
              style={{
                backgroundColor:
                  categoryColors[article.category] || "#003975",
              }}
            >
              {article.category}
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.15]">
              {article.title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-base text-white/70 max-w-lg leading-relaxed">
              {article.excerpt}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Article Content ── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          {/* Author & Meta */}
          <FadeUp>
            <div className="flex flex-wrap items-center gap-6 pb-8 mb-10 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                  {article.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {article.author}
                  </p>
                  <p className="text-xs text-slate-400">
                    {article.authorRole}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Icon name="Calendar" size={14} />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Clock" size={14} />
                  {article.readTime}
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Body */}
          <FadeUp delay={0.1}>
            <article className="prose prose-slate prose-lg max-w-none">
              {article.content.map((block, idx) => {
                if (block.startsWith("## ")) {
                  const parts = block.split("\n\n");
                  const heading = parts[0].replace("## ", "");
                  const body = parts.slice(1).join("\n\n");
                  return (
                    <div key={idx} className="mb-8">
                      <h2 className="text-xl font-bold text-slate-900 mb-3">
                        {heading}
                      </h2>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {body}
                      </p>
                    </div>
                  );
                }
                return (
                  <p
                    key={idx}
                    className="text-slate-600 leading-relaxed mb-6 text-base"
                  >
                    {block}
                  </p>
                );
              })}
            </article>
          </FadeUp>

          {/* Tags */}
          <FadeUp delay={0.15}>
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-slate-500 mr-2">
                  Topics:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Share */}
          <FadeUp delay={0.2}>
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm font-medium text-slate-500">
                Share:
              </span>
              {[
                { icon: "Facebook", label: "Facebook" },
                { icon: "Twitter", label: "Twitter" },
                { icon: "Linkedin", label: "LinkedIn" },
                { icon: "Link" as const, label: "Copy Link" },
              ].map((s) => (
                <button
                  key={s.label}
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-colors"
                  aria-label={s.label}
                >
                  <Icon name={s.icon} size={15} />
                </button>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Related Topics ── */}
      <section className="py-20 px-6 bg-[#fafaf8]">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Related Topics
            </h2>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedNews.map((rn) => (
              <StaggerItem key={rn.id}>
                <HoverCard>
                  <Link
                    href={`/news/${rn.slug}`}
                    className="block h-full group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={rn.image}
                          alt={rn.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                            style={{
                              backgroundColor:
                                categoryColors[rn.category] || "#003975",
                            }}
                          >
                            {rn.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#003975] transition-colors leading-snug">
                          {rn.title}
                        </h3>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={12} />
                              {rn.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={12} />
                              {rn.readTime}
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
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />

        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Have Questions?
            </h2>
            <p className="text-slate-500 text-base mb-8 max-w-md mx-auto">
              Our expert counselors can provide personalized guidance based on
              the latest policies and opportunities.
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                Talk to a Counselor <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

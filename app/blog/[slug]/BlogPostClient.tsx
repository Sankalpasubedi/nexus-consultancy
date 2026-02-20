"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem, HoverCard } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect } from "react";
import { useParams } from "next/navigation";

/* ─── Sample Blog Data ─────────────────────────────── */

const blogPosts: Record<
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
  "ielts-speaking-tips": {
    title: "10 Tips for Acing Your IELTS Speaking Test",
    excerpt:
      "Master the IELTS speaking section with these proven strategies from our expert trainers.",
    category: "Test Prep",
    author: "Suman Adhikari",
    authorRole: "Senior IELTS Trainer",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    image: "/destinations/Australia.png",
    content: [
      "The IELTS Speaking test can feel daunting, but with the right preparation and mindset, you can walk in with confidence and walk out with a high band score. This guide shares our top 10 strategies that have helped thousands of students score band 7 and above.",
      "## 1. Practice Speaking English Daily\n\nThe most effective way to improve your speaking skills is consistent practice. Try to speak English for at least 30 minutes every day, whether it's with a study partner, a language exchange buddy, or even by yourself. Record yourself and listen back to identify areas for improvement.",
      "## 2. Expand Your Vocabulary\n\nAim to learn and use a variety of vocabulary. Instead of using basic words like \"good\" or \"bad,\" try to incorporate more precise and sophisticated alternatives. For example, use \"beneficial,\" \"advantageous,\" or \"remarkable\" instead of \"good.\"",
      "## 3. Master Pronunciation and Intonation\n\nClear pronunciation is crucial. Focus on problematic sounds and practice stress patterns in sentences. Natural intonation — the rise and fall of your voice — helps convey meaning and shows fluency to the examiner.",
      "## 4. Structure Your Answers\n\nUse frameworks to organize your responses. For Part 2 (Cue Card), structure your answer with an introduction, main points, and a conclusion. For Part 3, use the PEEL method: Point, Explain, Example, Link back.",
      "## 5. Don't Memorize — Be Natural\n\nExaminers can easily spot memorized answers, and this will lower your score. Instead, prepare topics and ideas, but express them naturally in your own words during the test.",
      "## 6. Use Connective Words\n\nLink your ideas with connectors like \"however,\" \"moreover,\" \"on the other hand,\" and \"as a result.\" This demonstrates coherence and fluency, two key criteria in the IELTS Speaking assessment.",
      "## 7. Ask for Clarification if Needed\n\nIt's perfectly acceptable to ask the examiner to repeat or rephrase a question. This is better than giving an irrelevant answer. Use phrases like \"Could you rephrase that?\" or \"Do you mean...?\"",
      "## 8. Stay Calm and Confident\n\nNerves can impact your performance. Practice deep breathing before the test, maintain eye contact with the examiner, and remember that making small mistakes is normal — fluency matters more than perfection.",
      "## 9. Work with a Professional Trainer\n\nA qualified IELTS trainer can identify your weak areas and provide targeted feedback. At NEXSUS, our trainers use mock tests and one-on-one coaching sessions to rapidly improve your speaking skills.",
      "## 10. Take Mock Speaking Tests\n\nSimulate the real test environment by taking timed mock tests. This builds familiarity with the format and helps manage time effectively across all three parts of the speaking test.",
    ],
    tags: ["IELTS", "Speaking", "Test Preparation", "Study Tips"],
  },
  "study-in-canada-guide": {
    title: "Complete Guide to Studying in Canada 2026",
    excerpt:
      "Everything you need to know about studying in Canada — from visa requirements to top universities.",
    category: "Country Guides",
    author: "Priya Sharma",
    authorRole: "Senior Counselor",
    date: "Jan 10, 2026",
    readTime: "10 min read",
    image: "/destinations/canada.png",
    content: [
      "Canada consistently ranks among the top study destinations for international students, offering world-class education, multicultural cities, and excellent post-graduation work opportunities. This comprehensive guide covers everything you need to know about studying in Canada in 2026.",
      "## Why Study in Canada?\n\nCanada is home to some of the world's best universities, including the University of Toronto, McGill University, and the University of British Columbia. With affordable tuition compared to the US and UK, generous scholarship programs, and a welcoming immigration policy, Canada offers outstanding value for international students.",
      "## Top Universities in Canada\n\nThe QS World University Rankings feature several Canadian institutions in the top 100. Key universities include the University of Toronto (ranked #21), McGill University (#30), and UBC (#34). Each province offers excellent universities with specialized programs.",
      "## Admission Requirements\n\nMost Canadian universities require a strong academic record, English proficiency test scores (IELTS 6.5+ or TOEFL 90+), a statement of purpose, letters of recommendation, and sometimes standardized test scores like the GRE or GMAT for graduate programs.",
      "## Visa Process\n\nTo study in Canada, you'll need a Study Permit. The process involves getting an acceptance letter from a Designated Learning Institution (DLI), proving sufficient funds, passing a medical exam, and meeting other requirements. Processing times vary but typically take 8-12 weeks.",
      "## Cost of Living\n\nExpect to spend CAD $15,000-$20,000 per year on living expenses outside of tuition. This covers accommodation, food, transportation, and personal expenses. Cities like Toronto and Vancouver are more expensive, while smaller cities offer lower costs.",
      "## Work While Studying\n\nInternational students with a valid study permit can work up to 20 hours per week during academic sessions and full-time during scheduled breaks. This helps offset living costs and provides valuable Canadian work experience.",
    ],
    tags: ["Canada", "Study Abroad", "Visa", "Universities"],
  },
};

const relatedPosts = [
  {
    id: 1,
    title: "How to Write a Winning Statement of Purpose",
    category: "Study Tips",
    readTime: "8 min read",
    image: "/destinations/USA.png",
    slug: "winning-sop-guide",
  },
  {
    id: 2,
    title: "Top Scholarships for Nepali Students in 2026",
    category: "Scholarships",
    readTime: "7 min read",
    image: "/destinations/uk.png",
    slug: "scholarships-nepali-students",
  },
  {
    id: 3,
    title: "Student Life in Melbourne: What to Expect",
    category: "Student Life",
    readTime: "5 min read",
    image: "/destinations/Australia.png",
    slug: "student-life-melbourne",
  },
];

/* ─── Component ────────────────────────────────────── */

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  /* Fallback for unknown slugs */
  const post = blogPosts[slug] || blogPosts["ielts-speaking-tips"];

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[380px] md:min-h-[440px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-[800px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 text-sm font-medium mb-6 hover:text-white transition-colors"
            >
              <Icon name="ArrowLeft" size={14} />
              Back to Blog
            </Link>
          </FadeUp>
          <FadeUp delay={0.05}>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-white mb-4">
              {post.category}
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.15]">
              {post.title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-base text-white/70 max-w-lg leading-relaxed">
              {post.excerpt}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Article Content ── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          {/* Author & Meta Bar */}
          <FadeUp>
            <div className="flex flex-wrap items-center gap-6 pb-8 mb-10 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {post.author}
                  </p>
                  <p className="text-xs text-slate-400">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Icon name="Calendar" size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Clock" size={14} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Article Body */}
          <FadeUp delay={0.1}>
            <article className="prose prose-slate prose-lg max-w-none">
              {post.content.map((block, idx) => {
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
                <span className="text-sm font-medium text-slate-500 mr-2">Tags:</span>
                {post.tags.map((tag) => (
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
              <span className="text-sm font-medium text-slate-500">Share:</span>
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

      {/* ── Related Articles ── */}
      <section className="py-20 px-6 bg-[#fafaf8]">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Related Articles
            </h2>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <StaggerItem key={rp.id}>
                <HoverCard>
                  <Link
                    href={`/blog/${rp.slug}`}
                    className="block h-full group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={rp.image}
                          alt={rp.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#003975] uppercase tracking-wider">
                            {rp.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#003975] transition-colors leading-snug">
                          {rp.title}
                        </h3>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Icon name="Clock" size={12} />
                            {rp.readTime}
                          </span>
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
              Need Expert Guidance?
            </h2>
            <p className="text-slate-500 text-base mb-8 max-w-md mx-auto">
              Our experienced counselors are ready to help you take the next
              step in your study abroad journey.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                Book Free Consultation <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

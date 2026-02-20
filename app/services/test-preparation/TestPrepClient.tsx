"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect } from "react";

/* ─── Data ─────────────────────────────────────────── */

const exams = [
  {
    title: "IELTS",
    subtitle: "International English Language Testing System",
    description:
      "The world's most popular English proficiency test for study, work, and migration. Accepted by over 11,000 organizations in 140+ countries.",
    features: ["Academic & General Training", "Computer & Paper-based", "Band score 0–9", "Results in 13 days"],
    icon: "BookOpen",
    stat: "3.5M+",
    statLabel: "Tests/Year",
  },
  {
    title: "TOEFL iBT",
    subtitle: "Test of English as a Foreign Language",
    description:
      "Preferred by universities in the USA, Canada, and worldwide. Measures reading, listening, speaking, and writing in an academic context.",
    features: ["Internet-based test", "Score range 0–120", "Accepted by 12,000+ institutions", "Results in 4–8 days"],
    icon: "Globe",
    stat: "35M+",
    statLabel: "Tests Taken",
  },
  {
    title: "PTE Academic",
    subtitle: "Pearson Test of English",
    description:
      "Fast, fair computer-based English test ideal for study abroad and immigration. Accepted by thousands of institutions globally.",
    features: ["AI-scored for fairness", "Results in 48 hours", "Score range 10–90", "Flexible test dates"],
    icon: "Monitor",
    stat: "99%",
    statLabel: "Acceptance",
  },
  {
    title: "GRE",
    subtitle: "Graduate Record Examination",
    description:
      "Required for graduate school admission in the US and other countries. Tests verbal reasoning, quantitative reasoning, and analytical writing.",
    features: ["Verbal & Quantitative", "Score range 130–170/section", "5-year score validity", "At home or test center"],
    icon: "BarChart3",
    stat: "700K+",
    statLabel: "Tests/Year",
  },
  {
    title: "SAT",
    subtitle: "Scholastic Assessment Test",
    description:
      "Standardized test for undergraduate admissions in the US. Measures math, evidence-based reading, and writing skills.",
    features: ["Digital adaptive test", "Score range 400–1600", "Accepted worldwide", "Multiple test dates"],
    icon: "Star",
    stat: "2.2M+",
    statLabel: "Students/Year",
  },
  {
    title: "GMAT",
    subtitle: "Graduate Management Admission Test",
    description:
      "The gold standard for MBA and business school admissions globally. Assesses analytical, writing, quantitative, and verbal skills.",
    features: ["Focus Edition available", "Score range 205–805", "Accepted by 7,700+ programs", "5-year validity"],
    icon: "Briefcase",
    stat: "200K+",
    statLabel: "Tests/Year",
  },
];

const whyChooseUs = [
  {
    icon: "Users",
    title: "Expert Trainers",
    description: "Certified instructors with 10+ years of experience and deep knowledge of exam patterns & scoring criteria.",
    stat: "15+",
    statLabel: "Trainers",
  },
  {
    icon: "Target",
    title: "Proven Strategies",
    description: "Time-tested techniques and strategies that have helped thousands of students achieve their target scores.",
    stat: "95%",
    statLabel: "Success Rate",
  },
  {
    icon: "BookOpen",
    title: "Comprehensive Materials",
    description: "Up-to-date study materials, practice tests, and resources curated by experts for maximum effectiveness.",
    stat: "500+",
    statLabel: "Practice Tests",
  },
  {
    icon: "TrendingUp",
    title: "Score Improvement",
    description: "Our students see an average improvement of 1.5 bands in IELTS and 15+ points in TOEFL after our coaching.",
    stat: "1.5+",
    statLabel: "Band Increase",
  },
];

const preparationProcess = [
  { step: "01", icon: "ClipboardList", title: "Diagnostic Assessment", description: "Take a free diagnostic test to identify your current proficiency level and pinpoint areas that need improvement." },
  { step: "02", icon: "Target", title: "Personalized Study Plan", description: "Receive a customized study plan based on your target score, timeline, and individual strengths and weaknesses." },
  { step: "03", icon: "BookOpen", title: "Intensive Training", description: "Attend expert-led classes covering all test sections with proven strategies, tips, and extensive practice sessions." },
  { step: "04", icon: "Monitor", title: "Mock Tests & Practice", description: "Take regular full-length mock tests under real exam conditions with detailed performance analytics and feedback." },
  { step: "05", icon: "Sparkles", title: "Final Review & Exam Day", description: "Last-minute tips, confidence-building sessions, and complete guidance on exam day procedures and strategies." },
];

const faqs = [
  { q: "How long does it take to prepare for IELTS?", a: "Typically 4–8 weeks of focused preparation, depending on your current level. Students with a strong English foundation may need less time." },
  { q: "Do you offer online classes?", a: "Yes! We offer both in-person and online classes for all test preparations. Our online platform includes live interactive sessions, recorded lectures, and digital practice materials." },
  { q: "What is the average score improvement?", a: "Our students typically see an improvement of 1–2 bands in IELTS, 15–25 points in TOEFL, and 10–15 points in PTE within 6–8 weeks of preparation." },
  { q: "Do you provide study materials?", a: "Absolutely. All enrolled students receive comprehensive study materials including textbooks, practice tests, vocabulary lists, and access to our online learning portal." },
  { q: "Can I take a free demo class?", a: "Yes, we offer a free demo class and diagnostic test for all our courses. This helps you experience our teaching methodology and assess your starting level." },
];

/* ─── Component ────────────────────────────────────── */

export default function TestPreparationPage() {
  const { setShowSidebar } = useHeader();
  useEffect(() => { setShowSidebar(false); return () => setShowSidebar(true); }, [setShowSidebar]);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[440px] md:min-h-[500px] overflow-hidden">
        <Image src="/contact/image.png" alt="Students preparing for tests" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/85 via-[#002d5e]/70 to-[#003975]/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#003975] to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wide border border-white/20">
              <Icon name="BookOpen" size={12} className="inline mr-1.5 -mt-0.5" /> Test Preparation
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-2xl leading-[1.15]">
              Ace Your Exams,<br />Unlock Your Future
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed mb-8">
              Expert coaching for IELTS, TOEFL, PTE, GRE, SAT, and GMAT. Our proven strategies and personalized approach help you achieve your target scores.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition">
                Book Free Demo <Icon name="ArrowRight" size={14} />
              </Link>
              <Link href="#exams" className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition">
                View All Exams
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats Bar — Dark Navy ── */}
      <section className="py-10 md:py-14 bg-[#003975]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "10,000+", label: "Students Trained" },
              { num: "95%", label: "Target Score Achieved" },
              { num: "15+", label: "Expert Trainers" },
              { num: "6+", label: "Exam Types Covered" },
            ].map((s) => (
              <FadeUp key={s.label}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">{s.num}</div>
                  <div className="text-sm text-blue-200 mt-1.5">{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exams — 2‑col Horizontal Cards ── */}
      <section id="exams" className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                Comprehensive Prep
              </span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">
                Exams We Prepare You For
              </h2>
              <p className="text-slate-500 text-base max-w-lg mx-auto">
                From English proficiency to graduate admissions, we cover all major standardized tests
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-5">
            {exams.map((exam) => (
              <StaggerItem key={exam.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all overflow-hidden h-full flex">
                    {/* Left accent + icon */}
                    <div className="w-[88px] md:w-[100px] bg-slate-900 flex flex-col items-center justify-center gap-2 flex-shrink-0 py-6 text-white">
                      <Icon name={exam.icon} size={24} />
                      <div className="text-lg font-bold leading-none">{exam.stat}</div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-300">{exam.statLabel}</div>
                    </div>
                    {/* Right content */}
                    <div className="p-6 flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-0.5">{exam.title}</h3>
                      <p className="text-[11px] text-slate-400 font-medium mb-2">{exam.subtitle}</p>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{exam.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {exam.features.map((f) => (
                          <span key={f} className="flex items-center gap-1.5 text-[13px] text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#003975] flex-shrink-0" /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Preparation Process — Vertical Timeline ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="BookOpen" size={22} className="text-slate-400" />
                  <h2 className="text-3xl md:text-[40px] font-bold text-slate-900">Our Preparation Process</h2>
                </div>
                <p className="text-slate-500 text-sm mt-1">A structured, proven approach to help you reach your target score</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm transition self-start sm:self-auto">
                Start Preparing <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>

          <div className="relative">
            <div className="absolute left-[29px] top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            <div className="space-y-6">
              {preparationProcess.map((step, i) => (
                <FadeUp key={step.step} delay={i * 0.08}>
                  <div className="flex gap-6 md:gap-8 items-start">
                    <div className="relative z-10 flex-shrink-0 w-[58px] h-[58px] rounded-2xl bg-[#003975] text-white flex items-center justify-center text-lg font-bold shadow-lg">
                      {step.step}
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex-1 shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon name={step.icon} size={16} className="text-[#003975]" />
                        <h3 className="font-semibold text-slate-900 text-[15px]">{step.title}</h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us — 4‑col ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">Why NEXSUS</span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">Why Choose Our Test Prep?</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">Expert guidance backed by results — not just classes, but a complete preparation ecosystem</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseUs.map((f) => (
              <StaggerItem key={f.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:border-[#003975]/20 transition-colors group">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                        <Icon name={f.icon} size={20} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#003975]">{f.stat}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">{f.statLabel}</div>
                      </div>
                    </div>
                    <h4 className="text-[15px] font-semibold text-slate-900 mb-2 group-hover:text-[#003975] transition-colors">{f.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
              <p className="text-slate-500 text-sm">Everything you need to know about our test preparation programs</p>
            </div>
          </FadeUp>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-3 text-[15px]">
                    <span className="w-7 h-7 rounded-full bg-[#003975] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">Q</span>
                    {faq.q}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed pl-10">{faq.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-4 leading-tight">
              Ready to Start<br />Your Test Prep Journey?
            </h2>
            <p className="text-slate-500 mb-8 text-base max-w-md mx-auto">
              Book a free diagnostic test and consultation with our expert trainers today. Your target score is just a few weeks away.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg">
                Book Free Demo Class <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

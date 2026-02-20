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

const documentTypes = [
  {
    icon: "FileText",
    title: "Statement of Purpose (SOP)",
    description:
      "Compelling narratives that explain your academic journey and future goals.",
    features: ["Custom for each university", "3,000–5,000 words", "Unlimited revisions"],
    highlighted: false,
  },
  {
    icon: "PenLine",
    title: "Personal Statement",
    description:
      "Focused essays highlighting your unique experiences and perspectives.",
    features: ["Character-driven stories", "1,000–2,500 words", "Multiple Drafts"],
    highlighted: true,
  },
  {
    icon: "Mail",
    title: "Letter of Recommendation (LOR)",
    description:
      "Professional guidance for recommenders and draft templates.",
    features: ["Recommender Briefing", "Draft Preparation", "Review Support"],
    highlighted: false,
  },
  {
    icon: "ClipboardList",
    title: "Essays & Short Answers",
    description:
      "Concise, impactful responses to supplemental application questions.",
    features: ["Multiple essay support", "Word-limit adherence", "Creative Approaches"],
    highlighted: false,
  },
  {
    icon: "Briefcase",
    title: "CV/Resume",
    description:
      "Academic CVs formatted for international university applications.",
    features: ["ATS Optimized", "Academic Format", "Achievement-focused"],
    highlighted: true,
  },
  {
    icon: "Star",
    title: "Motivation Letters",
    description:
      "Persuasive letters for scholarships and special programs.",
    features: ["Scholarship-focused", "Program-specific", "Impact-Oriented"],
    highlighted: false,
  },
];

const writingProcess = [
  {
    step: "01",
    icon: "ClipboardList",
    title: "Discovery Session",
    description:
      "One-on-one consultation to understand your story, achievements, motivations, and career goals.",
  },
  {
    step: "02",
    icon: "Target",
    title: "Content Planning",
    description:
      "Strategic outline development highlighting your unique strengths and alignment with program goals.",
  },
  {
    step: "03",
    icon: "PenLine",
    title: "Professional Writing",
    description:
      "Expert writers craft a compelling narrative that showcases your potential and aspirations.",
  },
  {
    step: "04",
    icon: "Search",
    title: "Review & Refinement",
    description:
      "Multiple rounds of editing to ensure clarity, impact, and adherence to university requirements.",
  },
  {
    step: "05",
    icon: "Sparkles",
    title: "Final Polish",
    description:
      "Grammar check, formatting, and final quality assurance before submission.",
  },
];

const whyChooseFeatures = [
  {
    icon: "Award",
    title: "Expert Writers",
    description:
      "Former admissions officers and professional writers with deep university knowledge.",
    stat: "50+",
    statLabel: "Writers",
  },
  {
    icon: "Users",
    title: "Personalized Approach",
    description:
      "No templates — every document is uniquely crafted for your profile and goals.",
    stat: "1:1",
    statLabel: "Sessions",
  },
  {
    icon: "Trophy",
    title: "Proven Results",
    description:
      "Our SOPs have secured admissions to top universities worldwide.",
    stat: "95%",
    statLabel: "Success",
  },
  {
    icon: "Compass",
    title: "End-to-End Guidance",
    description:
      "Support beyond writing — from ideation and strategy to final polishing and submission readiness.",
    stat: "500+",
    statLabel: "Universities",
  },
];

const processLeft = [
  "One-on-one brainstorming sessions",
  "University-specific customization",
  "Fast turnaround (7-10 days)",
  "Format compliance verification",
];

const guarantees = [
  "Unlimited revisions until you're fully satisfied",
  "100% plagiarism-free, original content",
  "Thorough grammar and readability checks",
  "Complete confidentiality guaranteed",
];

/* ─── Component ────────────────────────────────────── */

export default function SOPPage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[420px] md:min-h-[480px] overflow-hidden">
        <Image
          src="/contact/image.png"
          alt="Students working on applications"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/85 via-[#002d5e]/70 to-[#003975]/40" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wide border border-white/20">
              <Icon name="PenLine" size={12} className="inline mr-1.5 -mt-0.5" />
              SOP &amp; Application Support
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-2xl leading-[1.15]">
              Your Story,
              <br />
              Professionally Told
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed mb-8">
              Expert SOP, personal statement, and application document writing
              services that make admissions committees take notice.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition"
              >
                Get Started <Icon name="ArrowRight" size={14} />
              </Link>
              <Link
                href="#documents"
                className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition"
              >
                View Documents
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Document Types ── */}
      <section id="documents" className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-5 rounded-full bg-slate-900 text-white text-sm font-medium">
                Documents We Help With
              </div>
              <p className="text-slate-500 text-base max-w-lg mx-auto">
                Comprehensive writing support for all your application needs
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {documentTypes.map((doc) => (
              <StaggerItem key={doc.title}>
                <HoverCard>
                  <div
                    className={`rounded-2xl p-7 h-full border transition-shadow ${
                      doc.highlighted
                        ? "bg-[#f0f4ff] border-[#d0daf0]"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                        doc.highlighted
                          ? "bg-[#003975] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon name={doc.icon} size={20} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                      {doc.description}
                    </p>
                    <ul className="space-y-2">
                      {doc.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-slate-500"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#003975] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Our Writing Process ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="PenLine" size={22} className="text-slate-400" />
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Our Writing Process
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mt-1">
                  From your first conversation to final submission, we ensure every word counts
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm transition self-start sm:self-auto"
              >
                Download Checklist <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[29px] top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

            <div className="space-y-6">
              {writingProcess.map((step, i) => (
                <FadeUp key={step.step} delay={i * 0.08}>
                  <div className="flex gap-6 md:gap-8 items-start">
                    <div className="relative z-10 flex-shrink-0 w-[58px] h-[58px] rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg font-bold shadow-lg">
                      {step.step}
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex-1 shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon
                          name={step.icon}
                          size={16}
                          className="text-slate-400"
                        />
                        <h3 className="font-semibold text-slate-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose NEXSUS — Redesigned ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Section header */}
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                Your Pathway
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Why Choose NEXSUS?
              </h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Not just writers — we&apos;re your partners in presenting your best self
              </p>
            </div>
          </FadeUp>

          {/* Feature cards — 4-card grid with stats */}
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {whyChooseFeatures.map((f) => (
              <StaggerItem key={f.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:border-[#003975]/20 transition-colors group">
                    {/* Icon + stat row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-[#003975] text-white flex items-center justify-center">
                        <Icon name={f.icon} size={18} />
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#003975]">{f.stat}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">{f.statLabel}</div>
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2 group-hover:text-[#003975] transition-colors">
                      {f.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* What makes us different — split layout */}
          <div className="rounded-3xl bg-gray-50 border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left — Our Process */}
              <FadeLeft>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[#003975] text-white flex items-center justify-center">
                      <Icon name="Settings" size={14} />
                    </div>
                    <h3 className="font-semibold text-slate-900">Our Process</h3>
                  </div>
                  <div className="space-y-4">
                    {processLeft.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#003975]/10 text-[#003975] flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={12} />
                        </div>
                        <span className="text-sm text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mt-6">
                    Our process is collaborative and strategic, ensuring your
                    application reflects authenticity, clarity, and impact.
                  </p>
                </div>
              </FadeLeft>

              {/* Right — Our Guarantee */}
              <FadeRight>
                <div className="p-8 md:p-10 bg-[#003975] text-white h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-white/15 text-white flex items-center justify-center">
                      <Icon name="ShieldCheck" size={14} />
                    </div>
                    <h3 className="font-semibold">Our Guarantee</h3>
                  </div>
                  <div className="space-y-4">
                    {guarantees.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-white/15 text-white flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={12} />
                        </div>
                        <span className="text-sm text-blue-50">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-blue-200 leading-relaxed mt-6">
                    We help you present your academic journey, achievements,
                    and aspirations in a clear, compelling way that stands out.
                  </p>
                </div>
              </FadeRight>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Ready to Write
              <br />
              Your Success Story?
            </h2>
            <p className="text-slate-500 mb-8 text-base max-w-md mx-auto">
              Book a consultation to discuss your application goals and get
              started with professional SOP writing services.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                Book Counselling <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

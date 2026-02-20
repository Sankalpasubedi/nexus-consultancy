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

const counselingTypes = [
  {
    title: "Academic Counseling",
    description: "Personalized guidance on choosing the right course, university, and country based on your academic profile, career goals, and budget.",
    features: ["University shortlisting", "Course compatibility analysis", "Scholarship matching", "Alternative pathway planning"],
    icon: "GraduationCap",
  },
  {
    title: "Career Counseling",
    description: "Strategic advice on how your study-abroad experience can align with your long-term career objectives and industry trends.",
    features: ["Industry trend analysis", "Career roadmap creation", "Post-study work options", "Skill gap assessment"],
    icon: "Briefcase",
  },
  {
    title: "Profile Assessment",
    description: "Comprehensive evaluation of your academic record, test scores, work experience, and extracurricular activities for best-fit recommendations.",
    features: ["Strength & weakness analysis", "Score predictions", "Competitiveness rating", "Improvement recommendations"],
    icon: "ClipboardList",
  },
  {
    title: "Country Selection",
    description: "In-depth comparison of study destinations based on education quality, living costs, work opportunities, and immigration pathways.",
    features: ["Cost-of-living comparison", "Immigration pathway analysis", "Work permit details", "Quality of life assessment"],
    icon: "Globe",
  },
  {
    title: "Financial Planning",
    description: "Complete financial guidance including education loans, scholarships, part-time work opportunities, and budget planning for your study abroad journey.",
    features: ["Education loan assistance", "Budget planning tools", "Part-time work guidance", "Scholarship applications"],
    icon: "DollarSign",
  },
  {
    title: "Application Strategy",
    description: "Expert guidance on crafting a strong application package with strategic university selection and timeline management.",
    features: ["Timeline planning", "University tiering strategy", "Document preparation", "Interview coaching"],
    icon: "Target",
  },
];

const howItWorks = [
  { icon: "MessageSquare", title: "Initial Consultation", description: "Free 30-minute session to understand your goals, preferences, and constraints." },
  { icon: "ClipboardList", title: "Profile Evaluation", description: "Detailed assessment of your academic profile, scores, and career aspirations." },
  { icon: "Map", title: "Strategy Creation", description: "Custom roadmap with university shortlist, timelines, and application strategies." },
  { icon: "FileText", title: "Application Support", description: "End-to-end help with SOP, LOR, resume, and all application documents." },
  { icon: "CheckCircle", title: "Admission & Beyond", description: "Support through admission, visa, accommodation, and pre-departure prep." },
];

const guarantees = [
  { icon: "Shield", title: "Expert Counselors", description: "Certified counselors with 10+ years of experience and deep knowledge of global education systems." },
  { icon: "Heart", title: "Student-First Approach", description: "We never push universities based on commissions. Your best interest is always our top priority." },
  { icon: "Award", title: "Proven Track Record", description: "Over 25,000 successful placements in top universities across 15+ countries worldwide." },
  { icon: "Clock", title: "Lifetime Support", description: "Our relationship doesn't end at enrollment. We provide ongoing support throughout your academic journey." },
];

/* ─── Component ────────────────────────────────────── */

export default function CounselingPage() {
  const { setShowSidebar } = useHeader();
  useEffect(() => { setShowSidebar(false); return () => setShowSidebar(true); }, [setShowSidebar]);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[440px] md:min-h-[500px] overflow-hidden">
        <Image src="/contact/image.png" alt="Career counseling session" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/85 via-[#002d5e]/70 to-[#003975]/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wide border border-white/20">
              <Icon name="Users" size={12} className="inline mr-1.5 -mt-0.5" /> Counseling Services
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-2xl leading-[1.15]">
              Expert Guidance for<br />Your Study Abroad Dream
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed mb-8">
              One-on-one counseling to help you choose the right country, university, and course. Your future starts with the right advice.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition">
                Book Free Session <Icon name="ArrowRight" size={14} />
              </Link>
              <Link href="#services" className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition">
                Explore Services
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats Bar — Left-accent card style ── */}
      <section className="py-10 md:py-14 bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "25,000+", label: "Students Counseled" },
              { num: "98%", label: "Satisfaction Rate" },
              { num: "15+", label: "Countries Covered" },
              { num: "500+", label: "Partner Universities" },
            ].map((s) => (
              <FadeUp key={s.label}>
                <div className="border-l-4 border-[#00ab18] pl-4 py-1">
                  <div className="text-3xl md:text-4xl font-bold text-white">{s.num}</div>
                  <div className="text-sm text-slate-400 mt-1">{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services — Numbered Feature Cards ── */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                Our Expertise
              </span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">
                Comprehensive Counseling Services
              </h2>
              <p className="text-slate-500 text-base max-w-lg mx-auto">
                From course selection to financial planning — we guide you through every decision
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {counselingTypes.map((ct, i) => (
              <StaggerItem key={ct.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl border border-gray-100 hover:border-[#003975]/20 transition-all p-6 h-full group relative overflow-hidden">
                    {/* Large number watermark */}
                    <span className="absolute top-3 right-5 text-[72px] font-black text-slate-900/[0.03] leading-none select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#003975] text-white flex items-center justify-center flex-shrink-0">
                          <Icon name={ct.icon} size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#003975] transition-colors">{ct.title}</h3>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{ct.description}</p>
                      <div className="space-y-2">
                        {ct.features.map((f) => (
                          <span key={f} className="flex items-center gap-2 text-[13px] text-slate-600">
                            <Icon name="Check" size={13} className="text-[#00ab18] flex-shrink-0" /> {f}
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

      {/* ── How It Works — Horizontal Flow ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">Process</span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">How It Works</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">Five simple steps from your first consultation to your university admission</p>
            </div>
          </FadeUp>

          {/* Desktop: horizontal flow with connecting line */}
          <div className="hidden lg:block relative">
            <div className="absolute top-[38px] left-[60px] right-[60px] h-px bg-gray-200" />
            <div className="grid grid-cols-5 gap-4">
              {howItWorks.map((step, i) => (
                <FadeUp key={step.title} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="w-[76px] h-[76px] rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto mb-5 relative z-10 shadow-lg">
                      <Icon name={step.icon} size={24} />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-[15px] mb-1.5">{step.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Mobile: stacked cards */}
          <div className="lg:hidden space-y-4">
            {howItWorks.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.06}>
                <div className="flex gap-4 items-start bg-white rounded-xl border border-gray-100 p-5">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                    <Icon name={step.icon} size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-[15px] mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Guarantees — Split Layout ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeLeft>
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                  Our Promise
                </span>
                <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-4 leading-tight">
                  Why Students Trust<br />Our Counseling
                </h2>
                <p className="text-slate-500 text-base mb-8 max-w-md leading-relaxed">
                  Our counselors are certified professionals with deep expertise in global education systems. We provide honest, transparent guidance tailored to your unique profile.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#003975] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#002d5e] transition">
                  Talk to a Counselor <Icon name="ArrowRight" size={14} />
                </Link>
              </div>
            </FadeLeft>
            <FadeRight>
              <div className="grid grid-cols-2 gap-4">
                {guarantees.map((g) => (
                  <div key={g.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-[#003975] text-white flex items-center justify-center mb-3">
                      <Icon name={g.icon} size={18} />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-[14px] mb-1.5">{g.title}</h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{g.description}</p>
                  </div>
                ))}
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-slate-900 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#003975]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-[40px] font-bold text-white mb-4 leading-tight">
              Your Dream University<br />Is One Step Away
            </h2>
            <p className="text-slate-300 mb-8 text-base max-w-md mx-auto">
              Book a free one-on-one counseling session with our expert advisors. No commitments, no pressure — just genuine guidance.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition shadow-lg">
                Schedule Free Consultation <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

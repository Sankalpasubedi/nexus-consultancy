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

const visaTypes = [
  {
    title: "Student Visa (F-1 / Tier 4)",
    description: "Full-time study visa for degree programs at accredited universities. The most common visa type for international students pursuing bachelor's, master's, or doctoral degrees.",
    features: ["Full-time degree programs", "On-campus work permitted", "OPT/PSW eligibility", "Dependent visa available"],
    icon: "GraduationCap",
    countries: "USA, UK, Canada, Australia",
  },
  {
    title: "Exchange Visitor Visa (J-1)",
    description: "For students participating in exchange programs, internships, or research scholar programs at approved institutions.",
    features: ["Exchange programs", "Research fellowships", "Short-term scholars", "Cultural exchange"],
    icon: "Globe",
    countries: "USA, Europe, Japan",
  },
  {
    title: "Working Holiday Visa",
    description: "Combination of travel and work opportunities for young professionals and students during academic breaks or gap years.",
    features: ["Work while traveling", "Age restrictions apply", "Limited duration", "Cultural immersion"],
    icon: "Briefcase",
    countries: "Australia, NZ, Canada, UK",
  },
  {
    title: "Post-Study Work Visa",
    description: "Allows graduates to remain in the country and work after completing their studies. Duration varies by country and qualification level.",
    features: ["Post-graduation work", "1–4 year duration", "Path to PR in some countries", "No employer sponsorship needed"],
    icon: "TrendingUp",
    countries: "Australia, Canada, UK, Germany",
  },
];

const documentChecklist = [
  {
    title: "Academic Documents",
    icon: "BookOpen",
    items: ["Original transcripts & mark sheets", "Degree certificates", "Standardized test scores (IELTS, GRE, etc.)", "Academic reference letters"],
  },
  {
    title: "Financial Documents",
    icon: "DollarSign",
    items: ["Bank statements (6–12 months)", "Scholarship award letters", "Education loan sanction letter", "Sponsor affidavit & income proof"],
  },
  {
    title: "Identity & Travel",
    icon: "FileText",
    items: ["Valid passport (6+ months validity)", "Passport-size photographs", "Birth certificate", "National ID card copy"],
  },
  {
    title: "Application Forms",
    icon: "ClipboardList",
    items: ["Completed visa application form", "University offer/acceptance letter", "Statement of Purpose (SOP)", "Health insurance proof"],
  },
];

const applicationProcess = [
  { step: "01", title: "Document Audit", description: "We review all your documents for completeness, accuracy, and compliance with specific embassy requirements.", icon: "Search" },
  { step: "02", title: "Application Prep", description: "We fill out your visa application form with precision, ensuring every field is completed correctly.", icon: "FileText" },
  { step: "03", title: "Financial Proof", description: "We help organize bank statements, loan documents, and sponsorship letters to meet financial requirements.", icon: "DollarSign" },
  { step: "04", title: "Interview Coaching", description: "Mock interview sessions with common questions, best answers, and confidence-building techniques.", icon: "MessageSquare" },
  { step: "05", title: "Application Filing", description: "We submit your application at the right time with the right documents to maximize approval chances.", icon: "Send" },
  { step: "06", title: "Post-Decision Support", description: "Whether approved or not, we guide you on next steps — travel planning or reapplication strategy.", icon: "CheckCircle" },
];

/* ─── Component ────────────────────────────────────── */

export default function VisaPage() {
  const { setShowSidebar } = useHeader();
  useEffect(() => { setShowSidebar(false); return () => setShowSidebar(true); }, [setShowSidebar]);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[440px] md:min-h-[500px] overflow-hidden">
        <Image src="/contact/image.png" alt="Visa application assistance" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/85 via-[#002d5e]/70 to-[#003975]/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wide border border-white/20">
              <Icon name="FileText" size={12} className="inline mr-1.5 -mt-0.5" /> Visa Assistance
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-2xl leading-[1.15]">
              Visa Success<br />Made Simple
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed mb-8">
              Navigate complex visa requirements with confidence. Our experts handle documentation, applications, and interview preparation for a smooth process.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition">
                Start Visa Process <Icon name="ArrowRight" size={14} />
              </Link>
              <Link href="#types" className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition">
                Visa Types
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats Bar — White with top accent ── */}
      <section className="border-t-4 border-[#003975] py-10 md:py-14 bg-white shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "15,000+", label: "Visas Processed" },
              { num: "99.2%", label: "Approval Rate" },
              { num: "20+", label: "Countries Covered" },
              { num: "48hrs", label: "Avg. Response Time" },
            ].map((s) => (
              <FadeUp key={s.label}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#003975]">{s.num}</div>
                  <div className="text-sm text-slate-500 mt-1.5">{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visa Types — Left-bordered Cards ── */}
      <section id="types" className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="mb-14">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                Visa Categories
              </span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">
                Visa Types We Handle
              </h2>
              <p className="text-slate-500 text-base max-w-lg">
                Expert assistance across all major student and work visa categories
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-5">
            {visaTypes.map((vt) => (
              <StaggerItem key={vt.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex group">
                    {/* Left accent border */}
                    <div className="w-1.5 bg-slate-900 flex-shrink-0 group-hover:bg-[#003975] transition-colors" />
                    <div className="p-6 flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                          <Icon name={vt.icon} size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#003975] transition-colors">{vt.title}</h3>
                          <span className="text-[11px] text-slate-400 font-medium">{vt.countries}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{vt.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {vt.features.map((f) => (
                          <span key={f} className="inline-flex items-center gap-1.5 text-[12px] text-slate-600 bg-gray-50 px-2.5 py-1 rounded-full">
                            <span className="w-1 h-1 rounded-full bg-slate-900" /> {f}
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

      {/* ── Document Checklist — 4‑col ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">Checklist</span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">Document Checklist</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">Essential documents you'll need — we'll help you prepare every single one</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {documentChecklist.map((cat) => (
              <StaggerItem key={cat.title}>
                <div className="bg-gray-50 rounded-2xl p-5 h-full border border-gray-100 hover:border-[#003975]/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#003975] text-white flex items-center justify-center mb-4">
                    <Icon name={cat.icon} size={18} />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-[15px] mb-3">{cat.title}</h4>
                  <div className="space-y-2">
                    {cat.items.map((item) => (
                      <span key={item} className="flex items-start gap-2 text-[13px] text-slate-500">
                        <Icon name="Check" size={12} className="text-[#00ab18] flex-shrink-0 mt-0.5" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Application Process — 3×2 Numbered Grid ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">Step by Step</span>
                <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-2">Application Process</h2>
                <p className="text-slate-500 text-sm">Our systematic 6-step process ensures nothing is missed</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#003975] text-white text-sm font-medium hover:bg-[#002d5e] transition self-start sm:self-auto">
                Get Started <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {applicationProcess.map((step) => (
              <StaggerItem key={step.step}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full group hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:bg-[#003975] transition-colors">
                      {step.step}
                    </div>
                    <div className="w-8 h-px bg-gray-200 flex-shrink-0" />
                    <div className="w-9 h-9 rounded-lg bg-gray-50 text-slate-400 flex items-center justify-center group-hover:text-[#003975] transition-colors">
                      <Icon name={step.icon} size={16} />
                    </div>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-[15px] mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Why Trust Us — Split ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeLeft>
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">Trust & Expertise</span>
                <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-4 leading-tight">
                  Why Trust NEXSUS<br />With Your Visa?
                </h2>
                <p className="text-slate-500 text-base leading-relaxed mb-6">
                  With a 99.2% visa approval rate, our team has the expertise and track record to handle even the most complex visa cases with confidence.
                </p>
                <div className="space-y-4">
                  {["Dedicated visa specialist assigned to your case", "Real-time application tracking and updates", "Embassy relationship for smooth processing", "Free reapplication support if needed"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={12} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeLeft>
            <FadeRight>
              <div className="relative bg-gradient-to-br from-[#003975] to-slate-900 rounded-3xl p-8 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Our Visa Success</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { num: "99.2%", label: "Approval Rate" },
                      { num: "15,000+", label: "Visas Processed" },
                      { num: "20+", label: "Countries" },
                      { num: "0", label: "Hidden Fees" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="text-3xl font-bold text-white mb-1">{s.num}</div>
                        <div className="text-sm text-blue-200">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-4 leading-tight">
              Ready to Start Your<br />Visa Application?
            </h2>
            <p className="text-slate-500 mb-8 text-base max-w-md mx-auto">
              Get a free visa assessment from our expert team. We'll review your profile and guide you through every step.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg">
                Free Visa Assessment <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

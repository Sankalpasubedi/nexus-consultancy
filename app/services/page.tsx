"use client";

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

const services = [
  {
    icon: "Target",
    title: "Career Counseling",
    description:
      "Personalized guidance to help you choose the right course and university based on your profile, interests, and career goals.",
    features: ["Profile Assessment", "Career Mapping", "University Matching"],
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: "PenLine",
    title: "Application Support",
    description:
      "End-to-end assistance with university applications including SOP, LOR, essays, and CV preparation.",
    features: ["SOP Writing", "Document Review", "Application Tracking"],
    gradient: "from-purple-500 to-pink-500",
    link: "/services/sop",
  },
  {
    icon: "ShieldCheck",
    title: "Visa Assistance",
    description:
      "Expert visa guidance with a 98% success rate. We handle documentation, interview prep, and filing.",
    features: ["Document Prep", "Interview Coaching", "Application Filing"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: "BookOpen",
    title: "Test Preparation",
    description:
      "Comprehensive preparation for IELTS, TOEFL, PTE, GRE, GMAT, and SAT with experienced instructors.",
    features: ["Practice Tests", "Expert Tutoring", "Score Guarantee"],
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: "DollarSign",
    title: "Scholarship Guidance",
    description:
      "We help identify and apply for scholarships, grants, and financial aid to reduce your education costs.",
    features: ["Scholarship Search", "Application Help", "Financial Planning"],
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: "Plane",
    title: "Pre-Departure Briefing",
    description:
      "Comprehensive orientation covering accommodation, travel, banking, culture, and settling-in essentials.",
    features: ["Travel Support", "Accommodation Help", "Cultural Orientation"],
    gradient: "from-cyan-500 to-blue-500",
  },
];

const documents = [
  {
    icon: "FileText",
    title: "Statement of Purpose (SOP)",
    description: "Custom, compelling narrative that highlights your goals and motivations.",
    details: "1000-1500 words • Unlimited revisions",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: "ClipboardList",
    title: "Personal Statement",
    description: "Character-driven narrative showcasing your unique experiences and aspirations.",
    details: "1000-1500 words • Multiple drafts",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: "Mail",
    title: "Letter of Recommendation",
    description: "Professional LOR drafting with recommender briefing and review.",
    details: "Recommender briefing • Draft prep • Review",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: "PenLine",
    title: "Essays & Short Answers",
    description: "Targeted essay support for specific university requirements.",
    details: "Multiple essay support • Word-limit optimization",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: "FileText",
    title: "CV / Resume",
    description: "ATS-optimized, academic-format resumes focused on achievements.",
    details: "ATS-Optimized • Achievement-focused",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: "Mail",
    title: "Motivation Letters",
    description: "Program-specific motivation letters for scholarships and admissions.",
    details: "Scholarship-focused • Impact-oriented",
    gradient: "from-cyan-500 to-blue-500",
  },
];

const process = [
  { step: "01", title: "Discovery Session", description: "One-on-one brainstorming to understand your story, goals, and unique strengths." },
  { step: "02", title: "Content Planning", description: "Strategic outline development with key themes and talking points." },
  { step: "03", title: "Professional Writing", description: "Expert writers craft your documents with university-specific customization." },
  { step: "04", title: "Review & Refinement", description: "Iterative feedback cycles to perfect tone, structure, and content." },
  { step: "05", title: "Final Polish", description: "Grammar checks, formatting verification, and plagiarism-free guarantee." },
];

const features = [
  "One-on-one brainstorming sessions",
  "University-specific customization",
  "Fast turnaround (7-10 days)",
  "Format compliance verification",
  "Unlimited revisions",
  "100% plagiarism-free",
  "Grammar & readability checks",
  "Complete confidentiality",
];

/* ─── Component ────────────────────────────────────── */

export default function ServicesPage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#003975] via-[#002d5e] to-[#001a3a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 text-sm font-medium">
              <Icon name="Settings" size={16} /> Our Services
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
              Comprehensive Support for Your <span className="text-[#00ab18]">Academic Journey</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl text-blue-100 max-w-2xl">
              From career counseling to post-arrival support — we handle everything so you can focus on your future.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What We Offer</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Six core services to guide you at every stage
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <HoverCard>
                  <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 relative overflow-hidden group">
                    <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${s.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity rounded-full`} />
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                      <Icon name={s.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{s.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.features.map((f) => (
                        <span key={f} className="px-3 py-1 rounded-full bg-gray-100 text-slate-600 text-xs font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                    {s.link && (
                      <Link href={s.link} className="inline-flex items-center gap-1 text-[#003975] text-sm font-medium mt-4 hover:gap-2 transition-all">
                        Learn More →
                      </Link>
                    )}
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SOP & Document Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="PenLine" size={16} /> Document Services
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Expert Document Preparation
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Professionally crafted documents that make your application stand out
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map((d) => (
              <StaggerItem key={d.title}>
                <HoverCard>
                  <div className="bg-white rounded-3xl p-8 h-full border border-gray-100">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${d.gradient} flex items-center justify-center text-xl mb-5 shadow-lg`}>
                      <Icon name={d.icon} size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{d.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{d.description}</p>
                    <p className="text-xs text-[#003975] font-medium">{d.details}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Writing Process */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
                <Icon name="Settings" size={16} /> Our Process
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">How We Work</h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-5 gap-6">
            {process.map((p, i) => (
              <FadeUp key={p.step} delay={i * 0.1}>
                <div className="text-center relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    className="w-16 h-16 rounded-full bg-[#003975] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg"
                  >
                    {p.step}
                  </motion.div>
                  {i < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#003975]/30 to-transparent" />
                  )}
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">{p.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{p.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeLeft>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-blue-50 text-[#003975] text-sm font-medium">
                <Icon name="Star" size={20} /> Why Choose Us
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Quality You Can Trust
              </h2>
              <p className="text-slate-500 mb-8">
                Our team of expert writers and counselors ensure every document meets the highest standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0"><Icon name="Check" size={12} /></span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Documents Written", value: "10,000+" },
                { label: "Acceptance Rate", value: "95%" },
                { label: "Avg Turnaround", value: "7 Days" },
                { label: "Student Satisfaction", value: "4.9/5" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                  <div className="text-2xl font-bold text-[#003975] mb-1">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeRight>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Book a free consultation and let us help you build the perfect application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
                >
                  Book Free Consultation →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
                >
                  Explore Courses
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

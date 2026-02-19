"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect, useState } from "react";
import { Icon } from "@/lib/icons";

/* ─── Data ─────────────────────────────────────────── */

const documentCategories = [
  {
    icon: "GraduationCap",
    title: "Academic Documents",
    gradient: "from-blue-500 to-indigo-500",
    docs: [
      { name: "Educational Transcripts", description: "Official academic records from all institutions attended." },
      { name: "Letters of Recommendation", description: "2-3 LORs from professors or employers." },
      { name: "Degree Certificates", description: "Certified copies of completed degrees." },
      { name: "Statement of Purpose", description: "Compelling narrative about your goals and motivation." },
    ],
  },
  {
    icon: "PenLine",
    title: "Test Scores",
    gradient: "from-purple-500 to-pink-500",
    docs: [
      { name: "English Proficiency (IELTS/TOEFL/PTE)", description: "Required by almost all universities. Aim for IELTS 6.5+." },
      { name: "GRE/GMAT/SAT", description: "Standardized test scores for specific programs." },
    ],
  },
  {
    icon: "CreditCard",
    title: "Identity & Passport",
    gradient: "from-green-500 to-emerald-500",
    docs: [
      { name: "Valid Passport", description: "Must be valid for at least 6 months beyond travel date." },
      { name: "National ID", description: "Government-issued identity document." },
      { name: "Passport-size Photographs", description: "Recent photos as per country-specific requirements." },
    ],
  },
  {
    icon: "DollarSign",
    title: "Financial Documents",
    gradient: "from-amber-500 to-orange-500",
    docs: [
      { name: "Bank Statements", description: "Last 6-12 months showing sufficient funds." },
      { name: "Scholarship Letters", description: "Official award letters if applicable." },
      { name: "Sponsorship Letter", description: "If sponsored by family or organization." },
    ],
  },
  {
    icon: "ShieldCheck",
    title: "Visa Documents",
    gradient: "from-red-500 to-pink-500",
    docs: [
      { name: "Visa Application Form", description: "Completed and signed application." },
      { name: "Confirmation of Enrollment (COE)", description: "Official acceptance from the university." },
      { name: "Health Insurance (OSHC)", description: "Overseas student health coverage proof." },
    ],
  },
  {
    icon: "FolderOpen",
    title: "Additional Documents",
    gradient: "from-cyan-500 to-blue-500",
    docs: [
      { name: "Resume / CV", description: "Updated academic and professional resume." },
      { name: "Work Experience Letters", description: "If applicable, from previous employers." },
      { name: "Medical Report", description: "Health examination results as required." },
    ],
  },
];

const tips = [
  { icon: "Clock", title: "Start Early", description: "Begin gathering documents 3-6 months before deadlines." },
  { icon: "ClipboardList", title: "Keep Copies", description: "Maintain multiple copies of all original documents." },
  { icon: "CheckCircle", title: "Follow Requirements", description: "Check country-specific requirements carefully." },
  { icon: "Save", title: "Digital Backups", description: "Scan and store digital copies in cloud storage." },
];

/* ─── Component ────────────────────────────────────── */

export default function DocumentsPage() {
  const { setShowSidebar } = useHeader();
  const [openCategory, setOpenCategory] = useState<number | null>(0);

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#003975] via-[#002d5e] to-[#001a3a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <FadeUp>
            <Link href="/study-abroad" className="inline-flex items-center gap-2 text-white/70 text-sm mb-4 hover:text-white transition">
              ← Study Abroad
            </Link>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
              Documents <span className="text-[#00ab18]">Required</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl text-blue-100 max-w-2xl">
              Complete checklist of documents you&apos;ll need for your application and visa process.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Document Categories */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Document Checklist</h2>
              <p className="text-lg text-slate-500">Click each category to see required documents</p>
            </div>
          </FadeUp>
          <div className="space-y-4">
            {documentCategories.map((cat, i) => (
              <FadeUp key={cat.title} delay={i * 0.05}>
                <div className="border border-gray-200 rounded-3xl overflow-hidden">
                  <button
                    onClick={() => setOpenCategory(openCategory === i ? null : i)}
                    className="w-full flex items-center gap-4 p-6 text-left hover:bg-gray-50 transition"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <Icon name={cat.icon} size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{cat.title}</h3>
                      <p className="text-sm text-slate-400">{cat.docs.length} documents</p>
                    </div>
                    <motion.span
                      animate={{ rotate: openCategory === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-400"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openCategory === i ? "auto" : 0,
                      opacity: openCategory === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {cat.docs.map((doc) => (
                        <div key={doc.name} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                          <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5"><Icon name="Check" size={12} /></span>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{doc.name}</p>
                            <p className="text-slate-500 text-xs mt-1">{doc.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="Lightbulb" size={16} /> Pro Tips
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Document Preparation Tips</h2>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-4 gap-6">
            {tips.map((t) => (
              <StaggerItem key={t.title}>
                <HoverCard>
                  <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 h-full">
                    <div className="mb-4 flex justify-center"><Icon name={t.icon} size={36} className="text-slate-600" /></div>
                    <h3 className="font-semibold text-slate-900 mb-2">{t.title}</h3>
                    <p className="text-slate-500 text-sm">{t.description}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Need Help With Documents?</h2>
            <p className="text-blue-100 mb-8">Our team will review your documents and ensure everything is in order.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold shadow-lg">
                Get Document Support →
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

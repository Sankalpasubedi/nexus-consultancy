"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

interface DocItem {
  name: string;
  required?: boolean;
  description: string;
  bullets: string[];
}

interface DocCategory {
  icon: string;
  title: string;
  docs: DocItem[];
}

const documentCategories: DocCategory[] = [
  {
    icon: "GraduationCap",
    title: "Academic Documents",
    docs: [
      {
        name: "Educational Transcripts",
        required: true,
        description: "Official transcripts from all institutions attended.",
        bullets: [
          "Must be attested/notarized",
          "Translated to English if required",
          "Include grade conversion scale",
        ],
      },
      {
        name: "Letter of Recommendation",
        required: true,
        description: "Official transcripts from all institutions attended.",
        bullets: [
          "Must be attested/notarized",
          "Translated to English if required",
          "Include grade conversion scale",
        ],
      },
      {
        name: "Degree Certificates",
        required: true,
        description: "Official transcripts from all institutions attended.",
        bullets: [
          "Must be attested/notarized",
          "Translated to English if required",
          "Include grade conversion scale",
        ],
      },
      {
        name: "Statement of Purpose",
        required: true,
        description: "Official transcripts from all institutions attended.",
        bullets: [
          "Must be attested/notarized",
          "Translated to English if required",
          "Include grade conversion scale",
        ],
      },
    ],
  },
  {
    icon: "FileText",
    title: "Test Scores",
    docs: [
      {
        name: "English Proficiency (IELTS/TOEFL/PTE)",
        required: true,
        description: "Required by almost all universities. Aim for IELTS 6.5+.",
        bullets: [
          "Score must be within 2 years",
          "Send official scores directly to university",
        ],
      },
      {
        name: "GRE/GMAT/SAT",
        description: "Standardized test scores for specific programs.",
        bullets: [
          "Check if your program requires it",
          "Request official score report be sent to institution",
        ],
      },
    ],
  },
  {
    icon: "CreditCard",
    title: "Identity and Passport",
    docs: [
      {
        name: "Valid Passport",
        required: true,
        description: "Must be valid for at least 6 months beyond travel date.",
        bullets: [
          "Ensure enough blank pages for visas",
          "Renew early if close to expiry",
        ],
      },
      {
        name: "National ID",
        description: "Government-issued identity document.",
        bullets: ["Keep certified copies ready"],
      },
      {
        name: "Passport-size Photographs",
        required: true,
        description: "Recent photos as per country-specific requirements.",
        bullets: [
          "White background, matte finish",
          "Follow specific country size guidelines",
        ],
      },
    ],
  },
  {
    icon: "DollarSign",
    title: "Financial Documents",
    docs: [
      {
        name: "Bank Statements",
        required: true,
        description: "Last 6-12 months showing sufficient funds.",
        bullets: [
          "Must reflect tuition + living cost coverage",
          "Certified by the bank with stamp and signature",
        ],
      },
      {
        name: "Scholarship Letters",
        description: "Official award letters if applicable.",
        bullets: ["Include amount and duration of funding"],
      },
      {
        name: "Sponsorship Letter",
        description: "If sponsored by family or organization.",
        bullets: [
          "Notarized affidavit of support",
          "Include sponsor's financial proof",
        ],
      },
    ],
  },
  {
    icon: "Globe",
    title: "Visa Documents",
    docs: [
      {
        name: "Visa Application Form",
        required: true,
        description: "Completed and signed application.",
        bullets: [
          "Fill out accurately — errors cause delays",
          "Keep a copy for your records",
        ],
      },
      {
        name: "Confirmation of Enrollment (COE)",
        required: true,
        description: "Official acceptance from the university.",
        bullets: ["Must match your visa application details"],
      },
      {
        name: "Health Insurance (OSHC)",
        required: true,
        description: "Overseas student health coverage proof.",
        bullets: [
          "Required in countries like Australia",
          "Coverage must span your entire stay",
        ],
      },
    ],
  },
  {
    icon: "FolderOpen",
    title: "Additional Documents",
    docs: [
      {
        name: "Resume / CV",
        description: "Updated academic and professional resume.",
        bullets: ["Highlight relevant experience and achievements"],
      },
      {
        name: "Work Experience Letters",
        description: "If applicable, from previous employers.",
        bullets: ["Include dates, role, and responsibilities"],
      },
      {
        name: "Medical Report",
        required: true,
        description: "Health examination results as required.",
        bullets: [
          "From an approved panel physician",
          "Must include chest X-ray and blood tests",
        ],
      },
    ],
  },
];

const tips = [
  {
    icon: "Clock",
    title: "Start Early",
    description:
      "Begin collecting documents 3-6 months before application deadlines. Some documents take time to obtain.",
  },
  {
    icon: "Copy",
    title: "Keep Copies",
    description:
      "Make multiple copies of all original documents. Keep originals separate from copies you send.",
  },
  {
    icon: "CheckCircle",
    title: "Follow Requirements",
    description:
      "Each university and country has specific requirements. Check official websites for exact specifications.",
  },
  {
    icon: "Save",
    title: "Digital Backups",
    description:
      "Scan all documents and keep digital copies in cloud storage for easy access.",
  },
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
    <main className="pt-20 bg-white">
      {/* ───── Hero ───── */}
      <section className="relative pt-20 pb-12 px-6">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
              Study Abroad
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mt-3 mb-6 max-w-2xl leading-tight">
              Documents Required
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-lg text-slate-500 max-w-xl mb-8 leading-relaxed">
              A comprehensive checklist of all documents you&apos;ll need for
              university applications and student visa. Stay organized and
              prepared.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link
              href="#checklist"
              className="inline-flex items-center gap-2.5 bg-[#003975] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#002d5e] transition shadow-lg shadow-blue-900/20"
            >
              Download Checklist
              <Icon name="ArrowRight" size={16} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ───── Why keep track ───── */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-4">
              <span className="inline-flex items-center px-5 py-2 rounded-full border border-gray-200 text-sm text-slate-600 font-medium">
                Why keep track of your documents?
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-center text-sm text-slate-400 mb-12">
              Keep the checklists safe and follow through with us in your
              application process
            </p>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip) => (
              <StaggerItem key={tip.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm h-full">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-5">
                      <Icon
                        name={tip.icon}
                        size={20}
                        className="text-white"
                      />
                    </div>
                    <h3 className="font-semibold text-[#003975] mb-2 text-sm">
                      {tip.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ───── Document Checklist ───── */}
      <section
        id="checklist"
        className="py-20 px-6 bg-gradient-to-b from-gray-50/80 to-white"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header row */}
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Icon
                    name="ClipboardList"
                    size={18}
                    className="text-white"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Document Checklist
                </h2>
              </div>
              <Link
                href="#"
                className="inline-flex items-center gap-2 border border-gray-300 text-slate-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition"
              >
                Download Checklist
                <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="text-sm text-slate-400 mb-10">
              A comprehensive checklist of all documents you&apos;ll need for
              university applications and student visa
            </p>
          </FadeUp>

          {/* Accordion */}
          <div className="space-y-0 divide-y divide-gray-200 border-t border-gray-200">
            {documentCategories.map((cat, i) => {
              const isOpen = openCategory === i;
              return (
                <FadeUp key={cat.title} delay={i * 0.04}>
                  <div>
                    {/* Accordion header */}
                    <button
                      onClick={() =>
                        setOpenCategory(isOpen ? null : i)
                      }
                      className="w-full flex items-center gap-4 py-5 text-left group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
                        <Icon
                          name={cat.icon}
                          size={16}
                          className="text-white"
                        />
                      </div>
                      <span className="flex-1 text-xs font-bold tracking-widest text-slate-800 uppercase">
                        {cat.title}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-slate-400"
                      >
                        <Icon name="ChevronDown" size={18} />
                      </motion.span>
                    </button>

                    {/* Accordion content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pl-4 sm:pl-13">
                            {/* Timeline-style cards */}
                            <div className="relative">
                              {/* Vertical line */}
                              <div className="absolute left-3 top-4 bottom-4 w-px bg-gray-200" />

                              <div className="space-y-6">
                                {cat.docs.map((doc, di) => (
                                  <div
                                    key={doc.name}
                                    className="relative flex items-start gap-5"
                                  >
                                    {/* Dot */}
                                    <div className="relative z-10 mt-5 w-7 h-7 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
                                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                                    </div>

                                    {/* Card */}
                                    <motion.div
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: di * 0.08,
                                        duration: 0.35,
                                      }}
                                      className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
                                    >
                                      {doc.required && (
                                        <span className="inline-block text-[10px] font-bold tracking-wide uppercase bg-orange-100 text-orange-600 px-2.5 py-0.5 rounded-full mb-2">
                                          Required
                                        </span>
                                      )}
                                      <h4 className="font-semibold text-slate-900 text-sm mb-1">
                                        {doc.name}
                                      </h4>
                                      <p className="text-xs text-slate-400 mb-2.5">
                                        {doc.description}
                                      </p>
                                      <ul className="space-y-1">
                                        {doc.bullets.map((b) => (
                                          <li
                                            key={b}
                                            className="flex items-start gap-2 text-xs text-slate-500"
                                          >
                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                                            {b}
                                          </li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="py-24 px-6">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Need Help
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Preparing your Documents?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Our document preparation service ensures all your paperwork is
              complete, accurate, and ready for submission.
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#003975] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#002d5e] transition shadow-lg shadow-blue-900/20"
              >
                Get Document Support
                <Icon name="ArrowRight" size={16} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

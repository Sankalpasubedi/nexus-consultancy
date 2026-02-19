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
import { Icon, FlagIcon } from "@/lib/icons";

/* ─── Data ─────────────────────────────────────────── */

const countries = [
  {
    name: "Australia",
    flag: "au",
    topUnis: "7 in Top 100",
    tuition: "$20K-$45K/yr",
    living: "$15K-$22K/yr",
    workVisa: "Post-study work visa up to 4 years",
    workRights: "Part-time work while studying (48hrs/fortnight)",
    educationRating: 95,
    costRating: 65,
    workRating: 90,
    qolRating: 92,
    highlights: ["Post-study work visa 4yr", "Part-time work rights", "7 unis in Top 100"],
    slug: "australia",
  },
  {
    name: "United Kingdom",
    flag: "gb",
    topUnis: "4 in Top 10",
    tuition: "$15K-$40K/yr",
    living: "$12K-$18K/yr",
    workVisa: "Graduate Route 2-year visa",
    workRights: "20hrs/week during term",
    educationRating: 98,
    costRating: 55,
    workRating: 75,
    qolRating: 85,
    highlights: ["4 unis in Top 10", "Shorter degree programs", "Graduate Route 2yr visa"],
    slug: "uk",
  },
  {
    name: "Canada",
    flag: "ca",
    topUnis: "3 in Top 50",
    tuition: "$15K-$35K/yr",
    living: "$10K-$15K/yr",
    workVisa: "Post-graduation work permit up to 3 years",
    workRights: "20hrs/week during studies",
    educationRating: 88,
    costRating: 72,
    workRating: 85,
    qolRating: 95,
    highlights: ["PR pathway available", "Work permit 3yr", "Affordable tuition"],
    slug: "canada",
  },
  {
    name: "United States",
    flag: "us",
    topUnis: "5 in Top 10",
    tuition: "$25K-$55K/yr",
    living: "$15K-$25K/yr",
    workVisa: "OPT up to 3 years (STEM)",
    workRights: "On-campus employment, CPT/OPT",
    educationRating: 99,
    costRating: 40,
    workRating: 80,
    qolRating: 82,
    highlights: ["5 unis in Top 10", "OPT 3yr for STEM", "Unmatched research"],
    slug: "usa",
  },
  {
    name: "New Zealand",
    flag: "nz",
    topUnis: "2 in Top 200",
    tuition: "$18K-$35K/yr",
    living: "$10K-$15K/yr",
    workVisa: "Post-study work visa up to 3 years",
    workRights: "20hrs/week during term",
    educationRating: 78,
    costRating: 75,
    workRating: 82,
    qolRating: 96,
    highlights: ["Lower cost of living", "Work visa 3yr", "Beautiful environment"],
    slug: "new-zealand",
  },
];

const categories = [
  { key: "educationRating", label: "Education Quality", icon: "GraduationCap" },
  { key: "costRating", label: "Cost of Living", icon: "DollarSign" },
  { key: "workRating", label: "Work Opportunities", icon: "Briefcase" },
  { key: "qolRating", label: "Quality of Life", icon: "Home" },
] as const;

/* ─── Component ────────────────────────────────────── */

export default function DestinationsComparePage() {
  const { setShowSidebar } = useHeader();
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]["key"]>("educationRating");

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  const sortedCountries = [...countries].sort((a, b) => b[activeCategory] - a[activeCategory]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#003975] via-[#002d5e] to-[#001a3a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <FadeUp>
            <Link href="/study-abroad" className="inline-flex items-center gap-2 text-white/70 text-sm mb-4 hover:text-white transition">
              ← Study Abroad
            </Link>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
              Compare <span className="text-[#00ab18]">Destinations</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl text-blue-100 max-w-2xl">
              Side-by-side comparison of top study destinations to help you make the right choice.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Compare Categories */}
      <section className="py-16 px-6 bg-white border-b border-gray-100 sticky top-20 z-30 backdrop-blur-xl bg-white/90">
        <div className="max-w-[1440px] mx-auto flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-[#003975] text-white shadow-lg"
                  : "bg-gray-100 text-slate-600 hover:bg-gray-200"
              }`}
            >
              <Icon name={cat.icon} size={16} className="inline-block" /> {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Rankings */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          {sortedCountries.map((country, i) => (
            <FadeUp key={country.name} delay={i * 0.1}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex-shrink-0"><FlagIcon code={country.flag} size={40} /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-bold text-[#003975] bg-blue-50 px-3 py-1 rounded-full">#{i + 1}</span>
                      <h3 className="text-2xl font-bold text-slate-900">{country.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500">{country.topUnis} globally ranked universities</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#003975]">{country[activeCategory]}</div>
                    <div className="text-xs text-slate-400">/ 100</div>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-3 mb-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${country[activeCategory]}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#003975] to-[#00ab18]"
                  />
                </div>
                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Tuition</p>
                    <p className="text-sm font-semibold text-slate-700">{country.tuition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Living Costs</p>
                    <p className="text-sm font-semibold text-slate-700">{country.living}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Work Visa</p>
                    <p className="text-sm font-semibold text-slate-700">{country.workVisa}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Work Rights</p>
                    <p className="text-sm font-semibold text-slate-700">{country.workRights}</p>
                  </div>
                </div>
                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {country.highlights.map((h) => (
                    <span key={h} className="px-3 py-1 rounded-full bg-blue-50 text-[#003975] text-xs font-medium">{h}</span>
                  ))}
                </div>
                {/* Link */}
                <Link href={`/destinations/${country.slug}`} className="inline-flex items-center gap-1 text-[#003975] text-sm font-medium mt-4 hover:gap-2 transition-all">
                  View Full Guide →
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Can&apos;t Decide?</h2>
            <p className="text-blue-100 mb-8">Let our counselors help you pick the perfect destination.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold shadow-lg">
                Get Expert Advice →
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

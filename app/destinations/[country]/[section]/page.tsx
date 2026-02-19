"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { countryDataMap } from "@/data";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { FlagIcon, Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

const sectionMeta: Record<string, { title: string; icon: string; color: string }> = {
  "why-study-here": { title: "Why Study Here", icon: "Lightbulb", color: "from-blue-600 to-indigo-600" },
  universities: { title: "Universities", icon: "GraduationCap", color: "from-emerald-600 to-teal-600" },
  admission: { title: "Admission Requirements", icon: "ClipboardList", color: "from-violet-600 to-purple-600" },
  "student-visa": { title: "Student Visa", icon: "ShieldCheck", color: "from-orange-500 to-red-500" },
  "living-cost": { title: "Living Cost", icon: "DollarSign", color: "from-amber-500 to-yellow-500" },
  "work-and-jobs": { title: "Work & Jobs", icon: "Briefcase", color: "from-cyan-500 to-blue-500" },
  scholarships: { title: "Scholarships", icon: "Trophy", color: "from-pink-500 to-rose-500" },
  culture: { title: "Culture & Lifestyle", icon: "Globe", color: "from-green-600 to-emerald-600" },
};

const allSections = ["why-study-here", "universities", "admission", "student-visa", "living-cost", "work-and-jobs", "scholarships", "culture"];

export default function DestinationSectionPage() {
  const params = useParams();
  const country = params.country as string;
  const section = params.section as string;
  const data = countryDataMap[country];
  const meta = sectionMeta[section];
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  if (!data || !meta) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
          <Link href={`/destinations/${country}`} className="text-[#003975] font-medium hover:underline">
            Back to {country}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen">
      {/* Breadcrumb & Hero */}
      <section className={`relative py-16 md:py-24 px-6 bg-gradient-to-br from-[#003975] via-[#002d5e] to-[#001a3a] text-white overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp>
            <div className="flex items-center gap-2 text-white/70 text-sm mb-6 flex-wrap">
              <Link href="/destinations" className="hover:text-white transition">Destinations</Link>
              <span>/</span>
              <Link href={`/destinations/${country}`} className="hover:text-white transition flex items-center gap-1.5">
                <FlagIcon code={data.flagCode} size={14} />
                {data.country}
              </Link>
              <span>/</span>
              <span className="text-white">{meta.title}</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-lg`}>
                <Icon name={meta.icon} size={26} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{meta.title}</h1>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl text-blue-100 max-w-2xl">
              Comprehensive guide to {meta.title.toLowerCase()} in {data.country}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Section Navigation Tabs */}
      <div className="sticky top-[68px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 py-2">
            {allSections.map((s) => (
              <Link
                key={s}
                href={`/destinations/${country}/${s}`}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  s === section
                    ? "bg-[#003975] text-white"
                    : "text-slate-600 hover:bg-gray-100"
                }`}
              >
                {sectionMeta[s]?.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {section === "why-study-here" && <WhyStudyHere data={data} />}
        {section === "universities" && <Universities data={data} />}
        {section === "admission" && <Admission data={data} />}
        {section === "student-visa" && <StudentVisa data={data} />}
        {section === "living-cost" && <LivingCost data={data} />}
        {section === "work-and-jobs" && <WorkAndJobs data={data} />}
        {section === "scholarships" && <Scholarships data={data} />}
        {section === "culture" && <Culture data={data} />}
      </div>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with Your Application?</h2>
            <p className="text-blue-100 mb-6">Our expert counselors are ready to guide you through every step of your journey to {data.country}.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition">
              Get Free Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

/* ─── Why Study Here ─────────────────────────────── */
function WhyStudyHere({ data }: { data: any }) {
  return (
    <div className="space-y-16">
      <FadeUp>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-slate-600 leading-relaxed">
            {data.highlightedData.description}
          </p>
        </div>
      </FadeUp>

      {/* Statistics */}
      <FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.highlightedData.statistics.map((stat: any) => (
            <div key={stat.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100">
              <p className="text-2xl font-bold text-[#003975] mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* Reasons */}
      <div>
        <FadeUp>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Top Reasons to Study in {data.country}</h2>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.whyData.map((reason: string, idx: number) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  {idx + 1}
                </div>
                <p className="text-slate-700 leading-relaxed">{reason}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

/* ─── Universities ───────────────────────────────── */
function Universities({ data }: { data: any }) {
  return (
    <div className="space-y-12">
      <FadeUp>
        <p className="text-lg text-slate-600">
          {data.country} is home to world-class universities that offer excellent programs across various fields. Here are the top institutions you should consider.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.universities.map((uni: any) => (
          <StaggerItem key={uni.id}>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{uni.name}</h3>
                  <p className="text-sm text-slate-500">{uni.location.city}, {uni.location.state}</p>
                </div>
                <div className="px-3 py-1.5 bg-blue-50 text-[#003975] rounded-xl text-sm font-bold">
                  #{uni.ranking.position}
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3">
                  <Icon name="Award" size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">Ranking: #{uni.ranking.position} {uni.ranking.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="ShieldCheck" size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">Accredited by: {uni.scholarship.accreditedBy}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Trophy" size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">{uni.scholarship.description}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <Icon name="DollarSign" size={14} /> Up to {uni.scholarship.percentage}% scholarship
                </span>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

/* ─── Admission ──────────────────────────────────── */
function Admission({ data }: { data: any }) {
  const [level, setLevel] = useState("Undergraduate");
  const levels = Object.keys(data.admissionRequirementsData);

  return (
    <div className="space-y-12">
      <FadeUp>
        <p className="text-lg text-slate-600">
          Admission requirements vary by program level and university. Below is a comprehensive overview of typical requirements for studying in {data.country}.
        </p>
      </FadeUp>

      {/* Level Selector */}
      <FadeUp>
        <div className="flex flex-wrap gap-3">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition ${
                level === l
                  ? "bg-[#003975] text-white shadow-lg"
                  : "bg-gray-100 text-slate-600 hover:bg-gray-200"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Requirements */}
      <motion.div
        key={level}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#003975] to-[#002d5e] px-6 py-4">
            <h3 className="text-lg font-semibold text-white">{level} Requirements</h3>
          </div>
          <div className="p-6 space-y-4">
            {data.admissionRequirementsData[level]?.map((req: any) => (
              <div key={req.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#003975]/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckCircle" size={16} className="text-[#003975]" />
                </div>
                <p className="text-slate-700">{req.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Application Tips */}
      <FadeUp>
        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Icon name="Lightbulb" size={20} className="text-amber-500" />
            Application Tips
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-slate-700">
              <Icon name="CheckCircle" size={16} className="text-emerald-500 flex-shrink-0 mt-1" />
              Start your application at least 6-12 months before the intended intake
            </li>
            <li className="flex items-start gap-3 text-slate-700">
              <Icon name="CheckCircle" size={16} className="text-emerald-500 flex-shrink-0 mt-1" />
              Prepare a strong Statement of Purpose tailored to each university
            </li>
            <li className="flex items-start gap-3 text-slate-700">
              <Icon name="CheckCircle" size={16} className="text-emerald-500 flex-shrink-0 mt-1" />
              Ensure all documents are certified and translated if necessary
            </li>
            <li className="flex items-start gap-3 text-slate-700">
              <Icon name="CheckCircle" size={16} className="text-emerald-500 flex-shrink-0 mt-1" />
              Contact our counselors for personalized guidance on your application
            </li>
          </ul>
        </div>
      </FadeUp>
    </div>
  );
}

/* ─── Student Visa ───────────────────────────────── */
function StudentVisa({ data }: { data: any }) {
  return (
    <div className="space-y-12">
      <FadeUp>
        <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <Icon name="Clock" size={28} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Average Processing Time</p>
            <p className="text-3xl font-bold text-slate-900">{data.visaRequirements.processingtime}</p>
          </div>
        </div>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.visaRequirements.VisaCardData.map((card: any) => (
          <StaggerItem key={card.id}>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Icon name={card.icon || "FileText"} size={18} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              </div>
              <ul className="space-y-3">
                {card.items.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <Icon name="CheckCircle" size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeUp>
        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
          <h3 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Icon name="Lightbulb" size={20} className="text-amber-500" />
            Important Visa Tips
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-amber-500 font-bold">1.</span>
              Apply for your visa as soon as you receive your offer letter
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 font-bold">2.</span>
              Ensure financial documents clearly show sufficient funds
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 font-bold">3.</span>
              Complete medical examinations at approved health centers
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 font-bold">4.</span>
              Keep certified copies of all submitted documents
            </li>
          </ul>
        </div>
      </FadeUp>
    </div>
  );
}

/* ─── Living Cost ────────────────────────────────── */
function LivingCost({ data }: { data: any }) {
  return (
    <div className="space-y-12">
      <FadeUp>
        <p className="text-lg text-slate-600">
          Understanding the cost of living is essential for planning your budget. Here&apos;s a breakdown of typical weekly expenses in {data.country} ({data.currency}).
        </p>
      </FadeUp>

      {/* Cost Table */}
      <FadeUp>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#003975] to-[#002d5e] px-6 py-4">
            <h3 className="text-lg font-semibold text-white">Weekly Cost Breakdown ({data.currency})</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {data.costData.map((cost: any) => (
              <div key={cost.id} className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{cost.category}</p>
                  <p className="text-sm text-slate-500">{data.currency} {cost.minCost} - {cost.maxCost} per week</p>
                </div>
                <div className="w-48 hidden md:block">
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cost.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-[#003975] to-[#006BDB] rounded-full"
                    />
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <p className="text-lg font-bold text-[#003975]">
                    {data.currency} {cost.maxCost}
                  </p>
                  <p className="text-xs text-slate-400">max/week</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-5 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">Estimated Total</p>
              <p className="text-xl font-bold text-[#003975]">
                {data.currency} {data.costData.reduce((a: number, c: any) => a + c.minCost, 0)} - {data.costData.reduce((a: number, c: any) => a + c.maxCost, 0)} / week
              </p>
            </div>
          </div>
        </div>
      </FadeUp>

      <FadeUp>
        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
          <h3 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Icon name="Lightbulb" size={20} className="text-emerald-500" />
            Money-Saving Tips
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-emerald-500 flex-shrink-0 mt-1" />
              Share accommodation with other students to reduce rent costs
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-emerald-500 flex-shrink-0 mt-1" />
              Use student discounts for transport, food, and entertainment
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-emerald-500 flex-shrink-0 mt-1" />
              Cook at home and buy groceries in bulk for savings
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-emerald-500 flex-shrink-0 mt-1" />
              Take advantage of part-time work opportunities during studies
            </li>
          </ul>
        </div>
      </FadeUp>
    </div>
  );
}

/* ─── Work & Jobs ────────────────────────────────── */
function WorkAndJobs({ data }: { data: any }) {
  return (
    <div className="space-y-12">
      <FadeUp>
        <p className="text-lg text-slate-600">
          Understanding work rights and career opportunities is crucial when choosing a study destination. Here is what {data.country} offers.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.workData.map((work: any, idx: number) => (
          <StaggerItem key={idx}>
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
                <Icon name={work.icon || "Briefcase"} size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{work.title}</h3>
              <p className="text-slate-600 leading-relaxed">{work.description}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeUp>
        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-blue-500" />
            Career Tips for International Students
          </h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-blue-500 flex-shrink-0 mt-1" />
              Start networking early through university career fairs and events
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-blue-500 flex-shrink-0 mt-1" />
              Build your LinkedIn profile and connect with industry professionals
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-blue-500 flex-shrink-0 mt-1" />
              Use university career services for resume reviews and interview coaching
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-blue-500 flex-shrink-0 mt-1" />
              Consider internships and co-op programs that provide valuable experience
            </li>
          </ul>
        </div>
      </FadeUp>
    </div>
  );
}

/* ─── Scholarships ───────────────────────────────── */
function Scholarships({ data }: { data: any }) {
  return (
    <div className="space-y-12">
      <FadeUp>
        <p className="text-lg text-slate-600">
          Numerous scholarships are available for international students in {data.country}. Here are some of the most notable funding opportunities.
        </p>
      </FadeUp>

      <StaggerContainer className="space-y-5">
        {data.scholarshipData.map((sch: any) => (
          <StaggerItem key={sch.id}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{sch.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Icon name="Users" size={14} className="text-slate-400" />
                      {sch.eligibility}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Calendar" size={14} className="text-slate-400" />
                      Deadline: {sch.deadline}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1">Award</p>
                  <p className="text-lg font-bold text-emerald-600">{sch.amount}</p>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeUp>
        <div className="bg-pink-50 rounded-2xl p-8 border border-pink-100">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Icon name="Lightbulb" size={20} className="text-pink-500" />
            Scholarship Application Tips
          </h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-pink-500 flex-shrink-0 mt-1" />
              Apply early as most scholarships have limited spots and specific deadlines
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-pink-500 flex-shrink-0 mt-1" />
              Prepare a strong personal statement highlighting your achievements and goals
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-pink-500 flex-shrink-0 mt-1" />
              Check university-specific scholarships in addition to national programs
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle" size={14} className="text-pink-500 flex-shrink-0 mt-1" />
              Contact our team for help identifying scholarships you may be eligible for
            </li>
          </ul>
        </div>
      </FadeUp>
    </div>
  );
}

/* ─── Culture ────────────────────────────────────── */
function Culture({ data }: { data: any }) {
  return (
    <div className="space-y-12">
      <FadeUp>
        <p className="text-lg text-slate-600">
          Understanding the culture and daily life in {data.country} will help you adjust more quickly and make the most of your study experience.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.cultureData.map((item: any) => (
          <StaggerItem key={item.id}>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition"
            >
              {item.image && (
                <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center">
                  <Icon name="Globe" size={48} className="text-emerald-300" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Testimonials if available */}
      {data.testimonials && data.testimonials.length > 0 && (
        <FadeUp>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Icon name="Star" size={20} className="text-amber-400" />
              Student Experiences in {data.country}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.testimonials.slice(0, 2).map((t: any, idx: number) => (
                <div key={idx} className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <p className="text-white/80 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-medium text-white">{t.name}</p>
                    <p className="text-sm text-white/60">{t.degree} - {t.university}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      )}
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { countryDataMap } from "@/data";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  HoverCard,
  ClipReveal,
  Float,
} from "@/lib/animations";
import { FlagIcon, Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import type { CountryDataType } from "@/types/country";

/* ─── Section metadata ────────────────────────────── */

const sectionMeta: Record<string, { title: string; navTitle: string; icon: string; description: string }> = {
  "why-study-here": { title: "Why Study Here", navTitle: "Why Study Here", icon: "Lightbulb", description: "Discover the compelling reasons that make this an ideal study destination" },
  universities: { title: "Universities & Institutions", navTitle: "Universities", icon: "GraduationCap", description: "Explore top-ranked universities, their programs, and scholarships" },
  admission: { title: "Admission Requirements", navTitle: "Admission", icon: "ClipboardList", description: "Complete guide to application requirements at every education level" },
  "student-visa": { title: "Student Visa Guide", navTitle: "Student Visa", icon: "ShieldCheck", description: "Everything you need to know about visa applications, documents, and processing" },
  "living-cost": { title: "Cost of Living", navTitle: "Cost of Living", icon: "DollarSign", description: "Detailed breakdown of monthly expenses for international students" },
  "work-and-jobs": { title: "Work & Career Opportunities", navTitle: "Work & Career", icon: "Briefcase", description: "Part-time work rights, post-study options, and career prospects" },
  scholarships: { title: "Scholarships & Financial Aid", navTitle: "Scholarships", icon: "Trophy", description: "Funding opportunities, eligibility criteria, and application deadlines" },
  culture: { title: "Culture & Student Life", navTitle: "Culture & Life", icon: "Globe", description: "Lifestyle, traditions, and what to expect living as a student" },
};

const allSections = ["why-study-here", "universities", "admission", "student-visa", "living-cost", "work-and-jobs", "scholarships", "culture"];

/* ─── Helper ──────────────────────────────────────── */
function parseStatNum(value: string): { num: number; suffix: string } | null {
  const m = value.match(/^(\d+)/);
  if (!m) return null;
  return { num: parseInt(m[1], 10), suffix: value.slice(m[0].length) };
}

/* ─── Main Component ──────────────────────────────── */

export default function DestinationSectionClient() {
  const params = useParams();
  const country = params.country as string;
  const section = params.section as string;
  const data = countryDataMap[country];
  const meta = sectionMeta[section];
  const { setShowSidebar } = useHeader();
  const navRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollNav = (dir: "left" | "right") => {
    const el = navRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

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
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative py-16 md:py-24 px-6 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.carouselData.CountryImages[0]?.url || "/destinations/Australia.png"}
            alt={data.country}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#003975]/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp>
            <nav className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm mb-8">
              <Link href="/destinations" className="text-white/70 hover:text-white transition font-medium">
                Destinations
              </Link>
              <Icon name="ChevronRight" size={12} className="text-white/30" />
              <Link href={`/destinations/${country}`} className="flex items-center gap-1.5 text-white/70 hover:text-white transition font-medium">
                <FlagIcon code={data.flagCode} size={14} />
                {data.country}
              </Link>
              <Icon name="ChevronRight" size={12} className="text-white/30" />
              <span className="text-white font-semibold">{meta.title}</span>
            </nav>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Icon name={meta.icon} size={26} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{meta.title}</h1>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              {meta.description} for international students in {data.country}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ SECTION NAV ═══════════ */}
      <div className="sticky top-[68px] z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Fade indicators */}
          {canScrollLeft && (
            <div className="absolute left-6 top-0 bottom-0 w-10 bg-gradient-to-r from-white/95 to-transparent z-10 pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="absolute right-6 top-0 bottom-0 w-10 bg-gradient-to-l from-white/95 to-transparent z-10 pointer-events-none" />
          )}
          {/* Scroll arrows */}
          {canScrollLeft && (
            <button
              onClick={() => scrollNav("left")}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
              aria-label="Scroll left"
            >
              <Icon name="ChevronLeft" size={14} className="text-slate-600" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollNav("right")}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
              aria-label="Scroll right"
            >
              <Icon name="ChevronRight" size={14} className="text-slate-600" />
            </button>
          )}
          <div ref={navRef} className="flex items-center gap-0.5 py-2 overflow-x-auto scrollbar-hide -mx-1 scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
            {allSections.map((s) => {
              const isActive = s === section;
              return (
                <Link
                  key={s}
                  href={`/destinations/${country}/${s}`}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    isActive
                      ? "text-[#003975] bg-[#003975]/5"
                      : "text-slate-500 hover:text-slate-800 hover:bg-gray-50"
                  }`}
                >
                  <Icon name={sectionMeta[s]?.icon} size={13} className={isActive ? "text-[#003975]" : "text-slate-400"} />
                  {sectionMeta[s]?.navTitle}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#003975] rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════ CONTENT ═══════════ */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {section === "why-study-here" && <WhyStudyHere data={data} country={country} />}
        {section === "universities" && <Universities data={data} country={country} />}
        {section === "admission" && <Admission data={data} country={country} />}
        {section === "student-visa" && <StudentVisa data={data} country={country} />}
        {section === "living-cost" && <LivingCost data={data} country={country} />}
        {section === "work-and-jobs" && <WorkAndJobs data={data} country={country} />}
        {section === "scholarships" && <Scholarships data={data} country={country} />}
        {section === "culture" && <Culture data={data} country={country} />}
      </div>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.carouselData.CountryImages[0]?.url || "/destinations/Australia.png"}
            alt={data.country}
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#003975]/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <Float duration={5} distance={6}>
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <FlagIcon code={data.flagCode} size={28} />
                </div>
              </Float>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Your Application?</h2>
              <p className="text-white/70 mb-8 text-lg max-w-xl mx-auto">
                Our expert counselors are ready to guide you through every step of your journey to {data.country}.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold shadow-xl text-sm">
                    Get Free Consultation <Icon name="ArrowRight" size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link href={`/destinations/${country}`} className="inline-flex items-center gap-2 text-white border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition text-sm">
                    Back to {data.country} Overview
                  </Link>
                </motion.div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════
   WHY STUDY HERE — Full Page
   ═══════════════════════════════════════════════════════ */

function WhyStudyHere({ data, country }: { data: CountryDataType; country: string }) {
  return (
    <div className="space-y-20">
      {/* Overview */}
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <FadeLeft className="lg:col-span-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Why {data.country} Is an Ideal Study Destination
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {data.highlightedData.description}
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              Every year, thousands of international students choose {data.country} for its world-class education system,
              diverse cultural experiences, and outstanding career prospects after graduation. Whether you&apos;re pursuing
              undergraduate, postgraduate, or doctoral studies, {data.country} offers programs that are internationally
              recognized and designed to prepare students for global opportunities.
            </p>
          </div>
        </FadeLeft>
        <FadeRight className="lg:col-span-2">
          <div>
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <FlagIcon code={data.flagCode} size={22} />
                </div>
                <div>
                  <p className="text-xs text-white/50 font-medium uppercase tracking-wider">Study Destination</p>
                  <p className="text-lg font-bold">{data.country}</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Education Quality", icon: "Star", desc: "Globally recognized degrees" },
                  { label: "Student Support", icon: "Users", desc: "Extensive support services" },
                  { label: "Career Prospects", icon: "TrendingUp", desc: "Strong post-study work options" },
                  { label: "Safety & Lifestyle", icon: "ShieldCheck", desc: "High quality of life" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[#003975] flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeRight>
      </div>

      {/* Key Stats */}
      <div>
        <FadeUp>
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="BarChart3" size={16} className="text-white" />
            </div>
            Key Facts & Statistics
          </h3>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.highlightedData.statistics.map((stat, idx) => {
            const parsed = parseStatNum(stat.value);
            const statIcons = ["GraduationCap", "Briefcase", "BookOpen", "Lightbulb"];
            return (
              <FadeUp key={stat.id} delay={idx * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={statIcons[idx] || "Star"} size={18} className="text-white" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 mb-1">
                    {parsed ? <AnimatedCounter value={parsed.num} suffix={parsed.suffix} prefix="" /> : stat.value}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>

      {/* Detailed Reasons — Grid */}
      <div>
        <FadeUp>
          <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Sparkles" size={16} className="text-white" />
            </div>
            Top Reasons to Study in {data.country}
          </h3>
          <p className="text-slate-500 mb-8 max-w-2xl">Discover what makes {data.country} one of the most sought-after destinations for international education.</p>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.whyData.map((reason, idx) => (
            <StaggerItem key={idx}>
              <HoverCard>
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow h-full">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-slate-700 leading-relaxed font-medium">{reason}</p>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Education System Highlights */}
      <FadeUp>
        <div className="bg-[#fafaf8] rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="BookOpen" size={16} className="text-white" />
            </div>
            Education System Highlights
          </h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "Qualification Recognition", desc: `Degrees from ${data.country} are recognized worldwide by employers and institutions, making them an excellent long-term investment.`, icon: "Award" },
              { title: "Research & Innovation", desc: `${data.country} invests heavily in research and development, giving students access to cutting-edge labs, libraries, and technology.`, icon: "Lightbulb" },
              { title: "Flexible Pathways", desc: `Students can pursue diverse pathways including dual degrees, exchange programs, and credit transfers between institutions.`, icon: "Compass" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center mb-3">
                  <Icon name={item.icon} size={16} className="text-white" />
                </div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* How Nexsus Helps */}
      <FadeUp>
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#003975]/40 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/70 mb-4 border border-white/5">
                <Icon name="Handshake" size={12} /> Expert Guidance
              </span>
              <h3 className="text-2xl font-bold mb-4">How Nexsus Helps You</h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                Our team of expert counselors has helped thousands of students achieve their dream of studying in {data.country}. We provide end-to-end support — from choosing the right university to securing your visa and preparing for departure.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition"
              >
                Book Free Session <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { step: "University Selection & Shortlisting", desc: "Personalized recommendations based on your profile" },
                { step: "Application & SOP Preparation", desc: "Expert review and tailored statement crafting" },
                { step: "Visa Documentation & Guidance", desc: "Complete document preparation and interview prep" },
                { step: "Pre-Departure Briefing", desc: "Practical tips on accommodation, travel, and settling in" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 bg-white/5 rounded-xl px-5 py-4 border border-white/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#003975] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">{item.step}</p>
                    <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   UNIVERSITIES — Full Page
   ═══════════════════════════════════════════════════════ */

function Universities({ data, country }: { data: CountryDataType; country: string }) {
  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <FadeLeft className="lg:col-span-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Top Universities in {data.country}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {data.country} is home to world-class universities offering excellent programs across engineering, business, health sciences, and more. Explore details on rankings, scholarship availability, and accreditation below.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Each institution below has been carefully vetted by Nexsus for academic quality, student support services, and international student satisfaction. Our partnerships ensure you receive the best guidance and placement assistance.
            </p>
          </div>
        </FadeLeft>
        <FadeRight className="lg:col-span-2">
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">University Snapshot</h4>
            <div className="space-y-3">
              {[
                { label: "Partner Universities", value: `${data.universities.length}+ Institutions`, icon: "Building" },
                { label: "Highest Scholarship", value: `Up to ${Math.max(...data.universities.map(u => u.scholarship.percentage))}%`, icon: "Award" },
                { label: "Popular Fields", value: "Engineering, Business, IT", icon: "BookOpen" },
                { label: "Nexsus Placement Rate", value: "95%+ success", icon: "TrendingUp" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#003975] flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeRight>
      </div>

      {/* Stats Banner */}
      <FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Partner Institutions", value: data.universities.length, suffix: "+", icon: "Building" },
            { label: "Avg Scholarship", value: Math.round(data.universities.reduce((a, u) => a + u.scholarship.percentage, 0) / data.universities.length), suffix: "%", icon: "Percent" },
            { label: "Global Rankings", value: data.universities.filter(u => u.ranking.position <= 500).length, suffix: "", icon: "Trophy" },
            { label: "Cities Covered", value: [...new Set(data.universities.map(u => u.location.city))].length, suffix: "+", icon: "MapPin" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon} size={18} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900">
                <AnimatedCounter value={stat.value} />{stat.suffix}
              </div>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </FadeUp>

      {/* Summary table */}
      <FadeUp>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="Table" size={16} className="text-white/70" />
              University Rankings & Scholarships at a Glance
            </h3>
            <span className="text-xs text-white/50 font-medium bg-white/10 px-3 py-1 rounded-full">{data.universities.length} universities</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fafaf8] border-b border-gray-100">
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">#</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">University</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ranking</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Accredited By</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Scholarship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.universities.map((uni, idx) => (
                  <motion.tr
                    key={uni.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#fafaf8] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 text-sm">{uni.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{uni.location.city}, {uni.location.state}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#003975]">
                        #{uni.ranking.position} <span className="text-xs text-slate-400 font-normal">{uni.ranking.type}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{uni.scholarship.accreditedBy}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#003975] bg-blue-50 px-2.5 py-1 rounded-full">
                        Up to {uni.scholarship.percentage}%
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeUp>

      {/* University Detail Cards */}
      <div>
        <FadeUp>
          <h3 className="text-lg font-semibold text-slate-900 mb-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Building" size={16} className="text-white" />
            </div>
            Detailed University Profiles
          </h3>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.universities.map((uni) => (
            <StaggerItem key={uni.id}>
              <HoverCard>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">#{uni.ranking.position}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{uni.name}</h4>
                        <p className="text-sm text-slate-400">{uni.location.city}, {uni.location.state}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4 mb-5">
                    <div className="flex items-center gap-3 text-sm">
                      <Icon name="Award" size={14} className="text-[#003975]" />
                      <span className="text-slate-600">Ranking: <span className="font-medium text-slate-900">#{uni.ranking.position} {uni.ranking.type}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Icon name="ShieldCheck" size={14} className="text-[#003975]" />
                      <span className="text-slate-600">Accredited by: <span className="font-medium text-slate-900">{uni.scholarship.accreditedBy}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Icon name="DollarSign" size={14} className="text-[#003975]" />
                      <span className="text-slate-600">{uni.scholarship.description}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003975] bg-blue-50 px-3 py-1.5 rounded-full">
                      <Icon name="Percent" size={12} />
                      Up to {uni.scholarship.percentage}% scholarship available
                    </span>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* How Nexsus Helps */}
      <FadeUp>
        <div className="bg-[#fafaf8] rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Users" size={16} className="text-white" />
            </div>
            How Nexsus Helps with University Selection
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Profile Assessment", desc: "We evaluate your academic profile, test scores, and career goals to shortlist universities that match.", icon: "UserCheck" },
              { title: "Application Support", desc: "End-to-end assistance with SOP, LOR, CV preparation and application submission.", icon: "FileText" },
              { title: "Scholarship Guidance", desc: "We identify scholarship opportunities and help you apply for maximum financial support.", icon: "DollarSign" },
              { title: "Visa & Pre-departure", desc: "Complete visa processing support plus pre-departure briefings to prepare you for life abroad.", icon: "Plane" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-3">
                  <Icon name={item.icon} size={18} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ADMISSION — Full Page
   ═══════════════════════════════════════════════════════ */

function Admission({ data, country }: { data: CountryDataType; country: string }) {
  const [level, setLevel] = useState("Undergraduate");
  const levels = Object.keys(data.admissionRequirementsData);

  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <FadeLeft className="lg:col-span-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Admission Requirements for {data.country}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Admission requirements vary by program level, university, and field of study. Below is a comprehensive guide covering undergraduate, postgraduate, and doctoral admissions in {data.country}.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              It&apos;s important to start your preparations early, as competitive programs may have limited spots and earlier deadlines. Always check individual university websites for the most up-to-date requirements.
            </p>
          </div>
        </FadeLeft>
        <FadeRight className="lg:col-span-2">
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Quick Overview</h4>
            <div className="space-y-3">
              {[
                { label: "Available Levels", value: levels.join(", "), icon: "GraduationCap" },
                { label: "English Tests", value: "IELTS / TOEFL / PTE", icon: "FileText" },
                { label: "Application Lead Time", value: "6–12 months recommended", icon: "Clock" },
                { label: "Intakes", value: "Feb/Mar & Jul/Sep (varies)", icon: "Calendar" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#003975] flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeRight>
      </div>

      {/* Application Process Steps */}
      <FadeUp>
        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
            <Icon name="Compass" size={16} className="text-white" />
          </div>
          Application Process Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { step: "Research & Shortlist", desc: "Choose universities and programs that match your profile", icon: "Search" },
            { step: "Prepare Documents", desc: "Gather transcripts, test scores, SOP, and recommendations", icon: "FileText" },
            { step: "Submit Applications", desc: "Apply through university portals or centralized systems", icon: "Send" },
            { step: "Accept & Enroll", desc: "Accept your offer, pay deposit, and begin visa process", icon: "CheckCircle" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-3">
                <Icon name={item.icon} size={18} className="text-white" />
              </div>
              <div className="text-xs text-[#003975] font-bold mb-1">Step {i + 1}</div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">{item.step}</h4>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </FadeUp>

      {/* Level Tabs */}
      <FadeUp>
        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                level === l
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-gray-100 text-slate-600 hover:bg-gray-200"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Requirements Table */}
      <motion.div
        key={level}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="ClipboardList" size={16} className="text-white/70" />
              {level} Requirements
            </h3>
            <span className="text-xs text-white/50 font-medium bg-white/10 px-3 py-1 rounded-full">{data.admissionRequirementsData[level]?.length} items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fafaf8] border-b border-gray-100">
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">#</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Requirement</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.admissionRequirementsData[level]?.map((req, idx) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#fafaf8] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 leading-relaxed">{req.text}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#003975]">
                        <Icon name="CheckCircle" size={14} /> Required
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* English Proficiency */}
      <FadeUp>
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Globe" size={16} className="text-white" />
            </div>
            English Proficiency Requirements
          </h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { test: "IELTS Academic", scores: "6.0 – 7.5", desc: "Most widely accepted English test. Band requirements depend on program and level." },
              { test: "TOEFL iBT", scores: "80 – 100+", desc: "Internet-based test accepted by most universities. Higher scores needed for postgrad." },
              { test: "PTE Academic", scores: "58 – 79", desc: "Computer-based test with quick results. Increasingly accepted worldwide." },
            ].map((test, i) => (
              <div key={i} className="bg-[#fafaf8] rounded-xl p-5 border border-gray-100">
                <p className="text-sm font-bold text-slate-900 mb-1">{test.test}</p>
                <p className="text-lg font-bold text-[#003975] mb-2">{test.scores}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{test.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Application Tips */}
      <FadeUp>
        <div className="bg-[#fafaf8] rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Lightbulb" size={16} className="text-white" />
            </div>
            Application Tips
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Start your application 6–12 months before the intended intake",
              "Write a tailored Statement of Purpose for each university",
              "Ensure all documents are certified and translated if required",
              "Prepare for English proficiency tests (IELTS, TOEFL, PTE) well in advance",
              "Get strong letters of recommendation from academic or professional referees",
              "Research each university's specific requirements — they can vary significantly",
              "Apply to 4–6 universities across different competitiveness levels",
              "Contact Nexsus counselors for personalized guidance on your application",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={12} className="text-white" />
                </div>
                <p className="text-sm text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STUDENT VISA — Full Page
   ═══════════════════════════════════════════════════════ */

function StudentVisa({ data, country }: { data: CountryDataType; country: string }) {
  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <FadeLeft className="lg:col-span-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Student Visa Guide for {data.country}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              A comprehensive overview of the required documents, processing timeline, and tips for a successful student visa application to {data.country}.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              The visa application process can seem overwhelming, but with proper preparation and guidance from Nexsus, you can navigate it with confidence. We have a proven track record of successful visa applications across all major destinations.
            </p>
          </div>
        </FadeLeft>
        <FadeRight className="lg:col-span-2">
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Visa Essentials</h4>
            <div className="space-y-3">
              {[
                { label: "Processing Time", value: data.visaRequirements.processingtime, icon: "Clock" },
                { label: "Document Categories", value: `${data.visaRequirements.VisaCardData.length} categories`, icon: "FolderOpen" },
                { label: "Health Check", value: "Required", icon: "HeartPulse" },
                { label: "Nexsus Success Rate", value: "98%+ approval", icon: "ShieldCheck" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#003975] flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeRight>
      </div>

      {/* Visa Application Steps */}
      <FadeUp>
        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
            <Icon name="Compass" size={16} className="text-white" />
          </div>
          Visa Application Process
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { step: "Receive Offer", desc: "Get your admission confirmation letter from your chosen university", icon: "Mail" },
            { step: "Gather Documents", desc: "Collect academic transcripts, financial proofs, and health records", icon: "FileText" },
            { step: "Submit Application", desc: "Lodge your visa application online with all supporting documents", icon: "Send" },
            { step: "Biometrics & Interview", desc: "Complete biometrics capture and attend interview if required", icon: "User" },
            { step: "Visa Granted", desc: "Receive your student visa and begin pre-departure preparations", icon: "CheckCircle" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 text-center hover:shadow-md transition-shadow relative"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-3">
                <Icon name={item.icon} size={18} className="text-white" />
              </div>
              <div className="text-xs text-[#003975] font-bold mb-1">Step {i + 1}</div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">{item.step}</h4>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </FadeUp>

      {/* Documents Table */}
      <FadeUp>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="FileText" size={16} className="text-white/70" />
              Required Documents Checklist
            </h3>
            <span className="text-xs text-white/50 font-medium bg-white/10 px-3 py-1 rounded-full">{data.visaRequirements.VisaCardData.length} categories</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fafaf8] border-b border-gray-100">
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">#</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Documents Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.visaRequirements.VisaCardData.map((card, idx) => (
                  <motion.tr
                    key={card.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#fafaf8] transition-colors align-top"
                  >
                    <td className="px-6 py-4">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
                          <Icon name={card.icon} size={16} className="text-white" />
                        </div>
                        <span className="font-semibold text-slate-900 text-sm">{card.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="space-y-2">
                        {card.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <Icon name="CheckCircle" size={14} className="text-[#003975] flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeUp>

      {/* Detail Cards */}
      <div>
        <FadeUp>
          <h3 className="text-lg font-semibold text-slate-900 mb-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="FolderOpen" size={16} className="text-white" />
            </div>
            Document Categories Explained
          </h3>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          {data.visaRequirements.VisaCardData.map((card) => (
            <StaggerItem key={card.id}>
              <HoverCard>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                      <Icon name={card.icon} size={18} className="text-white" />
                    </div>
                    <h4 className="text-base font-semibold text-slate-900">{card.title}</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Icon name="CheckCircle" size={14} className="text-[#003975] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Common Visa Mistakes */}
      <FadeUp>
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="AlertTriangle" size={16} className="text-white" />
            </div>
            Common Visa Mistakes to Avoid
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Incomplete Documents", desc: "Missing even one document can lead to delays or rejection. Double-check every requirement." },
              { title: "Late Application", desc: "Applying too close to your course start date leaves no room for processing delays." },
              { title: "Insufficient Funds Proof", desc: "Financial documents must clearly show enough funds for tuition and living expenses." },
              { title: "Inconsistent Information", desc: "Ensure all details match across your application, passport, and supporting documents." },
              { title: "Weak SOP/GTE", desc: "A generic or unconvincing Statement of Purpose can weaken your application." },
              { title: "No Professional Guidance", desc: "Navigating the process alone increases the risk of errors. Seek expert help." },
            ].map((item, i) => (
              <div key={i} className="bg-[#fafaf8] rounded-xl p-5 border border-gray-100">
                <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Tips */}
      <FadeUp>
        <div className="bg-[#fafaf8] rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Lightbulb" size={16} className="text-white" />
            </div>
            Important Visa Tips
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Apply for your visa as soon as you receive your offer letter",
              "Ensure financial documents clearly show sufficient funds for tuition and living",
              "Complete medical examinations at approved health centers only",
              "Keep certified copies of all submitted documents for your records",
              "Prepare a genuine and well-structured Statement of Purpose (GTE/SOP)",
              "Allow extra time for documents that need translation or notarization",
              "Track your application status online and respond promptly to any requests",
              "Contact Nexsus for step-by-step visa application guidance and mock interviews",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LIVING COST — Full Page
   ═══════════════════════════════════════════════════════ */

function LivingCost({ data, country }: { data: CountryDataType; country: string }) {
  const totalMin = data.costData.reduce((a, c) => a + c.minCost, 0);
  const totalMax = data.costData.reduce((a, c) => a + c.maxCost, 0);
  const avgMonthly = Math.round((totalMin + totalMax) / 2);

  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <FadeLeft>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Cost of Living in {data.country}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Understanding your monthly expenses is crucial for budgeting your study abroad experience.
              Below is a detailed breakdown of typical costs for international students in {data.country}, shown in {data.currency}.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Costs can vary significantly depending on your city, lifestyle, and accommodation type. Use these estimates as a starting point and adjust based on your personal preferences.
            </p>
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <p className="text-sm text-white/60 mb-2">Estimated Monthly Total</p>
              <p className="text-3xl font-bold">
                {data.currency} {totalMin} – {totalMax}
              </p>
              <p className="text-xs text-white/40 mt-1">per month (approximate)</p>
            </div>
          </div>
        </FadeLeft>

        <FadeRight>
          <div className="space-y-4">
            {data.costData.map((cost, idx) => (
              <motion.div
                key={cost.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-5 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-900">{cost.category}</span>
                  <span className="text-sm font-bold text-[#003975]">
                    {data.currency} {cost.minCost} – {cost.maxCost}
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-slate-900"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cost.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </FadeRight>
      </div>

      {/* Budget Overview Cards */}
      <FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Monthly Average", value: `${data.currency} ${avgMonthly}`, icon: "DollarSign" },
            { label: "Expense Categories", value: `${data.costData.length}`, icon: "BarChart3" },
            { label: "Annual Estimate", value: `${data.currency} ${totalMin * 12}+`, icon: "Calendar" },
            { label: "Part-time Offset", value: "30–50%", icon: "Briefcase" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon} size={18} className="text-white" />
              </div>
              <p className="text-lg font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </FadeUp>

      {/* Cost Table */}
      <FadeUp>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="Table" size={16} className="text-white/70" />
              Monthly Cost Breakdown ({data.currency})
            </h3>
            <span className="text-xs text-white/50 font-medium bg-white/10 px-3 py-1 rounded-full">{data.costData.length} categories</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fafaf8] border-b border-gray-100">
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">#</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Min ({data.currency})</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Max ({data.currency})</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Budget Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.costData.map((cost, idx) => (
                  <motion.tr
                    key={cost.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#fafaf8] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{cost.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-right">{data.currency} {cost.minCost}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">{data.currency} {cost.maxCost}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-slate-900" style={{ width: `${cost.percentage}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 w-8">{cost.percentage}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#fafaf8] border-t-2 border-gray-200">
                  <td className="px-6 py-4" />
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">Estimated Total</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">{data.currency} {totalMin}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#003975] text-right">{data.currency} {totalMax}</td>
                  <td className="px-6 py-4 text-center text-xs text-slate-500">per month</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </FadeUp>

      {/* Accommodation Types */}
      <FadeUp>
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Home" size={16} className="text-white" />
            </div>
            Accommodation Options
          </h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { type: "University Halls", range: "Mid-range", desc: "On-campus residences with meals, social events, and proximity to classes. Great for first-year students.", icon: "Building" },
              { type: "Shared Rental", range: "Budget-friendly", desc: "Sharing an apartment with other students can cut rent significantly. Popular in most major cities.", icon: "Users" },
              { type: "Private Studio", range: "Premium", desc: "Independent living with full privacy. Higher cost but maximum comfort and flexibility.", icon: "Home" },
            ].map((item, i) => (
              <div key={i} className="bg-[#fafaf8] rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-3">
                  <Icon name={item.icon} size={18} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{item.type}</h4>
                <span className="inline-block text-xs font-semibold text-[#003975] bg-blue-50 px-2 py-0.5 rounded-full mb-2">{item.range}</span>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Tips */}
      <FadeUp>
        <div className="bg-[#fafaf8] rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Lightbulb" size={16} className="text-white" />
            </div>
            Money-Saving Tips
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Share accommodation with other students to significantly reduce rent",
              "Use student discounts for transport, food, and entertainment",
              "Cook at home and buy groceries in bulk for weekly savings",
              "Take advantage of part-time work opportunities during your studies",
              "Use free university resources like libraries, gyms, and career services",
              "Plan your budget monthly and track expenses with free budgeting apps",
              "Buy second-hand textbooks or use digital library resources",
              "Apply for student concession cards for public transport savings",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={12} className="text-white" />
                </div>
                <p className="text-sm text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   WORK & JOBS — Full Page
   ═══════════════════════════════════════════════════════ */

function WorkAndJobs({ data, country }: { data: CountryDataType; country: string }) {
  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <FadeLeft className="lg:col-span-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Work & Career Opportunities in {data.country}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Understanding your work rights and career pathways is key when choosing a study destination. {data.country} offers international students excellent part-time work opportunities during studies and strong post-graduation career prospects.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Many international students supplement their income through part-time work while gaining valuable local experience. After graduation, post-study work visas open doors to full-time career opportunities.
            </p>
          </div>
        </FadeLeft>
        <FadeRight className="lg:col-span-2">
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Work Rights Overview</h4>
            <div className="space-y-3">
              {[
                { label: "During Studies", value: "20 hrs/week (typical)", icon: "Clock" },
                { label: "During Breaks", value: "Full-time allowed", icon: "Calendar" },
                { label: "Post-Study Work", value: "2–4 years (varies)", icon: "Briefcase" },
                { label: "In-demand Fields", value: "IT, Healthcare, Engineering", icon: "TrendingUp" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#003975] flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeRight>
      </div>

      {/* Work Cards */}
      <StaggerContainer className="grid md:grid-cols-3 gap-6">
        {data.workData.map((work, idx) => (
          <StaggerItem key={idx}>
            <HoverCard>
              <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl transition-shadow h-full text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-5">
                  <Icon name={work.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{work.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{work.description}</p>
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Work Details Table */}
      <FadeUp>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="Table" size={16} className="text-white/70" />
              Work Rights & Opportunities Summary
            </h3>
            <span className="text-xs text-white/50 font-medium bg-white/10 px-3 py-1 rounded-full">{data.workData.length} categories</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fafaf8] border-b border-gray-100">
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">#</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.workData.map((work, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#fafaf8] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
                          <Icon name={work.icon} size={16} className="text-white" />
                        </div>
                        <span className="font-semibold text-slate-900 text-sm">{work.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 leading-relaxed">{work.description}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeUp>

      {/* Popular Industries */}
      <FadeUp>
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Briefcase" size={16} className="text-white" />
            </div>
            Popular Industries for International Graduates
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Technology & IT", icon: "Laptop", desc: "Software development, data science, cybersecurity" },
              { name: "Healthcare", icon: "HeartPulse", desc: "Nursing, aged care, allied health roles" },
              { name: "Engineering", icon: "Cog", desc: "Civil, mechanical, and electrical engineering" },
              { name: "Finance & Accounting", icon: "DollarSign", desc: "Banking, auditing, financial analysis" },
              { name: "Hospitality", icon: "Star", desc: "Hotel management, tourism, event planning" },
              { name: "Education", icon: "BookOpen", desc: "Teaching, tutoring, academic research" },
              { name: "Construction & Trades", icon: "Building", desc: "Project management, skilled trades" },
              { name: "Marketing & Media", icon: "Globe", desc: "Digital marketing, content, PR" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-[#fafaf8] rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center mb-2">
                  <Icon name={item.icon} size={16} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">{item.name}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Career Tips */}
      <FadeUp>
        <div className="bg-[#fafaf8] rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="TrendingUp" size={16} className="text-white" />
            </div>
            Career Tips for International Students
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Start networking early through university career fairs and events",
              "Build a strong LinkedIn profile and connect with industry professionals",
              "Use university career services for resume reviews and mock interviews",
              "Consider internships and co-op programs for hands-on experience",
              "Research industries with high demand for international graduates",
              "Tailor your resume and cover letter to local job market expectations",
              "Practice interview skills with cultural awareness of local workplace norms",
              "Contact Nexsus for career guidance and post-study visa pathways",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={12} className="text-white" />
                </div>
                <p className="text-sm text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCHOLARSHIPS — Full Page
   ═══════════════════════════════════════════════════════ */

function Scholarships({ data, country }: { data: CountryDataType; country: string }) {
  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <FadeLeft className="lg:col-span-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Scholarships & Financial Aid for {data.country}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Numerous scholarships are available for international students in {data.country}. Below is a comprehensive list of the most notable funding opportunities, along with eligibility details and deadlines.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Scholarships can cover partial to full tuition fees and sometimes include living allowances. Competition is strong, so starting your application early and presenting a strong academic profile is key.
            </p>
          </div>
        </FadeLeft>
        <FadeRight className="lg:col-span-2">
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Scholarship Snapshot</h4>
            <div className="space-y-3">
              {[
                { label: "Available Scholarships", value: `${data.scholarshipData.length}+ programs`, icon: "Award" },
                { label: "Coverage Range", value: "10% – 100% tuition", icon: "Percent" },
                { label: "Application Window", value: "6–12 months before intake", icon: "Calendar" },
                { label: "Nexsus Assistance", value: "Free scholarship matching", icon: "Search" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#003975] flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeRight>
      </div>

      {/* Scholarship Application Process */}
      <FadeUp>
        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
            <Icon name="Compass" size={16} className="text-white" />
          </div>
          Scholarship Application Process
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { step: "Research & Match", desc: "Identify scholarships that align with your academic profile and goals", icon: "Search" },
            { step: "Prepare Materials", desc: "Draft your personal statement, gather transcripts, and request recommendations", icon: "FileText" },
            { step: "Submit on Time", desc: "Lodge applications before deadlines — early submissions are often prioritized", icon: "Send" },
            { step: "Track & Follow Up", desc: "Monitor your application status and respond promptly to any requests", icon: "CheckCircle" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-3">
                <Icon name={item.icon} size={18} className="text-white" />
              </div>
              <div className="text-xs text-[#003975] font-bold mb-1">Step {i + 1}</div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">{item.step}</h4>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </FadeUp>

      {/* Scholarships Table */}
      <FadeUp>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Icon name="Table" size={16} className="text-white/70" />
              Available Scholarships
            </h3>
            <span className="text-xs text-white/50 font-medium bg-white/10 px-3 py-1 rounded-full">{data.scholarshipData.length} scholarships</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fafaf8] border-b border-gray-100">
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">#</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Scholarship Name</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Award Amount</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Eligibility</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.scholarshipData.map((sch, idx) => (
                  <motion.tr
                    key={sch.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#fafaf8] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900 text-sm">{sch.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[#003975]">{sch.amount}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{sch.eligibility}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                        <Icon name="Calendar" size={12} className="text-[#003975]" />
                        {sch.deadline}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeUp>

      {/* Scholarship Detail Cards */}
      <div>
        <FadeUp>
          <h3 className="text-lg font-semibold text-slate-900 mb-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Award" size={16} className="text-white" />
            </div>
            Scholarship Details
          </h3>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {data.scholarshipData.map((sch) => (
            <StaggerItem key={sch.id}>
              <HoverCard>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
                    <Icon name="Trophy" size={20} className="text-white" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-4">{sch.name}</h4>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2.5 text-sm">
                      <Icon name="DollarSign" size={14} className="text-[#003975]" />
                      <span className="text-slate-600">{sch.amount}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm">
                      <Icon name="User" size={14} className="text-[#003975]" />
                      <span className="text-slate-600">{sch.eligibility}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm">
                      <Icon name="Calendar" size={14} className="text-[#003975]" />
                      <span className="text-slate-600">Deadline: {sch.deadline}</span>
                    </div>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Scholarship Types */}
      <FadeUp>
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="BookOpen" size={16} className="text-white" />
            </div>
            Types of Scholarships Available
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { type: "Merit-Based", desc: "Awarded based on academic achievement, test scores, and leadership qualities. Typically covers 25–100% of tuition.", icon: "Award" },
              { type: "Need-Based", desc: "Designed for students who demonstrate financial need. May cover tuition, living costs, or both.", icon: "DollarSign" },
              { type: "Country-Specific", desc: "Government or institution scholarships targeting students from specific countries or regions.", icon: "Globe" },
              { type: "Research Scholarships", desc: "Funded positions for postgraduate students engaged in university research projects.", icon: "Search" },
              { type: "Sports & Talent", desc: "Scholarships for students with exceptional athletic or artistic abilities.", icon: "Star" },
              { type: "University Grants", desc: "Internal funding offered by specific universities to attract international talent.", icon: "Building" },
            ].map((item, i) => (
              <div key={i} className="bg-[#fafaf8] rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-3">
                  <Icon name={item.icon} size={18} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{item.type}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Tips */}
      <FadeUp>
        <div className="bg-[#fafaf8] rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Lightbulb" size={16} className="text-white" />
            </div>
            Scholarship Application Tips
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Apply early — most scholarships have limited spots and strict deadlines",
              "Prepare a compelling personal statement highlighting achievements and goals",
              "Check university-specific scholarships in addition to national programs",
              "Maintain strong academic records throughout your current studies",
              "Gather strong recommendation letters from academic or professional referees",
              "Apply to multiple scholarships to maximize your chances of funding",
              "Highlight community service, leadership, and extracurricular activities",
              "Contact Nexsus for help identifying scholarships you may be eligible for",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={12} className="text-white" />
                </div>
                <p className="text-sm text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CULTURE — Full Page
   ═══════════════════════════════════════════════════════ */

function Culture({ data, country }: { data: CountryDataType; country: string }) {
  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <FadeLeft className="lg:col-span-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Culture & Student Life in {data.country}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Understanding the culture, traditions, and daily life in {data.country} will help you adjust more quickly and make the most of your study experience. Here is what you can expect.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              From vibrant campus life to local festivals and traditions, studying in {data.country} offers a rich cultural immersion that goes far beyond the classroom. Embrace the diversity and make lifelong memories.
            </p>
          </div>
        </FadeLeft>
        <FadeRight className="lg:col-span-2">
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Student Life Highlights</h4>
            <div className="space-y-3">
              {[
                { label: "Campus Community", value: "Diverse & welcoming", icon: "Users" },
                { label: "Student Clubs", value: "100+ clubs at most unis", icon: "Star" },
                { label: "Cultural Events", value: "Year-round festivals", icon: "Calendar" },
                { label: "Support Services", value: "Counseling & mentoring", icon: "HeartPulse" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#003975] flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeRight>
      </div>

      {/* Culture Cards */}
      <StaggerContainer className="grid sm:grid-cols-2 gap-6">
        {data.cultureData.map((item) => (
          <StaggerItem key={item.id}>
            <HoverCard>
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group h-full flex flex-col">
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <Icon name="Image" size={40} className="text-slate-300" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Student Life Experience */}
      <FadeUp>
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Globe" size={16} className="text-white" />
            </div>
            What Student Life Looks Like
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Campus Activities", desc: "Join sports teams, debate clubs, cultural societies, and volunteer groups. Most universities have 100+ active student organizations.", icon: "Users" },
              { title: "Food & Dining", desc: "Experience diverse cuisines from campus cafeterias to neighborhood restaurants. Many cities have vibrant food scenes with options for every budget.", icon: "Star" },
              { title: "Public Transport", desc: "Most student cities have excellent public transit. Student concession cards make daily commutes affordable and convenient.", icon: "MapPin" },
              { title: "Safety & Wellbeing", desc: "Universities provide 24/7 security, mental health services, and emergency support. International student offices help with any concerns.", icon: "ShieldCheck" },
              { title: "Social Life", desc: "From orientation week events to weekend trips, there is always something happening. Making international friends is one of the best parts of studying abroad.", icon: "MessageCircle" },
              { title: "Part-time Work", desc: "Balance studies with part-time work at campus jobs, retail, or hospitality. Many students gain valuable local experience while earning.", icon: "Briefcase" },
            ].map((item, i) => (
              <div key={i} className="bg-[#fafaf8] rounded-xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-3">
                  <Icon name={item.icon} size={18} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Testimonials */}
      {data.testimonials.length > 0 && (
        <div>
          <FadeUp>
            <h3 className="text-lg font-semibold text-slate-900 mb-8 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <Icon name="MessageCircle" size={16} className="text-white" />
              </div>
              What Students Say About Life in {data.country}
            </h3>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {data.testimonials.map((t, idx) => (
              <StaggerItem key={idx}>
                <ClipReveal>
                  <div className="bg-[#fafaf8] rounded-2xl p-7 border border-gray-100 h-full flex flex-col">
                    <div className="mb-4">
                      <svg className="w-7 h-7 text-[#003975]/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                      </svg>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic flex-1 mb-5">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-bold">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                        <p className="text-xs text-slate-400">{t.degree} — {t.university}</p>
                      </div>
                    </div>
                  </div>
                </ClipReveal>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}

      {/* What to Expect */}
      <FadeUp>
        <div className="bg-[#fafaf8] rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Icon name="Lightbulb" size={16} className="text-white" />
            </div>
            Tips for Adjusting to Life in {data.country}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Be open-minded and respectful of local customs and traditions",
              "Join student clubs and university societies to build friendships",
              "Explore beyond your campus — visit local markets, parks, and cultural events",
              "Try local cuisine and cooking for a richer cultural experience",
              "Stay connected with family and friends back home for emotional support",
              "Use university support services if you need help adjusting",
              "Learn a few basic phrases in the local language — locals appreciate the effort",
              "Attend orientation programs — they are designed to help you settle in quickly",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={12} className="text-white" />
                </div>
                <p className="text-sm text-slate-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

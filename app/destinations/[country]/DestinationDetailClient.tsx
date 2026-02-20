"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { countryDataMap } from "@/data";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  ClipReveal,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  TextReveal,
  Parallax,
  Float,
  AnimatedBlob,
  HoverCard,
  ScrollProgress,
} from "@/lib/animations";
import { FlagIcon, Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

/* ─── Sub-pages data ──────────────────────────────── */

const subPages = [
  { title: "Why Study Here", slug: "why-study-here", icon: "Lightbulb", description: "Discover the top reasons to pursue your education here" },
  { title: "Universities", slug: "universities", icon: "GraduationCap", description: "Explore top-ranked universities and their programs" },
  { title: "Admission", slug: "admission", icon: "ClipboardList", description: "Requirements for undergraduate, postgraduate, and doctoral" },
  { title: "Student Visa", slug: "student-visa", icon: "ShieldCheck", description: "Visa requirements, processing times, and documents needed" },
  { title: "Living Cost", slug: "living-cost", icon: "DollarSign", description: "Monthly costs for accommodation, food, transport, and more" },
  { title: "Work & Jobs", slug: "work-and-jobs", icon: "Briefcase", description: "Part-time work rights and post-study career opportunities" },
  { title: "Scholarships", slug: "scholarships", icon: "Trophy", description: "Funding opportunities, grants, and financial aid options" },
  { title: "Culture", slug: "culture", icon: "Globe", description: "Lifestyle, traditions, and what to expect as a student" },
];

/* ─── Helper: parse stat value for counter ─────────── */
function parseStatNum(value: string): { num: number; suffix: string; prefix: string } | null {
  const m = value.match(/^(\d+)/);
  if (!m) return null;
  const num = parseInt(m[1], 10);
  const suffix = value.slice(m[0].length);
  return { num, suffix, prefix: "" };
}

/* ─── Component ───────────────────────────────────── */

export default function DestinationDetailClient() {
  const params = useParams();
  const country = params.country as string;
  const data = countryDataMap[country];
  const { setShowSidebar } = useHeader();
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("Undergraduate");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  useEffect(() => {
    if (!data) return;
    const timer = setInterval(() => {
      setCurrentImage((p) => (p + 1) % data.carouselData.CountryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data]);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Destination Not Found</h1>
          <p className="text-slate-500 mb-6">The destination you are looking for does not exist.</p>
          <Link href="/destinations" className="text-[#003975] font-medium hover:underline">
            View all destinations
          </Link>
        </div>
      </main>
    );
  }

  const admissionTabs = Object.keys(data.admissionRequirementsData);

  return (
    <main className="min-h-screen">
      <ScrollProgress />

      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} className="relative h-[90vh] min-h-[650px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          {data.carouselData.CountryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: idx === currentImage ? 1 : 0, scale: idx === currentImage ? 1 : 1.1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image src={img.url} alt={img.location} fill className="object-cover" priority={idx === 0} />
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* Animated decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#003975]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-40 left-10 w-56 h-56 bg-[#00ab18]/15 rounded-full blur-[100px] pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <FlagIcon code={data.flagCode} size={22} />
                </div>
                <span className="text-white/70 text-sm font-medium tracking-wide uppercase">Study Abroad</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
                <TextReveal text={`Study in ${data.country}`} delay={0.2} />
              </h1>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="text-lg md:text-xl text-white/75 max-w-2xl mb-10 leading-relaxed">
                {data.carouselData.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.35}>
              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow text-sm"
                  >
                    Get Free Counseling <Icon name="ArrowRight" size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={`/destinations/${country}/why-study-here`}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium border border-white/25 hover:bg-white/20 transition text-sm"
                  >
                    Why {data.country}? <Icon name="ChevronRight" size={16} />
                  </Link>
                </motion.div>
              </div>
            </FadeUp>
          </div>

          {/* Image locations indicator */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <Icon name="MapPin" size={14} className="text-white/60" />
            <span className="text-white/70 text-xs font-medium">{data.carouselData.CountryImages[currentImage]?.location}</span>
            <div className="flex gap-1.5 ml-2">
              {data.carouselData.CountryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImage ? "bg-white w-6" : "bg-white/30 w-1.5"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ KEY STATISTICS ═══════════ */}
      <section className="relative -mt-20 z-10 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {data.highlightedData.statistics.map((stat, idx) => {
                const parsed = parseStatNum(stat.value);
                return (
                  <FadeUp key={stat.id} delay={idx * 0.1}>
                    <motion.div
                      whileHover={{ backgroundColor: "#f8fafc" }}
                      className="relative p-7 md:p-8 text-center transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Icon name={["Award", "FileText", "BookOpen", "Microscope"][idx] || "Star"} size={18} className="text-white" />
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
                        {parsed ? (
                          <AnimatedCounter value={parsed.num} suffix={parsed.suffix} prefix={parsed.prefix} />
                        ) : (
                          stat.value
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                    </motion.div>
                  </FadeUp>
                );
              })}
            </div>
            <div className="border-t border-gray-100 px-8 py-6 bg-[#fafaf8]">
              <FadeUp>
                <p className="text-base text-slate-600 text-center max-w-3xl mx-auto leading-relaxed">
                  {data.highlightedData.description}
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPLORE SECTIONS (Sub-page cards) ═══════════ */}
      <section className="py-20 px-6 bg-[#fafaf8] relative overflow-hidden">
        <AnimatedBlob className="absolute -top-32 -right-32 w-96 h-96" color="blue" />
        <AnimatedBlob className="absolute -bottom-32 -left-32 w-80 h-80" color="green" />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-slate-500 text-xs font-semibold border border-gray-200 mb-5">
                <Icon name="Compass" size={14} className="text-[#003975]" /> Quick Navigation
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                Everything About {data.country}
              </h2>
              <p className="text-base text-slate-500 max-w-xl mx-auto">
                Dive deep into every aspect of studying in {data.country} — from admissions to culture
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {subPages.map((page) => (
              <StaggerItem key={page.slug}>
                <HoverCard>
                  <Link href={`/destinations/${country}/${page.slug}`} className="block h-full group">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <Icon name={page.icon} size={22} className="text-white" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 mb-2">{page.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1">{page.description}</p>
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-sm font-medium text-[#003975] group-hover:gap-3 transition-all">
                        Explore <Icon name="ArrowRight" size={14} />
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════ WHY STUDY HERE ═══════════ */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeLeft>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold mb-5">
                  <Icon name="Sparkles" size={14} className="text-[#003975]" /> Why Choose {data.country}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  Top Reasons to Study in {data.country}
                </h2>
                <div className="space-y-4">
                  {data.whyData.slice(0, 6).map((reason, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <span className="text-xs font-bold text-white">{idx + 1}</span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed pt-1">{reason}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={`/destinations/${country}/why-study-here`}
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg"
                    >
                      Learn More <Icon name="ArrowRight" size={14} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </FadeLeft>

            <FadeRight>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={data.carouselData.CountryImages[0]?.url || "/destinations/Australia.png"}
                    alt={data.country}
                    width={600}
                    height={500}
                    className="object-cover w-full h-[400px]"
                  />
                </div>
                {/* Floating stat card */}
                <Float duration={4} distance={10}>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 max-w-[200px]">
                    <div className="text-3xl font-bold text-[#003975] mb-1">
                      <AnimatedCounter value={data.universities.length} suffix="+" />
                    </div>
                    <p className="text-xs text-slate-500">Partner Universities</p>
                  </div>
                </Float>
                <Float duration={5} distance={8}>
                  <div className="absolute -top-4 -right-4 bg-slate-900 text-white rounded-2xl shadow-xl p-4">
                    <Icon name="GraduationCap" size={28} />
                  </div>
                </Float>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ═══════════ TOP UNIVERSITIES ═══════════ */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-slate-500 text-xs font-semibold border border-gray-200 mb-4">
                  <Icon name="Award" size={14} className="text-[#003975]" /> Rankings
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Top Universities in {data.country}
                </h2>
              </div>
              <Link
                href={`/destinations/${country}/universities`}
                className="inline-flex items-center gap-2 text-[#003975] font-semibold text-sm hover:gap-3 transition-all"
              >
                View All Universities <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.universities.slice(0, 6).map((uni, idx) => (
              <StaggerItem key={uni.id}>
                <HoverCard>
                  <motion.div
                    className="bg-white rounded-2xl p-6 border border-gray-100 h-full flex flex-col hover:shadow-lg transition-shadow"
                  >
                    {/* Rank badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">#{uni.ranking.position}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{uni.ranking.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Icon name="MapPin" size={12} />
                        {uni.location.city}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{uni.name}</h3>
                    <p className="text-sm text-slate-500 flex-1 mb-4">{uni.scholarship.description}</p>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                        <Icon name="Percent" size={12} />
                        Up to {uni.scholarship.percentage}% scholarship
                      </span>
                    </div>
                  </motion.div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════ ADMISSION REQUIREMENTS ═══════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold mb-5">
                <Icon name="ClipboardList" size={14} className="text-[#003975]" /> Admissions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Admission Requirements
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                What you need to apply for different education levels in {data.country}
              </p>
            </div>
          </FadeUp>

          {/* Tabs */}
          <FadeUp delay={0.1}>
            <div className="flex justify-center gap-2 mb-10">
              {admissionTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Requirements list */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#fafaf8] rounded-3xl p-8 md:p-10 border border-gray-100"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {data.admissionRequirementsData[activeTab]?.map((req, idx) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{req.text}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href={`/destinations/${country}/admission`}
                className="inline-flex items-center gap-2 text-[#003975] font-semibold text-sm hover:gap-3 transition-all"
              >
                Full Admission Guide <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ VISA & DOCUMENTS ═══════════ */}
      <section className="py-24 px-6 bg-[#fafaf8] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#003975]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold mb-5">
                <Icon name="ShieldCheck" size={14} className="text-[#003975]" /> Visa Guide
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Student Visa Requirements
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Processing time: <span className="font-semibold text-slate-700">{data.visaRequirements.processingtime}</span>
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.visaRequirements.VisaCardData.slice(0, 6).map((card) => (
              <StaggerItem key={card.id}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full hover:shadow-lg transition-shadow">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
                      <Icon name={card.icon} size={20} className="text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-3">{card.title}</h3>
                    <ul className="space-y-2">
                      {card.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#003975] mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.2}>
            <div className="text-center mt-10">
              <Link
                href={`/destinations/${country}/student-visa`}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                Complete Visa Guide <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ COST OF LIVING ═══════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeLeft>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold mb-5">
                  <Icon name="DollarSign" size={14} className="text-[#003975]" /> Living Costs
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                  Monthly Cost of Living
                </h2>
                <p className="text-slate-500 mb-8">
                  Estimated monthly expenses in {data.currency} for international students
                </p>
                <Link
                  href={`/destinations/${country}/living-cost`}
                  className="inline-flex items-center gap-2 text-[#003975] font-semibold text-sm hover:gap-3 transition-all"
                >
                  View Full Breakdown <Icon name="ArrowRight" size={14} />
                </Link>
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
                    className="bg-[#fafaf8] rounded-2xl p-5 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-slate-700">{cost.category}</span>
                      <span className="text-sm font-bold text-[#003975]">
                        {data.currency} {cost.minCost} – {cost.maxCost}/mo
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
        </div>
      </section>

      {/* ═══════════ WORK & CAREER ═══════════ */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold mb-5">
                <Icon name="Briefcase" size={14} className="text-[#003975]" /> Career
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Work & Career Opportunities
              </h2>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {data.workData.map((work, idx) => (
              <StaggerItem key={idx}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-7 border border-gray-100 h-full hover:shadow-xl transition-shadow text-center">
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

          <FadeUp delay={0.2}>
            <div className="text-center mt-10">
              <Link
                href={`/destinations/${country}/work-and-jobs`}
                className="inline-flex items-center gap-2 text-[#003975] font-semibold text-sm hover:gap-3 transition-all"
              >
                Explore Work Opportunities <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ SCHOLARSHIPS ═══════════ */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#003975]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold mb-5">
                <Icon name="Trophy" size={14} className="text-[#003975]" /> Funding
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Scholarship Opportunities
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Financial aid and scholarships available for international students
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {data.scholarshipData.map((sch) => (
              <StaggerItem key={sch.id}>
                <HoverCard>
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 h-full flex flex-col hover:shadow-xl transition-shadow">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
                      <Icon name="Award" size={20} className="text-white" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-3">{sch.name}</h3>
                    <div className="space-y-2 flex-1 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="DollarSign" size={14} className="text-emerald-500" />
                        <span className="text-slate-600">{sch.amount}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="User" size={14} className="text-blue-500" />
                        <span className="text-slate-600">{sch.eligibility}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Calendar" size={14} className="text-orange-500" />
                        <span className="text-slate-600">Deadline: {sch.deadline}</span>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.2}>
            <div className="text-center mt-10">
              <Link
                href={`/destinations/${country}/scholarships`}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                View All Scholarships <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ CULTURE ═══════════ */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold mb-5">
                <Icon name="Globe" size={14} className="text-[#003975]" /> Life & Culture
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Life in {data.country}
              </h2>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.cultureData.map((item) => (
              <StaggerItem key={item.id}>
                <HoverCard>
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 h-full hover:shadow-xl transition-shadow group">
                    <div className="relative h-40 overflow-hidden bg-slate-100">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                          <Icon name="Image" size={32} className="text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.2}>
            <div className="text-center mt-10">
              <Link
                href={`/destinations/${country}/culture`}
                className="inline-flex items-center gap-2 text-[#003975] font-semibold text-sm hover:gap-3 transition-all"
              >
                Explore Culture & Lifestyle <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      {data.testimonials.length > 0 && (
        <section className="py-24 px-6 bg-white relative overflow-hidden">
          <AnimatedBlob className="absolute -top-20 -left-20 w-72 h-72" color="purple" />

          <div className="max-w-6xl mx-auto relative z-10">
            <FadeUp>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold mb-5">
                  <Icon name="MessageCircle" size={14} className="text-[#003975]" /> Success Stories
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  What Our Students Say
                </h2>
              </div>
            </FadeUp>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {data.testimonials.map((t, idx) => (
                <StaggerItem key={idx}>
                  <ClipReveal>
                    <div className="bg-[#fafaf8] rounded-2xl p-7 border border-gray-100 h-full flex flex-col">
                      <div className="mb-5">
                        <svg className="w-8 h-8 text-[#003975]/20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                        </svg>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed italic flex-1 mb-6">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
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
        </section>
      )}

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative py-28 px-6 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.carouselData.CountryImages[0]?.url || "/destinations/Australia.png"}
            alt={data.country}
            fill
            className="object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#003975]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-[#00ab18]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeUp>
            <Float duration={5} distance={6}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-8 border border-white/10">
                <FlagIcon code={data.flagCode} size={32} />
              </div>
            </Float>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Study in {data.country}?
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-blue-100/80 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
              Get personalized guidance from our expert counselors. We&apos;ll help you choose the right university, prepare your application, and secure your visa.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold shadow-xl text-sm">
                  Book Free Consultation <Icon name="ArrowRight" size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/destinations"
                  className="inline-flex items-center justify-center gap-2 text-white border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition text-sm"
                >
                  Other Destinations
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

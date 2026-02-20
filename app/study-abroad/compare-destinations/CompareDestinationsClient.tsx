"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  AnimatedCounter,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect, useState, useMemo } from "react";
import { Icon, FlagIcon } from "@/lib/icons";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

interface Country {
  name: string;
  flag: string;
  slug: string;
  description: string;
  tagline: string;
  qsRanking: string;
  topUnis: string;
  totalInternational: string;
  tuitionRange: string;
  livingCost: string;
  postStudyVisa: string;
  workRights: string;
  prPathway: string;
  scores: {
    education: number;
    affordability: number;
    employability: number;
    quality: number;
    safety: number;
    diversity: number;
  };
  reasonsToStudy: string[];
  topPrograms: string[];
  funFact: string;
  latestNews: {
    title: string;
    date: string;
    summary: string;
  };
}

const countries: Country[] = [
  {
    name: "Australia",
    flag: "au",
    slug: "study-in-australia",
    tagline: "World-class education meets unmatched lifestyle",
    description:
      "Australia is home to 7 of the world\u2019s top 100 universities and offers a vibrant multicultural environment with stunning natural beauty. The country\u2019s strong post-study work rights and pathway to permanent residency make it a top choice for Nepali students seeking long-term career growth.",
    qsRanking: "7 in Top 100",
    topUnis: "University of Melbourne, University of Sydney, ANU, UNSW, Monash",
    totalInternational: "750,000+",
    tuitionRange: "AUD 20,000 \u2013 45,000/yr",
    livingCost: "AUD 21,041/yr (govt. requirement)",
    postStudyVisa: "2\u20134 years (subclass 485)",
    workRights: "Unlimited hours during term (as of 2024 reforms)",
    prPathway: "Strong \u2014 skilled migration & state nomination",
    scores: { education: 95, affordability: 60, employability: 92, quality: 94, safety: 90, diversity: 93 },
    reasonsToStudy: [
      "7 universities in QS World Top 100 \u2014 globally respected degrees",
      "Post-study work visa up to 4 years for master\u2019s graduates in key fields",
      "Unlimited work hours for students (reformed 2024 policy)",
      "Clear pathway to permanent residency through skilled migration",
      "NPR 5 Billion+ in scholarships secured by Nexsus students",
      "World\u2019s 3rd most popular destination for international students",
    ],
    topPrograms: ["Information Technology", "Nursing & Health Sciences", "Engineering", "Business & Accounting", "Data Science"],
    funFact: "Australia has more kangaroos than people \u2014 50 million kangaroos vs 26 million humans!",
    latestNews: {
      title: "Australia Extends Post-Study Work Rights for Key Fields",
      date: "Feb 2026",
      summary:
        "The Australian government has announced extended post-study work visa durations (up to 6 years) for graduates in critical skills areas including cybersecurity, AI, healthcare, and engineering, effective from July 2026.",
    },
  },
  {
    name: "United Kingdom",
    flag: "gb",
    slug: "study-in-uk",
    tagline: "Centuries of academic excellence in every degree",
    description:
      "The UK is home to 4 of the world\u2019s top 10 universities including Oxford and Cambridge. With shorter degree programs (3 years for undergraduate, 1 year for master\u2019s), students save significant time and money while earning globally prestigious qualifications.",
    qsRanking: "4 in Top 10",
    topUnis: "University of Oxford, University of Cambridge, Imperial College, UCL, Edinburgh",
    totalInternational: "680,000+",
    tuitionRange: "\u00a312,000 \u2013 \u00a338,000/yr",
    livingCost: "\u00a312,000 \u2013 \u00a315,000/yr (outside London)",
    postStudyVisa: "2 years (Graduate Route), 3 years for PhD",
    workRights: "20 hrs/week during term, full-time during breaks",
    prPathway: "Moderate \u2014 Skilled Worker visa route",
    scores: { education: 98, affordability: 55, employability: 88, quality: 90, safety: 86, diversity: 91 },
    reasonsToStudy: [
      "4 universities in the world\u2019s Top 10 \u2014 Oxford, Cambridge, Imperial, UCL",
      "Shorter programs save 1\u20132 years vs other countries (1-yr master\u2019s)",
      "2-year post-study Graduate Route visa for all graduates",
      "English-speaking country with deep cultural and historical heritage",
      "Strong alumni networks across global industries",
      "Chevening, Commonwealth & university-specific scholarships available",
    ],
    topPrograms: ["Business & Finance", "Law", "Medicine", "Computer Science", "International Relations"],
    funFact: "The University of Oxford is older than the Aztec Empire \u2014 teaching began there in 1096!",
    latestNews: {
      title: "UK Launches Global Talent Visa Fast-Track for STEM Graduates",
      date: "Jan 2026",
      summary:
        "The UK Home Office announced a fast-track Global Talent visa pathway for international STEM graduates from top-ranked universities, reducing processing time to 2 weeks and removing sponsorship requirements.",
    },
  },
  {
    name: "Canada",
    flag: "ca",
    slug: "study-in-canada",
    tagline: "Affordable education with the best immigration pathway",
    description:
      "Canada consistently ranks as the world\u2019s most welcoming country for immigrants and offers one of the strongest pathways from student visa to permanent residency. With affordable tuition, safe cities, and a booming tech sector, it\u2019s the #1 destination for Nepali students seeking to build a future abroad.",
    qsRanking: "3 in Top 50",
    topUnis: "University of Toronto, McGill, UBC, University of Waterloo, University of Alberta",
    totalInternational: "900,000+",
    tuitionRange: "CAD 15,000 \u2013 35,000/yr",
    livingCost: "CAD 10,000 \u2013 15,000/yr",
    postStudyVisa: "Up to 3 years (PGWP)",
    workRights: "20 hrs/week during term (temporarily unlimited until 2025)",
    prPathway: "Excellent \u2014 Express Entry & Provincial Nominee Programs",
    scores: { education: 88, affordability: 74, employability: 86, quality: 96, safety: 94, diversity: 97 },
    reasonsToStudy: [
      "World\u2019s best study-to-PR pathway through Express Entry system",
      "Post-Graduation Work Permit (PGWP) up to 3 years",
      "More affordable than Australia, UK & USA for most programs",
      "Ranked #1 for quality of life (UN Human Development Index)",
      "Booming tech industry \u2014 Toronto, Vancouver, Montreal are tech hubs",
      "Multicultural society with largest Nepali diaspora community",
    ],
    topPrograms: ["Computer Science", "Business Analytics", "Engineering", "Hospitality", "Healthcare Administration"],
    funFact: "Canada has more lakes than all other countries combined \u2014 over 60% of the world\u2019s lakes are in Canada!",
    latestNews: {
      title: "Canada Introduces Category-Based Express Entry for Tech Workers",
      date: "Feb 2026",
      summary:
        "Immigration, Refugees and Citizenship Canada (IRCC) has expanded category-based Express Entry draws specifically targeting tech professionals, healthcare workers, and tradespeople with lower CRS score requirements.",
    },
  },
  {
    name: "United States",
    flag: "us",
    slug: "study-in-usa",
    tagline: "Home to the world\u2019s most innovative universities",
    description:
      "The United States dominates global university rankings with MIT, Stanford, Harvard, and Caltech leading innovation and research. For students seeking access to cutting-edge technology, groundbreaking research, and the world\u2019s largest economy, the US offers unparalleled opportunities.",
    qsRanking: "5 in Top 10",
    topUnis: "MIT, Stanford, Harvard, Caltech, University of Chicago",
    totalInternational: "1,100,000+",
    tuitionRange: "USD 25,000 \u2013 55,000/yr",
    livingCost: "USD 15,000 \u2013 25,000/yr",
    postStudyVisa: "OPT 1 year (3 years for STEM)",
    workRights: "On-campus 20 hrs/week, CPT for internships",
    prPathway: "Challenging \u2014 H-1B lottery, EB-2/EB-3 green card",
    scores: { education: 99, affordability: 38, employability: 95, quality: 85, safety: 75, diversity: 90 },
    reasonsToStudy: [
      "5 of the world\u2019s Top 10 universities \u2014 MIT, Stanford, Harvard, Caltech, Chicago",
      "STEM OPT allows 3 years of post-study work (highest earning potential globally)",
      "Access to Silicon Valley, Wall Street & world\u2019s largest startup ecosystem",
      "Generous university scholarships and teaching assistantships",
      "Unmatched research output and innovation infrastructure",
      "Degrees recognized as gold standard worldwide",
    ],
    topPrograms: ["Computer Science & AI", "MBA & Finance", "Engineering", "Biomedical Sciences", "Economics"],
    funFact: "More Nobel Prize winners graduated from US universities than from all other countries combined!",
    latestNews: {
      title: "US Expands STEM OPT Eligible Fields for 2026",
      date: "Jan 2026",
      summary:
        "The Department of Homeland Security added 22 new fields to the STEM OPT eligible degree programs list, including data visualization, climate science, and health informatics, giving more graduates access to 3-year work authorization.",
    },
  },
  {
    name: "New Zealand",
    flag: "nz",
    slug: "study-in-new-zealand",
    tagline: "Peaceful, green & globally connected education",
    description:
      "New Zealand offers an exceptional quality of life, a safe and welcoming environment, and high-quality education modeled on the British system. With lower costs than Australia and strong post-study work options, it\u2019s an excellent choice for students who value work-life balance.",
    qsRanking: "2 in Top 200",
    topUnis: "University of Auckland, University of Otago, Victoria University of Wellington",
    totalInternational: "70,000+",
    tuitionRange: "NZD 22,000 \u2013 35,000/yr",
    livingCost: "NZD 15,000 \u2013 20,000/yr",
    postStudyVisa: "1\u20133 years (Post-Study Work Visa)",
    workRights: "20 hrs/week during term, full-time during breaks",
    prPathway: "Good \u2014 Skilled Migrant Category & regional incentives",
    scores: { education: 78, affordability: 72, employability: 76, quality: 97, safety: 96, diversity: 80 },
    reasonsToStudy: [
      "Ranked #1 globally for personal safety and peacefulness",
      "All 8 universities are ranked in global top 500",
      "Post-study work visa up to 3 years",
      "Lower competition for jobs compared to larger countries",
      "Stunning natural environment \u2014 mountains, beaches, forests",
      "Strong agricultural, environmental science & tourism programs",
    ],
    topPrograms: ["Environmental Science", "Agriculture", "Tourism & Hospitality", "Nursing", "Marine Biology"],
    funFact: "New Zealand was the first country to give women the right to vote in 1893!",
    latestNews: {
      title: "New Zealand Simplifies Student Visa Process for 2026",
      date: "Dec 2025",
      summary:
        "Immigration New Zealand launched a streamlined digital visa application system reducing processing times to 15 days and introduced the Green List pathway giving graduates in shortage occupations direct residency eligibility.",
    },
  },
  {
    name: "Japan",
    flag: "jp",
    slug: "study-in-japan",
    tagline: "Technology meets tradition in Asia\u2019s education powerhouse",
    description:
      "Japan combines cutting-edge technology with rich cultural heritage, offering affordable, world-class education. With the government\u2019s ambitious plan to attract 400,000 international students by 2033 and rapidly expanding English-taught programs, Japan is emerging as one of Asia\u2019s top study destinations.",
    qsRanking: "5 in Top 100",
    topUnis: "University of Tokyo, Kyoto University, Osaka University, Tokyo Institute of Technology",
    totalInternational: "300,000+",
    tuitionRange: "JPY 535,800 \u2013 1,500,000/yr (USD 4K\u201310K)",
    livingCost: "JPY 80,000 \u2013 120,000/month",
    postStudyVisa: "Designated Activities Visa (job-hunting, 6\u201312 months)",
    workRights: "28 hrs/week during term",
    prPathway: "Moderate \u2014 Highly Skilled Professional visa (points-based)",
    scores: { education: 88, affordability: 85, employability: 78, quality: 92, safety: 98, diversity: 60 },
    reasonsToStudy: [
      "Extremely affordable \u2014 tuition as low as USD 4,000/yr at national universities",
      "MEXT Scholarship fully covers tuition + living expenses for selected students",
      "5 universities in QS Top 100 with world-leading research in robotics & AI",
      "Safest country in the world for international students",
      "Expanding English-taught programs (over 800 programs available)",
      "Japan\u2019s tech industry offers excellent career opportunities post-graduation",
    ],
    topPrograms: ["Robotics & AI", "Mechanical Engineering", "Japanese Studies", "Automotive Engineering", "Biotechnology"],
    funFact: "Japan has the world\u2019s most punctual trains \u2014 the average delay is just 18 seconds!",
    latestNews: {
      title: "Japan Doubles MEXT Scholarship Slots for South Asian Students",
      date: "Jan 2026",
      summary:
        "The Japanese Ministry of Education (MEXT) announced a 100% increase in scholarship allocations for South Asian countries including Nepal, offering full tuition waivers, monthly stipends of \u00a5143,000, and travel allowances.",
    },
  },
  {
    name: "South Korea",
    flag: "kr",
    slug: "study-in-south-korea",
    tagline: "K-innovation: where culture and technology converge",
    description:
      "South Korea has rapidly become a top destination for international students, driven by world-class universities, globally influential culture (K-wave), and a thriving tech economy led by Samsung, LG, and Hyundai. With generous government scholarships and affordable living, it offers exceptional value.",
    qsRanking: "6 in Top 100",
    topUnis: "Seoul National University, KAIST, Yonsei University, Korea University, POSTECH",
    totalInternational: "200,000+",
    tuitionRange: "KRW 2M \u2013 8M/semester (USD 1,500\u20136,000)",
    livingCost: "KRW 800,000 \u2013 1,200,000/month",
    postStudyVisa: "D-10 Job-seeking visa (up to 2 years)",
    workRights: "20 hrs/week during term (language level dependent)",
    prPathway: "Moderate \u2014 F-2 Points-based visa",
    scores: { education: 84, affordability: 82, employability: 80, quality: 88, safety: 92, diversity: 65 },
    reasonsToStudy: [
      "Extremely affordable \u2014 tuition as low as USD 1,500/semester at national universities",
      "Korean Government Scholarship Program (KGSP/GKS) covers full tuition + stipend",
      "6 universities in QS Top 100 \u2014 globally competitive degrees",
      "Thriving tech & innovation economy (Samsung, LG, Hyundai, Naver)",
      "Growing demand for English-speaking professionals in Korean companies",
      "Vibrant cultural scene \u2014 K-pop, Korean cinema, food & nightlife",
    ],
    topPrograms: ["Electrical Engineering", "Computer Science", "Korean Language", "Biomedical Engineering", "International Trade"],
    funFact: "South Korea has the world\u2019s fastest average internet speed at over 200 Mbps!",
    latestNews: {
      title: "South Korea Launches \u2018Study Korea 300K\u2019 Initiative",
      date: "Feb 2026",
      summary:
        "The Korean government launched the \u2018Study Korea 300K\u2019 project aiming to attract 300,000 international students by 2027, with expanded GKS scholarships, simplified visa processes, and new English-taught programs across 50+ universities.",
    },
  },
  {
    name: "Europe",
    flag: "eu",
    slug: "study-in-europe",
    tagline: "Free tuition, rich culture & Schengen freedom",
    description:
      "Continental Europe offers something no other region can \u2014 free or near-free university education in countries like Germany, Norway, Finland, and Austria. With the Schengen visa allowing travel across 27 countries and diverse cultural experiences, Europe is ideal for students seeking affordable, high-quality education.",
    qsRanking: "50+ in Top 500",
    topUnis: "ETH Zurich, TU Munich, Sorbonne, Delft, KU Leuven, University of Amsterdam",
    totalInternational: "3,000,000+",
    tuitionRange: "\u20ac0 \u2013 \u20ac15,000/yr (free in Germany, Norway, Finland)",
    livingCost: "\u20ac700 \u2013 \u20ac1,200/month",
    postStudyVisa: "18 months (Germany), varies by country",
    workRights: "20 hrs/week in most EU countries",
    prPathway: "Varies \u2014 strong in Germany, Netherlands, Ireland",
    scores: { education: 90, affordability: 88, employability: 82, quality: 91, safety: 88, diversity: 95 },
    reasonsToStudy: [
      "FREE tuition in Germany, Norway, Finland, Austria & Czech Republic",
      "Schengen visa allows travel across 27 European countries",
      "ETH Zurich, TU Munich & other universities rival Ivy League",
      "18-month post-study job-seeking visa in Germany",
      "EU Blue Card provides pathway to permanent residency",
      "Rich cultural diversity \u2014 44 countries, 200+ languages",
    ],
    topPrograms: ["Engineering (Germany)", "Business (Netherlands)", "Design (Italy)", "Hospitality (Switzerland)", "Environment (Scandinavia)"],
    funFact: "Germany has over 400 universities and charges zero tuition fees even for international students!",
    latestNews: {
      title: "Germany Introduces Opportunity Card (Chancenkarte) for Job Seekers",
      date: "Jan 2026",
      summary:
        "Germany\u2019s new Opportunity Card allows international graduates to enter Germany for up to 1 year to find employment, based on a points system considering qualifications, language skills, and professional experience \u2014 no job offer required.",
    },
  },
];

const compareCategories = [
  { key: "education" as const, label: "Education Quality", icon: "GraduationCap", color: "#003975" },
  { key: "affordability" as const, label: "Affordability", icon: "DollarSign", color: "#00ab18" },
  { key: "employability" as const, label: "Employability", icon: "Briefcase", color: "#6366f1" },
  { key: "quality" as const, label: "Quality of Life", icon: "Home", color: "#0ea5e9" },
  { key: "safety" as const, label: "Safety", icon: "Shield", color: "#10b981" },
  { key: "diversity" as const, label: "Cultural Diversity", icon: "Globe", color: "#f59e0b" },
];

type CategoryKey = (typeof compareCategories)[number]["key"];

const heroStats = [
  { value: 8, suffix: "", label: "Countries Compared" },
  { value: 50, suffix: "+", label: "Top 100 Universities" },
  { value: 6, suffix: "M+", label: "International Students" },
  { value: 15, suffix: "+", label: "Years of Expert Data" },
];

/* ═══════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════ */

/* \u2500\u2500 Radial Score Ring \u2500\u2500 */
function ScoreRing({ score, size = 52, stroke = 4, color = "#003975" }: { score: number; size?: number; stroke?: number; color?: string }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: circumference - (circumference * score) / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-slate-800 text-xs font-bold rotate-90 origin-center"
        style={{ fontSize: size * 0.24 }}
      >
        {score}
      </text>
    </svg>
  );
}

/* \u2500\u2500 Overall Score Calculation \u2500\u2500 */
function overallScore(c: Country) {
  const s = c.scores;
  return Math.round((s.education + s.affordability + s.employability + s.quality + s.safety + s.diversity) / 6);
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function DestinationsComparePage() {
  const { setShowSidebar } = useHeader();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("education");
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  const sorted = useMemo(
    () => [...countries].sort((a, b) => b.scores[activeCategory] - a.scores[activeCategory]),
    [activeCategory]
  );

  const overallSorted = useMemo(
    () => [...countries].sort((a, b) => overallScore(b) - overallScore(a)),
    []
  );

  const toggleCompare = (slug: string) => {
    setSelectedForCompare((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : prev.length < 3 ? [...prev, slug] : prev
    );
  };

  const compareCountries = countries.filter((c) => selectedForCompare.includes(c.slug));

  return (
    <main className="pt-20">
      {/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 HERO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="relative py-28 px-6 bg-gradient-to-br from-[#001a3a] via-[#003975] to-[#002d5e] text-white overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#00ab18]/10 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeUp>
            <Link
              href="/study-abroad"
              className="inline-flex items-center gap-2 text-blue-200/70 text-sm mb-6 hover:text-white transition group"
            >
              <Icon name="ArrowRight" size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Study Abroad
            </Link>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeUp delay={0.1}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-blue-100 mb-6">
                  <Icon name="Globe" size={14} /> 2026 Rankings Updated
                </span>
              </FadeUp>
              <FadeUp delay={0.15}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
                  Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-[#00ab18]">8 Top Study<br />Destinations</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-lg text-blue-100/80 max-w-xl leading-relaxed mb-8">
                  Detailed, data-driven comparison of education quality, costs, employability, safety &amp; immigration pathways
                  across the world&apos;s most popular study abroad destinations for Nepali students.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#rankings"
                    className="inline-flex items-center gap-2 bg-white text-[#003975] px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-50 transition shadow-lg shadow-black/20"
                  >
                    <Icon name="BarChart3" size={16} /> View Rankings
                  </a>
                  <button
                    onClick={() => { setCompareMode(!compareMode); setSelectedForCompare([]); }}
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition"
                  >
                    <Icon name="Table" size={16} /> {compareMode ? "Exit Compare" : "Compare Side-by-Side"}
                  </button>
                </div>
              </FadeUp>
            </div>

            {/* Hero Stats Grid */}
            <FadeRight delay={0.3}>
              <div className="grid grid-cols-2 gap-4">
                {heroStats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-extrabold text-white">
                      <AnimatedCounter value={s.value} />{s.suffix}
                    </div>
                    <div className="text-sm text-blue-200/70 mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </FadeRight>
          </div>

          {/* Country Flag Strip */}
          <FadeUp delay={0.5}>
            <div className="flex flex-wrap justify-center gap-5 mt-16 pt-10 border-t border-white/10">
              {countries.map((c) => (
                <a
                  key={c.slug}
                  href={`#${c.slug}`}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/10 transition group"
                >
                  <FlagIcon code={c.flag} size={18} />
                  <span className="text-sm text-blue-100 group-hover:text-white transition">{c.name}</span>
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 COMPARE MODE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <AnimatePresence>
        {compareMode && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-blue-50 border-b border-blue-100"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Select up to 3 countries to compare</h3>
                  <p className="text-sm text-slate-500">{selectedForCompare.length}/3 selected</p>
                </div>
                <button
                  onClick={() => { setCompareMode(false); setSelectedForCompare([]); }}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Close \u2715
                </button>
              </div>

              {/* Country Selector Chips */}
              <div className="flex flex-wrap gap-3 mb-8">
                {countries.map((c) => {
                  const sel = selectedForCompare.includes(c.slug);
                  return (
                    <button
                      key={c.slug}
                      onClick={() => toggleCompare(c.slug)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition border ${
                        sel
                          ? "bg-[#003975] text-white border-[#003975]"
                          : "bg-white text-slate-600 border-gray-200 hover:border-[#003975]"
                      } ${!sel && selectedForCompare.length >= 3 ? "opacity-40 cursor-not-allowed" : ""}`}
                      disabled={!sel && selectedForCompare.length >= 3}
                    >
                      <FlagIcon code={c.flag} size={16} /> {c.name}
                      {sel && <Icon name="Check" size={14} />}
                    </button>
                  );
                })}
              </div>

              {/* Comparison Table */}
              {compareCountries.length >= 2 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-blue-200">
                        <th className="text-left py-3 px-4 text-slate-500 font-medium w-44">Category</th>
                        {compareCountries.map((c) => (
                          <th key={c.slug} className="text-center py-3 px-4">
                            <div className="flex flex-col items-center gap-1">
                              <FlagIcon code={c.flag} size={24} />
                              <span className="font-bold text-slate-900">{c.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 bg-white">
                        <td className="py-3 px-4 font-medium text-slate-700">Overall Score</td>
                        {compareCountries.map((c) => (
                          <td key={c.slug} className="text-center py-3 px-4">
                            <span className="text-2xl font-bold text-[#003975]">{overallScore(c)}</span>
                            <span className="text-slate-400 text-xs">/100</span>
                          </td>
                        ))}
                      </tr>
                      {compareCategories.map((cat) => (
                        <tr key={cat.key} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-slate-700">
                            <Icon name={cat.icon} size={14} className="inline mr-2 text-slate-400" />
                            {cat.label}
                          </td>
                          {compareCountries.map((c) => {
                            const score = c.scores[cat.key];
                            const best = Math.max(...compareCountries.map((cc) => cc.scores[cat.key]));
                            return (
                              <td key={c.slug} className="text-center py-3 px-4">
                                <span className={`text-lg font-bold ${score === best ? "text-[#00ab18]" : "text-slate-700"}`}>
                                  {score}
                                </span>
                                {score === best && <Icon name="Trophy" size={12} className="inline ml-1 text-[#00ab18]" />}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      {(["tuitionRange", "livingCost", "postStudyVisa", "workRights", "prPathway"] as const).map((field) => {
                        const labels: Record<string, string> = {
                          tuitionRange: "Tuition Range",
                          livingCost: "Living Cost",
                          postStudyVisa: "Post-Study Visa",
                          workRights: "Work Rights",
                          prPathway: "PR Pathway",
                        };
                        return (
                          <tr key={field} className="border-b border-gray-100">
                            <td className="py-3 px-4 font-medium text-slate-700">{labels[field]}</td>
                            {compareCountries.map((c) => (
                              <td key={c.slug} className="text-center py-3 px-4 text-slate-600 text-xs leading-relaxed">
                                {c[field]}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {compareCountries.length < 2 && (
                <p className="text-center text-slate-400 py-8">Select at least 2 countries to see the comparison table.</p>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 CATEGORY FILTER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section id="rankings" className="py-6 px-6 bg-white border-b border-gray-100 sticky top-20 z-30 backdrop-blur-xl bg-white/95">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Rank by</h2>
            <div className="flex flex-wrap gap-2">
              {compareCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.key
                      ? "bg-[#003975] text-white shadow-lg shadow-[#003975]/20"
                      : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon name={cat.icon} size={14} /> {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 RANKING OVERVIEW \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                {compareCategories.find((c) => c.key === activeCategory)?.label} Rankings
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Based on QS World University Rankings 2026, government data, immigration statistics &amp; cost-of-living indices.
              </p>
            </div>
          </FadeUp>

          {/* Top 3 Podium */}
          <div className="flex flex-col md:flex-row items-end justify-center gap-4 mb-16 max-w-4xl mx-auto">
            {[1, 0, 2].map((pos) => {
              const country = sorted[pos];
              if (!country) return null;
              const podiumH = ["h-56", "h-72", "h-48"][pos];
              const medal = ["\ud83e\udd48", "\ud83e\udd47", "\ud83e\udd49"][pos];
              const borderColors = ["border-slate-300", "border-yellow-400", "border-amber-600"];

              return (
                <FadeUp key={country.slug} delay={pos * 0.15} className="flex-1 w-full md:max-w-[280px]">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + pos * 0.15, type: "spring" }}
                      className={`relative mb-4 p-1 rounded-full border-2 ${borderColors[pos]}`}
                    >
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                        <FlagIcon code={country.flag} size={36} />
                      </div>
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-lg">{medal}</span>
                    </motion.div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{country.name}</h3>
                    <div className="text-3xl font-extrabold text-[#003975] mb-3">{country.scores[activeCategory]}</div>
                    <div className={`w-full ${podiumH} rounded-t-2xl bg-gradient-to-t from-[#003975] to-[#003975]/70 flex items-start justify-center pt-6`}>
                      <span className="text-white font-bold text-2xl">#{pos + 1}</span>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* Full Rankings List (4\u20138) */}
          <div className="space-y-3 max-w-3xl mx-auto">
            {sorted.slice(3).map((c, i) => (
              <FadeUp key={c.slug} delay={i * 0.08}>
                <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
                  <span className="text-lg font-bold text-slate-300 w-8 text-center">#{i + 4}</span>
                  <FlagIcon code={c.flag} size={28} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{c.name}</h4>
                    <p className="text-xs text-slate-400">{c.tagline}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden hidden sm:block">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.scores[activeCategory]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#003975] to-[#00ab18]"
                      />
                    </div>
                    <span className="text-xl font-bold text-[#003975] w-10 text-right">{c.scores[activeCategory]}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 DETAILED COUNTRY CARDS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-[#00ab18] uppercase tracking-wider">In-Depth Analysis</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3">
                Detailed Country Profiles
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Everything you need to know about each destination \u2014 costs, visa pathways, top programs, why students choose it, and the latest news.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-8">
            {overallSorted.map((country, idx) => {
              const isExpanded = expandedCountry === country.slug;
              const overall = overallScore(country);

              return (
                <FadeUp key={country.slug} delay={idx * 0.05}>
                  <div
                    id={country.slug}
                    className="scroll-mt-36 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Left: Country Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                              <FlagIcon code={country.flag} size={32} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-white bg-[#003975] px-2.5 py-0.5 rounded-full">
                                  #{idx + 1} Overall
                                </span>
                                <span className="text-xs font-medium text-slate-400">{country.qsRanking} QS ranked</span>
                              </div>
                              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                                Study in {country.name}
                              </h3>
                            </div>
                          </div>
                          <p className="text-slate-500 italic text-sm mb-3">{country.tagline}</p>
                          <p className="text-slate-600 leading-relaxed">{country.description}</p>

                          {/* Quick Stats Row */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                            {[
                              { label: "Tuition", value: country.tuitionRange, icon: "DollarSign" },
                              { label: "Living Cost", value: country.livingCost, icon: "Home" },
                              { label: "Post-Study Visa", value: country.postStudyVisa, icon: "Plane" },
                              { label: "PR Pathway", value: country.prPathway, icon: "Award" },
                            ].map((s) => (
                              <div key={s.label} className="bg-slate-50 rounded-xl p-3">
                                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                                  <Icon name={s.icon} size={12} /> {s.label}
                                </div>
                                <p className="text-sm font-semibold text-slate-700 leading-snug">{s.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: Score Rings */}
                        <div className="flex-shrink-0 lg:w-72">
                          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-5 border border-gray-100">
                            <div className="text-center mb-4">
                              <div className="text-4xl font-extrabold text-[#003975]">{overall}</div>
                              <div className="text-xs text-slate-400">Overall Score</div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              {compareCategories.map((cat) => (
                                <div key={cat.key} className="flex flex-col items-center">
                                  <ScoreRing score={country.scores[cat.key]} size={48} stroke={3.5} color={cat.color} />
                                  <span className="text-[10px] text-slate-400 mt-1 text-center leading-tight">{cat.label.split(" ")[0]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expand Toggle */}
                      <button
                        onClick={() => setExpandedCountry(isExpanded ? null : country.slug)}
                        className="mt-6 inline-flex items-center gap-2 text-[#003975] text-sm font-medium hover:gap-3 transition-all"
                      >
                        {isExpanded ? "Show Less" : "See Full Profile \u2014 Reasons, Programs, News & More"}
                        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <Icon name="ChevronDown" size={16} />
                        </motion.span>
                      </button>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-100 p-6 md:p-8 grid md:grid-cols-2 gap-8">
                            {/* Reasons to Study */}
                            <div>
                              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Icon name="Star" size={18} className="text-[#00ab18]" />
                                Why Study in {country.name}
                              </h4>
                              <ul className="space-y-3">
                                {country.reasonsToStudy.map((reason, ri) => (
                                  <li key={ri} className="flex gap-3 text-sm text-slate-600">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00ab18]/10 text-[#00ab18] flex items-center justify-center mt-0.5">
                                      <Icon name="Check" size={12} />
                                    </span>
                                    <span className="leading-relaxed">{reason}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                              {/* Top Programs */}
                              <div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                  <Icon name="GraduationCap" size={18} className="text-[#003975]" />
                                  Top Programs
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {country.topPrograms.map((p) => (
                                    <span key={p} className="px-3 py-1.5 bg-blue-50 text-[#003975] text-xs font-medium rounded-full">
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Key Universities */}
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                                  <Icon name="Building" size={14} className="text-slate-400" />
                                  Top Universities
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{country.topUnis}</p>
                              </div>

                              {/* Work Details */}
                              <div className="bg-slate-50 rounded-xl p-4">
                                <h4 className="text-sm font-bold text-slate-900 mb-2">Work &amp; Immigration</h4>
                                <div className="space-y-2 text-sm text-slate-600">
                                  <p><strong>Work Rights:</strong> {country.workRights}</p>
                                  <p><strong>Post-Study Visa:</strong> {country.postStudyVisa}</p>
                                  <p><strong>PR Pathway:</strong> {country.prPathway}</p>
                                </div>
                              </div>

                              {/* Fun Fact */}
                              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                <p className="text-sm text-amber-800 flex gap-2">
                                  <Icon name="Lightbulb" size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                                  <span><strong>Fun Fact:</strong> {country.funFact}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Latest News Banner */}
                          <div className="mx-6 md:mx-8 mb-6 md:mb-8 bg-gradient-to-r from-[#003975] to-[#004a8f] rounded-2xl p-5 text-white">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <Icon name="Zap" size={18} className="text-yellow-300" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 flex-wrap mb-1">
                                  <span className="text-xs font-semibold text-yellow-300 bg-yellow-300/10 px-2 py-0.5 rounded-full">
                                    Latest Update \u2014 {country.latestNews.date}
                                  </span>
                                </div>
                                <h5 className="font-bold text-white text-base mb-1">{country.latestNews.title}</h5>
                                <p className="text-blue-100/80 text-sm leading-relaxed">{country.latestNews.summary}</p>
                              </div>
                            </div>
                          </div>

                          {/* Link to Full Country Page */}
                          <div className="px-6 md:px-8 pb-6 md:pb-8">
                            <Link
                              href={`/destinations/${country.slug}`}
                              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow"
                            >
                              Explore Full {country.name} Guide <Icon name="ArrowRight" size={14} />
                            </Link>
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

      {/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 LATEST NEWS ACROSS ALL DESTINATIONS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-[#00ab18] uppercase tracking-wider">Stay Informed</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3">
                Latest Immigration &amp; Education News
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Policies change fast \u2014 stay up to date with the latest visa rules, scholarship announcements, and education news across all 8 destinations.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {countries.map((c, i) => (
              <FadeUp key={c.slug} delay={i * 0.05}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-5 h-full flex flex-col">
                  <div className="flex items-center gap-2.5 mb-4">
                    <FlagIcon code={c.flag} size={20} />
                    <span className="font-semibold text-slate-900 text-sm">{c.name}</span>
                    <span className="ml-auto text-xs text-slate-400">{c.latestNews.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{c.latestNews.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1">{c.latestNews.summary}</p>
                  <Link
                    href={`/destinations/${c.slug}`}
                    className="mt-4 text-xs text-[#003975] font-medium hover:underline"
                  >
                    Read More \u2192
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 QUICK COMPARISON TABLE (ALL 8) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-[#003975] uppercase tracking-wider">At a Glance</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3">
                Complete Comparison Table
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                All 8 destinations compared side-by-side across key metrics that matter most to Nepali students.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#003975] text-white">
                    <th className="text-left py-4 px-5 font-semibold sticky left-0 bg-[#003975] z-10 min-w-[140px]">Country</th>
                    <th className="text-center py-4 px-4 font-semibold min-w-[100px]">Overall</th>
                    <th className="text-center py-4 px-4 font-semibold min-w-[130px]">Tuition/yr</th>
                    <th className="text-center py-4 px-4 font-semibold min-w-[130px]">Living Cost</th>
                    <th className="text-center py-4 px-4 font-semibold min-w-[140px]">Post-Study Visa</th>
                    <th className="text-center py-4 px-4 font-semibold min-w-[130px]">PR Pathway</th>
                    <th className="text-center py-4 px-4 font-semibold min-w-[100px]">QS Ranked</th>
                    <th className="text-center py-4 px-4 font-semibold min-w-[120px]">Intl Students</th>
                  </tr>
                </thead>
                <tbody>
                  {overallSorted.map((c, i) => (
                    <tr key={c.slug} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-blue-50/30 transition`}>
                      <td className={`py-4 px-5 sticky left-0 z-10 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/80"}`}>
                        <div className="flex items-center gap-2.5">
                          <FlagIcon code={c.flag} size={20} />
                          <div>
                            <span className="font-semibold text-slate-900">{c.name}</span>
                            <div className="text-xs text-slate-400">#{i + 1}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-lg font-bold text-[#003975]">{overallScore(c)}</span>
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600 text-xs">{c.tuitionRange}</td>
                      <td className="text-center py-4 px-4 text-slate-600 text-xs">{c.livingCost}</td>
                      <td className="text-center py-4 px-4 text-slate-600 text-xs">{c.postStudyVisa}</td>
                      <td className="text-center py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          c.prPathway.startsWith("Excellent") ? "bg-green-100 text-green-700" :
                          c.prPathway.startsWith("Strong") ? "bg-blue-100 text-blue-700" :
                          c.prPathway.startsWith("Good") ? "bg-cyan-100 text-cyan-700" :
                          c.prPathway.startsWith("Moderate") ? "bg-amber-100 text-amber-700" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          {c.prPathway.split(" \u2014 ")[0]}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600 text-xs">{c.qsRanking}</td>
                      <td className="text-center py-4 px-4 text-slate-600 text-xs">{c.totalInternational}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 WHY THESE 8 DESTINATIONS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-[#00ab18] uppercase tracking-wider">Why These 8?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3">
                How We Selected These Destinations
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                After 15+ years of helping 10,000+ Nepali students study abroad, these are the 8 destinations that consistently deliver the best outcomes.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "GraduationCap",
                title: "Education Quality Verified",
                description: "Every destination has universities in global top 500 rankings (QS/THE/ARWU). We only recommend accredited institutions with proven track records for Nepali students.",
              },
              {
                icon: "Shield",
                title: "Visa Success Rate",
                description: "We maintain 98%+ visa success rates across all 8 destinations. Each country has clear, documented visa processes we\u2019ve mastered over 15 years.",
              },
              {
                icon: "Briefcase",
                title: "Post-Study Work Rights",
                description: "All 8 destinations offer legitimate post-study work pathways \u2014 from Australia\u2019s 4-year visa to Japan\u2019s job-seeking visa and Germany\u2019s Opportunity Card.",
              },
              {
                icon: "Users",
                title: "Active Nepali Community",
                description: "Each destination has an established and growing Nepali community, support networks, cultural organizations, and restaurants that help students feel at home.",
              },
              {
                icon: "DollarSign",
                title: "Range of Budgets",
                description: "From Germany\u2019s free tuition to the US\u2019s premium education, these 8 countries cover every budget \u2014 whether you have NPR 10 lakh or 50 lakh per year.",
              },
              {
                icon: "TrendingUp",
                title: "Proven Student Outcomes",
                description: "Our alumni in these 8 countries report 90%+ employment within 6 months of graduation, with average starting salaries exceeding expectations.",
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#003975]/5 flex items-center justify-center mb-4">
                    <Icon name={item.icon} size={20} className="text-[#003975]" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 CTA \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#003975] via-[#002d5e] to-[#001a3a] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#00ab18]/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-blue-100 mb-6">
              <Icon name="MessageCircle" size={14} /> Free Consultation
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Still Deciding Which<br />Country Is Right for You?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our counselors have personally guided 10,000+ students to their ideal destinations.
              Book a free 30-minute session and get personalized advice based on your profile, budget, and career goals.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold shadow-lg shadow-black/20 hover:bg-blue-50 transition"
                >
                  Book Free Consultation <Icon name="ArrowRight" size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
                >
                  Browse All Destinations
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

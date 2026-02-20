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

const scholarshipTypes = [
  {
    title: "Merit-Based Scholarships",
    description: "Awarded based on academic excellence, standardized test scores, and outstanding academic achievements throughout your education.",
    features: ["GPA-based selection", "Test score criteria", "Full & partial tuition", "Renewable annually"],
    icon: "Award",
    coverage: "50–100%",
  },
  {
    title: "Need-Based Financial Aid",
    description: "Financial assistance for students who demonstrate genuine financial need, often covering tuition, living expenses, and study materials.",
    features: ["Income-based eligibility", "Tuition + living costs", "Work-study options", "Emergency funding"],
    icon: "Heart",
    coverage: "40–100%",
  },
  {
    title: "Country-Specific Scholarships",
    description: "Scholarships offered by governments and institutions targeting students from specific countries or regions for cultural exchange.",
    features: ["Government-funded", "Bilateral agreements", "Cultural exchange focus", "Country quotas"],
    icon: "Globe",
    coverage: "50–100%",
  },
  {
    title: "Research Fellowships",
    description: "Funding for graduate students and researchers pursuing innovative research projects in specific academic fields.",
    features: ["Research stipend included", "Lab & equipment access", "Publication support", "Mentor assignment"],
    icon: "Microscope",
    coverage: "75–100%",
  },
  {
    title: "Athletic Scholarships",
    description: "Scholarships for students with exceptional sports talent, particularly popular in the US, UK, and Australian universities.",
    features: ["Sports excellence required", "Tuition + stipend", "Training facilities", "Competition travel covered"],
    icon: "Trophy",
    coverage: "50–100%",
  },
  {
    title: "Diversity & Inclusion Grants",
    description: "Grants promoting diversity in higher education, supporting underrepresented communities and first-generation college students.",
    features: ["Underrepresented groups", "First-generation students", "Women in STEM", "Community leadership"],
    icon: "Users",
    coverage: "30–100%",
  },
];

const howWeHelp = [
  { step: "01", title: "Scholarship Discovery", description: "We identify all scholarships you're eligible for based on your profile, nationality, field of study, and academic record.", icon: "Search" },
  { step: "02", title: "Eligibility Assessment", description: "Detailed evaluation of your eligibility for each scholarship with strategic advice on strengthening weaker areas.", icon: "ClipboardList" },
  { step: "03", title: "Application Crafting", description: "Expert help writing compelling scholarship essays, personal statements, and recommendation letter guidance.", icon: "Pencil" },
  { step: "04", title: "Document Preparation", description: "We ensure all required documents — transcripts, financial statements, certificates — are properly prepared and formatted.", icon: "FileText" },
  { step: "05", title: "Submission & Follow-up", description: "Timely submission of applications with tracking and follow-up to maximize your chances of success.", icon: "Send" },
];

const destinationScholarships = [
  { country: "USA", flag: "🇺🇸", scholarships: ["Fulbright Program", "Hubert Humphrey Fellowship", "AAUW Fellowships"], avgAmount: "$10,000–$50,000" },
  { country: "UK", flag: "🇬🇧", scholarships: ["Chevening Scholarship", "Commonwealth Scholarship", "GREAT Scholarships"], avgAmount: "£10,000–Full Tuition" },
  { country: "Australia", flag: "🇦🇺", scholarships: ["Australia Awards", "Endeavour Scholarship", "Destination Australia"], avgAmount: "A$15,000–Full Tuition" },
  { country: "Canada", flag: "🇨🇦", scholarships: ["Vanier CGS", "Trudeau Foundation", "Lester B. Pearson"], avgAmount: "C$20,000–Full Tuition" },
  { country: "Europe", flag: "🇪🇺", scholarships: ["Erasmus Mundus", "DAAD (Germany)", "Holland Scholarship"], avgAmount: "€5,000–Full Tuition" },
  { country: "New Zealand", flag: "🇳🇿", scholarships: ["NZ Excellence Awards", "Manaaki NZ", "University Scholarships"], avgAmount: "NZ$10,000–Full Tuition" },
];

/* ─── Component ────────────────────────────────────── */

export default function ScholarshipsPage() {
  const { setShowSidebar } = useHeader();
  useEffect(() => { setShowSidebar(false); return () => setShowSidebar(true); }, [setShowSidebar]);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[440px] md:min-h-[500px] overflow-hidden">
        <Image src="/contact/image.png" alt="Scholarship opportunities" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/85 via-[#002d5e]/70 to-[#003975]/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/60 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wide border border-white/20">
              <Icon name="Award" size={12} className="inline mr-1.5 -mt-0.5" /> Scholarships & Grants
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-2xl leading-[1.15]">
              Fund Your Dreams,<br />Study Worry-Free
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed mb-8">
              Discover scholarships worth millions. We help you find, apply, and win funding for your study abroad journey.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition">
                Check Eligibility <Icon name="ArrowRight" size={14} />
              </Link>
              <Link href="#types" className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition">
                Explore Scholarships
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats Bar — Gradient ── */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-slate-900 via-[#002d5e] to-[#003975]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "$2M+", label: "Scholarships Secured" },
              { num: "5,000+", label: "Students Funded" },
              { num: "85%", label: "Application Success" },
              { num: "200+", label: "Scholarship Partners" },
            ].map((s) => (
              <FadeUp key={s.label}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">{s.num}</div>
                  <div className="text-sm text-blue-200 mt-1.5">{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scholarship Types — Cards with Top Accent Stripe ── */}
      <section id="types" className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                Scholarship Types
              </span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">
                Types of Scholarships
              </h2>
              <p className="text-slate-500 text-base max-w-lg mx-auto">
                From merit-based awards to diversity grants, we help you access every opportunity available
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {scholarshipTypes.map((st) => (
              <StaggerItem key={st.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full group hover:shadow-md transition-shadow relative">
                    {/* Top gradient accent */}
                    <div className="h-1 bg-gradient-to-r from-slate-900 to-[#003975]" />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                          <Icon name={st.icon} size={20} />
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-bold">
                          {st.coverage} Coverage
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#003975] transition-colors">{st.title}</h3>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{st.description}</p>
                      <div className="space-y-2">
                        {st.features.map((f) => (
                          <span key={f} className="flex items-center gap-2 text-[13px] text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 flex-shrink-0" /> {f}
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

      {/* ── How We Help — Vertical Timeline ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">Our Process</span>
                <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-2">How We Help You Win</h2>
                <p className="text-slate-500 text-sm">Our 5-step approach to maximizing your scholarship success</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition self-start sm:self-auto">
                Start Now <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>

          <div className="relative">
            <div className="absolute left-[29px] top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            <div className="space-y-6">
              {howWeHelp.map((step, i) => (
                <FadeUp key={step.step} delay={i * 0.08}>
                  <div className="flex gap-6 md:gap-8 items-start">
                    <div className="relative z-10 flex-shrink-0 w-[58px] h-[58px] rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg font-bold shadow-lg">
                      {step.step}
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex-1 shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon name={step.icon} size={16} className="text-[#003975]" />
                        <h3 className="font-semibold text-slate-900 text-[15px]">{step.title}</h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Scholarships by Country — Flag Cards ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">By Destination</span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">Scholarships by Country</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">Top scholarship opportunities in the most popular study destinations</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinationScholarships.map((ds) => (
              <StaggerItem key={ds.country}>
                <HoverCard>
                  <div className="bg-gray-50 rounded-2xl p-6 h-full border border-gray-100 hover:border-[#003975]/20 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{ds.flag}</span>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#003975] transition-colors">{ds.country}</h4>
                      </div>
                      <span className="text-xs font-semibold text-[#003975] bg-[#003975]/5 px-2.5 py-1 rounded-full">{ds.avgAmount}</span>
                    </div>
                    <div className="space-y-2">
                      {ds.scholarships.map((s) => (
                        <span key={s} className="flex items-center gap-2 text-[13px] text-slate-600">
                          <Icon name="Award" size={12} className="text-slate-400 flex-shrink-0" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Tips — Split ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeLeft>
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                  Pro Tips
                </span>
                <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-4 leading-tight">
                  Scholarship Success<br />Tips & Strategies
                </h2>
                <p className="text-slate-500 text-base mb-8 leading-relaxed max-w-md">
                  Winning scholarships requires more than just good grades. Here are proven strategies our scholarship advisors recommend.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#003975] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#002d5e] transition">
                  Get Scholarship Advice <Icon name="ArrowRight" size={14} />
                </Link>
              </div>
            </FadeLeft>
            <FadeRight>
              <div className="space-y-4">
                {[
                  { title: "Start Early", desc: "Begin your scholarship search at least 12–18 months before your intended start date.", icon: "Clock" },
                  { title: "Apply Broadly", desc: "Apply to multiple scholarships to increase your chances. Don't put all eggs in one basket.", icon: "Target" },
                  { title: "Tailor Each Application", desc: "Customize your essays and applications for each scholarship's specific requirements and values.", icon: "Pencil" },
                  { title: "Show Impact", desc: "Highlight community service, leadership, and real-world impact beyond just academic achievements.", icon: "TrendingUp" },
                ].map((tip) => (
                  <div key={tip.title} className="bg-white rounded-xl border border-gray-100 p-5 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-[#003975] text-white flex items-center justify-center flex-shrink-0">
                      <Icon name={tip.icon} size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-[14px] mb-1">{tip.title}</h4>
                      <p className="text-[13px] text-slate-500 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-4 leading-tight">
              Don't Miss Out on<br />Scholarships Worth Millions
            </h2>
            <p className="text-slate-500 mb-8 text-base max-w-md mx-auto">
              Get a free scholarship assessment today. Our experts will identify every opportunity you qualify for.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg">
                Free Scholarship Assessment <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

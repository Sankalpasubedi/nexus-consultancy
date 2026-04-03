"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem, HoverCard } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import type { UniversityFinderItem } from "../universityData";

interface UniversityDetailClientProps {
  university: UniversityFinderItem;
}

function asCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function UniversityDetailClient({ university }: UniversityDetailClientProps) {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <section className="relative h-[86vh] min-h-[620px] w-full overflow-hidden">
        <Image src={university.image} alt={university.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

        <div className="absolute top-20 right-10 w-72 h-72 bg-[#0066a6]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-40 left-10 w-56 h-56 bg-[#00ab18]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl">
            <FadeUp>
              <nav className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm text-white/80 mb-5">
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <Icon name="ChevronRight" size={12} className="text-white/50" />
                <Link href="/services/find-a-university" className="hover:text-white transition">Find a University</Link>
                <Icon name="ChevronRight" size={12} className="text-white/50" />
                <span className="text-white">{university.name}</span>
              </nav>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center rounded-full bg-white/15 border border-white/25 px-3 py-1 text-xs font-semibold text-white">
                  {university.country}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/15 border border-white/25 px-3 py-1 text-xs font-semibold text-white">
                  Rank #{university.rankingPosition}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 tracking-tight">
                {university.name}
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-8 leading-relaxed">
                {university.overview}
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-7 py-3 rounded-full font-semibold hover:shadow-xl transition-shadow text-sm"
                >
                  Get Admission Support <Icon name="ArrowRight" size={14} />
                </Link>
                <Link
                  href="/services/find-a-university"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-7 py-3 rounded-full font-medium border border-white/25 hover:bg-white/20 transition text-sm"
                >
                  Back to Finder
                </Link>
              </div>
            </FadeUp>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <Icon name="MapPin" size={14} className="text-white/70" />
            <span className="text-white/80 text-xs font-medium">{university.city}, {university.country}</span>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 z-10 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[
                { label: "World Ranking", value: `#${university.rankingPosition}`, icon: "Award" },
                { label: "Intl Students", value: university.internationalStudents.toLocaleString(), icon: "Users" },
                { label: "Annual Tuition", value: asCurrency(university.annualTuitionUsd), icon: "DollarSign" },
                { label: "Programs", value: `${university.programsCount}+`, icon: "BookOpen" },
              ].map((item) => (
                <FadeUp key={item.label}>
                  <div className="p-6 md:p-8 text-center">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <Icon name={item.icon} size={18} className="text-white" />
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-slate-900">{item.value}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{item.label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#fafaf8] relative overflow-hidden">
        <motion.div
          animate={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1.05 }}
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden 2xl:block absolute top-24 right-12 z-0 pointer-events-none"
        >
          <div className="w-72 h-96 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/40 relative">
            <Image src="/services/rightimage3.png" alt="" fill className="object-cover object-top" />
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-slate-500 text-xs font-semibold border border-gray-200 mb-5">
                <Icon name="Compass" size={14} className="text-[#0066a6]" /> University Details
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">What to Know Before You Apply</h2>
              <p className="text-base text-slate-500 max-w-2xl mx-auto">
                Explore key details to evaluate fit, affordability, and admission readiness for {university.name}.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "ShieldCheck",
                title: "Accreditation",
                description: `${university.name} is accredited by ${university.accreditedBy}.`,
              },
              {
                icon: "Trophy",
                title: "Scholarship Opportunities",
                description: `${university.scholarshipName} offers support up to ${university.scholarshipPercentage}% for eligible applicants.`,
              },
              {
                icon: "MapPin",
                title: "Campus Location",
                description: `Primary campus is in ${university.city}, ${university.state}, with strong access to student services and transport.`,
              },
              {
                icon: "TrendingUp",
                title: "Graduate Outcomes",
                description: `Industry-linked programs and practical coursework improve employability after graduation.`,
              },
              {
                icon: "Users",
                title: "International Community",
                description: `A diverse student body of ${university.internationalStudents.toLocaleString()} international learners.`,
              },
              {
                icon: "ClipboardList",
                title: "Application Support",
                description: `Nexsus can help with profile review, document checks, and admission application strategy.`,
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <HoverCard>
                  <article className="bg-white rounded-2xl p-6 border border-gray-100 h-full">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                      <Icon name={item.icon} size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </article>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <FadeUp>
          <div className="max-w-4xl mx-auto rounded-3xl border border-gray-100 bg-[#eaf2f8] p-8 md:p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Ready to Apply to {university.name}?</h2>
            <p className="text-slate-600 mb-7 max-w-2xl mx-auto">
              Book a consultation and get a personalized admission roadmap including intake planning, documents, and scholarship matching.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-slate-700 transition"
              >
                Book Free Consultation <Icon name="ArrowRight" size={14} />
              </Link>
              <Link
                href="/services/find-a-university"
                className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-7 py-3 rounded-full text-sm font-semibold hover:bg-slate-50 transition"
              >
                Explore More Universities
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

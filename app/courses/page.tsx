"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  AnimatedCounter,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { Icon } from "@/lib/icons";
import { useEffect } from "react";
import { courseCategories } from "@/data/courses";

export default function CoursesPage() {
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
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 text-sm font-medium">
              <Icon name="BookOpen" size={20} /> Explore Courses
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
              Find Your Perfect <span className="text-[#00ab18]">Study Program</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl text-blue-100 max-w-2xl mb-10">
              Discover 1,000+ programs across 7 disciplines at top universities worldwide.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex gap-8">
              {[
                { label: "Programs", value: 1000, suffix: "+" },
                { label: "Universities", value: 500, suffix: "+" },
                { label: "Countries", value: 9, suffix: "" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold">
                    <AnimatedCounter value={s.value} />{s.suffix}
                  </div>
                  <div className="text-sm text-blue-200">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Course Categories</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Choose from a wide range of academic disciplines
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courseCategories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <HoverCard>
                  <Link href={`/courses/${cat.slug}`} className="block">
                    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 group h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm font-medium">{cat.programs} Programs</span>
                            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><Icon name={cat.icon} size={18} className="text-white" /></span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{cat.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-2">{cat.description}</p>
                        <div className="mt-4 flex items-center gap-1 text-[#003975] text-sm font-medium group-hover:gap-2 transition-all">
                          Explore →
                        </div>
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Entry Requirements */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="ClipboardList" size={20} className="text-blue-600" /> General Requirements
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Entry Requirements</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Common requirements across most international programs
              </p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeUp delay={0.1}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-5"><Icon name="GraduationCap" size={24} className="text-blue-600" /></div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Undergraduate</h3>
                <ul className="space-y-3">
                  {[
                    "High school diploma or equivalent",
                    "IELTS 6.0-7.0 or TOEFL equivalent",
                    "SAT/ACT scores (for US universities)",
                    "Field-specific prerequisites may apply",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5"><Icon name="Check" size={12} /></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-5"><Icon name="Building" size={24} className="text-purple-600" /></div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Postgraduate</h3>
                <ul className="space-y-3">
                  {[
                    "Bachelor's degree in relevant field",
                    "IELTS 6.5-7.0 or TOEFL equivalent",
                    "GRE/GMAT scores (varies by program)",
                    "Work experience preferred for MBA/MS",
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5"><Icon name="Check" size={12} /></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Not Sure Which Course?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Our expert counselors will help you find the perfect program based on your goals and profile.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                Get Free Course Guidance →
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

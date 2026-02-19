"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams, notFound } from "next/navigation";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { Icon, FlagIcon } from "@/lib/icons";
import { useEffect, useRef, useState } from "react";
import { courseCategories } from "@/data/courses";

/* ─── Full-width slider ────────────────────────────── */

function FullWidthSlider({ children, cardWidth = 340 }: { children: React.ReactNode; cardWidth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const gap = 24;
  const items = Array.isArray(children) ? children.length : 1;
  const maxScroll = Math.max(0, items * (cardWidth + gap) - (typeof window !== "undefined" ? window.innerWidth : 1200));

  const move = (dir: number) => {
    setScroll((p) => Math.max(0, Math.min(maxScroll, p + dir * (cardWidth + gap))));
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={ref}
        animate={{ x: -scroll }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex gap-6 pl-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))]"
      >
        {children}
      </motion.div>
      <div className="flex justify-center gap-3 mt-8">
        <button onClick={() => move(-1)} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition shadow-sm">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => move(1)} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition shadow-sm">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Component ────────────────────────────────────── */

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = courseCategories.find((c) => c.slug === slug);
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  if (!course) return notFound();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[480px] overflow-hidden">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6">
          <div className="max-w-[1440px] mx-auto w-full">
            <FadeUp>
              <Link href="/courses" className="inline-flex items-center gap-2 text-white/70 text-sm mb-4 hover:text-white transition">
                ← All Courses
              </Link>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <Icon name={course.icon} size={28} className="text-white" />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{course.title}</h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-xl text-white/80 max-w-2xl mb-6">{course.description}</p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <div className="flex gap-6">
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                  <div className="text-2xl font-bold text-white">{course.programs}</div>
                  <div className="text-xs text-white/70">Programs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                  <div className="text-2xl font-bold text-white">{course.destinations.length}</div>
                  <div className="text-xs text-white/70">Countries</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Programs Slider */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 mb-12">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-4 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
              <Icon name="GraduationCap" size={20} className="text-blue-600" /> Programs Offered
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Study Programs</h2>
            <p className="text-slate-500">Choose from specialized programs in {course.title}</p>
          </FadeUp>
        </div>
        <FullWidthSlider>
          {course.programsList.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-[340px]"
            >
              <div className={`bg-gradient-to-br ${course.gradient} rounded-3xl p-8 h-full text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                  <p className="text-white/80 text-sm mb-6 leading-relaxed">{p.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white/60"><Icon name="Clock" size={14} /></span>
                      <span>{p.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/60"><Icon name="DollarSign" size={14} /></span>
                      <span>{p.tuition}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </FullWidthSlider>
      </section>

      {/* Careers */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="Briefcase" size={20} className="text-blue-600" /> Career Outcomes
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Where This Leads</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                High-demand career paths for {course.title} graduates
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.careers.map((c) => (
              <StaggerItem key={c.title}>
                <HoverCard>
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 h-full">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">{c.title}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-500">Salary Range</span>
                      <span className="text-sm font-semibold text-[#003975]">{c.salary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Job Growth</span>
                      <span className="text-sm font-semibold text-[#00ab18]">{c.growth}</span>
                    </div>
                    <div className="mt-4 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: c.growth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full rounded-full bg-gradient-to-r ${course.gradient}`}
                      />
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
                <Icon name="Globe" size={20} className="text-blue-600" /> Top Destinations
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Where to Study {course.title}
              </h2>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {course.destinations.map((d) => (
              <StaggerItem key={d.country}>
                <HoverCard>
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 h-full">
                    <div className="mb-4"><FlagIcon code={d.flag} size={40} /></div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">{d.country}</h3>
                    <ul className="space-y-2">
                      {d.universities.map((u) => (
                        <li key={u} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#003975]" />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="ClipboardList" size={20} className="text-blue-600" /> Entry Requirements
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">What You Need</h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeLeft>
              <div className="bg-white rounded-3xl p-8 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-5"><Icon name="GraduationCap" size={24} className="text-blue-600" /></div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Undergraduate</h3>
                <ul className="space-y-3">
                  {course.requirements.undergraduate.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5"><Icon name="Check" size={12} /></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeLeft>
            <FadeRight>
              <div className="bg-white rounded-3xl p-8 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-5"><Icon name="Building" size={24} className="text-purple-600" /></div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Postgraduate</h3>
                <ul className="space-y-3">
                  {course.requirements.postgraduate.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5"><Icon name="Check" size={12} /></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Study {course.title}?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Get personalized university recommendations and application support from our experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
                >
                  Get Expert Guidance →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
                >
                  Browse All Courses
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

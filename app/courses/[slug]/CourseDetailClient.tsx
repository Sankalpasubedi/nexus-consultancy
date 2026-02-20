"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useParams, notFound } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
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
import { courseCategories } from "@/data/courses";

/* --- Programs Carousel constants --- */
const P_CARD_W = 340;
const P_CARD_H = 400;
const P_GAP = 24;
const P_ITEM = P_CARD_W + P_GAP;
const DRAG_THRESHOLD = 5;

/* --- Programs Carousel (center-focused) --- */
function ProgramsCarousel({
  programs,
  icon,
}: {
  programs: { name: string; duration: string; tuition: string; description: string }[];
  icon: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const centerOffset = containerWidth / 2 - P_CARD_W / 2;

  useEffect(() => {
    const unsub = x.on("change", (latest) => {
      const idx = Math.round((-latest + centerOffset) / P_ITEM);
      setActiveIndex(Math.max(0, Math.min(programs.length - 1, idx)));
    });
    return () => unsub();
  }, [x, centerOffset, programs.length]);

  const goTo = useCallback(
    (index: number) => {
      const target = -index * P_ITEM + centerOffset;
      const startX = x.get();
      const diff = target - startX;
      let start: number | null = null;
      const duration = 500;
      const step = (ts: number) => {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        x.set(startX + diff * eased);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    [x, centerOffset]
  );

  useEffect(() => {
    if (containerWidth > 0) goTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      hasDragged.current = false;
      dragStartX.current = e.clientX;
      dragStartVal.current = x.get();
    },
    [x]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - dragStartX.current;
      if (Math.abs(delta) > DRAG_THRESHOLD) hasDragged.current = true;
      const minX = -(P_ITEM * (programs.length - 1)) - centerOffset + containerWidth - P_CARD_W;
      const maxX = centerOffset;
      const raw = dragStartVal.current + delta;
      x.set(Math.max(minX, Math.min(maxX, raw)));
    },
    [x, centerOffset, containerWidth, programs.length]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const current = x.get();
    const idx = Math.round((-current + centerOffset) / P_ITEM);
    goTo(Math.max(0, Math.min(programs.length - 1, idx)));
  }, [x, centerOffset, goTo, programs.length]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      const current = x.get();
      const idx = Math.round((-current + centerOffset) / P_ITEM);
      goTo(Math.max(0, Math.min(programs.length - 1, idx)));
    }
  }, [x, centerOffset, goTo, programs.length]);

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height: P_CARD_H + 30 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ x }}
          className="flex items-center absolute top-0 left-0"
        >
          {programs.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={p.name}
                className="flex-shrink-0 relative"
                style={{ width: P_CARD_W, marginRight: P_GAP }}
                animate={{
                  scale: isActive ? 1 : 0.88,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  className="rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100 group"
                  style={{ height: P_CARD_H }}
                >
                  {/* Top visual area */}
                  <div className="relative h-[180px] overflow-hidden bg-gradient-to-br from-[#003975] to-[#001a3a]">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00ab18]/15 rounded-full blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                        <Icon name={icon} size={32} className="text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">
                        Program
                      </span>
                      <span className="text-xs font-semibold text-white bg-white/15 px-3 py-1 rounded-full">
                        {p.duration}
                      </span>
                    </div>
                  </div>

                  {/* Info area */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{p.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon name="Clock" size={14} className="text-slate-400" />
                        {p.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#003975]">
                        <Icon name="DollarSign" size={14} />
                        {p.tuition}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Active info + nav */}
      <div className="max-w-[1440px] mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-center mt-6"
          >
            <h3 className="text-xl font-bold text-slate-900">{programs[activeIndex]?.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{programs[activeIndex]?.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => activeIndex > 0 && goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          <div className="flex items-center gap-2">
            {programs.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 h-2.5 bg-[#003975]"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => activeIndex < programs.length - 1 && goTo(activeIndex + 1)}
            disabled={activeIndex === programs.length - 1}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- Main Component --- */

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
      <section className="relative h-[500px] overflow-hidden">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6">
          <div className="max-w-[1440px] mx-auto w-full">
            <FadeUp>
              <Link href="/courses" className="inline-flex items-center gap-2 text-white/70 text-sm mb-6 hover:text-white transition">
                <Icon name="ChevronLeft" size={16} /> All Courses
              </Link>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
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
              <div className="flex gap-4">
                {[
                  { label: "Programs", value: course.programs, icon: "BookOpen" },
                  { label: "Career Paths", value: `${course.careers.length}+`, icon: "Briefcase" },
                  { label: "Countries", value: `${course.destinations.length}`, icon: "Globe" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={s.icon} size={14} className="text-white/60" />
                      <span className="text-[10px] text-white/60 uppercase tracking-wide">{s.label}</span>
                    </div>
                    <div className="text-xl font-bold text-white">{s.value}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Programs Carousel Section */}
      <section className="py-24 bg-[#fafaf8] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 mb-12">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-4 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
              <Icon name="GraduationCap" size={16} /> Programs Offered
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Study Programs</h2>
            <p className="text-slate-500 max-w-xl">Choose from specialized programs in {course.title}</p>
          </FadeUp>
        </div>
        <ProgramsCarousel programs={course.programsList} icon={course.icon} />
      </section>

      {/* Career Outcomes */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
                <Icon name="Briefcase" size={16} /> Career Outcomes
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Where This Leads</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                High-demand career paths for {course.title} graduates
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.careers.map((c) => (
              <StaggerItem key={c.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm h-full group">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon name="TrendingUp" size={20} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-[#00ab18] bg-green-50 px-3 py-1.5 rounded-full">
                        +{c.growth} growth
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{c.title}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Salary Range</span>
                        <span className="text-sm font-semibold text-[#003975]">{c.salary}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Job Growth</span>
                        <span className="text-sm font-semibold text-[#00ab18]">{c.growth}</span>
                      </div>
                    </div>
                    <div className="mt-5 w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: c.growth }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full bg-slate-900"
                      />
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="Globe" size={16} /> Top Destinations
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Where to Study {course.title}
              </h2>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {course.destinations.map((d) => (
              <StaggerItem key={d.country}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm h-full group">
                    <div className="flex items-center gap-3 mb-5">
                      <FlagIcon code={d.flag} size={36} />
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{d.country}</h3>
                        <p className="text-xs text-slate-400">{d.universities.length} Top Universities</p>
                      </div>
                    </div>
                    <ul className="space-y-2.5">
                      {d.universities.map((u) => (
                        <li key={u} className="flex items-center gap-2.5 text-sm text-slate-600">
                          <div className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0">
                            <Icon name="GraduationCap" size={10} className="text-white" />
                          </div>
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

      {/* Entry Requirements */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
                <Icon name="ClipboardList" size={16} /> Entry Requirements
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What You Need</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Admission requirements for {course.title} programs
              </p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeLeft>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center">
                    <Icon name="GraduationCap" size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Undergraduate</h3>
                    <p className="text-xs text-slate-400">Bachelor&apos;s degree programs</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {course.requirements.undergraduate.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={12} />
                      </div>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeLeft>
            <FadeRight>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center">
                    <Icon name="Building" size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Postgraduate</h3>
                    <p className="text-xs text-slate-400">Master&apos;s &amp; doctoral programs</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {course.requirements.postgraduate.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={12} />
                      </div>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Other Course Categories */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Explore Other Disciplines
              </h2>
              <p className="text-lg text-slate-500">Browse more study fields that interest you</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseCategories
              .filter((c) => c.slug !== slug)
              .slice(0, 6)
              .map((cat) => (
                <StaggerItem key={cat.slug}>
                  <HoverCard>
                    <Link href={`/courses/${cat.slug}`} className="block">
                      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 group h-full shadow-sm">
                        <div className="relative h-36 overflow-hidden">
                          <Image
                            src={cat.image}
                            alt={cat.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                            <span className="text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                              {cat.programs} Programs
                            </span>
                            <span className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Icon name={cat.icon} size={16} className="text-white" />
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-base font-semibold text-slate-900 mb-1">{cat.title}</h3>
                          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{cat.description}</p>
                          <div className="mt-3 flex items-center gap-1 text-[#003975] text-xs font-medium group-hover:gap-2 transition-all">
                            Explore <Icon name="ArrowRight" size={12} />
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

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#00ab18]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center relative z-10">
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
                  Get Expert Guidance <Icon name="ArrowRight" size={16} />
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

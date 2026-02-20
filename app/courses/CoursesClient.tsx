"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FadeUp,
  TextReveal,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  HoverCard,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { Icon } from "@/lib/icons";
import { courseCategories } from "@/data/courses";

/* --- Carousel constants --- */
const CARD_W = 400;
const CARD_H = 460;
const GAP = 28;
const ITEM_W = CARD_W + GAP;
const DRAG_THRESHOLD = 5;

export default function CoursesPage() {
  const { setShowSidebar } = useHeader();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const centerOffset = containerWidth / 2 - CARD_W / 2;

  useEffect(() => {
    const unsub = x.on("change", (latest) => {
      const idx = Math.round((-latest + centerOffset) / ITEM_W);
      setActiveIndex(Math.max(0, Math.min(courseCategories.length - 1, idx)));
    });
    return () => unsub();
  }, [x, centerOffset]);

  const goTo = useCallback(
    (index: number) => {
      const target = -index * ITEM_W + centerOffset;
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
      const minX = -(ITEM_W * (courseCategories.length - 1)) - centerOffset + containerWidth - CARD_W;
      const maxX = centerOffset;
      const raw = dragStartVal.current + delta;
      x.set(Math.max(minX, Math.min(maxX, raw)));
    },
    [x, centerOffset, containerWidth]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const current = x.get();
    const idx = Math.round((-current + centerOffset) / ITEM_W);
    goTo(Math.max(0, Math.min(courseCategories.length - 1, idx)));
  }, [x, centerOffset, goTo]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      const current = x.get();
      const idx = Math.round((-current + centerOffset) / ITEM_W);
      goTo(Math.max(0, Math.min(courseCategories.length - 1, idx)));
    }
  }, [x, centerOffset, goTo]);

  const handleCardClick = useCallback(
    (e: React.MouseEvent, slug: string) => {
      if (hasDragged.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      router.push(`/courses/${slug}`);
    },
    [router]
  );

  const active = courseCategories[activeIndex];

  return (
    <main className="min-h-screen bg-[#fafaf8] pt-24 pb-40 overflow-hidden relative z-0">
      {/* Decorative blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-[#003975]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[5%] w-[350px] h-[350px] bg-[#00ab18]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[300px] h-[300px] bg-[#003975]/[0.02] rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 my-12">
        <FadeUp delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4">
            <TextReveal text="Explore Study Programs" className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900" />
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-lg text-slate-500 max-w-2xl">
            Discover 1,000+ programs across 7 disciplines at top universities worldwide
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="flex gap-8 mt-8">
            {[
              { label: "Programs", value: 1000, suffix: "+" },
              { label: "Universities", value: 500, suffix: "+" },
              { label: "Countries", value: 8, suffix: "" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-slate-900">
                  <AnimatedCounter value={s.value} />{s.suffix}
                </div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Full-width Drag Carousel */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height: CARD_H + 40 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ x }}
          className="flex items-center absolute top-0 left-0"
        >
          {courseCategories.map((cat, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={cat.slug}
                className="flex-shrink-0 relative"
                style={{ width: CARD_W, marginRight: GAP }}
                animate={{
                  scale: isActive ? 1 : 0.88,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => handleCardClick(e, cat.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") router.push(`/courses/${cat.slug}`);
                  }}
                  draggable={false}
                  className="block"
                >
                  <div
                    className="relative rounded-3xl overflow-hidden shadow-2xl group"
                    style={{ height: CARD_H }}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Icon badge */}
                    <div className="absolute top-5 left-5">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon name={cat.icon} size={20} className="text-white" />
                      </div>
                    </div>

                    {/* Programs count badge */}
                    <div className="absolute top-5 right-5">
                      <span className="text-xs font-bold text-white bg-[#003975]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {cat.programs} Programs
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-1">{cat.title}</h3>
                      <p className="text-sm text-white/70 line-clamp-2">{cat.description}</p>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm text-white/90 font-medium group-hover:gap-3 transition-all">
                        Explore <Icon name="ArrowRight" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Active Course Info */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Icon name={active?.icon || "BookOpen"} size={20} className="text-white" />
                </div>
                {active?.title}
              </h2>
              <p className="text-slate-500 max-w-xl">{active?.description}</p>
            </div>
            <button
              onClick={() => active && router.push(`/courses/${active.slug}`)}
              className="inline-flex items-center gap-2 bg-[#003975] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#002d5e] transition shrink-0 text-sm shadow-lg shadow-[#003975]/20"
            >
              Explore {active?.title} <Icon name="ArrowRight" size={16} />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Icon Navigation */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {courseCategories.map((cat, i) => (
            <motion.button
              key={cat.slug}
              onClick={() => goTo(i)}
              className={`relative p-2.5 rounded-full transition-all ${
                i === activeIndex
                  ? "ring-2 ring-[#003975] bg-[#003975]/10 scale-110"
                  : "opacity-40 hover:opacity-70 bg-gray-100"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={cat.title}
            >
              <Icon name={cat.icon} size={18} className={i === activeIndex ? "text-[#003975]" : "text-slate-500"} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Overview Grid */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 mt-24">
        <FadeUp>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-4 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
              <Icon name="BarChart3" size={16} /> All Categories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Browse All Disciplines
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courseCategories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <HoverCard>
                <Link href={`/courses/${cat.slug}`} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 group h-full shadow-sm">
                    <div className="relative h-40 overflow-hidden">
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
                      <h3 className="text-base font-semibold text-slate-900 mb-1.5">{cat.title}</h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{cat.description}</p>
                      <div className="mt-3 flex items-center gap-1 text-[#003975] text-xs font-medium group-hover:gap-2 transition-all">
                        Explore Programs <Icon name="ArrowRight" size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Entry Requirements */}
      <div className="relative max-w-4xl mx-auto px-6 mt-24">
        <FadeUp>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
              <Icon name="ClipboardList" size={16} /> General Requirements
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Entry Requirements</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Common requirements across most international programs
            </p>
          </div>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-6">
          <FadeUp delay={0.1}>
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm h-full">
              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
                <Icon name="GraduationCap" size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Undergraduate</h3>
              <ul className="space-y-3">
                {[
                  "High school diploma or equivalent",
                  "IELTS 6.0-7.0 or TOEFL equivalent",
                  "SAT/ACT scores (for US universities)",
                  "Field-specific prerequisites may apply",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={12} />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm h-full">
              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
                <Icon name="Building" size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Postgraduate</h3>
              <ul className="space-y-3">
                {[
                  "Bachelor's degree in relevant field",
                  "IELTS 6.5-7.0 or TOEFL equivalent",
                  "GRE/GMAT scores (varies by program)",
                  "Work experience preferred for MBA/MS",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={12} />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* CTA */}
      <div className="relative max-w-3xl mx-auto px-6 mt-24 text-center">
        <FadeUp>
          <div className="bg-[#003975] rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#00ab18]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Sure Which Course?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Our expert counselors will help you find the perfect program based on your goals and profile.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
                >
                  Get Free Course Guidance <Icon name="ArrowRight" size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}

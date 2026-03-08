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
const P_CARD_W = 400;
const P_CARD_H = 480;
const P_GAP = 28;

/* --- Program images for carousel --- */
const programImages = [
  "/services/NEX-_-1.jpg",
  "/services/NEX-_-3.jpg",
  "/services/NEX-_-5.jpg",
  "/services/NEX-_-7.jpg",
  "/services/NEX-_-10.jpg",
  "/services/NEX-_-12.jpg",
];
const P_ITEM = P_CARD_W + P_GAP;
const DRAG_THRESHOLD = 5;
const MOBILE_BREAKPOINT = 768;

/* --- Programs Carousel (center-focused) --- */
function ProgramsCarousel({
  programs,
}: {
  programs: { name: string; duration: string; tuition: string; description: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);
  const isAnimating = useRef(false);
  const lastTouchUpdate = useRef(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
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
      if (isAnimating.current) return;
      const target = -index * P_ITEM + centerOffset;
      const startX = x.get();
      const diff = target - startX;
      if (Math.abs(diff) < 1) return;
      isAnimating.current = true;
      let start: number | null = null;
      // Shorter animation on mobile for snappier feel
      const duration = isMobile ? 250 : 500;
      const step = (ts: number) => {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        x.set(startX + diff * eased);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          isAnimating.current = false;
        }
      };
      requestAnimationFrame(step);
    },
    [x, centerOffset, isMobile]
  );

  useEffect(() => {
    if (containerWidth > 0) goTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isAnimating.current = false;
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

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isAnimating.current = false;
      isDragging.current = true;
      hasDragged.current = false;
      dragStartX.current = e.touches[0].clientX;
      dragStartVal.current = x.get();
      lastTouchUpdate.current = 0;
    },
    [x]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      
      // Throttle updates on mobile to ~60fps
      const now = Date.now();
      if (now - lastTouchUpdate.current < 16) return;
      lastTouchUpdate.current = now;
      
      const delta = e.touches[0].clientX - dragStartX.current;
      if (Math.abs(delta) > DRAG_THRESHOLD) hasDragged.current = true;
      const minX = -(P_ITEM * (programs.length - 1)) - centerOffset + containerWidth - P_CARD_W;
      const maxX = centerOffset;
      const raw = dragStartVal.current + delta;
      x.set(Math.max(minX, Math.min(maxX, raw)));
    },
    [x, centerOffset, containerWidth, programs.length]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const current = x.get();
    const idx = Math.round((-current + centerOffset) / P_ITEM);
    goTo(Math.max(0, Math.min(programs.length - 1, idx)));
  }, [x, centerOffset, goTo, programs.length]);

  const handleCardClick = useCallback(
    (e: React.MouseEvent, index: number) => {
      if (hasDragged.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      // If not active card, move to it
      if (index !== activeIndex) {
        e.preventDefault();
        e.stopPropagation();
        goTo(index);
      }
    },
    [activeIndex, goTo]
  );

  // Wheel handler for trackpad horizontal scroll
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 1) return;
      
      e.preventDefault();
      const minX = -(P_ITEM * (programs.length - 1)) - centerOffset + containerWidth - P_CARD_W;
      const maxX = centerOffset;
      const raw = x.get() - delta;
      x.set(Math.max(minX, Math.min(maxX, raw)));
      
      const idx = Math.round((-x.get() + centerOffset) / P_ITEM);
      setActiveIndex(Math.max(0, Math.min(programs.length - 1, idx)));
    },
    [x, centerOffset, containerWidth, programs.length]
  );

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ 
          height: P_CARD_H + 30,
          touchAction: isMobile ? "pan-y" : "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
                className={`flex-shrink-0 relative ${!isActive ? 'cursor-pointer' : ''}`}
                style={{ 
                  width: P_CARD_W, 
                  marginRight: P_GAP,
                  willChange: isMobile ? "transform" : "auto",
                }}
                animate={{
                  scale: isActive ? 1 : (isMobile ? 0.92 : 0.88),
                  opacity: isActive ? 1 : (isMobile ? 0.6 : 0.45),
                }}
                transition={isMobile 
                  ? { type: "tween", duration: 0.15, ease: "easeOut" }
                  : { type: "spring", stiffness: 300, damping: 30 }
                }
                onClick={(e) => handleCardClick(e, i)}
              >
                <div
                  className="rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100 group"
                  style={{ height: P_CARD_H }}
                >
                  {/* Top visual area with image */}
                  <div className="relative h-[240px] overflow-hidden">
                    <Image
                      src={programImages[i % programImages.length]}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        Program
                      </span>
                      <span className="text-xs font-semibold text-white bg-[#003975]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {p.duration}
                      </span>
                    </div>
                  </div>

                  {/* Info area */}
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{p.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">{p.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon name="Clock" size={16} className="text-slate-400" />
                        {p.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#003975]">
                        <Icon name="DollarSign" size={16} />
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
            initial={{ opacity: 0, y: isMobile ? 5 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? -5 : -10 }}
            transition={{ duration: isMobile ? 0.12 : 0.25 }}
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

/* --- Explore Other Disciplines (Bento Grid with Custom Cursor) --- */
function ExploreOtherDisciplines({ currentSlug }: { currentSlug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Filter out current course
  const otherCourses = courseCategories.filter((c) => c.slug !== currentSlug);

  // Smooth cursor tracking
  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      animationId = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="py-20 md:py-36 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Explore Other Disciplines
            </h2>
            <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto">
              Browse more study fields that interest you
            </p>
          </div>
        </FadeUp>

        {/* Bento Grid with Custom Cursor */}
        <div
          ref={containerRef}
          className="relative [&_*]:cursor-none"
          style={{ cursor: "none" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Custom Cursor - View Button */}
          <div
            ref={cursorRef}
            className={`pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 ${
              isHovering ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
            style={{
              willChange: "left, top",
              transition: isHovering ? "opacity 0.2s, transform 0.2s" : "opacity 0.15s, transform 0.15s",
            }}
          >
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-slate-900 text-sm font-medium shadow-xl border border-gray-100">
              View
              <svg 
                className="w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M7 17L17 7M17 7H7M17 7V17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Large Card 1 - First course (spans 2 rows) */}
            {otherCourses[0] && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:row-span-2"
              >
                <Link href={`/courses/${otherCourses[0].slug}`} className="block group h-full">
                  <div className="h-full rounded-2xl overflow-hidden bg-white shadow-sm relative">
                    <div className="relative h-full min-h-[380px] md:min-h-[500px] overflow-hidden">
                      <Image
                        src={otherCourses[0].image}
                        alt={otherCourses[0].title}
                        fill
                        className="object-cover group-hover:scale-[1.15] transition-transform duration-700 ease-out"
                      />
                      {/* Programs badge */}
                      <div className="absolute top-4 left-4">
                        <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          {otherCourses[0].programs} Programs
                        </span>
                      </div>
                      {/* Icon badge */}
                      <div className="absolute top-4 right-4">
                        <span className="w-9 h-9 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center">
                          <Icon name={otherCourses[0].icon} size={18} className="text-white" />
                        </span>
                      </div>
                    </div>
                    {/* Title - slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="p-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-xs">
                        <h3 className="text-lg md:text-xl font-semibold text-white">
                          {otherCourses[0].title}
                        </h3>
                        <p className="text-white text-xs mt-1">
                          {otherCourses[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Large Card 2 - Second course (spans 2 columns) */}
            {otherCourses[1] && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <Link href={`/courses/${otherCourses[1].slug}`} className="block group">
                  <div className="rounded-2xl overflow-hidden bg-white shadow-sm relative">
                    <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                      <Image
                        src={otherCourses[1].image}
                        alt={otherCourses[1].title}
                        fill
                        className="object-cover group-hover:scale-[1.15] transition-transform duration-700 ease-out"
                      />
                      {/* Programs badge */}
                      <div className="absolute top-4 left-4">
                        <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          {otherCourses[1].programs} Programs
                        </span>
                      </div>
                      {/* Icon badge */}
                      <div className="absolute top-4 right-4">
                        <span className="w-9 h-9 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center">
                          <Icon name={otherCourses[1].icon} size={18} className="text-white" />
                        </span>
                      </div>
                    </div>
                    {/* Title - slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="p-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-xs">
                        <h3 className="text-lg md:text-xl font-semibold text-white">
                          {otherCourses[1].title}
                        </h3>
                        <p className="text-white text-xs mt-1">
                          {otherCourses[1].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Small Cards Grid - Remaining courses */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-5"
            >
              {otherCourses.slice(2).map((cat, idx) => (
                <Link
                  key={cat.slug}
                  href={`/courses/${cat.slug}`}
                  className="block group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * idx }}
                    className="rounded-2xl overflow-hidden bg-white shadow-sm relative"
                  >
                    <div className="relative h-[160px] md:h-[180px] overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-cover group-hover:scale-[1.5] transition-transform duration-700 ease-out"
                      />
                      {/* Programs badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-white text-[10px] font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                          {cat.programs} Programs
                        </span>
                      </div>
                      {/* Icon badge */}
                      <div className="absolute top-3 right-3">
                        <span className="w-7 h-7 rounded-md bg-black/30 backdrop-blur-sm flex items-center justify-center">
                          <Icon name={cat.icon} size={14} className="text-white" />
                        </span>
                      </div>
                    </div>
                    {/* Title - slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-xs">
                        <h3 className="text-sm md:text-base font-medium text-white">
                          {cat.title}
                        </h3>
                        <p className="text-white text-xs mt-1">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
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

              {/* Floating Accent Image */}
              <div className="hidden lg:flex justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="relative group"
                >
                  <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 rotate-3 transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src="/services/NEX-_-49.jpg"
                      alt="Course study"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#003975]/10 flex items-center justify-center">
                      <Icon name={course.icon} size={16} className="text-[#003975]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{course.programs}</span>
                  </div>
                </motion.div>
              </div>
            </div>
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
        <ProgramsCarousel programs={course.programsList} />
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

      {/* Other Course Categories - Bento Grid */}
      <ExploreOtherDisciplines currentSlug={slug} />

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#004a8f] to-[#003a75] text-white relative overflow-hidden">
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

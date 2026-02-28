"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
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
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CoursesPage() {
  const { setShowSidebar } = useHeader();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isHovering = useRef(false);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  const updateState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const max = scrollWidth - clientWidth;
    setProgress(max > 0 ? (scrollLeft / max) * 100 : 0);
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < max - 5);
  }, []);

  const handleScrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    // Also reset dragging state
    if (isDragging.current) {
      isDragging.current = false;
      if (scrollRef.current) {
        scrollRef.current.style.cursor = "";
        scrollRef.current.style.userSelect = "";
      }
    }
  }, []);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 3) hasDragged.current = true;
      scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      if (scrollRef.current) {
        scrollRef.current.style.cursor = "";
        scrollRef.current.style.userSelect = "";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    
    updateState();
    scrollEl.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    // Prevent horizontal scroll when not hovering
    const handleWheelEvent = (e: WheelEvent) => {
      if (!isHovering.current && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };
    scrollEl.addEventListener("wheel", handleWheelEvent, { passive: false });
    
    return () => {
      scrollEl.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
      scrollEl.removeEventListener("wheel", handleWheelEvent);
    };
  }, [updateState]);

  return (
    <main className="min-h-screen bg-[#fafaf8] pt-24 pb-32 overflow-hidden relative z-0">
      {/* Decorative blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-[#003975]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[5%] w-[350px] h-[350px] bg-[#00ab18]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[300px] h-[300px] bg-[#003975]/[0.02] rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 my-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
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

          {/* Right Image */}
          <FadeUp delay={0.4}>
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/services/NEX-_-12.jpg"
                  alt="Study Programs"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>
              {/* Floating accent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#003975]/10 flex items-center justify-center">
                    <Icon name="BookOpen" size={24} className="text-[#003975]" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-lg">1,000+</p>
                    <p className="text-slate-500 text-xs">Study Programs</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Native Scroll Carousel */}
      <div className="relative py-5">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => scrollRef.current?.focus({ preventScroll: true })}
          className="flex gap-5 px-6 md:px-12 py-6 overflow-x-auto overflow-y-visible scrollbar-hide cursor-grab active:cursor-grabbing select-none outline-none"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "contain",
            touchAction: "pan-x pinch-zoom",
          }}
        >
          {courseCategories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              className="flex-shrink-0 w-[260px] md:w-[372px] h-[480px] md:h-[680px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link href={`/courses/${cat.slug}`} draggable={false} onClick={handleCardClick} className="block h-full">
                <div 
                  className="relative rounded-[28px] overflow-hidden cursor-pointer h-full"
                >
                  {/* Full-bleed Image */}
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                  {/* Category tag */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="text-xs font-medium text-white/80">{cat.icon === "Monitor" ? "Technology" : cat.icon === "Briefcase" ? "Business" : cat.icon === "Cog" ? "Engineering" : cat.icon === "Heart" ? "Healthcare" : cat.icon === "Palette" ? "Creative" : cat.icon === "Scale" ? "Law" : "Sciences"}</span>
                  </div>
                  
                  {/* Programs badge */}
                  <div className="absolute top-5 right-5 z-10">
                    <span className="text-xs font-semibold text-white bg-[#003975]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {cat.programs}+ Programs
                    </span>
                  </div>

                  {/* Title section */}
                  <div className="absolute top-12 left-5 right-5 z-10">
                    <h3 className="text-lg md:text-2xl font-bold text-white leading-tight mt-4">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Bottom description */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <p className="text-sm text-white/70 line-clamp-2 mb-3">{cat.description}</p>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <Icon name="Plus" size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-end gap-3 px-6 md:px-12 mt-6">
          <button
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
              canScrollLeft 
                ? "border-gray-300 text-slate-600 hover:bg-gray-50 hover:border-gray-400" 
                : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
              canScrollRight 
                ? "border-gray-300 text-slate-600 hover:bg-gray-50 hover:border-gray-400" 
                : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
              <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
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
              <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
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
          <div className="bg-[#004a8f] rounded-3xl p-12 text-white relative overflow-hidden">
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

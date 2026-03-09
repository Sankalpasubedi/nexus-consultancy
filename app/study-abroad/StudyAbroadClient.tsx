"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FadeUp,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect, useState, useRef, useCallback } from "react";
import { Icon } from "@/lib/icons";
import { ChevronLeft, ChevronRight } from "lucide-react";

const links = [
  {
    icon: "Sparkles",
    title: "Why Study Abroad",
    description: "Discover the life-changing benefits of international education.",
    href: "/study-abroad/why-study-abroad",
    image: "/images/why-study-abroad.jpg",
    resources: 1,
  },
  {
    icon: "Globe",
    title: "Destinations",
    description: "Compare countries side-by-side on costs, education quality, work opportunities, and more.",
    href: "/study-abroad/compare-destinations",
    image: "/images/destinations.jpg",
    resources: 8,
  },
  {
    icon: "FileText",
    title: "Documents Required",
    description: "Complete checklist of every document you need for applications and visa.",
    href: "/study-abroad/documents-required",
    image: "/images/documents-required.jpg",
    resources: 1,
  },
  {
    icon: "Map",
    title: "Application Process",
    description: "Step-by-step guide from research to arrival, with timelines and tips.",
    href: "/study-abroad/application-process",
    image: "/images/application-processes.jpg",
    resources: 1,
  },
  {
    icon: "Compass",
    title: "Study Abroad Guide",
    description: "Your complete roadmap to studying overseas — from planning to departure.",
    href: "/study-abroad/complete-guide",
    image: "/images/study-abroad-guide.jpg",
    resources: 1,
  },
];

const infiniteLinks = [...links, ...links];

export default function StudyAbroadPage() {
  const { setShowSidebar } = useHeader();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isHovering = useRef(false);
  const isPaused = useRef(false);

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
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < max - 5);
  }, []);

  // Infinite auto-scroll with delta-time for smooth animation
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    let animationId: number;
    let lastTime = performance.now();
    const scrollSpeed = 40; // pixels per second

    const smoothScroll = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isPaused.current || isDragging.current || isHovering.current) {
        animationId = requestAnimationFrame(smoothScroll);
        return;
      }

      const { scrollLeft, scrollWidth } = scrollEl;
      const singleSetWidth = scrollWidth / 2;

      // When we've scrolled past the first set, jump back seamlessly
      if (scrollLeft >= singleSetWidth) {
        scrollEl.scrollLeft = scrollLeft - singleSetWidth;
      } else {
        scrollEl.scrollLeft += scrollSpeed * deltaTime;
      }

      animationId = requestAnimationFrame(smoothScroll);
    };

    animationId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleScrollLeft = () => {
    if (!scrollRef.current) return;
    isPaused.current = true;
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    setTimeout(() => { isPaused.current = false; }, 600);
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    isPaused.current = true;
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    setTimeout(() => { isPaused.current = false; }, 600);
  };

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
    isPaused.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    isPaused.current = false;
    if (isDragging.current) {
      isDragging.current = false;
      if (scrollRef.current) {
        scrollRef.current.style.cursor = "";
        scrollRef.current.style.userSelect = "";
      }
    }
  }, []);

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
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#004a8f] via-[#003a75] to-[#002550] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 text-sm font-medium">
                  <Icon name="Plane" size={20} /> Study Abroad
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
                  Your Complete Guide to <span className="text-[#00ab18]">Studying Abroad</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-xl text-blue-100 max-w-2xl">
                  Everything you need to know, from choosing a destination to settling in at your new university.
                </p>
              </FadeUp>
            </div>

            {/* Right Image */}
            <FadeUp delay={0.3}>
              <div className="hidden lg:block relative group">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/services/NEX-_-1.jpg"
                    alt="Study Abroad"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003975]/30 to-transparent" />
                </div>
                {/* Floating accent */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00ab18]/10 flex items-center justify-center">
                      <Icon name="GraduationCap" size={24} className="text-[#00ab18]" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-lg">15,000+</p>
                      <p className="text-slate-500 text-xs">Students Placed</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Explore Study Abroad Resources
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Everything you need to plan your international education journey
              </p>
            </div>
          </FadeUp>

          {/* Infinite Scroll Carousel */}
          <div className="relative py-5">
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              className="flex gap-5 px-6 md:px-12 py-6 overflow-x-auto overflow-y-visible scrollbar-hide cursor-grab active:cursor-grabbing select-none outline-none"
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehaviorX: "contain",
                touchAction: "pan-x pinch-zoom",
                scrollBehavior: "auto",
                willChange: "scroll-position",
              }}
            >
              {infiniteLinks.map((l, idx) => (
                <motion.div
                  key={`${l.title}-${idx}`}
                  aria-hidden={idx >= links.length}
                  className="flex-shrink-0 w-[260px] md:w-[372px] h-[480px] md:h-[680px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: (idx % links.length) * 0.06,
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <Link href={l.href} draggable={false} onClick={handleCardClick} className="block h-full">
                    <div className="relative rounded-[28px] overflow-hidden cursor-pointer h-full">
                      {/* Full-bleed Image */}
                      <Image
                        src={l.image}
                        alt={l.title}
                        fill
                        className="object-cover"
                        draggable={false}
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                      {/* Category tag */}
                      <div className="absolute top-5 left-5 z-10">
                        <span className="text-xs font-medium text-white/80">Study Abroad</span>
                      </div>

                      {/* Programs badge */}
                      <div className="absolute top-5 right-5 z-10">
                        <span className="text-xs font-semibold text-white bg-[#003975]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          {l.resources}+ Resource{l.resources > 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Title section */}
                      <div className="absolute top-12 left-5 right-5 z-10">
                        <h3 className="text-lg md:text-2xl font-bold text-white leading-tight mt-4">
                          {l.title}
                        </h3>
                      </div>

                      {/* Bottom description */}
                      <div className="absolute bottom-5 left-5 right-5 z-10">
                        <p className="text-sm text-white/70 line-clamp-2 mb-3">{l.description}</p>
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
                onMouseEnter={() => { isPaused.current = true; }}
                onMouseLeave={() => { isPaused.current = false; }}
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
                onMouseEnter={() => { isPaused.current = true; }}
                onMouseLeave={() => { isPaused.current = false; }}
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#004a8f] to-[#003a75] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Personalized Guidance?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Our counselors will create a step-by-step plan tailored just for you.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                Book Free Consultation →
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
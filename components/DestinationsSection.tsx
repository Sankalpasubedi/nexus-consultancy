"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { destinations } from "@/data";
import { FadeUp } from "@/lib/animations";
import { FlagIcon } from "@/lib/icons";
import { Globe } from "lucide-react";

export default function DestinationsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

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
    scrollRef.current.scrollBy({ left: -420, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
  };

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
    
    return () => {
      scrollEl.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawHeaderY = useTransform(sectionProgress, [0, 0.3], [40, 0]);
  const rawHeaderOpacity = useTransform(sectionProgress, [0, 0.2], [0, 1]);
  const headerY = useSpring(rawHeaderY, { stiffness: 80, damping: 25 });
  const headerOpacity = useSpring(rawHeaderOpacity, { stiffness: 80, damping: 25 });

  return (
    <section ref={sectionRef} className="py-32 bg-white">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 max-w-7xl mx-auto px-6 lg:px-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-50 text-slate-600 text-sm font-medium border border-gray-200/80">
              <Globe size={14} className="text-[#003975]" />
              Global Opportunities
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
              Study Destinations
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mt-4 leading-relaxed">
              Choose from top-tier universities across the world&apos;s most sought-after study destinations
            </p>
          </div>
        </div>
      </FadeUp>

      {/* Native scroll container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => scrollRef.current?.focus({ preventScroll: true })}
        className="flex gap-6 px-6 lg:px-8 overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing select-none outline-none focus:outline-none focus:ring-0"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          touchAction: "pan-x pinch-zoom",
        }}
      >
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              className="flex-shrink-0 w-[360px] md:w-[400px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              style={{ scrollSnapAlign: "start" }}
            >
              <Link href={`/destinations/${dest.slug}`} draggable={false} onClick={handleCardClick}>
                <div className="relative h-[480px] rounded-3xl overflow-hidden group cursor-pointer">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute top-6 left-6 flex items-center gap-2.5 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/20">
                    <FlagIcon code={dest.flagCode} size={16} />
                    <span className="text-white text-sm font-medium">{dest.name}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                    <p className="text-white/75 text-sm mb-5 line-clamp-2 leading-relaxed">{dest.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all duration-300">
                      Explore
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#003975] to-[#00ab18] rounded-full"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
      </div>
    </section>
  );
}

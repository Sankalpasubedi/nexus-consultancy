"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { destinations } from "@/data";
import { FadeUp } from "@/lib/animations";
import { FlagIcon } from "@/lib/icons";
import { Globe } from "lucide-react";

export default function DestinationsSection() {
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const update = () => {
      if (containerRef.current && contentRef.current) {
        setMaxScroll(Math.max(0, contentRef.current.scrollWidth - containerRef.current.offsetWidth));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = scrollPos;
    hasDragged.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const dx = dragStartX.current - e.clientX;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    setScrollPos(Math.max(0, Math.min(maxScroll, dragStartScroll.current + dx)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const progress = maxScroll > 0 ? scrollPos / maxScroll : 0;

  return (
    <section className="py-32 bg-white">
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setScrollPos((p) => Math.max(0, p - 420))}
              disabled={scrollPos === 0}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => setScrollPos((p) => Math.min(maxScroll, p + 420))}
              disabled={scrollPos >= maxScroll}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </FadeUp>

      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          ref={contentRef}
          className="flex gap-6 px-6 lg:px-8"
          style={{
            transform: `translateX(-${scrollPos}px)`,
            transition: isDragging.current ? "none" : "transform 600ms cubic-bezier(0.23, 1, 0.32, 1)",
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
        </motion.div>
      </div>

      {maxScroll > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#003975] to-[#00ab18] rounded-full"
              style={{ width: `${Math.max(10, progress * 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

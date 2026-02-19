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

  // Drag-to-scroll state
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

  return (
    <section className="py-24 bg-white">
      {/* Header */}
      <FadeUp>
        <div className="text-center mb-16 max-w-[1440px] mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
            <Globe size={16} /> Global Opportunities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Study Destinations
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Choose from top-tier universities across the world&apos;s most sought-after study destinations
          </p>
        </div>
      </FadeUp>

      {/* Full-width Carousel with drag */}
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
          className="flex gap-6 pl-6"
          style={{
            transform: `translateX(-${scrollPos}px)`,
            transition: isDragging.current ? "none" : "transform 500ms ease-out",
          }}
        >
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              className="flex-shrink-0 w-[380px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
            >
              <Link href={`/destinations/${dest.slug}`} draggable={false} onClick={handleCardClick}>
                <div className="relative h-[460px] rounded-3xl overflow-hidden group cursor-pointer">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Flag badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    <FlagIcon code={dest.flagCode} size={16} />
                    <span className="text-white text-sm font-medium">{dest.name}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                    <h3 className="text-2xl font-semibold mb-2">{dest.name}</h3>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">{dest.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
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

      {/* Nav Arrows */}
      <div className="flex justify-end gap-3 mt-8 px-6 md:px-12 lg:px-16">
        <button
          onClick={() => setScrollPos((p) => Math.max(0, p - 400))}
          disabled={scrollPos === 0}
          className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={() => setScrollPos((p) => Math.min(maxScroll, p + 400))}
          disabled={scrollPos >= maxScroll}
          className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}

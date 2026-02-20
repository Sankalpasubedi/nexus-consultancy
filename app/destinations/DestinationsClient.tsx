"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { Globe, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "@/data";
import { FlagIcon } from "@/lib/icons";
import { FadeUp, TextReveal } from "@/lib/animations";

const IMAGE_WIDTH = 420;
const IMAGE_HEIGHT = 440;
const GAP = 28;
const ITEM_WIDTH = IMAGE_WIDTH + GAP;
const DRAG_THRESHOLD = 5;

export default function Destinations() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);

  // Drag tracking refs
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

  const centerOffset = containerWidth / 2 - IMAGE_WIDTH / 2;

  useEffect(() => {
    const unsub = x.on("change", (latest) => {
      const idx = Math.round((-latest + centerOffset) / ITEM_WIDTH);
      setActiveIndex(Math.max(0, Math.min(destinations.length - 1, idx)));
    });
    return () => unsub();
  }, [x, centerOffset]);

  const goTo = useCallback(
    (index: number) => {
      const target = -index * ITEM_WIDTH + centerOffset;
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

  // --- Mouse drag handlers ---
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
      if (Math.abs(delta) > DRAG_THRESHOLD) {
        hasDragged.current = true;
      }

      const minX =
        -(ITEM_WIDTH * (destinations.length - 1)) - centerOffset + containerWidth - IMAGE_WIDTH;
      const maxX = centerOffset;
      const raw = dragStartVal.current + delta;
      const clamped = Math.max(minX, Math.min(maxX, raw));
      x.set(clamped);
    },
    [x, centerOffset, containerWidth]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    // Snap to nearest card
    const current = x.get();
    const idx = Math.round((-current + centerOffset) / ITEM_WIDTH);
    const snapped = Math.max(0, Math.min(destinations.length - 1, idx));
    goTo(snapped);
  }, [x, centerOffset, goTo]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      const current = x.get();
      const idx = Math.round((-current + centerOffset) / ITEM_WIDTH);
      const snapped = Math.max(0, Math.min(destinations.length - 1, idx));
      goTo(snapped);
    }
  }, [x, centerOffset, goTo]);

  // Card click handler - prevent navigation when dragged
  const handleCardClick = useCallback(
    (e: React.MouseEvent, slug: string) => {
      if (hasDragged.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      router.push(`/destinations/${slug}`);
    },
    [router]
  );

  const dest = destinations[activeIndex];

  return (
    <div className="min-h-screen bg-[#fafaf8] pt-24 pb-40 overflow-hidden relative z-0">
      {/* Subtle decorative bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-[#003975]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[5%] w-[350px] h-[350px] bg-[#00ab18]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[300px] h-[300px] bg-[#003975]/[0.02] rounded-full blur-[80px]" />
        <div className="absolute top-[60%] right-[30%] w-[250px] h-[250px] bg-[#00ab18]/[0.02] rounded-full blur-[80px]" />
        <div className="absolute bottom-40 right-[10%] w-[200px] h-[200px] bg-[#003975]/[0.03] rounded-full blur-[60px]" />
      </div>

      {/* Header */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 my-12">
        
        <FadeUp delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4">
            <TextReveal text="Choose Your Destination" className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900" />
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-lg text-slate-500 max-w-2xl">
            Explore detailed information about the world&apos;s top study destinations, from universities to visa requirements
          </p>
        </FadeUp>
      </div>

      {/* Full-width Drag Carousel */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height: IMAGE_HEIGHT + 40 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ x }}
          className="flex items-center absolute top-0 left-0"
        >
          {destinations.map((d, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={d.id}
                className="flex-shrink-0 relative"
                style={{ width: IMAGE_WIDTH, marginRight: GAP }}
                animate={{
                  scale: isActive ? 1 : 0.88,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => handleCardClick(e, d.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") router.push(`/destinations/${d.slug}`);
                  }}
                  draggable={false}
                  className="block"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group" style={{ height: IMAGE_HEIGHT }}>
                    <Image src={d.image} alt={d.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-5 left-5 drop-shadow-lg">
                      <FlagIcon code={d.flagCode} size={30} />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-1">{d.name}</h3>
                      <p className="text-sm text-white/70 line-clamp-2">{d.description}</p>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm text-white/90 font-medium group-hover:gap-3 transition-all">
                        Explore <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Active Destination Info */}
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
                {dest && <FlagIcon code={dest.flagCode} size={28} />} {dest?.name}
              </h2>
              <p className="text-slate-500 max-w-xl">{dest?.description}</p>
            </div>
            <button
              onClick={() => dest && router.push(`/destinations/${dest.slug}`)}
              className="inline-flex items-center gap-2 bg-[#003975] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#002d5e] transition shrink-0 text-sm shadow-lg shadow-[#003975]/20"
            >
              Explore {dest?.name} <ArrowRight size={16} />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Flag Nav */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {destinations.map((d, i) => (
            <motion.button
              key={d.id}
              onClick={() => goTo(i)}
              className={`relative p-2 rounded-full transition-all ${
                i === activeIndex ? "ring-2 ring-[#003975] bg-[#003975]/10 scale-110" : "opacity-40 hover:opacity-70"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FlagIcon code={d.flagCode} size={22} />
            </motion.button>
          ))}
        </div>

        {/* Arrow Controls */}
        {/* <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => activeIndex > 0 && goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-slate-400 text-sm font-mono">
            {String(activeIndex + 1).padStart(2, "0")} / {String(destinations.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => activeIndex < destinations.length - 1 && goTo(activeIndex + 1)}
            disabled={activeIndex === destinations.length - 1}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div> */}
      </div>
    </div>
  );
}

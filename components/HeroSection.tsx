"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCounter, MagneticButton } from "@/lib/animations";
import Link from "next/link";
import Image from "next/image";
import { FlagIcon } from "@/lib/icons";
import { useState, useEffect, useCallback } from "react";

/* ─── Slide Data ─────────────────────────────────────── */

const slides = [
  {
    image: "/destinations/Australia.png",
    tagline: "Study in Australia",
    subtitle:
      "World-class education in a vibrant, multicultural environment",
    cta: "Explore Australia",
    href: "/destinations/study-in-australia",
  },
  {
    image: "/destinations/canada.png",
    tagline: "Discover Canada",
    subtitle:
      "Affordable excellence with post-study work opportunities",
    cta: "Explore Canada",
    href: "/destinations/study-in-canada",
  },
  {
    image: "/destinations/uk.png",
    tagline: "Experience the UK",
    subtitle:
      "Centuries of academic tradition meets modern innovation",
    cta: "Explore UK",
    href: "/destinations/study-in-uk",
  },
  {
    image: "/destinations/USA.png",
    tagline: "Dream of the USA",
    subtitle:
      "Home to the world's top-ranked universities and endless possibilities",
    cta: "Explore USA",
    href: "/destinations/study-in-usa",
  },
  {
    image: "/destinations/japan.png",
    tagline: "Japan Awaits",
    subtitle: "Cutting-edge technology and rich cultural heritage",
    cta: "Explore Japan",
    href: "/destinations/study-in-japan",
  },
];

/* ─── Stats Data ─────────────────────────────────────── */

const stats = [
  { value: 15000, suffix: "+", label: "Students Placed" },
  { value: 500, suffix: "+", label: "Partner Universities" },
  { value: 98, suffix: "%", label: "Visa Success" },
  { value: 30, suffix: "+", label: "Countries" },
];

/* ─── Country Quick-Links ────────────────────────────── */

const destinations = [
  { name: "Australia", slug: "study-in-australia", flagCode: "au" },
  { name: "Canada", slug: "study-in-canada", flagCode: "ca" },
  { name: "USA", slug: "study-in-usa", flagCode: "us" },
  { name: "UK", slug: "study-in-uk", flagCode: "gb" },
  { name: "New Zealand", slug: "study-in-new-zealand", flagCode: "nz" },
  { name: "Japan", slug: "study-in-japan", flagCode: "jp" },
];

/* ─── Animation Variants ─────────────────────────────── */

const imageVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const textContainerVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: "easeInOut" as const },
  },
};

const textChildVariants = {
  enter: { opacity: 0, y: 30 },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
};

/* ─── Component ──────────────────────────────────────── */

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  /* Auto-play */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = slides[current];

  return (
    <section
      className="relative h-screen min-h-[700px] max-h-[1100px] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background Image Slider ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={slide.tagline}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient Overlay ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#001020]/80 via-[#001020]/50 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#001020]/60 via-transparent to-[#001020]/30" />

      {/* ── Main Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-center section-padding">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              variants={textContainerVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="max-w-2xl"
            >
              {/* Top Label */}
              <motion.div variants={textChildVariants}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs sm:text-sm font-medium text-white/80 tracking-wide uppercase mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Nepal&apos;s #1 Education Consultancy
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={textChildVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-5"
              >
                {slide.tagline}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={textChildVariants}
                className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-xl"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={textChildVariants}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <MagneticButton strength={0.12}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#003975] to-[#0052a3] text-white px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base hover:from-[#004a99] hover:to-[#0066cc] transition-all shadow-lg shadow-blue-900/30"
                    >
                      {slide.cta}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                </MagneticButton>

                <MagneticButton strength={0.12}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
                    >
                      Get Free Counselling
                    </Link>
                  </motion.div>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* ── Slide Indicator Dots ── */}
          <div className="flex items-center gap-2.5 mt-12">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group relative flex items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ease-out ${
                    idx === current
                      ? "w-10 h-2.5 bg-white"
                      : "w-2.5 h-2.5 bg-white/40 group-hover:bg-white/70"
                  }`}
                />
                {/* Progress fill for active dot */}
                {idx === current && !isPaused && (
                  <motion.span
                    className="absolute left-0 top-0 h-full rounded-full bg-white/50"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    key={`progress-${current}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Country Quick-Links ── */}
      <div className="absolute bottom-36 sm:bottom-40 left-0 right-0 z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider mr-2 hidden sm:inline">
              Destinations
            </span>
            {destinations.map((dest) => (
              <motion.div
                key={dest.slug}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs sm:text-sm font-medium text-white/80 hover:bg-white/20 hover:border-white/30 hover:text-white transition-all"
                >
                  <FlagIcon code={dest.flagCode} size={14} />
                  {dest.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="absolute -bottom-4 left-0 right-0 z-20 section-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl shadow-black/8 rounded-2xl px-6 sm:px-10 py-6 sm:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`text-center ${
                    idx < stats.length - 1
                      ? "md:border-r md:border-gray-200/70"
                      : ""
                  }`}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

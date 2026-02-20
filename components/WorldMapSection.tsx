"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { FlagIcon } from "@/lib/icons";
import Link from "next/link";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { worldPaths, WORLD_SVG_SCALE } from "@/data/worldPaths";

/* ================================================================
   CONSTANTS & DATA
   ================================================================ */

const NEPAL = { x: 724, y: 186 };

interface DestinationData {
  name: string;
  slug: string;
  flagCode: string;
  x: number;
  y: number;
  color: string;
  glowColor: string;
  universities: string;
  studentsSent: string;
  visaRate: string;
  description: string;
  cp1: { x: number; y: number };
  cp2: { x: number; y: number };
}

const destinations: DestinationData[] = [
  {
    name: "Australia",
    slug: "study-in-australia",
    flagCode: "au",
    x: 858,
    y: 386,
    color: "#003975",
    glowColor: "rgba(0, 57, 117, 0.4)",
    universities: "200+",
    studentsSent: "5,000+",
    visaRate: "95%",
    description:
      "Top-ranked universities in a stunning, multicultural environment",
    cp1: { x: 780, y: 260 },
    cp2: { x: 830, y: 330 },
  },
  {
    name: "Canada",
    slug: "study-in-canada",
    flagCode: "ca",
    x: 267,
    y: 84,
    color: "#00ab18",
    glowColor: "rgba(0, 171, 24, 0.4)",
    universities: "150+",
    studentsSent: "3,000+",
    visaRate: "92%",
    description:
      "Affordable world-class education with immigration pathways",
    cp1: { x: 550, y: 40 },
    cp2: { x: 380, y: 40 },
  },
  {
    name: "USA",
    slug: "study-in-usa",
    flagCode: "us",
    x: 246,
    y: 154,
    color: "#003975",
    glowColor: "rgba(0, 57, 117, 0.4)",
    universities: "300+",
    studentsSent: "2,500+",
    visaRate: "90%",
    description:
      "Home to Ivy League and cutting-edge research universities",
    cp1: { x: 560, y: 70 },
    cp2: { x: 380, y: 100 },
  },
  {
    name: "UK",
    slug: "study-in-uk",
    flagCode: "gb",
    x: 488,
    y: 91,
    color: "#00ab18",
    glowColor: "rgba(0, 171, 24, 0.4)",
    universities: "180+",
    studentsSent: "4,000+",
    visaRate: "94%",
    description:
      "Historic academic excellence with globally recognized degrees",
    cp1: { x: 640, y: 110 },
    cp2: { x: 540, y: 85 },
  },
  {
    name: "New Zealand",
    slug: "study-in-new-zealand",
    flagCode: "nz",
    x: 956,
    y: 435,
    color: "#003975",
    glowColor: "rgba(0, 57, 117, 0.4)",
    universities: "30+",
    studentsSent: "1,500+",
    visaRate: "96%",
    description:
      "Safe, welcoming country with excellent quality of life",
    cp1: { x: 820, y: 280 },
    cp2: { x: 910, y: 370 },
  },
  {
    name: "Japan",
    slug: "study-in-japan",
    flagCode: "jp",
    x: 855,
    y: 157,
    color: "#00ab18",
    glowColor: "rgba(0, 171, 24, 0.4)",
    universities: "80+",
    studentsSent: "800+",
    visaRate: "93%",
    description:
      "Advanced technology and unique cultural experience",
    cp1: { x: 780, y: 160 },
    cp2: { x: 825, y: 150 },
  },
];

/* ---- Helpers ---- */

function getFlightPathD(dest: DestinationData): string {
  return `M ${NEPAL.x} ${NEPAL.y} C ${dest.cp1.x} ${dest.cp1.y}, ${dest.cp2.x} ${dest.cp2.y}, ${dest.x} ${dest.y}`;
}

function cubicBezierPoint(
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function cubicBezierTangent(
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
): number {
  const u = 1 - t;
  return 3 * u * u * (p1 - p0) + 6 * u * t * (p2 - p1) + 3 * t * t * (p3 - p2);
}

function getWaypoints(dest: DestinationData, steps = 40) {
  const points: { x: number; y: number; angle: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = cubicBezierPoint(t, NEPAL.x, dest.cp1.x, dest.cp2.x, dest.x);
    const y = cubicBezierPoint(t, NEPAL.y, dest.cp1.y, dest.cp2.y, dest.y);
    const dx = cubicBezierTangent(t, NEPAL.x, dest.cp1.x, dest.cp2.x, dest.x);
    const dy = cubicBezierTangent(t, NEPAL.y, dest.cp1.y, dest.cp2.y, dest.y);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    points.push({ x, y, angle });
  }
  return points;
}

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

/* ---- Continent outlines (static background) ---- */
function ContinentOutlines() {
  return (
    <g transform={`scale(${WORLD_SVG_SCALE.x}, ${WORLD_SVG_SCALE.y})`}>
      {worldPaths.map((d, i) => (
        <path key={i} d={d} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth={1} />
      ))}
    </g>
  );
}

/* ---- Nepal origin marker with pulsing rings ---- */
function NepalMarker() {
  return (
    <g>
      <circle
        cx={NEPAL.x}
        cy={NEPAL.y}
        r={6}
        fill="none"
        stroke="#003975"
        strokeWidth={1.5}
        opacity={0.4}
      >
        <animate
          attributeName="r"
          from="6"
          to="20"
          dur="2.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.5"
          to="0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx={NEPAL.x}
        cy={NEPAL.y}
        r={6}
        fill="none"
        stroke="#003975"
        strokeWidth={1.5}
        opacity={0.4}
      >
        <animate
          attributeName="r"
          from="6"
          to="20"
          dur="2.5s"
          begin="1.25s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.5"
          to="0"
          dur="2.5s"
          begin="1.25s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={NEPAL.x} cy={NEPAL.y} r={6} fill="#003975" />
      <circle cx={NEPAL.x} cy={NEPAL.y} r={3} fill="#ffffff" />
      <text
        x={NEPAL.x}
        y={NEPAL.y - 16}
        textAnchor="middle"
        fill="#003975"
        fontSize={11}
        fontWeight={700}
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.05em"
      >
        NEPAL
      </text>
    </g>
  );
}

/* ---- Animated dashed flight path line ---- */
function FlightPathLine({
  dest,
  index,
  isInView,
}: {
  dest: DestinationData;
  index: number;
  isInView: boolean;
}) {
  const pathD = getFlightPathD(dest);
  return (
    <motion.path
      d={pathD}
      fill="none"
      stroke="#94a3b8"
      strokeWidth={1.2}
      strokeDasharray="6 4"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={
        isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }
      }
      transition={{
        pathLength: {
          duration: 1.5,
          delay: 0.4 + index * 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { duration: 0.4, delay: 0.4 + index * 0.3 },
      }}
    />
  );
}

/* ---- Airplane that follows the flight path via useEffect RAF ---- */
function AnimatedAirplane({
  dest,
  visible,
}: {
  dest: DestinationData;
  visible: boolean;
}) {
  const gRef = useRef<SVGGElement>(null);
  const waypoints = useMemo(() => getWaypoints(dest, 80), [dest]);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const DURATION = 5000; // ms per loop

  useEffect(() => {
    if (!visible || !gRef.current) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = (elapsed % DURATION) / DURATION;
      const idx = Math.min(
        Math.floor(progress * (waypoints.length - 1)),
        waypoints.length - 2
      );
      const localT =
        (progress * (waypoints.length - 1) - idx);
      const wp = waypoints[idx];
      const wpNext = waypoints[idx + 1];
      const x = wp.x + (wpNext.x - wp.x) * localT;
      const y = wp.y + (wpNext.y - wp.y) * localT;
      const angle = wp.angle + (wpNext.angle - wp.angle) * localT;

      if (gRef.current) {
        gRef.current.setAttribute(
          "transform",
          `translate(${x}, ${y}) rotate(${angle + 90})`
        );
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      startTimeRef.current = 0;
    };
  }, [visible, waypoints]);

  if (!visible) return null;

  return (
    <g ref={gRef} opacity={0.9}>
      {/* Airplane icon */}
      <g transform="scale(0.7) translate(-12, -12)">
        <path
          d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
          fill="#003975"
        />
      </g>
      <circle r={2} fill="#003975" opacity={0.15}>
        <animate
          attributeName="r"
          from="2"
          to="8"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.2"
          to="0"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

/* ---- Destination dot on the map ---- */
function DestinationDot({
  dest,
  isInView,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  dest: DestinationData;
  isInView: boolean;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.3 + 1.2 }}
    >
      {/* Glow ring on hover */}
      {isHovered && (
        <circle cx={dest.x} cy={dest.y} r={8} fill={dest.glowColor} opacity={0.5}>
          <animate
            attributeName="r"
            from="8"
            to="20"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.5"
            to="0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      {/* Outer glow ring (static) */}
      <circle
        cx={dest.x}
        cy={dest.y}
        r={isHovered ? 10 : 7}
        fill={dest.color}
        opacity={0.15}
        style={{ transition: "r 0.3s ease" }}
      />
      {/* Main dot */}
      <circle
        cx={dest.x}
        cy={dest.y}
        r={isHovered ? 5.5 : 4.5}
        fill={dest.color}
        stroke="#ffffff"
        strokeWidth={2}
        style={{ cursor: "pointer", transition: "all 0.3s ease" }}
      />
      {/* Invisible larger hover target */}
      <circle
        cx={dest.x}
        cy={dest.y}
        r={20}
        fill="transparent"
        style={{ cursor: "pointer" }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      />
      {/* Text label below/above dot */}
      <text
        x={dest.x}
        y={dest.y > 350 ? dest.y - 16 : dest.y + 22}
        textAnchor="middle"
        fill="#64748b"
        fontSize={8.5}
        fontWeight={600}
        fontFamily="system-ui, sans-serif"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {dest.name}
      </text>
    </motion.g>
  );
}

/* ---- Hover tooltip card (HTML overlay on top of SVG) ---- */
function DestinationTooltip({
  dest,
  isVisible,
  onMouseEnter,
  onMouseLeave,
}: {
  dest: DestinationData | null;
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  if (!dest) return null;

  const leftPct = (dest.x / 1000) * 100;
  const topPct = (dest.y / 500) * 100;

  const showAbove = dest.y > 260;
  const shiftLeft = dest.x > 650;
  const shiftRight = dest.x < 300;

  let translateX = "-50%";
  if (shiftLeft) translateX = "-82%";
  if (shiftRight) translateX = "-18%";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={dest.slug}
          initial={{ opacity: 0, scale: 0.88, y: showAbove ? 8 : -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: showAbove ? 8 : -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-50"
          style={{
            left: `${leftPct}%`,
            top: showAbove ? `${topPct - 3}%` : `${topPct + 5}%`,
            transform: `translateX(${translateX}) ${
              showAbove ? "translateY(-100%)" : ""
            }`,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100/80 p-5 w-[290px]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#003975]/10"
              >
                <FlagIcon code={dest.flagCode} size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-sm leading-tight">
                  {dest.name}
                </h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  {dest.description}
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100/80">
              <div className="text-center">
                <div className="text-sm font-bold text-slate-800">
                  {dest.universities}
                </div>
                <div className="text-[9px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
                  Universities
                </div>
              </div>
              <div className="text-center border-x border-gray-100/80">
                <div className="text-sm font-bold text-slate-800">
                  {dest.studentsSent}
                </div>
                <div className="text-[9px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
                  Students Sent
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-slate-800">
                  {dest.visaRate}
                </div>
                <div className="text-[9px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
                  Visa Rate
                </div>
              </div>
            </div>

            {/* Learn More CTA */}
            <Link
              href={`/destinations/${dest.slug}`}
              className="inline-flex items-center gap-1.5 mt-3.5 text-xs font-semibold text-[#003975] hover:text-[#002d5e] hover:gap-2.5 transition-all duration-200"
            >
              Learn More
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---- Mobile card ---- */
function MobileDestinationCard({
  dest,
  index,
}: {
  dest: DestinationData;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/destinations/${dest.slug}`}>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
          <div className="flex items-center gap-3.5 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#003975]/10"
            >
              <FlagIcon code={dest.flagCode} size={22} />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-[15px]">
                {dest.name}
              </h4>
              <p className="text-xs text-slate-500 leading-snug line-clamp-2">
                {dest.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center py-3.5 border-t border-gray-50 rounded-xl bg-slate-50/50 px-2">
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-800">
                {dest.universities}
              </div>
              <div className="text-[9px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
                Universities
              </div>
            </div>
            <div className="w-px h-7 bg-gray-200/80" />
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-800">
                {dest.studentsSent}
              </div>
              <div className="text-[9px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
                Students
              </div>
            </div>
            <div className="w-px h-7 bg-gray-200/80" />
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-800">
                {dest.visaRate}
              </div>
              <div className="text-[9px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
                Visa Rate
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#003975] group-hover:underline underline-offset-2">
              Learn More
            </span>
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-[#003975] group-hover:translate-x-1 transition-all duration-300"
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
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function WorldMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [hoveredDest, setHoveredDest] = useState<string | null>(null);
  const [visibleAirplanes, setVisibleAirplanes] = useState<Set<number>>(
    new Set()
  );
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Stagger airplane appearances after flight paths finish drawing */
  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    destinations.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setVisibleAirplanes((prev) => new Set([...prev, idx]));
      }, 2200 + idx * 300);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  /* Hover handlers with debounced leave for smooth tooltip interaction */
  const handleDotHover = useCallback((slug: string) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setHoveredDest(slug);
  }, []);

  const handleDotLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => setHoveredDest(null), 250);
  }, []);

  const handleTooltipEnter = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
  }, []);

  const handleTooltipLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => setHoveredDest(null), 200);
  }, []);

  const hoveredDestData =
    destinations.find((d) => d.slug === hoveredDest) || null;

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#fafaf8]">
      {/* -------- Section Header -------- */}
      <FadeUp>
        <div className="text-center max-w-3xl mx-auto px-6 lg:px-8 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium border border-gray-200/80 shadow-sm">
            <svg
              className="w-4 h-4 text-[#003975]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Global Reach
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Your Gateway to the{" "}
            <span className="text-gradient">World</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            From Nepal to the world&apos;s best universities. We connect
            dreams to destinations
          </p>
        </div>
      </FadeUp>

      {/* -------- Desktop: Interactive SVG Map -------- */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 lg:px-8">
        <FadeUp delay={0.15}>
          <div
            className="relative w-full overflow-visible"
            style={{ aspectRatio: "2 / 1" }}
          >
            {/* Inner clipped container for the map */}
            <div className="absolute inset-0 overflow-hidden">
            {/* Subtle radial gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 68% 42%, rgba(0,57,117,0.03) 0%, transparent 60%)",
              }}
            />

            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Subtle grid dots background */}
              <defs>
                <pattern
                  id="worldmap-grid"
                  x="0"
                  y="0"
                  width="25"
                  height="25"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="12.5" cy="12.5" r="0.6" fill="#cbd5e1" opacity="0.25" />
                </pattern>
              </defs>
              <rect width="1000" height="500" fill="url(#worldmap-grid)" />

              {/* Continent outlines */}
              <ContinentOutlines />

              {/* Flight path lines (animated draw) */}
              {destinations.map((dest, idx) => (
                <FlightPathLine
                  key={dest.slug}
                  dest={dest}
                  index={idx}
                  isInView={isInView}
                />
              ))}

              {/* Animated airplanes */}
              {destinations.map((dest, idx) => (
                <AnimatedAirplane
                  key={`plane-${dest.slug}`}
                  dest={dest}
                  visible={visibleAirplanes.has(idx)}
                />
              ))}

              {/* Nepal origin marker */}
              <NepalMarker />

              {/* Destination dots (interactive) */}
              {destinations.map((dest, idx) => (
                <DestinationDot
                  key={dest.slug}
                  dest={dest}
                  isInView={isInView}
                  index={idx}
                  isHovered={hoveredDest === dest.slug}
                  onHover={() => handleDotHover(dest.slug)}
                  onLeave={handleDotLeave}
                />
              ))}
            </svg>
            </div>

            {/* Tooltip overlay (HTML, positioned absolutely over SVG) */}
            <DestinationTooltip
              dest={hoveredDestData}
              isVisible={hoveredDest !== null}
              onMouseEnter={handleTooltipEnter}
              onMouseLeave={handleTooltipLeave}
            />
          </div>
        </FadeUp>

        {/* Legend bar */}
        {/* <div className="flex items-center justify-center gap-8 mt-8 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#003975] opacity-40" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#003975]" />
            </span>
            Nepal (Origin)
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-0 border-t-[1.5px] border-dashed border-slate-300" />
            Flight Routes
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-slate-900 border-2 border-white shadow-sm" />
            Destinations
          </div>
        </div> */}
      </div>

      {/* -------- Mobile: Destination Card Grid -------- */}
      <div className="md:hidden px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {destinations.map((dest, idx) => (
            <MobileDestinationCard key={dest.slug} dest={dest} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

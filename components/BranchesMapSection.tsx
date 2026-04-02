"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useRef, useState, useCallback } from "react";

/* ================================================================
   BRANCH DATA — coordinates mapped to nepal.svg viewBox (800 x 454)
   ================================================================ */

interface Branch {
  id: number;
  name: string;
  city: string;
  address: string;
  phone1: string;
  phone2: string;
  isHead: boolean;
  isInternational?: boolean;
  /** Approximate SVG coordinates on the nepal.svg map */
  x: number;
  y: number;
}

const branches: Branch[] = [
  {
    id: 1,
    name: "Head Office",
    city: "Dillibazar",
    address: "Dillibazar, Kathmandu-44600, Nepal",
    phone1: "01-4519495",
    phone2: "9851032197",
    isHead: true,
    x: 540,
    y: 318,
  },
  {
    id: 2,
    name: "Baneshwor Branch",
    city: "Baneshwor",
    address: "Baneshwor, Kathmandu, Nepal",
    phone1: "01-5922227",
    phone2: "9841830127",
    isHead: false,
    x: 540,
    y: 320,
  },
  {
    id: 3,
    name: "Samakhusi Branch",
    city: "Samakhusi",
    address: "Samakhusi, Kathmandu, Nepal",
    phone1: "01-4971971",
    phone2: "9820291960",
    isHead: false,
    x: 540,
    y: 319,
  },
  {
    id: 4,
    name: "Banepa Branch",
    city: "Banepa",
    address: "Banepa, Kavrepalanchok, Nepal",
    phone1: "01-1665859",
    phone2: "9860824272",
    isHead: false,
    x: 580,
    y: 320,
  },
  {
    id: 5,
    name: "Birtamode Branch",
    city: "Birtamode",
    address: "Birtamode, Jhapa, Nepal",
    phone1: "02-3591692",
    phone2: "9843649305",
    isHead: false,
    x: 765,
    y: 420,
  },
  {
    id: 6,
    name: "Dhulabari Branch",
    city: "Dhulabari",
    address: "Dhulabari, Jhapa, Nepal",
    phone1: "02-3591127",
    phone2: "9801455861",
    isHead: false,
    x: 775,
    y: 408,
  },
  {
    id: 7,
    name: "Australia Branch",
    city: "Sydney",
    address: "Sydney, NSW, Australia",
    phone1: "+61 2 8000 0000",
    phone2: "+61 4 0000 0000",
    isHead: false,
    isInternational: true,
    x: 400,
    y: 520,
  },
];

/* Kathmandu cluster: ids 1, 2, 3 share one pin */
const KTM_IDS = new Set([1, 2, 3]);
const kathmanduBranches = branches.filter((b) => KTM_IDS.has(b.id));
const outerBranches = branches.filter((b) => !KTM_IDS.has(b.id) && !b.isInternational);
const internationalBranches = branches.filter((b) => b.isInternational);

/* Cluster pin position = head office */
const KTM_PIN = { x: 540, y: 318 };

/* ================================================================
   ANIMATED ROUTE LINE from Kathmandu cluster → outer branch
   ================================================================ */
function RouteLine({
  branch,
  index,
  isInView,
}: {
  branch: Branch;
  index: number;
  isInView: boolean;
}) {
  const midX = (KTM_PIN.x + branch.x) / 2;
  const midY = (KTM_PIN.y + branch.y) / 2 - 20;
  const pathD = `M ${KTM_PIN.x} ${KTM_PIN.y} Q ${midX} ${midY}, ${branch.x} ${branch.y}`;

  return (
    <motion.path
      d={pathD}
      fill="none"
      stroke="url(#routeGradient)"
      strokeWidth={1.5}
      strokeDasharray="6 4"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={
        isInView
          ? { pathLength: 1, opacity: 0.6 }
          : { pathLength: 0, opacity: 0 }
      }
      transition={{
        pathLength: {
          duration: 1.2,
          delay: 0.6 + index * 0.25,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { duration: 0.4, delay: 0.6 + index * 0.25 },
      }}
    />
  );
}

/* ================================================================
   KATHMANDU CLUSTER MARKER (single pin with "3" badge)
   ================================================================ */
function KathmanduClusterMarker({
  isInView,
  isHovered,
  onHover,
  onLeave,
}: {
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cx = KTM_PIN.x;
  const cy = KTM_PIN.y;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      {/* Pulse rings */}
      <circle cx={cx} cy={cy} r={6} fill="none" stroke="#003975" strokeWidth={1.5} opacity={0.4}>
        <animate attributeName="r" from="6" to="26" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={6} fill="none" stroke="#003975" strokeWidth={1.5} opacity={0.4}>
        <animate attributeName="r" from="6" to="26" dur="2.5s" begin="1.25s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" begin="1.25s" repeatCount="indefinite" />
      </circle>

      {/* Hover glow */}
      {isHovered && (
        <circle cx={cx} cy={cy} r={10} fill="rgba(0, 57, 117, 0.25)" opacity={0.6}>
          <animate attributeName="r" from="10" to="22" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Outer glow */}
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 14 : 10}
        fill="#003975"
        opacity={0.12}
        style={{ transition: "r 0.3s ease" }}
      />

      {/* Main circle */}
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 10 : 9}
        fill="#003975"
        stroke="#ffffff"
        strokeWidth={2.5}
        style={{ cursor: "pointer", transition: "all 0.3s ease" }}
      />

      {/* "3" badge */}
      <text
        x={cx}
        y={cy + 3.5}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={9}
        fontWeight={800}
        fontFamily="system-ui, sans-serif"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        3
      </text>

      {/* Invisible clickable area */}
      <circle
        cx={cx}
        cy={cy}
        r={24}
        fill="transparent"
        style={{ cursor: "pointer" }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      />

      {/* Label */}
      <text
        x={cx}
        y={cy - 18}
        textAnchor="middle"
        fill="#003975"
        fontSize={11}
        fontWeight={700}
        fontFamily="system-ui, sans-serif"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        Kathmandu Valley
      </text>
    </motion.g>
  );
}

/* ================================================================
   OUTER BRANCH MARKER (individual pins)
   ================================================================ */
function OuterBranchMarker({
  branch,
  index,
  isInView,
  isHovered,
  onHover,
  onLeave,
}: {
  branch: Branch;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.8 + index * 0.2,
        type: "spring",
        stiffness: 200,
      }}
      style={{ transformOrigin: `${branch.x}px ${branch.y}px` }}
    >
      {/* Hover glow */}
      {isHovered && (
        <circle cx={branch.x} cy={branch.y} r={8} fill="rgba(0, 171, 24, 0.3)" opacity={0.6}>
          <animate attributeName="r" from="8" to="18" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Outer glow */}
      <circle
        cx={branch.x}
        cy={branch.y}
        r={isHovered ? 10 : 6}
        fill="#00ab18"
        opacity={0.15}
        style={{ transition: "r 0.3s ease" }}
      />

      {/* Main dot */}
      <circle
        cx={branch.x}
        cy={branch.y}
        r={isHovered ? 5.5 : 4.5}
        fill="#00ab18"
        stroke="#ffffff"
        strokeWidth={2}
        style={{ cursor: "pointer", transition: "all 0.3s ease" }}
      />

      {/* Invisible clickable area */}
      <circle
        cx={branch.x}
        cy={branch.y}
        r={20}
        fill="transparent"
        style={{ cursor: "pointer" }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      />

      {/* Label */}
      <text
        x={branch.x}
        y={branch.y + (branch.y > 350 ? -12 : 18)}
        textAnchor="middle"
        fill="#64748b"
        fontSize={9}
        fontWeight={600}
        fontFamily="system-ui, sans-serif"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {branch.city}
      </text>
    </motion.g>
  );
}

/* ================================================================
   KATHMANDU CLUSTER TOOLTIP (shows all 3 branches)
   ================================================================ */
function KathmanduClusterTooltip({
  isVisible,
  onMouseEnter,
  onMouseLeave,
}: {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const leftPct = (KTM_PIN.x / 800) * 100;
  const topPct = (KTM_PIN.y / 454) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="ktm-tooltip"
          initial={{ opacity: 0, scale: 0.88, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-50"
          style={{
            left: `${leftPct}%`,
            top: `${topPct - 3}%`,
            transform: "translateX(-50%) translateY(-100%)",
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100/80 p-5 w-[300px]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-800">
                <Icon name="Building2" size={18} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Kathmandu Valley</h4>
                <span className="text-[10px] text-slate-400 font-medium">3 offices</span>
              </div>
            </div>

            {/* Branch list */}
            <div className="space-y-3">
              {kathmanduBranches.map((b) => (
                <div key={b.id} className="flex items-start gap-2.5">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${b.isHead ? "bg-[#003975]" : "bg-[#003975]/10"}`}>
                    <Icon name={b.isHead ? "Building2" : "MapPin"} size={11} className={b.isHead ? "text-white" : "text-[#003975]"} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-xs">{b.city}</span>
                      {b.isHead && (
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#003975] bg-blue-50 px-1.5 py-0.5 rounded-full">HQ</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Icon name="Phone" size={9} className="text-[#00ab18]" />
                        {b.phone1}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Smartphone" size={9} className="text-[#00ab18]" />
                        {b.phone2}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================
   OUTER BRANCH TOOLTIP (single branch)
   ================================================================ */
function OuterBranchTooltip({
  branch,
  isVisible,
  onMouseEnter,
  onMouseLeave,
}: {
  branch: Branch | null;
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  if (!branch || !isVisible) return null;

  const leftPct = (branch.x / 800) * 100;
  const topPct = (branch.y / 454) * 100;
  const showAbove = branch.y > 350;

  return (
    <AnimatePresence>
      <motion.div
        key={branch.id}
        initial={{ opacity: 0, scale: 0.88, y: showAbove ? 8 : -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-50"
        style={{
          left: `${leftPct}%`,
          top: showAbove ? `${topPct - 3}%` : `${topPct + 5}%`,
          transform: `translateX(-50%) ${showAbove ? "translateY(-100%)" : ""}`,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100/80 p-5 w-[260px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#003975]/10">
              <Icon name="MapPin" size={18} className="text-[#003975]" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm leading-tight">{branch.name}</h4>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-500">
            <div className="flex items-start gap-2">
              <Icon name="MapPin" size={12} className="mt-0.5 shrink-0 text-[#00ab18]" />
              <span>{branch.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={12} className="shrink-0 text-[#00ab18]" />
              <span>{branch.phone1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Smartphone" size={12} className="shrink-0 text-[#00ab18]" />
              <span>{branch.phone2}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================================================================
   MOBILE BRANCH CARD
   ================================================================ */
function MobileBranchCard({
  branch,
  index,
}: {
  branch: Branch;
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
      <div
        className={`bg-white rounded-2xl border ${
          branch.isHead
            ? "border-[#003975]/20 shadow-lg shadow-blue-500/10"
            : "border-gray-100"
        } p-5 hover:shadow-lg transition-all duration-300 group`}
      >
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              branch.isHead
                ? "bg-slate-800"
                : "bg-[#003975]/10"
            }`}
          >
            <Icon
              name={branch.isHead ? "Building2" : "MapPin"}
              size={18}
              className={branch.isHead ? "text-white" : "text-[#003975]"}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-[15px]">
                {branch.city}
              </h4>
              {branch.isHead && (
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#003975] bg-blue-50 px-2 py-0.5 rounded-full">
                  HQ
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 leading-snug">
              {branch.address}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600 pt-3 border-t border-gray-50">
          <a
            href={`tel:${branch.phone1.replace(/-/g, "")}`}
            className="flex items-center gap-1.5 hover:text-[#003975] transition"
          >
            <Icon name="Phone" size={14} />
            {branch.phone1}
          </a>
          <a
            href={`tel:${branch.phone2}`}
            className="flex items-center gap-1.5 hover:text-[#003975] transition"
          >
            <Icon name="Smartphone" size={14} />
            {branch.phone2}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function BranchesMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // "ktm" for Kathmandu cluster, or branch id string for outer branches
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = useCallback((key: string) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setHoveredItem(key);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => setHoveredItem(null), 250);
  }, []);

  const handleTooltipEnter = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
  }, []);

  const handleTooltipLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => setHoveredItem(null), 200);
  }, []);

  const hoveredOuterBranch =
    hoveredItem && hoveredItem !== "ktm"
      ? outerBranches.find((b) => String(b.id) === hoveredItem) || null
      : null;

  return (
    <section ref={sectionRef} className="py-24 md:py-40 bg-white">
      {/* Header */}
      <FadeUp>
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium border border-gray-200/80 shadow-sm">
            <Icon name="Building2" size={16} className="text-[#003975]" />
            Our Branches
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Nationwide{" "}
            <span className="bg-gradient-to-r from-[#003975] via-[#003975] to-[#00ab18] bg-clip-text text-transparent">
              Presence
            </span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            6 offices across Nepal and 1 international branch in Australia,
            making quality education consultancy accessible from every corner
          </p>
        </div>
      </FadeUp>

      {/* Desktop: Interactive Nepal SVG Map */}
      <div className="hidden md:block max-w-5xl mx-auto px-6 lg:px-8">
        <FadeUp delay={0.15}>
          <div
            className="relative w-full"
            style={{ aspectRatio: "800 / 620", overflow: "visible" }}
          >
            <div className="absolute inset-0 overflow-visible">
              {/* Subtle radial overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 55%, rgba(0,57,117,0.03) 0%, transparent 60%)",
                }}
              />

              <svg
                viewBox="0 0 800 620"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="nepal-grid"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="10" cy="10" r="0.5" fill="#cbd5e1" opacity="0.25" />
                  </pattern>
                  <linearGradient
                    id="routeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#003975" />
                    <stop offset="100%" stopColor="#00ab18" />
                  </linearGradient>
                </defs>

                <rect width="800" height="454" fill="url(#nepal-grid)" />
                <image
                  href="/nepal.svg"
                  x="0"
                  y="0"
                  width="800"
                  height="454"
                  opacity="0.15"
                />

                {/* Route lines: Kathmandu cluster → outer branches only */}
                {outerBranches.map((branch, idx) => (
                  <RouteLine
                    key={branch.id}
                    branch={branch}
                    index={idx}
                    isInView={isInView}
                  />
                ))}

                {/* Outer branch markers */}
                {outerBranches.map((branch, idx) => (
                  <OuterBranchMarker
                    key={branch.id}
                    branch={branch}
                    index={idx}
                    isInView={isInView}
                    isHovered={hoveredItem === String(branch.id)}
                    onHover={() => handleHover(String(branch.id))}
                    onLeave={handleLeave}
                  />
                ))}

                {/* Kathmandu cluster pin (one pin for 3 offices) */}
                <KathmanduClusterMarker
                  isInView={isInView}
                  isHovered={hoveredItem === "ktm"}
                  onHover={() => handleHover("ktm")}
                  onLeave={handleLeave}
                />
                {/* Australia International Branch */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: 1.4, type: "spring", stiffness: 200 }}
                  style={{ transformOrigin: `650px 530px` }}
                >
                  <motion.path
                    d="M 540 318 Q 700 400, 650 530"
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
                    transition={{ pathLength: { duration: 1.4, delay: 1.0 }, opacity: { duration: 0.4, delay: 1.0 } }}
                  />
                  <circle cx={650} cy={530} r={14} fill="#f59e0b" opacity={0.12} />
                  <circle
                    cx={650} cy={530}
                    r={hoveredItem === "au" ? 12 : 10}
                    fill="#f59e0b" stroke="#ffffff" strokeWidth={2.5}
                    style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                  />
                  <text x={650} y={534} textAnchor="middle" fill="#ffffff" fontSize={9} fontWeight={800} fontFamily="system-ui, sans-serif" style={{ pointerEvents: "none", userSelect: "none" }}>
                    AU
                  </text>
                  <circle cx={650} cy={530} r={6} fill="none" stroke="#f59e0b" strokeWidth={1.5} opacity={0.4}>
                    <animate attributeName="r" from="10" to="28" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  {/* Invisible hover target */}
                  <circle
                    cx={650} cy={530} r={28}
                    fill="transparent"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => handleHover("au")}
                    onMouseLeave={handleLeave}
                  />
                  <text x={650} y={555} textAnchor="middle" fill="#92400e" fontSize={10} fontWeight={700} fontFamily="system-ui, sans-serif" style={{ pointerEvents: "none", userSelect: "none" }}>
                    Australia
                  </text>
                  <text x={650} y={567} textAnchor="middle" fill="#b45309" fontSize={8} fontWeight={500} fontFamily="system-ui, sans-serif" style={{ pointerEvents: "none", userSelect: "none" }}>
                    Sydney, NSW
                  </text>
                  <rect x={610} y={571} width={80} height={14} rx={7} fill="#fef3c7" stroke="#f59e0b" strokeWidth={0.8} />
                  <text x={650} y={581} textAnchor="middle" fill="#92400e" fontSize={7} fontWeight={700} fontFamily="system-ui, sans-serif" letterSpacing="0.5" style={{ pointerEvents: "none", userSelect: "none" }}>
                    INTERNATIONAL
                  </text>
                </motion.g>
              </svg>
            </div>

            {/* Tooltip: Kathmandu cluster */}
            <KathmanduClusterTooltip
              isVisible={hoveredItem === "ktm"}
              onMouseEnter={handleTooltipEnter}
              onMouseLeave={handleTooltipLeave}
            />

            {/* Tooltip: outer branch */}
            <OuterBranchTooltip
              branch={hoveredOuterBranch}
              isVisible={hoveredOuterBranch !== null}
              onMouseEnter={handleTooltipEnter}
              onMouseLeave={handleTooltipLeave}
            />
            {/* Tooltip: Australia */}
            <AnimatePresence>
              {hoveredItem === "au" && (
                <motion.div
                  key="au-tooltip"
                  initial={{ opacity: 0, scale: 0.88, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute z-50"
                  style={{
                    left: `${(650 / 800) * 100}%`,
                    top: `${(530 / 580) * 100 - 3}%`,
                    transform: "translateX(-50%) translateY(-100%)",
                  }}
                  onMouseEnter={handleTooltipEnter}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-100 p-5 w-[260px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-50">
                        <Icon name="Globe" size={18} className="text-amber-500" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm leading-tight">Australia Branch</h4>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">International</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs text-slate-500">
                      <div className="flex items-start gap-2">
                        <Icon name="MapPin" size={12} className="mt-0.5 shrink-0 text-amber-500" />
                        <span>Sydney, NSW, Australia</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" size={12} className="shrink-0 text-amber-500" />
                        <span>+61 2 8000 0000</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Smartphone" size={12} className="shrink-0 text-amber-500" />
                        <span>+61 4 0000 0000</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>

        {/* Branch summary cards below map */}
        <div className="mt-10 space-y-4">
          {/* Kathmandu Valley group */}
          <div className="rounded-2xl border border-[#003975]/15 bg-gradient-to-br from-white to-blue-50/30 p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100/80">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-800">
                <Icon name="Building2" size={16} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Kathmandu Valley
                </h4>
                <p className="text-[10px] text-slate-400 font-medium">
                  3 offices
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {kathmanduBranches.map((b) => (
                <div
                  key={b.id}
                  className="cursor-pointer hover:bg-blue-50/60 rounded-xl p-3 transition-colors"
                  onMouseEnter={() => handleHover("ktm")}
                  onMouseLeave={handleLeave}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <h5 className="text-sm font-semibold text-slate-900">
                      {b.city}
                    </h5>
                    {b.isHead && (
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[#003975] bg-blue-50 border border-[#003975]/10 px-1.5 py-0.5 rounded-full">
                        HQ
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Phone" size={10} className="text-[#00ab18]" />
                      {b.phone1}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Smartphone" size={10} className="text-[#00ab18]" />
                      {b.phone2}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outer branches */}
          <div className="grid grid-cols-3 gap-4">
            {outerBranches.map((branch, idx) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className={`rounded-2xl border p-5 transition-all duration-300 cursor-pointer hover:shadow-md ${
                  hoveredItem === String(branch.id)
                    ? "border-[#003975]/30 bg-blue-50/50 shadow-md"
                    : "border-gray-100 bg-white"
                }`}
                onMouseEnter={() => handleHover(String(branch.id))}
                onMouseLeave={handleLeave}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#003975]/10">
                    <Icon name="MapPin" size={14} className="text-[#003975]" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {branch.city}
                  </h4>
                </div>
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Phone" size={10} className="text-[#00ab18]" />
                    {branch.phone1}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Smartphone" size={10} className="text-[#00ab18]" />
                    {branch.phone2}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* International branches */}
          {internationalBranches.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-linear-to-r from-amber-50 to-white p-5">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-100">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-100">
                  <Icon name="Globe" size={16} className="text-amber-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">International Branch</h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {internationalBranches.length} office
                    {internationalBranches.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {internationalBranches.map((branch) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="rounded-xl border border-amber-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h5 className="text-base font-bold text-slate-900">{branch.name}</h5>
                        <p className="text-sm text-slate-500">{branch.address}</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                        International
                      </span>
                    </div>

                    <div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" size={12} className="text-amber-600" />
                        {branch.phone1}
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Smartphone" size={12} className="text-amber-600" />
                        {branch.phone2}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Card grid */}
      <div className="md:hidden px-6">
        {/* Kathmandu group label */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md flex items-center justify-center bg-slate-800">
              <Icon name="Building2" size={13} className="text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">
              Kathmandu Valley
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              3 offices
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {kathmanduBranches.map((branch, idx) => (
              <MobileBranchCard key={branch.id} branch={branch} index={idx} />
            ))}
          </div>
        </div>

        {/* Other branches */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md flex items-center justify-center bg-[#003975]/10">
              <Icon name="MapPin" size={13} className="text-[#003975]" />
            </div>
            <span className="text-sm font-bold text-slate-900">
              Other Branches
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {outerBranches.map((branch, idx) => (
              <MobileBranchCard
                key={branch.id}
                branch={branch}
                index={idx + 3}
              />
            ))}
          </div>
        </div>

        {/* International branch */}
        {internationalBranches.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md flex items-center justify-center bg-amber-100">
                <Icon name="Globe" size={13} className="text-amber-700" />
              </div>
              <span className="text-sm font-bold text-slate-900">International Branch</span>
            </div>

            <div className="space-y-3">
              {internationalBranches.map((branch, idx) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-slate-900">{branch.name}</h4>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      International
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{branch.address}</p>
                  <div className="space-y-1 text-xs text-slate-600 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Phone" size={10} className="text-amber-600" />
                      {branch.phone1}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Smartphone" size={10} className="text-amber-600" />
                      {branch.phone2}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

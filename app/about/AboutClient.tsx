"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useTransform, MotionValue } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  HoverCard,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { Icon } from "@/lib/icons";
import BranchesMapSection from "@/components/BranchesMapSection";

/* ─── Data ─────────────────────────────────────────── */

const stats = [
  { label: "Students Placed", value: 15000, suffix: "+" },
  { label: "Partner Universities", value: 500, suffix: "+" },
  { label: "Countries", value: 8, suffix: "" },
  { label: "Visa Success Rate", value: 98, suffix: "%" },
];

const coreValues = [
  {
    icon: "Trophy",
    title: "Excellence",
    description:
      "We maintain the highest standards in every service we provide, ensuring exceptional outcomes for our students.",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    icon: "Handshake",
    title: "Integrity",
    description:
      "Transparency and honesty guide every interaction. We build trust through ethical practices and honest advice.",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    icon: "Target",
    title: "Student Centric",
    description:
      "Your goals are our priority. We tailor every recommendation to match your unique aspirations and background.",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    icon: "Lightbulb",
    title: "Innovation",
    description:
      "We leverage the latest tools, data, and AI-driven insights to provide the most effective guidance available.",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
];

const timeline = [
  { year: "2010", title: "Founded", description: "Started with a vision to transform international education consulting in Nepal." },
  { year: "2015", title: "10,000 Students", description: "Reached our first major milestone of placing 10,000 students globally." },
  { year: "2018", title: "Global Expansion", description: "Partnered with 300+ universities across 8 countries." },
  { year: "2022", title: "AI Integration", description: "Introduced AI-powered university matching and profile assessment tools." },
  { year: "2024", title: "Industry Leader", description: "Recognized as Nepal's leading education consultancy with 500+ university partners." },
];

const team = [
  { name: "Bishnu Khadka", role: "Managing Director", initial: "BK", linkedin: "#", email: "bishnu@nexsus.com.np" },
  { name: "Sushmita Khatri", role: "Admission Officer/Counselor", initial: "SK", linkedin: "#", email: "sushmita@nexsus.com.np" },
  { name: "Kasmira Rai", role: "Education Counselor", initial: "KR", linkedin: "#", email: "kasmira@nexsus.com.np" },
  { name: "Alina Thapa", role: "Education Counselor", initial: "AT", linkedin: "#", email: "alina@nexsus.com.np" },
  { name: "Jyoti Rajbanshi", role: "Education Counselor", initial: "JR", linkedin: "#", email: "jyoti@nexsus.com.np" },
  { name: "Nisha Rai", role: "Education Counselor", initial: "NR", linkedin: "#", email: "nisha@nexsus.com.np" },
  { name: "Prabin Raj Kharel", role: "Education Counselor", initial: "PK", linkedin: "#", email: "prabin@nexsus.com.np" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    course: "MBA, University of Toronto",
    country: "Canada",
    image: "/student/priya sharma.png",
    quote:
      "Nexsus made my dream of studying in Canada a reality. Their guidance through every step was invaluable.",
  },
  {
    name: "Rahul Thapa",
    course: "MS Computer Science, University of Melbourne",
    country: "Australia",
    image: "/student/Raul Thapa.jpg",
    quote:
      "From university selection to visa approval, the team was with me all the way. Highly recommended!",
  },
  {
    name: "Sita Gurung",
    course: "BBA, University of British Columbia",
    country: "Canada",
    image: "/student/Sita Gurung.jpg",
    quote:
      "The scholarship guidance I received helped me save over $20,000 on my education. Forever grateful!",
  },
];

/* ─── Team Slider Component (Destination-style center-focused) ── */

const CARD_W = 320;
const CARD_H = 420;
const CARD_GAP = 24;
const CARD_ITEM = CARD_W + CARD_GAP;
const CARD_DRAG_THRESHOLD = 5;

function TeamSliderSection({
  team,
}: {
  team: { name: string; role: string; initial: string; linkedin?: string; email?: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);

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

  const centerOffset = containerWidth / 2 - CARD_W / 2;

  useEffect(() => {
    const unsub = x.on("change", (latest) => {
      const idx = Math.round((-latest + centerOffset) / CARD_ITEM);
      setActiveIndex(Math.max(0, Math.min(team.length - 1, idx)));
    });
    return () => unsub();
  }, [x, centerOffset, team.length]);

  const goTo = useCallback(
    (index: number) => {
      const target = -index * CARD_ITEM + centerOffset;
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
      if (Math.abs(delta) > CARD_DRAG_THRESHOLD) hasDragged.current = true;
      const minX = -(CARD_ITEM * (team.length - 1)) - centerOffset + containerWidth - CARD_W;
      const maxX = centerOffset;
      const raw = dragStartVal.current + delta;
      x.set(Math.max(minX, Math.min(maxX, raw)));
    },
    [x, centerOffset, containerWidth, team.length]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const current = x.get();
    const idx = Math.round((-current + centerOffset) / CARD_ITEM);
    goTo(Math.max(0, Math.min(team.length - 1, idx)));
  }, [x, centerOffset, goTo, team.length]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      const current = x.get();
      const idx = Math.round((-current + centerOffset) / CARD_ITEM);
      goTo(Math.max(0, Math.min(team.length - 1, idx)));
    }
  }, [x, centerOffset, goTo, team.length]);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <FadeUp>
        <div className="text-center mb-14 max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
            <Icon name="Users" size={16} /> Meet Our Experts
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            The Team Behind Your Success
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto mt-4 leading-relaxed">
            Dedicated professionals with years of experience in international education
          </p>
        </div>
      </FadeUp>

      {/* Center-focused carousel */}
      <div
        ref={containerRef}
        className="relative w-full cursor-grab active:cursor-grabbing select-none"
        style={{ height: CARD_H + 40 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ x }}
          className="flex items-center absolute top-0 left-0"
        >
          {team.map((m, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={m.name}
                className="flex-shrink-0 relative"
                style={{ width: CARD_W, marginRight: CARD_GAP }}
                animate={{
                  scale: isActive ? 1 : 0.88,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  className="rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100 group"
                  style={{ height: CARD_H }}
                >
                  {/* Photo area / placeholder */}
                  <div className="relative h-[260px] overflow-hidden bg-gradient-to-br from-[#003975]/5 via-slate-50 to-[#00ab18]/5">
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#003975]/[0.06]" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#00ab18]/[0.06]" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full bg-slate-900 flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white">
                        {m.initial}
                      </div>
                    </div>

                    {/* Role badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#003975] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        {m.role.split("/")[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-slate-900">{m.name}</h3>
                    <p className="text-[#003975] text-xs font-medium mt-1">{m.role}</p>

                    {/* Social links */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          onClick={(e) => { if (hasDragged.current) { e.preventDefault(); e.stopPropagation(); } }}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#003975] hover:text-white text-slate-500 flex items-center justify-center transition-colors"
                          aria-label={`${m.name} LinkedIn`}
                        >
                          <Icon name="Linkedin" size={14} />
                        </a>
                      )}
                      {m.email && (
                        <a
                          href={`mailto:${m.email}`}
                          onClick={(e) => { if (hasDragged.current) { e.preventDefault(); e.stopPropagation(); } }}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#003975] hover:text-white text-slate-500 flex items-center justify-center transition-colors"
                          aria-label={`Email ${m.name}`}
                        >
                          <Icon name="Mail" size={14} />
                        </a>
                      )}
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); if (hasDragged.current) e.stopPropagation(); }}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#003975] hover:text-white text-slate-500 flex items-center justify-center transition-colors"
                        aria-label={`${m.name} Phone`}
                      >
                        <Icon name="Phone" size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation dots + arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => activeIndex > 0 && goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Icon name="ChevronLeft" size={18} />
        </button>
        <div className="flex items-center gap-2">
          {team.map((_, i) => (
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
          onClick={() => activeIndex < team.length - 1 && goTo(activeIndex + 1)}
          disabled={activeIndex === team.length - 1}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>
    </section>
  );
}

/* ─── Scroll Typewriter Word ───────────────────────── */

function ScrollWord({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["#cbd5e1", "#0f172a"]);
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.3em]">
      {children}
    </motion.span>
  );
}

function ScrollRevealParagraph({
  text,
  progress,
  startAt = 0,
  endAt = 1,
  className = "",
}: {
  text: string;
  progress: MotionValue<number>;
  startAt?: number;
  endAt?: number;
  className?: string;
}) {
  const words = text.split(" ");
  const rangeSpan = endAt - startAt;
  return (
    <p className={className}>
      {words.map((word, i) => {
        const wordStart = startAt + (i / words.length) * rangeSpan;
        const wordEnd = startAt + ((i + 1) / words.length) * rangeSpan;
        return (
          <ScrollWord key={i} progress={progress} range={[wordStart, wordEnd]}>
            {word}
          </ScrollWord>
        );
      })}
    </p>
  );
}

/* ─── Our Story + Core Values with Scroll Typewriter ─ */

function OurStoryCoreValues() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const storyLine1 =
    "Nexsus Education Consultancy was established with a mission to provide high-quality education guidance to Nepalese students aspiring to study abroad.";
  const storyLine2 =
    "Over the years, we have expanded across 8 countries with 500+ university partnerships, helping 15,000+ students turn their global education dreams into reality.";

  const storyFeatures = [
    { icon: "Users", value: "50+", label: "Expert Counselors" },
    { icon: "ShieldCheck", value: "98%", label: "Visa Success Rate" },
    { icon: "Award", value: "500+", label: "University Partners" },
    { icon: "HeartHandshake", value: "15K+", label: "Students Guided" },
  ];

  return (
    <section ref={containerRef} className="relative py-28 px-6 bg-gray-50 overflow-hidden">
      {/* Decorative grain */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-[20%] w-[400px] h-[400px] rounded-full bg-[#003975]/[0.03] blur-[120px]" />
        <div className="absolute -bottom-32 left-[10%] w-[350px] h-[350px] rounded-full bg-[#00ab18]/[0.03] blur-[100px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section label */}
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
            <Icon name="BookOpen" size={16} /> Our Story
          </div>
        </FadeUp>

        {/* Two-column: Typewriter text left + Stats right */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Left — Typewriter narrative */}
          <div>
            <FadeUp delay={0.05}>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">
                From a Vision to Nepal&apos;s{" "}
                <span className="text-[#003975]">Leading</span>{" "}
                <span className="text-[#00ab18]">Consultancy</span>
              </h2>
            </FadeUp>

            <div className="space-y-6">
              <ScrollRevealParagraph
                text={storyLine1}
                progress={scrollYProgress}
                startAt={0}
                endAt={0.3}
                className="text-xl md:text-2xl font-semibold leading-relaxed tracking-tight"
              />
              <ScrollRevealParagraph
                text={storyLine2}
                progress={scrollYProgress}
                startAt={0.2}
                endAt={0.5}
                className="text-lg leading-relaxed"
              />
            </div>
          </div>

          {/* Right — Stats 2×2 grid */}
          <div className="grid grid-cols-2 gap-5 lg:mt-16">
            {storyFeatures.map((f, i) => (
              <FadeUp key={f.label} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mb-4 shadow-md">
                    <Icon name={f.icon} size={20} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{f.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{f.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Core Values sub-section */}
        <div>
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#003975]" />
              <span className="text-xs font-bold tracking-widest text-[#003975] uppercase">
                Core Values
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
              What Drives Us Forward
            </h3>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.07}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-7 h-full border border-gray-100 shadow-sm group">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                      <Icon name={v.icon} size={22} className="text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h4>
                    <ScrollRevealParagraph
                      text={v.description}
                      progress={scrollYProgress}
                      startAt={0.45 + i * 0.08}
                      endAt={0.65 + i * 0.08}
                      className="text-sm leading-relaxed"
                    />
                  </div>
                </HoverCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Component ────────────────────────────────────── */

export default function AboutPage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="pt-20">
      {/* Hero — Clean white concept */}
      <section className="relative pt-28 pb-20 px-6 bg-white overflow-hidden">
        {/* Subtle decorative mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#003975]/[0.03] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#00ab18]/[0.03] blur-3xl" />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text */}
            <div>
              <FadeUp>
                <span className="text-xs font-bold tracking-widest text-[#003975] uppercase">
                  About Nexsus
                </span>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mt-4 mb-6 leading-tight">
                  Empowering Students to{" "}
                  <span className="text-[#003975]">Achieve Global</span>{" "}
                  <span className="text-[#00ab18]">Dreams</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.12}>
                <p className="text-lg text-slate-500 max-w-xl mb-8 leading-relaxed">
                  Since 2010, Nexsus Education Consultancy has provided
                  high-quality guidance to students pursuing international
                  education across 8 countries — building partnerships with 500+
                  universities worldwide.
                </p>
              </FadeUp>
              <FadeUp delay={0.16}>
                <div className="flex flex-wrap gap-3 mb-12">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 bg-[#003975] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#002d5e] transition shadow-lg shadow-blue-900/15"
                  >
                    Book Free Consultation
                    <Icon name="ArrowRight" size={16} />
                  </Link>
                  <Link
                    href="/destinations"
                    className="inline-flex items-center gap-2.5 border border-gray-300 text-slate-700 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition"
                  >
                    Explore Destinations
                  </Link>
                </div>
              </FadeUp>

              {/* Stats Row */}
              <FadeUp delay={0.22}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-3xl font-bold text-slate-900">
                        <AnimatedCounter value={s.value} />
                        {s.suffix}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right — Visual Mosaic */}
            <FadeRight delay={0.15}>
              <div className="relative">
                {/* Main large photo */}
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/contact/image.png"
                    alt="Nexsus Office"
                    width={640}
                    height={420}
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* Floating accent card — top-right */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -top-6 -right-4 md:right-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#003975] flex items-center justify-center">
                      <Icon name="Award" size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">10+</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Years of Excellence</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating accent card — bottom-left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="absolute -bottom-6 -left-4 md:left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00ab18] flex items-center justify-center">
                      <Icon name="GraduationCap" size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">15K+</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Students Placed</p>
                    </div>
                  </div>
                </motion.div>

                {/* Tagline badge */}
                <div className="absolute bottom-4 right-6 bg-[#003975]/90 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full z-10">
                  &ldquo;Pathway to Your Success&rdquo;
                </div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Our Story + Core Values — Scroll Typewriter Section */}
      <OurStoryCoreValues />

      {/* Timeline */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
                <Icon name="Calendar" size={16} /> Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Milestones</h2>
            </div>
          </FadeUp>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#003975] to-[#00ab18]" />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <FadeUp key={t.year} delay={i * 0.1}>
                  <div className="flex gap-8 items-start">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, type: "spring" }}
                      className="relative z-10 w-16 h-16 rounded-full bg-white border-4 border-[#003975] flex items-center justify-center flex-shrink-0 shadow-md"
                    >
                      <span className="text-xs font-bold text-[#003975]">{t.year}</span>
                    </motion.div>
                    <div className="pt-3">
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">{t.title}</h3>
                      <p className="text-slate-500">{t.description}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Managing Director's Message */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left – Photo Card */}
            <FadeLeft>
              <div className="relative">
                {/* "10+ Years" badge */}
                <div className="absolute -top-3 -left-3 z-20 bg-[#003975] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  10+ Years
                </div>

                {/* Card with green accent border */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-gray-100 shadow-xl bg-white max-w-[380px]">
                  {/* Green bottom-left accent */}
                  <div className="absolute bottom-0 left-0 w-14 h-14 bg-[#00ab18] rounded-tr-[2rem] z-10" />

                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src="/MD.png"
                      alt="Bishnu Khadka – Managing Director"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 pb-5 pt-14">
                    <h3 className="text-lg font-bold text-white">Bishnu Khadka</h3>
                    <p className="text-[#00ab18] text-sm font-medium">Managing Director</p>
                  </div>
                </div>
              </div>
            </FadeLeft>

            {/* Right – Message */}
            <FadeRight>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-8 bg-[#003975] rounded-full" />
                  <span className="text-xs font-bold tracking-widest text-[#003975] uppercase">
                    Managing Director&apos;s Message
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 leading-tight">
                  Leading with Vision<br />&amp; Commitment
                </h2>

                {/* Quote block */}
                <div className="relative mb-6">
                  <span className="text-5xl leading-none text-[#003975] font-serif absolute -top-2 -left-1 select-none">
                    &ldquo;
                  </span>
                  <p className="pl-7 text-slate-500 italic leading-relaxed">
                    At Nexsus Education Consultancy, our mission is simple yet profound: to provide
                    tailored guidance and unwavering support for students seeking global education
                    opportunities.
                  </p>
                </div>

                <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
                  <p>
                    For <strong className="text-slate-900">10 years</strong>, we have been committed
                    to helping students across Nepal realize their dreams of studying abroad. This
                    dedication has allowed us to make a tangible, positive impact on their educational
                    journeys.
                  </p>
                  <p>
                    Under my leadership, Nexsus Education Consultancy has grown into a beacon of hope
                    for students, inspiring them to pursue global opportunities through education.
                    With offices strategically located in Nepal and strong operational support from
                    Australia, we are continuously expanding our reach worldwide.
                  </p>
                </div>

                {/* Signature line */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-[#003975]" />
                  <div className="w-8 h-0.5 bg-[#00ab18]" />
                </div>
                <p className="mt-3 font-semibold text-slate-900 italic text-sm">
                  Thank you for trusting us with your future.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  ~ Bishnu Khadka, Managing Director
                </p>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Team – Draggable Slider */}
      <TeamSliderSection team={team} />

      {/* Branches Map */}
      <BranchesMapSection />

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
                <Icon name="MessageCircle" size={16} /> Testimonials
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Student Success Stories</h2>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <HoverCard>
                  <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-100">
                    <div className="text-4xl text-[#003975] opacity-20 mb-4">&ldquo;</div>
                    <p className="text-slate-600 mb-6 leading-relaxed">{t.quote}</p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.course}</p>
                        <p className="text-xs text-[#003975]">{t.country}</p>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-24 pb-40 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white relative z-0">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Book a free consultation with our expert counselors and take the first step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
                >
                  Book Free Consultation
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
                >
                  Explore Destinations
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

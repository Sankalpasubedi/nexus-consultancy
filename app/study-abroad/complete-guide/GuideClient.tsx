"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { Icon } from "@/lib/icons";

/* ─── Key Considerations ───────────────────────────── */

const considerations = [
  {
    icon: "GraduationCap",
    title: "Academic Fit",
    description:
      "Choose programs that align with your interests, strengths, and long-term career goals.",
  },
  {
    icon: "DollarSign",
    title: "Financial Planning",
    description:
      "Understand the full cost of studying abroad and plan your finances realistically.",
  },
  {
    icon: "Briefcase",
    title: "Career Prospects",
    description:
      "Evaluate how your chosen destination supports your career growth during and after studies.",
  },
  {
    icon: "Globe",
    title: "Cultural Fit",
    description:
      "Consider how comfortable and supported you'll feel in a new environment.",
  },
];

/* ─── Timeline Milestones ──────────────────────────── */

const milestones = [
  {
    title: "12-18 Months Before",
    icon: "Search",
    tasks: [
      "Research potential study destinations and shortlisted universities",
      "Assess your academic profile and eligibility requirements",
      "Start preparing for English language proficiency tests (IELTS, PTE, TOEFL, etc.)",
      "Begin saving and budgeting for application and test-related costs",
      "Attend education fairs, info sessions, and university webinars to gain insights",
    ],
  },
  {
    title: "9-12 Months Before",
    icon: "BookOpen",
    tasks: [
      "Shortlist 5-8 universities based on fit and budget",
      "Take English language proficiency tests (IELTS/TOEFL)",
      "Take standardized tests if required (GRE/GMAT)",
      "Request letters of recommendation",
      "Start drafting your Statement of Purpose (SOP) and essays",
    ],
  },
  {
    title: "6-9 Months Before",
    icon: "FileText",
    tasks: [
      "Finalize your Statement of Purpose",
      "Complete and submit university applications",
      "Upload all required academic and supporting documents",
      "Apply for scholarships and financial aid",
      "Track application deadlines carefully",
    ],
  },
  {
    title: "3-6 Months Before",
    icon: "CheckCircle",
    tasks: [
      "Receive and review admission decisions",
      "Accept your preferred offer and pay deposit if required",
      "Arrange financial proof for visa application",
      "Begin the student visa application process",
      "Apply for on-campus or off-campus accommodation",
    ],
  },
  {
    title: "1-3 Months Before",
    icon: "ShieldCheck",
    tasks: [
      "Attend visa interview (if applicable)",
      "Receive visa approval",
      "Book flight tickets",
      "Arrange health and travel insurance",
      "Attend pre-departure orientation or briefing",
    ],
  },
  {
    title: "Final Month Before Departure",
    icon: "Plane",
    tasks: [
      "Pack essentials and important documents",
      "Inform the university of your arrival details",
      "Arrange airport pickup if required",
      "Notify your bank of international travel",
      "Say goodbye, take a deep breath... and depart! ✈",
    ],
  },
];

/* ─── Component ────────────────────────────────────── */

export default function GuidePage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="pt-20">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative py-20 md:py-28 px-6 bg-white overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ab18]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#003975]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <Link
              href="/study-abroad"
              className="inline-flex items-center gap-2 text-slate-400 text-sm mb-6 hover:text-slate-600 transition font-medium"
            >
              <Icon name="ArrowRight" size={14} className="rotate-180" /> Back
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              Study Abroad
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 max-w-3xl leading-tight">
              Your Guide to Studying Abroad
            </h1>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed mb-8">
              Your complete roadmap to studying overseas. From initial research to landing at your destination — we&apos;ve got you covered.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-slate-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition"
              >
                Download Guide
                <Icon name="ArrowRight" size={16} />
              </Link>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ KEY CONSIDERATIONS ═══════════ */}
      <section className="py-16 px-6 bg-[#fafaf8] border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-xs font-medium text-slate-500 border border-gray-200 shadow-sm mb-4">
                Key Considerations
              </span>
              <p className="text-sm text-slate-500 max-w-lg mx-auto">
                Important factors to evaluate when planning your study abroad journey
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {considerations.map((item) => (
              <StaggerItem key={item.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full text-center hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-[#00ab18]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon name={item.icon} size={24} className="text-[#00ab18]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════ TIMELINE PATH ═══════════ */}
      <TimelineSection />

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#fafaf8] border-t border-gray-100">
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to<br />Begin Your Journey?
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
              Get personalized guidance from our expert counselors and turn your study abroad dreams into reality.
            </p>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-slate-900 text-white px-8 py-4 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl transition"
              >
                Start Your Application
                <Icon name="ArrowRight" size={16} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════
   TIMELINE SECTION — S-curve path connecting cards
   ═══════════════════════════════════════════════════════ */

function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [svgPath, setSvgPath] = useState("");
  const [dotPositions, setDotPositions] = useState<{ x: number; y: number }[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);

  const computePath = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setContainerHeight(container.scrollHeight);

    const points: { x: number; y: number }[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const isLeft = i % 2 === 0;
      const y = cardRect.top - rect.top + cardRect.height / 2;
      // Dot on the opposite side of the card (the "path" side)
      const x = isLeft
        ? cardRect.right - rect.left + 30
        : cardRect.left - rect.left - 30;
      points.push({ x, y });
    });

    if (points.length < 2) return;
    setDotPositions(points);

    // Build smooth S-curve SVG path using cubic beziers
    let d = `M ${points[0].x} ${points[0].y - 60}`;
    d += ` L ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const midY = (curr.y + next.y) / 2;
      d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
    }

    const last = points[points.length - 1];
    d += ` L ${last.x} ${last.y + 60}`;

    setSvgPath(d);
  }, []);

  useEffect(() => {
    // Compute after initial layout & animations settle
    const timer = setTimeout(computePath, 600);
    window.addEventListener("resize", computePath);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", computePath);
    };
  }, [computePath]);

  return (
    <section className="py-20 md:py-28 px-6 bg-white overflow-hidden relative">
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[#00ab18]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#003975]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <FadeUp>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                <Icon name="Plane" size={20} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                A Guide to Studying Abroad
              </h2>
            </div>
            <p className="text-slate-500 max-w-lg">
              Your complete roadmap to studying overseas
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                Download Guide <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </FadeUp>
        </div>

        {/* Timeline cards + SVG overlay */}
        <div ref={containerRef} className="relative">
          {/* ── SVG S-curve path (desktop) ── */}
          {svgPath && (
            <svg
              className="hidden md:block absolute top-0 left-0 w-full pointer-events-none z-0"
              height={containerHeight}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={svgPath} stroke="#c6f0c6" strokeWidth="2.5" fill="none" />
            </svg>
          )}

          {/* ── Dots on the path (desktop) ── */}
          {dotPositions.map((pos, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="hidden md:block absolute z-10"
              style={{ left: pos.x - 10, top: pos.y - 10 }}
            >
              <div className="w-5 h-5 rounded-full bg-gray-300 border-[3px] border-white shadow-md" />
            </motion.div>
          ))}

          {/* ── Mobile: simple left line ── */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5">
            <div className="w-full h-full bg-gradient-to-b from-[#c6f0c6] via-[#c6f0c6] to-transparent" />
          </div>

          {/* ── Cards ── */}
          <div className="space-y-8 md:space-y-10">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Mobile dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                    className="md:hidden absolute left-6 top-8 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-gray-300 border-[3px] border-white shadow-sm"
                  />

                  {/* Card row */}
                  <div className="md:flex md:items-start">
                    {!isLeft && <div className="hidden md:block md:w-[50%]" />}
                    <motion.div
                      ref={(el) => { cardRefs.current[index] = el; }}
                      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className={`ml-12 md:ml-0 md:w-[50%] relative z-[5] ${
                        isLeft ? "md:pr-[8%]" : "md:pl-[8%]"
                      }`}
                    >
                      <div className="bg-white rounded-2xl p-6 md:p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow relative group overflow-hidden">
                        {/* Left accent bar */}
                        <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-gray-200 rounded-full" />

                        {/* Card header */}
                        <div className="flex items-center gap-3 mb-4 pl-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon name={milestone.icon} size={18} className="text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {milestone.title}
                          </h3>
                        </div>

                        {/* Tasks */}
                        <ul className="space-y-2.5 pl-3">
                          {milestone.tasks.map((task, taskIdx) => (
                            <motion.li
                              key={taskIdx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.15 + taskIdx * 0.05, duration: 0.4 }}
                              className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0 mt-2" />
                              {task}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Decorative corner */}
                        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-lg bg-gray-100/60 opacity-40 group-hover:opacity-70 transition-opacity" />
                      </div>
                    </motion.div>
                    {isLeft && <div className="hidden md:block md:w-[50%]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
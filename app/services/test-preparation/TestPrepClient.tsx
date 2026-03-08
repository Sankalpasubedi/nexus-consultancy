"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useEffect, useRef, useMemo } from "react";
import { exams } from "./examData";

/* ─── Animated Plane on SVG Path with Loop ─── */
function AnimatedPlaneOnPath({ 
  pathId,
  delay, 
  duration,
}: { 
  pathId: string;
  delay: number; 
  duration: number; 
}) {
  const gRef = useRef<SVGGElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pathRef = useRef<SVGPathElement | null>(null);
  const pathLengthRef = useRef<number>(0);

  useEffect(() => {
    // Get the path element
    const el = document.getElementById(pathId);
    if (el && el instanceof SVGPathElement) {
      pathRef.current = el;
      pathLengthRef.current = el.getTotalLength();
    }
  }, [pathId]);

  useEffect(() => {
    if (!gRef.current) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      if (!pathRef.current || pathLengthRef.current === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = ((elapsed + delay * 1000) % (duration * 1000)) / (duration * 1000);
      
      const length = progress * pathLengthRef.current;
      const point = pathRef.current.getPointAtLength(length);
      
      // Get tangent by sampling two nearby points
      const delta = 0.5;
      const p1 = pathRef.current.getPointAtLength(Math.max(0, length - delta));
      const p2 = pathRef.current.getPointAtLength(Math.min(pathLengthRef.current, length + delta));
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

      if (gRef.current) {
        gRef.current.setAttribute(
          "transform",
          `translate(${point.x}, ${point.y}) rotate(${angle + 90})`
        );
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      startTimeRef.current = 0;
    };
  }, [pathId, delay, duration]);

  return (
    <g ref={gRef} opacity={0.7}>
      {/* Airplane icon */}
      <g transform="scale(0.5) translate(-12, -12)">
        <path
          d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
          fill="#003975"
        />
      </g>
    </g>
  );
}

/* ─── Flight Lines Background with Loops ─── */
function FlightLinesBackground() {
  // Paths with circular loops
  // Path 1: Left to right with loop at top-left area
  // Path 2: Right to left with loop at bottom-right area
  const paths = useMemo(() => [
    {
      id: "flight-path-1",
      // Start from left, curve down, make a circular loop, continue to right
      d: "M -50 200 Q 100 200 155 150 A 45 45 0 1 1 150 155 Q 220 95 450 80 Q 650 65 850 100",
      delay: 0,
      duration: 14,
    },
    {
      id: "flight-path-2",
      // Start from right, go left with loop at bottom-right (clockwise: right->top->left->bottom->right)
      d: "M 900 420 Q 780 450 680 480 A 50 50 0 1 1 681 480 Q 550 510 300 500 Q 100 490 -50 510",
      delay: 0.5,
      duration: 15,
    },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      <svg 
        viewBox="0 0 800 600" 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Curved dashed lines with loops */}
        {paths.map((path) => (
          <path
            key={path.id}
            id={path.id}
            d={path.d}
            fill="none"
            stroke="#003975"
            strokeWidth={1.5}
            strokeDasharray="10 8"
            opacity={0.2}
          />
        ))}
        
        {/* Animated planes following each path */}
        {paths.map((path) => (
          <AnimatedPlaneOnPath
            key={`plane-${path.id}`}
            pathId={path.id}
            delay={path.delay}
            duration={path.duration}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────── */

const whyChooseUs = [
  {
    icon: "Users",
    title: "Expert Trainers",
    description: "Certified instructors with 10+ years of experience and deep knowledge of exam patterns & scoring criteria.",
    stat: "15+",
    statLabel: "Trainers",
  },
  {
    icon: "Target",
    title: "Proven Strategies",
    description: "Time-tested techniques and strategies that have helped thousands of students achieve their target scores.",
    stat: "95%",
    statLabel: "Success Rate",
  },
  {
    icon: "BookOpen",
    title: "Comprehensive Materials",
    description: "Up-to-date study materials, practice tests, and resources curated by experts for maximum effectiveness.",
    stat: "500+",
    statLabel: "Practice Tests",
  },
  {
    icon: "TrendingUp",
    title: "Score Improvement",
    description: "Our students see an average improvement of 1.5 bands in IELTS and 15+ points in TOEFL after our coaching.",
    stat: "1.5+",
    statLabel: "Band Increase",
  },
];

const preparationProcess = [
  { step: "01", icon: "ClipboardList", title: "Diagnostic Assessment", description: "Take a free diagnostic test to identify your current proficiency level and pinpoint areas that need improvement." },
  { step: "02", icon: "Target", title: "Personalized Study Plan", description: "Receive a customized study plan based on your target score, timeline, and individual strengths and weaknesses." },
  { step: "03", icon: "BookOpen", title: "Intensive Training", description: "Attend expert-led classes covering all test sections with proven strategies, tips, and extensive practice sessions." },
  { step: "04", icon: "Monitor", title: "Mock Tests & Practice", description: "Take regular full-length mock tests under real exam conditions with detailed performance analytics and feedback." },
  { step: "05", icon: "Sparkles", title: "Final Review & Exam Day", description: "Last-minute tips, confidence-building sessions, and complete guidance on exam day procedures and strategies." },
];

const faqs = [
  { q: "How long does it take to prepare for IELTS?", a: "Typically 4–8 weeks of focused preparation, depending on your current level. Students with a strong English foundation may need less time." },
  { q: "Do you offer online classes?", a: "Yes! We offer both in-person and online classes for all test preparations. Our online platform includes live interactive sessions, recorded lectures, and digital practice materials." },
  { q: "What is the average score improvement?", a: "Our students typically see an improvement of 1–2 bands in IELTS, 15–25 points in TOEFL, and 10–15 points in PTE within 6–8 weeks of preparation." },
  { q: "Do you provide study materials?", a: "Absolutely. All enrolled students receive comprehensive study materials including textbooks, practice tests, vocabulary lists, and access to our online learning portal." },
  { q: "Can I take a free demo class?", a: "Yes, we offer a free demo class and diagnostic test for all our courses. This helps you experience our teaching methodology and assess your starting level." },
];

/* ─── Component ────────────────────────────────────── */

export default function TestPreparationPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[440px] md:min-h-[500px] overflow-hidden">
        <Image src="/contact/image.png" alt="Students preparing for tests" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002550]/75 via-[#003a75]/60 to-[#004a8f]/35" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#003975] to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeUp>
                <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wide border border-white/20">
                  <Icon name="BookOpen" size={12} className="inline mr-1.5 -mt-0.5" /> Test Preparation
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-2xl leading-[1.15]">
                  Ace Your Exams,<br />Unlock Your Future
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed mb-8">
                  Expert coaching for IELTS, TOEFL, PTE, GRE, SAT, and GMAT. Our proven strategies and personalized approach help you achieve your target scores.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition">
                    Book Free Demo <Icon name="ArrowRight" size={14} />
                  </Link>
                  <Link href="#exams" className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition">
                    View All Exams
                  </Link>
                </div>
              </FadeUp>
            </div>
            {/* Floating Accent Image */}
            <div className="hidden lg:block relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative w-64 h-64 ml-auto group"
              >
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 -rotate-3 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/services/NEX-_-11.jpg"
                    alt="Test preparation"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#003975]/10 flex items-center justify-center">
                    <Icon name="Award" size={16} className="text-[#003975]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">95% Success Rate</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar — Dark Navy ── */}
      <section className="py-10 md:py-14 bg-[#004a8f]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "10,000+", label: "Students Trained" },
              { num: "95%", label: "Target Score Achieved" },
              { num: "15+", label: "Expert Trainers" },
              { num: "6+", label: "Exam Types Covered" },
            ].map((s) => (
              <FadeUp key={s.label}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">{s.num}</div>
                  <div className="text-sm text-blue-200 mt-1.5">{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exams — 2‑col Horizontal Cards ── */}
      <section id="exams" className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                Comprehensive Prep
              </span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">
                Exams We Prepare You For
              </h2>
              <p className="text-slate-500 text-base max-w-lg mx-auto">
                From English proficiency to graduate admissions, we cover all major standardized tests
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-5">
            {exams.map((exam) => (
              <StaggerItem key={exam.title}>
                <HoverCard>
                  <Link
                    href={`/services/test-preparation/${exam.slug}`}
                    className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all overflow-hidden h-full flex w-full text-left cursor-pointer group"
                  >
                    {/* Left accent + icon */}
                    <div className="w-[88px] md:w-[100px] bg-slate-800 group-hover:bg-[#003975] transition-colors flex flex-col items-center justify-center gap-2 flex-shrink-0 py-6 text-white">
                      <Icon name={exam.icon} size={24} />
                      <div className="text-lg font-bold leading-none">{exam.stat}</div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-300">{exam.statLabel}</div>
                    </div>
                    {/* Right content */}
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-0.5 group-hover:text-[#003975] transition-colors">{exam.title}</h3>
                          <p className="text-[11px] text-slate-400 font-medium mb-2">{exam.subtitle}</p>
                        </div>
                        <Icon name="ArrowUpRight" size={18} className="text-slate-300 group-hover:text-[#003975] transition-colors flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{exam.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {exam.features.map((f) => (
                          <span key={f} className="flex items-center gap-1.5 text-[13px] text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#003975] flex-shrink-0" /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Preparation Process — Vertical Timeline ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="BookOpen" size={22} className="text-slate-400" />
                  <h2 className="text-3xl md:text-[40px] font-bold text-slate-900">Our Preparation Process</h2>
                </div>
                <p className="text-slate-500 text-sm mt-1">A structured, proven approach to help you reach your target score</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm transition self-start sm:self-auto">
                Start Preparing <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>

          <div className="relative">
            <div className="absolute left-[29px] top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            <div className="space-y-6">
              {preparationProcess.map((step, i) => (
                <FadeUp key={step.step} delay={i * 0.08}>
                  <div className="flex gap-6 md:gap-8 items-start">
                    <div className="relative z-10 flex-shrink-0 w-[58px] h-[58px] rounded-2xl bg-[#003975] text-white flex items-center justify-center text-lg font-bold shadow-lg">
                      {step.step}
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex-1 shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon name={step.icon} size={16} className="text-[#003975]" />
                        <h3 className="font-semibold text-slate-900 text-[15px]">{step.title}</h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us — 4‑col ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">Why NEXSUS</span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">Why Choose Our Test Prep?</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">Expert guidance backed by results — not just classes, but a complete preparation ecosystem</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseUs.map((f) => (
              <StaggerItem key={f.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:border-[#003975]/20 transition-colors group">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center">
                        <Icon name={f.icon} size={20} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#003975]">{f.stat}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">{f.statLabel}</div>
                      </div>
                    </div>
                    <h4 className="text-[15px] font-semibold text-slate-900 mb-2 group-hover:text-[#003975] transition-colors">{f.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">
        <FlightLinesBackground />
        <div className="max-w-[800px] mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
              <p className="text-slate-500 text-sm">Everything you need to know about our test preparation programs</p>
            </div>
          </FadeUp>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-3 text-[15px]">
                    <span className="w-7 h-7 rounded-full bg-[#003975] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">Q</span>
                    {faq.q}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed pl-10">{faq.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-4 leading-tight">
              Ready to Start<br />Your Test Prep Journey?
            </h2>
            <p className="text-slate-500 mb-8 text-base max-w-md mx-auto">
              Book a free diagnostic test and consultation with our expert trainers today. Your target score is just a few weeks away.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-800 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-700 transition shadow-lg">
                Book Free Demo Class <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

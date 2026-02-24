"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { Icon } from "@/lib/icons";

/* ─── Data ─────────────────────────────────────────── */

const steps = [
  {
    step: 1,
    title: "Research & Shortlist",
    timeline: "2-3 months before",
    icon: "Search",
    gradient: "from-[#003975] to-[#006BDB]",
    tasks: [
      "Free counselling session with our experts",
      "Profile assessment and goal alignment",
      "Shortlist 5-8 universities",
      "Compare programs, costs, and locations",
    ],
  },
  {
    step: 2,
    title: "Test Preparation",
    timeline: "3-6 months before",
    icon: "BookOpen",
    gradient: "from-[#006EE2] to-[#17C1FF]",
    tasks: [
      "IELTS/TOEFL/PTE preparation",
      "GRE/GMAT/SAT coaching (if needed)",
      "Practice tests and mock exams",
      "Score improvement strategies",
    ],
  },
  {
    step: 3,
    title: "Application & Documents",
    timeline: "2-3 months before deadline",
    icon: "FileText",
    gradient: "from-[#1D92FF] to-[#00CCCC]",
    tasks: [
      "SOP and essay writing support",
      "Transcript collection and verification",
      "Application form completion",
      "Application fee payment",
    ],
  },
  {
    step: 4,
    title: "Offer & Acceptance",
    timeline: "After receiving offer",
    icon: "CheckCircle",
    gradient: "from-[#00CCCC] to-[#16FE9D]",
    tasks: [
      "Compare offers from multiple universities",
      "Check scholarship opportunities",
      "Accept offer and get Confirmation of Enrollment",
      "Pay tuition deposit",
    ],
  },
  {
    step: 5,
    title: "Visa Application",
    timeline: "2-4 months before departure",
    icon: "ShieldCheck",
    gradient: "from-[#16FE9D] to-[#00FF7F]",
    tasks: [
      "Prepare visa documents",
      "Show financial capacity",
      "Health insurance (OSHC)",
      "Visa interview preparation",
    ],
  },
  {
    step: 6,
    title: "Pre-Departure",
    timeline: "1-2 months before",
    icon: "Plane",
    gradient: "from-[#00CE3A] to-[#00AB18]",
    tasks: [
      "Book flights and accommodation",
      "Pre-departure orientation",
      "Foreign exchange and banking",
      "Packing and travel preparation",
    ],
  },
  {
    step: 7,
    title: "Arrival & Settling In",
    timeline: "Upon arrival",
    icon: "GraduationCap",
    gradient: "from-[#008112] to-[#00D81E]",
    tasks: [
      "Airport pickup arrangement",
      "University enrollment and orientation",
      "Open local bank account",
      "Connect with student community",
    ],
  },
];

/* ─── Full-width slider ────────────────────────────── */

function ProcessSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const cardWidth = 380;
  const gap = 24;

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
    scrollRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
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

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => scrollRef.current?.focus({ preventScroll: true })}
        className="flex gap-6 px-6 overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing select-none outline-none focus:outline-none focus:ring-0"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          touchAction: "pan-x pinch-zoom",
          paddingLeft: "max(1.5rem, calc((100vw - 1440px) / 2 + 1.5rem))",
        }}
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-[380px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="bg-white rounded-3xl p-8 border border-gray-100 h-full shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden">
              {/* Accent line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${s.gradient}`} />

              {/* Step number */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  <Icon name={s.icon} size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Step {s.step}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                </div>
              </div>

              {/* Timeline */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-[#003975] text-xs font-medium mb-5">
                <Icon name="Clock" size={12} className="text-[#003975]" /> {s.timeline}
              </div>

              {/* Tasks */}
              <ul className="space-y-3">
                {s.tasks.map((task) => (
                  <li key={task} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="max-w-[1440px] mx-auto px-6 mt-6">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#003975] to-[#00ab18] rounded-full"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Component ────────────────────────────────────── */

export default function ProcessPage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#004a8f] via-[#003a75] to-[#002550] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <FadeUp>
            <Link href="/study-abroad" className="inline-flex items-center gap-2 text-white/70 text-sm mb-4 hover:text-white transition">
              ← Study Abroad
            </Link>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
              Application <span className="text-[#00ab18]">Process</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl text-blue-100 max-w-2xl">
              A 7-step roadmap from research to arrival. We guide you through every stage.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Process Slider */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 mb-12">
          <FadeUp>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="Map" size={16} className="text-slate-600" /> Step by Step
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Your Journey, Simplified</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Scroll through each step — or use the arrows to navigate
              </p>
            </div>
          </FadeUp>
        </div>
        <ProcessSlider />
      </section>

      {/* Quick Tips */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Quick Tips</h2>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "Calendar", title: "Start Early", description: "Begin your preparation at least 12 months before your intended intake." },
              { icon: "BarChart3", title: "Stay Organized", description: "Use a checklist to track every document and deadline." },
              { icon: "Users", title: "Seek Expert Help", description: "Our counselors simplify the process and prevent costly mistakes." },
            ].map((tip) => (
              <StaggerItem key={tip.title}>
                <HoverCard>
                  <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100 h-full">
                    <div className="flex justify-center mb-4">
                      <Icon name={tip.icon} size={40} className="text-[#003975]" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{tip.title}</h3>
                    <p className="text-slate-500 text-sm">{tip.description}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#004a8f] to-[#003a75] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin?</h2>
            <p className="text-blue-100 mb-8">Contact us for a free consultation and we&apos;ll create your personalized application timeline.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold shadow-lg">
                Start My Application →
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

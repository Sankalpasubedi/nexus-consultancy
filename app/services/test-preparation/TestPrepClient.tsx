"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp,
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { X } from "lucide-react";

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

/* ─── Exam Detail Modal ─── */
function ExamModal({
  exam,
  isOpen,
  onClose,
}: {
  exam: ExamData | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!exam) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-24 pb-4 px-4 md:px-6"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-7rem)] overflow-hidden mt-4"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-7rem)]">
              {/* Header with image */}
              <div className="relative h-48 md:h-64">
                <Image
                  src={exam.image}
                  alt={exam.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <Icon name={exam.icon} size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">{exam.title}</h2>
                      <p className="text-sm text-white/80">{exam.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <Icon name="Clock" size={20} className="text-[#003975] mx-auto mb-2" />
                    <div className="text-sm font-semibold text-slate-900">{exam.duration}</div>
                    <div className="text-xs text-slate-500">Duration</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <Icon name="CreditCard" size={20} className="text-[#003975] mx-auto mb-2" />
                    <div className="text-sm font-semibold text-slate-900">{exam.fee}</div>
                    <div className="text-xs text-slate-500">Test Fee</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <Icon name="Calendar" size={20} className="text-[#003975] mx-auto mb-2" />
                    <div className="text-sm font-semibold text-slate-900">{exam.validity}</div>
                    <div className="text-xs text-slate-500">Validity</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">About {exam.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{exam.detailedDescription}</p>
                </div>

                {/* Test Sections */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Test Sections</h3>
                  <div className="space-y-3">
                    {exam.sections.map((section, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-lg bg-[#003975] text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{section.name}</h4>
                          <p className="text-sm text-slate-500">{section.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {exam.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#003975]/5 text-[#003975] text-sm font-medium"
                      >
                        <Icon name="Check" size={14} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preparation Tips */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Preparation Tips</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {exam.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="Lightbulb" size={16} className="text-[#00ab18] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#003975] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#002d5e] transition"
                    onClick={onClose}
                  >
                    Enroll Now <Icon name="ArrowRight" size={14} />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-200 text-slate-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition"
                    onClick={onClose}
                  >
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Data ─────────────────────────────────────────── */

interface ExamData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
  stat: string;
  statLabel: string;
  image: string;
  detailedDescription: string;
  sections: { name: string; description: string }[];
  tips: string[];
  duration: string;
  fee: string;
  validity: string;
}

const exams: ExamData[] = [
  {
    title: "IELTS",
    subtitle: "International English Language Testing System",
    description:
      "The world's most popular English proficiency test for study, work, and migration. Accepted by over 11,000 organizations in 140+ countries.",
    features: ["Academic & General Training", "Computer & Paper-based", "Band score 0–9", "Results in 13 days"],
    icon: "BookOpen",
    stat: "3.5M+",
    statLabel: "Tests/Year",
    image: "/services/NEX-_-1.jpg",
    detailedDescription: "IELTS (International English Language Testing System) is the world's most popular English language proficiency test. It assesses your ability to listen, read, write and speak in English, and is designed to reflect how you will use English at study, at work and in everyday life.",
    sections: [
      { name: "Listening", description: "40 minutes - 4 sections with recordings of native English speakers" },
      { name: "Reading", description: "60 minutes - 3 sections with academic or general texts" },
      { name: "Writing", description: "60 minutes - 2 tasks including essay and report/letter" },
      { name: "Speaking", description: "11-14 minutes - Face-to-face interview with examiner" },
    ],
    tips: ["Practice with authentic materials", "Time yourself during practice tests", "Focus on your weak areas", "Learn vocabulary in context"],
    duration: "2 hours 45 minutes",
    fee: "NPR 29,500",
    validity: "2 years",
  },
  {
    title: "TOEFL iBT",
    subtitle: "Test of English as a Foreign Language",
    description:
      "Preferred by universities in the USA, Canada, and worldwide. Measures reading, listening, speaking, and writing in an academic context.",
    features: ["Internet-based test", "Score range 0–120", "Accepted by 12,000+ institutions", "Results in 4–8 days"],
    icon: "Globe",
    stat: "35M+",
    statLabel: "Tests Taken",
    image: "/services/NEX-_-2.jpg",
    detailedDescription: "TOEFL iBT (Test of English as a Foreign Language Internet-Based Test) measures your ability to use and understand English at the university level. It evaluates how well you combine listening, reading, speaking and writing skills to perform academic tasks.",
    sections: [
      { name: "Reading", description: "35 minutes - 2 passages with 10 questions each" },
      { name: "Listening", description: "36 minutes - Lectures and conversations from academic settings" },
      { name: "Speaking", description: "16 minutes - 4 tasks expressing opinions and summarizing" },
      { name: "Writing", description: "29 minutes - Integrated and independent writing tasks" },
    ],
    tips: ["Get familiar with the computer-based format", "Practice note-taking skills", "Build academic vocabulary", "Take full-length practice tests"],
    duration: "About 2 hours",
    fee: "USD 190-200",
    validity: "2 years",
  },
  {
    title: "PTE Academic",
    subtitle: "Pearson Test of English",
    description:
      "Fast, fair computer-based English test ideal for study abroad and immigration. Accepted by thousands of institutions globally.",
    features: ["AI-scored for fairness", "Results in 48 hours", "Score range 10–90", "Flexible test dates"],
    icon: "Monitor",
    stat: "99%",
    statLabel: "Acceptance",
    image: "/services/NEX-_-3.jpg",
    detailedDescription: "PTE Academic is a computer-based English language test trusted by universities, colleges and governments around the world. It uses AI technology to score your test, ensuring fast, accurate and unbiased results.",
    sections: [
      { name: "Speaking & Writing", description: "54-67 minutes - Personal introduction, read aloud, essays" },
      { name: "Reading", description: "29-30 minutes - Multiple choice, reorder paragraphs, fill blanks" },
      { name: "Listening", description: "30-43 minutes - Summarize spoken text, multiple choice, dictation" },
    ],
    tips: ["Practice speaking clearly into a microphone", "Improve your typing speed", "Master time management", "Understand the AI scoring criteria"],
    duration: "Approximately 2 hours",
    fee: "USD 210-270",
    validity: "2 years",
  },
  {
    title: "GRE",
    subtitle: "Graduate Record Examination",
    description:
      "Required for graduate school admission in the US and other countries. Tests verbal reasoning, quantitative reasoning, and analytical writing.",
    features: ["Verbal & Quantitative", "Score range 130–170/section", "5-year score validity", "At home or test center"],
    icon: "BarChart3",
    stat: "700K+",
    statLabel: "Tests/Year",
    image: "/services/NEX-_-4.jpg",
    detailedDescription: "The GRE General Test measures verbal reasoning, quantitative reasoning, critical thinking and analytical writing skills that have been developed over a long period of time and are not related to any specific field of study.",
    sections: [
      { name: "Analytical Writing", description: "60 minutes - Analyze an issue and analyze an argument" },
      { name: "Verbal Reasoning", description: "60 minutes - Reading comprehension, text completion, sentence equivalence" },
      { name: "Quantitative Reasoning", description: "70 minutes - Arithmetic, algebra, geometry, data analysis" },
    ],
    tips: ["Build a strong vocabulary foundation", "Review math fundamentals", "Practice argument analysis", "Use official ETS materials"],
    duration: "About 3 hours 45 minutes",
    fee: "USD 220",
    validity: "5 years",
  },
  {
    title: "SAT",
    subtitle: "Scholastic Assessment Test",
    description:
      "Standardized test for undergraduate admissions in the US. Measures math, evidence-based reading, and writing skills.",
    features: ["Digital adaptive test", "Score range 400–1600", "Accepted worldwide", "Multiple test dates"],
    icon: "Star",
    stat: "2.2M+",
    statLabel: "Students/Year",
    image: "/services/NEX-_-5.jpg",
    detailedDescription: "The SAT is a standardized test widely used for college admissions in the United States. The new digital SAT is shorter, more secure, and provides faster results while still measuring the skills and knowledge that matter most for college and career readiness.",
    sections: [
      { name: "Reading & Writing", description: "64 minutes - 2 modules with reading comprehension and grammar" },
      { name: "Math", description: "70 minutes - 2 modules covering algebra, geometry, and data analysis" },
    ],
    tips: ["Practice with Khan Academy's free resources", "Master time management", "Understand the adaptive format", "Review algebra and data analysis thoroughly"],
    duration: "About 2 hours 14 minutes",
    fee: "USD 60 (international fees apply)",
    validity: "5 years",
  },
  {
    title: "GMAT",
    subtitle: "Graduate Management Admission Test",
    description:
      "The gold standard for MBA and business school admissions globally. Assesses analytical, writing, quantitative, and verbal skills.",
    features: ["Focus Edition available", "Score range 205–805", "Accepted by 7,700+ programs", "5-year validity"],
    icon: "Briefcase",
    stat: "200K+",
    statLabel: "Tests/Year",
    image: "/services/NEX-_-6.jpg",
    detailedDescription: "The GMAT is a computer-adaptive test that measures analytical writing and problem-solving abilities, along with data sufficiency, logic, and critical reasoning skills. It is specifically designed to predict success in graduate business programs.",
    sections: [
      { name: "Quantitative Reasoning", description: "45 minutes - Data sufficiency and problem solving" },
      { name: "Verbal Reasoning", description: "45 minutes - Reading comprehension, critical reasoning, sentence correction" },
      { name: "Data Insights", description: "45 minutes - Data interpretation, multi-source reasoning, graphics interpretation" },
    ],
    tips: ["Focus on data interpretation skills", "Practice critical reasoning daily", "Master sentence correction patterns", "Take official GMAT practice tests"],
    duration: "About 2 hours 15 minutes",
    fee: "USD 275",
    validity: "5 years",
  },
];

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
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((exam: ExamData) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing exam data for exit animation
    setTimeout(() => setSelectedExam(null), 200);
  }, []);

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
                className="relative w-64 h-64 ml-auto"
              >
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 -rotate-3">
                  <Image
                    src="/services/NEX-_-11.jpg"
                    alt="Test preparation"
                    fill
                    className="object-cover"
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
                  <button
                    onClick={() => openModal(exam)}
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
                  </button>
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

      {/* Exam Detail Modal */}
      <ExamModal exam={selectedExam} isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}

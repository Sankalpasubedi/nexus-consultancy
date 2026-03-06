"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { Icon } from "@/lib/icons";

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
  const paths = useMemo(() => [
    {
      id: "services-flight-path-1",
      d: "M -50 200 Q 100 200 155 150 A 45 45 0 1 1 150 155 Q 220 95 450 80 Q 650 65 850 100",
      delay: 0,
      duration: 14,
    },
    {
      id: "services-flight-path-2",
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
        {paths.map((path) => (
          <path
            key={path.id}
            id={path.id}
            d={path.d}
            fill="none"
            stroke="#003975"
            strokeWidth={1.5}
            strokeDasharray="10 8"
            opacity={0.15}
          />
        ))}
        
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

const services = [
  {
    id: 1,
    title: "Career Counseling",
    slug: "career-counseling",
    description:
      "Not sure where to start? Our experienced counselors sit down with you, understand your goals, budget, and academic background, then map out a personalized study plan that makes sense for your future.",
    icon: "Compass",
    image: "/services/NEX-_-1.jpg",
    features: ["1-on-1 sessions", "Career pathway mapping", "University shortlisting"],
  },
  {
    id: 2,
    title: "University Application",
    slug: "sop-writing-assistance",
    description:
      "From crafting your Statement of Purpose to organizing transcripts and recommendation letters, we handle the paperwork so you can focus on preparing for your new chapter abroad.",
    icon: "PenLine",
    image: "/services/NEX-_-2.jpg",
    features: ["SOP & essay review", "Document checklist", "Application tracking"],
  },
  {
    id: 3,
    title: "Visa Processing",
    slug: "student-visa-assistance",
    description:
      "With a 98% visa success rate, our visa team knows exactly what embassies look for. We prepare your documents, conduct mock interviews, and guide you every step of the way.",
    icon: "ShieldCheck",
    image: "/services/NEX-_-3.jpg",
    features: ["98% success rate", "Mock interviews", "File preparation"],
  },
  {
    id: 4,
    title: "Test Preparation",
    slug: "test-preparation",
    description:
      "Get exam-ready with our structured IELTS, PTE, TOEFL, and GRE/GMAT prep courses. Small batches, experienced instructors, and real practice tests to get the score you need.",
    icon: "BookOpen",
    image: "/services/NEX-_-4.jpg",
    features: ["IELTS & PTE", "GRE & GMAT", "Real practice tests"],
  },
  {
    id: 5,
    title: "Scholarship Guidance",
    slug: "scholarship-guidance",
    description:
      "Education abroad doesn't have to break the bank. We help you find and apply for scholarships that match your profile. Our students have secured over NPR 5 Billion in scholarships collectively.",
    icon: "Trophy",
    image: "/services/NEX-_-5.jpg",
    features: ["Scholarship matching", "Application support", "Financial planning"],
  },
  {
    id: 6,
    title: "Pre-Departure Support",
    slug: "pre-departure-support",
    description:
      "You got your visa, now what? We help with accommodation bookings, airport pickup arrangements, cultural orientation, and everything you need to feel confident before you fly.",
    icon: "Plane",
    image: "/services/NEX-_-6.jpg",
    features: ["Accommodation help", "Airport pickup", "Cultural briefing"],
  },
];

const CARD_HEIGHT = 550;
const CARD_HEIGHT_MOBILE = 420;
const SPACER_HEIGHT = CARD_HEIGHT + 280;
const SPACER_HEIGHT_MOBILE = CARD_HEIGHT_MOBILE + 200;
const STICKY_TOP = 80;
const STICKY_TOP_MOBILE = 70;

// Per depth level: how much % width shrinks and how much px minWidth shrinks
const WIDTH_SHRINK_PER_DEPTH = 5;    // % — e.g. depth 1 = 95%, depth 2 = 90%
const MIN_WIDTH_SHRINK_PER_DEPTH = 40; // px — e.g. depth 1 minWidth = 100% - 40px

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spacerRefs = useRef<(HTMLDivElement | null)[]>([]);
  // depths is now fractional (0.0–N) for smooth interpolation
  const [depths, setDepths] = useState<number[]>(services.map(() => 0));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardHeight = isMobile ? CARD_HEIGHT_MOBILE : CARD_HEIGHT;
  const spacerHeight = isMobile ? SPACER_HEIGHT_MOBILE : SPACER_HEIGHT;
  const stickyTop = isMobile ? STICKY_TOP_MOBILE : STICKY_TOP;

  const handleScroll = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const newDepths = services.map((_, index) => {
      const spacer = spacerRefs.current[index];
      if (!spacer) return 0;

      const rect = spacer.getBoundingClientRect();
      const isSticky = rect.top <= stickyTop;
      if (!isSticky) return 0;

      // Fractional depth: sum up how far each later card has scrolled in
      let depth = 0;
      for (let j = index + 1; j < services.length; j++) {
        const laterSpacer = spacerRefs.current[j];
        if (!laterSpacer) continue;
        const laterRect = laterSpacer.getBoundingClientRect();
        // if (laterRect.top <= stickyTop) {
        //   const rawProgress = (stickyTop - laterRect.top) / cardHeight;
        //   depth += Math.min(1, Math.max(0, rawProgress));
        // }

        const triggerStart = viewportHeight; 
        const triggerEnd = stickyTop;     

        const rawProgress = (triggerStart - laterRect.top) / (triggerStart - triggerEnd);
        const progress = Math.min(1, Math.max(0, rawProgress));
        if (progress > 0) {
          depth += progress;
        }
      }
      return depth;
    });

    setDepths(newDepths);
  }, [stickyTop]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-white border-t border-gray-200">
      {/* Sticky Flight Animation Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: 0 }}>
          <FlightLinesBackground />
        </div>
      </div>
      
      <div className="max-w-[1500px] mx-auto relative z-10">
        <FadeUp>
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 mb-4 md:mb-6 rounded-full bg-slate-50 text-slate-600 text-xs md:text-sm font-medium border border-gray-200/80 shadow-sm">
              <Icon name="Zap" size={14} className="text-[#003975]" />
              Our Services
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight">
              Everything You Need
              <br />
              <span className="text-gradient">for Success</span>
            </h2>
            <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
              Comprehensive support from your first consultation to your first day on campus abroad
            </p>
          </div>
        </FadeUp>

        {/* Cards Stack */}
        <div className="relative">
          {services.map((service, index) => {
            const depth = depths[index];

            // Scale + Y push (existing behaviour)
            const scale = 1 - depth * 0.035;
            const yOffset = -depth * 18;

            // Dynamic width: shrinks as depth increases, centered via margin auto
            // e.g. depth=1 → 95%, depth=2 → 90%, etc.
            const widthPercent = Math.max(60, 100 - depth * WIDTH_SHRINK_PER_DEPTH);

            // Dynamic minWidth: shrinks in px so very deep cards still look proportional
            // e.g. depth=0 → calc(100% - 0px), depth=2 → calc(100% - 80px)
            const minWidthOffset = depth * MIN_WIDTH_SHRINK_PER_DEPTH;

            return (
              <div
                key={service.id}
                ref={(el) => { spacerRefs.current[index] = el; }}
                className="sticky"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: index + 1,
                  height: `${spacerHeight}px`,
                  paddingTop: `${(index + 1) * (isMobile ? 10 : 15)}px`,
                }}
              >
                {/* Sticky wrapper — no transforms here, just positioning */}
                <div
                  className="sticky"
                  style={{
                    top: `${stickyTop}px`,
                    zIndex: index + 1,
                    paddingTop: isMobile ? "20px" : "40px",
                  }}
                >
                  {/* Width + centering wrapper */}
                  <motion.div
                    animate={{
                      width: `${widthPercent}%`,
                      // minWidth expressed as a CSS string isn't directly animatable
                      // so we use x:0 and let the width drive the visual narrowing
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      // minWidth via inline style — updated every render
                      minWidth: `calc(100% - ${minWidthOffset}px)`,
                    }}
                  >
                    {/* Scale + Y offset wrapper */}
                    <motion.div
                      animate={{ scale, y: yOffset }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ transformOrigin: "top center" }}
                    >
                      {/* Entrance animation */}
                      <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* Card */}
                        <Link href={`/services/${service.slug}`}>
                          <motion.div
                            className="group bg-gradient-to-br from-[#0052a3] via-[#003d7a] to-[#002d5e] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl shadow-blue-900/30"
                            whileHover={{ scale: 1.02, boxShadow: "0 35px 60px -15px rgba(0, 82, 163, 0.4)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                          <div className="flex flex-col md:flex-row md:items-stretch" style={{ minHeight: `${cardHeight}px` }}>
                            {/* Left Content */}
                            <div className="flex-1 p-6 md:p-10 lg:p-14 text-white flex flex-col justify-center gap-4 md:gap-6">
                              <div className="text-[10px] md:text-xs font-semibold tracking-widest text-white/60 uppercase">
                                {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                              </div>

                              <motion.div
                                className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300"
                                whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                                transition={{ duration: 0.6 }}
                              >
                                <Icon name={service.icon} size={isMobile ? 22 : 28} className="text-white group-hover:scale-110 transition-transform duration-300" />
                              </motion.div>

                              <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight">
                                {service.title}
                              </h3>

                              <p className="text-white/75 leading-relaxed text-sm md:text-base lg:text-lg max-w-lg">
                                {service.description}
                              </p>

                              <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1 md:mt-2">
                                {service.features.map((feature, i) => (
                                  <motion.span
                                    key={i}
                                    className="text-[10px] md:text-xs font-medium px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-white/10 text-white/90 border border-white/15 hover:bg-white/20 hover:border-white/25 transition-all duration-300"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                                  >
                                    {feature}
                                  </motion.span>
                                ))}
                              </div>
                            </div>

                            {/* Right Visual */}
                            <div className="hidden md:flex w-[320px] items-center justify-center border-l border-white/10 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent z-10" />
                              <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-out">
                                <Image
                                  src={service.image}
                                  alt={service.title}
                                  fill
                                  className="object-cover"
                                  sizes="320px"
                                />
                              </div>
                              <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-[#00ab18]/30 group-hover:bg-[#00ab18]/60 transition-colors duration-500 z-20" />
                              <div className="absolute bottom-12 right-12 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors duration-500 z-20" />
                            </div>
                          </div>
                        </motion.div>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        <FadeUp delay={0.3}>
          <div className="text-center mt-12 md:mt-16">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 md:gap-3 bg-[#003975] text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-medium text-sm md:text-base hover:bg-[#002d5e] transition-colors shadow-lg shadow-blue-800/20"
              >
                Explore All Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
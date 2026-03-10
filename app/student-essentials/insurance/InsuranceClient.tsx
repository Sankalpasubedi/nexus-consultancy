"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect, useState, useRef, useCallback } from "react";

/* ─── Partners Carousel Constants ─────────────────── */
const P_CARD_W = 340;
const P_CARD_H = 380;
const P_GAP = 24;
const P_ITEM = P_CARD_W + P_GAP;
const DRAG_THRESHOLD = 5;
const MOBILE_BREAKPOINT = 768;

const partners = [
  { name: "Medibank", country: "Australia", logo: "🏥", image: "/student/medibank.png", specialty: "OSHC Provider" },
  { name: "BUPA", country: "UK & Global", logo: "💙", image: "/student/bupa.png", specialty: "Health Cover" },
  { name: "Allianz", country: "Worldwide", logo: "🛡️", image: "/student/allianz.jpg", specialty: "Travel Insurance" },
  { name: "NIB", country: "Australia & NZ", logo: "🌏", image: "/student/nib.png", specialty: "Student Health" },
  { name: "Guard.me", country: "Canada", logo: "🍁", image: "/student/guard-me.png", specialty: "International Cover" },
  { name: "ISO", country: "USA", logo: "🇺🇸", image: "/student/iso.png", specialty: "Student Insurance" },
];

/* ─── Partners Carousel Component ──────────────────── */
function PartnersCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);
  const isAnimating = useRef(false);
  const lastTouchUpdate = useRef(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const centerOffset = containerWidth / 2 - P_CARD_W / 2;

  useEffect(() => {
    const unsub = x.on("change", (latest) => {
      const idx = Math.round((-latest + centerOffset) / P_ITEM);
      setActiveIndex(Math.max(0, Math.min(partners.length - 1, idx)));
    });
    return () => unsub();
  }, [x, centerOffset]);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      const target = -index * P_ITEM + centerOffset;
      const startX = x.get();
      const diff = target - startX;
      if (Math.abs(diff) < 1) return;
      isAnimating.current = true;
      let start: number | null = null;
      const duration = isMobile ? 250 : 500;
      const step = (ts: number) => {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        x.set(startX + diff * eased);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          isAnimating.current = false;
        }
      };
      requestAnimationFrame(step);
    },
    [x, centerOffset, isMobile]
  );

  useEffect(() => {
    if (containerWidth > 0) goTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isAnimating.current = false;
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
      if (Math.abs(delta) > DRAG_THRESHOLD) hasDragged.current = true;
      const minX = -(P_ITEM * (partners.length - 1)) - centerOffset + containerWidth - P_CARD_W;
      const maxX = centerOffset;
      const raw = dragStartVal.current + delta;
      x.set(Math.max(minX, Math.min(maxX, raw)));
    },
    [x, centerOffset, containerWidth]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const current = x.get();
    const idx = Math.round((-current + centerOffset) / P_ITEM);
    goTo(Math.max(0, Math.min(partners.length - 1, idx)));
  }, [x, centerOffset, goTo]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      const current = x.get();
      const idx = Math.round((-current + centerOffset) / P_ITEM);
      goTo(Math.max(0, Math.min(partners.length - 1, idx)));
    }
  }, [x, centerOffset, goTo]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isAnimating.current = false;
      isDragging.current = true;
      hasDragged.current = false;
      dragStartX.current = e.touches[0].clientX;
      dragStartVal.current = x.get();
      lastTouchUpdate.current = 0;
    },
    [x]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      const now = Date.now();
      if (now - lastTouchUpdate.current < 16) return;
      lastTouchUpdate.current = now;
      const delta = e.touches[0].clientX - dragStartX.current;
      if (Math.abs(delta) > DRAG_THRESHOLD) hasDragged.current = true;
      const minX = -(P_ITEM * (partners.length - 1)) - centerOffset + containerWidth - P_CARD_W;
      const maxX = centerOffset;
      const raw = dragStartVal.current + delta;
      x.set(Math.max(minX, Math.min(maxX, raw)));
    },
    [x, centerOffset, containerWidth]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const current = x.get();
    const idx = Math.round((-current + centerOffset) / P_ITEM);
    goTo(Math.max(0, Math.min(partners.length - 1, idx)));
  }, [x, centerOffset, goTo]);

  const handleCardClick = useCallback(
    (e: React.MouseEvent, index: number) => {
      if (hasDragged.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (index !== activeIndex) {
        e.preventDefault();
        e.stopPropagation();
        goTo(index);
      }
    },
    [activeIndex, goTo]
  );

  const partner = partners[activeIndex];

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ 
          height: P_CARD_H + 30,
          touchAction: isMobile ? "pan-y" : "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          style={{ x }}
          className="flex items-center absolute top-0 left-0"
        >
          {partners.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={p.name}
                className={`flex-shrink-0 relative ${!isActive ? 'cursor-pointer' : ''}`}
                style={{ 
                  width: P_CARD_W, 
                  marginRight: P_GAP,
                  willChange: isMobile ? "transform" : "auto",
                }}
                animate={{
                  scale: isActive ? 1 : (isMobile ? 0.92 : 0.88),
                  opacity: isActive ? 1 : (isMobile ? 0.6 : 0.45),
                }}
                transition={isMobile 
                  ? { type: "tween", duration: 0.15, ease: "easeOut" }
                  : { type: "spring", stiffness: 300, damping: 30 }
                }
                onClick={(e) => handleCardClick(e, i)}
              >
                <div
                  className="rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100 group"
                  style={{ height: P_CARD_H }}
                >
                  {/* Top visual area with image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        Partner
                      </span>
                      <span className="text-xs font-semibold text-white bg-[#003975]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {p.specialty}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      {p.logo}
                    </div>
                  </div>

                  {/* Info area */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">{p.country}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon name="Star" size={16} className="text-amber-400" />
                        Verified Partner
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#003975]">
                        <Icon name="Shield" size={16} />
                        Trusted
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Active info + nav */}
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: isMobile ? 5 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? -5 : -10 }}
            transition={{ duration: isMobile ? 0.12 : 0.25 }}
            className="text-center mt-6"
          >
            <h3 className="text-xl font-bold text-slate-900">{partner?.name}</h3>
            <p className="text-slate-500 text-sm">{partner?.specialty} • {partner?.country}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => activeIndex > 0 && goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          <div className="flex items-center gap-2">
            {partners.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? "w-6 bg-[#003975]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => activeIndex < partners.length - 1 && goTo(activeIndex + 1)}
            disabled={activeIndex === partners.length - 1}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-700 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────── */

const insuranceTypes = [
  {
    id: "oshc",
    title: "OSHC (Australia)",
    subtitle: "Overseas Student Health Cover",
    icon: "Heart",
    color: "#0ea5e9",
    description: "Mandatory health insurance for international students in Australia covering medical, hospital, and ambulance services.",
    coverage: [
      "Doctor visits & consultations",
      "Hospital treatment",
      "Ambulance services",
      "Prescription medications",
      "Emergency care",
    ],
    providers: ["Medibank", "Allianz", "BUPA", "NIB"],
    price: "From AUD $500/year",
  },
  {
    id: "uk-health",
    title: "UK Health Surcharge",
    subtitle: "Immigration Health Surcharge",
    icon: "ShieldCheck",
    color: "#6366f1",
    description: "Healthcare access through the NHS for international students studying in the UK for more than 6 months.",
    coverage: [
      "NHS services",
      "GP consultations",
      "Hospital treatment",
      "Emergency care",
      "Mental health services",
    ],
    providers: ["UK Government"],
    price: "£776/year (included in visa)",
  },
  {
    id: "canada-health",
    title: "Canada Health Insurance",
    subtitle: "Provincial Health Plans",
    icon: "Stethoscope",
    color: "#10b981",
    description: "Provincial health coverage varies by province. Some provinces require private insurance for the first few months.",
    coverage: [
      "Doctor visits",
      "Hospital care",
      "Lab tests",
      "Emergency services",
      "Specialist consultations",
    ],
    providers: ["Guard.me", "StudentGuard", "Sun Life"],
    price: "From CAD $600/year",
  },
  {
    id: "travel",
    title: "Travel Insurance",
    subtitle: "Comprehensive Travel Coverage",
    icon: "Plane",
    color: "#f59e0b",
    description: "Essential coverage for your journey including trip cancellation, lost baggage, and emergency assistance.",
    coverage: [
      "Trip cancellation",
      "Lost/delayed baggage",
      "Flight delays",
      "Emergency evacuation",
      "24/7 assistance",
    ],
    providers: ["Allianz", "World Nomads", "IMG"],
    price: "From $100/trip",
  },
];

const faqs = [
  {
    q: "Is health insurance mandatory for studying abroad?",
    a: "Yes, most countries require proof of health insurance as part of your student visa application. Countries like Australia (OSHC), UK (IHS), and many European nations have mandatory requirements.",
  },
  {
    q: "When should I purchase my insurance?",
    a: "We recommend purchasing insurance as soon as you receive your visa approval. For countries like Australia, you need OSHC before your visa can be granted.",
  },
  {
    q: "Does Nexsus help with insurance applications?",
    a: "Yes! We assist with selecting the right insurance plan, comparing providers, and ensuring you meet all visa requirements. Our service is free for enrolled students.",
  },
  {
    q: "Can I use my home country insurance abroad?",
    a: "Generally, no. Most countries require locally recognized insurance. Your home insurance may provide some emergency coverage but won't satisfy visa requirements.",
  },
  {
    q: "What if I need to extend my insurance?",
    a: "We help students extend their insurance coverage if their study period is extended. We ensure continuous coverage to maintain visa compliance.",
  },
];

/* ─── Component ────────────────────────────────────── */

export default function InsuranceClient() {
  const { setShowSidebar } = useHeader();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003975]/6 via-transparent to-[#003975]/3" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#003975]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#003975]/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Breadcrumb */}
              <FadeUp>
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                  <Link href="/" className="hover:text-[#003975]">Home</Link>
                  <span>/</span>
                  <span className="text-slate-900">Student Insurance</span>
                </nav>
              </FadeUp>
              
              <FadeUp>
                <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-[#003975]/10 text-[#003975] text-xs font-semibold tracking-wide border border-[#003975]/20">
                  Student Essentials
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-slate-900 mb-4 max-w-2xl leading-[1.15]">
                  Student <span className="text-[#0052a3]">Insurance</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed mb-8">
                  Comprehensive health and travel insurance plans for international students. 
                  Stay protected throughout your study abroad journey.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#003975] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#002a5c] hover:shadow-lg transition"
                  >
                    Get Insurance Quote <Icon name="ArrowRight" size={14} />
                  </Link>
                  <a
                    href="tel:+97714519495"
                    className="inline-flex items-center gap-2 bg-white text-[#003975] border border-[#003975]/20 px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#003975]/5 transition"
                  >
                    <Icon name="Phone" size={14} />
                    Talk to Advisor
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Right Image */}
            <FadeUp delay={0.4}>
              <div className="hidden lg:block relative group">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/services/NEX-_-15.jpg"
                    alt="Student Insurance"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003975]/20 to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#003975]/10 flex items-center justify-center">
                      <Icon name="ShieldCheck" size={24} className="text-[#003975]" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-lg">100%</p>
                      <p className="text-slate-500 text-xs">Protection Coverage</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Why Insurance Matters ── */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-gradient-to-r from-[#003975] to-[#0052a3] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Why Student Insurance Matters
                </h2>
                <p className="text-white/85 leading-relaxed mb-6">
                  Studying abroad is an exciting journey, but unexpected medical expenses 
                  or travel issues can be costly. Insurance provides peace of mind and 
                  financial protection, and is often mandatory for visa approval.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <Icon name="Check" size={14} className="text-white/85" />
                    <span className="text-sm">Visa Requirement</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <Icon name="Check" size={14} className="text-white/85" />
                    <span className="text-sm">Financial Protection</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                    <Icon name="Check" size={14} className="text-white/85" />
                    <span className="text-sm">Peace of Mind</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "ShieldCheck", label: "Comprehensive Coverage", value: "100%" },
                  { icon: "Clock", label: "24/7 Support", value: "Always" },
                  { icon: "Globe", label: "Countries Covered", value: "50+" },
                  { icon: "Users", label: "Students Helped", value: "5000+" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center">
                    <Icon name={stat.icon} size={24} className="text-white/85 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Insurance Types ── */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Insurance Plans by Destination
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Choose the right insurance plan based on your study destination.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {insuranceTypes.map((insurance) => (
              <StaggerItem key={insurance.id}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          insurance.color === "#0ea5e9" ? "bg-sky-100" :
                          insurance.color === "#6366f1" ? "bg-indigo-100" :
                          insurance.color === "#10b981" ? "bg-emerald-100" :
                          "bg-amber-100"
                        }`}
                      >
                        <Icon name={insurance.icon} size={20} className={
                          insurance.color === "#0ea5e9" ? "text-sky-500" :
                          insurance.color === "#6366f1" ? "text-indigo-500" :
                          insurance.color === "#10b981" ? "text-emerald-500" :
                          "text-amber-500"
                        } />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{insurance.title}</h3>
                        <p className="text-sm text-slate-500">{insurance.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                      {insurance.description}
                    </p>

                    {/* Coverage */}
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                        What's Covered
                      </h4>
                      <div className="space-y-2">
                        {insurance.coverage.slice(0, 4).map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <Icon name="Check" size={10} className="text-green-600" />
                            </div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Providers & Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-slate-400">Providers:</span>
                        <p className="text-sm text-slate-600">{insurance.providers.slice(0, 2).join(", ")}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400">Starting</span>
                        <p className="text-sm font-semibold" style={{ color: insurance.color }}>
                          {insurance.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── How We Help ── */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                How Nexsus Helps You
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Our free insurance assistance for enrolled students.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Search", title: "Compare Plans", desc: "We compare multiple providers to find the best coverage and price for you.", step: "01" },
              { icon: "FileText", title: "Documentation", desc: "We help prepare all required insurance documents for your visa.", step: "02" },
              { icon: "CreditCard", title: "Easy Payment", desc: "Flexible payment options and assistance with international payments.", step: "03" },
              { icon: "Headphones", title: "Ongoing Support", desc: "Continuous support for claims, renewals, and any insurance queries.", step: "04" },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-gray-100 relative overflow-hidden">
                  <span className="absolute top-4 right-4 text-4xl font-bold text-slate-100">{item.step}</span>
                  <div className="w-12 h-12 rounded-xl bg-[#003975]/10 flex items-center justify-center mb-4">
                    <Icon name={item.icon} size={20} className="text-[#003975]" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600">
                Common questions about student insurance.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon name="ChevronDown" size={16} className="text-slate-400" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insurance Partners Carousel ── */}
      <section className="py-16 bg-[#fafaf8] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 mb-10">
          <FadeUp>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-[#003975]/10 text-[#003975] text-sm font-medium rounded-full mb-4">
                Trusted Partners
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Our Insurance Partners
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                We work with leading insurance providers worldwide.
              </p>
            </div>
          </FadeUp>
        </div>
        <PartnersCarousel />
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#003975] to-[#0052a3]">
        <div className="max-w-[800px] mx-auto text-center text-white">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help with Insurance?
            </h2>
            <p className="text-white/85 mb-8 max-w-lg mx-auto">
              Our team can help you find the perfect insurance plan for your destination. 
              Free assistance for Nexsus students!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full text-sm font-semibold hover:shadow-lg transition"
              >
                Get Free Quote <Icon name="ArrowRight" size={14} />
              </Link>
              <a
                href="https://wa.me/9779851032197"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/20 transition"
              >
                <Icon name="MessageCircle" size={14} />
                Chat on WhatsApp
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

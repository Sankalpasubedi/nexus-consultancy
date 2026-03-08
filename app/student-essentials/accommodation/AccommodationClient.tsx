"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import {
  FadeUp,
  FadeRight,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { Icon, FlagIcon } from "@/lib/icons";
import { useState, useRef, useEffect, useCallback } from "react";

/* ─── Cities Carousel Constants ──────────────────── */
const C_CARD_W = 340;
const C_CARD_H = 153;
const C_GAP = 24;
const C_ITEM = C_CARD_W + C_GAP;
const DRAG_THRESHOLD = 5;
const MOBILE_BREAKPOINT = 768;

const cities = [
  { city: "Sydney", country: "Australia", avgRent: "$1,200/mo", logo: "🏞️", image: "/services/NEX-_-15.jpg", highlight: "Beach lifestyle" },
  { city: "London", country: "UK", avgRent: "£900/mo", logo: "🏰", image: "/services/NEX-_-17.jpg", highlight: "Historic city" },
  { city: "Toronto", country: "Canada", avgRent: "C$1,500/mo", logo: "🍁", image: "/services/NEX-_-19.jpg", highlight: "Multicultural" },
  { city: "New York", country: "USA", avgRent: "$1,800/mo", logo: "🗽", image: "/services/NEX-_-21.jpg", highlight: "Vibrant hub" },
  { city: "Melbourne", country: "Australia", avgRent: "$1,100/mo", logo: "🎯", image: "/services/NEX-_-23.jpg", highlight: "Cultural capital" },
  { city: "Auckland", country: "New Zealand", avgRent: "NZ$1,000/mo", logo: "🌋", image: "/services/NEX-_-25.jpg", highlight: "Nature & city" },
];

/* ─── Cities Carousel Component ───────────────────── */
function CitiesCarousel() {
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

  const centerOffset = containerWidth / 2 - C_CARD_W / 2;

  useEffect(() => {
    const unsub = x.on("change", (latest) => {
      const idx = Math.round((-latest + centerOffset) / C_ITEM);
      setActiveIndex(Math.max(0, Math.min(cities.length - 1, idx)));
    });
    return () => unsub();
  }, [x, centerOffset]);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      const target = -index * C_ITEM + centerOffset;
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
      const minX = -(C_ITEM * (cities.length - 1)) - centerOffset + containerWidth - C_CARD_W;
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
    const idx = Math.round((-current + centerOffset) / C_ITEM);
    goTo(Math.max(0, Math.min(cities.length - 1, idx)));
  }, [x, centerOffset, goTo]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      const current = x.get();
      const idx = Math.round((-current + centerOffset) / C_ITEM);
      goTo(Math.max(0, Math.min(cities.length - 1, idx)));
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
      const minX = -(C_ITEM * (cities.length - 1)) - centerOffset + containerWidth - C_CARD_W;
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
    const idx = Math.round((-current + centerOffset) / C_ITEM);
    goTo(Math.max(0, Math.min(cities.length - 1, idx)));
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

  const cityData = cities[activeIndex];

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ 
          height: C_CARD_H + 30,
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
          {cities.map((c, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={c.city}
                className={`flex-shrink-0 relative ${!isActive ? 'cursor-pointer' : ''}`}
                style={{ 
                  width: C_CARD_W, 
                  marginRight: C_GAP,
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
                  style={{ height: C_CARD_H }}
                >
                  {/* Top visual area with image */}
                  {/* <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.city}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        City
                      </span>
                      <span className="text-xs font-semibold text-white bg-[#003975]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {c.highlight}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      {c.logo}
                    </div>
                  </div> */}

                  {/* Info area */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{c.city}</h3>
                    <p className="text-sm text-slate-500 mb-4">{c.country}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon name="Home" size={16} className="text-[#003975]" />
                        Avg: {c.avgRent}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#003975]">
                        <Icon name="MapPin" size={16} />
                        {c.highlight}
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
            <h3 className="text-xl font-bold text-slate-900">{cityData?.city}</h3>
            <p className="text-slate-500 text-sm">{cityData?.highlight} • {cityData?.country}</p>
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
            {cities.map((_, i) => (
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
            onClick={() => activeIndex < cities.length - 1 && goTo(activeIndex + 1)}
            disabled={activeIndex === cities.length - 1}
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

const accommodationTypes = [
  {
    id: "on-campus",
    title: "On-Campus Housing",
    icon: "Building2",
    color: "#6366f1",
    description: "Live directly on university grounds in dormitories or residence halls. Perfect for first-year students.",
    pros: ["Convenient location", "Built-in community", "Utilities included", "Meal plans available"],
    cons: ["Limited privacy", "May be more expensive", "Rules & restrictions"],
    priceRange: "$800 - $2000/month",
    bestFor: "First-year students",
  },
  {
    id: "off-campus",
    title: "Off-Campus Apartments",
    icon: "Home",
    color: "#10b981",
    description: "Rent your own apartment or share with roommates near the university. More independence and privacy.",
    pros: ["More privacy", "Kitchen access", "More space", "Flexible lease terms"],
    cons: ["Utilities separate", "Commute required", "More responsibility"],
    priceRange: "$600 - $1800/month",
    bestFor: "Independent students",
  },
  {
    id: "homestay",
    title: "Homestay",
    icon: "Users",
    color: "#f59e0b",
    description: "Live with a local host family for cultural immersion. Includes meals and a supportive environment.",
    pros: ["Cultural immersion", "Meals included", "Family support", "Language practice"],
    cons: ["Less independence", "House rules", "Shared spaces"],
    priceRange: "$700 - $1200/month",
    bestFor: "Cultural experience seekers",
  },
  {
    id: "shared-house",
    title: "Shared House/Flat",
    icon: "Users2",
    color: "#ec4899",
    description: "Share a house or flat with other students. Great balance of independence and social life.",
    pros: ["Lower costs", "Social environment", "Shared responsibilities", "Flexibility"],
    cons: ["Housemate compatibility", "Shared facilities", "May need furnishing"],
    priceRange: "$400 - $1000/month",
    bestFor: "Budget-conscious students",
  },
];

const countryHousing = [
  {
    country: "Australia",
    flagCode: "au",
    avgCost: "AUD $200-400/week",
    popular: ["On-campus", "Share houses", "Purpose-built student accommodation"],
    tips: "Book early for on-campus housing. Purpose-built student accommodations (PBSA) are popular.",
  },
  {
    country: "UK",
    flagCode: "gb",
    avgCost: "£120-250/week",
    popular: ["University halls", "Private rentals", "Student flats"],
    tips: "University accommodation fills quickly. Consider private halls like Unite or Liberty Living.",
  },
  {
    country: "Canada",
    flagCode: "ca",
    avgCost: "CAD $800-1500/month",
    popular: ["Residence halls", "Apartments", "Homestays"],
    tips: "Toronto and Vancouver are expensive. Consider suburbs for better value.",
  },
  {
    country: "USA",
    flagCode: "us",
    avgCost: "USD $800-2000/month",
    popular: ["Dormitories", "Off-campus apartments", "Greek housing"],
    tips: "On-campus housing often required for freshmen. Costs vary greatly by city.",
  },
  {
    country: "New Zealand",
    flagCode: "nz",
    avgCost: "NZD $200-350/week",
    popular: ["Halls of residence", "Flats", "Homestays"],
    tips: "Auckland is most expensive. Flatting with other students is very common.",
  },
];

const checklist = [
  { item: "Research housing options early", icon: "Search" },
  { item: "Set a realistic budget", icon: "DollarSign" },
  { item: "Check proximity to campus", icon: "MapPin" },
  { item: "Read reviews and visit if possible", icon: "Star" },
  { item: "Understand lease terms", icon: "FileText" },
  { item: "Check what's included in rent", icon: "CheckSquare" },
  { item: "Consider safety of neighborhood", icon: "Shield" },
  { item: "Plan for deposits and upfront costs", icon: "CreditCard" },
];

const faqs = [
  {
    q: "When should I start looking for accommodation?",
    a: "Start at least 3-6 months before your course begins. On-campus housing applications often open 6+ months in advance.",
  },
  {
    q: "Is on-campus or off-campus housing better?",
    a: "On-campus is ideal for first-year students for convenience and community. Off-campus offers more independence and often better value for experienced students.",
  },
  {
    q: "How much should I budget for housing?",
    a: "Budget 30-50% of your total living expenses for accommodation. This varies significantly by city and country.",
  },
  {
    q: "Can Nexsus help me find accommodation?",
    a: "Yes! We provide accommodation guidance as part of our pre-departure support. We can connect you with trusted housing providers.",
  },
];

export default function AccommodationClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
      {/* ── Hero Section ── */}
      <section className="px-6 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <FadeUp>
                <span className="inline-block px-4 py-1.5 bg-[#003975]/10 text-[#003975] text-sm font-medium rounded-full mb-4">
                  Student Housing Guide
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                  Student Accommodation
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                  Find the perfect home away from home. Explore accommodation options for international students.
                </p>
              </FadeUp>
            </div>

            {/* Right Image */}
            <FadeRight delay={0.2}>
              <div className="hidden lg:block relative group">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/services/NEX-_-22.jpg"
                    alt="Student Accommodation"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003975]/20 to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#003975]/10 flex items-center justify-center">
                      <Icon name="Home" size={24} className="text-[#003975]" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-lg">Find</p>
                      <p className="text-slate-500 text-xs">Your Perfect Home</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── Accommodation Types ── */}
      <section className="px-6 mb-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Types of Student Housing
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {accommodationTypes.map((type, i) => (
              <FadeUp key={type.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${type.color}15` }}
                    >
                      <Icon name={type.icon} size={22} className={type.color === "#6366f1" ? "text-indigo-500" : type.color === "#10b981" ? "text-emerald-500" : type.color === "#f59e0b" ? "text-amber-500" : "text-purple-500"} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{type.title}</h3>
                      <span className="text-sm text-slate-500">Best for: {type.bestFor}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4">{type.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-xs font-medium text-[#003975] uppercase mb-2 block">Pros</span>
                      <ul className="space-y-1">
                        {type.pros.map((pro) => (
                          <li key={pro} className="flex items-center gap-2 text-sm text-slate-600">
                            <Icon name="Check" size={12} className="text-[#003975]" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-red-500 uppercase mb-2 block">Cons</span>
                      <ul className="space-y-1">
                        {type.cons.map((con) => (
                          <li key={con} className="flex items-center gap-2 text-sm text-slate-600">
                            <Icon name="Minus" size={12} className="text-red-400" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Typical cost:</span>
                    <span className="font-semibold text-[#003975]">{type.priceRange}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Housing by Country ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Housing by Country
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Costs and options vary by destination. Here's what to expect.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryHousing.map((country) => (
              <StaggerItem key={country.country}>
                <HoverCard className="h-full">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <FlagIcon code={country.flagCode} size={28} />
                      <h3 className="font-bold text-slate-900 text-lg">{country.country}</h3>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-xs text-slate-500 uppercase">Avg Cost</span>
                      <p className="font-semibold text-[#003975]">{country.avgCost}</p>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-slate-500 uppercase">Popular Options</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {country.popular.map((opt) => (
                          <span key={opt} className="text-xs px-2 py-0.5 bg-[#003975]/10 text-[#003975] rounded-full">
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600">
                      <Icon name="Lightbulb" size={14} className="inline mr-1 text-amber-500" />
                      {country.tips}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Featured Student Cities Carousel ── */}
      <section className="py-16 bg-[#fafaf8] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 mb-10">
          <FadeUp>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-[#003975]/10 text-[#003975] text-sm font-medium rounded-full mb-4">
                Popular Destinations
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Top Student Cities
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Explore accommodation options in these popular study destinations.
              </p>
            </div>
          </FadeUp>
        </div>
        <CitiesCarousel />
      </section>

      {/* ── Checklist ── */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Housing Search Checklist
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Follow these steps to find your perfect accommodation.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {checklist.map((item, i) => (
              <FadeUp key={item.item} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#003975]/10 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={18} className="text-[#003975]" />
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{item.item}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Frequently Asked Questions
              </h2>
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

      {/* ── CTA Section ── */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#003975] to-[#0052a3]">
        <div className="max-w-[800px] mx-auto text-center text-white">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help Finding Accommodation?
            </h2>
            <p className="text-white/85 mb-8 max-w-lg mx-auto">
              Our pre-departure support includes accommodation guidance. 
              Let us help you find your home away from home!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full text-sm font-semibold hover:shadow-lg transition"
              >
                Get Housing Help <Icon name="ArrowRight" size={14} />
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

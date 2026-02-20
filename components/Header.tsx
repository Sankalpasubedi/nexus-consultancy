"use client";

import Link from "next/link";
import Image from "next/image";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon, FlagIcon } from "@/lib/icons";
import { Phone, Mail, MessageCircle, MapPin, ChevronDown } from "lucide-react";

/* ─── Navigation Data ─────────────────────────────────── */

const servicesLinks = [
  { label: "Test Preparation", href: "/services/test-preparation", icon: "BookOpen", description: "IELTS, TOEFL, PTE, GRE & SAT coaching" },
  { label: "Counseling", href: "/services/career-counseling", icon: "Target", description: "Expert career & university guidance" },
  { label: "SOP & Application Support", href: "/services/sop-writing-assistance", icon: "PenLine", description: "Professional application writing" },
  { label: "Student Visa Assistance", href: "/services/student-visa-assistance", icon: "ShieldCheck", description: "End-to-end visa support" },
  { label: "Pre-Departure Support", href: "/services/pre-departure-support", icon: "Plane", description: "Prepare for life abroad" },
  { label: "Scholarship Guidance", href: "/services/scholarship-guidance", icon: "DollarSign", description: "Find & win scholarships" },
];

const studyAbroadLinks = [
  { label: "Compare Destinations", href: "/study-abroad/compare-destinations", icon: "Globe", description: "Find your ideal country" },
  { label: "Documents Required", href: "/study-abroad/documents-required", icon: "FileText", description: "Complete document checklist" },
  { label: "Application Process", href: "/study-abroad/application-process", icon: "Map", description: "Step-by-step guide" },
  { label: "Study Abroad Guide", href: "/study-abroad/complete-guide", icon: "Compass", description: "Everything you need to know" },
];

const coursesLinks = [
  { label: "Information Technology", href: "/courses/information-technology", icon: "Monitor", description: "CS & IT programs" },
  { label: "Business & Management", href: "/courses/business-management", icon: "BarChart3", description: "MBA & BBA programs" },
  { label: "Engineering", href: "/courses/engineering", icon: "Settings", description: "BEng & MEng degrees" },
  { label: "Health Sciences", href: "/courses/health-sciences", icon: "Heart", description: "Medical & health programs" },
  { label: "Arts & Design", href: "/courses/arts-and-design", icon: "Palette", description: "Creative programs" },
  { label: "Law & Legal Studies", href: "/courses/law-and-legal-studies", icon: "Scale", description: "LLB & LLM degrees" },
  { label: "Social Sciences", href: "/courses/social-sciences", icon: "Globe", description: "Humanities & social studies" },
];

const destinationsLinks = [
  { label: "Australia", href: "/destinations/study-in-australia", flagCode: "au" },
  { label: "Canada", href: "/destinations/study-in-canada", flagCode: "ca" },
  { label: "USA", href: "/destinations/study-in-usa", flagCode: "us" },
  { label: "UK", href: "/destinations/study-in-uk", flagCode: "gb" },
  { label: "New Zealand", href: "/destinations/study-in-new-zealand", flagCode: "nz" },
  { label: "Japan", href: "/destinations/study-in-japan", flagCode: "jp" },
  { label: "South Korea", href: "/destinations/study-in-south-korea", flagCode: "kr" },
  { label: "Europe", href: "/destinations/study-in-europe", flagCode: "eu" },
];

const destinationSubPages = [
  { label: "Why Study Here", slug: "why-study-here" },
  { label: "Universities", slug: "universities" },
  { label: "Admission", slug: "admission" },
  { label: "Student Visa", slug: "student-visa" },
  { label: "Living Cost", slug: "living-cost" },
  { label: "Work & Jobs", slug: "work-and-jobs" },
  { label: "Scholarships", slug: "scholarships" },
  { label: "Culture", slug: "culture" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "News & Events", href: "/news" },
];

/* ─── Social Icons ─────────────────────────────────── */

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TikTokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.47V13a8.28 8.28 0 005.58 2.17v-3.45a4.85 4.85 0 01-2-.95v-.08z" />
    </svg>
  );
}

/* ─── Mega Dropdown for navigation items with descriptions ── */

function MegaDropdown({
  label,
  items,
  isTransparent,
  scrolled,
  overviewHref,
  columns = 1,
}: {
  label: string;
  items: { label: string; href: string; icon: string; description?: string }[];
  isTransparent: boolean;
  scrolled: boolean;
  overviewHref?: string;
  columns?: number;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      {overviewHref ? (
        <Link
          href={overviewHref}
          className={`text-[13px] font-semibold tracking-wide transition-colors duration-300 flex items-center gap-1.5 py-5 ${
            isTransparent && !scrolled
              ? "text-white/90 hover:text-white"
              : "text-slate-700 hover:text-[#003975]"
          }`}
        >
          {label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </Link>
      ) : (
        <button
          className={`text-[13px] font-semibold tracking-wide transition-colors duration-300 flex items-center gap-1.5 py-5 ${
            isTransparent && !scrolled
              ? "text-white/90 hover:text-white"
              : "text-slate-700 hover:text-[#003975]"
          }`}
        >
          {label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-0 z-50"
          >
            <div className="w-10 h-[3px] bg-[#003975] mx-auto rounded-full" />
            <div className={`bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden mt-0.5 ${columns === 2 ? 'min-w-[520px]' : 'min-w-[280px]'}`}>
              {overviewHref && (
                <div className="px-5 pt-4 pb-3 border-b border-gray-50 bg-gray-50/50">
                  <Link href={overviewHref} onClick={() => setOpen(false)} className="text-[11px] font-bold uppercase tracking-wider text-[#003975] hover:underline">
                    View All {label} →
                  </Link>
                </div>
              )}
              <div className={`p-3 ${columns === 2 ? 'grid grid-cols-2 gap-1' : 'space-y-0.5'}`}>
                {items.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-[#003975]/5 hover:text-[#003975] transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#003975]/10 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon name={item.icon} size={15} className="text-slate-400 group-hover:text-[#003975]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[13px] font-medium block">{item.label}</span>
                      {item.description && (
                        <span className="text-[11px] text-slate-400 block mt-0.5">{item.description}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DestinationsDropdown({
  isTransparent,
  scrolled,
}: {
  isTransparent: boolean;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hoveredDest, setHoveredDest] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lockedDest = useRef<string | null>(null);

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => {
      setOpen(false);
      setHoveredDest(null);
      lockedDest.current = null;
    }, 150);
  };

  const handleCountryEnter = (href: string) => {
    clearTimeout(hoverTimeout.current);
    if (lockedDest.current && lockedDest.current !== href) {
      hoverTimeout.current = setTimeout(() => {
        setHoveredDest(href);
        lockedDest.current = href;
      }, 200);
    } else {
      setHoveredDest(href);
      lockedDest.current = href;
    }
  };

  const activeDest = destinationsLinks.find((d) => d.href === hoveredDest);

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <Link
        href="/destinations"
        className={`text-[13px] font-semibold tracking-wide transition-colors duration-300 flex items-center gap-1.5 py-5 ${
          isTransparent && !scrolled
            ? "text-white/90 hover:text-white"
            : "text-slate-700 hover:text-[#003975]"
        }`}
      >
        Destinations
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-0 pt-0 z-50"
          >
            <div className="w-10 h-[3px] bg-[#003975] rounded-full ml-6" />
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex w-[700px] mt-0.5">
              {/* Left: Countries */}
              <div className="flex-shrink-0 w-[300px]">
                <div className="px-5 pt-4 pb-3 border-b border-gray-50 bg-gray-50/50">
                  <Link href="/destinations" onClick={() => setOpen(false)} className="text-[11px] font-bold uppercase tracking-wider text-[#003975] hover:underline">
                    All Destinations →
                  </Link>
                </div>
                <div className="grid grid-cols-1 p-2 gap-0.5">
                  {destinationsLinks.map((item) => (
                    <div key={item.href} onMouseEnter={() => handleCountryEnter(item.href)}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] transition-all duration-150 ${
                          hoveredDest === item.href
                            ? "bg-[#003975] text-white"
                            : "text-slate-600 hover:bg-gray-50"
                        }`}
                      >
                        <FlagIcon code={item.flagCode} size={16} />
                        <span className="font-medium">{item.label}</span>
                        <svg
                          className={`w-3 h-3 ml-auto transition-opacity ${hoveredDest === item.href ? "opacity-100" : "opacity-0"}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: Sub-pages */}
              <div className="flex-1 border-l border-gray-100 bg-gray-50/30" onMouseEnter={() => clearTimeout(hoverTimeout.current)}>
                {activeDest ? (
                  <motion.div key={hoveredDest} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
                    <div className="px-5 pt-4 pb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Explore {activeDest.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-0.5 px-3 pb-3">
                      {destinationSubPages.map((sub) => (
                        <Link key={sub.slug} href={`${hoveredDest}/${sub.slug}`} onClick={() => setOpen(false)} className="px-3 py-2.5 text-[12px] text-slate-500 hover:text-[#003975] hover:bg-[#003975]/5 rounded-lg transition-colors duration-150 font-medium">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center px-8">
                      <Icon name="Globe" size={28} className="text-slate-200 mx-auto mb-2" />
                      <p className="text-[12px] text-slate-300">Hover a country to explore</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileAccordion({
  label,
  items,
  overviewHref,
  onClose,
}: {
  label: string;
  items: { label: string; href: string; icon: string; description?: string }[];
  overviewHref?: string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <div className="flex items-center justify-between py-4">
        {overviewHref ? (
          <Link
            href={overviewHref}
            onClick={onClose}
            className="text-slate-900 font-medium text-[15px]"
          >
            {label}
          </Link>
        ) : (
          <span className="text-slate-900 font-medium text-[15px]">{label}</span>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="p-1 -mr-1"
          aria-label={`Expand ${label} submenu`}
        >
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-2 space-y-0.5">
              {items.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 py-2.5 px-4 text-sm text-slate-600 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <Icon name={item.icon} size={15} className="text-slate-400" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDestinationsAccordion({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const [expandedDest, setExpandedDest] = useState<string | null>(null);

  return (
    <div className="border-b border-gray-100">
      <div className="flex items-center justify-between py-4">
        <Link
          href="/destinations"
          onClick={onClose}
          className="text-slate-900 font-medium text-[15px]"
        >
          Destinations
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-1 -mr-1"
          aria-label="Expand Destinations submenu"
        >
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-2 space-y-0.5">
              {destinationsLinks.map((item) => (
                <div key={item.href}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex-1 flex items-center gap-3 py-2.5 px-4 text-sm text-slate-600 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    >
                      <FlagIcon code={item.flagCode} size={14} />
                      {item.label}
                    </Link>
                    <button
                      onClick={() =>
                        setExpandedDest(expandedDest === item.href ? null : item.href)
                      }
                      className="p-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <motion.svg
                        animate={{ rotate: expandedDest === item.href ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                  </div>
                  <AnimatePresence>
                    {expandedDest === item.href && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 pb-2 space-y-0.5">
                          {destinationSubPages.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`${item.href}/${sub.slug}`}
                              onClick={onClose}
                              className="block py-2 px-3 text-[13px] text-slate-500 hover:text-slate-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const { showSidebar } = useHeader();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [topBarHidden, setTopBarHidden] = useState(false);
  const isTransparent = showSidebar === false;

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 10);
    setTopBarHidden(y > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ═══ TOP BAR — Quick links, phone, WhatsApp, location ═══ */}
      <motion.div
        initial={false}
        animate={{
          y: topBarHidden ? -44 : 0,
          opacity: topBarHidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-[100000] hidden md:block"
      >
        <div className="bg-[#001d3d] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between">
            {/* Left: Quick Links */}
            <div className="flex items-center gap-1">
              {quickLinks.map((link, i) => (
                <span key={link.label} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-[12px] font-medium transition-colors duration-200 px-2 py-1 rounded hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                  {i < quickLinks.length - 1 && (
                    <span className="w-px h-3 bg-white/15 mx-0.5" />
                  )}
                </span>
              ))}
            </div>

            {/* Right: Contact info */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+97714123456"
                className="flex items-center gap-1.5 text-white/70 hover:text-white text-[12px] transition-colors duration-200 px-2 py-1 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/5"
              >
                <Phone size={11} strokeWidth={2.5} />
                <span className="font-medium">+977 1 4123456</span>
              </a>
              <a
                href="https://wa.me/9779841000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/70 hover:text-white text-[12px] transition-colors duration-200 px-2 py-1 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/5"
              >
                <MessageCircle size={11} strokeWidth={2.5} />
                <span className="font-medium">WhatsApp</span>
              </a>
              <span className="w-px h-3.5 bg-white/15" />
              <div className="flex items-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200">
                  <FacebookIcon size={12} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200">
                  <InstagramIcon size={12} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200">
                  <LinkedInIcon size={12} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200">
                  <TikTokIcon size={12} />
                </a>
              </div>
              <span className="w-px h-3.5 bg-white/15" />
              <div className="flex items-center gap-1.5 text-white/70 text-[12px]">
                <FlagIcon code="np" size={13} />
                <span className="font-medium">Nepal</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ MAIN NAVIGATION BAR ═══ */}
      <header
        className={`fixed left-0 right-0 z-[99999] transition-all duration-500 ${
          topBarHidden ? "top-0" : "top-0 md:top-11"
        }`}
      >
        <div
          className={`transition-all duration-500 ${
            isTransparent && !scrolled
              ? "bg-white/5 backdrop-blur-md border-b border-white/10"
              : "bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm shadow-black/[0.04]"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[62px] lg:h-[66px]">
              {/* Logo */}
              <Link href="/" className="flex items-center shrink-0 group">
                <Image
                  src="/logo.png"
                  alt="Nexsus Educational Consultancy"
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6">
                <MegaDropdown
                  label="Study Abroad"
                  items={studyAbroadLinks}
                  isTransparent={isTransparent}
                  scrolled={scrolled}
                  overviewHref="/study-abroad"
                />
                <DestinationsDropdown isTransparent={isTransparent} scrolled={scrolled} />
                <MegaDropdown
                  label="Courses"
                  items={coursesLinks}
                  isTransparent={isTransparent}
                  scrolled={scrolled}
                  overviewHref="/courses"
                  columns={2}
                />
                <MegaDropdown
                  label="Services"
                  items={servicesLinks}
                  isTransparent={isTransparent}
                  scrolled={scrolled}
                  overviewHref="/services"
                />
                <Link
                  href="/contact"
                  className={`text-[13px] font-semibold tracking-wide transition-colors duration-300 py-5 ${
                    isTransparent && !scrolled
                      ? "text-white/90 hover:text-white"
                      : "text-slate-700 hover:text-[#003975]"
                  }`}
                >
                  Contact
                </Link>
              </nav>

              {/* Right Section */}
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold tracking-wide transition-all duration-300 ${
                    isTransparent && !scrolled
                      ? "bg-white text-[#003975] hover:bg-white/90 shadow-lg shadow-white/10"
                      : "bg-[#003975] text-white hover:bg-[#002a5c] shadow-md shadow-[#003975]/15"
                  }`}
                >
                  Free Consultation
                  <Icon name="ArrowRight" size={13} />
                </Link>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-colors duration-300 ${
                    isTransparent && !scrolled ? "text-white" : "text-slate-900"
                  }`}
                  aria-label="Toggle menu"
                >
                  <motion.span animate={mobileOpen ? { rotate: 45, y: 7, width: 22 } : { rotate: 0, y: 0, width: 22 }} transition={{ duration: 0.25 }} className="h-[2px] bg-current block rounded-full origin-center" style={{ width: 22 }} />
                  <motion.span animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.15 }} className="w-[22px] h-[2px] bg-current block rounded-full" />
                  <motion.span animate={mobileOpen ? { rotate: -45, y: -7, width: 22 } : { rotate: 0, y: 0, width: 22 }} transition={{ duration: 0.25 }} className="h-[2px] bg-current block rounded-full origin-center" style={{ width: 22 }} />
                </button>
              </div>
            </div>

            {/* Bottom accent line */}
            {!isTransparent || scrolled ? (
              <div className="h-[2px] bg-gradient-to-r from-[#003975] via-[#0052a3] to-[#003975] -mx-4 sm:-mx-6 lg:-mx-8 opacity-80" />
            ) : null}
          </div>
        </div>
      </header>

      {/* ═══ Mobile Menu Overlay ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[99997] bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-[99998] bg-white overflow-y-auto lg:hidden"
            >
              <div className="pt-20 pb-8 px-6">
                <div className="mb-6">
                  <Link href="/" onClick={closeMobile} className="flex items-center">
                    <Image src="/logo.png" alt="Nexsus Educational Consultancy" width={160} height={48} className="h-10 w-auto object-contain" />
                  </Link>
                </div>
                <div className="space-y-0">
                  <Link href="/about" onClick={closeMobile} className="block py-4 text-slate-900 font-medium text-[15px] border-b border-gray-100">About</Link>
                  <MobileAccordion label="Study Abroad" items={studyAbroadLinks} overviewHref="/study-abroad" onClose={closeMobile} />
                  <MobileAccordion label="Services" items={servicesLinks} overviewHref="/services" onClose={closeMobile} />
                  <MobileAccordion label="Courses" items={coursesLinks} overviewHref="/courses" onClose={closeMobile} />
                  <MobileDestinationsAccordion onClose={closeMobile} />
                  <Link href="/blog" onClick={closeMobile} className="block py-4 text-slate-900 font-medium text-[15px] border-b border-gray-100">Blog</Link>
                  <Link href="/news" onClick={closeMobile} className="block py-4 text-slate-900 font-medium text-[15px] border-b border-gray-100">News &amp; Events</Link>
                  <Link href="/contact" onClick={closeMobile} className="block py-4 text-slate-900 font-medium text-[15px] border-b border-gray-100">Contact Us</Link>
                </div>
                <div className="mt-8 space-y-4">
                  <Link href="/contact" onClick={closeMobile} className="block w-full text-center bg-[#003975] text-white py-3.5 rounded-full font-semibold text-[15px] hover:bg-[#002a5c] transition-all duration-300">
                    Free Consultation
                  </Link>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <a href="tel:+97714123456" className="flex items-center gap-2 text-slate-600 text-sm">
                      <Phone size={14} className="text-slate-400" />+977 1 4123456
                    </a>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <a href="mailto:info@nexsuseducation.com" className="flex items-center gap-2 text-slate-600 text-sm">
                      <Mail size={14} className="text-slate-400" />info@nexsuseducation.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-slate-500 hover:bg-gray-200 hover:text-slate-700 transition-colors">
                      <FacebookIcon size={15} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-slate-500 hover:bg-gray-200 hover:text-slate-700 transition-colors">
                      <InstagramIcon size={15} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-slate-500 hover:bg-gray-200 hover:text-slate-700 transition-colors">
                      <LinkedInIcon size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

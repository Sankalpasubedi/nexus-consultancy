"use client";

import Link from "next/link";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon, FlagIcon } from "@/lib/icons";

/* ─── Dropdown Data ────────────────────────────────── */

const servicesLinks = [
  { label: "Career Counseling", href: "/services", icon: "Target" },
  { label: "Application & SOP", href: "/services", icon: "PenLine" },
  { label: "Visa Assistance", href: "/services", icon: "ShieldCheck" },
  { label: "Test Preparation", href: "/services", icon: "BookOpen" },
  { label: "Scholarship Guidance", href: "/services", icon: "DollarSign" },
  { label: "Pre-Departure", href: "/services", icon: "Plane" },
];

const studyAbroadLinks = [
  { label: "Compare Destinations", href: "/study-abroad/destinations", icon: "Globe" },
  { label: "Documents Required", href: "/study-abroad/documents", icon: "FileText" },
  { label: "Application Process", href: "/study-abroad/process", icon: "Map" },
];

const coursesLinks = [
  { label: "Information Technology", href: "/courses/it", icon: "Monitor" },
  { label: "Business & Management", href: "/courses/business", icon: "BarChart3" },
  { label: "Engineering", href: "/courses/engineering", icon: "Settings" },
  { label: "Health Sciences", href: "/courses/health", icon: "Heart" },
  { label: "Arts & Design", href: "/courses/arts", icon: "Palette" },
  { label: "Law & Legal Studies", href: "/courses/law", icon: "Scale" },
  { label: "Social Sciences", href: "/courses/social-sciences", icon: "Globe" },
];

const destinationsLinks = [
  { label: "Australia", href: "/destinations/australia", flagCode: "au" },
  { label: "Canada", href: "/destinations/canada", flagCode: "ca" },
  { label: "USA", href: "/destinations/usa", flagCode: "us" },
  { label: "UK", href: "/destinations/uk", flagCode: "gb" },
  { label: "New Zealand", href: "/destinations/new-zealand", flagCode: "nz" },
  { label: "Japan", href: "/destinations/japan", flagCode: "jp" },
  { label: "South Korea", href: "/destinations/south-korea", flagCode: "kr" },
  { label: "Europe", href: "/destinations/europe", flagCode: "eu" },
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

/* ─── Icon Dropdown Component ──────────────────────── */

function NavDropdown({
  label,
  items,
  isTransparent,
  overviewHref,
}: {
  label: string;
  items: { label: string; href: string; icon: string }[];
  isTransparent: boolean;
  overviewHref?: string;
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
      <button
        className={`text-sm transition flex items-center gap-1 ${
          isTransparent ? "text-white" : "text-slate-900"
        }`}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-3 min-w-[220px] overflow-hidden">
              {overviewHref && (
                <>
                  <Link
                    href={overviewHref}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#003975] font-medium hover:bg-blue-50 transition"
                  >
                    <Icon name="ClipboardList" size={16} className="text-[#003975]" /> View All {label}
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                </>
              )}
              {items.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-700 hover:bg-gray-50 hover:text-slate-900 transition"
                >
                  <Icon name={item.icon} size={16} className="text-slate-500" />
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

/* ─── Destinations Dropdown ──────────────────────────── */

function DestinationsDropdown({ isTransparent }: { isTransparent: boolean }) {
  const [open, setOpen] = useState(false);
  const [hoveredDest, setHoveredDest] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => {
      setOpen(false);
      setHoveredDest(null);
    }, 150);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className={`text-sm transition flex items-center gap-1 ${
          isTransparent ? "text-white" : "text-slate-900"
        }`}
      >
        Destinations
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-3 flex overflow-hidden">
              {/* Countries list */}
              <div className="min-w-[220px]">
                <Link
                  href="/destinations"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#003975] font-medium hover:bg-blue-50 transition"
                >
                  <Icon name="Globe" size={16} className="text-[#003975]" /> All Destinations
                </Link>
                <div className="border-t border-gray-100 my-1" />
                {destinationsLinks.map((item) => (
                  <div
                    key={item.href}
                    onMouseEnter={() => setHoveredDest(item.href)}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-5 py-2.5 text-sm transition ${
                        hoveredDest === item.href
                          ? "bg-gray-50 text-slate-900"
                          : "text-slate-700 hover:bg-gray-50 hover:text-slate-900"
                      }`}
                    >
                      <FlagIcon code={item.flagCode} size={14} />
                      {item.label}
                      {hoveredDest === item.href && (
                        <svg className="w-3 h-3 ml-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Sub-pages panel */}
              {hoveredDest && (
                <div className="min-w-[200px] border-l border-gray-100 py-1">
                  {destinationSubPages.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`${hoveredDest}/${sub.slug}`}
                      onClick={() => setOpen(false)}
                      className="block px-5 py-2 text-sm text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile Menu ─────────────────────────────────── */

function MobileAccordion({
  label,
  items,
  overviewHref,
}: {
  label: string;
  items: { label: string; href: string; icon: string }[];
  overviewHref?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-slate-900 font-medium text-sm"
      >
        {label}
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-2 space-y-1">
              {overviewHref && (
                <Link href={overviewHref} className="block py-2 px-3 text-sm text-[#003975] font-medium rounded-lg hover:bg-blue-50 transition">
                  View All
                </Link>
              )}
              {items.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="flex items-center gap-3 py-2 px-3 text-sm text-slate-600 rounded-lg hover:bg-gray-50 transition"
                >
                  <Icon name={item.icon} size={14} className="text-slate-400" />
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

function MobileDestinationsAccordion() {
  const [open, setOpen] = useState(false);
  const [expandedDest, setExpandedDest] = useState<string | null>(null);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-slate-900 font-medium text-sm"
      >
        Destinations
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-2 space-y-1">
              <Link href="/destinations" className="block py-2 px-3 text-sm text-[#003975] font-medium rounded-lg hover:bg-blue-50 transition">
                View All
              </Link>
              {destinationsLinks.map((item) => (
                <div key={item.href}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className="flex-1 flex items-center gap-3 py-2 px-3 text-sm text-slate-600 rounded-lg hover:bg-gray-50 transition"
                    >
                      <FlagIcon code={item.flagCode} size={14} />
                      {item.label}
                    </Link>
                    <button
                      onClick={() => setExpandedDest(expandedDest === item.href ? null : item.href)}
                      className="p-2 text-slate-400"
                    >
                      <svg
                        className={`w-3 h-3 transition-transform ${expandedDest === item.href ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {expandedDest === item.href && (
                    <div className="pl-6 space-y-0.5">
                      {destinationSubPages.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`${item.href}/${sub.slug}`}
                          className="block py-1.5 px-3 text-xs text-slate-500 hover:text-slate-900 transition"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Header ──────────────────────────────────────── */

export default function Header() {
  const { showSidebar } = useHeader();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isTransparent = showSidebar === false;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[99999] transition-all duration-500 ${
          isTransparent
            ? "bg-transparent border-b border-transparent backdrop-blur-sm"
            : "bg-white border-b border-slate-200 shadow-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold hover:text-blue-600 transition ${
              isTransparent ? "text-white" : "text-slate-900"
            }`}
          >
            NEX<span className="text-[#00ab18]">US</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/about"
              className={`text-sm transition ${isTransparent ? "text-white" : "text-slate-900"}`}
            >
              About
            </Link>

            <NavDropdown
              label="Services"
              items={servicesLinks}
              isTransparent={isTransparent}
              overviewHref="/services"
            />

            <NavDropdown
              label="Study Abroad"
              items={studyAbroadLinks}
              isTransparent={isTransparent}
              overviewHref="/study-abroad"
            />

            <NavDropdown
              label="Courses"
              items={coursesLinks}
              isTransparent={isTransparent}
              overviewHref="/courses"
            />

            <DestinationsDropdown isTransparent={isTransparent} />

            <Link
              href="/contact"
              className={`text-sm transition ${isTransparent ? "text-white" : "text-slate-900"}`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA */}
            <Link
              href="/contact"
              className={`hidden sm:inline-flex px-6 py-2 rounded-full text-sm font-medium transition ${
                isTransparent
                  ? "bg-white/10 text-white border border-white/30 hover:bg-white/20"
                  : "bg-[#003975] text-white hover:bg-[#002d5e]"
              }`}
            >
              Get Started
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 ${
                isTransparent ? "text-white" : "text-slate-900"
              }`}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current block"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-current block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current block"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99998] bg-white pt-20 overflow-y-auto lg:hidden"
          >
            <div className="p-6 space-y-1">
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-slate-900 font-medium text-sm border-b border-gray-100"
              >
                About
              </Link>

              <MobileAccordion label="Services" items={servicesLinks} overviewHref="/services" />
              <MobileAccordion label="Study Abroad" items={studyAbroadLinks} overviewHref="/study-abroad" />
              <MobileAccordion label="Courses" items={coursesLinks} overviewHref="/courses" />
              <MobileDestinationsAccordion />

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-slate-900 font-medium text-sm border-b border-gray-100"
              >
                Contact
              </Link>

              <div className="pt-6">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-[#003975] text-white py-3 rounded-full font-medium hover:bg-[#002d5e] transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

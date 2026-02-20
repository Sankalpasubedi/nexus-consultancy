"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/lib/icons";

/* ================================================================
   FLOATING ACTION BUTTONS
   - WhatsApp: always visible (primary lead capture)
   - Call Now: desktop only (blue)
   - Back to Top: appears after scrolling
   - Minimal on mobile: just WhatsApp + scroll-to-top
   ================================================================ */

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    {/* ═══ LEFT SIDE — Service shortcuts ═══ */}
    <div className="fixed bottom-6 left-5 z-50 flex flex-col items-center gap-3">
      {/* ── Free Consultation ── */}
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        href="/contact"
        className="group relative w-12 h-12 rounded-full bg-[#003975] text-white shadow-lg shadow-[#003975]/20 flex items-center justify-center hover:bg-[#002d5e] hover:shadow-xl transition-all"
        aria-label="Free Consultation"
      >
        <Icon name="Users" size={18} />
        <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          Free Consultation
        </span>
      </motion.a>

      {/* ── Test Preparation ── */}
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
        href="/services/test-preparation"
        className="group relative w-12 h-12 rounded-full bg-[#00ab18] text-white shadow-lg shadow-[#00ab18]/20 flex items-center justify-center hover:bg-[#009115] hover:shadow-xl transition-all"
        aria-label="Test Preparation"
      >
        <Icon name="PenLine" size={18} />
        <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          Test Preparation
        </span>
      </motion.a>
    </div>

    {/* ═══ RIGHT SIDE — Contact shortcuts ═══ */}
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3">
      {/* ── Back to Top ── */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:shadow-xl transition-all"
            aria-label="Back to top"
          >
            <Icon name="ArrowUp" size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Call Now — desktop only ── */}
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        href="tel:+97714519495"
        className="hidden md:flex w-12 h-12 rounded-full bg-[#003975] text-white shadow-lg shadow-[#003975]/20 items-center justify-center hover:bg-[#002d5e] hover:shadow-xl transition-all group relative"
        aria-label="Call us"
      >
        <Icon name="Phone" size={18} />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call Now
        </span>
      </motion.a>

      {/* ── WhatsApp — always visible ── */}
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        href="https://wa.me/9779851032197?text=Hi%2C%20I%27m%20interested%20in%20studying%20abroad.%20Can%20you%20help%20me%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:shadow-xl hover:scale-105 transition-all"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        {/* WhatsApp icon */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          Chat with us
        </span>
      </motion.a>
    </div>
    </>
  );
}

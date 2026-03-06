"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/lib/icons";
import { useBranch } from "@/app/contexts/BranchContext";

/* ================================================================
   FLOATING ACTION BUTTONS
   - WhatsApp: always visible (primary lead capture)
   - Call Now: desktop only (blue)
   - Back to Top: appears after scrolling
   - Icon rotates on hover
   ================================================================ */

// Simple button with icon rotation on hover
function ActionButton({
  children,
  className,
  href,
  ariaLabel,
  ...props
}: {
  children: React.ReactNode;
  className: string;
  href: string;
  ariaLabel: string;
  target?: string;
  rel?: string;
}) {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      href={href}
      className={`${className} relative z-10`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);
  const { currentBranch } = useBranch();

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
      <div className="group flex items-center">
        <ActionButton
          href="/contact"
          className="relative w-12 h-12 rounded-full bg-[#003975] text-white shadow-lg shadow-[#003975]/20 flex items-center justify-center hover:bg-[#002d5e] hover:shadow-xl transition-all"
          ariaLabel="Free Consultation"
        >
          <span className="transition-transform duration-300 group-hover:rotate-[360deg]">
            <Icon name="Users" size={18} />
          </span>
        </ActionButton>
        <a href="/contact" className="hidden lg:flex items-center ml-2">
          {/* Arrow pointing left */}
          <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white" />
          <span className="px-3 py-1.5 rounded-r-lg bg-white text-slate-700 text-xs font-medium whitespace-nowrap border border-gray-200 shadow-sm">
            Free Consultation
          </span>
        </a>
      </div>

      {/* ── Test Preparation ── */}
      <div className="group flex items-center">
        <ActionButton
          href="/services/test-preparation"
          className="relative w-12 h-12 rounded-full bg-[#00ab18] text-white shadow-lg shadow-[#00ab18]/20 flex items-center justify-center hover:bg-[#009115] hover:shadow-xl transition-all"
          ariaLabel="Test Preparation"
        >
          <span className="transition-transform duration-300 group-hover:rotate-[360deg]">
            <Icon name="PenLine" size={18} />
          </span>
        </ActionButton>
        <a href="/services/test-preparation" className="hidden lg:flex items-center ml-2">
          {/* Arrow pointing left */}
          <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white" />
          <span className="px-3 py-1.5 rounded-r-lg bg-white text-slate-700 text-xs font-medium whitespace-nowrap border border-gray-200 shadow-sm">
            Test Preparation
          </span>
        </a>
      </div>
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
            className="group w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:shadow-xl transition-all"
            aria-label="Back to top"
          >
            <span className="transition-transform duration-300 group-hover:rotate-[360deg]">
              <Icon name="ArrowUp" size={18} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Call Now — desktop only ── */}
      <div className="group hidden md:flex items-center">
        <a href={`tel:${currentBranch.phone.replace(/\s/g, '')}`} className="hidden lg:flex items-center mr-2">
          <span className="px-3 py-1.5 rounded-l-lg bg-white text-slate-700 text-xs font-medium whitespace-nowrap border border-gray-200 shadow-sm">
            Call Now
          </span>
          {/* Arrow pointing right */}
          <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
        </a>
        <ActionButton
          href={`tel:${currentBranch.phone.replace(/\s/g, '')}`}
          className="w-12 h-12 rounded-full bg-[#003975] text-white shadow-lg shadow-[#003975]/20 flex items-center justify-center hover:bg-[#002d5e] hover:shadow-xl transition-all"
          ariaLabel="Call us"
        >
          <span className="transition-transform duration-300 group-hover:rotate-[360deg]">
            <Icon name="Phone" size={18} />
          </span>
        </ActionButton>
      </div>

      {/* ── WhatsApp — always visible ── */}
      <div className="group flex items-center">
        <a 
          href={`https://wa.me/${currentBranch.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20studying%20abroad.%20Can%20you%20help%20me%3F`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center mr-2"
        >
          <span className="px-3 py-1.5 rounded-l-lg bg-white text-slate-700 text-xs font-medium whitespace-nowrap border border-gray-200 shadow-sm">
            Chat with us
          </span>
          {/* Arrow pointing right */}
          <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
        </a>
        <ActionButton
          href={`https://wa.me/${currentBranch.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20studying%20abroad.%20Can%20you%20help%20me%3F`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:shadow-xl transition-all"
          ariaLabel="Chat on WhatsApp"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          {/* WhatsApp icon */}
          <span className="transition-transform duration-300 group-hover:rotate-[360deg]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 relative z-10">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
        </ActionButton>
      </div>
    </div>
    </>
  );
}

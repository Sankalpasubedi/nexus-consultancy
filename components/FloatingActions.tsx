"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/lib/icons";
import { useBranch } from "@/app/contexts/BranchContext";

/* ================================================================
   FLOATING ACTION BUTTONS
   - WhatsApp: always visible (primary lead capture)
   - Call Now: desktop only (blue)
   - Back to Top: appears after scrolling
  - Whole group wobbles on hover
   ================================================================ */

// Shared floating action bubble (used inside a fully clickable row link)
function ActionBubble({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`${className} relative z-10 shrink-0`}
    >
      {children}
    </motion.span>
  );
}

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);
  const [showWhatsAppOptions, setShowWhatsAppOptions] = useState(false);
  const whatsappCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { currentBranch } = useBranch();
  const labelVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.08 },
  };
  const primaryActionClass =
    "w-12 h-12 rounded-full bg-[#003975] text-white shadow-lg shadow-[#003975]/20 flex items-center justify-center hover:bg-[#002d5e] hover:shadow-xl transition-all";
  const secondaryActionClass =
    "w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 flex items-center justify-center hover:bg-[#36c76c] hover:shadow-xl transition-all";
  const primaryLabelClass =
    "py-1.5 -ml-1 rounded-r-lg bg-[#003975] text-white text-xs font-medium whitespace-nowrap";
  const secondaryLabelClass =
    "py-1.5 -ml-1 rounded-r-lg bg-[#25D366] text-white text-xs font-medium whitespace-nowrap";
  const whatsappText =
    "Hi%2C%20I%27m%20interested%20in%20studying%20abroad.%20Can%20you%20help%20me%3F";
  const contactActions = currentBranch.contactActions ?? {
    callNow: currentBranch.phone,
    chatWithUs: [
      { number: currentBranch.whatsapp, label: currentBranch.whatsapp },
      { number: currentBranch.phone2, label: currentBranch.phone2 },
    ],
  };
  const callNowNumber = contactActions.callNow.replace(/[^0-9]/g, "");
  const whatsappNumbers = contactActions.chatWithUs.slice(0, 2).map((contact) => ({
    href: contact.number.replace(/[^0-9]/g, ""),
    label: contact.number,
    ariaLabel: `Chat on WhatsApp ${contact.number}`,
  }));
  const whatsappMain = whatsappNumbers[0]?.href ?? currentBranch.whatsapp.replace(/[^0-9]/g, "");

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (whatsappCloseTimer.current) {
        clearTimeout(whatsappCloseTimer.current);
      }
    };
  }, []);

  const openWhatsAppOptions = () => {
    if (whatsappCloseTimer.current) {
      clearTimeout(whatsappCloseTimer.current);
      whatsappCloseTimer.current = null;
    }
    setShowWhatsAppOptions(true);
  };

  const closeWhatsAppOptions = () => {
    if (whatsappCloseTimer.current) {
      clearTimeout(whatsappCloseTimer.current);
    }
    whatsappCloseTimer.current = setTimeout(() => {
      setShowWhatsAppOptions(false);
    }, 380);
  };

  return (
    <div className="hidden md:block">
      {/* ═══ LEFT SIDE — Service shortcuts ═══ */}
      <div className="fixed bottom-6 left-5 z-50 flex flex-col items-start gap-3">
        {/* ── Free Consultation ── */}
        <motion.a
          href="/contact"
          aria-label="Free Consultation"
          className="flex items-center"
          variants={{
            initial: {},
            hover: {
              scale: 1.08,
              rotate: [0, -4, 4, -3, 2, 0],
              x: [0, -2, 2, -1, 0],
            },
          }}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <ActionBubble className={primaryActionClass}>
            <span>
              <Icon name="Users" size={18} />
            </span>
          </ActionBubble>
          <motion.span
            className={primaryLabelClass}
            variants={labelVariants}
            initial={{ width: "0px" }}
            animate={{ width: "120px", paddingInline: "10px" }} // adjust to your "small width"
            transition={{
              delay: 2,          // starts after 2 seconds
              duration: 0.8,     // animation speed
              ease: "easeOut"
            }}
            style={{
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap"
            }}
          >
            Free Consultation
          </motion.span>
        </motion.a>

        {/* ── Test Preparation ── */}
        <motion.a
          href="/services/test-preparation"
          aria-label="Test Preparation"
          className="flex items-center"
          variants={{
            initial: {},
            hover: {
              scale: 1.08,
              rotate: [0, -4, 4, -3, 2, 0],
              x: [0, -2, 2, -1, 0],
            },
          }}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <ActionBubble className={secondaryActionClass}>
            <span>
              <Icon name="PenLine" size={18} />
            </span>
          </ActionBubble>
          <motion.span
            className={secondaryLabelClass}
            variants={labelVariants}
            initial={{ width: "0px" }}
            animate={{ width: "120px", paddingInline: "10px" }} // adjust to your "small width"
            transition={{
              delay: 2,          // starts after 2 seconds
              duration: 0.8,     // animation speed
              ease: "easeOut"
            }}
            style={{
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap"
            }}
          >
            Test Preparation
          </motion.span>
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
            className="group w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:shadow-xl transition-all"
            aria-label="Back to top"
          >
            <span className="transition-transform duration-300 group-hover:rotate-360">
              <Icon name="ArrowUp" size={18} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

        {/* ── Call Now — desktop only ── */}
        <motion.a
          href={`tel:${callNowNumber}`}
          aria-label="Call us"
          className="flex items-center"
          variants={{
            initial: {},
            hover: {
              scale: 1.08,
              rotate: [0, -4, 4, -3, 2, 0],
              x: [0, -2, 2, -1, 0],
            },
          }}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <ActionBubble className={primaryActionClass}>
            <span>
              <Icon name="Phone" size={18} />
            </span>
          </ActionBubble>
          
          <motion.span
            className={primaryLabelClass}
            variants={labelVariants}
            initial={{ width: "0px" }}
            animate={{ width: "70px", paddingInline: "10px" }} // adjust to your "small width"
            transition={{
              delay: 2,          // starts after 2 seconds
              duration: 0.8,     // animation speed
              ease: "easeOut"
            }}
            style={{
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap"
            }}
          >
            Call Now
          </motion.span>
        </motion.a>

        {/* ── WhatsApp — always visible ── */}
        <motion.div
          className="relative flex items-center"
          variants={{
            initial: {},
            hover: {
              scale: 1.08,
              rotate: [0, -4, 4, -3, 2, 0],
              x: [0, -2, 2, -1, 0],
            },
          }}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          onMouseEnter={openWhatsAppOptions}
          onMouseLeave={closeWhatsAppOptions}
        >
          <div
            className={`absolute right-full mr-3 flex flex-col gap-2 transition-all duration-200 ease-out ${
              showWhatsAppOptions
                ? "pointer-events-auto opacity-100 translate-x-0"
                : "pointer-events-none opacity-0 translate-x-2"
            }`}
          >
            {whatsappNumbers.map((contact) => (
              <a
                key={contact.href}
                href={`https://wa.me/${contact.href}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-4 rounded-full bg-[#9BE21F] text-[#0E3B08] text-sm font-semibold shadow-md flex items-center justify-center whitespace-nowrap hover:bg-[#8dd51b] transition-colors"
                aria-label={contact.ariaLabel}
              >
                {contact.label}
              </a>
            ))}
          </div>

          <motion.a
            href={`https://wa.me/${whatsappMain}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="relative z-10 flex items-center"
          >
            <ActionBubble className={secondaryActionClass}>
              <span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
            </ActionBubble>
            
            <motion.span
              className={secondaryLabelClass}
              variants={labelVariants}
              initial={{ width: "0px" }}
              animate={{ width: "90px", paddingInline: "10px" }} // adjust to your "small width"
              transition={{
                delay: 2,          // starts after 2 seconds
                duration: 0.8,     // animation speed
                ease: "easeOut"
              }}
              style={{
                display: "inline-block",
                overflow: "hidden",
                whiteSpace: "nowrap"
              }}
            >
              Chat with us
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

const insuranceProviders = [
  {
    name: "Bupa Health Insurance",
    region: "Global / UK / Australia",
    highlight: "Strong international student support",
    description: "Popular for students who want broad coverage, easy claims support, and established provider networks.",
    icon: "ShieldCheck",
  },
  {
    name: "Allianz Care",
    region: "Global",
    highlight: "Flexible plans for students abroad",
    description: "Widely used for international student cover, with options that can suit different study durations and destinations.",
    icon: "Globe",
  },
  {
    name: "NZ Student Health",
    region: "New Zealand",
    highlight: "Student-focused local cover",
    description: "Useful for students heading to New Zealand, where a local student health plan can simplify arrival and support.",
    icon: "HeartPulse",
  },
  {
    name: "Medibank",
    region: "Australia",
    highlight: "Common student health option",
    description: "A familiar choice for students in Australia, especially where local student health requirements matter.",
    icon: "CreditCard",
  },
  {
    name: "Travel Insurance OVC",
    region: "Travel coverage",
    highlight: "Trip protection and medical support",
    description: "Ideal for pre-departure protection, short trips, and added medical cover during travel periods.",
    icon: "Plane",
  },
  {
    name: "OVSC",
    region: "Student cover",
    highlight: "Practical plan for overseas students",
    description: "A simple option to compare alongside other student-friendly health and travel cover products.",
    icon: "CheckCircle",
  },
];

const coveragePoints = [
  "Emergency medical support",
  "Hospital and outpatient care",
  "Prescription and medication support",
  "Trip and travel-related protection",
  "Visa-compliant student planning",
];

const comparisonNotes = [
  "Different destinations require different cover standards.",
  "The right plan often depends on visa rules and the duration of study.",
  "We help students compare cover features, exclusions, and claim steps.",
];

const insuranceLogos = [
  { name: "Bupa", logo: "/student/bupa.png" },
  { name: "Allianz", logo: "/student/allianz.jpg" },
  { name: "Medibank", logo: "/student/medibank.png" },
  { name: "NIB", logo: "/student/nib.png" },
  { name: "Guard.me", logo: "/student/guard-me.png" },
  { name: "ISO", logo: "/student/iso.png" },
];

const topLogos = [...insuranceLogos, ...insuranceLogos, ...insuranceLogos];
const bottomLogos = [...insuranceLogos, ...insuranceLogos, ...insuranceLogos];

export default function HealthInsuranceClient() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-24 lg:pt-28 text-slate-900">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="text-center mb-10">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-[#1f4f8b]">Health Insurance</p>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#101b38]">
            Our Insurance Partners
          </h1>
        </div>

        <div className="mb-8 space-y-4 rounded-[28px] border border-[#d8e3ef] bg-white px-4 py-5 shadow-[0_12px_30px_rgba(16,27,56,0.05)] overflow-hidden">
          <div className="relative">
            <div className="flex gap-4" style={{ animation: "scrollLeft 36s linear infinite" }}>
              {topLogos.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex h-23 min-w-42.5 shrink-0 items-center justify-center rounded-2xl border border-[#edf1f7] bg-[#fbfcfe] px-6 py-4 transition-transform duration-300 hover:scale-[1.03]"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={130}
                    height={54}
                    className="h-auto max-h-13 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.6fr] gap-6 lg:gap-8 items-start">
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[30px] border border-[#d7e2ef] bg-white p-4 sm:p-5 shadow-[0_10px_30px_rgba(16,27,56,0.06)] lg:sticky lg:top-28"
          >
            <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[#1f4f8b]">What to compare</p>
            <div className="mt-4 space-y-3">
              {comparisonNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-2xl border border-[#dfe8f4] bg-[#f3f7fc] px-4 py-4 text-sm leading-relaxed text-slate-600"
                >
                  {note}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-[#dfe8f4] bg-[#f3f7fc] px-4 py-4">
              <p className="text-sm font-semibold text-slate-900">Tip</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Ask us to compare visa requirements with provider options before you buy.
              </p>
            </div>
          </motion.aside>

          <div>
            <StaggerContainer className="grid gap-4 md:grid-cols-2">
              {insuranceProviders.map((provider) => (
                <StaggerItem key={provider.name}>
                  <motion.article
                    whileHover={{ y: -3 }}
                    className="relative h-full overflow-hidden rounded-[30px] border border-[#d8e3ef] bg-white px-4 py-5 sm:px-5 sm:py-6 shadow-[0_12px_30px_rgba(16,27,56,0.05)]"
                  >
                    <div className="relative z-10 flex items-start gap-3 sm:gap-4">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf3fa] text-[#1f4f8b]">
                        <Icon name={provider.icon} size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h2 className="text-[1.05rem] sm:text-[1.15rem] font-bold leading-snug text-[#101b38]">
                              {provider.name}
                            </h2>
                            <p className="mt-1 text-sm font-semibold text-[#1f4f8b]">{provider.region}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{provider.description}</p>
                      </div>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-4 rounded-[30px] border border-[#d8e3ef] bg-white px-5 py-5 sm:px-6 shadow-[0_12px_30px_rgba(16,27,56,0.05)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#101b38]">Need the right cover for your destination?</h3>
                  <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-600">
                    We can help you choose between health, travel, and student-focused insurance options.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f4f8b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163e6f] whitespace-nowrap"
                >
                  Talk to us <Icon name="ArrowRight" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}

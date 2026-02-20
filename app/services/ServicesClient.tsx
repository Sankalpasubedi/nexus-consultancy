"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect } from "react";

/* ─── Data ─────────────────────────────────────────── */

const services = [
  {
    icon: "BookOpen",
    title: "Test Preparation",
    description:
      "Expert coaching for IELTS, TOEFL, PTE, GRE, GMAT, and SAT with proven strategies and practice materials.",
    features: ["One-on-one Tutoring", "Mock Tests", "Score improvement guaranteed"],
    link: "/services/test-preparation",
    color: "#6366f1",
  },
  {
    icon: "Target",
    title: "Counseling",
    description:
      "Personalized guidance to help you choose the right course, university, and destination for your goals.",
    features: ["Career Assessment", "University Selection", "Course Matching"],
    link: "/services/career-counseling",
    color: "#0ea5e9",
  },
  {
    icon: "FileText",
    title: "SOP & Application Support",
    description:
      "Professional assistance with statements of purpose, essays, and complete application preparation.",
    features: ["SOP Writing", "Document Review", "Application Tracking"],
    link: "/services/sop-writing-assistance",
    color: "#8b5cf6",
  },
  {
    icon: "ShieldCheck",
    title: "Student Visa Assistance",
    description:
      "End-to-end visa application support with high success rates across all major study destinations.",
    features: ["Document Checklist", "Interview Prep", "Application Review"],
    link: "/services/student-visa-assistance",
    color: "#10b981",
  },
  {
    icon: "Plane",
    title: "Pre-Departure Support",
    description:
      "Comprehensive briefings on accommodation, culture, banking, and settling into your new country.",
    features: ["Orientation Sessions", "Travel Assistance", "Student Community"],
    link: "/services/pre-departure-support",
    color: "#f59e0b",
  },
  {
    icon: "DollarSign",
    title: "Scholarship Guidance",
    description:
      "Access to exclusive scholarship opportunities and expert help with scholarship applications.",
    features: ["Scholarship Search", "Application Support", "Funding Advice"],
    link: "/services/scholarship-guidance",
    color: "#ec4899",
  },
];

/* ─── Component ────────────────────────────────────── */

export default function ServicesPage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main>
      {/* ── Hero with background image ── */}
      <section className="relative min-h-[420px] md:min-h-[480px] overflow-hidden">
        <Image
          src="/contact/image.png"
          alt="Students in discussion"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/80 via-[#002d5e]/60 to-transparent" />
        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-[#00ab18]/90 text-white text-xs font-semibold tracking-wide">
              Comprehensive Support
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-lg leading-[1.15]">
              Our
              <br />
              Services
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed mb-8">
              From test preparation to landing in your dream destination, we provide end-to-end support for your study abroad journey.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition"
              >
                Book Free Consultation <Icon name="ArrowRight" size={14} />
              </Link>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 text-white text-sm font-medium hover:underline underline-offset-4"
              >
                Explore Destinations
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <StaggerItem key={s.title}>
                <HoverCard>
                  <div className="bg-white rounded-2xl p-7 h-full border border-gray-100 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6">
                      <Icon name={s.icon} size={20} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                      {s.description}
                    </p>

                    {/* Feature bullets */}
                    <div className="space-y-3 mb-6">
                      {s.features.map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-3 text-sm text-slate-600"
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: s.color }}
                          />
                          {f}
                        </div>
                      ))}
                    </div>

                    {/* Divider + Learn More */}
                    <div className="border-t border-gray-100 pt-4 mt-auto">
                      <Link
                        href={s.link}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:gap-3 transition-all"
                      >
                        Learn More <Icon name="ArrowRight" size={14} />
                      </Link>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">
        {/* Decorative green glow */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#003975]/5 rounded-full blur-3xl pointer-events-none" />

        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Ready to
              <br />
              Start Your Journey?
            </h2>
            <p className="text-slate-500 text-base mb-8 max-w-md mx-auto">
              Book a free consultation with our expert counselors today and take the first step towards your dream education.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                Book Counselling <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect } from "react";
import { Icon } from "@/lib/icons";

const links = [
  {
    icon: "Globe",
    title: "Destinations",
    description: "Compare countries side-by-side on costs, education quality, work opportunities, and more.",
    href: "/study-abroad/compare-destinations",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    icon: "FileText",
    title: "Documents Required",
    description: "Complete checklist of every document you need for applications and visa.",
    href: "/study-abroad/documents-required",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    icon: "Map",
    title: "Application Process",
    description: "Step-by-step guide from research to arrival, with timelines and tips.",
    href: "/study-abroad/application-process",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    icon: "Compass",
    title: "Study Abroad Guide",
    description: "Your complete roadmap to studying overseas — from planning to departure.",
    href: "/study-abroad/complete-guide",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
];

export default function StudyAbroadPage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#003975] via-[#002d5e] to-[#001a3a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 text-sm font-medium">
              <Icon name="Plane" size={20} /> Study Abroad
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
              Your Complete Guide to <span className="text-[#00ab18]">Studying Abroad</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl text-blue-100 max-w-2xl">
              Everything you need to know, from choosing a destination to settling in at your new university.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Links */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {links.map((l) => (
              <StaggerItem key={l.title}>
                <HoverCard>
                  <Link href={l.href} className="block h-full">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 h-full group relative overflow-hidden">
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-900 opacity-5 blur-2xl group-hover:opacity-10 transition rounded-full" />
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 shadow-lg">
                        <Icon name={l.icon} size={28} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">{l.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{l.description}</p>
                      <span className="text-[#003975] text-sm font-medium group-hover:gap-2 transition-all inline-flex items-center gap-1">
                        Explore →
                      </span>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Personalized Guidance?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Our counselors will create a step-by-step plan tailored just for you.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                Book Free Consultation →
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

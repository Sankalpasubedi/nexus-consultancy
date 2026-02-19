"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem, HoverCard } from "@/lib/animations";
import { Icon } from "@/lib/icons";

const services = [
  {
    id: 1,
    title: "Career Counseling",
    description: "Personalized guidance to identify the perfect course and university aligned with your career goals.",
    icon: "Compass",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    title: "Application Support",
    description: "End-to-end assistance with university applications, SOPs, and documentation.",
    icon: "PenLine",
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: 3,
    title: "Visa Assistance",
    description: "Expert visa guidance with high success rates and interview preparation.",
    icon: "Plane",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "Test Preparation",
    description: "Comprehensive prep for IELTS, TOEFL, GRE, GMAT, and other standardized tests.",
    icon: "BookOpen",
    color: "from-violet-600 to-purple-600",
  },
  {
    id: 5,
    title: "Scholarship Guidance",
    description: "Maximize your chances with scholarship applications and financial aid support.",
    icon: "Trophy",
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: 6,
    title: "Pre-Departure Briefing",
    description: "Prepare for your journey with accommodation, culture, and essential travel guidance.",
    icon: "Globe",
    color: "from-cyan-500 to-blue-500",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium border border-gray-200">
              <Icon name="Zap" size={16} /> Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need for Success
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Comprehensive support from initial consultation to your first day on campus
            </p>
          </div>
        </FadeUp>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <HoverCard className="h-full">
                <div className="p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-xl transition-all duration-300 h-full group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon name={service.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.3}>
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link href="/services" className="inline-flex items-center gap-2 bg-[#003975] text-white px-8 py-4 rounded-full font-medium hover:bg-[#002d5e] transition-colors shadow-lg shadow-blue-500/20">
                Explore All Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

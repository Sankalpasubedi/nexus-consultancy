"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, FadeLeft, FadeRight } from "@/lib/animations";
import { Icon } from "@/lib/icons";

const features = [
  {
    id: 1,
    title: "Scholarship Assistance",
    description:
      "We help you find and apply for scholarships worth up to full tuition coverage. Our students have collectively secured over $50M in scholarships.",
    icon: "Trophy",
  },
  {
    id: 2,
    title: "Fast-Track Admission",
    description:
      "Skip the complexity. Our direct partnerships with 500+ universities mean faster offers and streamlined applications.",
    icon: "Zap",
  },
  {
    id: 3,
    title: "Expert Application Help",
    description:
      "From SOPs to recommendation letters, our team of certified professionals ensures every application is polished and compelling.",
    icon: "PenLine",
  },
  {
    id: 4,
    title: "Career-Focused Guidance",
    description:
      "We don't just get you admitted. We help you choose programs that align with your long-term career goals and growth.",
    icon: "Target",
  },
];

export default function HowWeHelpSection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#003975] to-[#001d3d] text-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/[0.07] rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-300/[0.05] rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-indigo-400/[0.06] rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium text-white/90">
              <Icon name="Sparkles" size={16} className="text-[#00ab18]" />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How Nexsus Helps You
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              From your first enquiry to graduation day, we provide
              comprehensive support
            </p>
          </div>
        </FadeUp>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Wrapper = index % 2 === 0 ? FadeLeft : FadeRight;
            return (
              <Wrapper key={feature.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] transition-all duration-500"
                >
                  {/* Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Icon
                      name={feature.icon}
                      size={24}
                      className="text-white"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </Wrapper>
            );
          })}
        </div>

        {/* CTA */}
        <FadeUp delay={0.4}>
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg shadow-black/20"
              >
                Start Your Journey
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, FadeLeft, FadeRight } from "@/lib/animations";
import { Icon } from "@/lib/icons";

const steps = [
  {
    id: 1,
    title: "Discovery & Counseling",
    description:
      "We assess your profile, goals, and preferences to create a personalized education plan.",
    icon: "Search",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    id: 2,
    title: "University Selection",
    description:
      "Shortlist universities that match your aspirations, budget, and academic background.",
    icon: "ClipboardList",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    id: 3,
    title: "Application & Visa",
    description:
      "Complete applications with expert guidance and navigate visa requirements seamlessly.",
    icon: "FileText",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    id: 4,
    title: "Pre-Departure Prep",
    description:
      "Get ready with accommodation, travel bookings, and essential pre-departure briefings.",
    icon: "Plane",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    id: 5,
    title: "Begin Your Journey",
    description:
      "Arrive confident and prepared to excel in your new academic environment.",
    icon: "GraduationCap",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
];

export default function JourneySection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#fafaf8]">
      <div className="max-w-[1440px] mx-auto">
        {/* ── Header ── */}
        <FadeUp>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium border border-gray-200">
              <Icon name="Map" size={16} />
              Your Pathway
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              A clear, step-by-step process designed to make your study abroad
              dream a reality with confidence at every stage.
            </p>
          </div>
        </FadeUp>

        {/* ── DESKTOP TIMELINE ── */}
        <div className="hidden md:block relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-[#003975]/20 via-[#00CCCC]/20 to-[#00D81E]/20" />

          <div className="space-y-0">
            {steps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              const Wrapper = isLeft ? FadeLeft : FadeRight;

              return (
                <div key={step.id} className="py-12">
                  <div
                    className={`flex items-center ${
                      isLeft ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Card side */}
                    <div className="w-[calc(50%-2rem)] px-4">
                      <Wrapper delay={idx * 0.1}>
                        <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-500">
                          {/* Left accent bar */}
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${step.gradient}`}
                          />

                          {/* Ambient glow */}
                          <div
                            className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br ${step.gradient} opacity-[0.07] blur-3xl rounded-full group-hover:opacity-[0.12] transition-opacity duration-500`}
                          />

                          <div className="flex items-start gap-5 relative z-10">
                            {/* Icon badge */}
                            <div
                              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                            >
                              <Icon
                                name={step.icon}
                                size={22}
                                className="text-white"
                              />
                            </div>

                            <div>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1.5">
                                Step {step.id}
                              </p>
                              <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {step.title}
                              </h3>
                              <p className="text-slate-500 text-sm leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Wrapper>
                    </div>

                    {/* Center dot */}
                    <div className="relative w-16 flex justify-center z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15, type: "spring", stiffness: 260, damping: 20 }}
                        className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm"
                      >
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} shadow-lg flex items-center justify-center`}
                        >
                          <span className="text-white text-xs font-bold">
                            {step.id}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Empty side */}
                    <div className="w-[calc(50%-2rem)]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE CARDS (no timeline line) ── */}
        <div className="md:hidden space-y-5">
          {steps.map((step, idx) => (
            <FadeUp key={step.id} delay={idx * 0.08}>
              <div className="relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                {/* Left accent bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${step.gradient}`}
                />

                {/* Ambient glow */}
                <div
                  className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${step.gradient} opacity-[0.07] blur-2xl rounded-full`}
                />

                <div className="flex items-start gap-4 relative z-10">
                  {/* Icon badge */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <Icon
                      name={step.icon}
                      size={20}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">
                      Step {step.id}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── CTA ── */}
        <FadeUp delay={0.5}>
          <div className="flex justify-center mt-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#003975] text-white px-8 py-4 rounded-full font-medium hover:bg-[#002d5e] transition-colors shadow-lg shadow-blue-500/20"
              >
                Start Your Journey Today
                <svg
                  className="w-5 h-5"
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

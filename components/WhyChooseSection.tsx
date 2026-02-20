"use client";

import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";

const stats = [
  { value: 15000, suffix: "+", label: "Students Guided" },
  { value: 98, suffix: "%", label: "Visa Success Rate" },
  { value: 500, suffix: "+", label: "Partner Universities" },
  { value: 50, prefix: "$", suffix: "M+", label: "Scholarships Secured" },
];

const trustCards = [
  {
    icon: "Users",
    title: "Expert Counselors",
    description:
      "Certified PIER professionals with 10+ years of experience in international education",
  },
  {
    icon: "ShieldCheck",
    title: "End-to-End Support",
    description:
      "From initial counselling to post-arrival assistance, we\u2019re with you every step",
  },
  {
    icon: "Award",
    title: "Official Test Center",
    description:
      "Authorized IELTS test preparation and registration partner",
  },
  {
    icon: "Globe",
    title: "Global Network",
    description:
      "Direct partnerships with 500+ universities across 30+ countries",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* ── Header ── */}
        <FadeUp>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-50 text-slate-600 text-sm font-medium border border-gray-200">
              <Icon name="Star" size={16} />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 tracking-tight">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-[#003975] via-[#003975] to-[#00ab18] bg-clip-text text-transparent">
                15,000+
              </span>{" "}
              Students Worldwide
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              A decade of excellence helping students achieve their international
              education dreams with unmatched expertise and care.
            </p>
          </div>
        </FadeUp>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          {/* LEFT: Stats card */}
          <FadeUp className="lg:w-[45%] flex" delay={0.1}>
            <div className="relative w-full bg-slate-900 rounded-3xl p-10 lg:p-12 overflow-hidden flex flex-col justify-center">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-emerald-600/10 pointer-events-none" />
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-10">
                  Our Track Record
                </p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                  {stats.map((stat, idx) => (
                    <div key={idx}>
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix || ""}
                        duration={2.5}
                        className="text-4xl lg:text-5xl font-bold text-white tracking-tight"
                      />
                      <p className="text-slate-400 text-sm mt-2 leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom subtle divider */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Numbers that reflect our commitment to every student&apos;s
                    success and a journey built on trust.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* RIGHT: Trust indicator cards */}
          <div className="lg:w-[55%]">
            <StaggerContainer className="flex flex-col gap-4">
              {trustCards.map((card, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{
                      y: -2,
                      boxShadow:
                        "0 20px 40px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 57, 117, 0.06)",
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white border border-gray-200/80 rounded-2xl p-6 cursor-default group"
                  >
                    <div className="flex items-start gap-5">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200/60 flex items-center justify-center flex-shrink-0 group-hover:from-[#003975]/10 group-hover:to-[#006BDB]/10 group-hover:border-blue-200/60 transition-all duration-300">
                        <Icon
                          name={card.icon}
                          size={22}
                          className="text-slate-600 group-hover:text-[#003975] transition-colors duration-300"
                        />
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                          {card.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

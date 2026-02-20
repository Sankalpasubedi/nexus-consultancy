"use client";

import { motion } from "framer-motion";
import { FadeUp, AnimatedCounter } from "@/lib/animations";
import { Users } from "lucide-react";

const universities = [
  "OXFORD", "CAMBRIDGE", "MIT", "STANFORD",
  "HARVARD", "YALE", "TORONTO", "MELBOURNE",
  "SYDNEY", "McGILL", "UCL", "IMPERIAL",
  "AUCKLAND", "MONASH", "TOKYO", "QUEENSLAND",
];

const stats = [
  { value: 98, suffix: "%", label: "Visa Success Rate" },
  { value: 50, prefix: "$", suffix: "M+", label: "Scholarships Secured" },
  { value: 15000, suffix: "+", label: "Students Placed" },
  { value: 30, suffix: "+", label: "Countries Covered" },
];

export default function PartnersSection() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-50 text-slate-600 text-sm font-medium border border-gray-200/80">
              <Users size={14} className="text-[#003975]" />
              Trusted Partners
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              500+ Partner Universities
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Official partnerships with world-renowned institutions across the globe
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="relative overflow-hidden mb-20">
            <div className="fade-edges">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...universities, ...universities].map((uni, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center justify-center mx-3 px-10 py-8 bg-gray-50/80 border border-gray-100 rounded-2xl min-w-[180px] hover:border-[#003975]/30 transition-colors"
                  >
                    <p className="text-gray-400 text-sm tracking-[0.2em] font-medium">{uni}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                    {stat.prefix || ""}<AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

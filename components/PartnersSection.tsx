"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem, AnimatedCounter } from "@/lib/animations";
import { Users } from "lucide-react";

const universities = [
  "OXFORD", "CAMBRIDGE", "MIT", "STANFORD",
  "HARVARD", "YALE", "U OF T", "MELBOURNE",
  "SYDNEY", "McGILL", "UCL", "IMPERIAL",
];

const stats = [
  { value: 98, suffix: "%", label: "Visa Success Rate" },
  { value: 50, prefix: "$", suffix: "M+", label: "Scholarships Secured" },
  { value: 15000, suffix: "+", label: "Students Placed" },
];

export default function PartnersSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
              <Users size={16} /> Trusted Partners
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">500+ Partner Universities</h2>
            <p className="text-lg text-slate-500">Official partnerships with world-renowned institutions across the globe</p>
          </div>
        </FadeUp>

        {/* University Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {universities.map((uni, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ scale: 1.05, borderColor: "#003975" }}
                className="bg-gradient-to-br from-slate-50 to-white border border-gray-200 rounded-2xl p-8 md:p-10 text-center flex items-center justify-center min-h-[120px] transition-all cursor-pointer"
              >
                <p className="text-gray-400 text-sm tracking-widest font-medium">{uni}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats Bar */}
        <FadeUp delay={0.2}>
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-700">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center px-6 py-4 md:py-0">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.prefix || ""}<AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

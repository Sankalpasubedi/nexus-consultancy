"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp, AnimatedCounter } from "@/lib/animations";
import { Users } from "lucide-react";

const topPartners = [
  { name: "Oxford", logo: "/partners/oxford.svg" },
  { name: "Cambridge", logo: "/partners/cambridge.svg" },
  { name: "MIT", logo: "/partners/mit.svg" },
  { name: "Stanford", logo: "/partners/stanford.svg" },
  { name: "Harvard", logo: "/partners/harvard.svg" },
  { name: "Yale", logo: "/partners/yale.svg" },
  { name: "Toronto", logo: "/partners/toronto.svg" },
  { name: "Melbourne", logo: "/partners/melbourne.svg" },
  { name: "Sydney", logo: "/partners/sydney.svg" },
  { name: "UCL", logo: "/partners/ucl.svg" },
];

const bottomPartners = [
  { name: "Imperial", logo: "/partners/imperial.svg" },
  { name: "Princeton", logo: "/partners/princeton.svg" },
  { name: "Columbia", logo: "/partners/columbia.svg" },
  { name: "Cornell", logo: "/partners/cornell.svg" },
  { name: "ETH Zurich", logo: "/partners/eth-zurich.svg" },
  { name: "NUS", logo: "/partners/nus.svg" },
  { name: "McGill", logo: "/partners/mcgill.svg" },
  { name: "LSE", logo: "/partners/lse.svg" },
  { name: "Edinburgh", logo: "/partners/edinburgh.svg" },
  { name: "Monash", logo: "/partners/monash.svg" },
];

const stats = [
  { value: 98, suffix: "%", label: "Visa Success Rate" },
  { value: 50, prefix: "$", suffix: "M+", label: "Scholarships Secured" },
  { value: 15000, suffix: "+", label: "Students Placed" },
  { value: 30, suffix: "+", label: "Countries Covered" },
];

export default function PartnersSection() {
  const [topPaused, setTopPaused] = useState(false);
  const [bottomPaused, setBottomPaused] = useState(false);

  return (
    <section className="py-24 md:py-40 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <FadeUp>
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium border border-gray-200/80">
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
      </div>

      {/* Dual Carousel */}
      <FadeUp delay={0.1}>
        <div className="space-y-5 mb-20">
          {/* Top Row - Moving Left */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setTopPaused(true)}
            onMouseLeave={() => setTopPaused(false)}
          >
            <div
              className="flex gap-5"
              style={{
                animation: "scrollLeft 35s linear infinite",
                animationPlayState: topPaused ? "paused" : "running",
              }}
            >
              {[...topPartners, ...topPartners, ...topPartners].map((partner, idx) => (
                <div
                  key={idx}
                  className="shrink-0 flex items-center justify-center px-10 py-6 bg-white border border-gray-100 rounded-2xl min-w-[180px] h-[100px] hover:scale-105 transition-all duration-300 group"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-[50px] w-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Moving Right */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setBottomPaused(true)}
            onMouseLeave={() => setBottomPaused(false)}
          >
            <div
              className="flex gap-5"
              style={{
                animation: "scrollRight 35s linear infinite",
                animationPlayState: bottomPaused ? "paused" : "running",
              }}
            >
              {[...bottomPartners, ...bottomPartners, ...bottomPartners].map((partner, idx) => (
                <div
                  key={idx}
                  className="shrink-0 flex items-center justify-center px-10 py-6 bg-white border border-gray-100 rounded-2xl min-w-[180px] h-[100px] hover:scale-105 transition-all duration-300 group"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-[50px] w-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp delay={0.2}>
          <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-700 rounded-3xl p-10 md:p-16">
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
    </section>
  );
}

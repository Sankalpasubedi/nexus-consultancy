"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp, AnimatedCounter } from "@/lib/animations";
import { Users } from "lucide-react";

const topPartners = [
  { name: "Oxford", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/200px-Oxford-University-Circlet.svg.png" },
  { name: "Cambridge", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/200px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png" },
  { name: "MIT", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/200px-MIT_logo.svg.png" },
  { name: "Stanford", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/200px-Stanford_Cardinal_logo.svg.png" },
  { name: "Harvard", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/200px-Harvard_University_coat_of_arms.svg.png" },
  { name: "Yale", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Yale_University_logo.svg/200px-Yale_University_logo.svg.png" },
  { name: "Toronto", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Utoronto_coa.svg/200px-Utoronto_coa.svg.png" },
  { name: "Melbourne", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/University_of_Melbourne_logo.svg/200px-University_of_Melbourne_logo.svg.png" },
  { name: "Sydney", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/University_of_Sydney_Logo.svg/200px-University_of_Sydney_Logo.svg.png" },
  { name: "UCL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/UCL_Logo.svg/200px-UCL_Logo.svg.png" },
];

const bottomPartners = [
  { name: "Imperial", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Imperial_College_London_crest.svg/200px-Imperial_College_London_crest.svg.png" },
  { name: "Princeton", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/200px-Princeton_seal.svg.png" },
  { name: "Columbia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Columbia_University_shield.svg/200px-Columbia_University_shield.svg.png" },
  { name: "Cornell", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Cornell_University_logo.svg/200px-Cornell_University_logo.svg.png" },
  { name: "ETH Zurich", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ETH_Z%C3%BCrich_Logo.svg/200px-ETH_Z%C3%BCrich_Logo.svg.png" },
  { name: "NUS", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/NUS_Coat_of_Arms.svg/200px-NUS_Coat_of_Arms.svg.png" },
  { name: "McGill", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/McGill_University_CoA.svg/200px-McGill_University_CoA.svg.png" },
  { name: "LSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/LSE_Logo.svg/200px-LSE_Logo.svg.png" },
  { name: "Edinburgh", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/University_of_Edinburgh_coat_of_arms.svg/200px-University_of_Edinburgh_coat_of_arms.svg.png" },
  { name: "Monash", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Monash_University_logo.svg/200px-Monash_University_logo.svg.png" },
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
    <section className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <div className="text-center mb-16">
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
                  className="flex-shrink-0 flex items-center justify-center px-10 py-6 bg-white border border-gray-100 rounded-2xl min-w-[180px] h-[100px] hover:border-[#003975]/30 hover:shadow-sm hover:scale-105 transition-all duration-300 group"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-[50px] w-auto transition-transform duration-300 group-hover:scale-110"
                    unoptimized
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
                  className="flex-shrink-0 flex items-center justify-center px-10 py-6 bg-white border border-gray-100 rounded-2xl min-w-[180px] h-[100px] hover:border-[#003975]/30 hover:shadow-sm hover:scale-105 transition-all duration-300 group"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-[50px] w-auto transition-transform duration-300 group-hover:scale-110"
                    unoptimized
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

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedCounter, FadeUp } from "@/lib/animations";

const stats = [
  { value: 15000, suffix: "+", label: "Students Placed" },
  { value: 500, suffix: "+", label: "Partner Universities" },
  { value: 30, suffix: "+", label: "Countries" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-green-200/40 to-emerald-300/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 to-indigo-300/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-amber-100/30 to-orange-200/10 rounded-full blur-[80px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center pt-32 pb-16">
        {/* Badge */}
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-200/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-600">Your Global Education Partner</span>
          </div>
        </FadeUp>

        {/* Headline */}
        <FadeUp delay={0.15}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Transform Your
            <br />
            <span className="text-gradient">Future</span>
          </h1>
        </FadeUp>

        {/* Subheadline */}
        <FadeUp delay={0.3}>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
            Expert guidance for your international education journey. From university selection to visa success, we&apos;re with you every step.
          </p>
        </FadeUp>

        {/* CTA Buttons */}
        <FadeUp delay={0.45}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 bg-[#003975] text-white px-8 py-4 rounded-full font-medium hover:bg-[#002d5e] transition-colors shadow-lg shadow-blue-500/20"
              >
                Start Your Journey
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Book a Consultation
              </Link>
            </motion.div>
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={0.6}>
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-slate-400" />
        </div>
      </motion.div>
    </section>
  );
}
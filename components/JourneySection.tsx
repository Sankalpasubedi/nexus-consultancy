"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, FadeLeft, FadeRight } from "@/lib/animations";
import { Icon } from "@/lib/icons";

const steps = [
  {
    id: 1,
    title: "Discovery & Counseling",
    description: "We assess your profile, goals, and preferences to create a personalized education plan.",
    icon: "Search",
    gradient: "from-[#003975] to-[#006BDB]",
  },
  {
    id: 2,
    title: "University Selection",
    description: "Shortlist universities that match your aspirations, budget, and academic background.",
    icon: "ClipboardList",
    gradient: "from-[#006EE2] to-[#17C1FF]",
  },
  {
    id: 3,
    title: "Application & Visa",
    description: "Complete applications with expert guidance and navigate visa requirements seamlessly.",
    icon: "FileText",
    gradient: "from-[#1D92FF] to-[#00CCCC]",
  },
  {
    id: 4,
    title: "Pre-Departure Prep",
    description: "Get ready with accommodation, travel bookings, and essential pre-departure briefings.",
    icon: "Plane",
    gradient: "from-[#00CCCC] to-[#00FF7F]",
  },
  {
    id: 5,
    title: "Begin Your Journey",
    description: "Arrive confident and prepared to excel in your new academic environment.",
    icon: "GraduationCap",
    gradient: "from-[#008112] to-[#00D81E]",
  },
];

export default function JourneySection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
              <Icon name="Map" size={16} /> Your Pathway
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">The Student Journey</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              A clear, step-by-step process designed to make your study abroad dream a reality
            </p>
          </div>
        </FadeUp>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-blue-200 via-purple-200 to-green-200" />

          <div className="space-y-20">
            {steps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              const Wrapper = isLeft ? FadeLeft : FadeRight;

              return (
                <div key={step.id} className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Card */}
                  <div className="w-1/2 px-8">
                    <Wrapper delay={idx * 0.1}>
                      <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Left accent */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${step.gradient}`} />

                        {/* Glow */}
                        <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${step.gradient} opacity-10 blur-2xl rounded-full`} />

                        <div className="flex items-start gap-4 relative z-10">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <Icon name={step.icon} size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-400 font-medium mb-1">Step {step.id}</p>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </Wrapper>
                  </div>

                  {/* Center Dot */}
                  <div className="relative w-14 flex justify-center z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, type: "spring" }}
                      className="w-14 h-14 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center shadow-sm"
                    >
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-b ${step.gradient} shadow-lg`} />
                    </motion.div>
                  </div>

                  <div className="w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <FadeUp delay={0.5}>
          <div className="flex justify-center mt-20">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/destinations" className="inline-flex items-center gap-2 bg-[#003975] text-white px-8 py-4 rounded-full font-medium hover:bg-[#002d5e] transition shadow-lg shadow-blue-500/20">
                Start Your Journey Today
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

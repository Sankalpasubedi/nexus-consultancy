"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem, HoverCard } from "@/lib/animations";
import { Icon } from "@/lib/icons";

const services = [
  {
    id: 1,
    title: "Career Counseling",
    description:
      "Not sure where to start? Our experienced counselors sit down with you, understand your goals, budget, and academic background, then map out a personalized study plan that makes sense for your future.",
    icon: "Compass",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    features: ["1-on-1 sessions", "Career pathway mapping", "University shortlisting"],
  },
  {
    id: 2,
    title: "University Application",
    description:
      "From crafting your Statement of Purpose to organizing transcripts and recommendation letters, we handle the paperwork so you can focus on preparing for your new chapter abroad.",
    icon: "PenLine",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    features: ["SOP & essay review", "Document checklist", "Application tracking"],
  },
  {
    id: 3,
    title: "Visa Processing",
    description:
      "With a 98% visa success rate, our visa team knows exactly what embassies look for. We prepare your documents, conduct mock interviews, and guide you every step of the way.",
    icon: "ShieldCheck",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    features: ["98% success rate", "Mock interviews", "File preparation"],
  },
  {
    id: 4,
    title: "Test Preparation",
    description:
      "Get exam-ready with our structured IELTS, PTE, TOEFL, and GRE/GMAT prep courses. Small batches, experienced instructors, and real practice tests to get the score you need.",
    icon: "BookOpen",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    features: ["IELTS & PTE", "GRE & GMAT", "Real practice tests"],
  },
  {
    id: 5,
    title: "Scholarship Guidance",
    description:
      "Education abroad doesn\u2019t have to break the bank. We help you find and apply for scholarships that match your profile. Our students have secured over NPR 5 Billion in scholarships collectively.",
    icon: "Trophy",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    features: ["Scholarship matching", "Application support", "Financial planning"],
  },
  {
    id: 6,
    title: "Pre-Departure Support",
    description:
      "You got your visa, now what? We help with accommodation bookings, airport pickup arrangements, cultural orientation, and everything you need to feel confident before you fly.",
    icon: "Plane",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    features: ["Accommodation help", "Airport pickup", "Cultural briefing"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-slate-50 text-slate-600 text-sm font-medium border border-gray-200/80 shadow-sm">
              <Icon name="Zap" size={14} className="text-[#003975]" />
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Everything You Need
              <br />
              <span className="text-gradient">for Success</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Comprehensive support from your first consultation to your first day on campus abroad
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <HoverCard className="h-full">
                <div className="p-8 lg:p-10 bg-white border border-gray-100 rounded-3xl hover:shadow-lg transition-all duration-500 h-full group">
                  <div
                    className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-300"
                  >
                    <Icon name={service.icon} size={24} className="text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-slate-900 flex-shrink-0"
                        />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-3 bg-[#003975] text-white px-10 py-4 rounded-full font-medium hover:bg-[#002d5e] transition-colors shadow-lg shadow-blue-900/20"
              >
                Explore All Services
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

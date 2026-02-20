"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";

const tools = [
  {
    title: "Scholarship Finder",
    description:
      "Discover scholarships you\u2019re eligible for based on your profile and destination",
    icon: "Trophy",
    href: "/services",
    color: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    title: "Cost Calculator",
    description:
      "Estimate tuition fees, living costs, and total expenses for your study destination",
    icon: "DollarSign",
    href: "/services",
    color: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    title: "Course Explorer",
    description:
      "Browse and compare courses across universities and countries",
    icon: "Search",
    href: "/courses",
    color: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    title: "Eligibility Check",
    description:
      "Find out which universities and programs match your qualifications",
    icon: "ClipboardList",
    href: "/services",
    color: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    title: "Visa Guide",
    description:
      "Step-by-step visa application guides for every destination country",
    icon: "FileText",
    href: "/services",
    color: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
  {
    title: "IELTS Prep Hub",
    description:
      "Free practice tests, tips, and resources for IELTS preparation",
    icon: "BookOpen",
    href: "/services",
    color: "from-[#003975] via-[#003975] to-[#00ab18]",
  },
];

export default function ToolsSection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
              <Icon name="Zap" size={16} />
              Student Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Tools to Help You Decide
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Interactive resources to make your study abroad journey easier
            </p>
          </div>
        </FadeUp>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <StaggerItem key={tool.title}>
              <Link href={tool.href} className="block h-full">
                <div className="bg-white border border-gray-100 rounded-3xl p-8 premium-card hover:shadow-xl transition-all duration-300 h-full group flex flex-col">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon
                      name={tool.icon}
                      size={24}
                      className="text-white"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-[#003975] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-6 flex-1">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#003975] group-hover:gap-3 transition-all">
                    Try Now
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
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.3}>
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-[#003975] text-white px-8 py-4 rounded-full font-medium hover:bg-[#002d5e] transition-colors shadow-lg shadow-blue-500/20"
              >
                Explore All Tools
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

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";

const events = [
  {
    id: 1,
    title: "Australia Education Fair 2026",
    date: "March 15, 2026",
    location: "Hotel Yak & Yeti, Kathmandu",
    type: "Education Fair",
    spots: "200 spots available",
    featured: true,
  },
  {
    id: 2,
    title: "IELTS Preparation Workshop",
    date: "March 22, 2026",
    location: "Nexsus Office, Putalisadak",
    type: "Workshop",
    spots: "30 spots available",
    featured: false,
  },
  {
    id: 3,
    title: "Canada Immigration Seminar",
    date: "April 5, 2026",
    location: "Radisson Hotel, Kathmandu",
    type: "Seminar",
    spots: "150 spots available",
    featured: false,
  },
  {
    id: 4,
    title: "UK University Virtual Meet",
    date: "April 12, 2026",
    location: "Online (Zoom)",
    type: "Virtual Event",
    spots: "Unlimited",
    featured: false,
  },
];

function getTypeBadgeColor(type: string) {
  switch (type) {
    case "Education Fair":
      return "bg-[#003975]/10 text-[#003975] border-[#003975]/20";
    case "Workshop":
      return "bg-[#00ab18]/10 text-[#00ab18] border-[#00ab18]/20";
    case "Seminar":
      return "bg-[#003975]/10 text-[#003975] border-[#003975]/20";
    case "Virtual Event":
      return "bg-[#00ab18]/10 text-[#00ab18] border-[#00ab18]/20";
    default:
      return "bg-gray-50 text-gray-700 border-gray-100";
  }
}

export default function EventsSection() {
  const featuredEvent = events.find((e) => e.featured);
  const otherEvents = events.filter((e) => !e.featured);

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#fafaf8]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium border border-gray-200">
              <Icon name="Calendar" size={16} />
              Upcoming Events
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Education Fairs & Events
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Connect with top universities, attend workshops, and stay ahead
              with our curated events
            </p>
          </div>
        </FadeUp>

        {/* Featured Event */}
        {featuredEvent && (
          <FadeUp>
            <div className="mb-8">
              <div className="relative rounded-3xl overflow-hidden gradient-border premium-card">
                <div className="bg-white p-8 md:p-10 rounded-3xl">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    {/* Left: Event Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeBadgeColor(
                            featuredEvent.type
                          )}`}
                        >
                          {featuredEvent.type}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#00ab18]/10 text-[#00ab18] text-xs font-medium border border-[#00ab18]/20">
                          <Icon name="Star" size={12} />
                          Featured
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        {featuredEvent.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-500">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-[#003975]/10 flex items-center justify-center">
                            <Icon
                              name="Calendar"
                              size={16}
                              className="text-[#003975]"
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {featuredEvent.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-[#00ab18]/10 flex items-center justify-center">
                            <Icon
                              name="MapPin"
                              size={16}
                              className="text-[#00ab18]"
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {featuredEvent.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-[#003975]/10 flex items-center justify-center">
                            <Icon
                              name="Users"
                              size={16}
                              className="text-[#003975]"
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {featuredEvent.spots}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                      >
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 bg-[#003975] text-white px-8 py-4 rounded-full font-medium hover:bg-[#002d5e] transition-colors shadow-lg shadow-blue-500/20"
                        >
                          Register Now
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
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        )}

        {/* Other Events Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {otherEvents.map((event) => (
            <StaggerItem key={event.id}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 premium-card h-full group">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeBadgeColor(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4 group-hover:text-[#003975] transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="w-8 h-8 rounded-lg bg-[#003975]/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        name="Calendar"
                        size={14}
                        className="text-[#003975]"
                      />
                    </div>
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="w-8 h-8 rounded-lg bg-[#00ab18]/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        name="MapPin"
                        size={14}
                        className="text-[#00ab18]"
                      />
                    </div>
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="w-8 h-8 rounded-lg bg-[#003975]/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        name="Users"
                        size={14}
                        className="text-[#003975]"
                      />
                    </div>
                    <span className="text-sm">{event.spots}</span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#003975] group-hover:gap-3 transition-all"
                >
                  Register
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
              </div>
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
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-[#003975] text-[#003975] px-8 py-4 rounded-full font-medium hover:bg-[#003975] hover:text-white transition-all"
              >
                View All Events
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

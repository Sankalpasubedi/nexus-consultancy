"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  TrackpadCarousel,
  CarouselCard,
} from "@/lib/animations";
import { Icon, FlagIcon } from "@/lib/icons";
import { useState } from "react";

/* ─── Data ─────────────────────────────────────────── */

const accommodationTypes = [
  {
    id: "on-campus",
    title: "On-Campus Housing",
    icon: "Building2",
    color: "#6366f1",
    description: "Live directly on university grounds in dormitories or residence halls. Perfect for first-year students.",
    pros: ["Convenient location", "Built-in community", "Utilities included", "Meal plans available"],
    cons: ["Limited privacy", "May be more expensive", "Rules & restrictions"],
    priceRange: "$800 - $2000/month",
    bestFor: "First-year students",
  },
  {
    id: "off-campus",
    title: "Off-Campus Apartments",
    icon: "Home",
    color: "#10b981",
    description: "Rent your own apartment or share with roommates near the university. More independence and privacy.",
    pros: ["More privacy", "Kitchen access", "More space", "Flexible lease terms"],
    cons: ["Utilities separate", "Commute required", "More responsibility"],
    priceRange: "$600 - $1800/month",
    bestFor: "Independent students",
  },
  {
    id: "homestay",
    title: "Homestay",
    icon: "Users",
    color: "#f59e0b",
    description: "Live with a local host family for cultural immersion. Includes meals and a supportive environment.",
    pros: ["Cultural immersion", "Meals included", "Family support", "Language practice"],
    cons: ["Less independence", "House rules", "Shared spaces"],
    priceRange: "$700 - $1200/month",
    bestFor: "Cultural experience seekers",
  },
  {
    id: "shared-house",
    title: "Shared House/Flat",
    icon: "Users2",
    color: "#ec4899",
    description: "Share a house or flat with other students. Great balance of independence and social life.",
    pros: ["Lower costs", "Social environment", "Shared responsibilities", "Flexibility"],
    cons: ["Housemate compatibility", "Shared facilities", "May need furnishing"],
    priceRange: "$400 - $1000/month",
    bestFor: "Budget-conscious students",
  },
];

const countryHousing = [
  {
    country: "Australia",
    flagCode: "au",
    avgCost: "AUD $200-400/week",
    popular: ["On-campus", "Share houses", "Purpose-built student accommodation"],
    tips: "Book early for on-campus housing. Purpose-built student accommodations (PBSA) are popular.",
  },
  {
    country: "UK",
    flagCode: "gb",
    avgCost: "£120-250/week",
    popular: ["University halls", "Private rentals", "Student flats"],
    tips: "University accommodation fills quickly. Consider private halls like Unite or Liberty Living.",
  },
  {
    country: "Canada",
    flagCode: "ca",
    avgCost: "CAD $800-1500/month",
    popular: ["Residence halls", "Apartments", "Homestays"],
    tips: "Toronto and Vancouver are expensive. Consider suburbs for better value.",
  },
  {
    country: "USA",
    flagCode: "us",
    avgCost: "USD $800-2000/month",
    popular: ["Dormitories", "Off-campus apartments", "Greek housing"],
    tips: "On-campus housing often required for freshmen. Costs vary greatly by city.",
  },
  {
    country: "New Zealand",
    flagCode: "nz",
    avgCost: "NZD $200-350/week",
    popular: ["Halls of residence", "Flats", "Homestays"],
    tips: "Auckland is most expensive. Flatting with other students is very common.",
  },
];

const checklist = [
  { item: "Research housing options early", icon: "Search" },
  { item: "Set a realistic budget", icon: "DollarSign" },
  { item: "Check proximity to campus", icon: "MapPin" },
  { item: "Read reviews and visit if possible", icon: "Star" },
  { item: "Understand lease terms", icon: "FileText" },
  { item: "Check what's included in rent", icon: "CheckSquare" },
  { item: "Consider safety of neighborhood", icon: "Shield" },
  { item: "Plan for deposits and upfront costs", icon: "CreditCard" },
];

const faqs = [
  {
    q: "When should I start looking for accommodation?",
    a: "Start at least 3-6 months before your course begins. On-campus housing applications often open 6+ months in advance.",
  },
  {
    q: "Is on-campus or off-campus housing better?",
    a: "On-campus is ideal for first-year students for convenience and community. Off-campus offers more independence and often better value for experienced students.",
  },
  {
    q: "How much should I budget for housing?",
    a: "Budget 30-50% of your total living expenses for accommodation. This varies significantly by city and country.",
  },
  {
    q: "Can Nexsus help me find accommodation?",
    a: "Yes! We provide accommodation guidance as part of our pre-departure support. We can connect you with trusted housing providers.",
  },
];

export default function AccommodationClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
      {/* ── Hero Section ── */}
      <section className="px-6 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <FadeUp>
                <span className="inline-block px-4 py-1.5 bg-[#003975]/10 text-[#003975] text-sm font-medium rounded-full mb-4">
                  Student Housing Guide
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                  Student Accommodation
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                  Find the perfect home away from home. Explore accommodation options for international students.
                </p>
              </FadeUp>
            </div>

            {/* Right Image */}
            <FadeRight delay={0.2}>
              <div className="hidden lg:block relative">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/services/NEX-_-22.jpg"
                    alt="Student Accommodation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003975]/20 to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#003975]/10 flex items-center justify-center">
                      <Icon name="Home" size={24} className="text-[#003975]" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-lg">Find</p>
                      <p className="text-slate-500 text-xs">Your Perfect Home</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── Accommodation Types ── */}
      <section className="px-6 mb-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Types of Student Housing
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {accommodationTypes.map((type, i) => (
              <FadeUp key={type.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${type.color}15` }}
                    >
                      <Icon name={type.icon} size={22} className={type.color === "#6366f1" ? "text-indigo-500" : type.color === "#10b981" ? "text-emerald-500" : type.color === "#f59e0b" ? "text-amber-500" : "text-purple-500"} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{type.title}</h3>
                      <span className="text-sm text-slate-500">Best for: {type.bestFor}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4">{type.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-xs font-medium text-[#003975] uppercase mb-2 block">Pros</span>
                      <ul className="space-y-1">
                        {type.pros.map((pro) => (
                          <li key={pro} className="flex items-center gap-2 text-sm text-slate-600">
                            <Icon name="Check" size={12} className="text-[#003975]" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-red-500 uppercase mb-2 block">Cons</span>
                      <ul className="space-y-1">
                        {type.cons.map((con) => (
                          <li key={con} className="flex items-center gap-2 text-sm text-slate-600">
                            <Icon name="Minus" size={12} className="text-red-400" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Typical cost:</span>
                    <span className="font-semibold text-[#003975]">{type.priceRange}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Housing by Country ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Housing by Country
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Costs and options vary by destination. Here's what to expect.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryHousing.map((country) => (
              <StaggerItem key={country.country}>
                <HoverCard className="h-full">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <FlagIcon code={country.flagCode} size={28} />
                      <h3 className="font-bold text-slate-900 text-lg">{country.country}</h3>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-xs text-slate-500 uppercase">Avg Cost</span>
                      <p className="font-semibold text-[#003975]">{country.avgCost}</p>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-slate-500 uppercase">Popular Options</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {country.popular.map((opt) => (
                          <span key={opt} className="text-xs px-2 py-0.5 bg-[#003975]/10 text-[#003975] rounded-full">
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600">
                      <Icon name="Lightbulb" size={14} className="inline mr-1 text-amber-500" />
                      {country.tips}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Featured Student Cities Carousel ── */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-[#003975]/10 text-[#003975] text-sm font-medium rounded-full mb-4">
                Popular Destinations
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Top Student Cities
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Explore accommodation options in these popular study destinations.
              </p>
            </div>
          </FadeUp>

          <TrackpadCarousel className="mt-8">
            {[
              { city: "Sydney", country: "Australia", avgRent: "$1,200/mo", image: "🏞️", color: "from-[#003975] to-[#0052a3]" },
              { city: "London", country: "UK", avgRent: "£900/mo", image: "🏰", color: "from-[#00468f] to-[#005fb8]" },
              { city: "Toronto", country: "Canada", avgRent: "C$1,500/mo", image: "🍁", color: "from-[#003975] to-[#1f6db7]" },
              { city: "New York", country: "USA", avgRent: "$1,800/mo", image: "🗽", color: "from-[#002f61] to-[#0052a3]" },
              { city: "Melbourne", country: "Australia", avgRent: "$1,100/mo", image: "🎯", color: "from-[#003975] to-[#0b5eb0]" },
              { city: "Auckland", country: "New Zealand", avgRent: "NZ$1,000/mo", image: "🌋", color: "from-[#00468f] to-[#1f6db7]" },
            ].map((city) => (
              <CarouselCard key={city.city} className="min-w-[280px] sm:min-w-[320px]">
                <div className={`bg-gradient-to-br ${city.color} rounded-2xl p-6 h-full text-white relative overflow-hidden`}>
                  <div className="text-5xl mb-4">{city.image}</div>
                  <h4 className="font-bold text-xl mb-1">{city.city}</h4>
                  <p className="text-white/80 text-sm mb-3">{city.country}</p>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 w-fit">
                    <Icon name="Home" size={14} />
                    <span className="text-sm font-medium">Avg: {city.avgRent}</span>
                  </div>
                </div>
              </CarouselCard>
            ))}
          </TrackpadCarousel>
        </div>
      </section>

      {/* ── Checklist ── */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Housing Search Checklist
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Follow these steps to find your perfect accommodation.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {checklist.map((item, i) => (
              <FadeUp key={item.item} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#003975]/10 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={18} className="text-[#003975]" />
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{item.item}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon name="ChevronDown" size={16} className="text-slate-400" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#003975] to-[#0052a3]">
        <div className="max-w-[800px] mx-auto text-center text-white">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help Finding Accommodation?
            </h2>
            <p className="text-white/85 mb-8 max-w-lg mx-auto">
              Our pre-departure support includes accommodation guidance. 
              Let us help you find your home away from home!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full text-sm font-semibold hover:shadow-lg transition"
              >
                Get Housing Help <Icon name="ArrowRight" size={14} />
              </Link>
              <a
                href="https://wa.me/9779851032197"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/20 transition"
              >
                <Icon name="MessageCircle" size={14} />
                Chat on WhatsApp
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

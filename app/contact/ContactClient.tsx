"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  HoverCard,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import ContactBranchExplorer from "@/components/ContactBranchExplorer";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useBranch } from "@/app/contexts/BranchContext";
import { branches as allBranches } from "@/data/branches";
import { useEffect, useState } from "react";

/* ─── Data ─────────────────────────────────────────── */

// Branches imported from @/data/branches

const faqs = [
  {
    q: "How long does the application process take?",
    a: "The entire process typically takes 3-6 months, depending on the country and university. We recommend starting early to ensure enough time for test preparation, applications, and visa processing.",
  },
  {
    q: "Do you help with visa applications?",
    a: "Yes! We provide comprehensive visa assistance including document preparation, application filing, interview preparation, and follow-up. Our team has a 98% visa success rate.",
  },
  {
    q: "Are consultation fees charged?",
    a: "Your initial consultation is completely free. We assess your profile, discuss your goals, and provide preliminary recommendations at no cost.",
  },
  {
    q: "Can you help with scholarships?",
    a: "Absolutely. We actively help students identify and apply for scholarships, grants, and financial aid opportunities. Many of our students have received significant funding.",
  },
  {
    q: "Do you provide post-arrival support?",
    a: "Yes, our support continues after you arrive. We help with accommodation, airport pickup, bank account setup, and connecting you with the local student community.",
  },
];

const consultationExpects = [
  "Personalized assessment of your profile",
  "University and course recommendations",
  "Application timeline and strategy",
  "Scholarship opportunities discussion",
];

/* ─── Component ────────────────────────────────────── */

export default function ContactPage() {
  const { setShowSidebar } = useHeader();
  const { currentBranch, selectBranch } = useBranch();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Other branches (not currently selected)
  const otherBranches = allBranches.filter(b => b.slug !== currentBranch.slug);

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main>
      {/* Hero + Forms Wrapper — image extends behind glassy cards */}
      <section className="relative overflow-hidden">
        {/* Background Image — covers full hero + card area */}
        <Image
          src="/contact/image.png"
          alt="Students studying abroad"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002550]/75 via-[#003a75]/60 to-[#004a8f]/40" />
        {/* Bottom Fade — image fades to white around middle of forms */}
        <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-white via-white/80 to-transparent" />

        <div className="relative z-10">
          {/* Hero Content */}
          <div className="max-w-[1440px] mx-auto px-6 pt-32 pb-12 md:pt-36 md:pb-14">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <FadeUp>
                  <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-medium tracking-wide border border-white/20">
                    Helpline
                  </span>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 max-w-2xl leading-tight">
                    Get In Touch
                  </h1>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="text-base md:text-lg text-blue-100/90 max-w-xl leading-relaxed">
                    Have questions about studying abroad? Our expert counselors are ready to
                    guide you every step of the way.
                  </p>
                </FadeUp>
              </div>
              {/* Floating Accent Image */}
              <div className="hidden lg:block relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="relative w-64 h-64 ml-auto"
                >
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 rotate-3">
                    <Image
                      src="/services/NEX-_-40.jpg"
                      alt="Contact our team"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00ab18]/10 flex items-center justify-center">
                      <Icon name="Phone" size={16} className="text-[#00ab18]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">24/7 Support</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Forms — sit on top of hero image */}
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-20 md:pb-28">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
              {/* ── Send Us a Message (glassy) ── */}
              <FadeLeft>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-10 text-white shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold mb-1.5">Send Us a Message</h2>
              <p className="text-blue-200 text-sm mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1.5">
                    Full Name <span className="text-red-300">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60">
                      <Icon name="User" size={16} />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-white/50 transition"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-1.5">
                      Email Address <span className="text-red-300">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60">
                        <Icon name="Mail" size={16} />
                      </span>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-white/50 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-1.5">
                      Phone Number <span className="text-red-300">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60">
                        <Icon name="Phone" size={16} />
                      </span>
                      <input
                        type="tel"
                        placeholder="+977 98XXXXXXXX"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-white/50 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferred Destination & Study Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-1.5">
                      Preferred Destination <span className="text-red-300">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60">
                        <Icon name="Globe" size={16} />
                      </span>
                      <select className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-blue-200/70 text-sm focus:outline-none focus:border-white/50 transition appearance-none">
                        <option value="">Select destination</option>
                        <option>Australia</option>
                        <option>Canada</option>
                        <option>USA</option>
                        <option>UK</option>
                        <option>New Zealand</option>
                        <option>Japan</option>
                        <option>South Korea</option>
                        <option>Europe</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-1.5">
                      Study Level <span className="text-red-300">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/60">
                        <Icon name="Monitor" size={16} />
                      </span>
                      <select className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-blue-200/70 text-sm focus:outline-none focus:border-white/50 transition appearance-none">
                        <option value="">Select level</option>
                        <option>Undergraduate</option>
                        <option>Postgraduate</option>
                        <option>PhD</option>
                        <option>Diploma</option>
                        <option>Language Course</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Tell us about your study abroad plans..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-white/50 transition resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#003975] text-white py-3.5 rounded-xl font-semibold hover:bg-[#002d5e] transition flex items-center justify-center gap-2"
                >
                  Send Message <Icon name="Send" size={16} />
                </motion.button>
              </form>
            </div>
          </FadeLeft>

          {/* ── Book Free Consultation ── */}
          <FadeRight>
            <div className="bg-[#004a8f] rounded-2xl md:rounded-3xl p-8 md:p-10 text-white shadow-2xl flex flex-col">
              <h2 className="text-2xl font-bold mb-1.5">Book Free Consultation</h2>
              <p className="text-blue-200/80 text-sm mb-8">
                Schedule a one-on-one session with our expert counselors. No obligations,
                completely free!
              </p>
              <form className="space-y-5 flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    Full Name <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-white/50 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    Email Address <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-white/50 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    Phone Number <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-white/50 transition"
                  />
                </div>

                {/* Preferred Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1.5">
                      Preferred Date <span className="text-red-300">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-blue-200/70 text-sm focus:outline-none focus:border-white/50 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1.5">
                      Preferred Time <span className="text-red-300">*</span>
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-blue-200/70 text-sm focus:outline-none focus:border-white/50 transition appearance-none">
                      <option value="">Select time</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* What to Expect */}
                <div className="mt-auto pt-4">
                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <p className="text-sm font-semibold text-white mb-3">What to expect:</p>
                    <ul className="space-y-2.5">
                      {consultationExpects.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-blue-100/80">
                          <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs flex-shrink-0">
                            <Icon name="Check" size={12} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-white text-[#003975] py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  Book Your Consultation <Icon name="ArrowRight" size={16} />
                </motion.button>
              </form>
            </div>
          </FadeRight>
            </div>
          </div>
        </div>
      </section>

      {/* Current Branch Details */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-[#003975]/10 text-[#003975] text-sm font-medium">
                <Icon name="Building2" size={20} /> Currently Viewing
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{currentBranch.name}</h2>
              <p className="text-lg text-slate-500">{currentBranch.description}</p>
            </div>
          </FadeUp>
          
          {/* Current Branch Card */}
          <FadeUp delay={0.1}>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#003975] to-[#002550] rounded-3xl p-8 md:p-10 text-white shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    {currentBranch.isHeadOffice && (
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[11px] font-semibold tracking-wide uppercase">
                        Head Office
                      </span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" size={18} className="text-white/80" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200/70 mb-1">Address</p>
                        <p className="text-white font-medium">{currentBranch.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" size={18} className="text-white/80" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200/70 mb-1">Phone Numbers</p>
                        <p className="text-white font-medium">{currentBranch.phone}</p>
                        <p className="text-white/80 text-sm">{currentBranch.phone2}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Mail" size={18} className="text-white/80" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200/70 mb-1">Email</p>
                        <p className="text-white font-medium">{currentBranch.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Clock" size={18} className="text-white/80" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200/70 mb-1">Opening Hours</p>
                        <p className="text-white font-medium">{currentBranch.openingHours}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="MessageCircle" size={18} className="text-white/80" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200/70 mb-1">WhatsApp</p>
                        <a 
                          href={`https://wa.me/${currentBranch.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:underline"
                        >
                          {currentBranch.whatsapp}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`tel:${currentBranch.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 bg-white text-[#003975] px-6 py-3 rounded-xl font-semibold text-sm"
                    >
                      <Icon name="Phone" size={16} /> Call Now
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={currentBranch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold text-sm border border-white/20"
                    >
                      <Icon name="MapPin" size={16} /> Get Directions
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Other Branches */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="MapPin" size={20} /> More Locations
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Visit Our Other Branches</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Click on any branch to view its details and make it your preferred location.
              </p>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherBranches.map((branch) => (
              <motion.div
                key={branch.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HoverCard>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectBranch(branch.slug)}
                    className={`w-full text-left rounded-2xl p-7 h-full border transition-all duration-200 ${
                      branch.isHeadOffice
                        ? "bg-[#003975]/10 text-slate-900 border-[#003975]/20 hover:border-[#003975]/40"
                        : "bg-white text-slate-900 border-gray-100 hover:border-[#003975]/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      {branch.isHeadOffice && (
                        <span className="inline-block px-3 py-1 rounded-full bg-[#003975]/20 text-[#003975] text-[11px] font-semibold tracking-wide uppercase">
                          Head Office
                        </span>
                      )}
                      <div className="ml-auto w-8 h-8 rounded-full bg-[#003975]/10 flex items-center justify-center">
                        <Icon name="ArrowRight" size={14} className="text-[#003975]" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{branch.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">{branch.city}, {branch.district}</p>
                    <div className="space-y-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2.5">
                        <Icon name="Phone" size={14} className="text-slate-400" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Icon name="MapPin" size={14} className="text-slate-400" />
                        <span className="line-clamp-1">{branch.address}</span>
                      </div>
                    </div>
                  </motion.button>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Explorer — Interactive Map + Details */}
      <ContactBranchExplorer />

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
                <Icon name="HelpCircle" size={20} /> FAQ
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            </div>
          </FadeUp>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-slate-900">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-400 flex-shrink-0 ml-4"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === i ? "auto" : 0,
                      opacity: openFaq === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-20 pb-40 px-6 bg-gradient-to-br from-[#004a8f] to-[#003a75] text-white relative z-0">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-blue-100 mb-8">
              Our {currentBranch.shortName} team is available Monday to Saturday, 9 AM - 6 PM. Reach out anytime.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${currentBranch.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold shadow-lg"
            >
              <Icon name="Phone" size={20} /> Call {currentBranch.shortName}
            </motion.a>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

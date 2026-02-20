"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import ContactBranchExplorer from "@/components/ContactBranchExplorer";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect, useState } from "react";

/* ─── Data ─────────────────────────────────────────── */

const branches = [
  {
    name: "Head Office",
    city: "Dillibazar, Kathmandu",
    address: "Dillibazar, Kathmandu-44600, Nepal",
    phone1: "01-4519495",
    phone2: "9851032197",
    isHead: true,
  },
  {
    name: "Baneshwor Branch",
    city: "Baneshwor, Kathmandu",
    address: "Baneshwor, Kathmandu, Nepal",
    phone1: "01-5922227",
    phone2: "9841830127",
    isHead: false,
  },
  {
    name: "Samakhusi Branch",
    city: "Samakhusi, Kathmandu",
    address: "Samakhusi, Kathmandu, Nepal",
    phone1: "01-4971971",
    phone2: "9820291960",
    isHead: false,
  },
  {
    name: "Banepa Branch",
    city: "Banepa, Kavrepalanchok",
    address: "Banepa, Kavrepalanchok, Nepal",
    phone1: "01-1665859",
    phone2: "9860824272",
    isHead: false,
  },
  {
    name: "Birtamode Branch",
    city: "Birtamode, Jhapa",
    address: "Birtamode, Jhapa, Nepal",
    phone1: "02-3591692",
    phone2: "9843649305",
    isHead: false,
  },
  {
    name: "Dhulabari Branch",
    city: "Dhulabari, Jhapa",
    address: "Dhulabari, Jhapa, Nepal",
    phone1: "02-3591127",
    phone2: "9801455861",
    isHead: false,
  },
];

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/85 via-[#002d5e]/70 to-[#003975]/45" />
        {/* Bottom Fade — image fades to white around middle of forms */}
        <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-white via-white/80 to-transparent" />

        <div className="relative z-10">
          {/* Hero Content */}
          <div className="max-w-[1440px] mx-auto px-6 pt-32 pb-12 md:pt-36 md:pb-14">
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
            <div className="bg-[#003975] rounded-2xl md:rounded-3xl p-8 md:p-10 text-white shadow-2xl flex flex-col">
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

      {/* Nationwide Presence */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="MapPin" size={20} /> Nationwide Presence
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Visit Our Branches</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                We have branches across Nepal to serve you. Walk in for a free consultation at any of our offices.
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((b) => (
              <StaggerItem key={b.name}>
                <HoverCard>
                  <div className={`rounded-2xl p-7 h-full border ${
                    b.isHead
                      ? "bg-[#003975] text-white border-[#003975]"
                      : "bg-white text-slate-900 border-gray-100"
                  }`}>
                    {b.isHead && (
                      <span className="inline-block px-3 py-1 mb-3 rounded-full bg-white/20 text-[11px] font-semibold tracking-wide uppercase">
                        Head Office
                      </span>
                    )}
                    <h3 className="text-lg font-semibold mb-1">{b.name}</h3>
                    <p className={`text-sm mb-4 ${b.isHead ? "text-blue-200" : "text-slate-400"}`}>{b.city}</p>
                    <div className={`space-y-2.5 text-sm ${b.isHead ? "text-blue-100/80" : "text-slate-500"}`}>
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5"><Icon name="MapPin" size={14} /></span>
                        <span>{b.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span><Icon name="Phone" size={14} /></span>
                        <span>{b.phone1}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span><Icon name="Phone" size={14} /></span>
                        <span>{b.phone2}</span>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
      <section className="pt-20 pb-40 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white relative z-0">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-blue-100 mb-8">
              Our team is available Monday to Saturday, 9 AM - 6 PM. Reach out anytime.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+97714123456"
              className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold shadow-lg"
            >
              <Icon name="Phone" size={20} /> Call Us Now
            </motion.a>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

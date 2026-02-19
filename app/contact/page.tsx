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
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect, useState } from "react";

/* ─── Data ─────────────────────────────────────────── */

const offices = [
  {
    city: "Sydney, Australia",
    address: "789 George Street, Sydney NSW 2000",
    phone: "+61 2 9123 4567",
    email: "sydney@nexus.com",
  },
  {
    city: "Kathmandu, Nepal",
    address: "Putalisadak, Kathmandu 44600",
    phone: "+977 1 4123456",
    email: "kathmandu@nexus.com",
  },
  {
    city: "Melbourne, Australia",
    address: "321 Collins Street, Melbourne VIC 3000",
    phone: "+61 3 9876 5432",
    email: "melbourne@nexus.com",
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
  "Personalized academic profile assessment",
  "University recommendations tailored to you",
  "Application timeline & strategy",
  "Scholarship & financial aid discussion",
];

/* ─── Component ────────────────────────────────────── */

export default function ContactPage() {
  const { setShowSidebar } = useHeader();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#003975] via-[#002d5e] to-[#001a3a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 text-sm font-medium">
              <Icon name="Phone" size={20} /> Get in Touch
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl">
              Let&apos;s Start Your <span className="text-[#00ab18]">Global Journey</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl text-blue-100 max-w-2xl">
              Reach out to us for a free consultation. Our expert counselors are ready to guide you every step of the way.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <FadeLeft>
            <div className="bg-[#003975] rounded-3xl p-10 text-white">
              <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-blue-200 text-sm mb-8">
                Fill in the details below and we&apos;ll get back to you within 24 hours.
              </p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm focus:outline-none focus:border-white/50 transition"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm focus:outline-none focus:border-white/50 transition"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm focus:outline-none focus:border-white/50 transition"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm focus:outline-none focus:border-white/50 transition"
                />
                <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-blue-200 text-sm focus:outline-none focus:border-white/50 transition">
                  <option value="">Interested Country</option>
                  <option>Australia</option>
                  <option>Canada</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>New Zealand</option>
                  <option>Japan</option>
                  <option>South Korea</option>
                  <option>Europe</option>
                </select>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm focus:outline-none focus:border-white/50 transition resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-white text-[#003975] py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </FadeLeft>

          {/* Consultation Booking */}
          <FadeRight>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-10 border border-gray-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Book Free Consultation</h2>
              <p className="text-slate-500 text-sm mb-8">
                Schedule a one-on-one session with our education experts.
              </p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:border-[#003975] transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:border-[#003975] transition"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:border-[#003975] transition"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:border-[#003975] transition"
                  />
                  <select className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-500 text-sm focus:outline-none focus:border-[#003975] transition">
                    <option value="">Preferred Time</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
                <select className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-500 text-sm focus:outline-none focus:border-[#003975] transition">
                  <option value="">Consultation Type</option>
                  <option>University Selection</option>
                  <option>Visa Guidance</option>
                  <option>Scholarship Help</option>
                  <option>General Inquiry</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#003975] text-white py-3 rounded-xl font-semibold hover:bg-[#002d5e] transition"
                >
                  Book Consultation
                </motion.button>
              </form>

              {/* What to Expect */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-slate-700 mb-3">What to Expect:</p>
                <ul className="space-y-2">
                  {consultationExpects.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0"><Icon name="Check" size={12} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="MapPin" size={20} /> Our Offices
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Visit Us</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Drop by one of our offices for a face-to-face consultation
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {offices.map((o) => (
              <StaggerItem key={o.city}>
                <HoverCard>
                  <div className="bg-white rounded-3xl p-8 h-full border border-gray-100">
                    <div className="text-4xl mb-4"><Icon name="Flag" size={32} /></div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">{o.city}</h3>
                    <div className="space-y-3 text-sm text-slate-500">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5"><Icon name="MapPin" size={14} /></span>
                        <span>{o.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span><Icon name="Phone" size={14} /></span>
                        <span>{o.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span><Icon name="Mail" size={14} /></span>
                        <span>{o.email}</span>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-80 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/contact/image.png"
            alt="Our office"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 text-center text-white">
            <p className="text-xl font-semibold">Visit Our Office</p>
            <p className="text-sm text-white/80">Putalisadak, Kathmandu 44600</p>
          </div>
        </div>
      </section>

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
      <section className="py-20 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
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

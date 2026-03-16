"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

const benefits = [
  "Prove your student status globally",
  "Access discounts on travel, food, tech, and lifestyle",
  "Use ISIC offers in 130+ countries",
  "Redeem benefits via mobile app on the go",
  "Get guidance from Nexsus for smooth application",
];

const steps = [
  {
    title: "Check eligibility",
    description: "Confirm student status and required proof documents for ISIC application.",
    icon: "CheckCircle",
  },
  {
    title: "Submit details",
    description: "Share your documents and profile information through our guided support.",
    icon: "FileText",
  },
  {
    title: "Get your ISIC",
    description: "Receive your card and activate offers for travel, shopping, and services.",
    icon: "IdCard",
  },
];

const faqs = [
  {
    q: "Who is eligible for ISIC?",
    a: "Students enrolled in recognized educational institutions are typically eligible, subject to proof of active study status.",
  },
  {
    q: "How long is ISIC valid for?",
    a: "Validity usually aligns with the card issue period and policy cycle. We share exact validity at the time of application.",
  },
  {
    q: "Where can I use my ISIC card?",
    a: "ISIC discounts are available in 130+ countries across travel, food, retail, and lifestyle partners.",
  },
  {
    q: "How do I access ISIC benefits?",
    a: "Use your physical or digital card and the ISIC app to discover and redeem partner offers.",
  },
  {
    q: "Can Nexsus help me purchase ISIC?",
    a: "Yes, we assist students with eligibility checks, document support, and the complete ISIC application process.",
  },
];

export default function IsicCardClient() {
  const { setShowSidebar } = useHeader();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 bg-[#f4f5f6] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <FadeUp>
              {/* Breadcrumb */}
              <FadeUp>
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                  <Link href="/" className="hover:text-[#003975]">Home</Link>
                  <span>/</span>
                  <span className="text-slate-900">ISIC Card</span>
                </nav>
              </FadeUp>
              
              <FadeUp>
                <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-[#003975]/10 text-[#003975] text-xs font-semibold tracking-wide border border-[#003975]/20">
                  Student Essentials
                </span>
              </FadeUp>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                  International Student Identity Card (ISIC)
                </h1>
                <p className="text-slate-600 text-lg max-w-xl">
                  Start enjoying global discounts and benefits with ISIC and get guided support for your full application process.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#003975] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#002a5c] transition"
                  >
                    Enquire now <Icon name="ArrowRight" size={14} />
                  </Link>
                  <a
                    href="#isic-faq"
                    className="inline-flex items-center gap-2 bg-white text-slate-700 border border-gray-300 px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-50 transition"
                  >
                    View FAQ
                  </a>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="hidden lg:block justify-self-end">
                <div className="w-72 h-96 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/40 relative">
                  <Image src="/services/rightimage2.png" alt="ISIC card support" fill className="object-cover object-top" />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <FadeUp>
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Start enjoying global discounts and benefits with ISIC</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                The International Student Identity Card (ISIC) is globally recognized and helps you prove your student status while unlocking exclusive offers.
              </p>
              <p className="text-slate-600 leading-relaxed">
                As a Nexsus student, you can apply easily through our support and access exclusive rates through trusted partner channels.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl min-h-[320px]">
              <Image src="/services/showcase2.jpg" alt="ISIC benefits" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#003975]/80 to-[#0052a3]/60" />
              <div className="absolute inset-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">What ISIC offers</h3>
                <ul className="space-y-2.5 text-sm md:text-base text-white/90">
                  {benefits.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Icon name="Sparkles" size={14} className="mt-1 text-white" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
          <div>
            <FadeUp>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">How to get your ISIC</h3>
            </FadeUp>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <FadeUp key={step.title} delay={idx * 0.08}>
                  <div className="bg-white rounded-2xl p-5 border border-black/5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#003975]/10 flex items-center justify-center shrink-0">
                        <Icon name={step.icon} size={20} className="text-[#003975]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <FadeUp delay={0.15}>
            <div className="hidden lg:block">
              <div className="w-full max-w-[500px] ml-auto rounded-[64px] overflow-hidden border-8 border-white/60 shadow-2xl h-[500px] relative">
                <Image src="/services/showcase10.jpg" alt="ISIC application help" fill className="object-cover" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          <div>
            <FadeUp>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Get support for your ISIC enquiry</h2>
              <p className="text-slate-600 mb-8">Tell us what you need and our team will help you with eligibility, documents, and card application.</p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First name*</label>
                    <input className="w-full h-12 rounded-xl border border-gray-300 px-4" placeholder="First name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Last name*</label>
                    <input className="w-full h-12 rounded-xl border border-gray-300 px-4" placeholder="Last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address*</label>
                  <input type="email" className="w-full h-12 rounded-xl border border-gray-300 px-4" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Study destination*</label>
                  <select className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white text-slate-600">
                    <option>Choose destination</option>
                    <option>Australia</option>
                    <option>UK</option>
                    <option>Canada</option>
                    <option>USA</option>
                    <option>New Zealand</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">ISIC support needed*</label>
                  <select className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white text-slate-600">
                    <option>New ISIC application</option>
                    <option>Eligibility check</option>
                    <option>Discount and offer guidance</option>
                    <option>Renewal support</option>
                  </select>
                </div>
                <button type="button" className="inline-flex items-center gap-2 bg-[#003975] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#002a5c] transition">
                  Send ISIC enquiry <Icon name="ArrowRight" size={14} />
                </button>
              </form>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="hidden lg:block">
              <div className="w-full max-w-[420px] ml-auto rounded-2xl overflow-hidden shadow-xl border border-white/60 h-[520px] relative">
                <Image src="/services/NEX-_-15.jpg" alt="ISIC query support" fill className="object-cover" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="isic-faq" className="py-16 px-6">
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">FAQs</h2>
          </FadeUp>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FadeUp key={faq.q} delay={index * 0.05}>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <Icon name="ChevronDown" size={16} className="text-slate-400" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === index ? "auto" : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

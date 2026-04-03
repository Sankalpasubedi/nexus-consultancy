"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

const guardianshipPoints = [
  {
    title: "Approved guardian network",
    description:
      "Access trusted guardians and welfare providers aligned with destination and institution policies.",
    icon: "HeartHandshake",
  },
  {
    title: "Compliance support",
    description:
      "Get guidance on required approvals before travel for students under 18 years old.",
    icon: "ShieldCheck",
  },
  {
    title: "Wellbeing check-ins",
    description:
      "Regular support touchpoints to ensure safety, settlement, and confidence throughout your journey.",
    icon: "Users",
  },
  {
    title: "Parent communication",
    description:
      "Clear updates between guardians, families, and students for better peace of mind.",
    icon: "MessageCircle",
  },
];

const faqs = [
  {
    q: "Who needs a guardianship arrangement?",
    a: "Students under 18 in many destinations need an approved guardian and welfare arrangement before arrival.",
  },
  {
    q: "Can a family friend be my guardian?",
    a: "It depends on destination policy and school approval. We help you verify eligibility and alternatives.",
  },
  {
    q: "When should guardianship be arranged?",
    a: "Start early, ideally right after your offer is accepted, so approval is ready before visa and travel milestones.",
  },
  {
    q: "Does Nexsus support the full guardianship process?",
    a: "Yes, we help with provider selection, paperwork guidance, and communication with institutions where required.",
  },
];

export default function GuardianshipClient() {
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
                  <Link href="/" className="hover:text-[#0066a6]">Home</Link>
                  <span>/</span>
                  <span className="text-slate-900">Student Guardianship</span>
                </nav>
              </FadeUp>
              
              <FadeUp>
                <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-[#0066a6]/10 text-[#0066a6] text-xs font-semibold tracking-wide border border-[#0066a6]/20">
                  Student Essentials
                </span>
              </FadeUp>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                  Guardianship
                </h1>
                <p className="text-slate-600 text-lg max-w-xl">
                  If you are under 18, we help arrange reliable guardianship and welfare support so you can study abroad safely and confidently.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="hidden lg:block justify-self-end">
                <div className="w-72 h-96 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/40 relative">
                  <Image src="/services/rightimage5.png" alt="Guardianship support" fill className="object-cover object-top" />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3">If you are under 18, we will find you a guardian</h2>
            <p className="text-slate-700 leading-relaxed mb-4 max-w-5xl">
              In Australia and many other destinations, international students under 18 need approved welfare arrangements in place before they arrive. We partner with trusted providers to support students and families.
            </p>
            <p className="text-slate-600 leading-relaxed max-w-5xl">
              Your safety and wellbeing are a priority throughout your study journey. We support setup, ongoing care, and communication at each key milestone.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#fafaf8]">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <FadeUp>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">Reliable care and support</h3>
              <p className="text-slate-700 leading-relaxed mb-5">
                Your guardian supports your settlement, wellbeing, and study-life balance. They can also assist with practical issues and help you adapt to your new environment.
              </p>
            </FadeUp>
            <div className="grid sm:grid-cols-2 gap-4">
              {guardianshipPoints.map((point, idx) => (
                <FadeUp key={point.title} delay={idx * 0.08}>
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 h-full">
                    <div className="w-10 h-10 rounded-lg bg-[#0066a6]/10 flex items-center justify-center mb-3">
                      <Icon name={point.icon} size={18} className="text-[#0066a6]" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1.5">{point.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{point.description}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <FadeUp delay={0.2}>
            <div className="hidden lg:block">
              <div className="w-full max-w-[460px] ml-auto rounded-[56px] overflow-hidden border-8 border-white/60 shadow-2xl h-[520px] relative">
                <Image src="/services/leftimage6.png" alt="Guardianship care" fill className="object-cover" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          <div>
            <FadeUp>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Get support with guardianship setup</h2>
              <p className="text-slate-600 mb-8">Tell us your requirements and we will guide you with the right guardianship pathway.</p>
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
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Student age*</label>
                  <input className="w-full h-12 rounded-xl border border-gray-300 px-4" placeholder="e.g. 16" />
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
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Guardianship support needed*</label>
                  <select className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white text-slate-600">
                    <option>Full guardianship arrangement</option>
                    <option>Document and compliance help</option>
                    <option>Existing guardian eligibility check</option>
                    <option>General guidance</option>
                  </select>
                </div>
                <button type="button" className="inline-flex items-center gap-2 bg-[#0066a6] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#002a5c] transition">
                  Send guardianship enquiry <Icon name="ArrowRight" size={14} />
                </button>
              </form>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="hidden lg:block">
              <div className="w-full max-w-[420px] ml-auto rounded-2xl overflow-hidden shadow-xl border border-white/60 h-[520px] relative">
                <Image src="/services/leftimage10.png" alt="Student guardianship" fill className="object-cover" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 px-6">
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

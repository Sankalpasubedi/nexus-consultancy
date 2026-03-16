"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

const bankingSteps = [
  {
    title: "Choose your destination bank",
    description:
      "We shortlist student-friendly banks based on your destination, fees, and digital banking support.",
    icon: "Search",
  },
  {
    title: "Prepare documents",
    description:
      "Get a clear checklist of passport, offer letter, visa details, and address proof requirements.",
    icon: "FileText",
  },
  {
    title: "Open account before arrival",
    description:
      "Where available, we help you start the process remotely so your account is ready earlier.",
    icon: "Landmark",
  },
  {
    title: "Activate local payments",
    description:
      "Set up cards, app banking, transfers, and student discounts right after landing.",
    icon: "CreditCard",
  },
];

const faqs = [
  {
    q: "Can I open a student bank account before traveling?",
    a: "Yes. In many destinations, banks allow pre-arrival onboarding with basic documents. We guide you based on destination rules.",
  },
  {
    q: "What documents are usually required?",
    a: "Commonly: passport, offer letter, visa (or application status), and local address proof. Some banks ask for additional identity checks.",
  },
  {
    q: "Will I get a debit card and online banking?",
    a: "Yes. Most student accounts include a debit card, mobile app access, and online transfers with low or zero monthly fees.",
  },
  {
    q: "Do you help with international transfers?",
    a: "Yes. We help you compare transfer routes and set up safer, lower-cost options for tuition and living expenses.",
  },
];

export default function StudentBankingClient() {
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
                  <span className="text-slate-900">Student Banking</span>
                </nav>
              </FadeUp>
              
              <FadeUp>
                <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-[#003975]/10 text-[#003975] text-xs font-semibold tracking-wide border border-[#003975]/20">
                  Student Essentials
                </span>
              </FadeUp>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                  Banking for International Students
                </h1>
                <p className="text-slate-600 text-lg max-w-xl">
                  Open and manage your student account with confidence. Get practical help for account setup, money transfers, and everyday banking abroad.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="hidden lg:block justify-self-end">
                <div className="w-72 h-96 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/40 relative">
                  <Image src="/services/rightimage3.png" alt="Student banking support" fill className="object-cover object-top" />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-3 gap-10 items-start">
          <FadeUp className="lg:col-span-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Open a bank account even before you arrive</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We provide student-focused account options with trusted financial partners to help you settle faster in your destination.
              </p>
              <p className="text-slate-600 leading-relaxed">
                From document readiness to app activation and payment setup, our team supports every step so you can focus on your studies.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-[320px]">
              <Image src="/services/NEX-_-45.jpg" alt="Banking guidance" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-4">
                <p className="text-slate-900 font-semibold">Secure your finances abroad</p>
                <p className="text-slate-500 text-sm">Practical guidance from pre-arrival to your first semester.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#fafaf8]">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Banking setup steps</h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bankingSteps.map((step, idx) => (
              <FadeUp key={step.title} delay={idx * 0.08}>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#003975]/10 flex items-center justify-center mb-4">
                    <Icon name={step.icon} size={20} className="text-[#003975]" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          <div>
            <FadeUp>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Get support with your student banking</h2>
              <p className="text-slate-600 mb-8">Tell us what you need, and we will help you get your banking sorted.</p>
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
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile number*</label>
                  <input className="w-full h-12 rounded-xl border border-gray-300 px-4" placeholder="Mobile number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred study destination*</label>
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
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Banking help needed*</label>
                  <select className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white text-slate-600">
                    <option>Open an account</option>
                    <option>International money transfer</option>
                    <option>Card and app activation</option>
                    <option>General banking advice</option>
                  </select>
                </div>
                <button type="button" className="inline-flex items-center gap-2 bg-[#003975] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#002a5c] transition">
                  Send banking enquiry <Icon name="ArrowRight" size={14} />
                </button>
              </form>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="hidden lg:block">
              <div className="w-full max-w-[420px] ml-auto rounded-[56px] overflow-hidden border-8 border-white/60 shadow-2xl h-[520px] relative">
                <Image src="/services/leftimage5.png" alt="Student essentials support" fill className="object-cover" />
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

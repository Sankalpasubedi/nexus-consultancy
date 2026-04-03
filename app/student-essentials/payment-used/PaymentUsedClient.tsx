"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

const paymentMethods = [
  {
    name: "Flywire",
    description: "A trusted education payments platform for international tuition and fee transfers.",
    badge: "Popular for tuition",
    icon: "Send",
  },
  {
    name: "Convera Payments",
    description: "Used for secure cross-border education payments with clear tracking and support.",
    badge: "Global reach",
    icon: "ShieldCheck",
  },
  {
    name: "Stripe",
    description: "Fast card-based payment processing for online forms and service fees.",
    badge: "Card payments",
    icon: "CreditCard",
  },
  {
    name: "Wise",
    description: "Low-fee international transfers with transparent exchange rates.",
    badge: "Good for transfers",
    icon: "ArrowRight",
  },
  {
    name: "Bank Transfer",
    description: "Direct bank transfer support for students who prefer a traditional payment route.",
    badge: "Direct settlement",
    icon: "Landmark",
  },
  {
    name: "Card Payment",
    description: "Simple debit or credit card options when a quick checkout is needed.",
    badge: "Fast checkout",
    icon: "CreditCard",
  },
];

const steps = [
  "We share the exact amount and payment instructions.",
  "You choose the most convenient method from the available options.",
  "We confirm the payment and update your application record.",
];

const advantages = [
  "Simple and secure process",
  "Clear payment tracking",
  "Support for international students",
  "Brand-aligned communication and receipts",
];

export default function PaymentUsedClient() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="min-h-screen bg-[#f6f8fa] pt-24 lg:pt-28">
      <section className="bg-[#0066a6] text-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <FadeUp>
            <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide">
              Student Essentials
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight max-w-xl">
              Payment Used
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-lg max-w-xl leading-relaxed">
              A simple overview of the payment methods used by the consultancy for tuition and service-related transactions.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/student-essentials"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0066a6] px-6 py-3 text-sm font-semibold hover:bg-slate-100 transition"
              >
                Back to essentials <Icon name="ArrowLeft" size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
              >
                Ask a question <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-[36px] border border-white/15 bg-white/10 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
              <div className="rounded-[28px] bg-white text-slate-900 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0066a6]/10 flex items-center justify-center shrink-0">
                    <Icon name="CreditCard" size={18} className="text-[#0066a6]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#0066a6]">Payment overview</p>
                    <h2 className="text-xl font-bold">Reliable and easy to follow</h2>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {advantages.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Icon name="CheckCircle" size={14} className="text-[#0066a6] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[0.36fr_0.64fr] gap-6 lg:gap-8 items-start">
            <FadeUp>
              <div className="rounded-3xl border border-[#d4e0ec] bg-white p-5 sm:p-6 shadow-sm sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0066a6] mb-3">How it works</p>
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div key={step} className="flex items-start gap-3 rounded-2xl bg-[#f3f7fb] border border-[#dbe7f2] p-3.5">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center border border-[#dbe7f2] text-[#0066a6] font-bold text-sm shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <div className="space-y-6">
              <StaggerContainer className="grid sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <StaggerItem key={method.name}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="h-full rounded-3xl border border-[#dce7f1] bg-white p-5 sm:p-6 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-[#0066a6]/10 flex items-center justify-center shrink-0">
                          <Icon name={method.icon} size={18} className="text-[#0066a6]" />
                        </div>
                        <span className="rounded-full bg-[#0066a6]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#0066a6]">
                          {method.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{method.name}</h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{method.description}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="rounded-3xl bg-[#eaf1f8] border border-[#d4e0ec] p-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Need a payment breakdown?</h3>
                    <p className="text-slate-600 mt-1">We can explain what applies to your course, country, and current invoice.</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0066a6] px-6 py-3 text-sm font-semibold text-white hover:bg-[#002a5c] transition whitespace-nowrap"
                  >
                    Contact support <Icon name="ArrowRight" size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

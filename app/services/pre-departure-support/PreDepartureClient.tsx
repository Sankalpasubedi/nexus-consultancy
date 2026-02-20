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
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect } from "react";

/* ─── Data ─────────────────────────────────────────── */

const supportAreas = [
  {
    title: "Accommodation Assistance",
    description: "We help you find safe, affordable, and convenient housing options near your university — from on-campus dorms to off-campus apartments.",
    features: ["University dormitory booking", "Shared apartment matching", "Homestay arrangements", "Temporary hotel booking"],
    icon: "Home",
  },
  {
    title: "Banking & Finance Setup",
    description: "Complete guidance on opening international bank accounts, managing forex, setting up mobile payments, and understanding local banking systems.",
    features: ["Bank account opening guidance", "Forex & currency exchange tips", "Credit/debit card setup", "Budgeting & expense tracking"],
    icon: "DollarSign",
  },
  {
    title: "Cultural Orientation",
    description: "Prepare for cultural differences with sessions on local customs, etiquette, social norms, and tips for building a social network in your new country.",
    features: ["Country-specific culture sessions", "Social norms & etiquette", "Building social connections", "Handling cultural shock"],
    icon: "Globe",
  },
  {
    title: "Travel & Logistics",
    description: "End-to-end travel planning including flight booking assistance, airport transfers, local transportation guides, and essential travel tips.",
    features: ["Flight booking guidance", "Airport pickup arrangement", "Local transport orientation", "SIM card & connectivity setup"],
    icon: "MapPin",
  },
  {
    title: "Health & Insurance",
    description: "Guidance on mandatory health insurance, finding local healthcare providers, vaccinations, and maintaining your well-being abroad.",
    features: ["Health insurance enrollment", "Vaccination requirements", "Local GP registration", "Mental health support resources"],
    icon: "Heart",
  },
  {
    title: "Academic Preparation",
    description: "Get ready for academic life abroad with guidance on course registration, academic expectations, learning styles, and student support services.",
    features: ["Course registration help", "Academic writing orientation", "Library & resource access", "Student support contacts"],
    icon: "BookOpen",
  },
];

const timeline = [
  { period: "3 Months Before", title: "Planning Phase", items: ["Arrange accommodation", "Apply for health insurance", "Start document checklist", "Research local area"], icon: "Calendar" },
  { period: "1 Month Before", title: "Preparation Phase", items: ["Book flights", "Pack essentials", "Set up bank account", "Complete cultural orientation"], icon: "ClipboardList" },
  { period: "1 Week Before", title: "Final Checks", items: ["Confirm airport transfer", "Pack carry-on essentials", "Download useful apps", "Print important documents"], icon: "CheckCircle" },
  { period: "First Week", title: "Arrival Phase", items: ["Campus orientation", "Activate bank & SIM", "Explore neighbourhood", "Meet academic advisor"], icon: "Sparkles" },
];

const packingEssentials = [
  {
    title: "Documents",
    icon: "FileText",
    items: ["Passport & visa copies", "Offer letter & CoE", "Academic transcripts", "Insurance documents", "Financial proof"],
  },
  {
    title: "Electronics",
    icon: "Monitor",
    items: ["Laptop & charger", "Universal power adapter", "Smartphone & accessories", "USB drives", "Headphones"],
  },
  {
    title: "Personal Items",
    icon: "Heart",
    items: ["Prescription medications", "Basic first-aid kit", "Toiletries (travel-size)", "Comfortable clothing", "Weather-appropriate gear"],
  },
  {
    title: "Essentials",
    icon: "Star",
    items: ["Local currency (small amount)", "Credit/debit cards", "Emergency contacts list", "University map & guides", "Photos from home"],
  },
];

/* ─── Component ────────────────────────────────────── */

export default function PreDeparturePage() {
  const { setShowSidebar } = useHeader();
  useEffect(() => { setShowSidebar(false); return () => setShowSidebar(true); }, [setShowSidebar]);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[440px] md:min-h-[500px] overflow-hidden">
        <Image src="/contact/image.png" alt="Pre-departure preparation" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a3a]/85 via-[#002d5e]/70 to-[#003975]/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00ab18]/10 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wide border border-white/20">
              <Icon name="MapPin" size={12} className="inline mr-1.5 -mt-0.5" /> Pre-Departure Support
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-4 max-w-2xl leading-[1.15]">
              Prepared Today,<br />Confident Tomorrow
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base md:text-lg text-blue-100/90 max-w-lg leading-relaxed mb-8">
              Comprehensive pre-departure guidance covering accommodation, banking, cultural orientation, and everything you need for a smooth transition abroad.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition">
                Get Pre-Departure Kit <Icon name="ArrowRight" size={14} />
              </Link>
              <Link href="#support" className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition">
                View Support Areas
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Stats Bar — Green accent top border ── */}
      <section className="border-t-4 border-[#00ab18] py-10 md:py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "8,000+", label: "Students Supported" },
              { num: "100%", label: "Pre-Departure Sessions" },
              { num: "15+", label: "Countries Covered" },
              { num: "24/7", label: "Post-Arrival Helpline" },
            ].map((s) => (
              <FadeUp key={s.label}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-slate-900">{s.num}</div>
                  <div className="text-sm text-slate-500 mt-1.5">{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Support Areas — Alternating Rows ── */}
      <section id="support" className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                Complete Support
              </span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">
                How We Prepare You
              </h2>
              <p className="text-slate-500 text-base max-w-lg mx-auto">
                Six essential areas of support to ensure you're fully prepared for life abroad
              </p>
            </div>
          </FadeUp>

          <div className="space-y-5">
            {supportAreas.map((sa, i) => (
              <FadeUp key={sa.title} delay={i * 0.06}>
                <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  {/* Icon panel */}
                  <div className="md:w-[140px] bg-[#003975] flex items-center justify-center py-6 md:py-0 flex-shrink-0">
                    <div className="text-center text-white">
                      <Icon name={sa.icon} size={28} className="mx-auto mb-2" />
                      <div className="text-[10px] uppercase tracking-widest font-medium text-blue-200">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 md:p-7 flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{sa.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">{sa.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {sa.features.map((f) => (
                        <span key={f} className="inline-flex items-center gap-1.5 text-[12px] text-slate-600 bg-gray-50 px-2.5 py-1 rounded-full">
                          <Icon name="Check" size={11} className="text-[#00ab18]" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline — Horizontal 4‑col ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">Timeline</span>
              <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-3">Your Pre-Departure Timeline</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">A step-by-step guide from 3 months before departure to your first week abroad</p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map((t, i) => (
              <StaggerItem key={t.period}>
                <div className="bg-gray-50 rounded-2xl p-6 h-full border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 to-[#003975]" />
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                      <Icon name={t.icon} size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#003975] font-bold uppercase tracking-wider">{t.period}</div>
                      <h4 className="font-semibold text-slate-900 text-[14px]">{t.title}</h4>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {t.items.map((item) => (
                      <span key={item} className="flex items-center gap-2 text-[13px] text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#003975] flex-shrink-0" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Packing Checklist — 4‑col ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">Checklist</span>
                <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-2">Packing Essentials</h2>
                <p className="text-slate-500 text-sm">Don't forget these must-haves when packing for your journey</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm transition self-start sm:self-auto">
                Download Full Checklist <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packingEssentials.map((cat) => (
              <StaggerItem key={cat.title}>
                <div className="bg-white rounded-2xl p-5 h-full border border-gray-100 hover:border-[#003975]/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#003975] text-white flex items-center justify-center mb-4">
                    <Icon name={cat.icon} size={18} />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-[15px] mb-3">{cat.title}</h4>
                  <div className="space-y-2">
                    {cat.items.map((item) => (
                      <span key={item} className="flex items-center gap-2 text-[13px] text-slate-500">
                        <Icon name="Check" size={12} className="text-[#00ab18] flex-shrink-0" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Arrival Tips — Split ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeLeft>
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#003975]/5 text-[#003975] text-xs font-semibold tracking-widest uppercase">
                  First Week Abroad
                </span>
                <h2 className="text-3xl md:text-[40px] font-bold text-slate-900 mb-4 leading-tight">
                  Your First Week<br />Survival Guide
                </h2>
                <p className="text-slate-500 text-base mb-8 leading-relaxed max-w-md">
                  The first week can be overwhelming. Here's how to hit the ground running and settle in with confidence.
                </p>
                <div className="space-y-3">
                  {["Attend university orientation and register for courses", "Set up your bank account and local phone number", "Explore campus facilities — library, gym, cafeteria", "Join student clubs and attend welcome events", "Register with local GP or health service"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={10} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeLeft>
            <FadeRight>
              <div className="bg-gradient-to-br from-[#003975] to-slate-900 rounded-3xl p-8 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ab18]/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">24/7 Support Helpline</h3>
                  <p className="text-blue-200 text-sm mb-6 leading-relaxed">
                    Our support doesn't stop at departure. Reach our dedicated helpline anytime during your first month abroad for any assistance.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: "Phone", label: "Emergency Support" },
                      { icon: "MessageSquare", label: "WhatsApp Help" },
                      { icon: "Mail", label: "Email Assistance" },
                      { icon: "Users", label: "Alumni Connect" },
                    ].map((ch) => (
                      <div key={ch.label} className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <Icon name={ch.icon} size={14} />
                        </div>
                        {ch.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-[#003975] overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00ab18]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-[40px] font-bold text-white mb-4 leading-tight">
              Ready for Your<br />Study Abroad Journey?
            </h2>
            <p className="text-blue-200 mb-8 text-base max-w-md mx-auto">
              Attend our free pre-departure orientation session. We'll make sure you're 100% ready for your new life abroad.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition shadow-lg">
                Join Free Session <Icon name="ArrowRight" size={14} />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

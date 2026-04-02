"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { FlagIcon, Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import { destinations } from "@/data";

type BenefitSet = {
  overview: string;
  bankingTitle: string;
  bankingOptions: string[];
  simTitle: string;
  simOptions: string[];
  otherBenefits: string[];
  note: string;
};

const benefitMap: Record<string, BenefitSet> = {
  "study-in-australia": {
    overview: "Australia offers strong student banking, transit concessions in many states, and plenty of prepaid mobile competition for newcomers.",
    bankingTitle: "Student-friendly banking and card options",
    bankingOptions: ["ANZ Access Advantage", "Commonwealth Bank Student Account", "NAB Classic Banking"],
    simTitle: "Popular SIM and prepaid options",
    simOptions: ["amaysim", "Boost Mobile", "Optus prepaid student deals"],
    otherBenefits: ["Public transport concessions in many cities", "OSHC support and visa-compliant planning", "Campus and retail student discounts"],
    note: "Offer availability varies by provider and campus. We help you compare the latest student offers before you arrive.",
  },
  "study-in-canada": {
    overview: "Canada has some of the most student-friendly banking products and reliable prepaid mobile plans across major cities.",
    bankingTitle: "Student-friendly banking and card options",
    bankingOptions: ["Scotiabank Student Banking Advantage Plan", "BMO Student Chequing Account", "CIBC Student Smart Account"],
    simTitle: "Popular SIM and prepaid options",
    simOptions: ["Fido", "Koodo", "Lucky Mobile"],
    otherBenefits: ["Campus transit passes in many cities", "Student rewards and loyalty programs", "Discounted public services and apps"],
    note: "Some banks and mobile providers run seasonal student promos; we can help you shortlist current offers.",
  },
  "study-in-usa": {
    overview: "The USA has excellent student banking and a wide choice of affordable SIM or eSIM providers.",
    bankingTitle: "Student-friendly banking and card options",
    bankingOptions: ["Discover it Student Cash Back", "Chase Freedom Rise", "Capital One Journey"],
    simTitle: "Popular SIM and prepaid options",
    simOptions: ["Mint Mobile", "Tello", "Visible"],
    otherBenefits: ["Amazon Prime Student-style discounts", "Campus ID and library perks", "Meal and transit savings in many cities"],
    note: "Credit approval and package availability vary by provider. We recommend comparing fee-free student-friendly choices first.",
  },
  "study-in-uk": {
    overview: "The UK is known for student bank accounts, strong rail discounts, and flexible SIM-only plans.",
    bankingTitle: "Student-friendly banking and card options",
    bankingOptions: ["Santander Edge Student", "NatWest Student Account", "Barclaycard Forward"],
    simTitle: "Popular SIM and prepaid options",
    simOptions: ["giffgaff", "VOXI", "Smarty"],
    otherBenefits: ["16-25 Railcard savings", "Student store discounts", "Oyster and local transit savings"],
    note: "Banks and mobile providers may require local proof of enrollment. We can walk you through the paperwork.",
  },
  "study-in-new-zealand": {
    overview: "New Zealand combines simple student banking with straightforward prepaid mobile choices and a strong campus support culture.",
    bankingTitle: "Student-friendly banking and card options",
    bankingOptions: ["ASB Student Account", "Westpac Student Banking", "BNZ student-friendly accounts"],
    simTitle: "Popular SIM and prepaid options",
    simOptions: ["Skinny", "2degrees", "Spark prepaid"],
    otherBenefits: ["Regional transit concessions", "Student association discounts", "Outdoor activity and lifestyle offers"],
    note: "Promotions vary by city and institution. We help you compare options that suit your arrival timeline.",
  },
  "study-in-japan": {
    overview: "Japan offers reliable banking, commuter savings, and local SIM/eSIM options that work well for international students.",
    bankingTitle: "Student-friendly banking and card options",
    bankingOptions: ["Rakuten Card", "Mizuho student banking support", "Japan Post Bank"],
    simTitle: "Popular SIM and prepaid options",
    simOptions: ["Mobal", "Sakura Mobile", "IIJmio"],
    otherBenefits: ["Student commuter passes", "Local store and convenience discounts", "Museum and travel savings with student ID"],
    note: "Some services require residence registration. We help you plan the order of setup after landing.",
  },
  "study-in-south-korea": {
    overview: "South Korea has excellent transit-linked student benefits and strong prepaid mobile networks in major cities.",
    bankingTitle: "Student-friendly banking and card options",
    bankingOptions: ["KB Kookmin student banking", "Woori Bank student accounts", "Shinhan student-friendly cards"],
    simTitle: "Popular SIM and prepaid options",
    simOptions: ["KT", "SK Telecom", "LG U+"],
    otherBenefits: ["T-money transit card savings", "Campus meal discounts", "Student culture and retail discounts"],
    note: "Contract terms differ by provider. We recommend checking foreigner-friendly branches and onboarding support.",
  },
  "study-in-europe": {
    overview: "Europe is broad, so the best student benefits often come from pan-European banking apps and local SIM/eSIM providers.",
    bankingTitle: "Student-friendly banking and card options",
    bankingOptions: ["N26", "Revolut", "Wise Card"],
    simTitle: "Popular SIM and prepaid options",
    simOptions: ["Lebara", "Lycamobile", "Airalo eSIM"],
    otherBenefits: ["ISIC-backed discounts in many countries", "Local transit passes", "Museum, food, and travel savings"],
    note: "Europe is country-specific in practice, so we tailor the shortlist to your actual destination city.",
  },
};

const defaultBenefits: BenefitSet = {
  overview: "Choose a destination to see student-friendly banking, SIM, and lifestyle benefits that are commonly available to international students.",
  bankingTitle: "Student-friendly banking and card options",
  bankingOptions: ["Local student bank accounts", "Fee-light debit or credit starter products", "Campus banking support"],
  simTitle: "Popular SIM and prepaid options",
  simOptions: ["Prepaid SIM", "SIM-only plans", "eSIM or travel SIM"],
  otherBenefits: ["Student discounts", "Transport passes", "Local onboarding support"],
  note: "Availability changes often. We use this as a starting point and confirm the latest options before you depart.",
};

export default function StudentBenefitsClient() {
  const { setShowSidebar } = useHeader();
  const [selectedSlug, setSelectedSlug] = useState(destinations[0]?.slug ?? "study-in-australia");

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  const selectedDestination = useMemo(
    () => destinations.find((destination) => destination.slug === selectedSlug) ?? destinations[0],
    [selectedSlug]
  );

  const benefitSet = benefitMap[selectedDestination?.slug ?? ""] ?? defaultBenefits;

  return (
    <main className="min-h-screen bg-[#f6f8fa] pt-24 lg:pt-28">
      <section className="bg-[#003975] text-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <FadeUp>
            <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide">
              Student Essentials
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight max-w-xl">
              Student Benefits by Country
            </h1>
            <p className="mt-4 text-white/80 text-base md:text-lg max-w-xl leading-relaxed">
              Compare student-friendly bank cards, SIM plans, and everyday perks for your destination before you travel.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/student-essentials"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#003975] px-6 py-3 text-sm font-semibold hover:bg-slate-100 transition"
              >
                Back to essentials <Icon name="ArrowLeft" size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
              >
                Ask an advisor <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-[36px] border border-white/15 bg-white/10 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
              <div className="rounded-[28px] bg-white text-slate-900 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#003975]/10 flex items-center justify-center shrink-0">
                    <FlagIcon code={selectedDestination.flagCode} size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#003975]">Selected destination</p>
                    <h2 className="text-xl font-bold">{selectedDestination.name}</h2>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {benefitSet.overview}
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[0.38fr_0.62fr] gap-6 lg:gap-8 items-start">
            <FadeUp>
              <div className="rounded-3xl border border-[#d4e0ec] bg-white p-5 sm:p-6 shadow-sm sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#003975] mb-3">Choose a country</p>
                <select
                  value={selectedSlug}
                  onChange={(event) => setSelectedSlug(event.target.value)}
                  className="w-full rounded-2xl border border-[#c9d6e4] bg-white px-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#003975]/15 focus:border-[#003975]"
                >
                  {destinations.map((destination) => (
                    <option key={destination.slug} value={destination.slug}>
                      {destination.name}
                    </option>
                  ))}
                </select>

                <div className="mt-5 rounded-2xl bg-[#f3f7fb] border border-[#dbe7f2] p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-[#dbe7f2]">
                      <Icon name="Sparkles" size={18} className="text-[#003975]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Note</p>
                      <p className="text-sm text-slate-600">{benefitSet.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            <div className="space-y-6">
              <StaggerContainer className="grid sm:grid-cols-2 gap-4">
                <StaggerItem>
                  <div className="h-full rounded-3xl border border-[#dce7f1] bg-white p-5 sm:p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <h3 className="text-lg font-bold text-slate-900">{benefitSet.bankingTitle}</h3>
                      <Icon name="CreditCard" size={18} className="text-[#003975] shrink-0" />
                    </div>
                    <ul className="space-y-2.5">
                      {benefitSet.bankingOptions.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <Icon name="CheckCircle" size={14} className="text-[#003975] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="h-full rounded-3xl border border-[#dce7f1] bg-white p-5 sm:p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <h3 className="text-lg font-bold text-slate-900">{benefitSet.simTitle}</h3>
                      <Icon name="Phone" size={18} className="text-[#003975] shrink-0" />
                    </div>
                    <ul className="space-y-2.5">
                      {benefitSet.simOptions.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <Icon name="CheckCircle" size={14} className="text-[#003975] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              <div className="rounded-3xl border border-[#dbe7f2] bg-white p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#003975]/10 flex items-center justify-center shrink-0">
                    <Icon name="ShieldCheck" size={18} className="text-[#003975]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Other common student benefits</h3>
                    <p className="text-sm text-slate-500">Practical extras that often make a real difference after arrival</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  {benefitSet.otherBenefits.map((item) => (
                    <div key={item} className="rounded-2xl border border-[#e4edf6] bg-[#f9fbfd] p-4">
                      <p className="text-sm font-medium text-slate-800 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[#eaf1f8] border border-[#d4e0ec] p-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Need help comparing the options?</h3>
                    <p className="text-slate-600 mt-1">We can match your destination with the right bank, SIM, and discount setup before you fly.</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#003975] px-6 py-3 text-sm font-semibold text-white hover:bg-[#002a5c] transition whitespace-nowrap"
                  >
                    Talk to us <Icon name="ArrowRight" size={14} />
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

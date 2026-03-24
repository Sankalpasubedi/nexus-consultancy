"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

const destinationFilters = [
  "All destinations",
  "Australia",
  "Canada",
  "United Kingdom",
  "United States",
  "New Zealand",
  "Japan",
];

const essentials = [
  {
    title: "Health & Travel Insurance",
    description: "Choose reliable cover for medical care, emergencies, and visa compliance.",
    href: "/student-essentials/insurance",
    icon: "ShieldCheck",
  },
  {
    title: "Accommodation Support",
    description: "Find safe housing options near campus with budget and contract guidance.",
    href: "/student-essentials/accommodation",
    icon: "Home",
  },
  {
    title: "Student Banking Setup",
    description: "Open the right account, understand fees, and manage international transfers.",
    href: "/student-essentials/student-banking",
    icon: "Landmark",
  },
  {
    title: "Guardianship for Minors",
    description: "Arrange trusted welfare support and compliant local guardianship services.",
    href: "/student-essentials/guardianship",
    icon: "HeartHandshake",
  },
  {
    title: "ISIC Card Benefits",
    description: "Unlock global student discounts across travel, food, tech, and lifestyle.",
    href: "/student-essentials/isic-card",
    icon: "IdCard",
  },
  {
    title: "Application Progress Dashboard",
    description: "Track milestones, pending documents, and updates from your counseling team.",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
];

const resourceCards = [
  {
    title: "Budget Planning for Your First Semester Abroad",
    summary: "Learn a practical monthly breakdown for rent, food, transit, and study essentials.",
    href: "/blog",
    image: "/student/melbourne.jpg",
    tag: "Money Management",
  },
  {
    title: "How to Compare Cities Before You Finalize Housing",
    summary: "Use commute time, neighborhood safety, and living costs to make smarter choices.",
    href: "/study-abroad/compare-destinations",
    image: "/student/toronto.jpg",
    tag: "Accommodation",
  },
  {
    title: "Pre-Departure Checklist Every Student Should Complete",
    summary: "From SIM setup to airport pickup, avoid common mistakes in your first week overseas.",
    href: "/services/pre-departure-support",
    image: "/student/sydney.jpg",
    tag: "Preparation",
  },
  {
    title: "Latest Student Community Updates and Events",
    summary: "Stay informed about workshops, orientation meetups, and student support sessions.",
    href: "/news",
    image: "/student/auckland.jpg",
    tag: "Community",
  },
];

const testimonials = [
  {
    quote:
      "Nexsus helped me shortlist safe housing options before I landed in Canada. I moved in within three days of arrival.",
    name: "Ritika Adhikari",
    detail: "Postgraduate student, Vancouver",
    accent: "bg-[#1f73d8]",
  },
  {
    quote:
      "The team explained insurance terms in simple language and helped me choose a plan that matched my visa requirement.",
    name: "Sagar Kafle",
    detail: "Undergraduate student, Melbourne",
    accent: "bg-[#f08a00]",
  },
  {
    quote:
      "Opening a student bank account felt confusing, but their checklist made everything smooth in my first week.",
    name: "Nina Lama",
    detail: "Business student, London",
    accent: "bg-[#4aaa1a]",
  },
];

export default function StudentEssentialsClient() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="min-h-screen bg-[#f6f8fa] pt-24 lg:pt-28">
      <section className="bg-[#eaf1f8] border-b border-[#d2deeb]">
        <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <FadeUp>
            <span className="inline-flex items-center rounded-full bg-white text-[#003975] border border-[#d6e2f0] px-4 py-1.5 text-xs font-semibold tracking-wide">
              Student Essentials Hub
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              Everything students need beyond admission
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl">
              Build a confident start overseas with practical help for housing, insurance, banking, identity cards, and day-one planning.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#1f73d8] px-6 py-3 text-sm font-semibold text-white hover:bg-[#195fb3] transition"
              >
                Talk to an advisor <Icon name="ArrowRight" size={14} />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-[#b9cadf] bg-white px-6 py-3 text-sm font-semibold text-[#003975] hover:bg-[#f2f6fb] transition"
              >
                Open dashboard
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative h-[300px] md:h-[360px] rounded-[40px] overflow-hidden shadow-xl">
              <Image
                src="/student/new-york.jpg"
                alt="Students planning their support services"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 text-sm text-slate-700">
                Practical support from pre-departure to first semester.
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-6">

          <div className="bg-[#deedf2] rounded-2xl p-5 md:p-6 grid lg:grid-cols-[0.34fr_1fr] gap-5">
            <div className="rounded-2xl bg-white/60 p-5">
              <h2 className="text-3xl font-bold text-slate-900">Essential support</h2>
              <p className="text-slate-700 leading-relaxed">
                Services designed to reduce stress and help you settle faster in your study destination.
              </p>
              <div className="relative mt-5 h-[180px] rounded-2xl overflow-hidden">
                <Image src="/student/sydney.jpg" alt="Student essentials" fill className="object-cover" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {essentials.map((item, idx) => (
                <FadeUp key={item.href} delay={idx * 0.04}>
                  <Link
                    href={item.href}
                    className="group block rounded-xl border border-[#bdd2dd] bg-white p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#ecf3fb] flex items-center justify-center shrink-0">
                        <Icon name={item.icon} size={18} className="text-[#2a5f9e]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 leading-tight">{item.title}</h3>
                        <p className="text-slate-600 mt-1.5 text-sm">{item.description}</p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[#1f73d8] text-sm font-semibold">
                          Explore <Icon name="ChevronRight" size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900">Helpful reads and tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resourceCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-md transition"
              >
                <div className="relative h-40">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-[#1f73d8] uppercase tracking-wide">{card.tag}</span>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{card.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900">What students told us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className={`w-11 h-11 rounded-xl ${item.accent} text-white text-2xl font-bold flex items-center justify-center`}>
                  &ldquo;
                </div>
                <p className="mt-5 text-slate-700 leading-relaxed">{item.quote}</p>
                <p className="mt-5 text-lg font-semibold text-slate-900">{item.name}</p>
                <p className="text-slate-500 text-sm">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-[#dff1f5] border-y border-[#c6dde5]">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1fr_0.75fr] gap-8 items-start">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">Need help with student essentials?</h2>
            <p className="text-slate-700 mb-6">
              Share your plans and we will recommend the right support package for your destination and timeline.
            </p>

            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input className="h-12 rounded-xl border border-slate-300 px-4" placeholder="First name*" />
                <input className="h-12 rounded-xl border border-slate-300 px-4" placeholder="Last name*" />
              </div>
              <input type="email" className="w-full h-12 rounded-xl border border-slate-300 px-4" placeholder="Email address*" />
              <div className="grid sm:grid-cols-2 gap-4">
                <input className="h-12 rounded-xl border border-slate-300 px-4" placeholder="Mobile number*" />
                <select className="h-12 rounded-xl border border-slate-300 px-4 bg-white text-slate-600">
                  <option>Preferred destination*</option>
                  <option>Australia</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                </select>
              </div>
              <select className="w-full h-12 rounded-xl border border-slate-300 px-4 bg-white text-slate-600">
                <option>Support needed*</option>
                <option>Insurance and health cover</option>
                <option>Accommodation support</option>
                <option>Banking and transfers</option>
                <option>ISIC card application</option>
              </select>
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input type="checkbox" className="mt-0.5" />
                I agree to be contacted by Nexsus about my enquiry and related student support services.
              </label>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#1f73d8] px-7 py-3 text-sm font-semibold text-white hover:bg-[#195fb3] transition"
              >
                Submit enquiry <Icon name="ArrowRight" size={14} />
              </button>
            </form>
          </div>

          <div className="hidden lg:block">
            <div className="relative h-[580px] rounded-[56px] overflow-hidden shadow-xl">
              <Image src="/student/toronto.jpg" alt="Student support team" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

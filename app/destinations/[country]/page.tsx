"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { countryDataMap } from "@/data";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { FlagIcon, Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

const subPages = [
  { title: "Why Study Here", slug: "why-study-here", icon: "Lightbulb", description: "Discover the top reasons to pursue your education here", color: "from-blue-600 to-indigo-600" },
  { title: "Universities", slug: "universities", icon: "GraduationCap", description: "Explore top-ranked universities and their programs", color: "from-emerald-600 to-teal-600" },
  { title: "Admission", slug: "admission", icon: "ClipboardList", description: "Requirements for undergraduate, postgraduate, and doctoral", color: "from-violet-600 to-purple-600" },
  { title: "Student Visa", slug: "student-visa", icon: "ShieldCheck", description: "Visa requirements, processing times, and documents needed", color: "from-orange-500 to-red-500" },
  { title: "Living Cost", slug: "living-cost", icon: "DollarSign", description: "Monthly costs for accommodation, food, transport, and more", color: "from-amber-500 to-yellow-500" },
  { title: "Work & Jobs", slug: "work-and-jobs", icon: "Briefcase", description: "Part-time work rights and post-study career opportunities", color: "from-cyan-500 to-blue-500" },
  { title: "Scholarships", slug: "scholarships", icon: "Trophy", description: "Funding opportunities, grants, and financial aid options", color: "from-pink-500 to-rose-500" },
  { title: "Culture", slug: "culture", icon: "Globe", description: "Lifestyle, traditions, and what to expect as a student", color: "from-green-600 to-emerald-600" },
];

export default function DestinationDetailPage() {
  const params = useParams();
  const country = params.country as string;
  const data = countryDataMap[country];
  const { setShowSidebar } = useHeader();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  useEffect(() => {
    if (!data) return;
    const timer = setInterval(() => {
      setCurrentImage((p) => (p + 1) % data.carouselData.CountryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data]);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Destination Not Found</h1>
          <p className="text-slate-500 mb-6">The destination you are looking for does not exist.</p>
          <Link href="/destinations" className="text-[#003975] font-medium hover:underline">
            View all destinations
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {data.carouselData.CountryImages.map((img, idx) => (
          <div
            key={img.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: idx === currentImage ? 1 : 0 }}
          >
            <Image
              src={img.url}
              alt={img.location}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <FlagIcon code={data.flagCode} size={28} className="rounded" />
                <span className="text-white/80 text-lg font-medium">Study in</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{data.country}</h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-xl text-white/80 max-w-2xl mb-8 leading-relaxed">
                {data.carouselData.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-medium hover:bg-slate-100 transition shadow-lg"
                >
                  Get Free Counseling
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link
                  href={`/destinations/${country}/why-study-here`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-medium border border-white/30 hover:bg-white/20 transition"
                >
                  Learn More
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex gap-2">
          {data.carouselData.CountryImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`h-2 rounded-full transition-all ${idx === currentImage ? "bg-white w-8" : "bg-white/40 w-2"}`}
            />
          ))}
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.highlightedData.statistics.map((stat) => (
                <div key={stat.id} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-2xl md:text-3xl font-bold text-[#003975] mb-2">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-slate-600 text-center mt-10 max-w-3xl mx-auto leading-relaxed">
              {data.highlightedData.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Sub-Pages Navigation */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Everything You Need to Know
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Explore detailed information about studying in {data.country}
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {subPages.map((page) => (
              <StaggerItem key={page.slug}>
                <Link href={`/destinations/${country}/${page.slug}`}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow h-full group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon name={page.icon} size={22} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{page.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{page.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#003975] group-hover:gap-2 transition-all">
                      Learn more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Why Study in {data.country}?
            </h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.whyData.slice(0, 6).map((reason, idx) => (
              <StaggerItem key={idx}>
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-[#003975]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-[#003975]">{idx + 1}</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{reason}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeUp delay={0.3}>
            <div className="text-center mt-10">
              <Link
                href={`/destinations/${country}/why-study-here`}
                className="inline-flex items-center gap-2 text-[#003975] font-medium hover:gap-3 transition-all"
              >
                Read more about studying in {data.country}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Top Universities Preview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Top Universities</h2>
              <Link
                href={`/destinations/${country}/universities`}
                className="text-[#003975] font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                View all <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.universities.slice(0, 6).map((uni) => (
              <StaggerItem key={uni.id}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="px-3 py-1 bg-blue-50 text-[#003975] rounded-full text-xs font-semibold">
                      #{uni.ranking.position} {uni.ranking.type}
                    </div>
                    <div className="text-xs text-slate-400">{uni.location.city}, {uni.location.state}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{uni.name}</h3>
                  <p className="text-sm text-slate-500">{uni.scholarship.description}</p>
                  <div className="mt-3">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      Up to {uni.scholarship.percentage}% scholarship
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Study in {data.country}?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Get personalized guidance from our expert counselors. We&apos;ll help you choose the right university, prepare your application, and secure your visa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold shadow-lg">
                  Book Free Consultation
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </motion.div>
              <Link
                href="/destinations"
                className="inline-flex items-center justify-center gap-2 text-white border border-white/30 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition"
              >
                Other Destinations
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

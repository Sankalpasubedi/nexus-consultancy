"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  AnimatedCounter,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect } from "react";
import { Icon, FlagIcon } from "@/lib/icons";

/* ─── BENEFITS DATA ─────────────────────────────────── */

const benefits = [
  {
    icon: "GraduationCap",
    title: "World-Class Education",
    description: "Access top-ranked universities and cutting-edge research facilities that provide globally recognized qualifications.",
    color: "bg-blue-500",
  },
  {
    icon: "Briefcase",
    title: "Enhanced Career Prospects",
    description: "International graduates are highly valued by employers. Gain skills and experiences that set you apart in the job market.",
    color: "bg-emerald-500",
  },
  {
    icon: "Globe",
    title: "Global Network",
    description: "Build lifelong connections with students and professionals from around the world, expanding your personal and career network.",
    color: "bg-purple-500",
  },
  {
    icon: "Heart",
    title: "Personal Growth",
    description: "Develop independence, resilience, and adaptability. Living abroad challenges you to grow in ways you never imagined.",
    color: "bg-rose-500",
  },
  {
    icon: "Languages",
    title: "Cultural Immersion",
    description: "Experience new cultures, traditions, and perspectives firsthand. Become a true global citizen with cross-cultural competence.",
    color: "bg-amber-500",
  },
  {
    icon: "TrendingUp",
    title: "Higher Earning Potential",
    description: "Studies show international graduates earn 25-50% more than domestic-only educated peers over their careers.",
    color: "bg-cyan-500",
  },
];

const stats = [
  { label: "Higher Earnings", value: 40, suffix: "%", description: "Average salary boost for international graduates" },
  { label: "Global Employers", value: 85, suffix: "%", description: "Prefer candidates with international experience" },
  { label: "Career Satisfaction", value: 92, suffix: "%", description: "Rate their decision to study abroad positively" },
  { label: "Job Placement", value: 95, suffix: "%", description: "Of our students get placed within 6 months" },
];

const workRights = [
  { country: "Australia", duration: "2-4 years", icon: "au", detail: "Post-study work visa (subclass 485)" },
  { country: "Canada", duration: "Up to 3 years", icon: "ca", detail: "PGWP matching study duration" },
  { country: "UK", duration: "2 years", icon: "gb", detail: "Graduate Route visa" },
  { country: "USA", duration: "1-3 years", icon: "us", detail: "OPT (extended for STEM)" },
  { country: "New Zealand", duration: "1-3 years", icon: "nz", detail: "Post-Study Work Visa" },
  { country: "Germany", duration: "18 months", icon: "de", detail: "Job Seeker Visa" },
];

const studyInCountries = [
  { label: "Australia", href: "/destinations/study-in-australia", flagCode: "au", students: "700K+", universities: "43" },
  { label: "Canada", href: "/destinations/study-in-canada", flagCode: "ca", students: "800K+", universities: "96" },
  { label: "USA", href: "/destinations/study-in-usa", flagCode: "us", students: "1M+", universities: "4,000+" },
  { label: "UK", href: "/destinations/study-in-uk", flagCode: "gb", students: "600K+", universities: "164" },
  { label: "New Zealand", href: "/destinations/study-in-new-zealand", flagCode: "nz", students: "120K+", universities: "8" },
  { label: "Japan", href: "/destinations/study-in-japan", flagCode: "jp", students: "300K+", universities: "780+" },
  { label: "South Korea", href: "/destinations/study-in-south-korea", flagCode: "kr", students: "160K+", universities: "400+" },
  { label: "Europe", href: "/destinations/study-in-europe", flagCode: "eu", students: "2M+", universities: "5,000+" },
];

export default function WhyStudyAbroadClient() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#004a8f] via-[#003a75] to-[#002550] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 text-sm font-medium backdrop-blur-sm">
                  <Icon name="Sparkles" size={20} /> Benefits of Studying Abroad
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight">
                  Why <span className="text-[#00ab18]">Study Abroad</span>?
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                  Transform your future with an international education. Discover the life-changing benefits that await you when you choose to study abroad.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-4 mt-8">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white text-[#003975] px-6 py-3.5 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
                    >
                      Get Free Consultation <Icon name="ArrowRight" size={16} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/study-abroad/compare-destinations"
                      className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-white/20 transition backdrop-blur-sm border border-white/20"
                    >
                      Compare Destinations <Icon name="Globe" size={16} />
                    </Link>
                  </motion.div>
                </div>
              </FadeUp>
            </div>

            {/* Right Image */}
            <FadeUp delay={0.4}>
              <div className="hidden lg:block relative">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/services/NEX-_-1.jpg"
                    alt="Why Study Abroad"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003975]/40 to-transparent" />
                </div>
                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Icon name="TrendingUp" size={24} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-lg">40%+</p>
                      <p className="text-slate-500 text-xs">Higher Earnings</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00ab18]/10 flex items-center justify-center">
                      <Icon name="GraduationCap" size={24} className="text-[#00ab18]" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-lg">15,000+</p>
                      <p className="text-slate-500 text-xs">Students Placed</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                <Icon name="Star" size={16} /> Key Advantages
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                Benefits That Transform Your Future
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                An international education opens doors you never knew existed
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <StaggerItem key={benefit.title}>
                <HoverCard>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="bg-white rounded-3xl p-8 border border-gray-100 h-full group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-900 opacity-[0.02] blur-2xl group-hover:opacity-[0.05] transition rounded-full" />
                    <div className={`w-14 h-14 rounded-2xl ${benefit.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon name={benefit.icon} size={26} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                  </motion.div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Numbers Speak for Themselves
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Data-backed reasons why studying abroad is one of the best investments you can make
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
              >
                <div className="text-5xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} />{stat.suffix}
                </div>
                <div className="text-lg font-semibold text-[#00ab18] mb-2">{stat.label}</div>
                <p className="text-sm text-slate-400">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Rights Section */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm border border-gray-100">
                <Icon name="Briefcase" size={16} /> Post-Study Work Rights
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Build Your Career After Graduation
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Most popular destinations offer generous post-study work visas
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workRights.map((item, idx) => (
              <motion.div
                key={item.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#003975]/5 transition-colors">
                    <FlagIcon code={item.icon} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.country}</h3>
                    <p className="text-[#003975] font-bold text-lg">{item.duration}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study In Countries Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-slate-100 text-slate-600 text-sm font-medium border border-gray-100">
                <Icon name="MapPin" size={16} /> Popular Destinations
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Where Would You Like to Study?
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Choose from the world&apos;s top study destinations and start your international education journey
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {studyInCountries.map((country, idx) => (
              <motion.div
                key={country.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: idx * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Link href={country.href} className="block group">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-[#fafaf8] rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#003975]/20 transition-all duration-300 h-full relative overflow-hidden"
                  >
                    {/* Gradient hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#003975]/5 to-[#00ab18]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Flag */}
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.4 }}
                        className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4 group-hover:bg-[#003975]/5 transition-colors duration-300 shadow-sm"
                      >
                        <FlagIcon code={country.flagCode} size={28} />
                      </motion.div>
                      
                      {/* Country Name */}
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#003975] transition-colors duration-300">
                        {country.label}
                      </h3>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Icon name="Users" size={12} className="text-slate-400" />
                          {country.students}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Building" size={12} className="text-slate-400" />
                          {country.universities}
                        </span>
                      </div>
                      
                      {/* Arrow indicator */}
                      <motion.div 
                        className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        <Icon name="ArrowUpRight" size={18} className="text-[#003975]" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#004a8f] to-[#003a75] text-white">
        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Our expert counselors will help you choose the right destination and program for your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
                >
                  Book Free Consultation <Icon name="ArrowRight" size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/study-abroad/compare-destinations"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition backdrop-blur-sm border border-white/20"
                >
                  Compare All Destinations <Icon name="Globe" size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}

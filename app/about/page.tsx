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
  AnimatedCounter,
  HoverCard,
} from "@/lib/animations";
import { useHeader } from "@/app/contexts/HeaderContext";
import { useEffect } from "react";
import { Icon } from "@/lib/icons";

/* ─── Data ─────────────────────────────────────────── */

const stats = [
  { label: "Students Placed", value: 15000, suffix: "+" },
  { label: "Partner Universities", value: 500, suffix: "+" },
  { label: "Countries", value: 9, suffix: "" },
  { label: "Visa Success Rate", value: 98, suffix: "%" },
];

const coreValues = [
  {
    icon: "Trophy",
    title: "Excellence",
    description:
      "We maintain the highest standards in every service we provide, ensuring exceptional outcomes for our students.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: "Handshake",
    title: "Integrity",
    description:
      "Transparency and honesty guide every interaction. We build trust through ethical practices and honest advice.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: "Target",
    title: "Student Centric",
    description:
      "Your goals are our priority. We tailor every recommendation to match your unique aspirations and background.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: "Lightbulb",
    title: "Innovation",
    description:
      "We leverage the latest tools, data, and AI-driven insights to provide the most effective guidance available.",
    gradient: "from-purple-500 to-pink-500",
  },
];

const timeline = [
  { year: "2010", title: "Founded", description: "Started with a vision to transform international education consulting in Nepal." },
  { year: "2015", title: "10,000 Students", description: "Reached our first major milestone of placing 10,000 students globally." },
  { year: "2018", title: "Global Expansion", description: "Partnered with 300+ universities across 9 countries." },
  { year: "2022", title: "AI Integration", description: "Introduced AI-powered university matching and profile assessment tools." },
  { year: "2024", title: "Industry Leader", description: "Recognized as Nepal's leading education consultancy with 500+ university partners." },
];

const team = [
  { name: "Bishnu Khadka", role: "Managing Director", image: "/student/image copy.png", exp: "10+ years Global Communication" },
  { name: "Anita Sharma", role: "Head of Admissions", image: "/student/image copy 2.png", exp: "8+ years in student counselling" },
  { name: "Rajesh Patel", role: "Visa Specialist", image: "/student/priya sharma.png", exp: "12+ years immigration expertise" },
  { name: "Suman Tamang", role: "Career Advisor", image: "/student/Raul Thapa.jpg", exp: "7+ years career counselling" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    course: "MBA, University of Toronto",
    country: "Canada",
    image: "/student/priya sharma.png",
    quote:
      "NEXUS made my dream of studying in Canada a reality. Their guidance through every step was invaluable.",
  },
  {
    name: "Rahul Thapa",
    course: "MS Computer Science, University of Melbourne",
    country: "Australia",
    image: "/student/Raul Thapa.jpg",
    quote:
      "From university selection to visa approval, the team was with me all the way. Highly recommended!",
  },
  {
    name: "Sita Gurung",
    course: "BBA, University of British Columbia",
    country: "Canada",
    image: "/student/Sita Gurung.jpg",
    quote:
      "The scholarship guidance I received helped me save over $20,000 on my education. Forever grateful!",
  },
];

/* ─── Component ────────────────────────────────────── */

export default function AboutPage() {
  const { setShowSidebar } = useHeader();

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#003975] via-[#002d5e] to-[#001a3a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 text-sm font-medium">
              <Icon name="Sparkles" size={16} /> About NEXUS
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl">
              Empowering Students to <span className="text-[#00ab18]">Achieve Global Dreams</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xl text-blue-100 max-w-2xl mb-10">
              Since 2010, NEXUS Education Consultancy has been providing high-quality
              guidance to students pursuing international education across 9 countries.
            </p>
          </FadeUp>

          {/* Stats Row */}
          <FadeUp delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
              {stats.map((s) => (
                <div key={s.label} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter value={s.value} />{s.suffix}
                  </div>
                  <div className="text-sm text-blue-200 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeLeft>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/contact/image.png"
                  alt="NEXUS Office"
                  width={600}
                  height={450}
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#003975] text-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold">14+</div>
                <div className="text-sm text-blue-200">Years of Excellence</div>
              </div>
            </div>
          </FadeLeft>
          <FadeRight>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-blue-50 text-[#003975] text-sm font-medium">
                <Icon name="BookOpen" size={16} /> Our Story
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                From a Vision to Nepal&apos;s Leading Consultancy
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                NEXUS Education Consultancy & Immigration Service was established with a
                mission to provide high-quality education guidance to Nepalese students
                aspiring to study abroad.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Over the years, we have expanded our services to cover Australia, USA, UK,
                Canada, New Zealand, South Korea, Japan, and European countries — building
                partnerships with 500+ universities worldwide.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Expert Counselors", "Visa Support", "Scholarship Help", "Post-arrival Care"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs"><Icon name="Check" size={12} /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="Gem" size={16} /> Core Values
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What Drives Us</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Our principles shape every interaction and decision we make
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((v) => (
              <StaggerItem key={v.title}>
                <HoverCard>
                  <div className="bg-white rounded-3xl p-8 h-full border border-gray-100">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                      <Icon name={v.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{v.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
                <Icon name="Calendar" size={16} /> Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Milestones</h2>
            </div>
          </FadeUp>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#003975] to-[#00ab18]" />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <FadeUp key={t.year} delay={i * 0.1}>
                  <div className="flex gap-8 items-start">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, type: "spring" }}
                      className="relative z-10 w-16 h-16 rounded-full bg-white border-4 border-[#003975] flex items-center justify-center flex-shrink-0 shadow-md"
                    >
                      <span className="text-xs font-bold text-[#003975]">{t.year}</span>
                    </motion.div>
                    <div className="pt-3">
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">{t.title}</h3>
                      <p className="text-slate-500">{t.description}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm">
                <Icon name="Users" size={16} /> Meet Our Experts
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">The Team Behind Your Success</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Dedicated professionals with years of experience in international education
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((m) => (
              <StaggerItem key={m.name}>
                <HoverCard>
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-semibold text-slate-900">{m.name}</h3>
                      <p className="text-[#003975] text-sm font-medium mb-1">{m.role}</p>
                      <p className="text-slate-400 text-xs">{m.exp}</p>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
                <Icon name="MessageCircle" size={16} /> Testimonials
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Student Success Stories</h2>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <HoverCard>
                  <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-100">
                    <div className="text-4xl text-[#003975] opacity-20 mb-4">&ldquo;</div>
                    <p className="text-slate-600 mb-6 leading-relaxed">{t.quote}</p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.course}</p>
                        <p className="text-xs text-[#003975]">{t.country}</p>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#003975] to-[#002d5e] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Book a free consultation with our expert counselors and take the first step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition shadow-lg"
                >
                  Book Free Consultation
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
                >
                  Explore Destinations
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

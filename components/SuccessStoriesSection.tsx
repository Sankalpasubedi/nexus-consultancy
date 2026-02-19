"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    degree: "MBA",
    university: "University of Toronto",
    country: "Canada",
    quote: "NEXUS transformed my dream into reality. Their personalized guidance helped me secure admission to my dream university with a scholarship. The team was with me every step of the way.",
    image: "/student/priya sharma.png",
  },
  {
    id: 2,
    name: "Raul Thapa",
    degree: "Masters in Computer Science",
    university: "MIT",
    country: "United States",
    quote: "The application process seemed daunting, but NEXUS made it seamless. From statement of purpose to visa interview, they provided expert guidance at every stage.",
    image: "/student/Raul Thapa.jpg",
  },
  {
    id: 3,
    name: "Sita Gurung",
    degree: "Bachelor of Science",
    university: "University of Melbourne",
    country: "Australia",
    quote: "NEXUS's career counseling helped me choose the perfect program. I'm now thriving at one of the world's top universities!",
    image: "/student/Sita Gurung.jpg",
  },
];

export default function SuccessStoriesSection() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-900 to-green-900 overflow-hidden">
      {/* Animated BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/15 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-600/15 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-800/50 backdrop-blur-sm rounded-full mb-4">
              <Star size={14} className="text-amber-400" />
              <span className="text-sm font-medium text-white/90">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Students Say</h2>
            <p className="text-lg text-white/60">Real experiences from students who trusted us with their future</p>
          </div>
        </FadeUp>

        {/* Main */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${current}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex-shrink-0"
            >
              <div className="w-80 sm:w-96 lg:w-[420px] h-[500px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl relative">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="font-bold text-xl text-white mb-1">{t.name}</p>
                  <p className="text-white/90 text-sm">{t.degree}</p>
                  <p className="text-white/70 text-sm">{t.university}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quote */}
          <div className="flex-1 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${current}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-2xl md:text-3xl font-medium text-white/90 mb-8 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-green-500" />
                  <p className="text-base font-medium text-white/80">{t.country}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button onClick={prev} className="w-11 h-11 rounded-full border border-white/30 hover:bg-white/10 flex items-center justify-center text-white transition">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={next} className="w-11 h-11 rounded-full border border-white/30 hover:bg-white/10 flex items-center justify-center text-white transition">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="flex gap-2 ml-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "bg-white w-8" : "bg-white/30 w-2"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    degree: "MBA",
    university: "University of Toronto",
    country: "Canada",
    quote: "Nexsus transformed my dream into reality. Their personalized guidance helped me secure admission to my dream university with a full scholarship. The team was with me every step of the way, from application to arrival.",
    image: "/student/priya sharma.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Raul Thapa",
    degree: "Masters in Computer Science",
    university: "MIT",
    country: "United States",
    quote: "The application process seemed daunting, but Nexsus made it seamless. From crafting my statement of purpose to visa interview preparation, they provided expert guidance at every stage. I couldn't have done it without them.",
    image: "/student/Raul Thapa.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Sita Gurung",
    degree: "Bachelor of Science",
    university: "University of Melbourne",
    country: "Australia",
    quote: "Nexsus's career counseling helped me choose the perfect program. Their deep knowledge of Australian universities and scholarship opportunities made all the difference. I'm now thriving at one of the world's top universities!",
    image: "/student/Sita Gurung.jpg",
    rating: 5,
  },
];

export default function SuccessStoriesSection() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-green-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <FadeUp>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
              <Star size={14} className="text-[#00ab18]" />
              <span className="text-sm font-medium text-white/80">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              What Our Students Say
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Real experiences from students who trusted us with their future
            </p>
          </div>
        </FadeUp>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${current}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex-shrink-0"
            >
              <div className="relative w-80 sm:w-96 lg:w-[440px] h-[480px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-bold text-xl text-white mb-1">{t.name}</p>
                  <p className="text-white/80 text-sm">{t.degree} - {t.university}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex-1 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${current}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <Quote size={48} className="text-white/10 mb-6" />

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-[#00ab18] fill-[#00ab18]" />
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl font-medium text-white/90 mb-10 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 mb-10">
                  <div className="flex-1 h-px bg-gradient-to-r from-[#003975] to-[#00ab18]" />
                  <p className="text-sm font-medium text-white/60">{t.country}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4">
              <button onClick={prev} className="w-12 h-12 rounded-full border border-white/20 hover:bg-white/5 flex items-center justify-center text-white transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={next} className="w-12 h-12 rounded-full border border-white/20 hover:bg-white/5 flex items-center justify-center text-white transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="flex gap-2 ml-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "bg-white w-10" : "bg-white/20 w-3 hover:bg-white/40"}`}
                  />
                ))}
              </div>
              <span className="ml-auto text-white/30 text-sm font-medium">
                {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

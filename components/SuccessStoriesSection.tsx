"use client";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    degree: "MBA",
    university: "University of Toronto",
    country: "Canada",
    quote:
      "NEXUS transformed my dream into reality. Their personalized guidance helped me secure admission to my dream university with a scholarship. The team was with me every step of the way.",
    image: "/path-to-priya-image.jpg", // Replace with actual image path
  },
  {
    id: 2,
    name: "Aditya Kumar",
    degree: "Masters in Computer Science",
    university: "MIT",
    country: "United States",
    quote:
      "The application process seemed daunting, but NEXUS made it seamless. From statement of purpose to visa interview, they provided expert guidance at every stage.",
    image: "/path-to-aditya-image.jpg", // Replace with actual image path
  },
  {
    id: 3,
    name: "Sarah Chen",
    degree: "Bachelor of Science",
    university: "University of Melbourne",
    country: "Australia",
    quote:
      "NEXUS's career counseling helped me choose the perfect program. I'm now thriving at one of the world's top universities!",
    image: "/path-to-sarah-image.jpg", // Replace with actual image path
  },
];

export default function SuccessStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-900 to-green-600 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute top-0 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-5 py-2 bg-emerald-800/50 backdrop-blur-sm rounded-full mb-4">
            <p className="text-sm font-medium text-white/90">Success Stories</p>
          </div>
          <h2 className="text-[16px] md:text-[18px] text-white mb-6">
            What Our Students Say
          </h2>
          <p className="text-lg text-white/70">
            Real experiences from students who trusted us with their future
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image Card with Overlay Info */}
          <div className="flex-shrink-0 relative">
            <div 
              key={`image-${currentIndex}`}
              className="w-120 h-[600px] rounded-3xl overflow-hidden shadow-2xl relative animate-fadeIn"
            >
              {/* Replace this div with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400">
                {/* <img 
                  src={current.image} 
                  alt={current.name}
                  className="w-full h-full object-cover"
                /> */}
                <div className="w-full h-full flex items-center justify-center text-9xl">
                  👩‍🎓
                </div>
              </div>
              
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <p className="font-bold text-xl text-white mb-1">{current.name}</p>
                <p className="text-white/90 text-sm mb-0.5">{current.degree}</p>
                <p className="text-white/80 text-sm">{current.university}</p>
              </div>
            </div>
          </div>

          {/* Testimonial Content */}<div className="flex-1 max-w-2xl">
            <div 
              key={`quote-${currentIndex}`}
              className={`animate-slideIn${direction === 1 ? 'Right' : 'Left'}`}
            >
              <blockquote className="text-2xl md:text-3xl font-medium text-white/90 mb-8 leading-relaxed italic">
                 "{current.quote}"
              </blockquote>

              {/* Gradient Line with Country */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
                <p className="text-base font-medium text-white/80 whitespace-nowrap">{current.country}</p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-white backdrop-blur-sm group"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-white backdrop-blur-sm group"
                  aria-label="Next testimonial"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Pagination Dots */}
                <div className="flex gap-2 ml-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "bg-white w-8"
                          : "bg-white/30 w-2 hover:bg-white/50"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
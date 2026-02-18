"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const destinations = [
  {
    id: 1,
    name: "United States",
    location: "USA",
    image: "/images/australia.jpg",
    description: "Pursue excellence at the world's leading universities",
  },
  {
    id: 2,
    name: "Australia",
    location: "Australia",
    image: "/images/australia.jpg",
    description: "Experience world-class education in the land down under",
  },
  {
    id: 3,
    name: "New Zealand",
    location: "New Zealand",
    image: "/images/australia.jpg",
    description: "Experience innovative education in stunning natural beauty",
  },
  {
    id: 4,
    name: "China",
    location: "China",
    image: "/images/australia.jpg",
    description: "Experience innovative education in stunning natural beauty",
  },
  {
    id: 5,
    name: "Japan",
    location: "Japan",
    image: "/images/australia.jpg",
    description: "Experience innovative education in stunning natural beauty",
  },
  {
    id: 6,
    name: "Japan",
    location: "Japan",
    image: "/images/australia.jpg",
    description: "Experience innovative education in stunning natural beauty",
  },
  {
    id: 7,
    name: "Japan",
    location: "Japan",
    image: "/images/australia.jpg",
    description: "Experience innovative education in stunning natural beauty",
  },
];

export default function DestinationsSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollAmount = 350;

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const max = Math.max(0, contentWidth - containerWidth);
        setMaxScroll(max);
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  const next = () => {
    setScrollPosition((prev) => Math.min(prev + scrollAmount, maxScroll));
  };

  const prev = () => {
    setScrollPosition((prev) => Math.max(0, prev - scrollAmount));
  };

  return (
    <section className="py-24 px-1 bg-white">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-5 py-2 mb-6 text-lg rounded-full bg-gray-100 text-slate-700">
            Global Opportunities
          </div>
          <h2 className="text-[16px] md:text-[18px] font-bold text-slate-900 mb-6">
            Study Destinations
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from top-tier universities across the world's most
            sought-after study destinations
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Slider Wrapper */}
          <div className="overflow-hidden" ref={containerRef}>
            <div
              ref={contentRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
              }}
            >
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="w-[400px] flex-shrink-0 px-4"
                >
                  <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg group">
                    {/* Background Image */}
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                    {/* Content */}
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {dest.location}
                      </div>

                      <h3 className="text-3xl font-semibold mb-3">
                        {dest.name}
                      </h3>

                      <p className="text-sm opacity-90 mb-4">
                        {dest.description}
                      </p>

                      <Link
                        href="/destinations"
                        className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows Bottom Right */}
          <div className="flex justify-end gap-4 mt-10 pr-20">
            <button
              onClick={prev}
              disabled={scrollPosition === 0}
              className="w-12 h-12 rounded-full border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5 text-slate-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={next}
              disabled={scrollPosition >= maxScroll}
              className="w-12 h-12 rounded-full border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5 text-slate-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
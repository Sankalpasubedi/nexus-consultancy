"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

const destinations = [
  {
    id: 1,
    name: "United States",
    slug: "united-states",
    description:
      "The United States remains the world's most popular study destination, home to prestigious Ivy League institutions and leading research universities. With over 4,000 accredited institutions offering diverse programs, students benefit from cutting-edge facilities, renowned faculty, and unparalleled research opportunities.",
    shortDesc: "Pursue excellence at the world's leading universities",
    image: "/images/australia.jpg",
    location: "USA",
    flag: "🇺🇸",
    code: "US",
  },
  {
    id: 2,
    name: "Australia",
    slug: "australia",
    description:
      "Australia offers world-class education with a relaxed lifestyle and stunning natural beauty. Home to several of the world's top 100 universities, Australia welcomes international students with open arms, offering post-study work rights and clear pathways to permanent residency.",
    shortDesc: "Experience world-class education in the land down under",
    image: "/images/australia.jpg",
    location: "Australia",
    flag: "🇦🇺",
    code: "AU",
  },
  {
    id: 3,
    name: "New Zealand",
    slug: "new-zealand",
    description:
      "New Zealand provides an innovative education system surrounded by breathtaking landscapes. A safe, welcoming environment for global students, New Zealand universities are internationally recognized for research excellence and practical learning approaches.",
    shortDesc: "Experience innovative education in stunning natural beauty",
    image: "/images/australia.jpg",
    location: "New Zealand",
    flag: "🇳🇿",
    code: "NZ",
  },
  {
    id: 4,
    name: "United Kingdom",
    slug: "united-kingdom",
    description:
      "The UK is home to some of the world's oldest and most prestigious universities including Oxford and Cambridge. With centuries of academic tradition combined with cutting-edge modern research, the UK offers an unparalleled educational experience.",
    shortDesc: "Historic universities with cutting-edge research",
    image: "/images/australia.jpg",
    location: "United Kingdom",
    flag: "🇬🇧",
    code: "GB",
  },
  {
    id: 5,
    name: "Canada",
    slug: "canada",
    description:
      "Canada is a multicultural mosaic of opportunity with top-ranked universities and clear pathways to permanent residency. Known for its safe cities, high quality of life, and welcoming attitude toward immigrants, Canada is one of the top choices for international students.",
    shortDesc: "Study in a welcoming country with excellent universities",
    image: "/images/australia.jpg",
    location: "Canada",
    flag: "🇨🇦",
    code: "CA",
  },
  {
    id: 6,
    name: "Japan",
    slug: "japan",
    description:
      "Japan offers a unique blend of ancient tradition and cutting-edge innovation. Immerse yourself in innovation and timeless cultural traditions at world-class institutions, while experiencing one of the world's most fascinating cultures.",
    shortDesc: "Immerse yourself in innovation and timeless cultural traditions",
    image: "/images/australia.jpg",
    location: "Japan",
    flag: "🇯🇵",
    code: "JP",
  },
  {
    id: 7,
    name: "South Korea",
    slug: "south-korea",
    description:
      "South Korea has rapidly emerged as a dynamic study destination, combining world-class education with technological innovation and vibrant culture. Korean universities are known for their strong industry connections and cutting-edge research facilities.",
    shortDesc: "Experience the dynamic fusion of technology and Korean culture",
    image: "/images/australia.jpg",
    location: "South Korea",
    flag: "🇰🇷",
    code: "KR",
  },
];

const CARD_WIDTH = 400;
const CARD_GAP = 16;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;

export default function Destinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback(() => {
    const c = scrollRef.current;
    if (!c) return;
    // With scroll-snap-align: center + equal padding on both sides,
    // scrollLeft=0 means card[0] is centered, scrollLeft=CARD_STRIDE means card[1] is centered, etc.
    const raw = c.scrollLeft / CARD_STRIDE;
    setScrollProgress(raw);
    setActiveIndex(Math.round(raw));
  }, []);

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    c.addEventListener("scroll", onScroll, { passive: true });
    return () => c.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const snapTo = (index: number) => {
    scrollRef.current?.scrollTo({ left: index * CARD_STRIDE, behavior: "smooth" });
  };

  // Mouse drag
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const didDrag = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grabbing";
      // Disable snap so dragging feels fluid
      scrollRef.current.style.scrollSnapType = "none";
    }
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
  };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      // Re-enable snap then snap to nearest
      scrollRef.current.style.scrollSnapType = "x mandatory";
    }
    const idx = Math.round((scrollRef.current?.scrollLeft ?? 0) / CARD_STRIDE);
    snapTo(Math.max(0, Math.min(idx, destinations.length - 1)));
  };

  const dest = destinations[activeIndex] ?? destinations[0];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <main className="pt-24">
        <section className="pb-16">

          {/* Header */}
          <div className="px-6 md:px-12 mb-8">
            <p className="text-xl font-semibold tracking-widest text-gray-400 uppercase mb-3">
              Destinations
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-3 leading-tight">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-green-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Destination
              </span>
            </h1>
            <p className="text-gray-500 md:text-base max-w-5xl">
              Explore detailed information about the world's top study destinations, from universities to visa requirements
            </p>
          </div>

          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="overflow-x-auto select-none"
            style={{
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              cursor: "grab",
              paddingLeft: `calc((100vw - ${CARD_WIDTH}px) / 2)`,
              paddingRight: `calc((100vw - ${CARD_WIDTH}px) / 2)`,
            } as React.CSSProperties}
          >
            <div
              className="flex"
              style={{ gap: CARD_GAP, width: "max-content", padding: "4px 0 16px" }}
            >
              {destinations.map((d, i) => {
                const dist = Math.abs(scrollProgress - i);
                const isFocused = dist < 0.5;
                const opacity = isFocused ? 1 : Math.max(0.4, 1 - dist * 0.6);
                const scale = isFocused ? 1 : Math.max(0.9, 1 - dist * 0.05);
                const blur = isFocused ? 0 : Math.min(3, dist * 1.5);

                return (
                  <div
                    key={d.id}
                    onClick={() => { if (!didDrag.current) snapTo(i); }}
                    style={{
                      flexShrink: 0,
                      width: CARD_WIDTH,
                      height: CARD_WIDTH,
                      scrollSnapAlign: "center",
                      opacity,
                      transform: `scale(${scale})`,
                      filter: `blur(${blur}px) brightness(${isFocused ? 1 : 0.8})`,
                      transition: "opacity 0.25s ease, transform 0.25s ease, filter 0.25s ease",
                      cursor: isFocused ? "grab" : "pointer",
                    }}
                  >
                    <div
                      className="relative overflow-hidden h-full"
                      style={{
                        borderRadius: 18,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700">
                        <img src={d.image} alt={d.name} draggable={false} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="relative h-full flex flex-col justify-end p-5 text-white">
                        <div className="flex items-center gap-1 mb-1 opacity-80">
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium tracking-wide">{d.location}</span>
                        </div>
                        <h3 className="text-5xl font-bold mb-1 leading-tight">{d.name}</h3>
                        <p className="text-white/75 mb-3 line-clamp-2 leading-relaxed">{d.shortDesc}</p>
                        <Link
                          href={`/destinations/${d.slug}`}
                          className="inline-flex items-center gap-1.5 text-xl font-semibold text-white"
                          style={{ pointerEvents: isFocused ? "auto" : "none" }}
                        >
                          Explore
                          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Country detail */}
          <div className="px-6 md:px-12 mt-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-5xl font-bold text-gray-900">{dest.name}</h2>
              <span className="text-xl font-semibold text-gray-400 tracking-widest uppercase bg-gray-100 px-2 py-1 rounded-full">
                {dest.code}
              </span>
            </div>
            <p className="text-gray-500 text-2xl leading-relaxed mb-4">{dest.description}</p>
            <Link
              href={`/destinations/${dest.slug}`}
              className="inline-flex items-center gap-2 text-xl font-semibold text-blue-600 hover:gap-3 transition-all"
            >
              Explore {dest.name}
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Flag strip */}
          <div className="px-6 md:px-12 mt-8 flex flex-col items-center">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {destinations.map((d, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                  key={d.id}
                  onClick={() => snapTo(i)}
                  className="flex flex-col items-center gap-1 transition-all duration-200"
                    style={{ opacity: isActive ? 1 : 0.4 }}
                    >
                    <span
                      className="text-2xl block"
                      style={{ transform: isActive ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s" }}
                      >
                      {d.flag}
                    </span>
                    <span
                      className="text-xs font-semibold tracking-widest"
                      style={{ color: isActive ? "#1d4ed8" : "#9ca3af", transition: "color 0.2s" }}
                      >
                      {d.code}
                    </span>
                    {isActive && <div className="w-4 h-0.5 rounded-full bg-blue-600" />}
                  </button>
                );
              })}
              <span className="ml-auto text-xs text-gray-400 font-medium">
                {String(activeIndex + 1).padStart(2, "0")} / {String(destinations.length).padStart(2, "0")}
              </span>
            </div>
          </div>

        </section>
      </main>

      <style jsx global>{`
        *::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
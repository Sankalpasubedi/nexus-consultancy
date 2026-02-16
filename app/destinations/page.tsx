"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const destinations = [
  {
    id: 1,
    name: "United States",
    slug: "australia",
    description: "Pursue excellence at the world's leading universities",
    image: "/images/australia.jpg",
    flag: "🇺🇸",
    location: "USA",
  },
  {
    id: 2,
    name: "Australia",
    slug: "australia",
    description: "Experience world-class education in the land down under",
    image: "/images/australia.jpg",
    flag: "🇦🇺",
    location: "Australia",
  },
  {
    id: 3,
    name: "New Zealand",
    slug: "australia",
    description: "Experience innovative education in stunning natural beauty",
    image: "/images/australia.jpg",
    flag: "🇳🇿",
    location: "New Zealand",
  },
  {
    id: 4,
    name: "Canada",
    slug: "australia",
    description: "Study in a welcoming country with excellent universities",
    image: "/images/australia.jpg",
    flag: "🇨🇦",
    location: "Canada",
  },
  {
    id: 5,
    name: "United Kingdom",
    slug: "australia",
    description: "Historic universities with cutting-edge research",
    image: "/images/australia.jpg",
    flag: "🇬🇧",
    location: "United Kingdom",
  },
  {
    id: 6,
    name: "Germany",
    slug: "australia",
    description: "World-class engineering and technical education",
    image: "/images/australia.jpg",
    flag: "🇩🇪",
    location: "Germany",
  },
  {
    id: 7,
    name: "Singapore",
    slug: "australia",
    description: "Gateway to Asia's best educational opportunities",
    image: "/images/australia.jpg",
    flag: "🇸🇬",
    location: "Singapore",
  },
  {
    id: 8,
    name: "Switzerland",
    slug: "australia",
    description: "Excellence in business and hospitality education",
    image: "/images/australia.jpg",
    flag: "🇨🇭",
    location: "Switzerland",
  },
  {
    id: 9,
    name: "Netherlands",
    slug: "australia",
    description: "Innovative education in a vibrant international community",
    image: "/images/australia.jpg",
    flag: "🇳🇱",
    location: "Netherlands",
  },
];

// Text array that will collapse into blobs
const headerTexts = [
  {
    id: 1,
    text: "9 Top Study Destinations",
    type: "badge"
  },
  {
    id: 2,
    text: "Choose Your Destination",
    type: "heading"
  },
  {
    id: 3,
    text: "Explore detailed information about the world's top study destinations, from universities to visa requirements",
    type: "description"
  },
  {
    id: 4,
    text: "Explore detailed information about the world's top study destinations, from universities to visa requirements",
    type: "description"
  },
  {
    id: 5,
    text: "Explore detailed information about the world's top study destinations, from universities to visa requirements",
    type: "description"
  },
  {
    id: 6,
    text: "Explore detailed information about the world's top study destinations, from universities to visa requirements",
    type: "description"
  },
  {
    id: 7,
    text: "Explore detailed information about the world's top study destinations, from universities to visa requirements",
    type: "description"
  },
  {
    id: 8,
    text: "Explore detailed information about the world's top study destinations, from universities to visa requirements",
    type: "description"
  },
  {
    id: 9,
    text: "Explore detailed information about the world's top study destinations, from universities to visa requirements",
    type: "description"
  },
  {
    id: 10,
    text: "Explore detailed information about the world's top study destinations, from universities to visa requirements",
    type: "description"
  },
];

export default function Destinations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [isStacked, setIsStacked] = useState(false);
  const lastScrollRatio = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    updateDragProgress();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    updateDragProgress();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateDragProgress = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    const ratio = maxScroll > 0 ? currentScroll / maxScroll : 0;

    lastScrollRatio.current = ratio;

    const progress = Math.min(ratio * 2, 1);
    setDragProgress(progress);
  };


  const handleScroll = () => {
    updateDragProgress();
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;

    container.scrollLeft = maxScroll * lastScrollRatio.current;
  }, [isStacked]);

  useEffect(() => {
    if (dragProgress > 0.05 && !isStacked) {
      setIsStacked(true);
    }

    if (dragProgress <= 0.01 && isStacked) {
      setIsStacked(false);
    }
  }, [dragProgress, isStacked]);

  // Calculate individual text collapse progress
  const getTextProgress = (index: number) => {
    const maxIndex = headerTexts.length - 3;
    const scrollIndex = dragProgress * maxIndex;
    const baseIndex = Math.floor(scrollIndex);
    const localProgress = scrollIndex - baseIndex;

    if (index < baseIndex) return 1;
    if (index === baseIndex) return localProgress;
    if (index === baseIndex + 1) return 0;
    if (index === baseIndex + 2) return 0;
    if (index === baseIndex + 3 && localProgress > 0.5) {
      return 0;
    }
    return index > baseIndex + 2 ? 0 : 1;
  };

  // Render text content based on type
  const renderTextContent = (item: typeof headerTexts[0], progress: number, index: number, isFirstVisible: boolean, isSecondVisible: boolean, isThirdVisible: boolean) => {
    if (item.type === "badge") {
      return (
        <div
          className="transition-all duration-700 ease-in-out"
          style={{
            opacity: 1 - progress,
            transform: `scale(${1 - progress * 0.2})`,
          }}
        >
          <div className="px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 w-fit flex justify-center items-center gap-3 transition-all duration-700 ease-in-out">
            <span className="w-2 h-2 bg-[#00C950] rounded-full"></span>
            <p
              className="text-gray-600 transition-all duration-700 ease-in-out"
              style={{
                fontSize: isFirstVisible ? "14px" : "16px",
              }}
            >
              {item.text}
            </p>
          </div>
        </div>
      );
    }

    if (item.type === "heading") {
      const parts = item.text.split("Destination");
      return (
        <div
          className="transition-all duration-700 ease-in-out overflow-hidden"
          style={{
            maxHeight: progress > 0.5 ? "0px" : "200px",
            opacity: 1 - progress,
            transform: `translateY(${progress * -20}px)`,
          }}
        >
          <h1
            className="font-semibold text-gray-900 mb-4 transition-all duration-700 ease-in-out"
            style={{
              fontSize: isFirstVisible ? "24px" : "56px",
            }}
          >
            {parts[0]}
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Destination
            </span>
            {parts[1]}
          </h1>
        </div>
      );
    }

    // Description type - third visible description goes next to carousel
    if (isThirdVisible) {
      return null; // We'll render this separately in the flex container
    }

    return (
      <div
        className="transition-all duration-700 ease-in-out overflow-hidden"
        style={{
          maxHeight: progress > 0.5 ? "0px" : "100px",
          opacity: 1 - progress,
          transform: `translateY(${progress * -10}px)`,
        }}
      >
        <p
          className="text-gray-600 mt-4 transition-all duration-700"
          style={{
            fontSize: isFirstVisible ? "16px" : "18px",
          }}
        >
          {item.text}
        </p>
      </div>
    );
  };

  // Get current visible indices
  const maxIndex = headerTexts.length - 3;
  const scrollIndex = dragProgress * maxIndex;
  const baseIndex = Math.floor(scrollIndex);
  const thirdVisibleIndex = baseIndex + 2;
  const thirdVisibleItem = headerTexts[thirdVisibleIndex];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <main className="pt-24">
        {/* Main Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto">
          {/* Background glow elements */}
          <div className="absolute w-[372.61px] h-[443.31px] left-[90px] top-[38px] opacity-30 blur-64 rounded-[3.30382e+07px]">
            <div className="absolute top-8 right-6 w-100 h-100 bg-[#155DFC] blur-3xl rounded-full opacity-30 transform rotate-15"></div>
            <div className="absolute bottom-4 right-2 w-24 h-28 bg-[#155DFC] blur-3xl rounded-full transform -rotate-30"></div>
            <div className="absolute top-16 right-8 w-20 h-16 bg-[#155DFC] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
          </div>
            {/* Header - Transforms to blobs */}
            <div className="relative min-h-[200px]">
              {/* Blob Container - Fixed position for all blobs */}
              <div className="absolute top-0 left-0 flex gap-3 items-start">
                {headerTexts.map((item, index) => {
                  const progress = getTextProgress(index);
                  const isCollapsed = progress > 0.5;
                  
                  return (
                    <div
                      key={`blob-${item.id}`}
                      className="transition-all duration-500 ease-out"
                      style={{
                        opacity: progress,
                        transform: `scale(${0.5 + progress * 0.5})`,
                        pointerEvents: !isCollapsed ? 'none' : 'auto',
                      }}
                    >
                      <div className="px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 whitespace-nowrap">
                        <p className="text-xs font-medium text-gray-700"></p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Original Text Content (first two items) */}
              <div className="space-y-6">
                {headerTexts.map((item, index) => {
                  const progress = getTextProgress(index);
                  const isVisible =
                    index === baseIndex ||
                    index === baseIndex + 1 ||
                    index === baseIndex + 2;

                  const isFirstVisible = index === baseIndex;
                  const isSecondVisible = index === baseIndex + 1;
                  const isThirdVisible = index === baseIndex + 2;

                  if (!isVisible || isThirdVisible) return null; // Skip third item here

                  return (
                    <div key={item.id} className="relative">
                      {renderTextContent(item, progress, index, isFirstVisible, isSecondVisible, isThirdVisible)}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Third Text + Carousel Row */}
            <div
              className="flex items-start transition-all duration-700"
              style={{
                flexDirection: isStacked ? 'column' : 'row',
                gap: dragProgress > 0 ? '1.25rem' : '5.75rem', // gap-5 (1.25rem) when scrolling, gap-23 when not
              }}>
              {/* Third visible text */}
              {thirdVisibleItem && (
                <div
                  className="transition-all duration-700 ease-in-out" 
                  style={{
                    width: isStacked
                      ? '100%'
                      : `${365 - dragProgress * 200}px`,
                    flexShrink: 0,
                    opacity: 1 - getTextProgress(thirdVisibleIndex),
                  }}
                >
                  <p
                    className="text-gray-600 leading-relaxed transition-all duration-700"
                    style={{
                      fontSize: `${16 - dragProgress * 9}px`,
                    }}
                  >
                    {thirdVisibleItem.text}
                  </p>
                </div>
              )}

              {/* Draggable Carousel */}
              <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`overflow-x-auto pb-6 scrollbar-hide transition-all duration-700 ${
                  isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
                }`}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  flex: 1,
                }}
              >
                <div className="flex gap-6 w-max">
                  {destinations.map((dest, index) => (
                    <div
                      key={dest.id}
                      className="flex-shrink-0 group"
                      style={{
                        width: '320px',
                      }}
                    >
                      <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 transform">
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600">
                          {/* Replace with actual image */}
                          <img 
                            src={dest.image} 
                            alt={dest.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-end p-6 text-white pointer-events-none">
                          {/* Bottom Content */}
                          <div>
                          {/* Location Badge */}
                            <div className="flex items-center gap-2 text-sm">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="font-medium">{dest.location}</span>
                            </div>

                            <h3 className="text-3xl font-bold mb-2">{dest.name}</h3>
                            <p className="text-sm text-white/90 mb-4 line-clamp-2">
                              {dest.description}
                            </p>
                            <Link
                              href={`/destinations/${dest.slug}`}
                              className="flex items-center gap-2 text-sm font-semibold pointer-events-auto group-hover:gap-3 transition-all"
                            >
                              Explore
                              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
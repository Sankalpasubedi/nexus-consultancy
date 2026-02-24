"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { Icon } from "@/lib/icons";

const courses = [
  {
    title: "Information Technology",
    icon: "Monitor",
    students: "3,200+",
    image: "/courses/it.png",
    slug: "information-technology",
    color: "from-[#003975] to-[#00ab18]",
    description: "Computer Science, AI, Cloud Computing, Cybersecurity",
  },
  {
    title: "Business & Management",
    icon: "BarChart3",
    students: "2,800+",
    image: "/courses/business.png",
    slug: "business-management",
    color: "from-[#003975] to-[#00ab18]",
    description: "MBA, Finance, Marketing, International Business",
  },
  {
    title: "Engineering",
    icon: "Settings",
    students: "2,100+",
    image: "/courses/engineering.png",
    slug: "engineering",
    color: "from-[#003975] to-[#00ab18]",
    description: "Mechanical, Civil, Electrical, Aerospace Engineering",
  },
  {
    title: "Health Sciences",
    icon: "Heart",
    students: "1,500+",
    image: "/courses/health.png",
    slug: "health-sciences",
    color: "from-[#003975] to-[#00ab18]",
    description: "Nursing, Public Health, Biomedical Sciences",
  },
  {
    title: "Arts & Design",
    icon: "Palette",
    students: "900+",
    image: "/courses/art design.png",
    slug: "arts-and-design",
    color: "from-[#003975] to-[#00ab18]",
    description: "Graphic Design, Fine Arts, Media & Communication",
  },
  {
    title: "Law & Legal Studies",
    icon: "Scale",
    students: "700+",
    image: "/courses/legal.png",
    slug: "law-and-legal-studies",
    color: "from-[#003975] to-[#00ab18]",
    description: "International Law, Corporate Law, Human Rights",
  },
];

export default function PopularCoursesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const updateState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const max = scrollWidth - clientWidth;
    setProgress(max > 0 ? (scrollLeft / max) * 100 : 0);
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < max - 5);
  }, []);

  const handleScrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
  };

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 3) hasDragged.current = true;
      scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      if (scrollRef.current) {
        scrollRef.current.style.cursor = "";
        scrollRef.current.style.userSelect = "";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    updateState();
    scrollEl.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      scrollEl.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  return (
    <section className="py-32 bg-white">
      {/* Header */}
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 max-w-[1440px] mx-auto px-6 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
              <Icon name="BookOpen" size={16} />
              Explore Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              Find the perfect program to match your career aspirations
            </p>
          </div>
        </div>
      </FadeUp>

      {/* Native scroll container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => scrollRef.current?.focus({ preventScroll: true })}
        className="flex gap-6 px-6 overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing select-none outline-none focus:outline-none focus:ring-0"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          touchAction: "pan-x pinch-zoom",
        }}
      >
          {courses.map((course, idx) => (
            <motion.div
              key={course.slug}
              className="flex-shrink-0 w-[340px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              style={{ scrollSnapAlign: "start" }}
            >
              <Link
                href={`/courses/${course.slug}`}
                draggable={false}
                onClick={handleCardClick}
              >
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden premium-card group h-full">
                  {/* Image Area */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      <Icon
                        name="Users"
                        size={14}
                        className="text-white"
                      />
                      <span className="text-white text-xs font-medium">
                        {course.students} students
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div
                      className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <Icon
                        name={course.icon}
                        size={22}
                        className="text-white"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {course.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#003975] group-hover:gap-3 transition-all">
                      Explore
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
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      {/* Progress Bar */}
      <div className="max-w-[1440px] mx-auto px-6 mt-10">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#003975] to-[#00ab18] rounded-full"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
      </div>

      {/* CTA */}
      <FadeUp delay={0.3}>
        <div className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-[#003975] text-white px-8 py-4 rounded-full font-medium hover:bg-[#002d5e] transition-colors shadow-lg shadow-blue-500/20"
            >
              Browse All Courses
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </FadeUp>
    </section>
  );
}

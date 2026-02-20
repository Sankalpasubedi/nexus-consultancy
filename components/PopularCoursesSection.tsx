"use client";

import { useState, useRef, useEffect } from "react";
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
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const update = () => {
      if (containerRef.current && contentRef.current) {
        setMaxScroll(
          Math.max(
            0,
            contentRef.current.scrollWidth - containerRef.current.offsetWidth
          )
        );
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = scrollPos;
    hasDragged.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const dx = dragStartX.current - e.clientX;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    setScrollPos(
      Math.max(0, Math.min(maxScroll, dragStartScroll.current + dx))
    );
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="py-32 bg-white">
      {/* Header */}
      <FadeUp>
        <div className="text-center mb-16 max-w-[1440px] mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gray-100 text-slate-600 text-sm font-medium">
            <Icon name="BookOpen" size={16} />
            Explore Programs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Popular Courses
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Find the perfect program to match your career aspirations
          </p>
        </div>
      </FadeUp>

      {/* Horizontal Scroll Carousel */}
      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          ref={contentRef}
          className="flex gap-6 px-6"
          style={{
            transform: `translateX(-${scrollPos}px)`,
            transition: isDragging.current
              ? "none"
              : "transform 500ms ease-out",
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
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
                      className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
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
        </motion.div>
      </div>

      {/* Nav Arrows */}
      <div className="flex justify-end gap-3 mt-8 px-6 md:px-12 lg:px-16">
        <button
          onClick={() => setScrollPos((p) => Math.max(0, p - 360))}
          disabled={scrollPos === 0}
          className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5 text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => setScrollPos((p) => Math.min(maxScroll, p + 360))}
          disabled={scrollPos >= maxScroll}
          className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5 text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
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

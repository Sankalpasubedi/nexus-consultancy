"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { courseCategories } from "@/data/courses";

// Map courseCategories to include descriptions for the bento grid
const courses = courseCategories.map((cat) => ({
  title: cat.title,
  description: cat.description,
  image: cat.image,
  slug: cat.slug,
}));

export default function PopularCoursesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Smooth cursor tracking with requestAnimationFrame
  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Instant follow - no lerp for maximum smoothness
      cursorX = mouseX;
      cursorY = mouseY;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      animationId = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="py-20 md:py-36 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-10 md:mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Popular Courses
              </h2>
              <p className="text-base md:text-lg text-slate-500 max-w-xl">
                Find the perfect program to match your career aspirations and unlock your potential abroad
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-full text-slate-900 text-sm font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 self-start"
            >
              View all courses
              <svg 
                className="w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M7 17L17 7M17 7H7M17 7V17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </FadeUp>

        {/* Grid Layout with Custom Cursor */}
        <div
          ref={containerRef}
          className="relative [&_*]:cursor-none"
          style={{ cursor: "none" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Custom Cursor - View Button */}
          <div
            ref={cursorRef}
            className={`pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 ${
              isHovering ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
            style={{
              willChange: "left, top",
              transition: isHovering ? "opacity 0.2s, transform 0.2s" : "opacity 0.15s, transform 0.15s",
            }}
          >
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-slate-900 text-sm font-medium shadow-xl border border-gray-100">
              View
              <svg 
                className="w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M7 17L17 7M17 7H7M17 7V17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Large Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:row-span-2"
            >
              <Link href={`/courses/${courses[0].slug}`} className="block group h-full">
                <div className="h-full rounded-2xl overflow-hidden bg-white shadow-sm relative">
                  <div className="relative h-full min-h-[380px] md:min-h-[500px] overflow-hidden">
                    <Image
                      src={courses[0].image}
                      alt={courses[0].title}
                      fill
                      className="object-cover group-hover:scale-[1.15] transition-transform duration-700 ease-out"
                    />
                  </div>
                  {/* Title - slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="p-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-xs">
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {courses[0].title}
                      </h3>
                      <p className="text-white text-xs mt-1">
                        {courses[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Large Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Link href={`/courses/${courses[1].slug}`} className="block group">
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm relative">
                  <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                    <Image
                      src={courses[1].image}
                      alt={courses[1].title}
                      fill
                      className="object-cover group-hover:scale-[1.15] transition-transform duration-700 ease-out"
                    />
                  </div>
                  {/* Title - slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="p-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-xs">
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {courses[1].title}
                      </h3>
                      <p className="text-white text-xs mt-1">
                        {courses[1].description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Small Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-5"
            >
              {courses.slice(2).map((course, idx) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="block group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * idx }}
                    className="rounded-2xl overflow-hidden bg-white shadow-sm relative"
                  >
                    <div className="relative h-[160px] md:h-[180px] overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-[1.5] transition-transform duration-700 ease-out"
                      />
                    </div>
                    {/* Title - slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-xs">
                        <h3 className="text-sm md:text-base font-medium text-white">
                          {course.title}
                        </h3>
                        <p className="text-white text-xs mt-0.5 leading-snug">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

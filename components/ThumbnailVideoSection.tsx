"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ThumbnailVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-driven zoom animation ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Scale from small centered to full width
  const rawScale = useTransform(scrollYProgress, [0, 0.4], [0.65, 1]);
  const rawBorderRadius = useTransform(scrollYProgress, [0, 0.4], [32, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2], [0.85, 1]);

  const smoothScale = useSpring(rawScale, { stiffness: 80, damping: 30, mass: 0.8 });
  const smoothBorderRadius = useSpring(rawBorderRadius, { stiffness: 80, damping: 30, mass: 0.8 });
  const smoothOpacity = useSpring(rawOpacity, { stiffness: 80, damping: 30, mass: 0.8 });

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#f5f5f3] pt-10"
      style={{ height: "180vh" }}
    >
      {/* Sticky video container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          ref={videoContainerRef}
          style={{
            scale: smoothScale,
            borderRadius: smoothBorderRadius,
            opacity: smoothOpacity,
            transformOrigin: "center center",
          }}
          className="relative w-full h-full will-change-transform overflow-hidden flex items-center justify-center"
        >
          {/* Video element */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full max-w-475 object-cover rounded-xl"
          >
            <source src="/videos/thumbnail video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Subtle gradient overlay at bottom for smooth transition */}
          <div 
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(245, 245, 243, 0.3), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

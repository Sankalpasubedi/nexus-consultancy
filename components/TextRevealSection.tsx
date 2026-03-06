"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const text = `We're a dedicated team of study abroad experts, passionate about helping students achieve their dreams of international education. From finding the perfect university and course to visa guidance and pre-departure support, we're here to turn your study abroad vision into reality.`;

export default function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Start when element enters viewport, complete near center
      const start = windowHeight * 0.9;
      const end = windowHeight * 0.1 - elementHeight * 0.5;
      
      const newProgress = (start - elementTop) / (start - end);
      targetProgress.current = Math.max(0, Math.min(1, newProgress));
    };

    // Smooth lerp animation
    const animate = () => {
      const diff = targetProgress.current - currentProgress.current;
      // Smooth easing - adjust 0.08 for speed (lower = smoother but slower)
      currentProgress.current += diff * 0.08;
      
      // Only update state if there's meaningful change
      if (Math.abs(diff) > 0.0001) {
        setProgress(currentProgress.current);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-gray-50"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <p className="text-3xl md:text-4xl lg:text-4xl xl:text-[3rem] font-semibold leading-[1.3] md:leading-[1.35] tracking-tight">
          {words.map((word, index) => {
            const wordProgress = index / words.length;
            // Spread reveal over more of the scroll for smoother effect
            const revealPoint = wordProgress * 0.7;
            
            // Smoother interpolation with easing
            const revealAmount = Math.max(0, Math.min(1, (progress - revealPoint) * 5));
            // Apply ease-out curve for smoother feel
            const easedAmount = 1 - Math.pow(1 - revealAmount, 3);
            
            return (
              <span
                key={index}
                className="inline-block mr-[0.3em]"
                style={{
                  color: `rgba(15, 23, 42, ${0.15 + easedAmount * 0.85})`,
                  transition: "color 0.05s linear",
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useEffect, useState, useCallback, type ReactNode } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
  type Variants,
} from "framer-motion";

/* ===== REVEAL ANIMATIONS ===== */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
};

export function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeLeft({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeRight({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ClipReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once, amount: 0.1 }}
      transition={{ duration: 1, delay, ease: [0.77, 0, 0.175, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===== STAGGER ===== */

const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerChildVariants} className={className}>
      {children}
    </motion.div>
  );
}

/* ===== PARALLAX ===== */

export function Parallax({
  children,
  className = "",
  speed = 0.3,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range =
    direction === "up"
      ? [100 * speed, -100 * speed]
      : [-100 * speed, 100 * speed];
  const y = useTransform(scrollYProgress, [0, 1], range);
  const smoothY = useSpring(y, { stiffness: 80, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

/* ===== MAGNETIC BUTTON ===== */

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===== ANIMATED COUNTER ===== */

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent =
              prefix + Math.round(latest).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix, prefix, count, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ===== SCROLL PROGRESS BAR ===== */

export function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={`fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left ${className}`}
      style={{
        scaleX,
        background: "linear-gradient(to right, #003975, #00ab18)",
      }}
    />
  );
}

/* ===== TEXT REVEAL ===== */

export function TextReveal({
  text,
  className = "",
  delay = 0,
  type = "word",
}: {
  text: string;
  className?: string;
  delay?: number;
  type?: "word" | "char";
}) {
  const parts = type === "word" ? text.split(" ") : text.split("");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {parts.map((part, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                delay: delay + i * (type === "word" ? 0.08 : 0.03),
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="inline-block"
        >
          {part}
          {type === "word" && i < parts.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ===== DRAG CAROUSEL ===== */

export function DragCarousel({
  children,
  className = "",
  showProgress = true,
  showButtons = true,
}: {
  children: ReactNode;
  className?: string;
  showProgress?: boolean;
  showButtons?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
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
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

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

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
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
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClick}
        onMouseEnter={() => scrollRef.current?.focus({ preventScroll: true })}
        className="flex overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing outline-none focus:outline-none focus:ring-0"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          touchAction: "pan-x pinch-zoom",
        }}
      >
        {children}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#004a8f] to-[#00ab18] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

/* ===== FLOAT ===== */

export function Float({
  children,
  className = "",
  duration = 6,
  distance = 15,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      animate={{ y: [-distance / 2, distance / 2, -distance / 2] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===== ANIMATED BLOB ===== */

export function AnimatedBlob({
  className = "",
  color = "blue",
}: {
  className?: string;
  color?: "blue" | "green" | "purple";
}) {
  const colors = {
    blue: "from-blue-200/30 to-blue-400/20",
    green: "from-emerald-200/30 to-green-400/20",
    purple: "from-purple-200/30 to-violet-400/20",
  };
  return (
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        x: [0, 30, -20, 0],
        y: [0, -25, 15, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none rounded-full bg-gradient-to-br blur-[100px] ${colors[color]} ${className}`}
    />
  );
}

/* ===== HOVER CARD ===== */

export function HoverCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    rotateX.set(-percentY * 8);
    rotateY.set(percentX * 8);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===== TRACKPAD CAROUSEL ===== */

export function TrackpadCarousel({
  children,
  className = "",
  itemClassName = "",
  showDots = false,
  showProgress = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  showDots?: boolean;
  showProgress?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [progress, setProgress] = useState(0);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Progress
    const max = scrollWidth - clientWidth;
    setProgress(max > 0 ? (scrollLeft / max) * 100 : 0);
    
    // Calculate active index based on scroll position
    const children = scrollRef.current.children;
    if (children.length > 0) {
      const firstChild = children[0] as HTMLElement;
      const itemWidth = firstChild.offsetWidth + 16; // gap
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(index, children.length - 1));
      setTotalItems(children.length);
    }
  }, []);

  const handleScrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

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

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
    }
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    
    checkScroll();
    updateScrollState();
    scrollEl.addEventListener("scroll", checkScroll, { passive: true });
    scrollEl.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", checkScroll);
    window.addEventListener("resize", updateScrollState);
    
    return () => {
      scrollEl.removeEventListener("scroll", checkScroll);
      scrollEl.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", checkScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [checkScroll, updateScrollState]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const children = scrollRef.current.children;
    if (children[index]) {
      const child = children[index] as HTMLElement;
      scrollRef.current.scrollTo({
        left: child.offsetLeft - 24,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClick}
        onMouseEnter={() => scrollRef.current?.focus({ preventScroll: true })}
        className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide px-12 py-2 cursor-grab active:cursor-grabbing outline-none focus:outline-none focus:ring-0"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          touchAction: "pan-x pinch-zoom",
        }}
      >
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            className={`flex-shrink-0 ${itemClassName}`}
            style={{ scrollSnapAlign: "start" }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mt-4 mx-12 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#004a8f] to-[#00ab18] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Dots */}
      {showDots && totalItems > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalItems }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-[#004a8f]"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== ANIMATED CAROUSEL CARD ===== */

export function CarouselCard({
  children,
  className = "",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===== SCROLL ZOOM (webmonal-style expand on scroll) ===== */

export function ScrollZoom({
  children,
  className = "",
  startScale = 0.85,
  endScale = 1,
  startRadius = 32,
  endRadius = 0,
  startOpacity = 0.7,
  endOpacity = 1,
}: {
  children: ReactNode;
  className?: string;
  startScale?: number;
  endScale?: number;
  startRadius?: number;
  endRadius?: number;
  startOpacity?: number;
  endOpacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.35, 0.65], [startScale, endScale, endScale]);
  const rawRadius = useTransform(scrollYProgress, [0, 0.35, 0.65], [startRadius, endRadius, endRadius]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.25, 0.65], [startOpacity, endOpacity, endOpacity]);

  const scale = useSpring(rawScale, { stiffness: 100, damping: 30, mass: 0.5 });
  const borderRadius = useSpring(rawRadius, { stiffness: 100, damping: 30, mass: 0.5 });
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30, mass: 0.5 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          scale,
          borderRadius,
          opacity,
          transformOrigin: "center center",
          overflow: "hidden",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ===== SMOOTH SECTION REVEAL (cinematic scroll entrance) ===== */

export function SectionReveal({
  children,
  className = "",
  direction = "up",
  distance = 100,
  blur = 0,
  duration = 1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  blur?: number;
  duration?: number;
  delay?: number;
}) {
  const dirMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...dirMap[direction],
        filter: blur > 0 ? `blur(${blur}px)` : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===== SCROLL PARALLAX SCALE (subtle zoom on scroll) ===== */

export function ScrollParallaxScale({
  children,
  className = "",
  startScale = 0.95,
  endScale = 1.05,
}: {
  children: ReactNode;
  className?: string;
  startScale?: number;
  endScale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [startScale, endScale]);
  const scale = useSpring(rawScale, { stiffness: 80, damping: 30 });

  return (
    <motion.div ref={ref} style={{ scale }} className={className}>
      {children}
    </motion.div>
  );
}

/* ===== HORIZONTAL SCROLL TEXT (marquee-style) ===== */

export function MarqueeText({
  text,
  className = "",
  speed = 30,
  direction = "left",
}: {
  text: string;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="inline-flex gap-8"
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}


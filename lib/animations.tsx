"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
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
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [dragConstraints, setDragConstraints] = useState({
    left: 0,
    right: 0,
  });

  useEffect(() => {
    if (!containerRef.current || !dragRef.current) return;
    const updateConstraints = () => {
      const containerW = containerRef.current!.offsetWidth;
      const scrollW = dragRef.current!.scrollWidth;
      setDragConstraints({ left: -(scrollW - containerW), right: 0 });
    };
    updateConstraints();
    const ro = new ResizeObserver(updateConstraints);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        ref={dragRef}
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        style={{ x }}
        className="flex cursor-grab active:cursor-grabbing"
      >
        {children}
      </motion.div>
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

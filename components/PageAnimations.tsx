"use client";

import { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* ===== Smooth scroll progress indicator ===== */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(to right, #003975, #00ab18)",
      }}
    />
  );
}

/* ===== Page wrapper with cinematic animations ===== */
export default function PageAnimations({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </>
  );
}

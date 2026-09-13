import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background:
          "linear-gradient(to right, #f32170, #ff6b08, #cf23cf, #eedd44)",
        zIndex: 100,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}

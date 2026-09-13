import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GradientBackdrop() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -60]);

  return (
    <motion.div className="wrapper" style={{ y }}>
      <div className="gradient gradient-1"></div>
      <div className="gradient gradient-2"></div>
      <div className="gradient gradient-3"></div>
    </motion.div>
  );
}

import React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

export default function GradientBackdrop() {
  const { scrollY } = useScroll();

  // Dramatic parallax — orbs "rise" 200px over the first 500px of scroll.
  // Reads as a moon rising past the pinned hero.
  const y = useTransform(scrollY, [0, 500], [0, -200]);

  // Brightness ramp — orbs start dim (0.5) and climb to slightly hotter
  // than baseline (1.2) as they rise. Feels like the moon breaking above
  // the horizon.
  const brightness = useTransform(scrollY, [0, 500], [0.5, 1.2]);

  // The wrapper already has `filter: blur(150px)` from CSS. Inline filter
  // overrides that, so we recompose blur + brightness into one string
  // that keeps the atmospheric blur AND animates brightness.
  const filter = useMotionTemplate`blur(150px) brightness(${brightness})`;

  return (
    <motion.div className="wrapper" style={{ y, filter }}>
      <div className="gradient gradient-1"></div>
      <div className="gradient gradient-2"></div>
      <div className="gradient gradient-3"></div>
    </motion.div>
  );
}

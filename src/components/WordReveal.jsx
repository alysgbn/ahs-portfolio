import React from "react";
import { motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1];

const wordVariants = (i, delayBase, delayOffset) => ({
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      delay: delayOffset + i * delayBase,
      ease,
    },
  },
});

export default function WordReveal({
  children,
  as = "h2",
  className,
  delayBase = 0.06,
  delayOffset = 0,
  amount = 0.5,
}) {
  const words = String(children).split(" ");
  const MotionElement = motion[as] || motion.h2;

  return (
    <MotionElement
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants(i, delayBase, delayOffset)}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </MotionElement>
  );
}

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity, display: "inline-block" }}>
      {children}&nbsp;
    </motion.span>
  );
}

export default function ScrubbedText({ children, className, as: Tag = "p" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });

  const words = String(children).split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1 / words.length);
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
          >
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}

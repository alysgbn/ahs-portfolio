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

// Words brighten one by one with scroll. By default it tracks its own
// position; pass `progress` (a 0–1 motion value, e.g. from a pinned
// section) and `span` to run the words across part of that instead.
export default function ScrubbedText({
  children,
  className,
  as: Tag = "p",
  offset = ["start 0.85", "start 0.2"],
  progress,
  span = [0, 1],
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const driver = progress || scrollYProgress;

  const words = String(children).split(" ");
  const step = (span[1] - span[0]) / words.length;

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const start = span[0] + i * step;
        const end = Math.min(span[1], start + step);
        return (
          <Word key={`${word}-${i}`} progress={driver} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import "../assets/css/story-backdrop.scss";

// A thread that runs from About down into the Philosophy, drawing itself
// as you scroll, with a couple of slow glows and faint
// specks so the space between sections never reads as empty.

// Thread shape on a 100 x 1000 grid, scaled to the band's real pixel size
// (a stretched viewBox breaks scroll-drawn dash math in Chrome).
const THREAD = [
  [50, 0],
  [50, 80, 18, 120, 16, 220],
  [14, 330, 30, 380, 50, 440],
  [70, 500, 86, 560, 84, 660],
  [82, 760, 60, 820, 50, 1000],
];

const threadPath = (w, h) =>
  THREAD.map((seg, i) => {
    const pts = [];
    for (let j = 0; j < seg.length; j += 2) {
      pts.push(`${((seg[j] / 100) * w).toFixed(1)} ${((seg[j + 1] / 1000) * h).toFixed(1)}`);
    }
    return `${i ? "C" : "M"}${pts.join(" ")}`;
  }).join(" ");

const SPECKS = [
  [8, 6], [22, 14], [91, 9], [76, 18], [12, 27], [64, 31], [94, 36], [5, 44],
  [33, 49], [88, 53], [18, 61], [71, 66], [96, 72], [9, 78], [42, 83], [83, 88],
  [27, 93], [60, 97],
];

export default function StoryBackdrop({ children }) {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const d = size.w ? threadPath(size.w, size.h) : "";
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 70%"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <div ref={ref} className="story-band">
      <div className="story-backdrop" aria-hidden>
        <span className="story-backdrop__glow story-backdrop__glow--pink" />
        <span className="story-backdrop__glow story-backdrop__glow--amber" />
        <span className="story-backdrop__glow story-backdrop__glow--plum" />

        {SPECKS.map(([x, y], i) => (
          <span
            key={i}
            className="story-backdrop__speck"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 6) * 0.9}s` }}
          />
        ))}

        <svg
          className="story-backdrop__thread"
          viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          fill="none"
        >
          <defs>
            <linearGradient id="story-thread" x1="0" y1="0" x2="0" y2={size.h || 1} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f32170" />
              <stop offset="0.5" stopColor="#ff6b08" />
              <stop offset="1" stopColor="#cf23cf" />
            </linearGradient>
          </defs>
          {/* faint full track so the path is felt before it's drawn */}
          <path
            d={d}
            stroke="currentColor"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
          {/* soft halo + crisp line, both drawn by scroll */}
          <motion.path
            d={d}
            stroke="url(#story-thread)"
            strokeOpacity="0.12"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : draw }}
          />
          <motion.path
            d={d}
            stroke="url(#story-thread)"
            strokeOpacity="0.55"
            strokeWidth="1.25"
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : draw }}
          />
        </svg>
      </div>

      {children}
    </div>
  );
}

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1];

// Bar heights (out of the 150px chart area) and the trend line that rides them.
const bars = [46, 70, 58, 96, 84, 128];
const BAR_W = 22;
const GAP = 14;
const CHART_X = 150;
const BASE_Y = 236;

const barX = (i) => CHART_X + i * (BAR_W + GAP);
const trend = bars
  .map((h, i) => `${i === 0 ? "M" : "L"}${barX(i) + BAR_W / 2} ${BASE_Y - h - 14}`)
  .join(" ");

// Rows streaming out of the warehouse toward the chart.
const particles = [0, 1, 2, 3, 4];

export default function DataDevVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const play = inView || reduce;

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 300"
      fill="none"
      role="img"
      aria-label="Data flowing from a warehouse into a live chart and code"
      style={{ width: "100%", height: "100%", display: "block", color: "inherit" }}
    >
      <defs>
        <linearGradient id="ddv-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff6b08" />
          <stop offset="1" stopColor="#f32170" />
        </linearGradient>
        <linearGradient id="ddv-code" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f32170" />
          <stop offset="1" stopColor="#cf23cf" />
        </linearGradient>
        <radialGradient id="ddv-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff6b08" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff6b08" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* gridlines */}
      {[86, 136, 186, 236].map((y) => (
        <line
          key={y}
          x1="132"
          x2="372"
          y1={y}
          y2={y}
          stroke="currentColor"
          strokeOpacity={y === BASE_Y ? 0.35 : 0.08}
          strokeWidth={y === BASE_Y ? 1.5 : 1}
        />
      ))}

      {/* warehouse */}
      <g stroke="currentColor" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round">
        <ellipse cx="66" cy="116" rx="30" ry="9" />
        <path d="M36 116 V196 C36 202 49 206 66 206 C83 206 96 202 96 196 V116" />
        <path d="M36 143 C36 149 49 152 66 152 C83 152 96 149 96 143" strokeOpacity="0.4" />
        <path d="M36 170 C36 176 49 179 66 179 C83 179 96 176 96 170" strokeOpacity="0.4" />
      </g>

      {/* pipeline */}
      <path
        d="M98 160 C118 160 122 210 146 210"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeDasharray="2 5"
        strokeLinecap="round"
      />
      {!reduce &&
        play &&
        particles.map((i) => (
          <motion.circle
            key={i}
            r="2.6"
            fill="#ff6b08"
            initial={{ cx: 98, cy: 160, opacity: 0 }}
            // Points sampled along the pipeline curve so dots ride it exactly.
            animate={{
              cx: [98, 110.5, 120.5, 131.2, 146],
              cy: [160, 167.8, 185, 202.2, 210],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 1.8,
              delay: 0.6 + i * 0.36,
              repeat: Infinity,
              repeatDelay: 0.2,
              ease: "linear",
            }}
          />
        ))}

      {/* bars */}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={barX(i)}
          width={BAR_W}
          rx="5"
          fill="url(#ddv-bar)"
          fillOpacity={0.45 + (i / bars.length) * 0.55}
          initial={{ y: BASE_Y, height: 0 }}
          animate={play ? { y: BASE_Y - h, height: h } : { y: BASE_Y, height: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.15 + i * 0.08, ease }}
        />
      ))}

      {/* trend line */}
      <motion.path
        d={trend}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={play ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : 0.7, ease }}
      />
      <motion.circle
        cx={barX(bars.length - 1) + BAR_W / 2}
        cy={BASE_Y - bars[bars.length - 1] - 14}
        r="16"
        fill="url(#ddv-glow)"
        initial={{ opacity: 0 }}
        animate={play && !reduce ? { opacity: [0.4, 1, 0.4] } : { opacity: play ? 1 : 0 }}
        transition={{ duration: 2.4, delay: 1.8, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={barX(bars.length - 1) + BAR_W / 2}
        cy={BASE_Y - bars[bars.length - 1] - 14}
        r="4"
        fill="#ff6b08"
        initial={{ scale: 0 }}
        animate={{ scale: play ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 1.7, ease }}
      />

      {/* code chip */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.4, ease }}
      >
        <motion.g
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <rect
            x="36"
            y="44"
            width="64"
            height="40"
            rx="10"
            fill="currentColor"
            fillOpacity="0.05"
            stroke="currentColor"
            strokeOpacity="0.2"
          />
          <g stroke="url(#ddv-code)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M56 56 L48 64 L56 72" />
            <path d="M80 56 L88 64 L80 72" />
            <path d="M71 53 L65 75" />
          </g>
        </motion.g>
      </motion.g>
    </svg>
  );
}

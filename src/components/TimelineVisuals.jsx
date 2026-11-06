import React, { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Animated companions for the experience timeline. Each one draws its ink in
// currentColor so it sits on the page's own foreground, and plays once when
// scrolled into view (or renders its final frame under reduced motion).

const ease = [0.23, 1, 0.32, 1];

function usePlay() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const play = inView || reduce;
  const tr = (duration, delay = 0) =>
    reduce ? { duration: 0 } : { duration, delay, ease };
  const loop = (duration, delay = 0) =>
    reduce
      ? { duration: 0 }
      : { duration, delay, repeat: Infinity, ease: "easeInOut" };
  return { ref, play, reduce, tr, loop };
}

// Shared depth layer: a faint dot grid and a soft glow in the entry's accent.
export function Backdrop({ accent = "#ff6b08" }) {
  const id = useId().replace(/:/g, "");
  return (
    <>
      <defs>
        <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.09" />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor={accent} stopOpacity="0.16" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-dots)`} />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />
    </>
  );
}

function Canvas({ innerRef, label, accent, children }) {
  return (
    <svg
      ref={innerRef}
      viewBox="0 0 400 300"
      fill="none"
      role="img"
      aria-label={label}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Backdrop accent={accent} />
      {children}
    </svg>
  );
}

const label = {
  fontFamily: "Inter, sans-serif",
  fontSize: 11,
  letterSpacing: "0.06em",
};

/* Merck — apps shipped on a global intranet, reaching other markets. */
export function IntranetVisual() {
  const { ref, play, tr, loop } = usePlay();
  const tiles = [
    [56, 92],
    [118, 92],
    [180, 92],
    [56, 152],
    [118, 152],
  ];
  const pins = [
    { x: 330, y: 92, text: "PL", d: "M244 140 Q290 92 330 92" },
    { x: 352, y: 196, text: "JP", d: "M244 140 Q300 196 352 196" },
    { x: 300, y: 250, text: "", d: "M244 140 Q262 230 300 250" },
  ];

  return (
    <Canvas innerRef={ref} accent="#ff6b08" label="Web apps on a global intranet reaching Poland, Japan and other markets">
      <defs>
        <linearGradient id="tv-intra" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6b08" />
          <stop offset="1" stopColor="#f32170" />
        </linearGradient>
      </defs>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: play ? 1 : 0 }} transition={tr(0.5)}>
        <rect x="40" y="52" width="204" height="168" rx="12" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" />
        <line x1="40" y1="76" x2="244" y2="76" stroke="currentColor" strokeOpacity="0.15" />
        {[54, 63, 72].map((cx, i) => (
          <circle key={cx} cx={cx} cy="64" r="2.6" fill="currentColor" fillOpacity={0.5 - i * 0.15} />
        ))}
      </motion.g>

      {tiles.map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x}
          y={y}
          width="50"
          height="50"
          rx="9"
          fill="url(#tv-intra)"
          fillOpacity={0.35 + i * 0.13}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={tr(0.5, 0.3 + i * 0.09)}
        />
      ))}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: play ? 1 : 0 }} transition={tr(0.5, 0.8)}>
        <rect x="180" y="152" width="50" height="50" rx="9" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="3 4" />
        <path d="M205 170 V184 M198 177 H212" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      </motion.g>

      {pins.map((p, i) => (
        <g key={i}>
          <motion.path
            d={p.d}
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            strokeDasharray="2 5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: play ? 1 : 0 }}
            transition={tr(0.9, 0.9 + i * 0.15)}
          />
          <motion.circle
            cx={p.x}
            cy={p.y}
            r="5"
            stroke="#ff6b08"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={play ? { r: [5, 16], opacity: [0.7, 0] } : { opacity: 0 }}
            transition={loop(2.2, 1.6 + i * 0.4)}
          />
          <motion.circle
            cx={p.x}
            cy={p.y}
            r="5"
            fill="#ff6b08"
            initial={{ scale: 0 }}
            animate={{ scale: play ? 1 : 0 }}
            transition={tr(0.4, 1.5 + i * 0.15)}
          />
          {p.text && (
            <motion.text
              x={p.x + 12}
              y={p.y + 4}
              fill="currentColor"
              style={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: play ? 0.7 : 0 }}
              transition={tr(0.4, 1.7 + i * 0.15)}
            >
              {p.text}
            </motion.text>
          )}
        </g>
      ))}
    </Canvas>
  );
}

/* AIQUE challenge — a leaderboard where one bar clears the rest. */
export function LeaderboardVisual() {
  const { ref, play, tr, loop } = usePlay();
  const rows = [250, 204, 186, 168, 150, 128, 108];

  return (
    <Canvas innerRef={ref} accent="#f32170" label="Leaderboard of seven developers with the top score highlighted">
      <defs>
        <linearGradient id="tv-lead" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6b08" />
          <stop offset="1" stopColor="#f32170" />
        </linearGradient>
        <radialGradient id="tv-lead-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f32170" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f32170" stopOpacity="0" />
        </radialGradient>
      </defs>

      {rows.map((w, i) => {
        const y = 52 + i * 30;
        const top = i === 0;
        return (
          <g key={i}>
            <motion.text
              x="52"
              y={y + 11}
              textAnchor="end"
              fill={top ? "#f32170" : "currentColor"}
              style={{ ...label, fontWeight: top ? 600 : 400 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: play ? (top ? 1 : 0.45) : 0 }}
              transition={tr(0.4, 0.1 + i * 0.05)}
            >
              {i + 1}
            </motion.text>
            <motion.rect
              x="66"
              y={y}
              height="14"
              rx="7"
              fill={top ? "url(#tv-lead)" : "currentColor"}
              fillOpacity={top ? 1 : 0.13}
              initial={{ width: 0 }}
              animate={{ width: play ? w : 0 }}
              transition={tr(top ? 1.1 : 0.8, top ? 0.5 : 0.15 + i * 0.07)}
            />
          </g>
        );
      })}

      <motion.circle
        cx={66 + rows[0] + 16}
        cy="59"
        r="18"
        fill="url(#tv-lead-glow)"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: [0.4, 1, 0.4] } : { opacity: 0 }}
        transition={loop(2.4, 1.6)}
      />
      <motion.path
        d={`M${66 + rows[0] + 16} 50 l2.6 5.6 6 .7 -4.5 4.1 1.2 6 -5.3 -3 -5.3 3 1.2 -6 -4.5 -4.1 6 -.7z`}
        fill="#f32170"
        initial={{ scale: 0, rotate: -40 }}
        animate={play ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -40 }}
        transition={tr(0.5, 1.5)}
      />
    </Canvas>
  );
}

/* University project — scan an image, localize the forgery, U-Net beside it. */
export function ForgeryVisual() {
  const { ref, play, reduce, tr, loop } = usePlay();
  const nodes = [
    [240, 80, 7],
    [254, 130, 6],
    [272, 180, 5],
    [300, 216, 4.5],
    [328, 180, 5],
    [346, 130, 6],
    [360, 80, 7],
  ];
  const u = nodes.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

  return (
    <Canvas innerRef={ref} accent="#ff6b08" label="An image being scanned with a forged region localized, next to a U-Net diagram">
      <defs>
        <linearGradient id="tv-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6b08" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ff6b08" />
          <stop offset="1" stopColor="#ff6b08" stopOpacity="0" />
        </linearGradient>
        <clipPath id="tv-img">
          <rect x="36" y="58" width="168" height="168" rx="10" />
        </clipPath>
      </defs>

      <rect x="36" y="58" width="168" height="168" rx="10" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
      <g clipPath="url(#tv-img)">
        <circle cx="160" cy="98" r="14" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M36 206 L88 146 L120 178 L150 150 L204 204" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeLinejoin="round" />

        <motion.rect
          x="108"
          y="128"
          width="64"
          height="52"
          rx="4"
          fill="#ff6b08"
          initial={{ opacity: 0 }}
          animate={play ? { opacity: reduce ? 0.18 : [0.08, 0.26, 0.08] } : { opacity: 0 }}
          transition={loop(2.4, 1.8)}
        />
        {!reduce && play && (
          <motion.rect
            x="36"
            width="168"
            height="2"
            fill="url(#tv-scan)"
            initial={{ y: 58 }}
            animate={{ y: [58, 224] }}
            transition={{ duration: 2.2, delay: 0.3, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
          />
        )}
      </g>
      <motion.rect
        x="108"
        y="128"
        width="64"
        height="52"
        rx="4"
        stroke="#ff6b08"
        strokeWidth="2"
        strokeDasharray="5 4"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.2 }}
        transition={tr(0.5, 1.4)}
      />

      {nodes.slice(0, 3).map(([x, y], i) => (
        <motion.line
          key={i}
          x1={x}
          y1={y}
          x2={nodes[6 - i][0]}
          y2={y}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeDasharray="2 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: play ? 1 : 0 }}
          transition={tr(0.6, 1.4 + i * 0.1)}
        />
      ))}
      <motion.path
        d={u}
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={tr(1.2, 0.4)}
      />
      {nodes.map(([x, y, r], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={i === 3 ? "#ff6b08" : "currentColor"}
          fillOpacity={i === 3 ? 1 : 0.85}
          initial={{ scale: 0 }}
          animate={{ scale: play ? 1 : 0 }}
          transition={tr(0.35, 0.4 + i * 0.16)}
        />
      ))}
    </Canvas>
  );
}

/* TESDA — two golds, District then Regional. */
export function MedalsVisual() {
  const { ref, play, reduce } = usePlay();
  const medals = [
    { cx: 140, text: "District" },
    { cx: 260, text: "Regional" },
  ];

  return (
    <Canvas innerRef={ref} accent="#eedd44" label="Two gold medals, District and Regional">
      <defs>
        <linearGradient id="tv-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eedd44" />
          <stop offset="1" stopColor="#ff6b08" />
        </linearGradient>
        <linearGradient id="tv-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {medals.map((m) => (
          <clipPath key={m.cx} id={`tv-medal-${m.cx}`}>
            <circle cx={m.cx} cy="166" r="44" />
          </clipPath>
        ))}
      </defs>

      {medals.map((m, i) => (
        <motion.g
          key={m.cx}
          initial={{ y: -40, opacity: 0 }}
          animate={play ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 140, damping: 12, delay: 0.25 + i * 0.25 }
          }
        >
          <path
            d={`M${m.cx - 30} 46 H${m.cx - 10} L${m.cx + 6} 126 H${m.cx - 10} Z`}
            fill="currentColor"
            fillOpacity="0.14"
          />
          <path
            d={`M${m.cx + 30} 46 H${m.cx + 10} L${m.cx - 6} 126 H${m.cx + 10} Z`}
            fill="#f32170"
            fillOpacity="0.55"
          />
          <circle cx={m.cx} cy="166" r="44" fill="url(#tv-gold)" />
          <circle cx={m.cx} cy="166" r="34" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
          <path
            d={`M${m.cx} 148 l5 10.5 11.5 1.4 -8.5 7.9 2.2 11.4 -10.2 -5.6 -10.2 5.6 2.2 -11.4 -8.5 -7.9 11.5 -1.4z`}
            fill="#fff"
            fillOpacity="0.85"
          />
          {!reduce && play && (
            <g clipPath={`url(#tv-medal-${m.cx})`}>
              <motion.g
                initial={{ x: m.cx - 50 }}
                animate={{ x: [m.cx - 50, m.cx + 130] }}
                transition={{ duration: 1.1, delay: 1.4 + i * 0.3, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
              >
                <rect y="110" width="34" height="112" fill="url(#tv-shine)" transform="skewX(-18)" />
              </motion.g>
            </g>
          )}
          <text x={m.cx} y="236" textAnchor="middle" fill="currentColor" fillOpacity="0.6" style={label}>
            {m.text}
          </text>
        </motion.g>
      ))}
    </Canvas>
  );
}

/* ACM — communications broadcasting out, and the step up to VP. */
export function BroadcastVisual() {
  const { ref, play, reduce, tr, loop } = usePlay();
  const steps = "M196 224 H262 V146 H364";

  return (
    <Canvas innerRef={ref} accent="#eedd44" label="Broadcast waves beside a step from Jr Officer up to Vice-President">
      {!reduce &&
        play &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx="104"
            cy="150"
            r="12"
            stroke="#eedd44"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ r: [12, 78], opacity: [0.7, 0] }}
            transition={{ duration: 2.7, delay: 0.3 + i * 0.9, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      <circle cx="104" cy="150" r="46" stroke="currentColor" strokeOpacity="0.1" />
      <motion.circle
        cx="104"
        cy="150"
        r="12"
        fill="#eedd44"
        initial={{ scale: 0 }}
        animate={{ scale: play ? 1 : 0 }}
        transition={tr(0.4, 0.2)}
      />

      <line x1="196" y1="240" x2="364" y2="240" stroke="currentColor" strokeOpacity="0.2" />
      <motion.path
        d={steps}
        stroke="currentColor"
        strokeOpacity="0.65"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={tr(1.2, 0.5)}
      />
      {[
        { x: 228, y: 224, text: "Jr Officer", d: 0.9 },
        { x: 314, y: 146, text: "VP", d: 1.5 },
      ].map((n, i) => (
        <g key={n.text}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={i ? 7 : 5}
            fill={i ? "#eedd44" : "currentColor"}
            initial={{ scale: 0 }}
            animate={{ scale: play ? 1 : 0 }}
            transition={tr(0.4, n.d)}
          />
          {i === 1 && (
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="7"
              stroke="#eedd44"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={play ? { r: [7, 18], opacity: [0.7, 0] } : { opacity: 0 }}
              transition={loop(2.2, 2)}
            />
          )}
          <motion.text
            x={n.x}
            y={n.y - 16}
            textAnchor="middle"
            fill="currentColor"
            style={label}
            initial={{ opacity: 0, y: 6 }}
            animate={play ? { opacity: i ? 0.9 : 0.6, y: 0 } : { opacity: 0, y: 6 }}
            transition={tr(0.4, n.d + 0.15)}
          >
            {n.text}
          </motion.text>
        </g>
      ))}
    </Canvas>
  );
}

/* Education — data science: a scatter, its fit, and the standout point. */
export function ScatterVisual() {
  const { ref, play, tr, loop } = usePlay();
  const points = [
    [78, 214], [96, 222], [104, 196], [122, 204], [134, 184], [150, 196],
    [160, 170], [176, 178], [186, 158], [200, 168], [214, 146], [226, 156],
    [238, 132], [252, 142], [266, 122], [280, 130], [296, 110], [312, 104],
  ];
  const star = [334, 78];

  return (
    <Canvas innerRef={ref} accent="#cf23cf" label="Scatter plot with a regression line and one standout point">
      <defs>
        <linearGradient id="tv-fit" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#cf23cf" />
          <stop offset="1" stopColor="#f32170" />
        </linearGradient>
        <radialGradient id="tv-star" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#cf23cf" stopOpacity="0.5" />
          <stop offset="1" stopColor="#cf23cf" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d="M60 52 V242 H364" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
      {[100, 150, 200].map((y) => (
        <line key={y} x1="60" x2="364" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.07" />
      ))}

      {points.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          fill="currentColor"
          fillOpacity="0.55"
          initial={{ scale: 0 }}
          animate={{ scale: play ? 1 : 0 }}
          transition={tr(0.35, 0.2 + i * 0.04)}
        />
      ))}

      <motion.path
        d="M72 226 L330 90"
        stroke="url(#tv-fit)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={tr(1, 1)}
      />

      <motion.circle
        cx={star[0]}
        cy={star[1]}
        r="20"
        fill="url(#tv-star)"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: [0.4, 1, 0.4] } : { opacity: 0 }}
        transition={loop(2.4, 2)}
      />
      <motion.circle
        cx={star[0]}
        cy={star[1]}
        r="6"
        fill="#cf23cf"
        initial={{ scale: 0 }}
        animate={{ scale: play ? 1 : 0 }}
        transition={tr(0.45, 1.8)}
      />
    </Canvas>
  );
}

/* AIQUE full stack — a live booking dashboard: concurrent users trending up,
   and the v2 features switching on one by one. */
export function BookingVisual() {
  const { ref, play, tr, loop } = usePlay();
  const id = useId().replace(/:/g, "");
  const data = [184, 172, 178, 154, 160, 132, 140, 112, 118, 92];
  const step = 192 / (data.length - 1);
  const pts = data.map((y, i) => [46 + i * step, y]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} 214 L46 214 Z`;
  const head = pts[pts.length - 1];
  const features = ["Filter", "Sort", "Auth", "Bundles"];

  return (
    <Canvas innerRef={ref} accent="#ff6b08" label="Booking dashboard with concurrent users rising and v2 features enabled">
      <defs>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6b08" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff6b08" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6b08" />
          <stop offset="1" stopColor="#f32170" />
        </linearGradient>
      </defs>

      <motion.g initial={{ opacity: 0, y: 10 }} animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={tr(0.6)}>
        <rect x="28" y="40" width="228" height="200" rx="16" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.12" />
        <text x="46" y="68" fill="currentColor" fillOpacity="0.55" style={label}>Concurrent users</text>
        <motion.circle
          cx="216"
          cy="64"
          r="3.5"
          fill="#ff6b08"
          animate={play ? { opacity: [1, 0.3, 1] } : { opacity: 0 }}
          transition={loop(1.6, 0.8)}
        />
        <text x="224" y="68" fill="#ff6b08" style={{ ...label, fontSize: 9, fontWeight: 600 }}>LIVE</text>
        {[124, 154, 184].map((y) => (
          <line key={y} x1="46" x2="238" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.06" />
        ))}
        <line x1="46" x2="238" y1="214" y2="214" stroke="currentColor" strokeOpacity="0.2" />
      </motion.g>

      <motion.path
        d={area}
        fill={`url(#${id}-area)`}
        initial={{ opacity: 0 }}
        animate={{ opacity: play ? 1 : 0 }}
        transition={tr(0.8, 1.2)}
      />
      <motion.path
        d={line}
        stroke={`url(#${id}-grad)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={tr(1.3, 0.4)}
      />
      <motion.circle
        cx={head[0]}
        cy={head[1]}
        r="5"
        stroke="#f32170"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={play ? { r: [5, 15], opacity: [0.7, 0] } : { opacity: 0 }}
        transition={loop(2, 1.8)}
      />
      <motion.circle
        cx={head[0]}
        cy={head[1]}
        r="4.5"
        fill="#f32170"
        initial={{ scale: 0 }}
        animate={{ scale: play ? 1 : 0 }}
        transition={tr(0.4, 1.6)}
      />

      {features.map((f, i) => {
        const y = 56 + i * 38;
        return (
          <motion.g
            key={f}
            initial={{ opacity: 0, x: 14 }}
            animate={play ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
            transition={tr(0.5, 0.5 + i * 0.12)}
          >
            <rect x="270" y={y} width="104" height="28" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.14" />
            <circle cx="286" cy={y + 14} r="7" stroke="currentColor" strokeOpacity="0.3" />
            <motion.circle
              cx="286"
              cy={y + 14}
              r="7"
              fill={`url(#${id}-grad)`}
              initial={{ scale: 0 }}
              animate={{ scale: play ? 1 : 0 }}
              transition={tr(0.35, 1.2 + i * 0.25)}
            />
            <motion.path
              d={`M282.5 ${y + 14} l2.5 2.5 4.5 -5`}
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: play ? 1 : 0 }}
              transition={tr(0.3, 1.4 + i * 0.25)}
            />
            <text x="300" y={y + 18} fill="currentColor" fillOpacity="0.8" style={label}>{f}</text>
          </motion.g>
        );
      })}

      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={tr(0.5, 2.3)}
      >
        <rect x="270" y="210" width="104" height="28" rx="14" fill={`url(#${id}-grad)`} />
        <text x="322" y="228" textAnchor="middle" fill="#fff" style={{ ...label, fontWeight: 600 }}>v2 shipped</text>
      </motion.g>
    </Canvas>
  );
}

/* AIQUE intern — a waffle of 15 pages turning from wireframe to redesigned,
   beside the three breakpoints they were built for. */
export function PagesVisual() {
  const { ref, play, tr } = usePlay();
  const id = useId().replace(/:/g, "");
  const cells = Array.from({ length: 15 }, (_, i) => [36 + (i % 5) * 46, 58 + Math.floor(i / 5) * 60]);
  const devices = [
    { x: 290, y: 64, w: 82, h: 52, r: 6 },
    { x: 290, y: 132, w: 44, h: 60, r: 6 },
    { x: 346, y: 140, w: 26, h: 52, r: 5 },
  ];

  return (
    <Canvas innerRef={ref} accent="#ff6b08" label="Fifteen pages redesigned, shown responsive across desktop, tablet and phone">
      <defs>
        <linearGradient id={`${id}-page`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6b08" />
          <stop offset="1" stopColor="#f32170" />
        </linearGradient>
      </defs>

      {cells.map(([x, y], i) => (
        <g key={i}>
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: play ? 1 : 0 }} transition={tr(0.4, 0.05 + i * 0.03)}>
            <rect x={x} y={y} width="38" height="50" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.16" />
            <line x1={x + 7} x2={x + 31} y1={y + 12} y2={y + 12} stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
            <line x1={x + 7} x2={x + 22} y1={y + 20} y2={y + 20} stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" />
          </motion.g>
          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={tr(0.45, 0.8 + i * 0.07)}
          >
            <rect x={x} y={y} width="38" height="50" rx="6" fill={`url(#${id}-page)`} fillOpacity={0.55 + (i % 5) * 0.09} />
            <rect x={x + 6} y={y + 7} width="26" height="14" rx="3" fill="#fff" fillOpacity="0.28" />
            <line x1={x + 7} x2={x + 28} y1={y + 30} y2={y + 30} stroke="#fff" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            <line x1={x + 7} x2={x + 20} y1={y + 38} y2={y + 38} stroke="#fff" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
          </motion.g>
        </g>
      ))}

      {devices.map((d, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={tr(0.5, 0.4 + i * 0.12)}
        >
          <rect x={d.x} y={d.y} width={d.w} height={d.h} rx={d.r} fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <motion.rect
            x={d.x + 5}
            y={d.y + 6}
            height="8"
            rx="3"
            fill={`url(#${id}-page)`}
            initial={{ width: 0 }}
            animate={{ width: play ? d.w - 10 : 0 }}
            transition={tr(0.6, 1.6 + i * 0.15)}
          />
          {[20, 30].map((o, j) => (
            <motion.rect
              key={o}
              x={d.x + 5}
              y={d.y + o}
              height="4"
              rx="2"
              fill="currentColor"
              fillOpacity="0.25"
              initial={{ width: 0 }}
              animate={{ width: play ? (d.w - 10) * (j ? 0.55 : 0.8) : 0 }}
              transition={tr(0.5, 1.8 + i * 0.15 + j * 0.08)}
            />
          ))}
        </motion.g>
      ))}
      <line x1="290" x2="372" y1="210" y2="210" stroke="currentColor" strokeOpacity="0.15" />
      <motion.text
        x="290"
        y="230"
        fill="currentColor"
        style={label}
        initial={{ opacity: 0 }}
        animate={{ opacity: play ? 0.55 : 0 }}
        transition={tr(0.4, 2)}
      >
        Responsive
      </motion.text>
    </Canvas>
  );
}

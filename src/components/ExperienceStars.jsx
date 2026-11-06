import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// A night sky in the left and right margins of the experience section:
// scattered stars plus a few faint constellations, all drifting upward with
// scroll at their own depth. The canvas is sticky to the viewport while the
// section is on screen. The sky is confined to the measured empty margins
// either side of the content column, so it never runs behind the timeline.
const WRAP_PAD = 260; // extra virtual height so figures wrap off-screen, not mid-view

// Constellation figures on a unit box: points plus the lines between them.
const FIGURES = [
  {
    // Big Dipper
    pts: [[0, 0.2], [0.24, 0.3], [0.44, 0.27], [0.62, 0.4], [0.66, 0.72], [0.96, 0.78], [1, 0.46]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
  },
  {
    // Cassiopeia
    pts: [[0, 0.25], [0.24, 0.8], [0.5, 0.38], [0.76, 0.86], [1, 0.3]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    // Orion
    pts: [[0.2, 0], [0.82, 0.06], [0.4, 0.5], [0.5, 0.53], [0.6, 0.56], [0.24, 1], [0.8, 0.96]],
    edges: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
  },
  {
    // Lyra
    pts: [[0.5, 0], [0.3, 0.4], [0.7, 0.45], [0.36, 1], [0.76, 0.98]],
    edges: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4]],
  },
  {
    // a small cluster
    pts: [[0, 0.62], [0.48, 0], [1, 0.7], [0.56, 1]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
  },
];

const rand = (a, b) => a + Math.random() * (b - a);

function makeSky(w, h, leftW, rightW) {
  const wrapH = h + WRAP_PAD;
  const stars = [];
  // density follows the margin size: roughly one star per 1,800px² of sky
  const count = Math.round(((leftW + rightW) * h) / 1800);
  for (let i = 0; i < count; i++) {
    const left = i % 2 === 0;
    const gutterPx = left ? leftW : rightW;
    const u = Math.random();
    stars.push({
      // bias toward the outer edge so the field thins toward the content
      x: left ? u * u * gutterPx : w - u * u * gutterPx,
      y: Math.random() * wrapH,
      r: rand(0.4, 1.5),
      depth: rand(0.06, 0.3),
      base: rand(0.25, 0.75),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.2, 0.6),
    });
  }

  // Constellations: three per side, spaced down the sky, only where the
  // margin is wide enough to hold a figure without touching the content.
  const figures = [];
  const order = [0, 1, 2, 3, 4, 2];
  for (let i = 0; i < 6; i++) {
    const left = i % 2 === 0;
    const gutterPx = left ? leftW : rightW;
    if (gutterPx < 130) continue;
    const scale = Math.min(gutterPx * 0.7, 190);
    const slack = Math.max(0, gutterPx - scale - 32);
    const slot = Math.floor(i / 2);
    const fig = FIGURES[order[i]];
    const x0 = left ? 16 + rand(0, slack) : w - gutterPx + 16 + rand(0, slack);
    figures.push({
      fig,
      x0,
      y0: (slot + (left ? 0.1 : 0.55)) * (wrapH / 3),
      scale,
      depth: rand(0.12, 0.2),
      phase: rand(0, Math.PI * 2),
    });
  }
  return { stars, figures, wrapH };
}

const wrapY = (y, wrapH) => {
  let v = y % wrapH;
  if (v < 0) v += wrapH;
  return v - WRAP_PAD / 2;
};

function drawStar(ctx, x, y, r, alpha) {
  if (r > 1.1) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
    g.addColorStop(0, `rgba(255, 214, 232, ${alpha * 0.35})`);
    g.addColorStop(1, "rgba(255, 214, 232, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = `rgba(255, 244, 248, ${alpha})`;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

export default function ExperienceStars({ sectionRef }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  // Fade the whole sky in and out at the section's edges so the sticky
  // canvas never shows a hard line where it starts or stops.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let sky = { stars: [], figures: [], wrapH: 1 };
    let raf = 0;
    let running = false;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // empty space either side of the content column
      const inner = section.querySelector(".experience-inner");
      const rect = inner ? inner.getBoundingClientRect() : { left: w * 0.15, right: w * 0.85 };
      sky = makeSky(w, h, Math.max(0, rect.left - 12), Math.max(0, w - rect.right - 12));
    };

    const draw = (t) => {
      // px scrolled through the section; the sky lags behind by depth
      const scrolled = -section.getBoundingClientRect().top;
      const time = t * 0.001;
      ctx.clearRect(0, 0, w, h);

      for (const s of sky.stars) {
        const y = wrapY(s.y - scrolled * s.depth, sky.wrapH);
        const breathe = reduce ? 1 : 0.65 + 0.35 * Math.sin(time * s.speed + s.phase);
        drawStar(ctx, s.x, y, s.r, s.base * breathe);
      }

      for (const f of sky.figures) {
        const oy = wrapY(f.y0 - scrolled * f.depth, sky.wrapH);
        const pts = f.fig.pts.map(([px, py]) => [f.x0 + px * f.scale, oy + py * f.scale]);
        const pulse = reduce ? 1 : 0.8 + 0.2 * Math.sin(time * 0.35 + f.phase);

        ctx.strokeStyle = `rgba(245, 160, 196, ${0.28 * pulse})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (const [a, b] of f.fig.edges) {
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
        }
        ctx.stroke();

        pts.forEach(([x, y], i) => {
          drawStar(ctx, x, y, i % 3 === 0 ? 1.8 : 1.3, 0.85 * pulse);
        });
      }
    };

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(0);
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    // Only animate while the section is on screen. Under reduced motion,
    // redraw on scroll (positions only) instead of looping.
    const onScroll = () => draw(0);
    const io = new IntersectionObserver(([entry]) => {
      if (reduce) {
        if (entry.isIntersecting) window.addEventListener("scroll", onScroll, { passive: true });
        else window.removeEventListener("scroll", onScroll);
        return;
      }
      if (entry.isIntersecting) start();
      else stop();
    });
    io.observe(section);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionRef, reduce]);

  return (
    <div className="experience-stars" aria-hidden>
      <motion.canvas
        ref={canvasRef}
        className="experience-stars__canvas"
        style={{ opacity }}
      />
    </div>
  );
}

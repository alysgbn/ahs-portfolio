import React, { useEffect, useRef } from "react";
import "../assets/css/hero-nebula.scss";

// Hero-scoped nebula: mesh gradient + horizon glow + SVG grain + canvas
// starfield with lerp-eased cursor drift, scroll parallax, sine-wave
// twinkle, and squared-distance proximity glow. Positioned absolutely
// inside the hero's sticky container so it stays confined to the hero
// section only.
//
// Star field spec:
//   170 objects, one canvas, one rAF loop, no state mutation between
//   frames except the eased cursor. Halo drawn first so the star sits
//   inside its glow rather than behind it. Depth is a random number
//   that fakes a z-coordinate — every motion effect multiplies by it.

const STAR_COUNT = 170;
const TWINKLE_CHANCE = 0.25;   // roughly 42 twinklers of 170
const REACH = 130;              // px — cursor influence radius
const REACH2 = REACH * REACH;   // avoid Math.sqrt on stars out of range

export default function HeroNebula() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    // Seed stars once. Each has:
    //   x, y   — normalised 0-1 position within canvas
    //   r      — radius 0.25-1.35 px
    //   o      — base opacity 0.12-0.67
    //   d      — depth 0.4-1.0, drives motion multiplier (fake parallax)
    //   tw     — 25% chance this one twinkles
    //   ph, sp — phase + speed so twinklers desync (else they blink together)
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.25 + Math.random() * 1.1,
      o: 0.12 + Math.random() * 0.55,
      d: 0.4 + Math.random() * 0.6,
      tw: Math.random() < TWINKLE_CHANCE,
      ph: Math.random() * Math.PI * 2,
      sp: 0.6 + Math.random() * 1.4,
    }));

    // Cursor state: normalised -1..1 (for drift) + absolute px (for proximity).
    let tmxN = 0, tmyN = 0;   // where cursor actually is (target)
    let mxN = 0, myN = 0;     // where field thinks it is (eased)
    let cursorX = -9999, cursorY = -9999;

    let scrollShift = 0;      // 0..1 across roughly one viewport of scroll

    // Cap devicePixelRatio at 2 — on a 3x phone the extra pixels aren't
    // visible and you'd be filling 9x the work.
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let rafId = 0;
    let running = false;   // gates the rAF loop — see start/stop below

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        cursorX = -9999;
        cursorY = -9999;
        tmxN = 0;
        tmyN = 0;
        return;
      }
      cursorX = e.clientX - rect.left;
      cursorY = e.clientY - rect.top;
      tmxN = (cursorX / rect.width) * 2 - 1;
      tmyN = (cursorY / rect.height) * 2 - 1;
    };

    const onScroll = () => {
      // Simple 0..1 ramp across the first viewport of scroll. Beyond that,
      // clamped. Enough to drive the parallax across the hero pin.
      scrollShift = Math.min(
        1,
        Math.max(0, window.scrollY / window.innerHeight)
      );
    };

    const render = (ts) => {
      // Lerp: fast at first, settles gently. Single most reusable trick.
      mxN += (tmxN - mxN) * 0.055;
      myN += (tmyN - myN) * 0.055;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Twinkle — multiplicative so dim stars stay proportionally dim.
        // Range 0.72..1.0 of base — shallow so it shimmers, not flickers.
        let o = s.o;
        if (s.tw) o *= 0.72 + 0.28 * Math.sin(ts * 0.001 * s.sp + s.ph);

        // Position: cursor drift + scroll parallax, both scaled by depth.
        // Scroll gets 90 vs 22 for cursor because scroll is a deliberate
        // journey and cursor drift should be barely perceptible.
        const px = s.x * w + mxN * s.d * 22;
        const py = s.y * h - scrollShift * s.d * 90 + myN * s.d * 22;

        let finalO = o;
        let finalR = s.r;

        // Proximity: squared distance first so we skip sqrt for most stars.
        if (cursorX > -1000) {
          const dx = cursorX - px;
          const dy = cursorY - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < REACH2) {
            const f = 1 - Math.sqrt(d2) / REACH;
            const e = f * f; // squared falloff — defined pool, soft edge

            // Halo first, then star on top → star sits inside its glow.
            ctx.beginPath();
            ctx.arc(px, py, s.r + e * 6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 220, 200, ${o * e * 0.35})`;
            ctx.fill();

            finalO = Math.min(1, o + e * 0.55);
            finalR = s.r + e * 1.6;
          }
        }

        ctx.beginPath();
        ctx.arc(px, py, finalR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 220, 200, ${finalO})`;
        ctx.fill();
      }

      // Only re-queue the next frame while the loop is meant to be
      // running. Stopping just clears `running` and cancels the pending
      // rAF; without this gate, reduced-motion or paused states would
      // still be silently pumping 60fps redraws.
      if (running) rafId = requestAnimationFrame(render);
    };

    resize();
    onScroll();

    // Pause state: canvas is skipped when hero is out of viewport OR when
    // the tab is hidden. Big win — the rAF loop stops burning CPU on
    // starfield redraws that nobody is looking at.
    let inView = true;
    let tabVisible = !document.hidden;

    const start = () => {
      if (reduced || running) return;
      running = true;
      rafId = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };
    const evaluate = () => {
      if (inView && tabVisible) start();
      else stop();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        evaluate();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      tabVisible = !document.hidden;
      evaluate();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (canHover && !reduced) {
      window.addEventListener("mousemove", onMouseMove);
    }

    if (reduced) {
      // Reduced motion: paint one static frame, no loop.
      render(0);
    } else {
      evaluate();
    }

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-nebula" aria-hidden>
      {/* ===== OPTION 2 (hero-scoped nebula) LAYERS =====
          Currently commented out. Active mode = Option 1 (GradientBackdrop
          orbs from src/index.js) with just this canvas starfield overlaid.
          Uncomment the four elements below AND keep sticky background at
          transparent (see hero-orbit.scss) to enable the full hero-scoped
          nebula. See src/index.js for the full three-option toggle map.
      <div className="hero-nebula__mesh" />
      <div className="hero-nebula__vignette" />
      <div className="hero-nebula__horizon" />
      */}
      <canvas ref={canvasRef} className="hero-nebula__stars" />
      {/*
      <svg
        className="hero-nebula__noise"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="hero-nebula-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0.55 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-nebula-noise)" />
      </svg>
      */}
    </div>
  );
}

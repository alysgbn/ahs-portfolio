import React, { useEffect, useRef } from "react";
import "../assets/css/nebula-bg.scss";

// Nebula background: layered mesh gradient + SVG grain + parallax starfield
// + horizon glow. Fixed-position, sits behind all content.
export default function NebulaBackground() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Star count — trimmed on mobile for perf.
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 60 : 130;

    // Star model:
    //   x, y  — normalised 0-1 within a 2x-viewport tall virtual field
    //   r     — radius in px
    //   base  — resting opacity
    //   depth — 0.1 slow (far) to 1 fast (near), drives parallax speed
    //   hue   — small colour variation on the pink/amber palette
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.6,
      base: 0.2 + Math.random() * 0.55,
      depth: 0.15 + Math.random() * 0.85,
      hue: Math.random() < 0.75 ? "245, 108, 156" : "255, 154, 60",
    }));

    let dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scrollY = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const virtualH = h * 2;

      ctx.clearRect(0, 0, w, h);

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Parallax: closer stars (higher depth) shift more with scroll.
        const rawY = s.y * virtualH - scrollY * s.depth * 0.12;
        // Wrap so the field tiles and doesn't run out.
        const y = ((rawY % virtualH) + virtualH) % virtualH - h * 0.5;
        if (y < -10 || y > h + 10) continue;

        const x = s.x * w;

        // Mouse proximity — brighten and grow nearby stars.
        const dx = mx - x;
        const dy = my - y;
        const distSq = dx * dx + dy * dy;
        const influenceRadius = 140;
        const proximity =
          distSq < influenceRadius * influenceRadius
            ? 1 - Math.sqrt(distSq) / influenceRadius
            : 0;

        const opacity = Math.min(1, s.base + proximity * 0.6);
        const radius = s.r + proximity * 1.4;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue}, ${opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    scrollRef.current = window.scrollY;

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!reduced) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseout", onMouseLeave);
    }

    if (reduced) {
      // Draw once, no animation loop.
      render();
      cancelAnimationFrame(rafRef.current);
    } else {
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
    };
  }, []);

  return (
    <div className="nebula-bg" aria-hidden>
      <div className="nebula-bg__mesh" />
      <div className="nebula-bg__horizon" />
      <canvas className="nebula-bg__stars" ref={canvasRef} />
      <svg
        className="nebula-bg__noise"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="nebula-noise">
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
        <rect width="100%" height="100%" filter="url(#nebula-noise)" />
      </svg>
    </div>
  );
}

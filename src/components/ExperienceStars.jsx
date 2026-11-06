import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// A quiet starfield in the left and right margins of the experience
// section. The canvas is sticky to the viewport while the section is on
// screen; stars drift upward with scroll at their own depth (slower than
// the content) and breathe very slowly. Nothing is drawn in the middle.

const GUTTER = 0.17; // share of width on each side that holds stars

function makeStars(count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const left = i % 2 === 0;
    const u = Math.random();
    stars.push({
      // bias toward the outer edge so the field thins toward the content
      x: left ? u * u * GUTTER : 1 - u * u * GUTTER,
      y: Math.random(),
      r: 0.35 + Math.random() * 1.05,
      depth: 0.08 + Math.random() * 0.32,
      base: 0.12 + Math.random() * 0.38,
      phase: Math.random() * Math.PI * 2,
      speed: 0.25 + Math.random() * 0.45,
    });
  }
  return stars;
}

export default function ExperienceStars({ sectionRef }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  // Fade the whole field in and out at the section's edges so the sticky
  // canvas never shows a hard line where it starts or stops.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars = [];
    let raf = 0;
    let running = false;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(w < 720 ? 36 : 84);
    };

    const draw = (t) => {
      // px scrolled through the section; stars lag behind it by depth
      const scrolled = -section.getBoundingClientRect().top;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        let y = (s.y * h - scrolled * s.depth) % h;
        if (y < 0) y += h;
        const breathe = reduce ? 1 : 0.7 + 0.3 * Math.sin(t * 0.001 * s.speed + s.phase);
        ctx.globalAlpha = s.base * breathe;
        ctx.fillStyle = "#fbeff4";
        ctx.beginPath();
        ctx.arc(s.x * w, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
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

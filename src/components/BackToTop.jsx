import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import "../assets/css/back-to-top.scss";

const ease = [0.23, 1, 0.32, 1];

// Floating return-to-top control. Shows once the visitor is past the hero;
// its ring fills with page progress, echoing the bar along the top edge.
export default function BackToTop() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const show = y > window.innerHeight * 1.2;
    setVisible((v) => (v === show ? v : show));
  });

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="back-to-top"
          aria-label="Back to top"
          onClick={toTop}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: reduce ? 0 : 0.35, ease }}
        >
          <svg className="back-to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
            <defs>
              <linearGradient id="back-to-top-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f32170" />
                <stop offset="0.5" stopColor="#ff6b08" />
                <stop offset="1" stopColor="#eedd44" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" className="back-to-top__track" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              stroke="url(#back-to-top-ring)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: scrollYProgress, rotate: -90, transformOrigin: "50% 50%" }}
            />
          </svg>
          <svg className="back-to-top__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5" />
            <path d="m6 11 6-6 6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

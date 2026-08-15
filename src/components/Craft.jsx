import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../assets/css/craft.scss";

const ease = [0.23, 1, 0.32, 1];

const headerReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.1, ease },
  },
};

const tileReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease },
  }),
};

const ArrowUpRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

function useLocalClock(timezone = "Asia/Manila") {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }, 30000);
    return () => clearInterval(id);
  }, [timezone]);

  return time;
}

const handleSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

export default function Craft() {
  const localTime = useLocalClock("Asia/Manila");

  return (
    <section id="craft" className="craft-section">
      <div className="craft-inner">
        <motion.div
          className="craft-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerReveal}
        >
          <div className="journey-header">
            <p>CRAFT</p>
            <h1>Where the play lives.</h1>
          </div>
          <p className="craft-sub">
            Smaller experiments, in-progress ideas, and the little tools I
            reach for outside of production work.
          </p>
        </motion.div>

        <div className="craft-grid">
          <motion.div
            className="tile tile-feature"
            onMouseMove={handleSpotlight}
            variants={tileReveal}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="tile-feature-cursor" />
            <div className="tile-eyebrow">Studio</div>
            <div className="tile-feature-line">
              Interfaces that don't waste your time.
            </div>
          </motion.div>

          <motion.div
            className="tile tile-now-playing"
            variants={tileReveal}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="tile-eyebrow">Now playing</div>
            <div className="now-playing-row">
              <div className="now-playing-cover" />
              <div>
                <div className="tile-title" style={{ fontSize: "14px" }}>
                  Sunflower
                </div>
                <div className="tile-sub">Post Malone, Swae Lee</div>
              </div>
            </div>
            <div className="now-playing-bars">
              <span />
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          <motion.div
            className="tile tile-location"
            variants={tileReveal}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="tile-eyebrow">Working from</div>
            <div className="tile-title">Manila, PH</div>
            <div className="location-time">{localTime}</div>
          </motion.div>

          <motion.div
            className="tile tile-reading"
            variants={tileReveal}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="tile-eyebrow">Currently reading</div>
            <div>
              <div className="tile-title">A Philosophy of Software Design</div>
              <div className="tile-sub">John Ousterhout</div>
            </div>
          </motion.div>

          <motion.div
            className="tile tile-figma"
            variants={tileReveal}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="tile-eyebrow">Designed in</div>
            <div className="tile-title">Figma</div>
            <div className="figma-dots">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          <motion.a
            href="https://github.com/alysgbn"
            target="_blank"
            rel="noopener noreferrer"
            className="tile tile-github tile-wide"
            variants={tileReveal}
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="tile-eyebrow">Building in the open</div>
            <div>
              <div className="tile-title">github.com/alysgbn</div>
              <div className="tile-sub">
                Notes, experiments, and side projects.
              </div>
            </div>
            <div className="github-arrow">
              <ArrowUpRight />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

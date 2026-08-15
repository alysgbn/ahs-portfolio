import React from "react";
import { motion } from "framer-motion";
import ScrubbedText from "./ScrubbedText";
import "../assets/css/manifesto.scss";

const ease = [0.23, 1, 0.32, 1];

export default function Manifesto() {
  return (
    <section className="manifesto-section">
      <div className="manifesto-inner">
        <span className="manifesto-corner" aria-hidden="true">
          01
        </span>
        <motion.p
          className="manifesto-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true, amount: 0.5 }}
        >
          A PHILOSOPHY
        </motion.p>
        <ScrubbedText className="manifesto-text">
          Great software feels obvious. Every animation lands where your eye
          was already looking, every button presses the exact moment you
          expected. That takes ten times longer to build than "just working" —
          and I like the ten-times-longer version.
        </ScrubbedText>
        <motion.div
          className="manifesto-signature"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          transition={{ duration: 0.55, delay: 0.3, ease }}
          viewport={{ once: true, amount: 0.5 }}
        >
          — Aliyah
        </motion.div>
      </div>
    </section>
  );
}

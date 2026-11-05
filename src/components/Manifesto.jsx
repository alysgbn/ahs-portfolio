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
          The best software makes hard work disappear. A data request that
          took half a day now takes minutes. A messy warehouse becomes one
          number everyone trusts. From the pipeline to the last pixel, I build
          the version people stop noticing, because it simply works.
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

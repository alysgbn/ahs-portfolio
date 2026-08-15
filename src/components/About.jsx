import React from "react";
import { motion } from "framer-motion";
import ScrubbedText from "./ScrubbedText";
import "../assets/css/about.scss";

const ease = [0.23, 1, 0.32, 1];

const values = [
  {
    title: "Craft over speed",
    body: "A rushed interface is easy to spot. I sweat the small details because they compound into something that just feels right.",
  },
  {
    title: "Simple by design",
    body: "The best UI disappears. I aim for interfaces users move through without noticing the machinery underneath.",
  },
  {
    title: "Motion with purpose",
    body: "Every animation earns its place. If it doesn't guide, respond, or explain — it doesn't ship.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
};

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-bio">
          <motion.p
            className="about-eyebrow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            custom={0}
          >
            ABOUT
          </motion.p>
          <motion.h2
            className="about-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            custom={1}
          >
            Frontend engineer with a soft spot for the details you don't
            usually notice.
          </motion.h2>
          <ScrubbedText>
            I build web interfaces that feel considered — from the way a button
            presses under your cursor to the timing of a section as it fades
            into view. My background sits between engineering and design, and I
            care about both.
          </ScrubbedText>
          <ScrubbedText>
            Currently freelancing and open to full-time roles where craft
            matters. Based in the Philippines, working globally.
          </ScrubbedText>
        </div>

        <motion.div
          className="about-values"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="value-card"
              variants={reveal}
              custom={i + 1}
            >
              <div className="value-number">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="value-title">{v.title}</div>
              <div className="value-body">{v.body}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

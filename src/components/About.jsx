import React from "react";
import { motion } from "framer-motion";
import ScrubbedText from "./ScrubbedText";
import WordReveal from "./WordReveal";
import "../assets/css/about.scss";

const ease = [0.23, 1, 0.32, 1];

const values = [
  {
    title: "Craft over speed",
    body: "A rushed interface is easy to spot. I sweat the small details because they compound into something that just feels right.",
  },
  {
    title: "Full-stack, honestly",
    body: "Frontend clarity is only worth so much without the data model to back it up. I care about the whole path from click to database and back.",
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
          <WordReveal
            as="h2"
            className="about-heading"
            delayOffset={0.15}
          >
            Full-stack developer with a Data Science major and a soft spot for the details you don't usually notice.
          </WordReveal>
          <ScrubbedText>
            I build web applications and the data models behind them. My focus is end-to-end — from the way a button presses under your cursor to the pipelines that keep the numbers honest.
          </ScrubbedText>
          <ScrubbedText>
            Currently Data Solutions Engineer at Docquity, based in Pasig City. BS Computer Science, Data Science major, Magna Cum Laude from the Technological Institute of the Philippines.
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

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
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

const heading = "The details you don't usually notice.";

// Each card has its own signature entrance
const cardEntrance = [
  {
    initial: { opacity: 0, x: -120, rotate: -10 },
    animate: { opacity: 1, x: 0, rotate: 0 },
  },
  {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
  },
  {
    initial: { opacity: 0, y: 40, filter: "blur(20px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
];

export default function About() {
  const sectionRef = useRef(null);

  // Scroll-linked ink fill — progresses as the section scrolls into view.
  // Journey: from "section top at viewport bottom" → "section top at viewport top"
  // = one viewport height of scroll (100vh).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const rightInset = useTransform(scrollYProgress, [0.15, 0.9], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 ${rightInset}% 0 0)`;

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-section__container">
        <motion.p
          className="about-section__eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease }}
        >
          ABOUT
        </motion.p>

        <div className="about-section__title-stack">
          <h2 className="about-section__title about-section__title--base">
            {heading}
          </h2>
          <motion.h2
            aria-hidden
            className="about-section__title about-section__title--fill"
            style={{ clipPath }}
          >
            {heading}
          </motion.h2>
        </div>

        <motion.p
          className="about-section__bio"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        >
          Full-stack developer with a Data Science major, currently at{" "}
          <strong>Docquity</strong> — where full-stack dev, data engineering,
          and client analytics roll into one role.
        </motion.p>

        <div className="about-section__cards" style={{ perspective: 900 }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="about-section__card"
              style={{
                transformPerspective: 900,
                transformStyle: "preserve-3d",
              }}
              initial={cardEntrance[i].initial}
              whileInView={cardEntrance[i].animate}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.85,
                delay: 0.5 + i * 0.25,
                ease,
              }}
            >
              <div className="value-number">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="value-title">{v.title}</div>
              <div className="value-body">{v.body}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

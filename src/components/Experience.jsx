import React from "react";
import { motion } from "framer-motion";
import "../assets/css/experience.scss";

const ease = [0.23, 1, 0.32, 1];

const timeline = [
  {
    date: "2025 — Present",
    role: "Junior Web Developer",
    org: "AIQUE Innovation Tech. Corp.",
    body: "Building the frontend for a travel and hotel booking platform. Ownership of design system components and page-level flows.",
  },
  {
    date: "2024",
    role: "Front-end Developer Intern",
    org: "AIQUE Innovation Tech. Corp.",
    body: "Built 10+ pages for GalaGO! V2 over a 200-hour internship, focused on design consistency and user experience.",
  },
  {
    date: "2020 — 2024",
    role: "BS Information Technology",
    org: "Placeholder — replace with your school",
    body: "Coursework spanning web systems, data structures, and applied machine learning.",
  },
];

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease },
  }),
};

const headerReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">
        <motion.div
          className="experience-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerReveal}
        >
          <p className="experience-eyebrow">THE PATH SO FAR</p>
          <h2 className="experience-heading">Experience & education</h2>
        </motion.div>

        <div className="timeline">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.role + entry.date}
              className="timeline-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={item}
              custom={i}
            >
              <div className="timeline-date">{entry.date}</div>
              <div className="timeline-marker">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>
              <div className="timeline-content">
                <div className="timeline-role">{entry.role}</div>
                <div className="timeline-org">{entry.org}</div>
                <div className="timeline-body">{entry.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import WordReveal from "./WordReveal";
import "../assets/css/skills.scss";

const ease = [0.23, 1, 0.32, 1];

const groups = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Sass",
      "Framer Motion",
      "Bootstrap",
    ],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Express", "REST APIs", "Postman"],
  },
  {
    label: "Data & ML",
    items: ["Python", "Pandas", "NumPy", "scikit-learn", "TensorFlow"],
  },
  {
    label: "Tools & Design",
    items: ["Git", "GitHub", "GitLab", "Figma", "VS Code"],
  },
];

const headerReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const groupReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease },
  }),
};

const chipReveal = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, delay: 0.15 + i * 0.03, ease },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-inner">
        <motion.div
          className="skills-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerReveal}
        >
          <p className="skills-eyebrow">THE STACK</p>
          <WordReveal as="h2" className="skills-heading" delayOffset={0.15}>
            What I reach for.
          </WordReveal>
          <p className="skills-sub">
            Tools I use day-to-day, grouped roughly by where they live in
            the pipeline. Comfortable across the frontend spectrum with a
            growing bench in data and ML.
          </p>
        </motion.div>

        <div className="skills-groups">
          {groups.map((group, gi) => (
            <motion.div
              key={group.label}
              className="skills-group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={groupReveal}
              custom={gi}
            >
              <div className="skills-group-label">{group.label}</div>
              <div className="skills-chips">
                {group.items.map((item, ci) => (
                  <motion.span
                    key={item}
                    className="skills-chip"
                    variants={chipReveal}
                    custom={ci}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

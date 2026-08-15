import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrubbedText from "./ScrubbedText";
import "../assets/css/experience.scss";

const ease = [0.23, 1, 0.32, 1];

const typeColor = {
  Work: "#ff6b08",
  Education: "#cf23cf",
  Competition: "#f32170",
  Organization: "#eedd44",
  Certification: "#ff6b08",
  Award: "#f32170",
};

const timeline = [
  {
    year: 2025,
    dateSuffix: "— Present",
    type: "Work",
    role: "Junior Web Developer",
    org: "AIQUE Innovation Tech. Corp.",
    body: "Building the frontend for a travel and hotel booking platform. Ownership of design system components and page-level flows.",
  },
  {
    year: 2024,
    dateSuffix: "",
    type: "Work",
    role: "Front-end Developer Intern",
    org: "AIQUE Innovation Tech. Corp.",
    body: "Built 10+ pages for GalaGO! V2 over a 200-hour internship, focused on design consistency and user experience.",
  },
  {
    year: 2024,
    dateSuffix: "",
    type: "Competition",
    role: "Hackathon Finalist",
    org: "Placeholder — competition name",
    body: "Reached the finals of a 48-hour hackathon with a small team, shipping a working prototype in the last hour.",
  },
  {
    year: 2023,
    dateSuffix: "— 2024",
    type: "Organization",
    role: "President",
    org: "Placeholder — student org name",
    body: "Led the university coding club through a year of workshops, hack nights, and inter-school competitions.",
  },
  {
    year: 2023,
    dateSuffix: "",
    type: "Organization",
    role: "Member, Google Developer Student Clubs",
    org: "Placeholder — chapter name",
    body: "Contributed to campus outreach events and mentored first-year students getting started with web development.",
  },
  {
    year: 2023,
    dateSuffix: "",
    type: "Certification",
    role: "Frontend Development Certificate",
    org: "Placeholder — course provider",
    body: "Structured coursework covering modern React patterns, accessibility, and performance fundamentals.",
  },
  {
    year: 2022,
    dateSuffix: "",
    type: "Award",
    role: "Dean's Lister",
    org: "Placeholder — university name",
    body: "Recognised for academic performance across the semester's IT major coursework.",
  },
  {
    year: 2020,
    dateSuffix: "— 2024",
    type: "Education",
    role: "BS Information Technology",
    org: "Placeholder — university name",
    body: "Coursework spanning web systems, data structures, and applied machine learning.",
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

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease },
  }),
};

function CountUpYear({ target, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(target - 5);

  useEffect(() => {
    if (!inView) return;
    const start = target - 5;
    const end = target;
    const duration = 700;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(start + (end - start) * eased);
      setValue(current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

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
              key={`${entry.role}-${entry.year}-${i}`}
              className="timeline-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={item}
              custom={i}
            >
              <div className="timeline-date">
                <CountUpYear target={entry.year} />
                {entry.dateSuffix && (
                  <span className="timeline-date-suffix">
                    {" "}
                    {entry.dateSuffix}
                  </span>
                )}
              </div>
              <div className="timeline-marker">
                <div
                  className="timeline-dot"
                  style={{
                    background: typeColor[entry.type],
                    boxShadow: `0 0 0 4px ${typeColor[entry.type]}22`,
                  }}
                />
                <div className="timeline-line" />
              </div>
              <div className="timeline-content">
                <span
                  className="timeline-type"
                  style={{ color: typeColor[entry.type] }}
                >
                  {entry.type}
                </span>
                <div className="timeline-role">{entry.role}</div>
                <div className="timeline-org">{entry.org}</div>
                <ScrubbedText className="timeline-body">
                  {entry.body}
                </ScrubbedText>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

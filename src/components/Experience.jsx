import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrubbedText from "./ScrubbedText";
import WordReveal from "./WordReveal";
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
    year: 2026,
    dateSuffix: "— Present",
    type: "Work",
    role: "Data Solutions Engineer",
    org: "Docquity · Taguig City, BGC",
    body: "Wearing multiple hats — full-stack development, data engineering, data science, and client-facing analysis. Built an end-to-end web app on Next.js + FastAPI, owning architecture, frontend, backend, database, and deployment. Designed data models and pipelines for reporting. Presented Python + SQL analyses (including sales analysis) to clients, and shipped internal tools that cut down ad-hoc dev requests across the team.",
  },
  {
    year: 2025,
    dateSuffix: "— 2026",
    type: "Work",
    role: "Associate Web Developer",
    org: "Merck Group · Taguig City, BGC",
    body: "Designed and delivered custom website solutions that automate business processes and power data-driven applications. Partnered with stakeholders on technical designs aligned with governance and security standards.",
  },
  {
    year: 2024,
    dateSuffix: "— 2025",
    type: "Work",
    role: "Junior Full Stack Developer",
    org: "AIQUE Innovation Technology Corp. · Taguig City, BGC",
    body: "Built and maintained the booking platform and shipped v2 enhancements — filtering, sorting, authentication, and bundled bookings. Stack: React, Next.js, Tailwind, SCSS, NextUI, NestJS, Express, Framer Motion. Resolved critical front-end bugs and shipped consistently within sprint deadlines.",
  },
  {
    year: 2025,
    dateSuffix: "",
    type: "Award",
    role: "Highest Score, Internal Web Development Challenge",
    org: "AIQUE Innovation Technology Corp.",
    body: "Top score across all participants in AIQUE's internal web development challenge.",
  },
  {
    year: 2024,
    dateSuffix: "",
    type: "Work",
    role: "Web Developer Intern",
    org: "AIQUE Innovation Technology Corp. · Taguig City, BGC",
    body: "Optimized and redesigned 15+ pages using HTML, CSS, React, TypeScript, Tailwind, and SASS. Contributed to CMS development with Next.js and Postman for API testing.",
  },
  {
    year: 2022,
    dateSuffix: "",
    type: "Competition",
    role: "Gold Medalist — TESDA Skills Competition",
    org: "Web Technology, Regional & District",
    body: "Gold at both the Regional (September 2022) and District (June 2022) TESDA skills competitions in Web Technology.",
  },
  {
    year: 2021,
    dateSuffix: "— 2022",
    type: "Organization",
    role: "Vice-President for Communications",
    org: "ACM Student Chapter · T.I.P. Quezon City",
    body: "Coordinated with the Dean's office on chapter initiatives and official documentation. Managed communications channels for announcements, events, and deadlines.",
  },
  {
    year: 2020,
    dateSuffix: "— 2021",
    type: "Organization",
    role: "Jr Communications & Creatives Officer",
    org: "ACM Student Chapter · T.I.P. Quezon City",
    body: "Managed organizational communications and produced promotional materials in Adobe Photoshop for the chapter's social media presence.",
  },
  {
    year: 2020,
    dateSuffix: "— 2024",
    type: "Education",
    role: "BS Computer Science, Major in Data Science",
    org: "Technological Institute of the Philippines · Quezon City",
    body: "Magna Cum Laude (GPA 1.22). L.A.N.I Full Scholarship and T.I.P. Full Academic Scholar. Coursework in software engineering, algorithms, NLP, machine learning, and OOP.",
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
          <WordReveal as="h2" className="experience-heading" delayOffset={0.15}>
            Experience & education
          </WordReveal>
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

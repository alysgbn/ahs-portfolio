import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ScrubbedText from "./ScrubbedText";
import WordReveal from "./WordReveal";
import WebDeveloper from "../assets/images/WebDeveloper.png";
import Galago1 from "../assets/images/Galago1.png";
import AvatarLaptop from "../assets/images/avatar-laptop.png";
import AvatarLike from "../assets/images/avatar-like.png";
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
    image: AvatarLaptop,
    imageAlt: "Aliyah working on a laptop",
    imageCaption: "shipping full-stack + data",
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
    image: WebDeveloper,
    imageAlt: "AIQUE booking platform screenshot",
    imageCaption: "AIQUE · Travel + Hotel Booking",
  },
  {
    year: 2025,
    dateSuffix: "",
    type: "Award",
    role: "Highest Score, Internal Web Development Challenge",
    org: "AIQUE Innovation Technology Corp.",
    body: "Top score across all participants in AIQUE's internal web development challenge.",
    image: AvatarLike,
    imageAlt: "Celebratory avatar",
    imageCaption: "gold across the board",
  },
  {
    year: 2024,
    dateSuffix: "",
    type: "Work",
    role: "Web Developer Intern",
    org: "AIQUE Innovation Technology Corp. · Taguig City, BGC",
    body: "Optimized and redesigned 15+ pages using HTML, CSS, React, TypeScript, Tailwind, and SASS. Contributed to CMS development with Next.js and Postman for API testing.",
    image: Galago1,
    imageAlt: "GalaGO! travel product screenshot",
    imageCaption: "GalaGO! · redesigned 15+ pages",
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

function TimelineItem({ entry, i }) {
  const itemRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const rawImageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rawImageRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const imageOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.25, 0.75, 0.95],
    [0, 1, 1, 0]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0.05, 0.35, 0.75, 0.95],
    [0.85, 1, 1, 0.92]
  );

  const imageY = useSpring(rawImageY, { stiffness: 90, damping: 20 });
  const imageRotate = useSpring(rawImageRotate, {
    stiffness: 90,
    damping: 20,
  });

  const yearScale = useTransform(scrollYProgress, [0.3, 0.55], [1, 1.08]);
  const yearColor = useTransform(
    scrollYProgress,
    [0.3, 0.55],
    ["#8a8a8a", typeColor[entry.type] || "#ff6b08"]
  );

  const dotScale = useTransform(scrollYProgress, [0.25, 0.5], [1, 1.35]);
  const dotGlow = useTransform(
    scrollYProgress,
    [0.25, 0.5],
    [`0 0 0 4px ${typeColor[entry.type]}22`, `0 0 0 8px ${typeColor[entry.type]}44`]
  );

  return (
    <motion.div
      ref={itemRef}
      className={`timeline-item${entry.image ? " has-image" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={item}
      custom={i}
    >
      <motion.div
        className="timeline-date"
        style={{ scale: yearScale, color: yearColor }}
      >
        <CountUpYear target={entry.year} />
        {entry.dateSuffix && (
          <span className="timeline-date-suffix"> {entry.dateSuffix}</span>
        )}
      </motion.div>
      <div className="timeline-marker">
        <motion.div
          className="timeline-dot"
          style={{
            background: typeColor[entry.type],
            scale: dotScale,
            boxShadow: dotGlow,
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
        <ScrubbedText className="timeline-body">{entry.body}</ScrubbedText>
      </div>

      {entry.image && (
        <motion.figure
          className="timeline-image"
          style={{
            y: imageY,
            rotate: imageRotate,
            opacity: imageOpacity,
            scale: imageScale,
          }}
        >
          <div
            className="timeline-image-frame"
            style={{
              boxShadow: `0 30px 80px -30px ${typeColor[entry.type]}66, 0 8px 24px -12px rgba(0,0,0,0.4)`,
            }}
          >
            <img src={entry.image} alt={entry.imageAlt || ""} />
            <span
              className="timeline-image-badge"
              style={{ background: typeColor[entry.type] }}
              aria-hidden
            />
          </div>
          {entry.imageCaption && (
            <figcaption
              className="timeline-image-caption"
              style={{ color: typeColor[entry.type] }}
            >
              {entry.imageCaption}
            </figcaption>
          )}
        </motion.figure>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const timelineRef = useRef(null);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.6", "end 0.4"],
  });

  const smoothProgress = useSpring(timelineProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

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

        <div className="timeline" ref={timelineRef}>
          <motion.div
            className="timeline-progress"
            style={{ scaleY: smoothProgress }}
            aria-hidden
          />
          {timeline.map((entry, i) => (
            <TimelineItem
              key={`${entry.role}-${entry.year}-${i}`}
              entry={entry}
              i={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

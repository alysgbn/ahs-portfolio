import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import ScrubbedText from "./ScrubbedText";
import "../assets/css/manifesto.scss";

const ease = [0.23, 1, 0.32, 1];

export default function Manifesto() {
  const sectionRef = useRef(null);
  // The section pins while the words fill, so each word maps to a fixed
  // stretch of scroll: starts as the text rises in, done just before release.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "end end"],
  });

  return (
    <section ref={sectionRef} className="manifesto-section">
      <div className="manifesto-sticky">
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
        <ScrubbedText
          className="manifesto-text"
          progress={scrollYProgress}
          span={[0, 0.9]}
        >
          I notice what most people scroll past: an error the backend quietly
          swallows, a form that submits twice, a pipeline that drops a row. I
          like structure, numbers that add up, and work that holds up when
          someone looks closely. I hold my own work to that bar first, and
          raise it a little every time I ship.
        </ScrubbedText>
        <motion.div
          className="manifesto-signature"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          transition={{ duration: 0.55, delay: 0.3, ease }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Aliyah
        </motion.div>
      </div>
      </div>
    </section>
  );
}

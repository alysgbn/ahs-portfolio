import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultRoles = [
  "Data Solutions Engineer",
  "Full Stack Developer",
  "Data Scientist",
];

export default function RoleRotator({ roles = defaultRoles, interval = 2400 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, roles.length]);

  return (
    <div className="role-rotator" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

import React, { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@heroui/button";

import AvailabilityBadge from "./AvailabilityBadge";
import RoleRotator from "./RoleRotator";
import MagneticButton from "./MagneticButton";

import ReactLogo from "../assets/logos/ReactLogo.png";
import NextJSLogo from "../assets/logos/NextJSLogo.png";
import TypeScriptLogo from "../assets/logos/TypeScriptLogo.png";
import TailwindLogo from "../assets/logos/TailwindLogo.png";
import PostmanLogo from "../assets/logos/PostmanLogo.png";
import GithubLogo from "../assets/logos/GithubLogo.png";

import AvatarPortrait from "../assets/images/portfolio_avatar_2_transparent.png";
import AvatarLaptop from "../assets/images/portfolio_avatar_3_transparent.png";

import "../assets/css/hero-orbit.scss";

const ease = [0.23, 1, 0.32, 1];

const AVATAR_STATE_1 = AvatarPortrait;
const AVATAR_STATE_2 = AvatarLaptop;

// 6 icons distributed at 60° intervals around the full circle. Inner and
// outer offset by 60° so no two icons stack. Avoids putting anything
// directly at 270° (top), which is where the extended avatar's face lives.
const orbitConfig = [
  { logo: NextJSLogo, angle: 30, ring: "inner", alt: "Next.js" },
  { logo: TypeScriptLogo, angle: 150, ring: "inner", alt: "TypeScript" },
  { logo: PostmanLogo, angle: 210, ring: "inner", alt: "Postman" },
  { logo: TailwindLogo, angle: 330, ring: "outer", alt: "Tailwind" },
  { logo: GithubLogo, angle: 90, ring: "outer", alt: "GitHub" },
  { logo: ReactLogo, angle: 240, ring: "outer", alt: "React" },
];

// Fractions of stage width — icons START at .start radius (initial),
// drift OUT to .end radius on scroll. .end matches the visual ring width
// (88%/2 = 0.44 inner, 128%/2 = 0.64 outer) so at scroll-end the icons
// land exactly on the ring line.
const RADIUS_FRACTIONS = {
  inner: { start: 0.34, end: 0.44 },
  outer: { start: 0.5, end: 0.64 },
};

function OrbitIcon({ config, stageSize, progress, rotation, scale, opacity }) {
  const fractions = RADIUS_FRACTIONS[config.ring];

  // Each icon's actual angle = base angle + scroll-driven rotation, so as
  // the visitor scrolls the whole ring rotates and icons genuinely orbit
  // the avatar (as opposed to just drifting outward).
  const x = useTransform([progress, rotation], ([p, rot]) => {
    const angleRad = ((config.angle + rot) * Math.PI) / 180;
    const radius = stageSize * (fractions.start + p * (fractions.end - fractions.start));
    return Math.cos(angleRad) * radius;
  });

  const y = useTransform([progress, rotation], ([p, rot]) => {
    const angleRad = ((config.angle + rot) * Math.PI) / 180;
    const radius = stageSize * (fractions.start + p * (fractions.end - fractions.start));
    return Math.sin(angleRad) * radius;
  });

  return (
    <motion.div
      className="hero-orbit__icon"
      style={{ x, y, scale, opacity, translateX: "-50%", translateY: "-50%" }}
    >
      <img src={config.logo} alt={config.alt} />
    </motion.div>
  );
}

export default function HeroOrbit() {
  const stageRef = useRef(null);
  const reduced = useReducedMotion();
  const [stageSize, setStageSize] = useState(500);

  useLayoutEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => setStageSize(el.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll-driven: first ~250px of scroll transitions state 1 → state 2.
  const { scrollY } = useScroll();
  const progress = useTransform(
    scrollY,
    [0, reduced ? 100000 : 250],
    [0, 1]
  );

  // Subtle scroll-driven drift — icons nudge along the ring as you scroll
  // (~30° total), enough to feel alive without becoming a full revolution.
  const iconRotation = useTransform(
    scrollY,
    [0, reduced ? 100000 : 1000],
    [0, 30]
  );

  const avatar1Opacity = useTransform(progress, [0, 0.4, 0.6], [1, 0.5, 0]);
  const avatar2Opacity = useTransform(progress, [0.4, 0.6, 1], [0, 0.5, 1]);
  const avatarScale = useTransform(progress, [0, 1], [1, 1.4]);
  const avatarY = useTransform(progress, [0, 1], [0, -22]);

  const iconScale = useTransform(progress, [0, 1], [1, 1.24]);
  const iconOpacity = useTransform(progress, [0, 1], [1, 0.92]);

  const ringOpacity = useTransform(progress, [0, 1], [1, 0.85]);

  const leftDecorX = useTransform(progress, [0, 1], [-80, 0]);
  const leftDecorOpacity = useTransform(progress, [0, 0.4, 1], [0, 0.15, 0.55]);
  const rightDecorX = useTransform(progress, [0, 1], [80, 0]);
  const rightDecorOpacity = useTransform(progress, [0, 0.4, 1], [0, 0.15, 0.55]);

  return (
    <section className="hero-orbit">
      <div className="hero-orbit__orbs" aria-hidden>
        <div className="hero-orbit__orb hero-orbit__orb--pink" />
        <div className="hero-orbit__orb hero-orbit__orb--dark" />
        <div className="hero-orbit__orb hero-orbit__orb--peach" />
      </div>

      {!reduced && (
        <>
          <motion.div
            className="hero-orbit__decor hero-orbit__decor--left"
            style={{ x: leftDecorX, opacity: leftDecorOpacity }}
            aria-hidden
          >
            A
          </motion.div>
          <motion.div
            className="hero-orbit__decor hero-orbit__decor--right"
            style={{ x: rightDecorX, opacity: rightDecorOpacity }}
            aria-hidden
          >
            S
          </motion.div>
        </>
      )}

      <div className="hero-orbit__content">
        <div className="hero-orbit__text">
          <div className="hero-orbit__intro">
            <motion.div
              className="hero-orbit__meta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <p>Hey, I'm Aliyah</p>
              <AvailabilityBadge />
            </motion.div>

            <motion.div
              className="hero-orbit__role-wrap"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              <RoleRotator />
            </motion.div>
          </div>

          <motion.h1
            className="hero-orbit__tagline"
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
          >
            I build the stack.
          </motion.h1>

          <motion.p
            className="hero-orbit__lede"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.85, ease }}
          >
            I build full-stack web apps, data pipelines, and the analysis
            tools that connect them. Currently at Docquity — wearing hats
            across Next.js, FastAPI, Python, and SQL.
          </motion.p>

          <motion.div
            className="hero-orbit__buttons"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease }}
          >
            <MagneticButton style={{ display: "inline-flex" }}>
              <Button
                as="a"
                href="#about"
                radius="full"
                variant="bordered"
                className="hero-orbit__btn--outline"
              >
                About Me
              </Button>
            </MagneticButton>

            <MagneticButton style={{ display: "inline-flex" }}>
              <Button
                as="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                radius="full"
                className="hero-orbit__btn--primary shadow-lg"
              >
                Resume
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        <div className="hero-orbit__stage" ref={stageRef}>
          <motion.div
            className="hero-orbit__ring hero-orbit__ring--outer"
            style={{ opacity: ringOpacity }}
          />
          <motion.div
            className="hero-orbit__ring hero-orbit__ring--inner"
            style={{ opacity: ringOpacity }}
          />

          {orbitConfig.map((config, i) => (
            <OrbitIcon
              key={i}
              config={config}
              stageSize={stageSize}
              progress={progress}
              rotation={iconRotation}
              scale={iconScale}
              opacity={iconOpacity}
            />
          ))}

          <div className="hero-orbit__avatar-wrap">
            <motion.div
              className="hero-orbit__avatar"
              style={{ scale: avatarScale, y: avatarY }}
            >
              <motion.img
                src={AVATAR_STATE_1}
                alt="Aliyah Sagaban"
                className="hero-orbit__avatar-img"
                style={{ opacity: avatar1Opacity }}
              />
              <motion.img
                src={AVATAR_STATE_2}
                alt=""
                aria-hidden
                className="hero-orbit__avatar-img"
                style={{ opacity: avatar2Opacity }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@heroui/button";

import AvailabilityBadge from "./AvailabilityBadge";
import RoleRotator from "./RoleRotator";
import MagneticButton from "./MagneticButton";
import HeroNebula from "./HeroNebula";

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

const DEG_TO_RAD = Math.PI / 180;

// Wrapped in React.memo because the parent re-renders whenever stageSize
// changes; without memo the 6 icons all re-render even when only motion
// values (which don't need a re-render) have updated. All props are
// stable references (config from module-scope array, motion values are
// stable per-instance), so default shallow equality is enough.
const OrbitIcon = React.memo(function OrbitIcon({
  config,
  stageSize,
  progress,
  rotation,
  scale,
  opacity,
}) {
  const fractions = RADIUS_FRACTIONS[config.ring];

  // Precompute what doesn't need to recompute per frame. Only rotation and
  // progress change during scroll — angle-in-radians and the two radius
  // constants only change when the icon or stageSize does.
  const baseAngleRad = config.angle * DEG_TO_RAD;
  const radiusStart = stageSize * fractions.start;
  const radiusDelta = stageSize * (fractions.end - fractions.start);

  // Per frame: 2 multiplies, 1 add, 1 sin/cos. Was: 3 multiplies + 2
  // divides + 2 adds + trig, twice (once per axis).
  const x = useTransform([progress, rotation], ([p, rot]) =>
    Math.cos(baseAngleRad + rot * DEG_TO_RAD) * (radiusStart + p * radiusDelta)
  );

  const y = useTransform([progress, rotation], ([p, rot]) =>
    Math.sin(baseAngleRad + rot * DEG_TO_RAD) * (radiusStart + p * radiusDelta)
  );

  return (
    <motion.div
      className="hero-orbit__icon"
      style={{ x, y, scale, opacity, translateX: "-50%", translateY: "-50%" }}
    >
      <img src={config.logo} alt={config.alt} />
    </motion.div>
  );
});

export default function HeroOrbit() {
  const sectionRef = useRef(null);
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

  // PINNED scroll-scrubbed sequence. The section is tall (100vh sticky
  // child + 1500px scroll journey); scrollYProgress goes 0 → 1 across
  // the pin. Visitor can't proceed to the next section until they scroll
  // through the whole animation.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const staticProgress = useMotionValue(0);
  const progress = reduced ? staticProgress : scrollYProgress;

  // Subtle icon orbital drift (~45°) across the full pin.
  const iconRotation = useTransform(progress, [0, 1], [0, 45]);

  // Sequenced across the pinned range so each beat has its own moment.
  // Phase 1 (0 → 0.35): avatar cross-fade from portrait to laptop pose
  const avatar1Opacity = useTransform(progress, [0, 0.2, 0.35], [1, 0.5, 0]);
  const avatar2Opacity = useTransform(progress, [0.2, 0.35, 0.6], [0, 0.5, 1]);
  const avatarScale = useTransform(progress, [0, 0.5], [1, 1.08]);
  const avatarY = useTransform(progress, [0, 0.5], [0, -12]);

  // Phase 2 (0.2 → 0.7): icons drift outward + soften. Extended in Phase 4
  // (0.85 → 1.0) so icons and rings actively dim as the hero closes,
  // handing the user's attention off to the About section entering below.
  const iconScale = useTransform(progress, [0.2, 0.7], [1, 1.22]);
  const iconOpacity = useTransform(progress, [0.2, 0.7, 1], [1, 0.9, 0.35]);
  const ringOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.85, 0.15]);

  // Phase 3 (0.5 → 0.9): decor A/S letters slide in from the sides
  const leftDecorX = useTransform(progress, [0.5, 0.9], [-80, 0]);
  const leftDecorOpacity = useTransform(progress, [0.5, 0.7, 0.9, 1], [0, 0.3, 0.55, 0.25]);
  const rightDecorX = useTransform(progress, [0.5, 0.9], [80, 0]);
  const rightDecorOpacity = useTransform(progress, [0.5, 0.7, 0.9, 1], [0, 0.3, 0.55, 0.25]);

  // Phase 4 (0.85 → 1.0): the exit. Whole hero content fades + drifts up
  // as the pin releases. This "closes" the hero deliberately instead of
  // just letting sticky end, and creates a motion vector that About's
  // scroll-linked title entrance receives directly below.
  const contentOpacity = useTransform(progress, [0.85, 1], [1, 0.4]);
  const contentY = useTransform(progress, [0.85, 1], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className={`hero-orbit${reduced ? " hero-orbit--static" : ""}`}
    >
      <div className="hero-orbit__pin-track">
        <div className="hero-orbit__sticky">
          {/* Hero-scoped nebula: mesh + horizon + starfield + grain,
              rendered as an absolute layer inside the sticky so it stays
              confined to the hero section. Page-wide version is in
              components/NebulaBackground.jsx and can be re-enabled from
              src/index.js if you want to compare. */}
          <HeroNebula />

          {/* Original hero orbs kept commented out for reference — the
              nebula's mesh gradient now provides the ambient warm glow.
              <div className="hero-orbit__orbs" aria-hidden>
                <div className="hero-orbit__orb hero-orbit__orb--pink" />
                <div className="hero-orbit__orb hero-orbit__orb--dark" />
                <div className="hero-orbit__orb hero-orbit__orb--peach" />
              </div>
          */}

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

      <motion.div
        className="hero-orbit__content"
        style={{ opacity: contentOpacity, y: contentY }}
      >
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
      </motion.div>
        </div>
      </div>
    </section>
  );
}

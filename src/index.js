import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GradientBackdrop from "./components/GradientBackdrop";
// ===== HERO BACKGROUND OPTIONS =====
// Option 1 (active): GradientBackdrop — original blurred pink/dark/peach
//   orbs rendered page-wide. Requires `.hero-orbit__sticky` background:
//   transparent. Scroll-driven parallax + brightness ramp lives in
//   GradientBackdrop.jsx.
// Option 2: Page-wide NebulaBackground — swap the imports/renders below
//   AND set `.hero-orbit__sticky` background: transparent. There is also
//   a hero-scoped nebula (`<HeroNebula />` in HeroOrbit.jsx) which is a
//   variant of this option confined to the hero section.
// Option 3: Solid Background Hero — comment BOTH backdrops out below and
//   set `.hero-orbit__sticky` background: var(--hero-bg). Flat dark base
//   with just canvas stars from HeroNebula on top.
// Full toggle reference: `.hero-orbit__sticky` in hero-orbit.scss.
// import NebulaBackground from "./components/NebulaBackground";
// 1. import `HeroUIProvider` component
import { HeroUIProvider } from "@heroui/system";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <HeroUIProvider>
    <GradientBackdrop />
    {/* <NebulaBackground /> */}
    <App />
  </HeroUIProvider>
  // </React.StrictMode>
);

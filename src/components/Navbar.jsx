import React, { useEffect, useState } from "react";
import "../assets/css/navbar.scss";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Craft", href: "#craft" },
];

// Hysteresis thresholds: enter floating state past 80px, exit only below 24px.
// The gap prevents the state from flickering when scroll dwells near the boundary.
const ENTER = 80;
const EXIT = 24;

export default function MyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled((prev) => (prev ? y > EXIT : y > ENTER));
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="navbar-shell">
      <nav className={`navbar${scrolled ? " navbar--floating" : ""}`}>
        <a href="#top" className="navbar__brand" aria-label="Home">
          <span className="title">aly.</span>
        </a>

        <div
          className={`navbar__center${
            menuOpen ? " navbar__center--open" : ""
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="navbar__cta">
          Let's Connect
        </a>

        <button
          type="button"
          className={`navbar__menu-btn${
            menuOpen ? " navbar__menu-btn--open" : ""
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </nav>
    </div>
  );
}

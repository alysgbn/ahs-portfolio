import React from "react";
import "../assets/css/footer.scss";

const links = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Craft", href: "#craft" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-mark">aliyahworks</div>
          <div className="footer-tag">
            Frontend engineer sweating the small details from Manila.
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <div>© {year} Aliyah Sagaban. All rights reserved.</div>
        <div>Designed and built by Aliyah.</div>
      </div>
    </footer>
  );
}

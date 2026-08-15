import React from "react";
import "../assets/css/navbar.css";
import logo from "../assets/logos/my-logo-gray.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Craft", href: "#craft" },
];

export default function MyNavbar() {
  return (
    <Navbar shouldHideOnScroll maxWidth="xl" className="navbar">
      <NavbarBrand>
        <a
          href="#"
          className="flex items-center"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={logo}
            alt="aliyahworks logo"
            width={50}
            className="mr-2 object-fill"
          />
          <p className="font-bold text-inherit title">aliyahworks</p>
        </a>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navLinks.map((link) => (
          <NavbarItem key={link.href}>
            <a
              href={link.href}
              className="cursor-pointer hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <a
            href="#contact"
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            Let's Connect
          </a>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

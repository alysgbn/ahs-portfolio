import React from "react";
import "../assets/css/navbar.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router";
export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function MyNavbar() {
  return (
    <Navbar shouldHideOnScroll className="navbar">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit title">aliyahworks</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <button as={Link} color="primary" href="#" variant="flat">
            Journey
          </button>
        </NavbarItem>
        <NavbarItem isActive>
          <button as={Link} color="primary" href="#" variant="flat">
            Craft
          </button>
        </NavbarItem>
        <NavbarItem>
          <button as={Link} color="primary" href="#" variant="flat">
            Explore
          </button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {/* <Link href="#">Login</Link> */}
        </NavbarItem>
        <NavbarItem>
          <button as={Link} color="primary" href="#" variant="flat">
            Let's Connect
          </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

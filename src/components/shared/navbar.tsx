"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constant";
import { Menu, X } from "lucide-react";
import { useContact } from "@/lib/contact-context";

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsContactOpen } = useContact();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Your GSAP animations for logo and desktop nav
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".logo-animate",
        { x: -100, opacity: 0, visibility: "hidden" },
        {
          x: 0,
          opacity: 1,
          visibility: "visible",
          duration: 1,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        ".contact-animate",
        { x: 100, opacity: 0, visibility: "hidden" },
        {
          x: 0,
          opacity: 1,
          visibility: "visible",
          duration: 1,
          ease: "power3.out",
        },
        "<"
      );
    },
    { scope: navRef }
  );

  useGSAP(
    () => {
      const tl = gsap.timeline();
      const rlElements = gsap.utils.toArray(".rl");

      rlElements.forEach((rlElement, index) => {
        tl.fromTo(
          rlElement as HTMLElement,
          { x: index === 0 ? -100 : 100, opacity: 0, visibility: "hidden" },
          {
            x: 0,
            opacity: 1,
            duration: 3,
            visibility: "visible",
            ease: "power3.out",
          }
        );
      });

      tl.fromTo(
        ".element",
        {
          y: -100,
          opacity: 0,
          visibility: "hidden",
          stagger: { amount: 0.5, from: "start" },
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          visibility: "visible",
          ease: "power3.out",
          stagger: { amount: 0.5, from: "start" },
        }
      );
    },
    { scope: navRef }
  );

  return (
    <header className="overflow-x-hidden relative z-[999]">
      <nav className="py-3">
        <div className="container text-white/40 text-lg">
          <div
            className="nav-wrapper flex justify-between items-center"
            ref={navRef}
          >
            {/* Logo */}
            <div className="logo-animate invisible">
              <Link href="/">
                <Image
                  src={
                    pathname === "/about"
                      ? "/images/logo-white.png"
                      : "/images/logo-full.png"
                  }
                  alt="logo"
                  width={500}
                  height={300}
                  className="w-40 h-16 object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="element uppercase invisible lg:-ml-16 hidden lg:block">
              <ul className="flex gap-8 items-center">
                {navLinks.map((link) => {
                  const isActive = pathname === link.link;
                  return (
                    <li
                      key={link.link}
                      className={isActive ? "text-white" : ""}
                    >
                      <Link href={link.link}>{link.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Desktop Contact Button */}
            <div className="contact-animate invisible hidden lg:block">
              <Button
                onClick={() => setIsContactOpen(true)}
                className={`uppercase border border-white/20 ${
                  pathname === "/about"
                    ? "bg-white text-black hover:bg-white/80"
                    : ""
                } text-lg cursor-pointer`}
              >
                Contact
              </Button>
            </div>

            {/* Mobile Hamburger + Contact */}
            <div className="flex items-center gap-4 lg:hidden">
              <Button
                onClick={() => setIsContactOpen(true)}
                className="uppercase border border-white/20 text-sm px-4 py-1"
              >
                Contact
              </Button>
              <button onClick={toggleMobileMenu} className="">
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`
                fixed top-0 h-screen w-full lg:hidden bg-black/90 backdrop-blur-2xl pt-20
                duration-500 ease-in-out ${
                  mobileMenuOpen ? "left-0" : "left-[-100%]"
                }
              `}
            >
              <div className="flex flex-col items-center space-y-8 mt-10 w-full">
                {navLinks.map((link) => {
                  const isActive = pathname === link.link;
                  return (
                    <Link
                      key={link.link}
                      href={link.link}
                      className={`text-2xl ${
                        isActive ? "text-white" : "text-white/60"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="" onClick={toggleMobileMenu}>
                  <X className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

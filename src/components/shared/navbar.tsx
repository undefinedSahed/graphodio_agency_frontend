"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constant";
import { Menu } from "lucide-react";
import { useContact } from "@/lib/contact-context"


export default function Navbar() {
    const pathname = usePathname();
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileMenuTimeline = useRef<gsap.core.Timeline | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { setIsContactOpen } = useContact();

    // Animate logo & contact button from opposite directions
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            ".logo-animate",
            {
                x: -100,
                opacity: 0,
                visibility: "hidden",
            },
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
            {
                x: 100,
                opacity: 0,
                visibility: "hidden",
            },
            {
                x: 0,
                opacity: 1,
                visibility: "visible",
                duration: 1,
                ease: "power3.out",
            },
            "<" // Start at same time
        );
    }, { scope: navRef });

    // Animate nav links for desktop
    useGSAP(() => {
        const tl = gsap.timeline();
        const rlElements = gsap.utils.toArray(".rl");

        rlElements.forEach((rlElement, index) => {
            tl.fromTo(
                rlElement as HTMLElement,
                {
                    x: index === 0 ? -100 : 100,
                    opacity: 0,
                    visibility: "hidden",
                    ease: "power3.out",
                },
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
                ease: "power3.out",
                stagger: { amount: 0.5, from: "start" },
            },
            {
                y: 0,
                opacity: 1,
                visibility: "visible",
                duration: 1,
                ease: "power3.out",
                stagger: { amount: 0.5, from: "start" },
            }
        );
    }, { scope: navRef });

    // Mobile menu animation
    useGSAP(() => {
        mobileMenuTimeline.current = gsap.timeline({ paused: true })
            .to(mobileMenuRef.current, {
                x: 0,
                visibility: "visible",
                duration: 0.5,
                ease: "power3.out",
            });
    }, []);

    const toggleMobileMenu = () => {
        if (mobileMenuOpen) {
            mobileMenuTimeline.current?.reverse();
        } else {
            mobileMenuTimeline.current?.play();
        }
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="overflow-x-hidden relative z-[999]">
            <nav className="py-3">
                <div className="container text-white/40 text-lg">
                    <div
                        className="nav-wrapper flex justify-between items-center "
                        ref={navRef}
                    >
                        {/* Logo from Left */}
                        <div className="logo-animate invisible">
                            <Link href="/">
                                <Image
                                    src="/images/logo-full.png"
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
                                        <li key={link.link} className={`${isActive ? "text-white" : ""}`}>
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
                                className="uppercase border border-white/20 text-lg cursor-pointer"
                            >
                                Contact
                            </Button>
                        </div>

                        {/* Mobile Navigation - Hamburger and Contact Button */}
                        <div className="flex items-center gap-4 lg:hidden">
                            <Button
                                onClick={() => setIsContactOpen(true)}
                                className="uppercase border border-white/20 lg:text-lg cursor-pointer text-sm px-4 py-1"
                            >
                                Contact
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={toggleMobileMenu}
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </div>

                        {/* Mobile Menu Slide-in */}
                        <div
                            ref={mobileMenuRef}
                            className="fixed invisible h-svh translate-x-full right-0 top-0 w-full bg-black/90 z-40 backdrop-blur-2xl pt-20 lg:hidden"
                        >
                            <div className="flex flex-col items-center space-y-8 mt-10">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.link;
                                    return (
                                        <Link
                                            key={link.link}
                                            href={link.link}
                                            className={`text-2xl ${isActive ? "text-white" : "text-white/60"}`}
                                            onClick={toggleMobileMenu}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
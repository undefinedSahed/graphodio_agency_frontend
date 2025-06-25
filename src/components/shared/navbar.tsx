"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { Button } from '../ui/button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/lib/constant'

export default function Navbar() {
    const pathname = usePathname()
    const navRef = useRef(null)

    useGSAP(() => {
        gsap.fromTo(
            ".element",
            {
                y: -100,
                opacity: 0,
                visibility: "hidden" // ensure it's not briefly shown
            },
            {
                y: 0,
                opacity: 1,
                visibility: "visible",
                delay: 1.5,
                duration: 1,
                ease: "power3.out",
                stagger: {
                    amount: 0.5,
                    from: "start"
                }
            }
        )
    }, { scope: navRef })

    return (
        <header>
            <nav className='py-3'>
                <div className="container text-white/40 text-lg">
                    <div
                        className="nav-wrapper flex justify-between items-center"
                        ref={navRef}
                    >
                        <div className="element invisible">
                            <Image
                                src="/images/logo-full.png"
                                alt="logo"
                                width={500}
                                height={300}
                                className='w-40 h-16 object-contain'
                            />
                        </div>
                        <div className="element uppercase invisible">
                            <ul className='flex gap-8 items-center'>
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.link;
                                    return (
                                        <li key={link.link} className={`${isActive ? "text-white" : ""}`}>
                                            <Link href={link.link}>
                                                {link.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="element invisible">
                            <Button className='uppercase border border-white/20 text-lg'>
                                Contact
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

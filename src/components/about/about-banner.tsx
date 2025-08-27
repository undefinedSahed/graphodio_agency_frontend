"use client"

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function AboutBanner() {

    const aboutRef = useRef<HTMLElement | null>(null)

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(aboutRef.current,
            {
                opacity: 0,
                y: 200,
                duration: 1,
                ease: "power2.out",
                visibility: "invisible"
            },
            {
                opacity: 1,
                y: 0,
                visibility: "visible",
                ease: "power2.out",
                duration: 1
            });
    }, { scope: aboutRef })


    return (
        <section 
            className="lg:min-h-screen flex items-center justify-center text-white relative z-10 bg-black invisible lg:-mt-20 py-20 lg:py-0" 
            ref={aboutRef}
        >
        
            
            {/* Video */}
            <video 
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/video/about-banner.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
            />
        </section>
    )
}

"use client";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { User, Building2 } from 'lucide-react';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {

    const sectionRef = useRef<HTMLElement | null>(null);

    useGSAP(() => {

        const elements = sectionRef.current?.querySelectorAll(".animate-group");

        gsap.from(elements as NodeListOf<HTMLElement>, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            filter: "blur(6px)",
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=800",
                scrub: 8,
                pin: true,
                
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="h-screen flex justify-center items-center text-white font-extralight"
        >
            <div className="container text-center px-4">
                <p className="text-5xl leading-snug max-w-2xl mx-auto flex flex-wrap justify-center gap-3 main_text">
                    <span className="animate-group">I</span>
                    <span className="animate-group">work</span>
                    <span className="animate-group">with</span>

                    <span className="animate-group flex items-center gap-2">
                        <span>individuals</span>
                        <span className="inline-flex justify-center items-center w-14 h-14 border-2 border-[#1b1b1b] rounded-full">
                            <User className="w-6 h-6 animate-bounce" />
                        </span>
                    </span>

                    <span className="animate-group">
                        and
                    </span>

                    <span className="animate-group flex items-center gap-2">
                        <span>studios</span>
                        <span className="inline-flex justify-center items-center w-14 h-14 border-2 border-[#1b1b1b] rounded-full">
                            <User className="w-6 h-6 animate-bounce" />
                        </span>
                    </span>

                    <span className="animate-group flex items-center gap-2">
                        <span>companies</span>
                        <span className="inline-flex justify-center items-center w-14 h-14 border-2 border-[#1b1b1b] rounded-full">
                            <Building2 className="w-6 h-6 animate-bounce" />
                        </span>
                    </span>

                    <span className="animate-group">to</span>
                    <span className="animate-group">turn</span>
                    <span className="animate-group">their</span>
                    <span className="animate-group">vision</span>
                    <span className="animate-group">into</span>
                    <span className="animate-group">powerful</span>
                    <span className="animate-group">websites.</span>
                </p>
            </div>
        </section>
    );
}

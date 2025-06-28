"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function HowWeWork() {
    const sectionRef = useRef(null)

    useGSAP((context) => {
        const q = context.selector;
        const elements = q && q(".elem");

        // ✅ Pin the whole section during scroll
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=900", // adjust as needed
            pin: true,
            scrub: 4,
            markers: true,
        });

        // ✅ Then animate each .elem like before
        elements.forEach((element: HTMLElement, index: number) => {
            const progress = element.querySelector(".progress");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top 70%",
                    end: "+=400",
                    scrub: 4,
                    markers: true,
                },
            });

            // 1. Progress
            tl.fromTo(
                progress,
                { strokeDashoffset: 565.48 },
                { strokeDashoffset: 0, duration: 1 }
            );

            // 2. x/y Motion
            tl.to(element, {
                y: 150,
                x: index === 0 ? 150 : -150,
                duration: 1,
            });
        });
    }, { scope: sectionRef });

    return (
        <section className='h-screen flex justify-center items-center relative hwww' ref={sectionRef}>
            <div className="container text-white text-center -mt-28">
                <h2 className='text-[64px] font-bold leading-tight text-center pb-12 max-w-2xl mx-auto'>I build websites at the intersection of:</h2>
                <div className="flex justify-center">
                    {/* 1st element */}
                    <div className="relative h-64 w-64 rounded-full flex justify-center items-center elem">
                        <svg className="absolute w-full h-full scale-[140%] rotate-[270deg]">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="90"
                                stroke="transparent"
                                strokeWidth="2"
                                fill="transparent"
                            />
                            <circle
                                className="progress"
                                cx="50%"
                                cy="50%"
                                r="90"
                                stroke="#1b1b1b"
                                strokeWidth="2"
                                fill="transparent"
                                strokeDasharray="565.48"
                                strokeDashoffset="565.48"
                            />
                        </svg>
                        <span className="z-10">Research</span>
                    </div>

                    {/* 2nd (no .elem class, no animation) */}
                    <div className="relative h-64 w-64 rounded-full flex justify-center items-center">
                        <svg className="absolute w-full h-full scale-[140%] rotate-[270deg]">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="90"
                                stroke="#1b1b1b"
                                strokeWidth="2"
                                fill="transparent"
                            />
                            <circle
                                className="progress"
                                cx="50%"
                                cy="50%"
                                r="90"
                                stroke="#1b1b1b"
                                strokeWidth="2"
                                fill="transparent"
                                strokeDasharray="565.48"
                                strokeDashoffset="565.48"
                            />
                        </svg>
                        <span className="z-10">Research</span>
                    </div>

                    {/* 3rd element */}
                    <div className="relative h-64 w-64 rounded-full flex justify-center items-center elem">
                        <svg className="absolute w-full h-full scale-[140%] rotate-[270deg]">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="90"
                                stroke="transparent"
                                strokeWidth="2"
                                fill="transparent"
                            />
                            <circle
                                className="progress"
                                cx="50%"
                                cy="50%"
                                r="90"
                                stroke="#1b1b1b"
                                strokeWidth="2"
                                fill="transparent"
                                strokeDasharray="565.48"
                                strokeDashoffset="565.48"
                            />
                        </svg>
                        <span className="z-10">Research</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

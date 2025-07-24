"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { NotebookPen } from 'lucide-react'
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function HowWeWork() {
    const sectionRef = useRef(null)

    useGSAP((context) => {
        const q = context.selector;
        const elements = q && q(".elem");

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1200",
            pin: true,
            scrub: 2,
        });

        elements.forEach((element: HTMLElement, index: number) => {
            const progress = element.querySelector(".progress");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top 10%",
                    end: "+=800",
                    scrub: 2,
                },
            });

            tl.fromTo(
                progress,
                { strokeDashoffset: 565.48 },
                { strokeDashoffset: 0, duration: 1 }
            );

            tl.fromTo(element,
                {
                    y: 0,
                    x: index === 0 ? 30 : -30,
                    duration: 1,
                },
                {
                    y: 150,
                    x: index === 0 ? 150 : -150,
                    duration: 1,
                }
            );  
        });
    }, { scope: sectionRef });

    return (
        <section className='h-screen flex justify-center items-center relative hwww' ref={sectionRef}>
            <div className="container text-white text-center -mt-32">
                <h2 className='text-[64px] font-bold leading-tight text-center pb-12 max-w-2xl mx-auto'>We Create at the intersection of:</h2>
                <div className="flex justify-center">
                    <div className="relative h-64 w-64 translate-x-[30px] rounded-full flex justify-center items-center elem">
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
                        <span className="z-10 flex flex-col gap-2 justify-center items-center">
                            <div className="h-16 w-16 flex justify-center items-center border-2 border-[#1b1b1b] rounded-full">
                                <NotebookPen className='animate-bounce' />
                            </div>
                            <span> Design</span>
                        </span>
                    </div>

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
                        <span className="z-10 flex flex-col gap-2 justify-center items-center">
                            <div className="h-16 w-16 flex justify-center items-center border-2 border-[#1b1b1b] rounded-full">
                                <NotebookPen className='animate-bounce' />
                            </div>
                            <span> Brand</span>
                        </span>
                    </div>

                    <div className="relative h-64 w-64 -translate-x-[30px] rounded-full flex justify-center items-center elem">
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
                        <span className="z-10 flex flex-col gap-2 justify-center items-center">
                            <div className="h-16 w-16 flex justify-center items-center border-2 border-[#1b1b1b] rounded-full">
                                <NotebookPen className='animate-bounce' />
                            </div>
                            <span> Strategy</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
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

        if (aboutRef.current) {
            tl.from(aboutRef.current.querySelector('.text_start'),
                {
                    x: "40%",
                    opacity: 0,
                    y: -150,
                    duration: 1,
                    ease: "power2.out",
                    visibility: "invisible"
                });

            tl.from(aboutRef.current.querySelector('.animate_logo'),
                {
                    x: "-40%",
                    opacity: 0,
                    y: -150,
                    duration: 1,
                    ease: "power2.out",
                    visibility: "invisible"
                }, "<0");
        }
    }, { scope: aboutRef })


    return (
        <section 
            className="lg:min-h-screen flex lg:place-items-end place-items-center pb-20 justify-center text-white bg-[url('/images/map.png')] relative z-10 bg-cover bg-center invisible lg:-mt-20 py-20 lg:py-0" 
            ref={aboutRef}
        >
            <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
            <div className="container">
                <div className="flex flex-col lg:flex-row justify-between lg:items-end items-center">
                    <div className="max-w-xl text_start lg:order-1 order-2">
                        <p 
                          className="text-lg lg:text-5xl lg:pb-12 font-bold text-gray-300 text-center lg:text-start"
                        >
                            GRAPHODIO is a full-service creative agency delivering impactful solutions in design, branding, web development, content, and beyond.
                        </p>
                    </div>
                    <div className="max-w-md text-end animate_logo lg:order-2 order-1">
                        <Image
                            src="/images/logo.png"
                            alt="Graphodio Logo"
                            width={1000}
                            height={1000}
                            className="lg:w-[500px] w-[300px] lg:h-[300px] h-[150px] object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

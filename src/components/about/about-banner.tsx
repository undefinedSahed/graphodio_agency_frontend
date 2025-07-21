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
        <section className="min-h-screen flex place-items-end pb-20 justify-center text-white bg-[url('/images/map.png')] relative z-10 bg-cover bg-center invisible -mt-20" ref={aboutRef}>
            <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
            <div className="container">
                <div className="flex justify-between items-end">
                    <div className="max-w-xl text_start">
                        <p className="text-lg lg:text-6xl font-bold text-gray-300">
                            I&apos;m Eliot, Freelance Webdesigner & Webflow developer Based in Lyon, France
                        </p>
                    </div>
                    <div className="max-w-md text-end animate_logo">
                        <Image
                            src="/images/logo.png"
                            alt="Graphodio Logo"
                            width={1000}
                            height={1000}
                            className="w-[500px] h-[300px] object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

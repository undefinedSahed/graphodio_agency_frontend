"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'


export default function AboutBanner() {

    const aboutRef = useRef(null)

    useGSAP(() => {

        const tl = gsap.timeline();

        tl.fromTo(aboutRef.current, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 1
        });

    }, { scope: aboutRef })


    return (
        <section className="min-h-screen flex place-items-end pb-20 justify-center text-white bg-[url('/images/map.png')] bg-cover bg-center z-10 absolute top-0 w-full" ref={aboutRef}>
            <div className="absolute inset-0 w-full h-full bg-black opacity-50 -z-10"></div>
            <div className="container">
                <div className="flex justify-between items-end">
                    <div className="max-w-xl">
                        <p className="text-lg lg:text-6xl font-bold text-gray-300">
                            I&apos;m Eliot, Freelance Webdesigner & Webflow developer Based in Lyon, France
                        </p>
                    </div>
                    <div className="max-w-md text-end">
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

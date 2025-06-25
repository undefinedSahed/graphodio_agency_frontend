"use client"

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

export default function Banner() {
    const bannerRef = useRef(null)

    useGSAP(() => {
        const headlineSplit = new SplitText(".headline", { type: "words" });
        const paraSplit = new SplitText(".para", { type: "lines" });

        // 1. Make each word of the headline HUGE and invisible initially
        gsap.set(headlineSplit.words, {
            opacity: 0,
            scale: 5,
        });

        const tl = gsap.timeline();

        // 2. Animate each word in from huge size to normal one by one
        tl.to(headlineSplit.words, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.3,
        });

        // 4. Animate the paragraph line by line
        tl.from(paraSplit.lines, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
        }, "+=0.2");

    }, { scope: bannerRef });

    return (
        <section className="py-10 text-white/90 flex justify-center" ref={bannerRef}>
            <div className="container">
                <div className="text-center max-w-lg mx-auto">
                    <h1 className="headline text-[72px] font-bold leading-tight text-center pb-4">
                        Crafting Bold & Memorable Websites
                    </h1>
                    <p className="para px-4 md:px-12 text-xl">
                        I&apos;m Eliot, Freelance Webdesigner & Webflow developer since 2018. Based in Lyon, France
                    </p>
                </div>
            </div>
        </section>
    )
}

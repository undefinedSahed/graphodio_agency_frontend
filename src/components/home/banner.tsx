"use client"

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

export default function Banner() {
    const bannerRef = useRef(null)

    useGSAP(() => {

        const splitedHeadline = SplitText.create(".headline", { type: "words" })
        const splitedParagraph = SplitText.create(".para", { type: "lines" })


        const tl = gsap.timeline();

        tl.fromTo(splitedHeadline.words,
            {
                y: 140,
                opacity: 0,
                duration: 1,
                stagger: {
                    amount: 0.5,
                    from: "start"
                },
                fontSize: 120,
            },
            {
                y: 100,
                opacity: 0.5,
                duration: 1,
                stagger: {
                    amount: 0.5,
                    from: "start"
                },
                fontSize: 120
            }
        )

        tl.to(splitedHeadline.words,
            {
                opacity: 1,
                duration: 0.2
            }
        )

        tl.to(".headline",
            {
                y: -150,
                duration: 0.6,
                scale: 0.5
            }
        )

        tl.fromTo(splitedParagraph.lines,
            {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
            },
            {
                y: -180,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2
            }
        )

    }, { scope: bannerRef });

    return (
        <>
            <section className="py-10 text-white/90 flex justify-center h-screen" ref={bannerRef}>
                <div className="container">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="headline text-[72px] font-bold leading-tight text-center pb-4">
                            Crafting Bold & Memorable Websites
                        </h1>
                        <p className="para px-4 md:px-64 text-xl">
                            I&apos;m Eliot, Freelance Webdesigner & Webflow developer since 2018. Based in Lyon, France
                        </p>
                    </div>
                </div>
            </section>
            <div className="h-[1000px] w-full"></div>
        </>
    )
}

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
                visibility: "hidden",
                duration: 1.2,
                delay: 1.5,
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
                visibility: "visible",
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
                visibility: "hidden",
                duration: 0.5,
                stagger: 0.2,
            },
            {
                y: -180,
                opacity: 1,
                visibility: "visible",
                duration: 0.5,
                stagger: 0.2
            }
        )

    }, { scope: bannerRef });

    return (
        <>
            <section className="py-10 text-white/90 flex justify-center" ref={bannerRef}>
                <div className="container">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="headline invisible text-[60px] font-bold leading-tight text-center pb-4">
                            Crafting Visuals That Make Your Brand Stand Out
                        </h1>
                        <p className="para invisible px-4 md:px-64 text-base">
                            At Graphodio, we are a full-service creative agency driven by innovation, passion, and a commitment to delivering exceptional design solutions. Since our inception, we’ve been transforming ideas into stunning visuals, building brands that resonate, and creating experiences that leave a lasting impact.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

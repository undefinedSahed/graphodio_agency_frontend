"use client"

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

export default function Banner() {
    const bannerRef = useRef(null)

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add({
            // Desktop: min-width 768px and up
            isDesktop: "(min-width: 768px)",

            // Mobile: max-width 767px
            isMobile: "(max-width: 767px)"
        }, (context) => {
            const isMobile = context.conditions?.isMobile ?? false;

            const splitedHeadline = SplitText.create(".headline", { type: "words" });
            const splitedParagraph = SplitText.create(".para", { type: "lines" });

            const tl = gsap.timeline();

            // Headline animation
            tl.fromTo(splitedHeadline.words,
                {
                    y: isMobile ? 80 : 140,
                    opacity: 0,
                    visibility: "hidden",
                    duration: 1.2,
                    delay: 1.5,
                    stagger: {
                        amount: 0.5,
                        from: "start"
                    },
                    fontSize: isMobile ? 48 : 120,
                },
                {
                    y: isMobile ? 40 : 100,
                    opacity: 0.5,
                    duration: 1,
                    visibility: "visible",
                    stagger: {
                        amount: 0.5,
                        from: "start"
                    },
                    fontSize: isMobile ? 48 : 120
                }
            );

            tl.to(splitedHeadline.words, {
                opacity: 1,
                duration: 0.2
            });

            tl.to(".headline", {
                y: isMobile ? -60 : -150,
                duration: 0.6,
                scale: isMobile ? 0.8 : 0.5
            });

            // Paragraph animation
            tl.fromTo(splitedParagraph.lines,
                {
                    y: isMobile ? 50 : 100,
                    opacity: 0,
                    visibility: "hidden",
                    duration: 0.5,
                    stagger: 0.2,
                },
                {
                    y: isMobile ? -60 : -180,
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.5,
                    stagger: 0.2
                }
            );
        });

        return () => mm.revert(); // clean up matchMedia listeners
    }, { scope: bannerRef });

    return (
        <section className="py-10 text-white/90 flex justify-center" ref={bannerRef}>
            <div className="container">
                <div className="text-center max-w-6xl mx-auto">
                    <h1 className="headline invisible text-[60px] font-bold lg:leading-tight leading-[50px] text-center lg:pb-4 pb-7">
                        Crafting Visuals That Make Your Brand Stand Out
                    </h1>
                    <p className="para invisible px-4 md:px-64 text-base text-center">
                        At Graphodio, we are a full-service creative agency driven by innovation, passion, and a commitment to delivering exceptional design solutions. Since our inception, we’ve been transforming ideas into stunning visuals, building brands that resonate, and creating experiences that leave a lasting impact.
                    </p>
                </div>
            </div>
        </section>
    )
}

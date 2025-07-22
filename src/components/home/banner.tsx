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
        <section className="lg:py-10 py-16 text-white/90 flex justify-center" ref={bannerRef}>
            <div className="container">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="headline invisible lg:text-[72px] font-bold leading-tight text-center pb-4">
                        Crafting Bold & Memorable Websites
                    </h1>
                    <p className="para invisible px-4 md:px-64 text-xl">
                        I&apos;m Eliot, Freelance Webdesigner & Webflow developer since 2018. Based in Lyon, France
                    </p>
                </div>
            </div>
        </section>
    )
}

"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import Image from 'next/image'; // for Next.js

export default function Hero() {
    const bannerRef = useRef(null);

    useGSAP(() => {
        const splitedHeadline = SplitText.create(".headline", { type: "words" });
        const splitedParagraph = SplitText.create(".para", { type: "lines" });

        const tl = gsap.timeline();

        // Animate logo
        tl.fromTo(
            ".logo",
            {
                y: 100,
                opacity: 0,
                scale: 0.8,
                visibility: "hidden",
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                visibility: "visible",
                duration: 1.2,
                ease: "power3.out",
                onComplete: () => {
                    const logoContainer = document.querySelector(".logo-container") as HTMLElement;
                    if (logoContainer) {
                        logoContainer.style.marginBottom = "6rem";
                    }

                    gsap.to(".logo", {
                        rotateY: 180,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",
                    });
                }
            }
        );

        // Animate headline words
        tl.fromTo(
            splitedHeadline.words,
            {
                y: 140,
                opacity: 0,
                visibility: "hidden",
                duration: 1.2,
                delay: 0.5,
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
        );

        tl.to(splitedHeadline.words, {
            opacity: 1,
            duration: 0.2
        });

        // Animate headline movement and spacing
        tl.to(".headline", {
            y: -150,
            duration: 0.6,
            scale: 0.5,
            onComplete: () => {
                const headline = document.querySelector(".headline") as HTMLElement;
                if (headline) {
                    headline.style.marginBottom = "3rem";
                }
            }
        });

        // Animate paragraph lines
        tl.fromTo(
            splitedParagraph.lines,
            {
                y: 100,
                opacity: 0,
                visibility: "hidden",
                duration: 0.8,
                stagger: 0.2,
            },
            {
                y: -180,
                opacity: 1,
                visibility: "visible",
                duration: 0.8,
                stagger: 0.2
            }
        );
    }, { scope: bannerRef });

    return (
        <>
            <section className="py-10 text-white/90 flex justify-center h-screen" ref={bannerRef}>
                <div className="container">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Logo */}
                        <div
                            className="logo-container flex justify-center mb-12"
                            style={{ perspective: "1000px" }} 
                        >
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={100}
                                height={100}
                                className="logo object-contain"
                                style={{ transformStyle: "preserve-3d" }} 
                            />
                        </div>

                        {/* Headline */}
                        <h1 className="headline invisible text-[72px] font-bold leading-tight text-center pb-4">
                            Portfolio
                        </h1>

                        {/* Paragraph */}
                        <p className="para invisible px-4 md:px-64 text-xl">
                            Ready-made templates for powerful websites that stand out.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

"use client";

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import Image from 'next/image';

export default function Hero() {
    const bannerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useGSAP(() => {
        const splitedHeadline = SplitText.create(".headline", { type: "words" });
        const splitedParagraph = SplitText.create(".para", { type: "lines" });

        const tl = gsap.timeline({
            onStart: () => setIsLoading(false), // Hide skeleton when animation starts
        });

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

    // Skeleton Loader Component
    const SkeletonLoader = () => (
        <div className="skeleton-container animate-pulse">
            <div className="text-center max-w-4xl mx-auto">
                {/* Logo Skeleton */}
                <div className="flex justify-center mb-12">
                    <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
                </div>

                {/* Headline Skeleton */}
                <div className="flex justify-center mb-8">
                    <div className="h-12 bg-gray-700 rounded w-64"></div>
                </div>

                {/* Paragraph Skeleton */}
                <div className="px-4 md:px-64 space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto"></div>
                    <div className="h-4 bg-gray-700 rounded w-4/6 mx-auto"></div>
                </div>

                {/* Video Placeholder Skeleton */}
                <div className="mt-12 px-4 md:px-32">
                    <div className="aspect-video bg-gray-700 rounded-lg w-full"></div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <section className="pt-5 text-white/90 flex justify-center" ref={bannerRef}>
                <div className="container">
                    {isLoading ? (
                        <SkeletonLoader />
                    ) : (
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
                            <p className="para invisible px-4 md:px-64 text-l font-[Roboto]">
                                Ready-made templates for powerful websites that stand out.
                            </p>

                            {/* Video Section - Add your video here */}
                            <div className="mt-12 px-4 md:px-32">
                                {/* Add your video component here */}
                                <video
                                    className="w-full rounded-lg shadow-2xl"
                                    controls
                                    preload="metadata"
                                    poster="/images/video-poster.jpg" // Add a poster image
                                >
                                    <source src="/videos/portfolio-demo.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
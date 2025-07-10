"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRightCircle, MessageCircle } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            role: "Web Developer, Tech Company",
            comment:
                "Working with this team was a game-changer for our project. Their attention to detail and creativity is unmatched. Their ability to bring our vision to life was incredible. The final product exceeded our expectations. A fantastic experience from start to finish. They understood our needs and delivered a top-notch website.",
            image: "/images/logo.png",
        },
        {
            id: 2,
            name: "Jane Smith",
            role: "Creative Director, Design Studio",
            comment:
                "Their ability to bring our vision to life was incredible. The final product exceeded our expectations. A fantastic experience from start to finish. They understood our needs and delivered a top-notch website. Working with this team was a game-changer for our project. Their attention to detail and creativity is unmatched.",
            image: "/images/logo.png",
        },
        {
            id: 3,
            name: "Alice Johnson",
            role: "Product Manager, Startup",
            comment:
                "A fantastic experience from start to finish. They understood our needs and delivered a top-notch website. Working with this team was a game-changer for our project. Their attention to detail and creativity is unmatched.",
            image: "/images/logo.png",
        },
        {
            id: 4,
            name: "Bob Brown",
            role: "CEO, E-commerce Business",
            comment:
                "The team was professional and efficient. Our new website has significantly improved our online presence. They understood our needs and delivered a top-notch website. Working with this team was a game-changer for our project. Their attention to detail and creativity is unmatched.",
            image: "/images/logo.png",
        },
    ];

    const secRef = useRef<HTMLElement | null>(null);

    useGSAP(
        (context) => {
            const q = context.selector;
            if (q) {
                const testimonialsElements = q(".fade_comment");
                const stuckTextElement = q(".stuck_text");

                // Pin the left text
                if (stuckTextElement) {
                    gsap.to(stuckTextElement, {
                        scrollTrigger: {
                            trigger: secRef.current,
                            start: "top 20%",
                            end: "bottom 80%",
                            pin: stuckTextElement,
                            pinSpacing: false,
                            scrub: 1,
                        },
                    });
                }

                // Animate testimonials fade in/out
                if (testimonialsElements) {
                    testimonialsElements.forEach((element: HTMLElement) => {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: element,
                                start: "top 55%",
                                end: "bottom 15%",
                                scrub: 1,
                                toggleActions: "play reverse play reverse",
                            },
                        })
                            .fromTo(
                                element,
                                { opacity: 0.2 },
                                { opacity: 1, duration: 0.5 }
                            )
                            .to(element, { opacity: 0.2, duration: 0.5 });
                    });
                }
            }
        },
        { scope: secRef }
    );

    return (
        <section
            className="relative min-h-screen w-full py-8 lg:py-20"
            ref={secRef}
        >
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left sticky text */}
                    <div className="lg:sticky lg:top-24 h-fit self-start">
                        <p className="text-6xl leading-snug flex flex-wrap gap-3 stuck_text">
                            <span>Kind words</span>
                            <span className="inline-flex mt-2 justify-center items-center w-14 h-14 border-2 border-[#1b1b1b] rounded-full">
                                <MessageCircle className="w-6 h-6 animate-bounce" />
                            </span>
                            <span>from peers, <br /> partners and clients</span>
                        </p>
                    </div>

                    {/* Testimonials */}
                    <div className="space-y-20">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id}>
                                <div className="fade_comment opacity-20 flex items-start gap-5">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <ArrowRightCircle className="h-5 w-5" />
                                        <span className="text-lg font-semibold">
                                            {testimonial.id}
                                        </span>
                                    </div>
                                    <div className="">
                                        <h3 className="text-xl tracking-wide font-medium leading-relaxed">
                                            {testimonial.comment}
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                width={100}
                                                height={100}
                                                className="h-16 w-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="text-lg font-semibold">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
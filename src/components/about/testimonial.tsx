"use client";

import { testimonials } from "@/lib/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRightCircle, MessageCircle } from "lucide-react";
import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
    const secRef = useRef<HTMLElement | null>(null);

    useGSAP(
        (context) => {
            // Only apply GSAP animations on larger screens
            if (window.innerWidth >= 1024) {
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
            }
        },
        { scope: secRef }
    );

    return (
        <section
            className="relative w-full py-8 lg:py-20"
            ref={secRef}
        >
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left sticky text - shown only on lg screens */}
                    <div className="hidden lg:block lg:sticky lg:top-24 h-fit self-start">
                        <p className="text-4xl sm:text-5xl lg:text-6xl leading-snug flex flex-wrap gap-3 stuck_text">
                            <span>Kind words</span>
                            <span className="inline-flex mt-2 justify-center items-center w-12 h-12 lg:w-14 lg:h-14 border-2 border-[#1b1b1b] rounded-full">
                                <MessageCircle className="lg:w-6 lg:h-6 animate-bounce" />
                            </span>
                            <span>from peers, <br /> partners and clients</span>
                        </p>
                    </div>

                    {/* Mobile header - shown only on small screens */}
                    <div className="lg:hidden mb-8 mx-auto">
                        <p className="text-2xl leading-snug flex flex-wrap gap-3 text-center">
                            <span>Kind words</span>
                            <span className="inline-flex justify-center items-center w-8 h-8 border-2 border-[#1b1b1b] rounded-full">
                                <MessageCircle className="w-3 h-3 animate-bounce" />
                            </span>
                            <span>from peers, partners and clients</span>
                        </p>
                    </div>

                    {/* Testimonials */}
                    <div className="space-y-12 lg:space-y-20">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id}>
                                <div className="lg:fade_comment lg:opacity-20 flex items-start gap-3 lg:gap-5">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <ArrowRightCircle className="h-4 w-4 lg:h-5 lg:w-5" />
                                        <span className="text-base lg:text-lg font-semibold">
                                            {testimonial.id}
                                        </span>
                                    </div>
                                    <div className="space-y-3 lg:space-y-5">
                                        <h3 className="text-lg text-justify lg:text-start lg:text-xl tracking-wide font-medium leading-relaxed">
                                            {testimonial.comment}
                                        </h3>
                                        <div className="flex items-center gap-3 lg:gap-4">
                                            <Avatar className='h-10 w-10 lg:h-12 lg:w-12'>
                                                <AvatarImage src={testimonial.image} />
                                                <AvatarFallback>{testimonial.name}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="text-base lg:text-lg font-semibold">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-xs lg:text-sm text-gray-500">
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
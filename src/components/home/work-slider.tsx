"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Building2, MoveDown, MoveUp, User, Workflow } from "lucide-react";
import { Button } from "../ui/button";
import { works } from "@/lib/constant";
import { slugify } from "@/lib/utils";


export default function StackedSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);

    const moveNext = () => {
        const cards = gsap.utils.toArray(".slide") as HTMLDivElement[];
        if (current < slides.length - 1) {
            const tl = gsap.timeline();
            tl.to(cards[current], {
                y: 100,
                opacity: 0,
                duration: 0.5,
                onComplete: () => setCurrent(current + 1),
            });
        }
    };

    const movePrev = () => {
        if (current === 0) return;
        const cards = gsap.utils.toArray(".slide") as HTMLDivElement[];
        const prev = current - 1;

        gsap.set(cards[prev], { opacity: 1 });
        gsap.to(cards[prev], {
            y: -prev * 20,
            duration: 0.5,
            onComplete: () => setCurrent(prev),
        });
    };


    const slides = works.filter((work) => work.home)

    useEffect(() => {
        const cards = gsap.utils.toArray(".slide") as HTMLDivElement[];

        // Stack from top to bottom
        cards.forEach((card, i) => {
            gsap.set(card, {
                zIndex: slides.length - i,
                y: -i * 20,
                scale: 1 - i * 0.02,
            });
        });
    }, [slides.length]);

    return (
        <section className="py-8 lg:py-20">
            <div className="container">
                <div className="pb-10 lg:max-w-7xl mx-auto">
                    <p className="lg:text-5xl text-xl leading-5 text-justify lg:leading-snug mx-auto flex flex-wrap justify-center gap-3">
                        <span className="animate-group">WE</span>
                        <span className="animate-group">PARTNER</span>
                        <span className="animate-group">WITH</span>
                        <span className="animate-group">DREAMERS,</span>
                        <span className="animate-group">DISRUPTORS,</span>

                        <span className="animate-group flex -mt-1 items-center gap-2">
                            <span>AND BRANDS THAT DARE TO STAND OUT.  </span>
                            <span className="inline-flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 border-2 border-[#1b1b1b] rounded-full">
                                <User className="w-5 h-5 lg:w-6 lg:h-6 animate-bounce" />
                            </span>
                        </span>

                        <span className="animate-group">FROM LOGO TO LAUNCH, WE TURN IDEAS INTO    </span>

                        <span className="animate-group flex items-center gap-2">
                            <span>studios</span>
                            <span className="inline-flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 border-2 border-[#1b1b1b] rounded-full">
                                <User className="w-5 h-5 lg:w-6 lg:h-6 animate-bounce" />
                            </span>
                        </span>

                        <span className="animate-group flex items-center gap-2">
                            <span>companies</span>
                            <span className="inline-flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 border-2 border-[#1b1b1b] rounded-full">
                                <Building2 className="w-5 h-5 lg:w-6 lg:h-6 animate-bounce" />
                            </span>
                        </span>

                        <span className="animate-group">DIGITAL</span>
                        <span className="animate-group">EXPERIENCES</span>
                        <span className="animate-group">THAT</span>
                        <span className="animate-group">CAPTIVATE</span>
                        <span className="animate-group">AND</span>
                        <span className="animate-group">CONVERT.</span>

                    </p>
                    <div className="animate-group mt-8 flex justify-center">
                        <Link href="/portfolio">
                            <Button className='group w-28 h-12 flex items-center gap-5 text-lg border-2 border-[#1b1b1b] cursor-pointer bg-[#1d1d1d]/30'>
                                <Workflow className='w-14 h-12 lg:p-1 rounded-full lg:group-hover:p-0' />
                                <span>See More</span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="relative max-w-4xl h-[60svh] mx-auto mt-20">
                    <div ref={containerRef} className="relative h-full w-full">
                        {slides.map((slide, i) => (
                            <Link
                                key={i}
                                href={`/portfolio/${slugify(slide.title)}`}
                                className="slide absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden shadow-2xl cursor-pointer"
                            >
                                <Image
                                    src={slide.thumbnail}
                                    alt={`slide-${i}`}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
                        <button
                            onClick={movePrev}
                            className="bg-white text-black px-3 py-1 rounded shadow cursor-pointer"
                        >
                            <MoveUp />
                        </button>
                        <button
                            onClick={moveNext}
                            className="bg-white text-black px-3 py-1 rounded shadow cursor-pointer"
                        >
                            <MoveDown />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
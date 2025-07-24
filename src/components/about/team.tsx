"use client"

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { teammates } from '@/lib/constant'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
    const secRef = useRef<HTMLElement | null>(null)

    useGSAP((context) => {
        // Only apply GSAP animations on larger screens
        if (window.innerWidth >= 1024) {
            const q = context.selector

            // Pin the entire section
            ScrollTrigger.create({
                trigger: secRef.current,
                start: "top top",
                end: "+=2500", // The total scroll distance for the pinned section
                scrub: true,
                pin: true,
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: secRef.current,
                    start: "top bottom",
                    end: "300% top",
                    scrub: true,
                },
            });

            if (q) {
                tl.to(q(".animate_text_one"), { xPercent: 200 })
                    .to(q(".animate_text_two"), { xPercent: 55 }, "<")
                    .to(q(".animate_text_three"), { xPercent: -20 }, "<")
                    .to(
                        q(".animate_photos_group"),
                        {
                            yPercent: -112,
                            ease: "power1.out",
                            stagger: 0.2
                        }
                    )
            }
        }
    }, { scope: secRef })

    return (
        <section ref={secRef} className="py-12 lg:py-0">
            <div className="container relative">
                <div className="text-center px-4 lg:px-0">
                    <h2 className='text-5xl sm:text-7xl lg:text-[215px] font-bold leading-none mb-8 lg:mb-4'>
                        <span className='animate_text_one inline-block'>Our</span><br />
                        <span className='animate_text_two inline-block'>Talented</span>{' '}
                        <span className='animate_text_three inline-block'>Teammates</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 mt-12 lg:mt-24">
                    {teammates.map((member, index) => (
                        <div
                            key={index}
                            className="flex rounded-lg animate_photos_group transform-gpu group duration-500"
                        >
                            <div className="relative overflow-hidden w-full">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    height={1200}
                                    width={1200}
                                    className='w-full aspect-[4/5] sm:aspect-[4/7] object-cover rounded-lg lg:saturate-0 group-hover:saturate-[70%]'
                                />
                                <div className="absolute top-0 lg:top-full group-hover:lg:top-0 left-0 w-full h-full bg-black/70 p-4 lg:p-5 duration-500 flex flex-col justify-between">
                                    <div className="flex basis-1/2 justify-between text-lg lg:text-xl">
                                        <p>{member.name}</p>
                                        <p>{member.role}</p>
                                    </div>
                                    <div className="">
                                        <p className='text-center pb-2 text-lg lg:text-xl'>{member.headline}</p>
                                        <p className='text-justify text-sm lg:text-base'>{member.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
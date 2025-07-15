"use client"

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { teammates } from '@/lib/constant'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
    const secRef = useRef(null)

    useGSAP((context) => {
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

    }, { scope: secRef })

    return (
        <section ref={secRef} className="">
            <div className="container relative">
                <div className="text-center">
                    <h2 className='text-3xl lg:text-[215px] font-bold leading-none mb-4'>
                        <span className='animate_text_one inline-block'>Our</span><br />
                        <span className='animate_text_two inline-block'>Talented</span>{' '}
                        <span className='animate_text_three inline-block'>Teammates</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 mt-24">
                    {
                        teammates.map((member, index) => (
                            <div
                                key={index}
                                className="flex rounded-lg animate_photos_group transform-gpu group duration-500"
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        height={1200}
                                        width={1200}
                                        className='w-full aspect-[4/7] object-cover rounded-lg saturate-0 group-hover:saturate-[70%]'
                                    />
                                    <div className="absolute top-full group-hover:top-0 left-0 w-full h-full bg-black/70 p-5 duration-500 flex flex-col justify-between">
                                        <div className="flex basis-1/2 justify-between text-xl">
                                            <p>{member.name}</p>
                                            <p>{member.role}</p>
                                        </div>
                                        <div className="">
                                            <p className='text-center pb-2 text-xl'>{member.headline}</p>
                                            <p className='text-justify text-base'>{member.description}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>
        </section>
    )
}
"use client";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutServices() {
    const secRef = useRef<HTMLElement | null>(null);

    const services = [
        {
            id: 1,
            title: "Digital Marketing",
            description: "I design websites that look great and feel intuitive. From the layout to the animations, every detail is crafted for a seamless experience on any device.",
            video: "/videos/video.mp4"
        },
        {
            id: 2,
            title: "Website Development",
            description: "I design websites that look great and feel intuitive. From the layout to the animations, every detail is crafted for a seamless experience on any device.",
            video: "/videos/video.mp4"
        },
        {
            id: 3,
            title: "E-commerce Solutions",
            description: "I design websites that look great and feel intuitive. From the layout to the animations, every detail is crafted for a seamless experience on any device.",
            video: "/videos/video.mp4"
        }
    ];

    useGSAP(() => {
        const boxes = secRef.current?.querySelectorAll('.animate_servide_fade') as NodeListOf<HTMLElement>;
        const videos = secRef.current?.querySelectorAll('.service-video') as NodeListOf<HTMLElement>;

        boxes?.forEach((box, index) => {
            gsap.fromTo(box,
                { opacity: 0.1 },
                {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: box,
                        start: "top 70%",
                        end: "bottom 70%",
                        scrub: true,
                        onEnter: () => {
                            fadeOthers(index);
                            showVideo(index);
                        },
                        onEnterBack: () => {
                            fadeOthers(index);
                            showVideo(index);
                        }
                    }
                }
            );
        });

        function fadeOthers(activeIndex: number) {
            boxes?.forEach((box, i) => {
                if (i === activeIndex) {
                    gsap.to(box, {
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                } else {
                    gsap.set(box, { opacity: 0.1 }); // Faster than to()
                }
            });
        }

        function showVideo(activeIndex: number) {
            videos?.forEach((video, i) => {
                if (i === activeIndex) {
                    gsap.fromTo(video,
                        {
                            x: 100,
                            opacity: 0,
                            rotate: 30,
                        },
                        {
                            x: 0,
                            rotate: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "bounce.out"
                        }
                    );
                } else {
                    gsap.set(video, { opacity: 0 });
                }
            });
        }

    }, { scope: secRef });

    return (
        <section className="py-8 lg:py-20" ref={secRef}>
            <div className="container">
                <div className="mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-4">We can help you with</h2>
                </div>

                <div className="grid grid-rows-3 grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const position = {
                            0: { colStart: 1, rowStart: 1 },
                            1: { colStart: 2, rowStart: 2 },
                            2: { colStart: 3, rowStart: 3 },
                        }[index] || { colStart: 1, rowStart: 1 };

                        return (
                            <div
                                key={service.id}
                                className={`max-w-sm pr-6 rounded-lg col-start-${position.colStart} row-start-${position.rowStart} animate_servide_fade`}
                                style={{ opacity: 0.2 }}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl lg:text-5xl font-semibold leading-tight">
                                        {service.title}
                                    </h3>
                                    <video
                                        className="w-24 h-24 object-cover service-video"
                                        src={service.video}
                                        autoPlay
                                        loop
                                        muted
                                        preload="metadata"
                                        style={{ opacity: 0, willChange: 'transform, opacity'}}
                                    />
                                </div>
                                <p className="text-gray-300 text-lg">{service.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

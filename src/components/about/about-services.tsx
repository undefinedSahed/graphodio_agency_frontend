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
        const boxes = secRef.current?.querySelectorAll('.animate_service_fade') as NodeListOf<HTMLElement>;
        const videos = secRef.current?.querySelectorAll('.service-video') as NodeListOf<HTMLElement>;

        boxes?.forEach((box, index) => {
            ScrollTrigger.create({
                trigger: box,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    fadeOthers(index);
                    showVideo(index);
                },
                onEnterBack: () => {
                    fadeOthers(index);
                    showVideo(index);
                },
            });
        });

        function fadeOthers(activeIndex: number) {
            boxes?.forEach((box, i) => {
                gsap.to(box, {
                    opacity: i === activeIndex ? 1 : 0.1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        }

        function showVideo(activeIndex: number) {
            videos?.forEach((video, i) => {
                if (i === activeIndex) {
                    gsap.fromTo(video,
                        { x: 100, opacity: 0, rotate: 30 },
                        { x: 0, rotate: 0, opacity: 1, duration: 0.4, ease: "bounce.inOut" }
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

                <div className="grid grid-rows-3 grid-cols-3 gap-x-8 gap-y-[30px] relative">
                    {services.map((service, index) => {
                        const position = [
                            { gridColumnStart: 1, gridRowStart: 1 },
                            { gridColumnStart: 2, gridRowStart: 2 },
                            { gridColumnStart: 3, gridRowStart: 3 },
                        ][index];

                        return (
                            <div
                                key={service.id}
                                className="max-w-sm pr-6 rounded-lg animate_service_fade"
                                style={{
                                    opacity: 0.2,
                                    gridColumnStart: position.gridColumnStart,
                                    gridRowStart: position.gridRowStart
                                }}
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
                                        style={{ opacity: 0, willChange: 'transform, opacity' }}
                                    />
                                </div>
                                <p className="text-gray-300 text-xl tracking-wider">{service.description}</p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

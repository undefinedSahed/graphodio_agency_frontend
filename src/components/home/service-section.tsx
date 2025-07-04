'use client';

import gsap from 'gsap';
import { Building2 } from 'lucide-react';
import React, { useRef } from 'react';

const works = [
    {
        name: "Graphics Design",
        type: "Graphics Design | AI",
        date: "May 2023",
        videos: [
            "/videos/video.mp4",
            "/videos/video.mp4",
            "/videos/video.mp4"
        ]
    },
    {
        name: "Custom Website",
        type: "Web Development | MERN",
        date: "February 2023",
        videos: [
            "/videos/video.mp4",
            "/videos/video.mp4",
            "/videos/video.mp4"
        ]
    },
    {
        name: "SEO Services",
        type: "SEO Services | SEM",
        date: "May 2023",
        videos: [
            "/videos/video.mp4",
            "/videos/video.mp4",
            "/videos/video.mp4"
        ]
    },
    {
        name: "Amazon Products",
        type: "Graphics, SEO | AI, SEM",
        date: "May 2023",
        videos: [
            "/videos/video.mp4",
            "/videos/video.mp4",
            "/videos/video.mp4"
        ]
    }
];

export default function HomeWorks() {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleShow = (el: HTMLElement) => {
        const items = containerRef.current?.querySelectorAll('.work-item') || [];

        items.forEach((item) => {
            if (item !== el) {
                gsap.to(item, {
                    opacity: 0.1,
                    duration: 0.3,
                    ease: 'power3.out',
                });
            }
        });

        const videos = el.querySelectorAll('.abc');
        videos.forEach((video) => {
            gsap.killTweensOf(video);
            gsap.to(video, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "power3.out"
            });
        });
    };

    const handleHide = (el: HTMLElement) => {
        const items = containerRef.current?.querySelectorAll('.work-item') || [];

        items.forEach((item) => {
            gsap.to(item, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        });

        const videos = el.querySelectorAll('.abc');
        videos.forEach((video) => {
            gsap.killTweensOf(video);
            gsap.to(video, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power3.in"
            });
        });
    };

    return (
        <section className="py-8 lg:py-20">
            <div className="container">
                <div className="flex justify-between">
                    <div className="max-w-md">
                        <h3 className='lg:text-5xl leading-snug'>
                            Here is a selection of our most popular services{" "}
                            <span className="inline-flex justify-center items-center w-14 h-14 border-2 border-[#1b1b1b] rounded-full ml-3">
                                <Building2 className="w-6 h-6 animate-bounce" />
                            </span>
                        </h3>
                    </div>
                    <div className="max-w-[150px] text-end items-end">
                        <p className="lg:text-xl text-white/70">Hover on names for a closer look</p>
                    </div>
                </div>

                <div
                    className="flex flex-col justify-center mt-12"
                    ref={containerRef}
                >
                    {works.map((work, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-6 items-center gap-5 group work-item transition-opacity duration-300"
                            onMouseEnter={(e) => handleShow(e.currentTarget)}
                            onMouseLeave={(e) => handleHide(e.currentTarget)}
                        >
                            {/* Video 1 */}
                            <div className="col-span-1 abc" style={{ transform: 'scale(0)', opacity: 0 }}>
                                <video autoPlay loop muted>
                                    <source src={work.videos[0]} type="video/mp4" />
                                </video>
                            </div>

                            {/* Video 2 */}
                            <div className="col-span-1 abc" style={{ transform: 'scale(0)', opacity: 0 }}>
                                <video autoPlay loop muted>
                                    <source src={work.videos[1]} type="video/mp4" />
                                </video>
                            </div>

                            {/* Title & Info */}
                            <div className="col-span-3 relative cursor-pointer origin-left will-change-transform hover:scale-[120%] hover:translate-x-5 duration-700 group">
                                <h3 className='lg:text-8xl font-bold'>
                                    {work.name}
                                </h3>
                                <div className="absolute text-white/70 left-2 -bottom-2 flex items-center gap-1">
                                    <span className='invisible group-hover:visible mt-1 text-xs bg-[#1b1b1b] tracking-wider px-2 rounded-xs'>
                                        {work.type}
                                    </span>
                                    <span className='invisible group-hover:visible mt-1 text-xs bg-[#1b1b1b] tracking-wider px-2 rounded-xs'>
                                        {work.date}
                                    </span>
                                </div>
                            </div>

                            {/* Video 3 */}
                            <div className="col-span-1 abc" style={{ transform: 'scale(0)', opacity: 0 }}>
                                <video autoPlay loop muted>
                                    <source src={work.videos[2]} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

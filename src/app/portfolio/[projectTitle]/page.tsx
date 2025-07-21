"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import clsx from "clsx";
import ProjectDetailsPanel from "@/components/portfolio/ProjectDetailsPanel";

const videos = [
  { src: "/videos/video.mp4", alt: "Welcome Page", index: "/01", detail: "Welcome Page" },
  { src: "/videos/video.mp4", alt: "Join Race", index: "/02", detail: "Join Race" },
  { src: "/videos/video.mp4", alt: "Network", index: "/03", detail: "Network" },
  { src: "/videos/video.mp4", alt: "Localization", index: "/04", detail: "Localization" },
  { src: "/videos/video.mp4", alt: "Flip Script", index: "/05", detail: "Flip Script" },
  { src: "/videos/video.mp4", alt: "Another Page", index: "/06", detail: "Another Page" },
];

export default function ProjectDetails() {
  const [hovered, setHovered] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  useParams();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      projectRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
    );
  }, []);

  const handleMouseEnter = (idx: number) => {
    setHovered(idx);
    const vid = videoRefs.current[idx];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch((err) => {
        console.warn("Video play was blocked or interrupted:", err);
      });
    }
  };

  const handleMouseLeave = (idx: number) => {
    setHovered(null);
    const vid = videoRefs.current[idx];
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  };

  return (
    <section className="min-h-screen text-white px-6 py-10 flex flex-col items-center justify-center text-center relative">
      { }
      <div className="w-full max-w-xl relative mb-4">
        { }
        <div className="absolute left-0 top-0 text-sm tracking-widest">
          ● WORKS INDEX
        </div>

        { }
        <div className="flex justify-center gap-2">
          <span className="px-2 py-1 text-xs bg-[#1f1f1f] rounded">WEBDESIGN</span>
          <span className="px-2 py-1 text-xs bg-[#1f1f1f]  rounded">WEBFLOW</span>
        </div>
      </div>

      <h1
        ref={titleRef}
        className="text-6xl font-extrabold leading-tight tracking-wide"
      >
        STUDIO FUGU
      </h1>

      <div className="mt-4 text-gray-400 max-w-xl">
        <p className="text-xl leading-relaxed">
          Website redesign & Webflow development for Studio Fugu, a localization studio dedicated to the creative and cultural industries.
        </p>
      </div>

      <div className="mt-10 w-full" ref={projectRef}>
        <ProjectDetailsPanel />


        <div className="relative w-full overflow-x-auto">
          <div className="inline-flex gap-6 px-2 items-start">
            {videos.map((vid, idx) => (
              <div
                key={idx}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className={clsx(
                  "flex flex-col flex-shrink-0 transition-all duration-500",
                  hovered === idx ? "w-[300px]" : "w-[250px]",
                  hovered !== null && hovered !== idx ? "opacity-40 scale-95" : "opacity-100"
                )}
              >
                { }
                <div className="h-[350px] flex items-end">
                  <div
                    className={clsx(
                      "overflow-hidden bg-[#111] rounded-md transition-all duration-500 ease-in-out w-full",
                      hovered === idx ? "h-[350px]" : "h-[220px]"
                    )}
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={vid.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                { }
                <div className="flex justify-between text-sm text-gray-500 mt-2 w-full px-1">
                  <span>{vid.index}</span>
                  <span>{vid.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

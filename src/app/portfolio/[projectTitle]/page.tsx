"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import gsap from "gsap";
import clsx from "clsx";
import ProjectDetailsPanel from "@/components/portfolio/ProjectDetailsPanel";
import { works } from "@/lib/constant";
import { PlayCircle } from "lucide-react";

export default function ProjectDetails() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop();
  const work = works.find((b) => b.slug === decodeURIComponent(slug as string));
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const [hovered, setHovered] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  useParams();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleHover = (idx: number) => {
    if (isMobile) return;
    setHovered(idx);
    const vid = videoRefs.current[idx];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch((err) => {
        console.warn("Video play was blocked or interrupted:", err);
      });
    }
  };

  const handleLeave = (idx: number) => {
    if (isMobile) return;
    setHovered(null);
    const vid = videoRefs.current[idx];
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  };

  const handleMobileClick = (idx: number) => {
    setActiveVideoIndex(idx);
    if (!isMobile) return;
    const vid = videoRefs.current[idx];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch((err) => {
        console.warn("Video play was blocked or interrupted:", err);
      });
    }
  };

  return (
    <section className="min-h-screen text-white px-4 flex flex-col items-center justify-center text-center relative">
      <div className="w-full max-w-xl relative mb-2">
        <div className="flex justify-center gap-2 mt-6 sm:mt-0">
          <span className="px-2 py-1 text-[10px] sm:text-xs bg-[#1f1f1f] rounded">WEBDESIGN</span>
          <span className="px-2 py-1 text-[10px] sm:text-xs bg-[#1f1f1f] rounded">WEBFLOW</span>
        </div>
      </div>

      <h1 ref={titleRef} className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-wide">
        {work?.title}
      </h1>

      <div className="mt-4 text-gray-400 max-w-xl px-2">
        <p className="text-base sm:text-xl leading-relaxed">{work?.shortDescription}</p>
      </div>

      <div className="lg:mt-6 mt-3 w-full" ref={projectRef}>
        {work && <ProjectDetailsPanel slug={work.slug} />}


        <div className="relative w-full overflow-x-auto mt-7 lg:-mt-14">
          <div className="inline-flex gap-4 sm:gap-6 px-2 items-start snap-x snap-mandatory overflow-x-auto scroll-smooth">
            {work?.videos?.map((vid, idx) => (
              <div
                key={idx}
                className="snap-center shrink-0"
                style={{ width: isMobile ? "100vw" : "auto" }}
              >
                <div className="h-[220px] sm:h-[350px] flex items-end">
                  <div
                    className={clsx(
                      "overflow-hidden bg-[#111] rounded-md transition-all duration-500 ease-in-out w-full relative group",
                      isMobile
                        ? "h-[220px]"
                        : hovered === idx
                          ? "h-[350px]"
                          : "h-[220px]"
                    )}
                  >
                    {activeVideoIndex !== idx && (
                      <div onClick={() => handleMobileClick(idx)} className="absolute bg-black rounded-full p-3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <PlayCircle className="w-8 h-8" />
                      </div>
                    )}

                    <video
                      onMouseEnter={() => handleHover(idx)}
                      onMouseLeave={() => handleLeave(idx)}
                      onClick={() => handleMobileClick(idx)}
                      className={clsx(
                        "transition-all duration-500 object-cover w-full h-full",
                        hovered === idx && !isMobile ? "sm:w-[300px]" : "sm:w-[250px]",
                        hovered !== null && hovered !== idx && !isMobile
                          ? "opacity-40 scale-95"
                          : "opacity-100"
                      )}
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={vid}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>

                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-2 w-full px-1">
                  <span>{work?.title}</span>
                  <div className="text-white/70 flex items-center gap-1">
                    {work?.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="group-hover:visible mt-1 text-xs bg-[#1b1b1b] tracking-wider px-2 rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
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

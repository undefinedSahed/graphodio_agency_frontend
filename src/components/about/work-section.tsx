"use client";

import { works } from "@/lib/constant";
import { slugify } from "@/lib/utils";
import gsap from "gsap";
import { Building2 } from "lucide-react";
import Link from "next/link";
import React, { useRef, useEffect } from "react";

export default function WorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const preloadedVideos = useRef<{ [key: string]: HTMLVideoElement }>({});

  // Filter about page works
  const aboutPageWorks = works.filter((work) => work.about);

  // Preload all videos in the background
  useEffect(() => {
    const preloadVideos = () => {
      aboutPageWorks.forEach((work, workIndex) => {
        work.videos.slice(0, 3).forEach((videoSrc, videoIndex) => {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.muted = true;
          video.loop = true;
          video.playsInline = true;

          // Store reference with a unique key
          const key = `${workIndex}-${videoIndex}`;
          preloadedVideos.current[key] = video;

          // Set source and start loading
          video.src = videoSrc;
          video.load();
        });
      });
    };

    preloadVideos();

    // Cleanup function
    return () => {
      Object.values(preloadedVideos.current).forEach((video) => {
        video.src = "";
        video.load();
      });
      preloadedVideos.current = {};
    };
  }, [aboutPageWorks]);

  const handleShow = (el: HTMLElement) => {
    const items = containerRef.current?.querySelectorAll(".work-item") || [];

    items.forEach((item) => {
      if (item !== el) {
        gsap.to(item, {
          opacity: 0.1,
          duration: 0.2,
          ease: "power3.out",
        });
      }
    });

    const videos = el.querySelectorAll(
      ".abc video"
    ) as NodeListOf<HTMLVideoElement>;
    videos.forEach((video) => {
      gsap.killTweensOf(video.parentElement);
      gsap.to(video.parentElement, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power3.out",
      });

      // Ensure video plays when shown
      video.play().catch(console.error);
    });
  };

  const handleHide = (el: HTMLElement) => {
    const items = containerRef.current?.querySelectorAll(".work-item") || [];

    items.forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    const videos = el.querySelectorAll(
      ".abc video"
    ) as NodeListOf<HTMLVideoElement>;
    videos.forEach((video) => {
      gsap.killTweensOf(video.parentElement);
      gsap.to(video.parentElement, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });

      // Pause video when hidden to save resources
      video.pause();
    });
  };

  const getPreloadedVideo = (
    workIndex: number,
    videoIndex: number
  ): HTMLVideoElement | null => {
    const key = `${workIndex}-${videoIndex}`;
    return preloadedVideos.current[key] || null;
  };

  return (
    <section className="py-8 lg:pb-20 lg:-mt-96">
      <div className="container">
        <div className="flex justify-between">
          <div className="max-w-md mx-auto lg:mx-0">
            <h3 className="lg:text-5xl text-2xl leading-snug text-center lg:text-start">
              Here is a selection of our most popular works{" "}
              <span className="inline-flex justify-center items-center lg:w-14 lg:h-14 w-10 h-10 border-2 border-[#1b1b1b] rounded-full lg:ml-3">
                <Building2 className="lg:w-6 lg:h-6 w-4 h-4 animate-bounce" />
              </span>
            </h3>
          </div>
          <div className="max-w-[150px] text-end items-end hidden lg:block font-[Roboto]">
            <p className="lg:text-xl text-white/70">
              Hover on names for a closer look
            </p>
          </div>
        </div>

        <div
          className="lg:flex flex-col justify-center mt-12 hidden"
          ref={containerRef}
        >
          {aboutPageWorks.map((work, index) => (
            <Link href={`/portfolio/${slugify(work.title)}`} key={index}>
              <div
                className="grid grid-cols-6 items-center gap-5 group work-item transition-opacity duration-300"
                onMouseEnter={(e) => handleShow(e.currentTarget)}
                onMouseLeave={(e) => handleHide(e.currentTarget)}
              >
                {/* Video 1 */}
                <div
                  className="col-span-1 abc"
                  style={{ transform: "scale(0)", opacity: 0 }}
                >
                  <video
                    autoPlay={false}
                    preload="auto"
                    loop
                    muted
                    playsInline
                    onLoadedData={(e) => {
                      // Sync with preloaded video if available
                      const preloaded = getPreloadedVideo(index, 0);
                      if (preloaded && preloaded.readyState >= 3) {
                        e.currentTarget.currentTime = preloaded.currentTime;
                      }
                    }}
                  >
                    <source src={work.videos[0]} type="video/mp4" />
                  </video>
                </div>

                {/* Video 2 */}
                <div
                  className="col-span-1 abc"
                  style={{ transform: "scale(0)", opacity: 0 }}
                >
                  <video
                    autoPlay={false}
                    preload="auto"
                    loop
                    muted
                    playsInline
                    onLoadedData={(e) => {
                      const preloaded = getPreloadedVideo(index, 1);
                      if (preloaded && preloaded.readyState >= 3) {
                        e.currentTarget.currentTime = preloaded.currentTime;
                      }
                    }}
                  >
                    <source src={work.videos[1]} type="video/mp4" />
                  </video>
                </div>

                {/* Title & Info */}
                <div className="col-span-3 relative cursor-pointer origin-left will-change-transform hover:scale-[120%] hover:translate-x-5 duration-700 group">
                  <h3 className="lg:text-8xl font-bold">{work.title}</h3>
                  <div className="absolute text-white/70 left-0 -bottom-5 flex items-center gap-1">
                    {work.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="invisible group-hover:visible mt-1 text-xs bg-[#1b1b1b] tracking-wider px-2 rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Video 3 */}
                <div
                  className="col-span-1 abc"
                  style={{ transform: "scale(0)", opacity: 0 }}
                >
                  <video
                    autoPlay={false}
                    preload="auto"
                    loop
                    muted
                    playsInline
                    onLoadedData={(e) => {
                      const preloaded = getPreloadedVideo(index, 2);
                      if (preloaded && preloaded.readyState >= 3) {
                        e.currentTarget.currentTime = preloaded.currentTime;
                      }
                    }}
                  >
                    <source src={work.videos[2]} type="video/mp4" />
                  </video>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Small Device Services */}
        <div className="lg:hidden space-y-10 lg:pt-12 pt-6">
          {aboutPageWorks.map((service, index) => (
            <div key={index}>
              <div className="grid grid-cols-3 gap-3">
                {service.videos.slice(0, 3).map((video, idx) => (
                  <video
                    key={idx}
                    autoPlay
                    preload="auto"
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                ))}
              </div>
              <Link href={`/portfolio/${slugify(service.title)}`}>
                <h3 className="text-2xl font-bold text-center pt-3">
                  {service.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

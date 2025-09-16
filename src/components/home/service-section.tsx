/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import gsap from "gsap";
import { Building2 } from "lucide-react";
import React, { useRef, useEffect } from "react";
import { services } from "@/lib/constant";

export default function ServiceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const preloadedVideos = useRef<{ [key: string]: HTMLVideoElement }>({});

  // Preload all videos in the background
  useEffect(() => {
    const preloadVideos = () => {
      services.forEach((service, serviceIndex) => {
        service.videos.forEach((videoSrc, videoIndex) => {
          const video = document.createElement("video");
          video.preload = "auto";
          video.muted = true;
          video.loop = true;
          video.playsInline = true;

          // Store reference with a unique key
          const key = `${serviceIndex}-${videoIndex}`;
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
  }, []);

  const handleShow = (el: HTMLElement) => {
    const items = containerRef.current?.querySelectorAll(".service-item") || [];

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
    const items = containerRef.current?.querySelectorAll(".service-item") || [];

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
        duration: 0.2,
        ease: "power3.in",
      });

      // Pause video when hidden to save resources
      video.pause();
    });
  };

  const getPreloadedVideo = (
    serviceIndex: number,
    videoIndex: number
  ): HTMLVideoElement | null => {
    const key = `${serviceIndex}-${videoIndex}`;
    return preloadedVideos.current[key] || null;
  };

  return (
    <section className="pt-0 pb-20 lg:py-20">
      <div className="container">
        <div className="flex justify-between">
          <div className="max-w-md mx-auto lg:ms-0">
            <h3 className="lg:text-5xl text-2xl leading-snug text-left">
              Here is a selection of our most popular services{" "}
              {/*<span className="hidden lg:inline-flex justify-center items-center lg:w-14 w-10 lg:h-14 h-10 border-2 border-[#1b1b1b] rounded-full ml-3">
                                <Building2 className="lg:w-6 w-4 lg:h-6 h-4 animate-bounce" />
                            </span> */}
            </h3>
          </div>
          <div className="hidden lg:block max-w-[150px] text-end items-end font-[Roboto]">
            <p className="lg:text-xl text-white/70">
              Hover on names for a closer look
            </p>
          </div>
        </div>

        <div
          className="hidden lg:flex flex-col justify-center mt-12"
          ref={containerRef}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="grid grid-cols-6 items-center gap-5 group service-item transition-opacity duration-300"
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
                  <source src={service.videos[0]} type="video/mp4" />
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
                  <source src={service.videos[1]} type="video/mp4" />
                </video>
              </div>

              {/* Title & Info */}
              <div className="col-span-3 relative cursor-pointer origin-left will-change-transform hover:scale-[120%] hover:translate-x-5 duration-700 group">
                <h3 className="lg:text-8xl font-bold">{service.title}</h3>
                <div className="absolute text-white/70 left-0 -bottom-4 flex items-center gap-1">
                  {service.tags.map((tag, idx) => (
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
                  <source src={service.videos[2]} type="video/mp4" />
                </video>
              </div>
            </div>
          ))}
        </div>

        {/* Small Device Services */}
        <div className="lg:hidden space-y-10 pt-12">
          {services.map((service, index) => (
            <div key={index}>
              <div className="grid grid-cols-3 gap-3">
                {service.videos.map((video, idx) => (
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
              <h3 className="text-2xl font-bold text-center pt-3 ">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

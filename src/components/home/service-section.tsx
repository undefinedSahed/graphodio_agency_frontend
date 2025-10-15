/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import gsap from "gsap";
import { Building2 } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { services } from "@/lib/constant";

export default function ServiceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const preloadedVideos = useRef<{ [key: string]: HTMLVideoElement }>({});
  const [videosLoaded, setVideosLoaded] = useState<{ [key: string]: boolean }>({});

  // Preload all videos in the background
  useEffect(() => {
    const preloadVideos = () => {
      let loadedCount = 0;
      const totalVideos = services.reduce((acc, service) => acc + service.videos.length, 0);

      services.forEach((service, serviceIndex) => {
        service.videos.forEach((videoSrc, videoIndex) => {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.muted = true;
          video.loop = true;
          video.playsInline = true;

          // Store reference with a unique key
          const key = `${serviceIndex}-${videoIndex}`;
          preloadedVideos.current[key] = video;

          const handleLoad = () => {
            loadedCount++;
            setVideosLoaded(prev => ({ ...prev, [key]: true }));

            // If all videos are loaded, you can trigger any completion callback here
            if (loadedCount === totalVideos) {
              console.log('All videos preloaded');
            }
          };

          video.addEventListener('loadeddata', handleLoad);
          video.addEventListener('error', handleLoad); // Also mark as loaded on error to avoid blocking

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

  // Check if all videos for a service are loaded
  const areServiceVideosLoaded = (serviceIndex: number): boolean => {
    return services[serviceIndex].videos.every((_, videoIndex) => {
      const key = `${serviceIndex}-${videoIndex}`;
      return videosLoaded[key] === true;
    });
  };

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

  // Video Skeleton Component
  const VideoSkeleton = ({ className = "" }: { className?: string }) => (
    <div className={`relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );

  // Service Item Skeleton for desktop
  const DesktopServiceSkeleton = ({ serviceIndex }: { serviceIndex: number }) => (
    <div className="grid grid-cols-6 items-center gap-5 group service-item opacity-50 pointer-events-none">
      {/* Video 1 Skeleton */}
      <div className="col-span-1">
        <VideoSkeleton className="aspect-square" />
      </div>

      {/* Video 2 Skeleton */}
      <div className="col-span-1">
        <VideoSkeleton className="aspect-square" />
      </div>

      {/* Title & Info Skeleton */}
      <div className="col-span-3 relative">
        <div className="h-20 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
        </div>
        <div className="absolute left-0 -bottom-4 flex items-center gap-1">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="h-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xs w-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Video 3 Skeleton */}
      <div className="col-span-1">
        <VideoSkeleton className="aspect-square" />
      </div>
    </div>
  );

  // Mobile Service Skeleton
  const MobileServiceSkeleton = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((idx) => (
          <VideoSkeleton key={idx} className="aspect-square" />
        ))}
      </div>
      <div className="h-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg relative overflow-hidden w-3/4 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
      </div>
    </div>
  );

  return (
    <section className="pt-0 pb-20 lg:py-20">
      <div className="container">
        <div className="flex justify-between">
          <div className="max-w-md mx-auto lg:ms-0">
            <h3 className="lg:text-5xl text-2xl leading-snug text-left">
              Here is a selection of our most popular services{" "}
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
            <React.Fragment key={index}>
              {!areServiceVideosLoaded(index) ? (
                <DesktopServiceSkeleton serviceIndex={index} />
              ) : (
                <div
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
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Small Device Services */}
        <div className="lg:hidden space-y-10 pt-12">
          {services.map((service, index) => (
            <div key={index}>
              {!areServiceVideosLoaded(index) ? (
                <MobileServiceSkeleton />
              ) : (
                <>
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS for shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
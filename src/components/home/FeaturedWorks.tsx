"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { works } from "@/lib/constant";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function FeaturedWorks() {
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const secRef = useRef<HTMLElement>(null);

  // ✅ Preloaded videos
  const preloadedVideos = useRef<{ [key: string]: HTMLVideoElement }>({});

  const cardWidth = 251;
  const cardAspectRatio = 4 / 4;
  const maxScale = 1.2;
  const maxCardHeight = cardWidth * cardAspectRatio * maxScale;

  // ✅ Preload videos when component mounts
  useEffect(() => {
    const preloadVideos = () => {
      works.forEach((work, workIndex) => {
        work.videos.forEach((videoSrc, videoIndex) => {
          const video = document.createElement("video");
          video.preload = "auto";
          video.muted = true;
          video.loop = true;
          video.playsInline = true;

          const key = `${workIndex}-${videoIndex}`;
          preloadedVideos.current[key] = video;

          video.src = videoSrc;
          video.load();
        });
      });
    };

    preloadVideos();

    return () => {
      Object.values(preloadedVideos.current).forEach((video) => {
        video.src = "";
        video.load();
      });
      preloadedVideos.current = {};
    };
  }, []);

  const getPreloadedVideo = (
    workIndex: number,
    videoIndex: number
  ): HTMLVideoElement | null => {
    const key = `${workIndex}-${videoIndex}`;
    return preloadedVideos.current[key] || null;
  };

  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;

      const scaleMap = [1.2, 1.05, 0.95];
      const distance = hoverIndex !== null ? Math.abs(idx - hoverIndex) : null;
      const scale = distance !== null ? scaleMap[distance] ?? 0.9 : 1;

      gsap.to(card, {
        scale,
        duration: 0.5,
        ease: "power3.out",
        transformOrigin: "bottom center",
        overwrite: "auto",
        force3D: true,
      });
    });
  }, [hoverIndex]);

  const handleMouseEnter = (idx: number) => {
    setHoverIndex(idx);
    const card = cardsRef.current[idx];
    const video = card?.querySelector("video") as HTMLVideoElement;

    if (video) {
      gsap.to(video, {
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      video.play().catch(() => { });
    }
  };

  const handleMouseLeave = (idx: number) => {
    setHoverIndex(null);
    const card = cardsRef.current[idx];
    const video = card?.querySelector("video") as HTMLVideoElement;

    if (video) {
      gsap.to(video, {
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      video.pause();
    }

    gsap.to(card, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
      force3D: true,
    });
  };

  useGSAP(
    (context) => {
      const q = context.selector;

      if (q) {
        const ms = q(".mobile_swiper");
        if (ms) {
          gsap.set(ms, { opacity: 0 });
          gsap.to(ms, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: 2.5,
          });
        }
      }

      if (q) {
        const items = q(".animate_items");
        gsap.from(items, {
          y: 300,
          opacity: 0,
          ease: "power2.out",
          stagger: {
            amount: 0.4,
            from: "center",
          },
          delay: 2.2,
        });

        const title = q(".title_feature");
        gsap.from(title, {
          y: 300,
          opacity: 0,
          delay: 2.2,
          ease: "power2.out",
        });
      }

      gsap.from(secRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    },
    { scope: secRef }
  );

  const featuredWorks = works.filter((work) => work.featured);

  return (
    <section
      ref={secRef}
      className={`${roboto.className} text-white px-4 lg:-mt-64 -mt-20`}
    >
      <div className="text-center text-xs font-semibold uppercase tracking-wider opacity-60 title_feature pb-3">
        Featured Works
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(5, 251px)",
              justifyContent: "center",
              gap: "2.5rem",
              height: maxCardHeight,
              alignItems: "end",
            }}
          >
            {featuredWorks.map((work, idx) => (
              <div
                key={idx}
                style={{
                  height: maxCardHeight,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
                className="animate_items"
              >
                <Link
                  href={`/portfolio/${slugify(work.title)}`}
                  rel="noopener noreferrer"
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  className="relative group overflow-hidden w-full cursor-pointer block"
                  style={{
                    transformOrigin: "bottom center",
                    willChange: "transform",
                  }}
                >
                  <div className="relative w-full">
                    <video
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full aspect-square object-cover pointer-events-none transition-opacity duration-300"
                      style={{ opacity: 1 }}
                      onLoadedData={(e) => {
                        const preloaded = getPreloadedVideo(idx, 0);
                        if (preloaded && preloaded.readyState >= 3) {
                          e.currentTarget.currentTime = preloaded.currentTime;
                        }
                      }}
                    >
                      <source src={work.videos[0]} type="video/mp4" />
                    </video>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-2 text-sm uppercase tracking-wider">
                    <span className="font-semibold truncate">{work.title}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Swiper */}
      <div className="md:hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: `.swiper-button-next`,
            prevEl: `.swiper-button-prev`,
          }}
          slidesPerView={1}
          spaceBetween={16}
          className="px-4 relative mobile_swiper"
        >
          {featuredWorks.map((work, idx) => (
            <SwiperSlide key={idx}>
              <Link
                href={`/portfolio/${slugify(work.title)}`}
                rel="noopener noreferrer"
                className="relative group overflow-hidden w-full cursor-pointer rounded-lg block"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover pointer-events-none transition-opacity duration-300"
                  style={{ opacity: 1 }}
                  onLoadedData={(e) => {
                    const preloaded = getPreloadedVideo(idx, 0);
                    if (preloaded && preloaded.readyState >= 3) {
                      e.currentTarget.currentTime = preloaded.currentTime;
                    }
                  }}
                >
                  <source src={work.videos[0]} type="video/mp4" />
                </video>

                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider">
                    {work.title}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          {/* Navigation Buttons */}
          <div className="swiper-button-prev text-white absolute left-2 top-1/2 transform -translate-y-1/2 z-10" />
          <div className="swiper-button-next text-white absolute right-2 top-1/2 transform -translate-y-1/2 z-10" />
        </Swiper>
      </div>
    </section>
  );
}

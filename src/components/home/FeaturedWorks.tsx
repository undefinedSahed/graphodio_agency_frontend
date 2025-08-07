/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { works } from "@/lib/constant";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { slugify } from "@/lib/utils";

export default function FeaturedWorks() {
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const secRef = useRef<HTMLElement>(null);

  const cardWidth = 251;
  const cardAspectRatio = 4 / 4;
  const maxScale = 1.2;
  const maxCardHeight = cardWidth * cardAspectRatio * maxScale;

  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;

      const scaleMap = [1.2, 1.05, 0.95];
      const distance = hoverIndex !== null ? Math.abs(idx - hoverIndex) : null;

      const scale = distance !== null ? scaleMap[distance] ?? 0.9 : 1;

      gsap.to(card, {
        scale,
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "bottom center",
      });
    });
  }, [hoverIndex]);

  const handleMouseEnter = (idx: number) => {
    setHoverIndex(idx);
    const card = cardsRef.current[idx];
    const video = card?.querySelector("video") as HTMLVideoElement;

    if (video) {
      gsap.to(video, { opacity: 1, duration: 0.3, ease: "power2.out" });
      video.play().catch(() => { });
    }
  };

  const handleMouseLeave = (idx: number) => {
    setHoverIndex(null);
    const card = cardsRef.current[idx];
    const video = card?.querySelector("video") as HTMLVideoElement;

    if (video) {
      gsap.to(video, { opacity: 0, duration: 0.3, ease: "power2.out" });
      video.pause();
      video.currentTime = 0;
    }
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
    <section className="text-white px-4 lg:-mt-64 -mt-20" ref={secRef}>
      <div className="text-center text-xs font-semibold uppercase tracking-wider opacity-60 title_feature pb-3">
        Featured Works
      </div>

      {/* Desktop Grid (Inside Container) */}
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
                  style={{ transformOrigin: "bottom center", willChange: "transform" }}
                >
                  <div className="relative w-full">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      loading="lazy"
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <video
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute top-0 left-0 w-full aspect-square object-cover opacity-0 pointer-events-none"
                    >
                      <source src={work.videos[0]} type="video/mp4" />
                    </video>
                  </div>
                  <div className="mt-4 flex justify-between items-center gap-2 text-xs uppercase tracking-wider">
                    <span className="font-semibold truncate">{work.title}</span>
                    {work.tags.map((tag, idx) => (
                      <span key={idx} className="text-gray-400 truncate text-right">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Swiper */}
      <div className="md:hidden">
        <Swiper slidesPerView={1} spaceBetween={16} className="px-4">
          {featuredWorks.map((work, idx) => (
            <SwiperSlide key={idx}>
              <Link
                href={`/portfolio/${slugify(work.title)}`}
                rel="noopener noreferrer"
                className="relative group overflow-hidden w-full cursor-pointer rounded-lg block"
              >
                <div className="relative w-full aspect-[4/5]">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <video
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none"
                  >
                    <source src={work.videos[0]} type="video/mp4" />
                  </video>
                </div>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider">
                    {work.title}
                  </div>
                  {work.tags.map((tag, idx) => (
                    <div key={idx} className="text-xs tracking-wider text-gray-400 uppercase">
                      {tag}
                    </div>
                  ))}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

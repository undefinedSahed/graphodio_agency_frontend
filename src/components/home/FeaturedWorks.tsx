/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { featuredWorks } from "@/lib/constant";
import { useGSAP } from "@gsap/react";
import Link from "next/link";


export default function FeaturedWorks() {
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const secRef = useRef<HTMLElement>(null);

  // Card base dimensions
  const cardWidth = 251;
  const cardAspectRatio = 4 / 4; // height / width
  const maxScale = 1.2;
  const maxCardHeight = cardWidth * cardAspectRatio * maxScale; // ~376.5px

  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const scaleMap = [1.2, 1.05, 0.95];
      const distance = hoverIndex !== null ? Math.abs(idx - hoverIndex) : null;

      const scale =
        distance !== null
          ? scaleMap[distance] ?? 0.9
          : 1;

      const translateX =
        hoverIndex !== null
          ? idx < hoverIndex
            ? `-${(maxScale - scale) * 40}px`
            : idx > hoverIndex
              ? `${(maxScale - scale) * 40}px`
              : "0"
          : "0";

      gsap.to(card, {
        scale,
        x: translateX,
        zIndex: idx === hoverIndex ? 4 : 1,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "bottom center",
      });
    });
  }, [hoverIndex]);

  const handleMouseEnter = (idx: number) => {
    const card = cardsRef.current[idx];
    const video = card?.querySelector("video") as HTMLVideoElement;
    if (video) {
      gsap.to(video, { opacity: 1, duration: 0.3 });
      video.play().catch((e) => console.error("Play error", e));
    }
    setHoverIndex(idx);
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardsRef.current[idx];
    const video = card?.querySelector("video") as HTMLVideoElement;
    if (video) {
      gsap.to(video, { opacity: 0, duration: 0.3 });
      video.pause();
      video.currentTime = 0;
    }
    setHoverIndex(null);
  };



  useGSAP((context) => {

    const q = context.selector

    if (q) {
      const items = q('.animate_items')
      gsap.from(items, {
        y: 300,
        opacity: 0,
        ease: "power2.out",
        stagger: {
          amount: 0.4,
          from: "center"
        },
        delay: 2.2
      });

      const title = q('.title_feature')
      gsap.from(title,
        {
          y: 300,
          opacity: 0,
          delay: 2.2,
          ease: "power2.out"
        }
      )
    }

    gsap.from(secRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })

  }, { scope: secRef })

  return (
    <section className="text-white px-4 -mt-44" ref={secRef}>
      <div className="text-center text-xs font-semibold uppercase tracking-wider opacity-60 title_feature">
        Featured Works
      </div>

      {/* Desktop Grid */}
      <div
        className={`hidden md:grid max-w-7xl mx-auto`}
        style={{
          gridTemplateColumns: "repeat(6, 251px)",
          justifyContent: "center",
          gap: hoverIndex !== null ? "2.5rem" : "1rem",
          height: maxCardHeight,
          alignItems: "end",
        }}
      >
        {featuredWorks.map((work, idx) => (
          <div
            key={idx}
            style={{ height: maxCardHeight, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
            className="animate_items"
          >
            <Link
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="relative group overflow-hidden w-full cursor-pointer block"
              style={{ transformOrigin: "bottom center" }}
            >
              {/* Media Container */}
              <div className="relative w-full">
                <img
                  src={work.imgSrc}
                  alt={work.title}
                  loading="lazy"
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <video
                  muted
                  loop
                  preload="none"
                  playsInline
                  className="absolute top-0 left-0 w-full aspect-square object-cover opacity-0 pointer-events-none"
                >
                  <source src={work.videoSrc} type="video/mp4" />
                </video>
              </div>
              {/* Text */}
              <div className="mt-4 flex justify-between items-center gap-2 text-xs uppercase tracking-wider">
                <span className="font-semibold truncate">{work.title}</span>
                <span className="text-gray-400 truncate text-right">{work.category}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile Swiper */}
      <div className="md:hidden">
        <Swiper slidesPerView={1.2} spaceBetween={16} className="px-4">
          {featuredWorks.map((work, idx) => (
            <SwiperSlide key={idx}>
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden w-full cursor-pointer rounded-lg block"
              >
                <div className="relative w-full aspect-[4/5]">
                  <img
                    src={work.imgSrc}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <video
                    muted
                    loop
                    preload="none"
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none"
                  >
                    <source src={work.videoSrc} type="video/mp4" />
                  </video>
                </div>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider">
                    {work.title}
                  </div>
                  <div className="text-xs tracking-wider text-gray-400 uppercase">
                    {work.category}
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}


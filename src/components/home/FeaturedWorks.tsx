"use client";

import { useEffect, useRef, useState } from "react";
import SwiperCore, { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

const works = [
  {
    title: "Graphics Design",
    category: "Webdesign + Webflow",
    videoSrc: "/video/Hero.mp4",
    imgSrc: "/images/work.jpg",
    link: "",
  },
 {
    title: "Amazon",
    category: "Webdesign + Webflow",
    videoSrc: "/video/Hero.mp4",
    imgSrc: "/images/work.jpg",
    link: "",
  },
  {
    title: "Web Design and development",
    category: "Webdesign + Webflow",
    videoSrc: "/video/Hero.mp4",
    imgSrc: "/images/work.jpg",
    link: "",
  },
  {
    title: "SEO",
    category: "Webflow development",
    videoSrc: "/video/Hero.mp4",
    imgSrc: "/images/work.jpg",
    link: "",
  },
  {
    title: "Digital Marketing",
    category: "Webflow development",
    videoSrc: "/video/Hero.mp4",
    imgSrc: "/images/work.jpg",
    link: "",
  },
  {
    title: "Motion",
    category: "Webflow development",
    videoSrc: "/video/Hero.mp4",
    imgSrc: "/images/work.jpg",
    link: "",
  },
];


SwiperCore.use([FreeMode]);

export default function FeaturedWorks() {
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    const video = card.querySelector("video");
    if (video) {
      video.style.opacity = "1";
      video.play().catch((e) => console.log("Play error", e));
    }
    setHoverIndex(idx);
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    const video = card.querySelector("video");
    if (video) {
      video.style.opacity = "0";
      video.pause();
      video.currentTime = 0;
    }
    setHoverIndex(null);
  };

  return (
    <section className="text-white px-4 py-16 md:py-24">
      <div className="text-center text-xs font-semibold uppercase tracking-wider opacity-60 mb-12 md:mb-16">
        Featured Works
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {works.map((work, idx) => (
          <a
            key={idx}
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (cardsRef.current[idx] = el)}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            className="relative group overflow-hidden w-full cursor-pointer rounded-lg transform transition-all duration-300 ease-in-out"
            style={{
              transform: `scale(${idx === hoverIndex ? 1.2 : 0.8})`,
              zIndex: idx === hoverIndex ? 10 : 1,
            }}
          >
            {/* Media Container */}
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
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 pointer-events-none"
              >
                <source src={work.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Text Below Card */}
            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-wider">
                {work.title}
              </div>
              <div className="text-xs tracking-wider text-gray-400 uppercase">
                {work.category}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile Swiper*/}
      <div className="md:hidden">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={16}
          freeMode={true}
          className="px-4"
        >
          {works.map((work, idx) => (
            <SwiperSlide key={idx}>
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden w-full cursor-pointer rounded-lg block"
              >
                {}
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
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 pointer-events-none"
                  >
                    <source src={work.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                {}
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
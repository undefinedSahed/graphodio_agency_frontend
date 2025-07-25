"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const logos = [
  "/Logo/1-01.png",
  "/Logo/2-01.png",
  "/Logo/3-01.png",
  "/Logo/4-01.png",
  "/Logo/5-01.png",
  "/Logo/6-01.png",
  "/Logo/7-01.png",
  "/Logo/8-01.png",
  "/Logo/9-01.png",
  "/Logo/10-01.png",
  "/Logo/11-01.png",
  "/Logo/12-01.png",
  "/Logo/13-01.png",
  "/Logo/14-01.png",
  "/Logo/15-01.png",
  "/Logo/16-01.png",
  "/Logo/17-01.png",
  "/Logo/18-01.png",
  "/Logo/19-01.png",
  "/Logo/20-01.png",
];

const LogoCarousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth / 2;
      gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden w-full py-1 ">
      <div className="text-center pb-4">
        <h2 className="text-lg tracking-wide">brands and agencies we&apos;ve worked with</h2>
      </div>
      <div ref={trackRef} className="flex w-max lg:gap-12">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={logo}
              alt={`Logo ${index}`}
              width={100}
              height={60}
              className="aspect-[10/6] object-contain invert brightness-0 saturate-0"

            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;

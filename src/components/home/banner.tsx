"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

type DeviceType = "desktop" | "tablet" | "mobile";

export default function Banner() {
  const bannerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!bannerRef.current) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let device: DeviceType = "desktop";
          if (context?.conditions?.isMobile) device = "mobile";
          else if (context?.conditions?.isTablet) device = "tablet";

          const headlineOffset = {
            desktop: {
              from: 140,
              to: 100,
              yEnd: -150,
              scale: 0.5,
              fontSize: 120,
            },
            tablet: { from: 100, to: 60, yEnd: -100, scale: 0.6, fontSize: 90 },
            mobile: { from: 80, to: 40, yEnd: -60, scale: 0.8, fontSize: 48 },
          };

          const paragraphOffset = {
            desktop: { from: 100, to: -180 },
            tablet: { from: 80, to: -120 },
            mobile: { from: 50, to: -60 },
          };
          const hlOffset =
            headlineOffset[device as keyof typeof headlineOffset];

          const paraOffset =
            paragraphOffset[device as keyof typeof paragraphOffset];

          const splitedHeadline = SplitText.create(".headline", {
            type: "words",
          });
          const splitedParagraph = SplitText.create(".para", { type: "lines" });

          const tl = gsap.timeline();

          // Headline animation
          tl.fromTo(
            splitedHeadline.words,
            {
              y: hlOffset.from,
              opacity: 0,
              visibility: "hidden",
              duration: 1.2,
              delay: 1.5,
              stagger: { amount: 0.5, from: "start" },
              fontSize: hlOffset.fontSize,
            },
            {
              y: hlOffset.to,
              opacity: 0.5,
              duration: 1,
              visibility: "visible",
              stagger: { amount: 0.5, from: "start" },
              fontSize: hlOffset.fontSize,
            }
          );

          tl.to(splitedHeadline.words, { opacity: 1, duration: 0.2 });

          tl.to(".headline", {
            y: hlOffset.yEnd,
            scale: hlOffset.scale,
            duration: 0.6,
          });

          // Paragraph animation
          tl.fromTo(
            splitedParagraph.lines,
            {
              y: paraOffset.from,
              opacity: 0,
              visibility: "hidden",
              duration: 0.5,
              stagger: 0.2,
            },
            {
              y: paraOffset.to,
              opacity: 1,
              visibility: "visible",
              duration: 0.5,
              stagger: 0.2,
            }
          );
        }
      );

      return () => mm.revert();
    },
    { scope: bannerRef }
  );

  return (
    <section
      className="py-10 text-white/90 flex justify-center"
      ref={bannerRef}
      aria-label="Banner Section"
    >
      <div className="container">
        <div className="text-center max-w-6xl mx-auto">
          <h1
            className={`headline font-bold text-center pb-7 text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[120px] leading-tight`}
          >
            Crafting Visuals That Make Your Brand Stand Out
          </h1>
          <p className={`para px-4 text-lg md:text-xl text-center md:px-60`}>
            At Graphodio, we are a full-service creative agency driven by
            innovation, passion, and a commitment to delivering exceptional
            design solutions. Since our inception, we&apos;ve been transforming
            ideas into stunning visuals, building brands that resonate, and
            creating experiences that leave a lasting impact.
          </p>
        </div>
      </div>
    </section>
  );
}

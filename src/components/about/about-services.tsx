"use client";

import { services } from "@/lib/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutServices() {
  const secRef = useRef<HTMLElement | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Set screen size only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.innerWidth >= 1024);
    }
  }, []);

  useGSAP(
    () => {
      if (!isLargeScreen) return;

      const boxes = secRef.current?.querySelectorAll(
        ".animate_service_fade"
      ) as NodeListOf<HTMLElement>;
      const videos = secRef.current?.querySelectorAll(
        ".service-video"
      ) as NodeListOf<HTMLElement>;

      boxes?.forEach((box, index) => {
        ScrollTrigger.create({
          trigger: box,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            fadeOthers(index);
            showVideo(index);
          },
          onEnterBack: () => {
            fadeOthers(index);
            showVideo(index);
          },
        });
      });

      function fadeOthers(activeIndex: number) {
        boxes?.forEach((box, i) => {
          gsap.to(box, {
            opacity: i === activeIndex ? 1 : 0.1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }

      function showVideo(activeIndex: number) {
        videos?.forEach((video, i) => {
          if (i === activeIndex) {
            gsap.fromTo(
              video,
              { x: 100, opacity: 0, rotate: 30 },
              {
                x: 0,
                rotate: 0,
                opacity: 1,
                duration: 0.4,
                ease: "bounce.inOut",
              }
            );
          } else {
            gsap.set(video, { opacity: 0 });
          }
        });
      }
    },
    { scope: secRef, dependencies: [isLargeScreen] }
  );

  const gridPositions = [
    { gridColumnStart: 1, gridRowStart: 1 },
    { gridColumnStart: 2, gridRowStart: 2 },
    { gridColumnStart: 3, gridRowStart: 3 },
  ];

  return (
    <section className="py-8 lg:py-20" ref={secRef}>
      <div className="container">
        <div className="mb-12 text-center lg:text-start">
          <h2 className="text-2xl lg:text-5xl font-bold lg:mb-4 ">
            We can help you with
          </h2>
        </div>

        <div className="grid lg:grid-rows-3 lg:grid-cols-3 gap-x-8 lg:gap-y-[30px]  gap-y-[45px] relative">
          {services.map((service, index) => {
            const position = gridPositions[index] || {};
            return (
              <div
                key={service.id}
                className="max-w-sm mx-auto pr-6 rounded-lg animate_service_fade text-center lg:text-start"
                style={
                  isLargeScreen
                    ? {
                        opacity: 0.2,
                        ...position,
                      }
                    : {}
                }
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl mx-auto lg:mx-0 lg:text-5xl font-semibold leading-tight ">
                    {service.title}
                  </h3>
                  <video
                    className="hidden md:block w-24 h-24 object-cover service-video"
                    src={service.videos[0]}
                    autoPlay
                    loop
                    muted
                    preload="metadata"
                    style={{ opacity: 0, willChange: "transform, opacity" }}
                  />
                </div>
                <p className="text-gray-300 text-xl lg:tracking-wider font-[Roboto]">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
  const sectionRef = useRef(null);

  useGSAP(
    (context) => {
      if (window.innerWidth >= 1014) {
        const q = context.selector;
        const elements = q && q(".elem");

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 2,
        });

        elements.forEach((element: HTMLElement, index: number) => {
          const progress = element.querySelector(".progress");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 10%",
              end: "+=800",
              scrub: 2,
            },
          });

          tl.fromTo(
            progress,
            { strokeDashoffset: 565.48 },
            { strokeDashoffset: 0, duration: 1 }
          );

          tl.fromTo(
            element,
            {
              y: 0,
              x: index === 0 ? 30 : -30,
              duration: 1,
            },
            {
              y: 150,
              x: index === 0 ? 150 : -150,
              duration: 1,
            }
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="lg:h-screen flex justify-center items-center relative hwww"
      ref={sectionRef}
    >
      <div className="container text-white text-center lg:-mt-32 mt-[130px]">
        <h2 className="lg:text-[64px] text-4xl font-bold leading-tight text-center pb-12 max-w-2xl mx-auto">
          We Create at the intersection of:
        </h2>

        <div className="hidden lg:flex justify-center">
          <div className="relative h-64 w-64 translate-x-[30px] rounded-full flex justify-center items-center elem">
            <svg className="absolute w-full h-full scale-[140%] rotate-[270deg]">
              <circle
                cx="50%"
                cy="50%"
                r="90"
                stroke="transparent"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                className="progress"
                cx="50%"
                cy="50%"
                r="90"
                stroke="#1b1b1b"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="565.48"
                strokeDashoffset="565.48"
              />
            </svg>
            {/* Span with Roboto font */}
            <span
              className="z-10 flex flex-col gap-2 justify-center items-center"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <div className="h-16 w-16 flex justify-center items-center border-2 border-[#1b1b1b] rounded-full overflow-hidden">
                <img
                  src="/images/Strategy.png"
                  alt="strategy"
                  className="h-10 w-10 object-contain animate-bounce"
                />
              </div>
              <span>Strategy</span>
            </span>
          </div>

          <div className="relative h-64 w-64 rounded-full flex justify-center items-center">
            <svg className="absolute w-full h-full scale-[140%] rotate-[270deg]">
              <circle
                cx="50%"
                cy="50%"
                r="90"
                stroke="#1b1b1b"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                className="progress"
                cx="50%"
                cy="50%"
                r="90"
                stroke="#1b1b1b"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="565.48"
                strokeDashoffset="565.48"
              />
            </svg>
            <span
              className="z-10 flex flex-col gap-2 justify-center items-center"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <div className="h-16 w-16 flex justify-center items-center border-2 border-[#1b1b1b] rounded-full">
                <img
                  src="/images/Design.png"
                  alt="Design"
                  className="h-10 w-10 object-contain animate-bounce"
                />
              </div>
              <span>Design</span>
            </span>
          </div>

          <div className="relative h-64 w-64 -translate-x-[30px] rounded-full flex justify-center items-center elem">
            <svg className="absolute w-full h-full scale-[140%] rotate-[270deg]">
              <circle
                cx="50%"
                cy="50%"
                r="90"
                stroke="transparent"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                className="progress"
                cx="50%"
                cy="50%"
                r="90"
                stroke="#1b1b1b"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="565.48"
                strokeDashoffset="565.48"
              />
            </svg>
            <span
              className="z-10 flex flex-col gap-2 justify-center items-center"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <div className="h-16 w-16 flex justify-center items-center border-2 border-[#1b1b1b] rounded-full">
                <img
                  src="/images/Storytelling.png"
                  alt="storytelling"
                  className="h-10 w-10 object-contain animate-bounce"
                />
              </div>
              <span>Storytelling</span>
            </span>
          </div>
        </div>

        {/* Mobile & Tab */}
        <div className="lg:hidden max-h-fit">
          {/* Repeat same styling for spans on mobile */}
          <div className="flex justify-center items-center">
            <div className="w-48 h-48 rounded-full border-2 border-[#1b1b1b] relative">
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-center"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <div className="h-16 w-16 flex justify-center items-center border-2 border-[#1b1b1b] rounded-full">
                  <img
                    src="/images/Strategy.png"
                    alt="Strategy"
                    className="h-10 w-10 object-contain animate-bounce"
                  />
                </div>
                <span>Strategy</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center -translate-x-20 -translate-y-16">
            <div className="w-48 h-48 rounded-full border-2 border-[#1b1b1b] relative">
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-center"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <div className="h-16 w-16 flex justify-center items-center border-2 border-[#1b1b1b] rounded-full">
                  <img
                    src="/images/Design.png"
                    alt="Design"
                    className="h-10 w-10 object-contain animate-bounce"
                  />
                </div>
                <span>Design</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center translate-x-20 -translate-y-64">
            <div className="w-48 h-48 rounded-full border-2 border-[#1b1b1b] relative">
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-center"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <div className="h-16 w-16 flex justify-center items-center border-2 border-[#1b1b1b] rounded-full">
                  <img
                    src="/images/Storytelling.png"
                    alt="Storytelling"
                    className="h-10 w-10 object-contain animate-bounce"
                  />
                </div>
                <span>Storytelling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.innerWidth >= 1024) {
        const elements = sectionRef.current?.querySelectorAll(".animate-group");

        gsap.from(elements as NodeListOf<HTMLElement>, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          filter: "blur(6px)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=800",
            scrub: 2,
            pin: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="lg:min-h-screen -mt-28 lg:mt-0 flex justify-center items-center text-white font-extralight px-4 pb-16 lg:py-0"
    >
      <div className="text-center max-w-2xl">
        {}
        <p className="lg:text-5xl text-2xl lg:leading-snug mx-auto flex flex-wrap justify-center gap-3 ">
          <span className="animate-group">Graphodio:</span>
          <span className="animate-group"> Where</span>
          <span className="animate-group">Creativity</span>
          <span className="animate-group">
            <span className="inline-flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 border-2 border-primary rounded-full">
              <Image
                src="/images/Design.png"
                alt="Design"
                width={40}
                height={40}
                className="lg:h-10 lg:w-10 w-6 h-6 object-contain animate-bounce"
              />
            </span>
          </span>

          <span className="animate-group flex gap-2">
            <span>Meets</span>
          </span>

          <span className="animate-group">Strategy</span>

          <span className="animate-group flex items-center gap-2">
            <span className="inline-flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 border-2 border-primary rounded-full">
              <Image
                src="/images/Strategy.png"
                alt="Design"
                width={40}
                height={40}
                className="lg:h-10 lg:w-10 w-6 h-6 object-contain animate-bounce"
              />
            </span>
            <span>and</span>
          </span>

          <span className="animate-group flex items-center gap-2">
            <span>Brands</span>
            <span className="inline-flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 border-2 border-primary rounded-full">
              <Image
                src="/images/Brand.png"
                alt="Design"
                width={40}
                height={40}
                className="lg:h-10 lg:w-10 w-6 h-6 object-contain animate-bounce"
              />
            </span>
          </span>

          <span className="animate-group">Come</span>
          <span className="animate-group">to</span>
          <span className="animate-group">Life</span>
        </p>

        {/* Paragraph or smaller text with Roboto font */}
        <div
          className="animate-group mt-10 flex justify-center"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <Link href="/about">
            <Button className="group w-24 lg:w-28 h-11 lg:h-12 flex items-center gap-4 lg:gap-5 text-base lg:text-lg border-2 border-[#1b1b1b] bg-[#1d1d1d]/30">
              <User className="w-6 h-6 lg:w-7 lg:h-7 rounded-full group-hover:p-0" />
              <span>About</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

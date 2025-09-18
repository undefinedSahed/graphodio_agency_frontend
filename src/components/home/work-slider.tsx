"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { MoveDown, MoveUp, Workflow, Rocket, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { works } from "@/lib/constant";

export default function StackedSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const slides = works.filter((work) => work.home);

  // move to next (top card -> bottom)
  const moveNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // move to previous (bottom card -> top)
  const movePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // animate cards whenever current changes
  useEffect(() => {
    const cards = gsap.utils.toArray(".slide") as HTMLDivElement[];
    cards.forEach((card, i) => {
      const order = (i - current + slides.length) % slides.length;
      gsap.to(card, {
        y: -order * 20,
        scale: 1 - order * 0.02,
        zIndex: slides.length - order,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, [current, slides.length]);

  // initial stack
  useEffect(() => {
    const cards = gsap.utils.toArray(".slide") as HTMLDivElement[];
    cards.forEach((card, i) => {
      const order = (i - current + slides.length) % slides.length;
      gsap.set(card, {
        y: -order * 20,
        scale: 1 - order * 0.02,
        zIndex: slides.length - order,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section className="py-8 lg:py-20">
      <div className="container">
        <div className="pb-10 lg:max-w-6xl lg:px-40 mx-auto">
          <p className="lg:text-5xl text-xl leading-5 text-justify lg:leading-snug mx-auto flex flex-wrap justify-center gap-3 ">
            <span className="animate-group">WE</span>
            <span className="animate-group">PARTNER</span>
            <span className="animate-group">WITH</span>
            <span className="animate-group">DREAMERS,</span>
            <span className="animate-group">DISRUPTORS,</span>
            <span className="animate-group flex -mt-1 items-center gap-2">
              <span>AND BRANDS THAT DARE TO STAND OUT.</span>
            </span>
            <span className="animate-group flex items-center gap-2">
              <span>FROM LOGO TO LAUNCH</span>
              <span className="inline-flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 border-2 border-[#1b1b1b] rounded-full">
                <Rocket className="w-5 h-5 lg:w-6 lg:h-6 animate-bounce" />
              </span>
              <span>WE TURN IDEAS INTO</span>
            </span>
            <span className="animate-group flex items-center gap-2">
              <span>digital experiences</span>
              <span className="inline-flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 border-2 border-[#1b1b1b] rounded-full">
                <Globe className="w-5 h-5 lg:w-6 lg:h-6 animate-bounce" />
              </span>
            </span>
          </p>

          <div className="animate-group mt-8 flex justify-center">
            <Link href="/portfolio">
              <Button className="group w-28 h-12 flex items-center gap-5 text-lg border-2 border-[#1b1b1b] cursor-pointer bg-[#1d1d1d]/30">
                <Workflow className="w-14 h-12 lg:p-1 rounded-full lg:group-hover:p-0" />
                <span>See More</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative max-w-4xl h-[60svh] mx-auto mt-20">
          <div ref={containerRef} className="relative h-full w-full">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="slide absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden shadow-2xl"
              >
                <Link
                  href={`/portfolio/${slide.slug}`}
                  className="relative block h-full"
                >
                  <div className="absolute bottom-0 w-full h-full opacity-70 bg-gradient-to-t from-black to-white/6"></div>
                  <Image
                    src={slide.thumbnail}
                    alt={`slide-${i}`}
                    width={1000}
                    height={700}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="absolute z-20 translate-x-1/2 right-1/2 lg:right-[-60px] lg:top-1/2 -translate-y-1/2 flex lg:flex-col gap-2">
            <button
              onClick={movePrev}
              className="bg-white text-black px-3 py-2 lg:py-1 rounded shadow cursor-pointer"
            >
              <MoveUp />
              <span className="sr-only">Previous</span>
            </button>
            <button
              onClick={moveNext}
              className="bg-white text-black px-3 py-2 lg:py-1 rounded shadow cursor-pointer"
            >
              <MoveDown />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from 'next/link';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { points } from "@/lib/constant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}



export default function AboutMissionVision() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".amv-section");

      sections.forEach((section, idx) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        });

        if (idx === 0) {
          tl.from(section.querySelectorAll(".amv-kicker, .amv-heading, .amv-body"), {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.1,
          });
        } else if (idx === 1) {
          tl.from(section.querySelectorAll(".amv-kicker, .amv-heading, .amv-body"), {
            scale: 0.9,
            rotate: -3,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1,
          });
        } else {
          tl.from(section.querySelectorAll(".amv-kicker, .amv-heading, .amv-body"), {
            y: 80,
            skewY: 5,
            opacity: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.12,
          });
        }
      });

      // Watermark effect
      const watermark = document.querySelector(".amv-watermark");
      if (watermark) {
        gsap.to(watermark, {
          scale: 1.08,
          rotate: -3,
          opacity: 0.15,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about-mission-vision"
      className="relative w-full bg-black text-white"
      aria-label="About Mission Vision"
    >
      {/* Subtle grid bg */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Watermark */}
     <div className="amv-watermark pointer-events-none absolute top-12 sm:top-16 md:top-20 lg:top-24 select-none opacity-10 mix-blend-screen w-full flex justify-center">
  <span className="block text-[6rem] sm:text-[12rem] md:text-[16rem] lg:text-[22rem] leading-none font-black tracking-tighter text-white/80 text-center">
    graphodio
  </span>
</div>



      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 space-y-12 font-[Roboto]">
        {points.map((item, idx) => (
          <article
            key={item.id}
            id={item.id}
            className="amv-section grid min-h-[50vh] grid-cols-1 items-center gap-10 md:grid-cols-2"
          >
            {idx === 1 ? (
              // OUR MISSION → Flipped layout
              <>
                {/* RIGHT (text) */}
                <div className="relative z-10 order-2 md:order-2">
                  <span className="amv-kicker mb-3 inline-block text-sm tracking-[0.3em] text-red-500/90">
                    WHAT DRIVES US
                  </span>
                  <h2 className="amv-heading font-extrabold leading-[0.95] tracking-tight text-4xl md:text-6xl">
                    {item.heading}
                  </h2>
                  <p className="amv-body mt-5 max-w-xl text-xl/relaxed md:text-base/relaxed text-white/80 font-[Roboto]">
                    {item.body}
                  </p>

                  <div className="amv-body mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/portfolio"
                      className="rounded-2xl border border-white/15 px-4 py-2 text-xs uppercase tracking-wide transition-all hover:bg-white hover:text-black"
                    >
                      Explore Services
                    </Link>
                    <Link
                      href="/portfolio"
                      className="rounded-2xl border border-white/15 px-4 py-2 text-xs uppercase tracking-wide transition-all hover:bg-white hover:text-black"
                    >
                      View Works
                    </Link>
                    
                  </div>
                </div>

                {/* LEFT (badges box) */}
                <div className="relative h-[18vh] md:h-[30vh]  justify-center order-1 md:order-1 hidden sm:flex">
                  <div
                    aria-hidden
                    className="relative w-[70%] h-full rounded-[2rem] border border-white/10
  bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.1),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,165,0,0.15),transparent_35%)]
  shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-[1px]
  hidden sm:block"
                  >
                    <Badge label="Impactful" className="absolute left-6 top-6" />
                    <Badge label="Innovative" className="absolute right-8 top-12" />
                    <Badge label="Strategic" className="absolute left-10 top-20" />
                    <Badge label="Branding" className="absolute right-10 top-28" />
                    <Badge label="Web Design" className="absolute left-6 bottom-20" />
                    <Badge label="Content Creation" className="absolute right-8 bottom-12" />
                    <Badge label="Marketing" className="absolute left-10 bottom-6" />
                  </div>
                </div>
              </>
            ) : (
              // ABOUT & VISION
              <>
                {/* LEFT (text) */}
                <div className="relative z-10">
                  <span className="amv-kicker mb-3 inline-block text-sm tracking-[0.3em] text-red-500/90">
                    {idx === 0 ? "WHO WE ARE" : "WHERE WE'RE HEADED"}
                  </span>
                  <h2 className="amv-heading font-extrabold leading-[0.95] tracking-tight text-4xl md:text-6xl">
                    {item.heading}
                  </h2>
                  <p className="amv-body mt-5 max-w-xl text-lg/relaxed md:text-base/relaxed text-white/80">
                    {item.body}
                  </p>
                </div>

                {/* RIGHT (badges box) */}
                <div className="relative h-[18vh] md:h-[30vh] justify-center  hidden sm:flex">
                  <div
                    aria-hidden
                    className="relative w-[70%] h-full rounded-[2rem] border border-white/10
  bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.1),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,165,0,0.15),transparent_35%)]
  shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-[1px]
  hidden sm:block"
                  >
                    {idx === 0 && (
                      <>
                        <Badge label="Designers" className="absolute left-4 top-6" />
                        <Badge label="Developers" className="absolute right-6 top-16" />
                        <Badge label="Photographers" className="absolute left-10 top-24" />
                        <Badge label="Videographers" className="absolute right-10 top-32" />
                        <Badge label="Marketers" className="absolute left-6 bottom-16" />
                        <Badge label="Brand Identity" className="absolute right-8 bottom-12" />
                        <Badge label="Websites" className="absolute left-12 bottom-6" />
                        <Badge label="Content Creation" className="absolute right-6 bottom-6" />
                      </>
                    )}

                    {idx === 2 && (
                      <>
                        <Badge label="Global Recognition" className="absolute left-6 top-6" />
                        <Badge label="Brand Transformation" className="absolute right-8 top-14" />
                        <Badge label="Leadership" className="absolute left-10 top-24" />
                        <Badge label="Design & Innovation" className="absolute right-10 top-28" />
                        <Badge label="Digital Solutions" className="absolute left-6 bottom-20" />
                        <Badge label="Creative Solutions" className="absolute right-8 bottom-12" />
                        <Badge label="Growth" className="absolute left-10 bottom-6" />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Badge({ label, className = "" }: { label: string; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Pop-in on mount
    gsap.fromTo(
      el,
      { scale: 0.5, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: gsap.utils.random(0, 0.3),
      }
    );

    // Orbit animation
    const radiusX = gsap.utils.random(15, 35);
    const radiusY = gsap.utils.random(10, 25);
    const angleStart = gsap.utils.random(0, 360);

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(el, {
      motionPath: {
        path: [
          { x: radiusX * Math.cos((angleStart * Math.PI) / 180), y: radiusY * Math.sin((angleStart * Math.PI) / 180) },
          { x: radiusX * Math.cos(((angleStart + 90) * Math.PI) / 180), y: radiusY * Math.sin(((angleStart + 90) * Math.PI) / 180) },
          { x: radiusX * Math.cos(((angleStart + 180) * Math.PI) / 180), y: radiusY * Math.sin(((angleStart + 180) * Math.PI) / 180) },
          { x: radiusX * Math.cos(((angleStart + 270) * Math.PI) / 180), y: radiusY * Math.sin(((angleStart + 270) * Math.PI) / 180) },
        ],
        type: "cubic",
        autoRotate: false,
      },
      duration: gsap.utils.random(6, 12),
      ease: "sine.inOut",
      repeat: -1,
    });

   
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute select-none rounded-2xl border border-white/15 bg-white/10 
      px-3 py-1 text-[10px] uppercase tracking-wider text-white/90 shadow-md backdrop-blur 
      transition-transform duration-300 hover:scale-110 hover:bg-white/20 ${className}`}
    >
      {label}
    </div>
  );
}

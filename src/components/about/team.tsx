"use client";


import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { teammates } from "@/lib/constant";
import Image from "next/image";


gsap.registerPlugin(ScrollTrigger);


export default function Team() {
  const secRef = useRef<HTMLElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null); // mobile toggle


  useGSAP(
    (context) => {
      if (window.innerWidth >= 1024) {
        const q = context.selector;


        ScrollTrigger.create({
          trigger: secRef.current,
          start: "top top",
          end: "+=3500",
          scrub: true,
          pin: true,
        });


        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: secRef.current,
            start: "10% bottom",
            end: "200% top",
            scrub: true,
          },
        });


        if (q) {
          tl.to(q(".animate_text_one"), { xPercent: 200 })
            .to(q(".animate_text_two"), { xPercent: 55 }, "<")
            .to(q(".animate_text_three"), { xPercent: -20 }, "<")
            .to(q(".animate_photos_group"), {
              opacity: 1,
              yPercent: -200,
              ease: "power1.out",
              stagger: 0.3,
            });
        }
      }
    },
    { scope: secRef }
  );


  const handleToggle = (index: number) => {
    if (window.innerWidth < 1024) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };


  return (
    <section ref={secRef} className="py-12 lg:py-0">
      <div className="container relative lg:translate-y-[10%]">
        <div className="text-center px-4 lg:px-0">
          <h2 className="text-5xl sm:text-7xl lg:text-[215px] font-bold leading-none mb-8 lg:mb-4">
            <span className="animate_text_one inline-block">Our</span>
            <br />
            <span className="animate_text_two inline-block">Talented</span>{" "}
            <span className="animate_text_three inline-block">Teammates</span>
          </h2>
        </div>


        {/* First Row */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 transform-gpu">
            {teammates.map((member, index) => {
              const isOpen = openIndex === index;


              return (
                <div
                  key={index}
                  className="flex rounded-lg duration-500 animate_photos_group"
                >
                  <div
                    className="relative overflow-hidden group w-full rounded-md cursor-pointer"
                    onClick={() => handleToggle(index)}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      height={1200}
                      width={1200}
                      className="w-full aspect-square object-cover rounded-lg lg:saturate-70% group-hover:saturate-[70%]"
                    />
                    <div
                      className={`
                        absolute left-0 w-full h-full bg-black/70 p-4 lg:p-5 duration-500 flex flex-col justify-between
                        ${isOpen ? "top-0" : "top-full"}
                        lg:top-full lg:group-hover:top-0
                      `}
                    >
                      <div className="flex basis-1/2 justify-between text-lg lg:text-xl">
                        <p>{member.name}</p>
                        <p>{member.role}</p>
                      </div>
                      <div>
                        <p className="text-center pb-2 text-lg lg:text-xl">
                          {member.headline}
                        </p>
                        <p className="text-justify text-sm lg:text-base">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

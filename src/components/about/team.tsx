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


    //  fade out all texts together
   .to(
  [q(".animate_text_one"), q(".animate_text_two"), q(".animate_text_three")],
  { opacity: 0.01, duration: 1 }, 
  "<"
)




    //photos fade in + move up
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
        {/* Heading */}
        <div className="text-center px-4 lg:px-0">
          <h2 className="text-5xl sm:text-7xl lg:text-[215px] font-bold leading-none mb-8 lg:mb-4">
            <span className="animate_text_one inline-block">Our</span>
            <br />
            <span className="animate_text_two inline-block">Talented</span>{" "}
            <span className="animate_text_three inline-block">Teammates</span>
          </h2>
        </div>


        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 transform-gpu">
          {teammates.map((member, index) => {
            const isOpen = openIndex === index;


            return (
              <div
                key={index}
                className="relative group rounded-2xl overflow-hidden shadow-lg animate_photos_group"
                onClick={() => handleToggle(index)}
              >
                {/* Background Image */}
                <Image
                  src={member.image}
                  alt={member.name}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />


                {/* Overlay */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                    flex flex-col justify-end p-6 transition-all duration-500
                    ${isOpen ? "opacity-100" : "lg:opacity-0 lg:group-hover:opacity-100"}
                  `}
                >
                  {/* Name + Role */}
                  <div className="text-white">
                    <h3 className="text-3xl font-semibold">{member.name}</h3>
                    <p className="text-sm opacity-80 font-[Roboto]">{member.role}</p>
                  </div>


         
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

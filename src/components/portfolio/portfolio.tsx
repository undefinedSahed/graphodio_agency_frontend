"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { works } from "@/lib/constant"
import { slugify } from "@/lib/utils";


export default function Portfolio() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>

      {/* Original Section */}
      <main className="min-h-screen  text-white px-6  py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-60 w-full max-w-7xl">
          {works.slice(0, 2).map((work, idx) => (
            <div
              key={idx}
              className={`col-span-${idx === 0 ? "3" : "2"
                } flex flex-col justify-end`}
            >
              <div className="flex-grow flex flex-col justify-end">
                <Link
                  href={`/portfolio/${slugify(work.title)}`}
                  onMouseEnter={() => setHovered(work.title)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative block overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out ${idx === 0 ? "h-[600px]" : "h-[350px]"
                    }`}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 z-0 transition-all duration-500"
                    style={{
                      backgroundImage: `url(${work.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: hovered === work.title ? "blur(8px)" : "none",
                    }}
                  />

                  {/* Foreground Content */}
                  <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                    <Image
                      src={work.thumbnail}
                      alt={work.title}
                      width={idx === 0 ? 680 : 320}
                      height={idx === 0 ? 520 : 280}
                      className="object-contain max-h-full"
                    />
                  </div>

                  {/* Price Badge */}
                  {/* <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
                    {work.price}
                  </div> */}
                </Link>
              </div>

              {/* Title and Category */}
              <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
                <span className="text-white font-bold">{work.title}</span> •{" "}
                {work.tags.map((tag) => tag)}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* New Section*/}
      <section className=" text-white px-6 py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 w-full max-w-7xl">
          {/* Small Card */}
          <div className="col-span-2 flex flex-col justify-end mb-20">
            <Link
              href={`/portfolio/${slugify(works[2].title)}`}
              onMouseEnter={() => setHovered(`${works[2].title}`)}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[350px] overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
            >
              <div
                className="absolute inset-0 z-0 transition-all duration-500"
                style={{
                  backgroundImage: `url(${works[2].thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: hovered === works[2].title ? "blur(8px)" : "none",
                }}
              />
              <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                <Image
                  src={works[2].thumbnail}
                  alt={works[2].title}
                  width={320}
                  height={280}
                  className="object-contain max-h-full"
                />
              </div>
              {/* <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
                49$
              </div> */}
            </Link>
            <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
              <span className="text-white font-bold">{works[2].title}</span>
              {
                works[0].tags.map((tag) => (
                  tag
                ))
              }
            </div>
          </div>

          {/* Large Card*/}
          <div className="col-span-3 flex flex-col justify-end">
            <Link
              href={`/portfolio/${slugify(works[3].title)}`}
              onMouseEnter={() => setHovered(works[3].title)}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[600px] overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
            >
              <div
                className="absolute inset-0 z-0 transition-all duration-500"
                style={{
                  backgroundImage: `url(${works[3].thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: hovered === works[3].title ? "blur(8px)" : "none",
                }}
              />
              <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                <Image
                  src={works[3].thumbnail}
                  alt={works[3].title}
                  width={680}
                  height={520}
                  className="object-contain max-h-full"
                />
              </div>
              {/* <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
                49$
              </div> */}
            </Link>
            <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
              <span className="text-white font-bold">{works[3].title}</span>
              {
                works[0].tags.map((tag) => (
                  tag
                ))
              }
            </div>
          </div>
        </div>
      </section>
      {/*3rd section*/}
      <section className=" text-white px-6 py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-40 w-full max-w-7xl">

          {/* Left card*/}
          <div className="col-span-2 flex flex-col justify-end mb-20">
            <Link
              href={`/portfolio/${slugify(works[4].title)}`}
              onMouseEnter={() => setHovered(works[4].title)}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[350px] overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
            >
              {/* Main image */}
              <div
                className="absolute inset-0 z-0 transition-all duration-500"
                style={{
                  backgroundImage: `url(${works[4].thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: hovered === works[4].title ? "blur(8px)" : "none",
                }}
              />
              <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                { }
                <Image
                  src={works[4].thumbnail}
                  alt={works[4].title}
                  width={320}
                  height={280}
                  className="object-contain max-h-full"
                />
              </div>
              {/* <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
                49$
              </div> */}
            </Link>
            <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
              <span className="text-white font-bold">{works[4].title}</span>
              {
                works[4].tags.map((tag) => (
                  tag
                ))
              }
            </div>
          </div>

          {/* Right card*/}
          <div className="col-span-2 flex flex-col justify-end">
            <Link
              href={`/portfolio/${slugify(works[5].title)}`}
              onMouseEnter={() => setHovered(works[5].title)}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[350px] overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
            >
              {/* Main image */}
              <div
                className="absolute inset-0 z-0 transition-all duration-500"
                style={{
                  backgroundImage: `url(${works[5].title})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: hovered === works[5].title ? "blur(8px)" : "none",
                }}
              />
              <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                { }
                <Image
                  src={works[5].thumbnail}
                  alt={works[5].title}
                  width={320}
                  height={280}
                  className="object-contain max-h-full"
                />
              </div>
              {/* <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
                49$
              </div> */}
            </Link>
            <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
              <span className="text-white font-bold">{works[5].title}</span>
              {
                works[5].tags.map((tag) => (
                  tag
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </>

  );
}
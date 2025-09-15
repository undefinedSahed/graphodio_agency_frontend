"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { works } from "@/lib/constant";
import { slugify } from "@/lib/utils";

export default function Portfolio() {
  const [hovered, setHovered] = useState<string | null>(null);

  console.log("Works:", works?.length);

  return (
    <>
      {/* Section 1 */}
      <main className="min-h-screen text-white px-4 sm:px-6 py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-60 w-full max-w-7xl">
          {works.slice(0, 2).map((work, idx) => (
            <div
              key={idx}
              className={`md:col-span-${idx === 0 ? "3" : "2"} flex flex-col justify-end`}
            >
              <div className="flex-grow flex flex-col justify-end">
                <Link
                  href={`/portfolio/${slugify(work.title)}`}
                  onMouseEnter={() => setHovered(work.title)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative block overflow-hidden border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out ${idx === 0 ? "h-[300px] sm:h-[400px] md:h-[600px]" : "h-[200px] sm:h-[300px] md:h-[350px]"}`}
                >
                  {/* Background */}
                  <div
                    className="absolute inset-0 z-0 transition-all duration-500"
                    style={{
                      backgroundImage: `url(${work.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: hovered === work.title ? "blur(8px)" : "none",
                    }}
                  />

                  {/* Foreground image */}
                  <div className="relative z-10 w-full h-full p-4 sm:p-6 flex items-center justify-center">
                    <Image
                      src={work.thumbnail}
                      alt={work.title}
                      width={idx === 0 ? 680 : 320}
                      height={idx === 0 ? 520 : 280}
                      className="object-contain max-h-full"
                    />
                  </div>
                </Link>
              </div>

              <div className="mt-3 text-xs sm:text-sm font-[Roboto] tracking-widest text-white/80 flex justify-between flex-wrap">
                <span className="text-white font-bold">{work.title}</span> • {work.tags.join(" ")}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Section 2 */}
      <section className="text-white px-4 sm:px-6 py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 w-full max-w-7xl">
          {/* Small Card */}
          <div className="md:col-span-2 flex flex-col justify-end mb-10 md:mb-20">
            <Link
              href={`/portfolio/${slugify(works[2].title)}`}
              onMouseEnter={() => setHovered(works[2].title)}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[200px] sm:h-[300px] md:h-[350px] overflow-hidden border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
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
              <div className="relative z-10 w-full h-full p-4 sm:p-6 flex items-center justify-center">
                <Image
                  src={works[2].thumbnail}
                  alt={works[2].title}
                  width={320}
                  height={280}
                  className="object-contain max-h-full"
                />
              </div>
            </Link>
            <div className="mt-3 text-xs sm:text-sm font-[Roboto] tracking-widest text-white/80 flex justify-between flex-wrap">
              <span className="text-white font-bold">{works[2].title}</span> • {works[0].tags.join(" ")}
            </div>
          </div>

          {/* Large Card */}
          <div className="md:col-span-3 flex flex-col justify-end">
            <Link
              href={`/portfolio/${slugify(works[3].title)}`}
              onMouseEnter={() => setHovered(works[3].title)}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
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
              <div className="relative z-10 w-full h-full p-4 sm:p-6 flex items-center justify-center">
                <Image
                  src={works[3].thumbnail}
                  alt={works[3].title}
                  width={680}
                  height={520}
                  className="object-contain max-h-full"
                />
              </div>
            </Link>
            <div className="mt-3 text-xs sm:text-sm font-[Roboto] tracking-widest text-white/80 flex justify-between flex-wrap">
              <span className="text-white font-bold">{works[3].title}</span> • {works[0].tags.join(" ")}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="text-white px-4 sm:px-6 py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-40 w-full max-w-7xl">
          {/* Left card */}
          <div className="md:col-span-2 flex flex-col justify-end mb-10 md:mb-20">
            <Link
              href={`/portfolio/${slugify(works[4].title)}`}
              onMouseEnter={() => setHovered(works[4].title)}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[200px] sm:h-[300px] md:h-[350px] overflow-hidden border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
            >
              <div
                className="absolute inset-0 z-0 transition-all duration-500"
                style={{
                  backgroundImage: `url(${works[4].thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: hovered === works[4].title ? "blur(8px)" : "none",
                }}
              />
              <div className="relative z-10 w-full h-full p-4 sm:p-6 flex items-center justify-center">
                <Image
                  src={works[4].thumbnail}
                  alt={works[4].title}
                  width={320}
                  height={280}
                  className="object-contain max-h-full"
                />
              </div>
            </Link>
            <div className="mt-3 text-xs sm:text-sm font-[Roboto] tracking-widest text-white/80 flex justify-between flex-wrap">
              <span className="text-white font-bold">{works[4].title}</span> • {works[4].tags.join(" ")}
            </div>
          </div>

          {/* Right card */}
          {/* <div className="md:col-span-2 flex flex-col justify-end">
            <Link
              href={`/portfolio/${slugify(works[5].title)}`}
              onMouseEnter={() => setHovered(works[5].title)}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[200px] sm:h-[300px] md:h-[350px] overflow-hidden border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
            >
              <div
                className="absolute inset-0 z-0 transition-all duration-500"
                style={{
                  backgroundImage: `url(${works[5].thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: hovered === works[5].title ? "blur(8px)" : "none",
                }}
              />
              <div className="relative z-10 w-full h-full p-4 sm:p-6 flex items-center justify-center">
                <Image
                  src={works[5].thumbnail}
                  alt={works[5].title}
                  width={320}
                  height={280}
                  className="object-contain max-h-full"
                />
              </div>
            </Link>
            <div className="mt-3 text-xs sm:text-sm font-[Roboto] tracking-widest text-white/80 flex justify-between flex-wrap">
              <span className="text-white font-bold">{works[5].title}</span> • {works[5].tags.join(" ")}
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

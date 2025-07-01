"use client";

import { useState } from "react";
import Image from "next/image";

type Project = {
  title: string;
  category: string;
  date: string;
  href: string;
  images: string[]; 
  video: string;
};

const projects: Project[] = [
  {
    title: "Amazon",
    category: "WEBDESIGN + WEBFLOW",
    date: "SEP 2024",
    href: "/works/studio-fugu",
    images: [
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/68336ab5fdbaa709e057e4d1_home-card-fugu%402x.webp",
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c6f415e95f823343d747d0_02.webp",
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c6f4194e0fa8ef249e247f_03.webp",
    ],
    video:
      "https://eliotbesson.b-cdn.net/Studio%20Fugu%20-%20MP4%20OPTI/Fugu%20-%2002.mp4",
  },
  {
    title: "Graphics Design",
    category: "WEB DESIGN + MEDIA",
    date: "APRIL 2024",
    href: "/works/joyeux-repas",
    images: [
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67bc4483c38bb541e485f8e8_home-card-jr%20(4).webp",
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c6f3ee4e0fa8ef249dfddd_02.webp",
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c6f3f06d68730aec4de0dc_03.webp",
    ],
    video: "https://eliotbesson.b-cdn.net/Joyeux%20Repas/JR%20-%2002.mp4",
  },
  {
    title: "Web Design",
    category: "UI/UX + INTERACTION",
    date: "MAY 2024",
    href: "/works/design-club",
    images: [
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67bc4479c1b144bb36f21895_home-card-ds%20(2).webp",
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c6f3c6f3e12d1ed0e7dd2f_02.webp",
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c6f3cab7ac9fc55d34a0d7_03.webp",
    ],
    video: "https://eliotbesson.b-cdn.net/Design%20Club/03.mp4",
  },
    {
    title: "Web Development",
    category: "UI/UX + INTERACTION",
    date: "MAY 2024",
    href: "/works/design-club",
    images: [
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67bc4479c1b144bb36f21895_home-card-ds%20(2).webp",
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c6f3c6f3e12d1ed0e7dd2f_02.webp",
      "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c6f3cab7ac9fc55d34a0d7_03.webp",
    ],
    video: "https://eliotbesson.b-cdn.net/Design%20Club/03.mp4",
  },
];

export default function Showcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className=" text-white py-20 px-6 md:px-20 space-y-0 ">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          index={index}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          project={project}
        />
      ))}
    </section>
  );
}

type ProjectCardProps = {
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  project: Project;
};

function ProjectCard({
  index,
  hoveredIndex,
  setHoveredIndex,
  project,
}: ProjectCardProps) {
  const isHovered = hoveredIndex === index;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Left side images (show only if hovered) */}
      <div className="flex w-full md:w-1/6 aspect-[4/3] gap-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`relative w-1/2 h-full rounded-md overflow-hidden transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={project.images[i]}
              alt={`Thumb ${i}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Title and info */}
      <a
        href={project.href}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
          className={`text-center md:flex-grow transition-opacity duration-300 ${
    hoveredIndex !== null && hoveredIndex !== index ? "opacity-40" : "opacity-100"
  }`}>
 <h2 className="text-7xl md:text-9xl font-extrabold tracking-tight leading-tight whitespace-nowrap">
    {project.title}
  </h2>

        <div
  className={`flex justify-center items-center gap-3 mt-4 text-xs uppercase text-gray-300 tracking-wide transition-opacity duration-300 ${
    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
  <span>{project.category}</span>
  <span>•</span>
  <span>{project.date}</span>
</div>

<div
  className={`mt-1 text-sm tracking-widest text-gray-400 uppercase transition-opacity duration-300 ${
    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
  <span>Open project</span>
</div>

      </a>

      {/* Right preview (image or video) */}
      <div
        className={`relative w-full md:w-1/6 aspect-[4/3] rounded-md overflow-hidden transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Image
          src={project.images[2]}
          alt="Right Preview"
          fill
          className={`object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          autoPlay
          playsInline
        >
          <source src={project.video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

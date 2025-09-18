"use client";

import { useState, useRef } from "react";
import { works } from "@/lib/constant"; // adjust path as needed

interface Props {
  slug: string;
}

export default function ProjectDetailsPanel({ slug }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const project = works.find((work) => work.slug === slug);

  if (!project) return null;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 relative z-20 bg-[#191715] border border-white text-white rounded-md text-sm tracking-wider font-semibold cursor-pointer"
      >
        ● PROJECT DETAILS
      </button>

      {/* Overlay & Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col md:flex-row text-white p-6 sm:p-10 md:p-20 overflow-y-auto"
        >
          {/* Left Side - Text Block */}
          <div className="w-full md:w-1/3 max-w-md text-base md:text-lg leading-relaxed font-normal space-y-6 mb-10 md:mb-0">
            <p>{project.description}</p>

            <button className="flex items-center gap-2 px-4 py-2 border border-white rounded-sm text-sm font-[Roboto] tracking-widest hover:bg-white hover:text-black transition">
              <span className="block w-2 h-2 rounded-full bg-white"></span> SEE LIVE
            </button>
          </div>

          {/* Middle - Close Text */}
          <div
            className="w-full md:w-1/3 flex items-center justify-center text-sm font-[Roboto] tracking-wide cursor-pointer select-none mb-10 md:mb-0"
            onClick={() => setIsOpen(false)}
          >
            CLOSE
          </div>

          {/* Right Side - Info */}
          <div className="w-full md:w-1/3 max-w-xs text-xs font-[Roboto] tracking-widest space-y-10">
            {project.services && (
              <div>
                <div className="text-gray-400 mb-2">FULL LIST OF SERVICES</div>
                <ul className="space-y-1">
                  {project.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.credits && (
              <div>
                <div className="text-gray-400 mb-2">CREDITS</div>
                <p>
                  {project.credits.textBeforeLink}
                  <a
                    href={project.credits.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {project.credits.linkText}
                  </a>
                  {project.credits.textAfterLink}
                </p>
              </div>
            )}

            {project.year && (
              <div>
                <div className="text-gray-400 mb-2">YEAR</div>
                <p>{project.year}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

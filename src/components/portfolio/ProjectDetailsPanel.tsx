"use client";

import { useState, useRef } from "react";

export default function ProjectDetailsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-[#191715] border border-white text-white rounded-md text-sm tracking-wider font-semibold"
      >
        ● PROJECT DETAILS
      </button>

      {/* Overlay & Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col md:flex-row text-white p-10 md:p-20"
        >
          {/* Left Side - Text Block */}
          <div className="md:w-1/3 max-w-md text-lg leading-relaxed font-normal space-y-6">
            <p>
              For Studio Fugu&apos;s launch mid-2024 we worked on their website with
              Studio Elias. I was in charge of the UI design & Webflow
              development. The challenge was to make the content engaging for
              their audience while bring their brand universe to life through a
              distinctive visual style. Every interaction was carefully
              considered to feel immersive, human, and memorable.
            </p>

            <button className="flex items-center gap-2 px-4 py-2 border border-white rounded-sm text-sm font-mono tracking-widest hover:bg-white hover:text-black transition">
              <span className="block w-2 h-2 rounded-full bg-white"></span> SEE
              LIVE
            </button>
          </div>

          {/* Middle - Close Text */}
          <div className="md:w-1/3 flex items-center justify-center text-sm font-mono tracking-wide cursor-pointer select-none" onClick={() => setIsOpen(false)}>
            CLOSE
          </div>

          {/* Right Side - Info */}
          <div className="md:w-1/3 max-w-xs text-xs font-mono tracking-widest space-y-10">
            <div>
              <div className="text-gray-400 mb-2">FULL LIST OF SERVICES</div>
              <ul className="space-y-1">
                <li>WIREFRAMES</li>
                <li>UI DESIGN</li>
                <li>UI ANIMATION</li>
                <li>WEBFLOW</li>
                <li>GSAP CSS</li>
              </ul>
            </div>

            <div>
              <div className="text-gray-400 mb-2">CREDITS</div>
              <p>
                PROJECT MADE IN COLLABORATION WITH THE GREAT PEOPLE OF{" "}
                <a
                  href="https://studioelias.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  STUDIO ELIAS
                </a>{" "}
                WHO HANDLES ARTISTIC DIRECTION & BRANDING
              </p>
            </div>

            <div>
              <div className="text-gray-400 mb-2">YEAR</div>
              <p>SEP 2024</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

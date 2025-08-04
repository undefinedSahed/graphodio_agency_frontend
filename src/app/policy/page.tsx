"use client";

import { useState } from "react";
import {policyData} from "@/lib/constant";


export default function PolicyPage() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Privacy Policy</h1>

      {policyData.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2
            className="text-xl font-semibold text-[#b72026] cursor-pointer hover:underline"
            onClick={() => toggleSection(idx)}
          >
            {section.title}
          </h2>
          {openSections.includes(idx) && (
            <p className="mt-2 text-sm whitespace-pre-line text-[#6d6d6d]">
              {section.content}
            </p>
          )}
        </div>
      ))}
    </main>
  );
}


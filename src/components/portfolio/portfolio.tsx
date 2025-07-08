"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const templates = [
  {
    title: "REVE",
    category: "PORTFOLIO TEMPLATE",
    price: "49$",
    imageSrc: "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c9bc0b4f98373c3cc34978_reve-ui.png",
    bgImage: "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c982fa23d3f8cca92c409f_reve-bg.jpg",
    link: "#",
    size: "large",
  },
  {
    title: "WISDOM",
    category: "BLOG TEMPLATE",
    price: "49$",
    imageSrc: "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67cac895fff2152d6465742b_wisdom-ui.jpg",
    bgImage: "https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67cac838f32634f6a19e5966_wisdom-bg.jpg",
    link: "#",
    size: "small",
  },
];

export default function Portfolio() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>        

      {/* Original Section */}
      <main className="min-h-screen  text-white px-6  py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-60 w-full max-w-7xl">
          {templates.map((template) => (
            <div
              key={template.title}
              className={`col-span-${
                template.size === "large" ? "3" : "2"
              } flex flex-col justify-end`}
            >
              <div className="flex-grow flex flex-col justify-end">
                <Link
                  href={template.link}
                  onMouseEnter={() => setHovered(template.title)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative block overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out ${
                    template.size === "large" ? "h-[600px]" : "h-[350px]"
                  }`}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 z-0 transition-all duration-500"
                    style={{
                      backgroundImage: `url(${template.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: hovered === template.title ? "blur(8px)" : "none",
                    }}
                  />

                  {/* Foreground Content */}
                  <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                    <Image
                      src={template.imageSrc}
                      alt={template.title}
                      width={template.size === "large" ? 680 : 320}
                      height={template.size === "large" ? 520 : 280}
                      className="object-contain max-h-full"
                    />
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
                    {template.price}
                  </div>
                </Link>
              </div>

              {/* Title and Category */}
              <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
                <span className="text-white font-bold">{template.title}</span> •{" "}
                {template.category}
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
              href="#"
              onMouseEnter={() => setHovered("GAZETTE")}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[350px] overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
            >
              <div
                className="absolute inset-0 z-0 transition-all duration-500"
                style={{
                  backgroundImage: 'url(https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c982c89b5acec3576a4533_gazette-bg.jpg)',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: hovered === "GAZETTE" ? "blur(8px)" : "none",
                }}
              />
              <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                <Image
                  src="https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67c982cd91af879ebf7ea7bd_gazette-ui.jpg"
                  alt="GAZETTE"
                  width={320}
                  height={280}
                  className="object-contain max-h-full"
                />
              </div>
              <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
                49$
              </div>
            </Link>
            <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
              <span className="text-white font-bold">GAZETTE</span> • BLOG TEMPLATE
            </div>
          </div>

          {/* Large Card*/}
          <div className="col-span-3 flex flex-col justify-end">
            <Link
              href="#"
              onMouseEnter={() => setHovered("DOMUM")}
              onMouseLeave={() => setHovered(null)}
              className="group relative block h-[600px] overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
            >
              <div
                className="absolute inset-0 z-0 transition-all duration-500"
                style={{
                  backgroundImage: 'url(https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67cac8ad49e8f531d73f9869_domum-bg.jpg)',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: hovered === "DOMUM" ? "blur(8px)" : "none",
                }}
              />
              <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                <Image
                  src="https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67cac8b1a5ddb1034191c0e6_domum-ui.webp"
                  alt="DOMUM"
                  width={680}
                  height={520}
                  className="object-contain max-h-full"
                />
              </div>
              <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
                49$
              </div>
            </Link>
            <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
              <span className="text-white font-bold">DOMUM</span> • REAL ESTATE TEMPLATE
            </div>
          </div>
        </div>
      </section>
{/*3rd section*/}
      <section className=" text-white px-6 py-12 flex items-center justify-center">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-40 w-full max-w-7xl">

    {/* Left card*/}
    <div className="col-span-2 flex flex-col justify-end mb-20">
      <a
        href="#"
        onMouseEnter={() => setHovered("HENRY")}
        onMouseLeave={() => setHovered(null)}
        className="group relative block h-[350px] overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
      >
        {/* Main image */}
        <div
          className="absolute inset-0 z-0 transition-all duration-500"
          style={{
            backgroundImage: 'url(https://cdn.prod.website-files.com/677fb4d34764579513f06e12/6825e1704643544db5fcdd9e_henry-bg-main.jpg)',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: hovered === "HENRY" ? "blur(8px)" : "none",
          }}
        />
        <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
          {}
          <Image
            src="https://cdn.prod.website-files.com/677fb4d34764579513f06e12/6825e17304d808dbd0f1b3f7_henry-screen-ui.png"
            alt="HENRY TALBOT template"
            width={320}
            height={280}
            className="object-contain max-h-full"
          />
        </div>
        <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
          49$
        </div>
      </a>
      <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
        <span className="text-white font-bold">HENRY TALBOT</span> • PHOTOGRAPHY TEMPLATE
      </div>
    </div>

    {/* Right card*/}
    <div className="col-span-2 flex flex-col justify-end">
      <a
        href="#"
        onMouseEnter={() => setHovered("LORA")}
        onMouseLeave={() => setHovered(null)}
        className="group relative block h-[350px] overflow-hidden  border border-gray-700 hover:scale-[1.015] transition-transform duration-300 ease-in-out"
      >
        {/* Main image */}
        <div
          className="absolute inset-0 z-0 transition-all duration-500"
          style={{
            backgroundImage: 'url(https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67cac8ce0d4754219ff328b4_lora-bg.jpg)',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: hovered === "LORA" ? "blur(8px)" : "none",
          }}
        />
        <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
          {}
          <Image
            src="https://cdn.prod.website-files.com/677fb4d34764579513f06e12/67cac8d3816839026be753df_lora-ui.jpg"
            alt="LORA template"
           width={320}
            height={280}
            className="object-contain max-h-full"
          />
        </div>
        <div className="absolute top-3 right-3 bg-white text-black text-sm font-semibold px-2 py-1 rounded z-20">
          49$
        </div>
      </a>
      <div className="mt-3 text-sm font-mono tracking-widest text-white/80">
        <span className="text-white font-bold">LORA</span> • REAL ESTATE TEMPLATE
      </div>
    </div>
  </div>
</section>
    </>
    
  );
}
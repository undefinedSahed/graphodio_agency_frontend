// "use client";

// import React, { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

// export default function AboutBanner() {
//   const aboutRef = useRef<HTMLElement | null>(null);

//   useGSAP(
//     () => {
//       const tl = gsap.timeline();

//       tl.fromTo(
//         aboutRef.current,
//         {
//           opacity: 0,
//           y: 200,
//           duration: 1,
//           ease: "power2.out",
//           visibility: "invisible",
//         },
//         {
//           opacity: 1,
//           y: 0,
//           visibility: "visible",
//           ease: "power2.out",
//           duration: 1,
//         }
//       );
//     },
//     { scope: aboutRef }
//   );

//   return (
//     <section
//       className="lg:min-h-screen flex items-center justify-center text-white relative z-10 bg-black invisible lg:-mt-24 py-20 lg:py-0"
//       ref={aboutRef}
//     >
//       {/* Video */}
//       <video
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         src="https://res.cloudinary.com/sahed/video/upload/q_auto/q_auto,c_fill,w_1920,h_1080/v1756383185/about-banner_ksptjq.mp4"
//         autoPlay
//         loop
//         muted
//         playsInline
//       />
//     </section>
//   );
// }

"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Head from "next/head";
import Image from "next/image";

export default function AboutBanner() {
  const aboutRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        aboutRef.current,
        {
          opacity: 0,
          y: 200,
          duration: 1,
          ease: "power2.out",
          visibility: "invisible",
        },
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          ease: "power2.out",
          duration: 1,
        }
      );
    },
    { scope: aboutRef }
  );

  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/sahed/video/upload/q_auto/q_auto,c_fill,w_1920,h_1080/v1758587584/about-banner_o2gre9.mp4"
          type="video/mp4"
        />
      </Head>
      <section
        ref={aboutRef}
        className="lg:min-h-screen flex items-center justify-center text-white relative z-10 bg-black invisible lg:-mt-24 py-32 lg:py-0"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
          src="https://res.cloudinary.com/sahed/video/upload/q_auto/q_auto,c_fill,w_1920,h_1080/v1758587584/about-banner_o2gre9.mp4"
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          style={{ opacity: videoLoaded ? 1 : 0 }}
        />
        {!videoLoaded && (
          <Image
            alt="placeholder"
            width={1920}
            height={1080}
            src="https://res.cloudinary.com/sahed/image/upload/v1760560427/Thumb-01_y4tcvp.jpg"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
      </section>
    </>
  );
}

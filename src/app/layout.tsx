import type { Metadata } from "next";
import { Bebas_Neue } from 'next/font/google';
import "./globals.css";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "@/components/shared/navbar";


const debata = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Graphodio",
  description: "The best agency for Web, Graphics and SEO services",
};

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${debata.className} antialiased uppercase overflow-x-hidden`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

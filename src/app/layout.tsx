// app/layout.tsx

import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider"; // NEW
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${debata.className} antialiased uppercase overflow-x-hidden`}>
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

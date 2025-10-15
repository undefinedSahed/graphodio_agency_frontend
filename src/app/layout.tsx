import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/Footer";
import { ContactProvider } from "@/lib/contact-context";
import ContactForm from "@/components/shared/contact-form";
import { Toaster } from "sonner";
import TrackingProvider from "@/providers/tracking-provider";

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
      <body className={`${debata.className} antialiased !overflow-x-hidden`}>
        <TrackingProvider
          gtmIds={["G-K357W4STM4", "GT-NFP5R97W"]}
          fbPixelId="680203374976332"
        />
        <SmoothScrollProvider>
          <ContactProvider>
            <Navbar />
            {children}
            <Toaster position="top-right" />
            <ContactForm />
            <Footer />
          </ContactProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

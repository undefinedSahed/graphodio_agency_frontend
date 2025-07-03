"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
        });
    }, []);

    return (
        <div id="smooth-wrapper" className="h-screen overflow-hidden">
            <div id="smooth-content" className="will-change-transform">
                {children}
            </div>
        </div>
    );
}

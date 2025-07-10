import AboutBanner from '@/components/about/about-banner'
import AboutServices from '@/components/about/about-services'
import Testimonial from '@/components/about/testimonial'
import LogoCarousel from '@/components/portfolio/LogoCarousel'
import React from 'react'

export default function page() {
    return (
        <main>
            <AboutBanner />
            <AboutServices />
            <div className="py-2 lg:py-20">
                <LogoCarousel />
            </div>
            <Testimonial />
        </main>
    )
}

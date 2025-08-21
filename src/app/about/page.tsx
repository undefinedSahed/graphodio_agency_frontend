import AboutBanner from '@/components/about/about-banner'
import AboutServices from '@/components/about/about-services'
import Team from '@/components/about/team'
import Testimonial from '@/components/about/testimonial'
import WorksSection from '@/components/about/work-section'
import LogoCarousel from '@/components/portfolio/LogoCarousel'
import React from 'react'
import AboutMissionVision from '@/components/about/AboutMissionVision'

export default function page() {
    return (
        <main>
            <AboutBanner />
            <AboutServices />
            <AboutMissionVision />
            <div className="py-2 lg:py-20">
                <LogoCarousel />
            </div>
            <Testimonial />
            <Team />
            <WorksSection />
        </main>
    )
}

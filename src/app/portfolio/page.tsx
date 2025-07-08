import Portfolio from "@/components/portfolio/portfolio"
import Hero from "@/components/portfolio/hero"
import LogoCarousel from "@/components/portfolio/LogoCarousel"

export default function PortfolioPage() {
    return (
        <main>
            <Hero />
            <LogoCarousel />
            <Portfolio />
        </main>
    )
}
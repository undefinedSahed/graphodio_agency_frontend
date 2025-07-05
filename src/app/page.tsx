import AboutSection from "@/components/home/abuout-section";
import Banner from "@/components/home/banner";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import HomeWorks from "@/components/home/service-section";
import HowWeWork from "@/components/home/how-we-work";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedWorks/>
      <HowWeWork />
      <AboutSection />
      <HomeWorks />
      <Footer/>
    </main>
  );
}

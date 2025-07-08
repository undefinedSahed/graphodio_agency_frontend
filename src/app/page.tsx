import AboutSection from "@/components/home/abuout-section";
import Banner from "@/components/home/banner";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import HomeWorks from "@/components/home/service-section";
import HowWeWork from "@/components/home/how-we-work";
import StackedSlider from "@/components/home/work-slider";


export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedWorks />
      <HowWeWork />
      <AboutSection />
      <HomeWorks />
      <StackedSlider />
    </main>
  );
}

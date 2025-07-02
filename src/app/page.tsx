import AboutSection from "@/components/home/abuout-section";
import Banner from "@/components/home/banner";
import HomeWorks from "@/components/home/service-section";
import HowWeWork from "@/components/home/how-we-work";

export default function Home() {
  return (
    <main>
      <Banner />
      <HowWeWork />
      <AboutSection />
      <HomeWorks />
    </main>
  );
}

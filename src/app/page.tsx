import AboutSection from "@/components/home/abuout-section";
import Banner from "@/components/home/banner";
import HomeWorks from "@/components/home/service-section";
import HowWeWork from "@/components/home/how-we-work";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main>
      <Banner />
      <HowWeWork />
      <AboutSection />
      <HomeWorks />
      <Footer/>
    </main>
  );
}

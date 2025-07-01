import AboutSection from "@/components/home/abuout-section";
import Banner from "@/components/home/banner";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import HowWeWork from "@/components/home/how-we-work";
import RecentWorks from "@/components/home/RecentWorks";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedWorks />
      <HowWeWork />
      <AboutSection />
      <RecentWorks />
    </main>
  );
}

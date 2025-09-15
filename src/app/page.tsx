import AboutSection from "@/components/home/abuout-section";
import Banner from "@/components/home/banner";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import ServiceSection from "@/components/home/service-section";
import HowWeWork from "@/components/home/how-we-work";
import StackedSlider from "@/components/home/work-slider";

export const metadata = {
  title: "Graphodio - Home",
  description: "The best agency for Web, Graphics and SEO services",
};

export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex flex-col">
        <div className="flex-grow-[2] flex-shrink-0 basis-3/5">
          <Banner />
        </div>
        <div className="flex-grow-[2] flex-shrink-0 basis-2/5">
          <FeaturedWorks />
        </div>
      </section>
      <HowWeWork />
      <AboutSection />
      <ServiceSection />
      <StackedSlider />
    </main>
  );
}


import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedTrips from "@/components/FeaturedTrips";
import PromoSection from "@/components/PromoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedTrips />
        <PromoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import TripSearch from "./TripSearch";

const Hero = () => {
  return (
    <div className="min-h-[600px] relative bg-hero-pattern flex items-center pt-16">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?w=1800&h=900&fit=crop&q=80')",
          opacity: 0.6,
          backgroundBlendMode: "multiply" 
        }}
      ></div>
      
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-3xl mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Explore the World, <br />One Journey at a Time
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover amazing destinations, find local transport, and book your perfect trip with ease.
          </p>
        </div>
        
        <TripSearch />
      </div>
    </div>
  );
};

export default Hero;

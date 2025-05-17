
import { Button } from "@/components/ui/button";
import { ChevronRight, Plane, Train, MapPin, Star } from "lucide-react";

const PromoSection = () => {
  const features = [
    {
      icon: <Plane className="h-10 w-10 text-accent-teal" />,
      title: "Best Travel Packages",
      description: "Discover our curated travel packages that offer the best value and experiences."
    },
    {
      icon: <Train className="h-10 w-10 text-accent-orange" />,
      title: "Local Transport Options",
      description: "Find and book the most convenient local transport options for your journey."
    },
    {
      icon: <MapPin className="h-10 w-10 text-accent-coral" />,
      title: "Famous Attractions",
      description: "Explore iconic landmarks and hidden gems with our comprehensive guides."
    },
    {
      icon: <Star className="h-10 w-10 text-accent-yellow" />,
      title: "Top-Rated Experiences",
      description: "Enjoy unique experiences rated highly by our community of travelers."
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Journey, <span className="text-travel-500">Our Expertise</span>
            </h2>
            
            <p className="text-gray-600 mb-8">
              TravelGo makes travel planning simple and stress-free. From booking the perfect accommodation to 
              finding local transportation, we've got you covered every step of the way.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Button className="bg-accent-orange hover:bg-opacity-90 text-white flex items-center gap-2">
                Plan Your Trip <ChevronRight size={16} />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800&h=1000&fit=crop&q=80" 
                alt="Happy travelers" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md w-48 animate-float">
              <div className="flex items-start mb-3">
                <div className="bg-accent-teal/10 p-2 rounded-full text-accent-teal mr-3">
                  <Plane size={20} />
                </div>
                <div>
                  <p className="font-medium text-sm">Flights Booked</p>
                  <p className="text-travel-500 text-xs font-bold">+500 this week</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-md animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center space-x-2">
                <div className="text-accent-yellow">
                  <Star size={16} fill="currentColor" />
                </div>
                <div className="text-accent-yellow">
                  <Star size={16} fill="currentColor" />
                </div>
                <div className="text-accent-yellow">
                  <Star size={16} fill="currentColor" />
                </div>
                <div className="text-accent-yellow">
                  <Star size={16} fill="currentColor" />
                </div>
                <div className="text-accent-yellow">
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
              <p className="text-sm font-medium mt-1">4.9/5 Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;

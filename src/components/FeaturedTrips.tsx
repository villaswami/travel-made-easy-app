
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DestinationCard from "./DestinationCard";

const categories = ["Popular", "Beach", "Mountains", "Cities", "Cultural"];

const destinations = [
  {
    id: 1,
    name: "Bali Paradise",
    description: "Explore the beautiful beaches and vibrant culture of Bali, Indonesia.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop&q=80",
    price: "$499",
    rating: 4.8,
    category: "Beach"
  },
  {
    id: 2,
    name: "Swiss Alps",
    description: "Discover the majestic Swiss Alps with breathtaking views and adventure activities.",
    image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800&h=600&fit=crop&q=80",
    price: "$799",
    rating: 4.7,
    category: "Mountains"
  },
  {
    id: 3,
    name: "Tokyo Adventure",
    description: "Experience the blend of traditional and modern culture in Tokyo, Japan.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop&q=80",
    price: "$899",
    rating: 4.9,
    category: "Cities"
  },
  {
    id: 4,
    name: "Ancient Rome",
    description: "Walk through thousands of years of history in the eternal city of Rome.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop&q=80",
    price: "$649",
    rating: 4.6,
    category: "Cultural"
  },
  {
    id: 5,
    name: "Maldives Getaway",
    description: "Relax in overwater bungalows and crystal clear waters in the Maldives.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop&q=80",
    price: "$1299",
    rating: 4.9,
    category: "Beach"
  },
  {
    id: 6,
    name: "Himalayan Trek",
    description: "Challenge yourself with a trek through the majestic Himalayan mountain range.",
    image: "https://images.unsplash.com/photo-1486911278304-a8a300832df4?w=800&h=600&fit=crop&q=80",
    price: "$599",
    rating: 4.7,
    category: "Mountains"
  },
  {
    id: 7,
    name: "New York City",
    description: "Experience the vibrant energy and iconic landmarks of the Big Apple.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop&q=80",
    price: "$749",
    rating: 4.5,
    category: "Cities"
  },
  {
    id: 8,
    name: "Kyoto Gardens",
    description: "Immerse yourself in the serene beauty of Kyoto's ancient temples and gardens.",
    image: "https://images.unsplash.com/photo-1493997181344-a810df859854?w=800&h=600&fit=crop&q=80",
    price: "$849",
    rating: 4.8,
    category: "Cultural"
  },
];

const FeaturedTrips = () => {
  const [activeCategory, setActiveCategory] = useState("Popular");
  
  const filteredDestinations = activeCategory === "Popular" 
    ? destinations.slice(0, 8)  // Show all for "Popular"
    : destinations.filter(d => d.category === activeCategory);
    
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Trips</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover our handpicked selection of incredible destinations around the world.
          </p>
        </div>
        
        <Tabs defaultValue="Popular" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/60 p-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-4 py-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredDestinations.map((destination) => (
                  <DestinationCard 
                    key={destination.id}
                    image={destination.image}
                    name={destination.name}
                    description={destination.description}
                    price={destination.price}
                    rating={destination.rating}
                  />
                ))}
              </div>
              
              {filteredDestinations.length > 0 && (
                <div className="flex justify-center mt-12">
                  <Button variant="outline" className="border-travel-500 text-travel-500 hover:bg-travel-500 hover:text-white">
                    View All {activeCategory} Destinations
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedTrips;

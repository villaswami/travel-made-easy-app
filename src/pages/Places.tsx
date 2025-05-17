
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Star } from "lucide-react";
import { useState } from "react";

const placesData = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    description: "One of the seven wonders of the world, the Taj Mahal is a marble mausoleum built by Mughal emperor Shah Jahan in memory of his wife.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80",
    category: "Historical"
  },
  {
    id: 2,
    name: "Varanasi Ghats",
    location: "Varanasi, Uttar Pradesh",
    description: "The sacred riverfront steps leading to the banks of the River Ganges, known for spiritual rituals and ceremonies.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1561361058-c24e06f36dc6?w=800&h=600&fit=crop&q=80",
    category: "Spiritual"
  },
  {
    id: 3,
    name: "Jaipur City Palace",
    location: "Jaipur, Rajasthan",
    description: "A stunning complex of courtyards, gardens and buildings in the heart of the Pink City of Jaipur.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop&q=80",
    category: "Historical"
  },
  {
    id: 4,
    name: "Goa Beaches",
    location: "Panaji, Goa",
    description: "Famous for its pristine beaches, vibrant nightlife, and Portuguese heritage, Goa is a top tourist destination in India.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop&q=80",
    category: "Beach"
  },
  {
    id: 5,
    name: "Kerala Backwaters",
    location: "Alleppey, Kerala",
    description: "A network of interconnected canals, rivers, lakes, and inlets formed by more than 900 km of waterways.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1602301217241-87735090eb88?w=800&h=600&fit=crop&q=80",
    category: "Nature"
  },
  {
    id: 6,
    name: "Valley of Flowers",
    location: "Uttarakhand",
    description: "A UNESCO World Heritage site known for its meadows of endemic alpine flowers and the variety of flora.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559666126-84f389727b9a?w=800&h=600&fit=crop&q=80",
    category: "Nature"
  }
];

const Places = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPlaces = placesData.filter(place => 
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="bg-travel-500 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Famous Places</h1>
            <p className="text-xl opacity-90">Discover incredible tourist attractions across India</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search places by name, location, or category..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
          
          {filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No places found matching your search.</p>
              <p className="text-gray-400">Try a different search term.</p>
            </div>
          )}
        </div>
        
        <div className="container mx-auto px-4 py-12 my-8 bg-gray-50 rounded-lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Explore India's Diverse Attractions</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-travel-500 mb-2">
                  <MapPin size={32} className="mx-auto" />
                </div>
                <h3 className="font-bold">Historical Sites</h3>
                <p className="text-gray-600 text-sm">Ancient monuments and heritage</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-accent-teal mb-2">
                  <MapPin size={32} className="mx-auto" />
                </div>
                <h3 className="font-bold">Natural Wonders</h3>
                <p className="text-gray-600 text-sm">Breathtaking landscapes</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-accent-orange mb-2">
                  <MapPin size={32} className="mx-auto" />
                </div>
                <h3 className="font-bold">Spiritual Centers</h3>
                <p className="text-gray-600 text-sm">Sacred temples and shrines</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-accent-yellow mb-2">
                  <MapPin size={32} className="mx-auto" />
                </div>
                <h3 className="font-bold">Beach Getaways</h3>
                <p className="text-gray-600 text-sm">Pristine beaches and islands</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface PlaceCardProps {
  place: typeof placesData[0];
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 relative">
        <img 
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
          <Star className="text-yellow-500 mr-1" size={14} fill="currentColor" />
          <span className="text-sm font-medium">{place.rating}</span>
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-1">{place.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{place.location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {place.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-1 bg-travel-100 text-travel-800 rounded-full">
            {place.category}
          </span>
          <Button size="sm" variant="outline" className="text-travel-500 border-travel-500">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Places;

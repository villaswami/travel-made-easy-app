
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const popularDestinations = [
  "Bali", "Goa", "Bangkok", "Singapore", "Maldives", "Shimla", "Manali", "Darjeeling"
];

const TripSearch = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredDestinations = popularDestinations.filter(dest => 
    dest.toLowerCase().includes(location.toLowerCase())
  );
  
  const handleSelectDestination = (dest: string) => {
    setLocation(dest);
    setShowSuggestions(false);
  };
  
  const handleSearch = () => {
    console.log("Searching for:", { location, date });
    // In a real app, this would navigate to search results
  };
  
  return (
    <div className="hero-search-container rounded-lg p-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-end">
        <div className="flex-1 relative">
          <label className="block text-white text-sm font-medium mb-1">Where to?</label>
          <div className="relative">
            <Input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="pl-10 bg-white/90 border-0 focus:ring-2 focus:ring-travel-500"
              placeholder="Search destinations..."
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
          
          {showSuggestions && location && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((dest) => (
                  <div
                    key={dest}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectDestination(dest)}
                  >
                    {dest}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No destinations found</div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <label className="block text-white text-sm font-medium mb-1">When?</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-10 relative text-left font-normal bg-white/90 border-0 focus:ring-2 focus:ring-travel-500",
                  !date && "text-gray-500"
                )}
              >
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                {date ? format(date, "PPP") : <span>Select date...</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <Button 
          onClick={handleSearch} 
          className="bg-accent-orange hover:bg-opacity-90 text-white flex items-center gap-2"
        >
          <Search size={18} />
          Search Trips
        </Button>
      </div>
    </div>
  );
};

export default TripSearch;

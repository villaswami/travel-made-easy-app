
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Bus, Car, MapPin, Calendar, Train } from "lucide-react";
import { Card } from "@/components/ui/card";

const transportOptions = [
  {
    id: 1,
    type: "Bus",
    name: "Express Deluxe",
    from: "Delhi",
    to: "Manali",
    departure: "07:30 AM",
    arrival: "06:00 PM",
    price: "₹1,200",
    seats: 12
  },
  {
    id: 2,
    type: "Bus",
    name: "Super Express",
    from: "Delhi",
    to: "Manali",
    departure: "09:00 PM",
    arrival: "08:30 AM",
    price: "₹1,500",
    seats: 5
  },
  {
    id: 3,
    type: "Train",
    name: "Rajdhani Express",
    from: "Mumbai",
    to: "Goa",
    departure: "11:00 PM",
    arrival: "10:00 AM",
    price: "₹950",
    seats: 22
  },
  {
    id: 4,
    type: "Car",
    name: "Private Taxi",
    from: "Jaipur",
    to: "Udaipur",
    departure: "Flexible",
    arrival: "4 hours journey",
    price: "₹3,200",
    seats: 4
  }
];

const Transport = () => {
  const [activeTab, setActiveTab] = useState("bus");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState("");
  
  const filteredTransport = transportOptions.filter(option => {
    if (activeTab !== "all" && option.type.toLowerCase() !== activeTab) {
      return false;
    }
    
    if (fromLocation && !option.from.toLowerCase().includes(fromLocation.toLowerCase())) {
      return false;
    }
    
    if (toLocation && !option.to.toLowerCase().includes(toLocation.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="bg-travel-500 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Local Transport</h1>
            <p className="text-xl opacity-90">Book buses, trains, and private transportation to your favorite destinations</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 -mt-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="from" className="mb-2 block">From</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="from"
                    className="pl-10"
                    placeholder="Departure city"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="to" className="mb-2 block">To</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="to"
                    className="pl-10"
                    placeholder="Destination city"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="date" className="mb-2 block">Travel Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="date"
                    type="date"
                    className="pl-10"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-accent-orange hover:bg-opacity-90">
                Search Transport
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="all" className="px-6">All</TabsTrigger>
              <TabsTrigger value="bus" className="px-6">
                <Bus className="mr-2" size={18} />
                Buses
              </TabsTrigger>
              <TabsTrigger value="train" className="px-6">
                <Train className="mr-2" size={18} />
                Trains
              </TabsTrigger>
              <TabsTrigger value="car" className="px-6">
                <Car className="mr-2" size={18} />
                Cars
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <TransportResults options={filteredTransport} />
            </TabsContent>
            <TabsContent value="bus" className="mt-0">
              <TransportResults options={filteredTransport} />
            </TabsContent>
            <TabsContent value="train" className="mt-0">
              <TransportResults options={filteredTransport} />
            </TabsContent>
            <TabsContent value="car" className="mt-0">
              <TransportResults options={filteredTransport} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface TransportResultsProps {
  options: typeof transportOptions;
}

const TransportResults = ({ options }: TransportResultsProps) => {
  if (options.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">No transport options found for your search.</p>
        <p className="text-gray-400">Try different search criteria or dates.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {options.map((option) => (
        <Card key={option.id} className="overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                {option.type === "Bus" && <Bus className="text-travel-500 mr-2" size={20} />}
                {option.type === "Train" && <Train className="text-travel-500 mr-2" size={20} />}
                {option.type === "Car" && <Car className="text-travel-500 mr-2" size={20} />}
                <span className="font-bold text-lg">{option.name}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <span className="font-medium">{option.from}</span>
                <span className="mx-2">→</span>
                <span className="font-medium">{option.to}</span>
              </div>
              
              <div className="text-gray-500">
                <div>Departure: <span className="font-medium">{option.departure}</span></div>
                <div>Arrival: <span className="font-medium">{option.arrival}</span></div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-lg font-bold text-travel-600 mb-2">
                {option.price}
              </div>
              <div className="text-sm text-gray-500 mb-3">
                {option.seats} seats available
              </div>
              <Button className="bg-travel-500 hover:bg-travel-600">
                Book Now
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Transport;

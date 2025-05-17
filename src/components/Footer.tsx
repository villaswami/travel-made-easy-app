
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-travel-700 text-white">
      <div className="container mx-auto px-4">
        <div className="pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-2xl mb-4">
              <span className="text-white">Travel</span>
              <span className="text-accent-teal">Go</span>
            </div>
            <p className="text-gray-300 mb-4">
              Making travel planning simple and stress-free with our comprehensive platform for trips, transport, and local attractions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-travel-600 p-2 rounded-full hover:bg-travel-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-travel-600 p-2 rounded-full hover:bg-travel-500 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-travel-600 p-2 rounded-full hover:bg-travel-500 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Transport Options</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Famous Places</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Bali, Indonesia</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Goa, India</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Bangkok, Thailand</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Singapore</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Maldives</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Paris, France</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and travel inspiration.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Your email" 
                className="bg-travel-600 border-travel-600 text-white placeholder:text-gray-400 focus-visible:ring-travel-400"
              />
              <Button size="icon" className="bg-accent-teal hover:bg-opacity-90">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="py-6 border-t border-travel-600 text-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} TravelGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

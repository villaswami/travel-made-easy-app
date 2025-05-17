
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-2xl text-travel-600">
            <span className="text-travel-500">Travel</span>
            <span className="text-accent-teal">Go</span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors">Destinations</a>
          <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors">Transport</a>
          <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors">Places</a>
          <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors">About Us</a>
          <Button 
            onClick={() => setIsAuthModalOpen(true)} 
            variant="ghost" 
            className="flex items-center gap-2"
          >
            <User size={18} />
            <span>Login / Register</span>
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-inner">
          <div className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors py-2">Destinations</a>
            <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors py-2">Transport</a>
            <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors py-2">Places</a>
            <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors py-2">About Us</a>
            <Button 
              onClick={() => {
                setIsAuthModalOpen(true);
                setIsMenuOpen(false);
              }} 
              variant="outline" 
              className="flex items-center gap-2 w-full justify-center"
            >
              <User size={18} />
              <span>Login / Register</span>
            </Button>
          </div>
        </div>
      )}
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;

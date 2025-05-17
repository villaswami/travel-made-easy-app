
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const location = useLocation();
  
  useEffect(() => {
    // Check current auth session
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null);
        toast({
          title: "Signed in successfully",
          description: "Welcome to TravelGo!",
        });
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="font-bold text-2xl text-travel-600">
            <span className="text-travel-500">Travel</span>
            <span className="text-accent-teal">Go</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-gray-700 hover:text-travel-500 transition-colors ${isActive('/') ? 'text-travel-500 font-medium' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/places" 
            className={`text-gray-700 hover:text-travel-500 transition-colors ${isActive('/places') ? 'text-travel-500 font-medium' : ''}`}
          >
            Places
          </Link>
          <Link 
            to="/transport" 
            className={`text-gray-700 hover:text-travel-500 transition-colors ${isActive('/transport') ? 'text-travel-500 font-medium' : ''}`}
          >
            Transport
          </Link>
          <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors">About Us</a>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-travel-600 font-medium">Hi, {user.email?.split('@')[0]}</span>
              <Button 
                onClick={handleSignOut} 
                variant="ghost" 
                className="flex items-center gap-2"
              >
                <User size={18} />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setIsAuthModalOpen(true)} 
              variant="ghost" 
              className="flex items-center gap-2"
            >
              <User size={18} />
              <span>Login / Register</span>
            </Button>
          )}
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
            <Link 
              to="/"
              className={`text-gray-700 hover:text-travel-500 transition-colors py-2 ${isActive('/') ? 'text-travel-500 font-medium' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/places"
              className={`text-gray-700 hover:text-travel-500 transition-colors py-2 ${isActive('/places') ? 'text-travel-500 font-medium' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Places
            </Link>
            <Link 
              to="/transport"
              className={`text-gray-700 hover:text-travel-500 transition-colors py-2 ${isActive('/transport') ? 'text-travel-500 font-medium' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Transport
            </Link>
            <a href="#" className="text-gray-700 hover:text-travel-500 transition-colors py-2">About Us</a>
            
            {user ? (
              <>
                <div className="text-travel-600 font-medium py-2">Hi, {user.email?.split('@')[0]}</div>
                <Button 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }} 
                  variant="outline" 
                  className="flex items-center gap-2 w-full justify-center"
                >
                  <User size={18} />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
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
            )}
          </div>
        </div>
      )}
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;

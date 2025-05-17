
import { ArrowRight } from "lucide-react";

interface DestinationCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  rating?: number;
}

const DestinationCard = ({ image, name, description, price, rating }: DestinationCardProps) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white trip-card-shadow">
      <div className="h-56 relative overflow-hidden group">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-card-gradient"></div>
        {rating && (
          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Starting at</p>
            <p className="text-lg font-bold text-travel-600">{price}</p>
          </div>
          
          <button className="flex items-center text-travel-500 hover:text-travel-700">
            <span className="mr-1 text-sm font-medium">Explore</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;

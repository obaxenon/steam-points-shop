
import React from 'react';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  pkg: any;
  onOrderClick: (pkg: any) => void;
}

const ProductCard = ({ pkg, onOrderClick }: ProductCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 md:w-4 h-3 md:h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:scale-105">
      <CardHeader className="text-center pb-3 md:pb-4">
        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {pkg.badges.map((badge: string, i: number) => (
            <Badge key={i} variant="secondary" className="bg-blue-600 text-white text-xs">
              {badge}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-white text-lg md:text-xl">{pkg.title}</CardTitle>
        <div className="text-2xl md:text-3xl font-bold text-green-400">{pkg.price}</div>
        <div className="flex items-center justify-center gap-1 md:gap-2 mt-2">
          <div className="flex">{renderStars(pkg.rating)}</div>
          <span className="text-gray-300 text-xs md:text-sm">({pkg.reviews.toLocaleString()})</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4 pt-0">
        <CardDescription className="text-gray-300 text-xs md:text-sm">
          {pkg.description}
        </CardDescription>
        <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
          <div className="text-blue-400">Make sure your Steam profile is PUBLIC</div>
          <div className="text-green-400">Delivery: {pkg.deliveryTime}</div>
        </div>
        <ul className="space-y-1 md:space-y-2">
          {pkg.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start text-xs md:text-sm text-gray-300">
              <Check className="w-3 md:w-4 h-3 md:h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
          onClick={() => onOrderClick(pkg)}
        >
          <ShoppingCart className="w-3 md:w-4 h-3 md:h-4 mr-2" />
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

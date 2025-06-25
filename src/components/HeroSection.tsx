
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="text-center py-12 md:py-16 lg:py-20 px-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
        Get Steam Points Instantly
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto">
        Transform your Steam profile with our award-based delivery system. Get Steam Points delivered directly to your profile through Steam's official award system.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Button 
          onClick={() => onNavigate('products')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg"
        >
          Browse Products
        </Button>
        <Button 
          onClick={() => onNavigate('how-it-works')}
          variant="outline" 
          className="text-white border-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-2 md:py-3 text-base md:text-lg"
        >
          How It Works
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;

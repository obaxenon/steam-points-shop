
import React from 'react';
import { Package, Users, Zap } from 'lucide-react';

const QuickOverview = () => {
  return (
    <section className="bg-gray-800/50 rounded-lg p-4 md:p-6 lg:p-8 mx-4 md:mx-0">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="text-center">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Package className="w-6 md:w-8 h-6 md:h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Choose Package</h3>
          <p className="text-gray-300 text-xs md:text-sm">Select your Steam Points package</p>
        </div>
        <div className="text-center">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Users className="w-6 md:w-8 h-6 md:h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Provide Profile</h3>
          <p className="text-gray-300 text-xs md:text-sm">Share your Steam profile URL</p>
        </div>
        <div className="text-center">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Zap className="w-6 md:w-8 h-6 md:h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Instant Delivery</h3>
          <p className="text-gray-300 text-xs md:text-sm">Receive points as Steam awards</p>
        </div>
      </div>
    </section>
  );
};

export default QuickOverview;

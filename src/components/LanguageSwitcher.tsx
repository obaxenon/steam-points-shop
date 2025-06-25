import React from 'react';
import { Button } from '@/components/ui/button';

interface SocialSidebarProps {
  onNavigateToProducts: () => void;
}

const SocialSidebar = ({ onNavigateToProducts }: SocialSidebarProps) => {
  return (
    <div className="fixed right-0 top-12 h-[calc(100vh-3rem)] w-12 md:w-16 bg-gray-900/90 backdrop-blur-md border-l border-gray-700 flex flex-col items-center py-2 md:py-4 space-y-1 md:space-y-2 z-40 overflow-y-auto">
      {/* Social media icons removed - sidebar structure maintained */}
    </div>
  );
};

export default SocialSidebar;

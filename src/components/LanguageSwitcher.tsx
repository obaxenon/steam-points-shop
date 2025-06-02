
import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, name: 'Facebook' },
  { icon: Twitter, name: 'Twitter' },
  { icon: Instagram, name: 'Instagram' },
  { icon: Youtube, name: 'YouTube' },
  { icon: MessageCircle, name: 'Discord' }
];

interface SocialSidebarProps {
  onNavigateToProducts: () => void;
}

const SocialSidebar = ({ onNavigateToProducts }: SocialSidebarProps) => {
  return (
    <div className="fixed right-0 top-12 h-[calc(100vh-3rem)] w-12 md:w-16 bg-gray-900/90 backdrop-blur-md border-l border-gray-700 flex flex-col items-center py-2 md:py-4 space-y-1 md:space-y-2 z-40 overflow-y-auto">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <Button
            key={social.name}
            variant="ghost"
            size="sm"
            onClick={onNavigateToProducts}
            className="w-8 md:w-10 h-8 md:h-10 p-0 text-base md:text-xl hover:bg-gray-700 text-gray-300 hover:text-white"
            title={social.name}
          >
            <Icon className="w-4 md:w-5 h-4 md:h-5" />
          </Button>
        );
      })}
    </div>
  );
};

export default SocialSidebar;

import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ShoppingCart } from 'lucide-react';

const SocialProofNotification = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    username: string;
    package: string;
    location: string;
    visible: boolean;
  }>>([]);
  const [nextId, setNextId] = useState(1);

  const purchaseData = [
    { username: "shadow_gamer92", package: "10,000 Steam Points", location: "United States" },
    { username: "cyber_wolf", package: "20,000 Steam Points", location: "Canada" },
    { username: "dark_phoenix", package: "50,000 Steam Points", location: "United Kingdom" },
    { username: "neo_striker", package: "30,000 Steam Points", location: "Germany" },
    { username: "pixel_hunter", package: "100,000 Steam Points", location: "Australia" },
    { username: "quantum_blade", package: "10,000 Steam Points", location: "France" },
    { username: "storm_rider", package: "20,000 Steam Points", location: "Japan" },
    { username: "fire_dragon", package: "50,000 Steam Points", location: "Netherlands" },
  ];

  const showNotification = () => {
    const randomPurchase = purchaseData[Math.floor(Math.random() * purchaseData.length)];
    const newNotification = {
      id: nextId,
      ...randomPurchase,
      visible: true
    };

    setNotifications(prev => [...prev, newNotification]);
    setNextId(prev => prev + 1);

    // Hide notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === newNotification.id 
            ? { ...notif, visible: false }
            : notif
        )
      );
    }, 5000);

    // Remove from array after animation completes
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
    }, 5500);
  };

  useEffect(() => {
    // Initial sequence: 34 seconds, then 23 seconds, then series of 13 seconds
    let timeouts: NodeJS.Timeout[] = [];

    const startSequence = () => {
      // First notification after 34 seconds
      timeouts.push(setTimeout(() => {
        showNotification();
        
        // Second notification after 23 seconds
        timeouts.push(setTimeout(() => {
          showNotification();
          
          // Series of notifications every 13 seconds (3 times)
          let count = 0;
          const seriesInterval = setInterval(() => {
            showNotification();
            count++;
            
            if (count >= 3) {
              clearInterval(seriesInterval);
              
              // Restart the sequence after 34 seconds
              timeouts.push(setTimeout(() => {
                startSequence();
              }, 34000));
            }
          }, 13000);
          
        }, 23000));
        
      }, 34000));
    };

    startSequence();

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all duration-500 ${
            notification.visible 
              ? 'animate-in slide-in-from-right-5' 
              : 'animate-out slide-out-to-right-5'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {notification.username}
              </p>
              <p className="text-xs text-green-100">
                Just purchased {notification.package}
              </p>
              <p className="text-xs text-blue-100">
                📍 {notification.location}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-6 h-6">
                <DotLottieReact
                  src="https://lottie.host/2d2904ad-8f9e-4e4c-b584-cdd1c1d64ea1/TqRPVnNJGX.json"
                  loop={false}
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialProofNotification;
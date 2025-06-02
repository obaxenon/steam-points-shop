
import React, { useState, useEffect } from 'react';

const TopBar = () => {
  const [onlineUsers, setOnlineUsers] = useState(34567);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "🔒 100% Safe & Secure - No account bans guaranteed",
    "⚡ Fast delivery within 24 hours - Most orders completed in 30 minutes",
    "🌐 Your Steam profile must be PUBLIC to avoid delays",
    "✅ Legitimate Steam awards - No takebacks",
    "💎 Over 95,000+ satisfied customers worldwide"
  ];

  useEffect(() => {
    // Change message every 5 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    // Small user count changes every minute
    const userInterval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
        return Math.max(2000, Math.min(86983, prev + change));
      });
    }, 60000);

    // Major user count change every hour
    const hourlyInterval = setInterval(() => {
      setOnlineUsers(Math.floor(Math.random() * (86983 - 2000) + 2000));
    }, 3600000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(userInterval);
      clearInterval(hourlyInterval);
    };
  }, []);

  return (
    <div className="w-full h-10 md:h-12 bg-gray-900/80 backdrop-blur-md border-b border-gray-700 flex items-center justify-between px-3 md:px-6 text-xs md:text-sm">
      {/* Status Indicator */}
      <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
        <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400 font-medium text-xs md:text-sm">ONLINE</span>
      </div>

      {/* Sliding Messages */}
      <div className="flex-1 mx-2 md:mx-8 overflow-hidden">
        <div className="text-gray-300 text-center whitespace-nowrap animate-in slide-in-from-right-5 duration-1000 text-xs md:text-sm">
          {messages[currentMessageIndex]}
        </div>
      </div>

      {/* User Count */}
      <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
        <span className="text-gray-300 text-xs md:text-sm">👥 {onlineUsers.toLocaleString()} online</span>
      </div>
    </div>
  );
};

export default TopBar;

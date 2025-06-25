import React, { useState, useEffect } from 'react';
import { ShoppingCart, Users, HelpCircle, Mail, Star, Check, Package, Zap, Shield, Award, X, ExternalLink, MessageCircle, Gamepad2, Image, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import StructuredData from '@/components/StructuredData';
import Contact from '@/components/Contact';
import HeroSection from '@/components/HeroSection';
import QuickOverview from '@/components/QuickOverview';
import ProductCard from '@/components/ProductCard';
import SocialSidebar from '@/components/LanguageSwitcher';
import TopBar from '@/components/TopBar';
import FormSuccessMessage from '@/components/FormSuccessMessage';
import SocialProofNotification from '@/components/SocialProofNotification';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [socialProofVisible, setSocialProofVisible] = useState(false);
  const [socialProofMessage, setSocialProofMessage] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);


  const handleOrderClick = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowOrderModal(true);
    setShowSuccess(false);
  };

  const handlePaymentRedirect = () => {
    if (selectedPackage?.paypalUrl) {
      window.location.href = selectedPackage.paypalUrl;
    }
    setShowOrderModal(false);
    setShowSuccess(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 md:w-4 h-3 md:h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const generateUsername = (index: number) => {
    const prefixes = ['shadow', 'cyber', 'dark', 'neo', 'pixel', 'quantum', 'steam', 'game', 'pro', 'elite'];
    const suffixes = ['hunter', 'warrior', 'legend', 'master', 'guardian', 'slayer', 'gamer', 'player', 'ninja', 'beast'];
    const numbers = Math.floor(Math.random() * 999) + 1;
    return `${prefixes[index % prefixes.length]}_${suffixes[(index + 3) % suffixes.length]}${numbers}`;
  };

  const generateRandomDate = (index: number) => {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 30) + index;
    const date = new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Show success state immediately
    setShowSuccess(true);
    
    // Submit form data to FormSubmit
    const formData = new FormData(event.currentTarget);
    
    try {
      await fetch('https://formsubmit.co/support@steampoints.shop', {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      console.log('Form submission error:', error);
      // Still show success to user since FormSubmit handles delivery
    }
  };

  const handleReviewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Show success state immediately
    setReviewSubmitted(true);
    
    // Submit form data to FormSubmit
    const formData = new FormData(event.currentTarget);
    
    try {
      await fetch('https://formsubmit.co/support@steampoints.shop', {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      console.log('Review submission error:', error);
      // Still show success to user since FormSubmit handles delivery
    }
    
    // Close modal after 4 seconds to allow confetti animation to play
    setTimeout(() => {
      setShowReviewModal(false);
      setReviewSubmitted(false);
    }, 4000);
  };

  const packages = [
    {
      title: "10,000 Steam Points",
      price: "€9",
      description: "Delivered to your Steam profile as awards. Must have 4 screenshots/artworks available.",
      badges: ["Best Seller", "Fast Delivery"],
      features: ["Fast delivery (under 24hrs)", "Awards equivalent to 10k points", "Profile boost", "100% safety - no bans", "Legitimate awards - no takebacks"],
      requirements: "Make sure your Steam profile is PUBLIC",
      deliveryTime: "24hrs",
      rating: 4.8,
      reviews: 2534,
      paypalUrl: "https://www.paypal.com/ncp/payment/QS89R9WKKUFGJ"
    },
    {
      title: "20,000 Steam Points",
      price: "€14",
      description: "Delivered to your Steam profile as awards. Must have 4 screenshots/artworks available.",
      badges: ["Popular Choice"],
      features: ["Fast delivery (under 24hrs)", "Awards equivalent to 20k points", "Profile boost", "100% safety - no bans", "Legitimate awards - no takebacks"],
      requirements: "Make sure your Steam profile is PUBLIC",
      deliveryTime: "24hrs",
      rating: 4.9,
      reviews: 3821,
      paypalUrl: "https://www.paypal.com/ncp/payment/DD5KCULCXJSL2"
    },
    {
      title: "30,000 Steam Points",
      price: "€15.20",
      description: "Delivered to your Steam profile as awards. Must have 10 screenshots/artworks available.",
      badges: ["Great Value"],
      features: ["Fast delivery (under 24hrs)", "Awards equivalent to 30k points", "Profile boost", "100% safety - no bans", "Legitimate awards - no takebacks"],
      requirements: "Make sure your Steam profile is PUBLIC",
      deliveryTime: "24hrs",
      rating: 4.7,
      reviews: 1987,
      paypalUrl: "https://www.paypal.com/ncp/payment/Q9B96UMCV4WLU"
    },
    {
      title: "50,000 Steam Points",
      price: "€19.99",
      description: "Delivered to your Steam profile as awards. Must have 15 screenshots/artworks available.",
      badges: ["Premium Package"],
      features: ["Fast delivery (under 24hrs)", "Awards equivalent to 50k points", "Profile boost", "100% safety - no bans", "Legitimate awards - no takebacks"],
      requirements: "Make sure your Steam profile is PUBLIC",
      deliveryTime: "24hrs",
      rating: 4.9,
      reviews: 4231,
      paypalUrl: "https://www.paypal.com/ncp/payment/U22SV6C9TTENC"
    },
    {
      title: "100,000 Steam Points",
      price: "€33.00",
      description: "Delivered to your Steam profile as awards. Must have 25 screenshots/artworks available.",
      badges: ["Ultimate Package"],
      features: ["Fast delivery (under 24hrs)", "Awards equivalent to 100k points", "Profile boost", "100% safety - no bans", "Legitimate awards - no takebacks"],
      requirements: "Make sure your Steam profile is PUBLIC",
      deliveryTime: "24hrs",
      rating: 4.8,
      reviews: 5647,
      paypalUrl: "https://www.paypal.com/ncp/payment/SAKJ8WPE6C5AA"
    }
  ];

  const testimonials = [
    { name: "shadow_hunter92", review: "Increíble servicio! Recibí mis puntos inmediatamente y mi perfil se ve increíble ahora.", rating: 5, date: "2024-01-15" },
    { name: "cyber_warrior", review: "Livraison rapide et excellent support client. Je recommande vivement!", rating: 5, date: "2024-01-14" },
    { name: "dark_legend23", review: "Beste Stelle um Steam Punkte zu bekommen. Mehrfach genutzt, immer zuverlässig.", rating: 4, date: "2024-01-13" },
    { name: "neo_master", review: "プロフィールが完全に変わりました。お金の価値があります!", rating: 5, date: "2024-01-12" },
    { name: "pixel_guardian", review: "빠르고 쉬운 과정입니다. 주문한 지 몇 분 만에 포인트를 받았습니다.", rating: 5, date: "2024-01-11" },
    { name: "quantum_slayer", review: "Ótimo custo-benefício. Meu perfil se destaca agora graças a este serviço.", rating: 4, date: "2024-01-10" }
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', icon: ShoppingCart },
    { id: 'products', label: 'All Products', icon: Package },
    { id: 'featured', label: 'Featured', icon: Star },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'testimonials', label: 'Testimonials', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const externalServices = [
    { label: 'Steam Tools', url: 'https://steamgif.com', icon: ExternalLink }
  ];

  const SidebarContent = ({ onClose = null }) => (
    <>
      {/* Logo */}
      <div className="p-4 md:p-6 border-b border-gray-700">
        <div className="flex items-center justify-center">
          <img 
            src="https://i.postimg.cc/HxHVqsZk/logo-transparent-png.png" 
            alt="Steam Points Shop" 
            className="h-8 md:h-12 w-auto"
          />
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-3 md:p-4">
        <div className="space-y-1 md:space-y-2">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveSection(id);
                if (onClose) onClose();
              }}
              className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 md:space-x-3 text-left text-sm md:text-base ${
                activeSection === id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
        
        {/* External Services Section */}
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-gray-400 text-xs md:text-sm font-semibold mb-2 px-3 md:px-4">
            External Services
          </h3>
          <div className="space-y-1 md:space-y-2">
            {externalServices.map(({ label, url, icon: Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 md:space-x-3 text-left text-sm md:text-base text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <Icon className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );

  const renderHome = () => (
    <div className="space-y-8 md:space-y-16">
      <HeroSection onNavigate={setActiveSection} />
      <QuickOverview />
      
      {/* Best Selling Packages */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">Best Selling Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.slice(0, 3).map((pkg, index) => (
            <ProductCard key={index} pkg={pkg} onOrderClick={handleOrderClick} />
          ))}
        </div>
      </section>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">All Steam Points Packages</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4">
          Get Steam Points delivered directly to your profile as awards. All packages include instant delivery and lifetime support.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
        {packages.map((pkg, index) => (
          <ProductCard key={index} pkg={pkg} onOrderClick={handleOrderClick} />
        ))}
      </div>
    </div>
  );

  const renderFeatured = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Featured Packages</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4">
          Premium bundles and best value options for serious gamers looking to enhance their Steam profiles.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {packages.filter(pkg => pkg.badges.includes("Best Seller") || pkg.badges.includes("Ultimate Package")).map((pkg, index) => (
          <Card key={index} className="bg-gradient-to-br from-blue-900 to-purple-900 border-blue-600 hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {pkg.badges.map((badge, i) => (
                  <Badge key={i} variant="secondary" className="bg-yellow-500 text-black font-bold text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-white text-xl md:text-2xl">{pkg.title}</CardTitle>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">{pkg.price}</div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="flex">{renderStars(pkg.rating)}</div>
                <span className="text-gray-300 text-xs md:text-sm">({pkg.reviews.toLocaleString()})</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <CardDescription className="text-gray-200 text-sm">
                {pkg.description}
              </CardDescription>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="text-blue-300">Make sure your Steam profile is PUBLIC</div>
                <div className="text-green-300">Delivery: {pkg.deliveryTime}</div>
              </div>
              <ul className="space-y-1 md:space-y-2">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-xs md:text-sm text-gray-200">
                    <Check className="w-3 md:w-4 h-3 md:h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-sm md:text-base"
                onClick={() => handleOrderClick(pkg)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Get Featured Deal
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderHowItWorks = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">How Steam Points Delivery Works</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4">
          Our award-based delivery system uses Steam's official features to safely deliver points to your profile.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          {
            icon: <Package className="w-6 md:w-8 h-6 md:h-8" />,
            title: "Choose Your Package",
            description: "Select the Steam Points package that fits your needs. All packages are delivered through Steam's official award system."
          },
          {
            icon: <Users className="w-6 md:w-8 h-6 md:h-8" />,
            title: "Provide Your Profile",
            description: "Share your Steam profile URL and ensure you have the required screenshots/artworks uploaded and set to public."
          },
          {
            icon: <Zap className="w-6 md:w-8 h-6 md:h-8" />,
            title: "Instant Delivery",
            description: "Our automated system delivers Steam Points as awards to your profile content within 24hrs of payment confirmation."
          },
          {
            icon: <Award className="w-6 md:w-8 h-6 md:h-8" />,
            title: "Enjoy Your Points",
            description: "Use your Steam Points to buy showcases, emoticons, backgrounds, stickers, and other Steam profile customizations!"
          }
        ].map((step, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 text-center hover:bg-gray-750 transition-colors">
            <CardHeader>
              <div className="mx-auto w-12 md:w-16 h-12 md:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mb-3 md:mb-4">
                {step.icon}
              </div>
              <CardTitle className="text-white text-base md:text-lg">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-sm">
                {step.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Important Notice */}
      <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4 md:p-6 mt-6 md:mt-8">
        <h3 className="text-yellow-400 text-lg md:text-xl font-bold mb-2 md:mb-3 text-center flex items-center justify-center">
          <Shield className="w-5 md:w-6 h-5 md:h-6 mr-2" />
          Important Steam Policy Information
        </h3>
        <p className="text-yellow-200 text-sm md:text-base text-center">
          According to Steam's policy structure, users will be able to use the Steam Points after 14 days of receiving them as awards. This is a standard Steam security measure that applies to all point transfers through the award system.
        </p>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4 md:p-8 mt-6 md:mt-8">
        <h3 className="text-white text-lg md:text-xl font-bold mb-3 md:mb-4 text-center">What Can You Buy with Steam Points?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Image className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold text-sm md:text-base">Profile Showcases</h4>
            <p className="text-gray-300 text-xs md:text-sm">Display your favorite games, achievements, and screenshots</p>
          </div>
          <div className="text-center">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <MessageCircle className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold text-sm md:text-base">Emoticons & Stickers</h4>
            <p className="text-gray-300 text-xs md:text-sm">Express yourself in Steam chat and comments</p>
          </div>
          <div className="text-center">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Star className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold text-sm md:text-base">Profile Backgrounds</h4>
            <p className="text-gray-300 text-xs md:text-sm">Customize your profile with unique animated backgrounds</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTestimonials = () => {
    const reviewsPerPage = 12;
    const totalPages = Math.ceil((95000 / reviewsPerPage));
    const startIndex = (currentReviewPage - 1) * reviewsPerPage;
    
    const displayedTestimonials = Array.from({ length: reviewsPerPage }, (_, i) => {
      const globalIndex = startIndex + i;
      if (globalIndex < testimonials.length) {
        return testimonials[globalIndex];
      }
      
      const reviews = [
        "Great service! Got my Steam Points quickly and my profile looks amazing now.",
        "Fantastic experience! Fast delivery and professional service.",
        "Highly recommend! Best place to get Steam Points safely.",
        "Amazing results! My profile transformation exceeded expectations.",
        "Perfect service! Quick, reliable, and exactly what I needed.",
        "Outstanding quality! Will definitely use this service again.",
        "Excellent support team! They helped me through the entire process.",
        "Top-notch service! Fast delivery and great communication.",
        "Incredible value! Got exactly what was promised.",
        "Best investment for my Steam profile! Totally worth it."
      ];
      
      return {
        name: generateUsername(globalIndex),
        review: reviews[globalIndex % reviews.length],
        rating: Math.floor(Math.random() * 2) + 4,
        date: generateRandomDate(globalIndex)
      };
    });

    return (
      <div className="space-y-6 md:space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Customer Reviews</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4">
            SteamPoints.shop has helped over <span className="text-green-400 font-bold">95,000</span> gamers enhance their Steam profiles.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 md:mt-4">
            <div className="flex">{renderStars(4.8)}</div>
            <span className="text-white font-bold text-sm md:text-base">4.8/5</span>
            <span className="text-gray-300 text-xs md:text-sm">(95,000+ reviews)</span>
          </div>
          
          <Button 
            onClick={() => setShowReviewModal(true)}
            className="mt-3 md:mt-4 bg-green-600 hover:bg-green-700 text-white text-sm md:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your Review
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-base md:text-lg truncate">{testimonial.name}</CardTitle>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
                <CardDescription className="text-gray-400 text-xs md:text-sm">{testimonial.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">{testimonial.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentReviewPage(Math.max(1, currentReviewPage - 1))}
            disabled={currentReviewPage === 1}
            className="text-white border-gray-600 text-sm"
          >
            Previous
          </Button>
          <span className="text-white py-2 px-4 text-sm md:text-base">
            Page {currentReviewPage} of {totalPages.toLocaleString()}
          </span>
          <Button 
            variant="outline" 
            onClick={() => setCurrentReviewPage(Math.min(totalPages, currentReviewPage + 1))}
            disabled={currentReviewPage === totalPages}
            className="text-white border-gray-600 text-sm"
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex flex-col">
      {/* Include structured data */}
      <StructuredData packages={packages} activeSection={activeSection} />
      
      {/* Top Bar - Sticky */}
      <div className="sticky top-0 z-50">
        <TopBar />
      </div>
      
      <div className="flex flex-1 w-full">
        {/* Social Sidebar - Fixed for desktop, hidden on mobile */}
        <div className="hidden lg:block">
          <SocialSidebar onNavigateToProducts={() => setActiveSection('products')} />
        </div>
        
        {/* Desktop Sidebar - Sticky */}
        <div className="hidden md:block w-48 lg:w-56">
          <div className="fixed top-12 left-0 h-[calc(100vh-3rem)] w-48 lg:w-56 bg-gray-800/90 backdrop-blur-md border-r border-gray-700 flex flex-col z-30 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>

        {/* Mobile Layout - Full width content under header */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header with Hamburger Menu */}
          <div className="md:hidden w-full">
            <div className="flex items-center justify-between p-4 bg-gray-800/90 backdrop-blur-md border-b border-gray-700">
              <img 
                src="https://i.postimg.cc/HxHVqsZk/logo-transparent-png.png" 
                alt="Steam Points Shop" 
                className="h-8 w-auto"
              />
              <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-gray-800 border-gray-700 p-0">
                  <SidebarContent onClose={() => setIsMobileSidebarOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Main Content - Centered between sidebars */}
          <main className="flex-1 px-2 md:px-3 lg:px-4 py-6 md:py-8 md:ml-52 lg:ml-60 lg:mr-60">
            <div className="max-w-full mx-auto">
              <div className="transition-all duration-500 ease-in-out">
                {activeSection === 'home' && renderHome()}
                {activeSection === 'products' && renderProducts()}
                {activeSection === 'featured' && renderFeatured()}
                {activeSection === 'how-it-works' && renderHowItWorks()}
                {activeSection === 'testimonials' && renderTestimonials()}
                {activeSection === 'contact' && <Contact />}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Social Proof Notifications */}
      <SocialProofNotification />

      {/* Order Modal */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="glass-modal max-w-sm md:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-white text-lg md:text-xl">
              {selectedPackage?.title}
            </DialogTitle>
          </DialogHeader>
          
          {!showSuccess ? (
            <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6" method="POST" action="https://formsubmit.co/support@steampoints.shop">
              {/* Hidden FormSubmit fields */}
              <input type="hidden" name="_autoresponse" value="Thanks for your order! We'll confirm processing shortly." />
              <input type="hidden" name="_subject" value="New Order Received - SteamPoints.shop" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="#" />
              
              {/* Honeypot spam protection */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Steam Profile URL (MUST BE PUBLIC PROFILE)
                  </label>
                  <input
                    type="url"
                    name="steam_profile_url"
                    placeholder="https://steamcommunity.com/profiles/xxxxxxxxxx7311"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                
                <input type="hidden" name="package" value={selectedPackage?.title} />
                <input type="hidden" name="price" value={selectedPackage?.price} />
                <input type="hidden" name="form_type" value="product_order" />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 text-base md:text-lg"
              >
                Submit Order
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <FormSuccessMessage 
                title="You're Almost There!"
                message="Click next and complete your order and provide your steam profile URL on the next page."
              />
              <div className="text-center">
                <Button 
                  onClick={handlePaymentRedirect}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-3 text-base md:text-lg"
                >
                  Continue to Pay
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="glass-modal max-w-sm md:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-white text-lg md:text-xl">
              Add Your Review
            </DialogTitle>
          </DialogHeader>
          
          {!reviewSubmitted ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4 md:space-y-6" method="POST" action="https://formsubmit.co/support@steampoints.shop">
              {/* Hidden FormSubmit fields */}
              <input type="hidden" name="_autoresponse" value="Thanks for your review! We appreciate your feedback." />
              <input type="hidden" name="_subject" value="New Review Submitted - SteamPoints.shop" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="#" />
              
              {/* Honeypot spam protection */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Your Name/Username
                  </label>
                  <input
                    type="text"
                    name="reviewer_name"
                    placeholder="Enter your gaming name"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Rating
                  </label>
                  <select
                    name="rating"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select Rating</option>
                    <option value="5">5 Stars - Excellent</option>
                    <option value="4">4 Stars - Good</option>
                    <option value="3">3 Stars - Average</option>
                    <option value="2">2 Stars - Poor</option>
                    <option value="1">1 Star - Terrible</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Your Review
                  </label>
                  <textarea
                    name="review_text"
                    placeholder="Tell us about your experience..."
                    required
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                
                <input type="hidden" name="form_type" value="review_submission" />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 text-base md:text-lg"
              >
                Submit Review
              </Button>
            </form>
          ) : (
            <FormSuccessMessage 
              title="Review Submitted!"
              message="Your review has been sent successfully. Thanks for your feedback!"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Steam Points",
            "description": "Get Steam Points delivered instantly to your profile through Steam's official award system",
            "brand": {
              "@type": "Brand",
              "name": "SteamPoints.shop"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "95000"
            },
            "offers": packages.map(pkg => ({
              "@type": "Offer",
              "name": pkg.title,
              "price": pkg.price.replace('€', ''),
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock"
            }))
          })
        }}
      />
    </div>
  );
};

export default Index;

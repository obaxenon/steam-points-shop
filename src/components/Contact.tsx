import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, FileText, Copy, Send, X, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FormSuccessMessage from './FormSuccessMessage';

const Contact = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! How can I help you today?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [emailCopied, setEmailCopied] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: '', answer: 0 });

  // Generate random math captcha
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';
    const answer = operation === '+' ? num1 + num2 : num1 - num2;
    
    setCaptchaQuestion({
      question: `What is ${num1} ${operation} ${num2}?`,
      answer: answer
    });
  }, [showContactForm]);

  // Auto-close chat after 10 minutes of inactivity
  useEffect(() => {
    if (showLiveChat) {
      const interval = setInterval(() => {
        if (Date.now() - lastActivity > 600000) { // 10 minutes
          setShowLiveChat(false);
          setChatMessages([{ type: 'bot', message: 'Hello! How can I help you today?' }]);
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [showLiveChat, lastActivity]);

  const copyEmail = () => {
    navigator.clipboard.writeText('support@steampoints.shop');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Delivery and timing related
    if (message.includes('delivery') || message.includes('time') || message.includes('how long')) {
      return 'Steam Points are delivered within 30 minutes to 6 hours after payment confirmation. The delivery time depends on your package size and current queue.';
    }
    
    // Safety and security
    if (message.includes('safe') || message.includes('ban') || message.includes('security')) {
      return 'Our service is 100% safe! We use Steam\'s official award system to deliver points. Over 95,000 customers have used our service without any account issues or bans.';
    }
    
    // Profile requirements
    if (message.includes('profile') || message.includes('public') || message.includes('private')) {
      return 'Your Steam profile must be set to PUBLIC for us to deliver the awards. Also, make sure you have enough screenshots/artworks uploaded as required by your package.';
    }
    
    // Payment related
    if (message.includes('payment') || message.includes('paypal') || message.includes('pay')) {
      return 'We accept PayPal for all payments. After filling out your details, you\'ll be redirected to PayPal to complete the secure payment process.';
    }
    
    // Refund and support
    if (message.includes('refund') || message.includes('problem') || message.includes('issue')) {
      return 'If you experience any issues, contact us at support@steampoints.shop. We offer full support and will resolve any problems quickly.';
    }
    
    // Package related
    if (message.includes('package') || message.includes('points') || message.includes('award')) {
      return 'We offer packages from 10,000 to 100,000 Steam Points delivered as awards. Each package has different requirements for screenshots/artworks on your profile.';
    }
    
    // Default responses
    const defaultResponses = [
      'I\'m here to help! You can ask me about delivery times, safety, payment methods, or any other questions about our Steam Points service.',
      'Feel free to ask me anything about our Steam Points packages, delivery process, or requirements!',
      'How can I assist you with your Steam Points purchase today?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = currentMessage;
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }]);
    setCurrentMessage('');
    setIsTyping(true);
    setLastActivity(Date.now());
    
    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      setChatMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Show success state immediately
    setFormSubmitted(true);
    
    // Submit form data to FormSubmit
    const formData = new FormData(e.currentTarget);
    
    try {
      await fetch('https://formsubmit.co/support@steampoints.shop', {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      console.log('Contact form submission error:', error);
      // Still show success to user since FormSubmit handles delivery
    }
    
    // Close modal after 4 seconds to allow confetti animation to play
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Contact Support</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Need help with your Steam Points order? Our support team is here to assist you 24/7.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Email Support */}
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white">Email Support</CardTitle>
            <CardDescription className="text-gray-300">
              Get direct email support for any questions or issues
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-white font-mono">support@steampoints.shop</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => window.location.href = 'mailto:support@steampoints.shop'}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Send Email
              </Button>
              <Button 
                onClick={copyEmail}
                variant="outline" 
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                {emailCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Chat */}
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white">Live Chat</CardTitle>
            <CardDescription className="text-gray-300">
              Chat with our AI assistant for instant help
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => setShowLiveChat(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Start Live Chat
            </Button>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white">Contact Form</CardTitle>
            <CardDescription className="text-gray-300">
              Send us a detailed message about your inquiry
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => setShowContactForm(true)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Open Form
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Live Chat Modal */}
      <Dialog open={showLiveChat} onOpenChange={setShowLiveChat}>
        <DialogContent className="glass-modal max-w-lg h-[600px] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-white text-xl">Live Chat Support</DialogTitle>
                <p className="text-gray-400 text-sm mt-1">We are here to help live 24/7</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowLiveChat(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-900/50 backdrop-blur-sm">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700/80 backdrop-blur-sm text-gray-200'
                }`}>
                  {msg.message}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700/80 backdrop-blur-sm text-gray-200 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Form Modal */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="glass-modal max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Contact Form
            </DialogTitle>
          </DialogHeader>
          
          {!formSubmitted ? (
            <form onSubmit={handleContactSubmit} className="space-y-6" method="POST" action="https://formsubmit.co/support@steampoints.shop">
              {/* Hidden FormSubmit fields */}
              <input type="hidden" name="_autoresponse" value="Thanks for contacting us! We'll get back to you as soon as possible." />
              <input type="hidden" name="_subject" value="New Contact Form Submission - SteamPoints.shop" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="#" />
              
              {/* Honeypot spam protection */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                
                <input type="hidden" name="form_type" value="contact_form" />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
              >
                Send Message
              </Button>
            </form>
          ) : (
            <FormSuccessMessage 
              title="Message Sent!"
              message="We will reply to your email shortly, hang tight... in the meantime grab a coffee and buy some awards :)"
              showGif={false}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;

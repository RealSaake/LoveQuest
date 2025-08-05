import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Landing = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [vineHeight, setVineHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    const vineTimer = setTimeout(() => setVineHeight(100), 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(vineTimer);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-ivory-paper via-background to-blush-pink/5">
      {/* Removed FloatingElements - too distracting */}
      
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blush-pink/3 to-dusty-lavender/5" />

      {/* Decorative Vine */}
      <div className="absolute left-8 top-0 w-1 bg-sage-green opacity-30 transition-all duration-3000 ease-out"
           style={{ height: `${vineHeight}%` }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          
          {/* Main Greeting */}
          <h1 className="font-dancing text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight">
            Welcome to Our LoveQuest,
            <span className="block text-primary mt-2">Kat</span>
          </h1>

          {/* Subtitle */}
          <p className="font-caveat text-2xl md:text-3xl text-muted-foreground mb-8 max-w-2xl">
            A digital love letter crafted with watercolors, memories, and endless affection 💕
          </p>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center gap-8 mb-12 text-3xl opacity-80" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}>
            <span className="animate-wave-flow transition-transform hover:scale-125" style={{ animationDelay: '0s' }}>🌸</span>
            <span className="animate-wave-flow transition-transform hover:scale-125" style={{ animationDelay: '0.3s' }}>💕</span>
            <span className="animate-wave-flow transition-transform hover:scale-125" style={{ animationDelay: '0.6s' }}>🌹</span>
            <span className="animate-wave-flow transition-transform hover:scale-125" style={{ animationDelay: '0.9s' }}>💖</span>
            <span className="animate-wave-flow transition-transform hover:scale-125" style={{ animationDelay: '1.2s' }}>✨</span>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/timeline')}
              size="lg"
              className="font-playfair text-lg px-8 py-6 bg-gradient-romance hover:scale-105 transition-transform duration-300 dreamy-shadow"
            >
              Begin Our Journey
            </Button>
            
            <p className="font-caveat text-lg text-muted-foreground">
              Just for you 💕
            </p>
          </div>

          {/* Signature */}
          <div className={`mt-16 transform transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="font-caveat text-xl text-dusty-lavender">
              Made with love, ink, and a thousand butterflies
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float opacity-40">
        <div className="text-3xl">🌹</div>
      </div>
    </div>
  );
};
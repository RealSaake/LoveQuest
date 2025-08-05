import { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  size: number;
}

interface FloatingSparkle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export const FloatingElements = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [sparkles, setSparkles] = useState<FloatingSparkle[]>([]);

  useEffect(() => {
    // Generate floating hearts
    const heartElements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      size: 12 + Math.random() * 8,
    }));
    setHearts(heartElements);

    // Generate sparkles
    const sparkleElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 2,
    }));
    setSparkles(sparkleElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heart-float text-primary opacity-20"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💕
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle text-accent opacity-30"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Floating butterflies */}
      <div className="absolute top-1/4 left-1/4 animate-float text-2xl opacity-25" style={{ animationDelay: '1s' }}>
        🦋
      </div>
      <div className="absolute top-3/4 right-1/4 animate-float text-xl opacity-20" style={{ animationDelay: '3s' }}>
        🦋
      </div>
      <div className="absolute top-1/2 left-3/4 animate-float text-lg opacity-30" style={{ animationDelay: '5s' }}>
        🌸
      </div>
    </div>
  );
};
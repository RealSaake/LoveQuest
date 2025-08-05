import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FloatingElements } from '@/components/FloatingElements';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  emotion: string;
  position: 'left' | 'right';
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "Day One",
    title: "First Spark",
    description: "The moment our eyes met across that crowded room, and the whole world seemed to pause just for us.",
    emotion: "💕",
    position: "left"
  },
  {
    id: 2,
    date: "Week Two",
    title: "Coffee & Conversations",
    description: "Hours melted away as we talked about everything and nothing, discovering how perfectly our souls aligned.",
    emotion: "☕",
    position: "right"
  },
  {
    id: 3,
    date: "Month One",
    title: "Dancing in the Rain",
    description: "When the storm caught us off guard, we didn't run for shelter—we danced instead, laughing until we cried.",
    emotion: "🌧️",
    position: "left"
  },
  {
    id: 4,
    date: "Season Two",
    title: "Building Dreams",
    description: "Late-night conversations about our future, painting pictures of a life we'd build together, brick by brick.",
    emotion: "🏡",
    position: "right"
  },
  {
    id: 5,
    date: "Present",
    title: "Forever & Always",
    description: "Here we are now, still discovering new reasons to fall deeper in love every single day.",
    emotion: "∞",
    position: "left"
  }
];

export const Timeline = () => {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);

  useEffect(() => {
    timelineEvents.forEach((_, index) => {
      setTimeout(() => {
        setVisibleEvents(prev => [...prev, index]);
      }, index * 600);
    });
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-gradient-garden relative">
      <FloatingElements />
      
      {/* Header */}
      <div className="relative z-10 pt-8 pb-8 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-4">
          Our Timeline
        </h1>
        <p className="font-caveat text-xl text-muted-foreground">
          Every moment a brushstroke in our love story 🎨
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Central Vine */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-sage-green opacity-40 animate-vine-grow"
             style={{ top: '0', height: '100%' }} />

        {/* Timeline Events */}
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              className={`relative flex ${event.position === 'left' ? 'justify-start' : 'justify-end'} mb-16`}
            >
              <Card 
                className={`w-full md:w-96 paper-texture transform transition-all duration-1000 hover:scale-105 hover:dreamy-shadow ${
                  visibleEvents.includes(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                } ${event.position === 'left' ? 'md:mr-auto rotate-1' : 'md:ml-auto -rotate-1'}`}
                style={{
                  transformOrigin: 'center',
                  animationDelay: `${index * 0.3}s`
                }}
              >
                <CardContent className="p-6">
                  {/* Date Badge */}
                  <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full font-inter text-sm mb-4">
                    {event.date}
                  </div>

                  {/* Event Content */}
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                      {event.emotion}
                    </div>
                    
                    <div>
                      <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                        {event.title}
                      </h3>
                      <p className="font-inter text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-2 right-2 text-dusty-lavender opacity-50">
                    <div className="w-4 h-4 border-r-2 border-t-2 border-current rotate-45" />
                  </div>
                </CardContent>
              </Card>

              {/* Connection to Central Vine */}
              <div className={`absolute top-8 w-8 h-0.5 bg-sage-green opacity-30 ${
                event.position === 'left' 
                  ? 'right-0 md:left-96' 
                  : 'left-0 md:right-96'
              } hidden md:block`} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-2xl opacity-60 animate-sparkle">
          ✨ To be continued... ✨
        </div>
      </div>
    </div>
  );
};
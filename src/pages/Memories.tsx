import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FloatingElements } from '@/components/FloatingElements';
import { Heart, Music, Calendar, MapPin } from 'lucide-react';

interface Memory {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  emotion: string;
  favorites: number;
  isLiked: boolean;
  tags: string[];
}

const memories: Memory[] = [
  {
    id: 1,
    title: "First Date Magic",
    date: "March 15, 2024",
    location: "Central Park",
    image: "🌸",
    description: "The cherry blossoms were in full bloom, just like the butterflies in my stomach when you smiled at me.",
    emotion: "💕",
    favorites: 42,
    isLiked: true,
    tags: ["first-date", "spring", "magical"]
  },
  {
    id: 2,
    title: "Cooking Disaster",
    date: "April 2, 2024",
    location: "Our Kitchen",
    image: "🍝",
    description: "When we tried to make pasta and ended up with modern art on the ceiling. Best disaster ever!",
    emotion: "😂",
    favorites: 38,
    isLiked: true,
    tags: ["cooking", "funny", "home"]
  },
  {
    id: 3,
    title: "Sunset Beach Walk",
    date: "May 20, 2024",
    location: "Moonlight Beach",
    image: "🌅",
    description: "Hand in hand as the sun painted the sky in colors that matched the warmth in my heart.",
    emotion: "🧡",
    favorites: 67,
    isLiked: false,
    tags: ["beach", "sunset", "romantic"]
  },
  {
    id: 4,
    title: "Rainy Day Cuddles",
    date: "June 8, 2024",
    location: "Home Sweet Home",
    image: "☔",
    description: "Thunder outside, but all I could hear was your heartbeat as we read poetry together.",
    emotion: "💙",
    favorites: 29,
    isLiked: true,
    tags: ["cozy", "rain", "reading"]
  },
  {
    id: 5,
    title: "Stargazing Adventure",
    date: "July 4, 2024",
    location: "Hilltop Observatory",
    image: "⭐",
    description: "Making wishes on shooting stars, though I already had everything I ever wanted right beside me.",
    emotion: "✨",
    favorites: 51,
    isLiked: false,
    tags: ["stars", "wishes", "adventure"]
  },
  {
    id: 6,
    title: "Coffee Shop Corner",
    date: "August 12, 2024",
    location: "Brew & Books Café",
    image: "☕",
    description: "Hours disappeared as we talked about everything and nothing, our coffee growing cold, our hearts growing warm.",
    emotion: "☕",
    favorites: 34,
    isLiked: true,
    tags: ["coffee", "conversation", "cozy"]
  }
];

export const Memories = () => {
  const [likedMemories, setLikedMemories] = useState<number[]>([1, 2, 4, 6]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const toggleLike = (memoryId: number) => {
    setLikedMemories(prev => 
      prev.includes(memoryId) 
        ? prev.filter(id => id !== memoryId)
        : [...prev, memoryId]
    );
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-gradient-enchanted relative">
      <FloatingElements />
      
      {/* Header */}
      <div className="relative z-10 pt-8 pb-8 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-4">
          Memory Vault
        </h1>
        <p className="font-caveat text-xl text-muted-foreground">
          Treasured moments captured in time 📸✨
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {memories.map((memory, index) => {
            const isLiked = likedMemories.includes(memory.id);
            
            return (
              <Dialog key={memory.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="break-inside-avoid paper-texture cursor-pointer transform transition-all duration-500 hover:scale-105 hover:dreamy-shadow group"
                    onClick={() => setSelectedMemory(memory)}
                  >
                    <CardContent className="p-0 relative overflow-hidden">
                      {/* Memory Image/Emoji */}
                      <div className="aspect-square bg-gradient-garden flex items-center justify-center text-6xl relative">
                        <div className="animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                          {memory.image}
                        </div>
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white font-caveat text-lg">
                            Click to relive 💕
                          </div>
                        </div>
                      </div>

                      {/* Memory Info */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-playfair text-lg font-bold text-foreground">
                            {memory.title}
                          </h3>
                          <div className="text-xl">
                            {memory.emotion}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          <span className="font-inter">{memory.date}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          <span className="font-inter">{memory.location}</span>
                        </div>

                        <p className="font-inter text-sm text-foreground leading-relaxed line-clamp-3">
                          {memory.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {memory.tags.map(tag => (
                            <span 
                              key={tag}
                              className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-inter"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(memory.id);
                            }}
                            className={`flex items-center gap-2 ${
                              isLiked ? 'text-primary animate-heart-pop' : 'text-muted-foreground'
                            }`}
                          >
                            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                            <span className="font-inter text-sm">
                              {memory.favorites + (isLiked && !memory.isLiked ? 1 : 0)}
                            </span>
                          </Button>

                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <Music size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                {/* Memory Modal */}
                <DialogContent className="max-w-2xl bg-card paper-texture">
                  {selectedMemory && selectedMemory.id === memory.id && (
                    <div className="space-y-6">
                      {/* Large Memory Display */}
                      <div className="aspect-video bg-gradient-garden flex items-center justify-center text-8xl rounded-lg">
                        <div className="animate-float">
                          {selectedMemory.image}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <h2 className="font-playfair text-2xl font-bold text-foreground">
                            {selectedMemory.title}
                          </h2>
                          <div className="text-3xl">
                            {selectedMemory.emotion}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-muted-foreground font-inter">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{selectedMemory.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{selectedMemory.location}</span>
                          </div>
                        </div>

                        <p className="font-inter text-foreground leading-relaxed">
                          {selectedMemory.description}
                        </p>

                        {/* Enhanced description for modal */}
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="font-caveat text-lg text-muted-foreground italic">
                            "Some moments are too precious for words, but I'll try anyway... 💕"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </div>
  );
};
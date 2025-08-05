import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FloatingElements } from '@/components/FloatingElements';
import { Gift, Sparkles, Crown, Diamond } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Keepsake {
  id: number;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  dateEarned: string;
  questSource: string;
  icon: string;
  isRevealed: boolean;
}

const keepsakes: Keepsake[] = [
  {
    id: 1,
    name: "Sunshine Smile Badge",
    description: "Earned for bringing joy to ordinary mornings. This golden badge captures the warmth of Kat's first smile each day.",
    rarity: "common",
    dateEarned: "Today",
    questSource: "Morning Love Note",
    icon: "☀️",
    isRevealed: true
  },
  {
    id: 2,
    name: "Memory Keeper Medallion",
    description: "A mystical medallion that preserves the essence of shared adventures. It pulses with the energy of laughter and discovery.",
    rarity: "rare",
    dateEarned: "Pending",
    questSource: "Surprise Picnic",
    icon: "🏆",
    isRevealed: false
  },
  {
    id: 3,
    name: "Starlight Serenade Trophy",
    description: "Crafted from crystallized moonbeams and midnight melodies. Glows when true love dances under the cosmos.",
    rarity: "epic",
    dateEarned: "Pending",
    questSource: "Dance Under Stars",
    icon: "🌟",
    isRevealed: false
  },
  {
    id: 4,
    name: "Explorer's Heart Compass",
    description: "Always points toward the next great adventure when two hearts beat as one. Forged from wanderlust and wonder.",
    rarity: "epic",
    dateEarned: "Locked",
    questSource: "Adventure Weekend",
    icon: "🧭",
    isRevealed: false
  },
  {
    id: 5,
    name: "Eternal Love Crown",
    description: "The rarest treasure of all. Legend says it appears only when two souls recognize they are meant to journey through infinity together.",
    rarity: "legendary",
    dateEarned: "Destiny Awaits",
    questSource: "Forever Promise",
    icon: "👑",
    isRevealed: false
  },
  {
    id: 6,
    name: "Butterfly Kiss Charm",
    description: "A delicate charm that holds the magic of gentle moments and tender touches. Shimmers with the color of blushing cheeks.",
    rarity: "rare",
    dateEarned: "Secret",
    questSource: "Hidden Quest",
    icon: "🦋",
    isRevealed: false
  }
];

const rarityStyles = {
  common: {
    border: 'border-sage-green',
    bg: 'bg-muted/50',
    glow: '',
    icon: Sparkles
  },
  rare: {
    border: 'border-secondary',
    bg: 'bg-secondary/30',
    glow: 'shadow-lg shadow-secondary/30',
    icon: Diamond
  },
  epic: {
    border: 'border-accent',
    bg: 'bg-accent/30',
    glow: 'shadow-xl shadow-accent/40',
    icon: Crown
  },
  legendary: {
    border: 'border-primary',
    bg: 'bg-gradient-romance',
    glow: 'shadow-2xl shadow-primary/50 animate-pulse',
    icon: Crown
  }
};

export const Keepsakes = () => {
  const [revealedKeepsakes, setRevealedKeepsakes] = useState<number[]>([1]);
  const { toast } = useToast();

  const handleReveal = (keepsake: Keepsake) => {
    if (!keepsake.isRevealed && keepsake.dateEarned !== "Pending" && keepsake.dateEarned !== "Locked") {
      setRevealedKeepsakes(prev => [...prev, keepsake.id]);
      toast({
        title: "Treasure Revealed! ✨",
        description: `You've uncovered the ${keepsake.name}!`,
        duration: 4000
      });
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-gradient-sunset relative">
      <FloatingElements />
      
      {/* Header */}
      <div className="relative z-10 pt-8 pb-8 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-4">
          Keepsake Chest
        </h1>
        <p className="font-caveat text-xl text-muted-foreground mb-6">
          Treasures earned through love, laughter, and adventure 🎁
        </p>
        
        {/* Collection Stats */}
        <div className="flex justify-center items-center gap-6 text-sm font-inter">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{revealedKeepsakes.length}</div>
            <div className="text-muted-foreground">Revealed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{keepsakes.length - revealedKeepsakes.length}</div>
            <div className="text-muted-foreground">Hidden</div>
          </div>
        </div>
      </div>

      {/* Keepsakes Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {keepsakes.map((keepsake, index) => {
            const style = rarityStyles[keepsake.rarity];
            const RarityIcon = style.icon;
            const isRevealed = revealedKeepsakes.includes(keepsake.id);
            const canReveal = keepsake.dateEarned !== "Pending" && keepsake.dateEarned !== "Locked";
            
            return (
              <Card 
                key={keepsake.id}
                className={`paper-texture transform transition-all duration-500 hover:scale-105 cursor-pointer group relative overflow-hidden ${
                  style.border
                } ${style.glow} ${!isRevealed && !canReveal ? 'opacity-70' : ''}`}
                onClick={() => handleReveal(keepsake)}
              >
                <CardContent className="p-6 relative">
                  {/* Rarity Background */}
                  <div className={`absolute inset-0 ${style.bg} opacity-50`} />
                  
                  {/* Mystery State */}
                  {!isRevealed && (
                    <div className="absolute inset-0 bg-muted/80 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="text-center">
                        <Gift size={40} className="mx-auto mb-2 text-muted-foreground animate-float" />
                        <p className="font-caveat text-lg text-muted-foreground">
                          {canReveal ? "Click to reveal!" : "Complete quest to unlock"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Rarity Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      className={`${style.bg} ${style.border} capitalize flex items-center gap-1`}
                    >
                      <RarityIcon size={12} />
                      {keepsake.rarity}
                    </Badge>
                    <div className="text-xs text-muted-foreground font-inter">
                      {keepsake.dateEarned}
                    </div>
                  </div>

                  {/* Keepsake Icon */}
                  <div className="text-5xl mb-4 text-center animate-float" 
                       style={{ animationDelay: `${index * 0.3}s` }}>
                    {keepsake.icon}
                  </div>

                  {/* Keepsake Info */}
                  <div className="space-y-3 relative z-20">
                    <h3 className="font-playfair text-xl font-bold text-foreground text-center">
                      {keepsake.name}
                    </h3>

                    <p className="font-inter text-sm text-muted-foreground leading-relaxed text-center">
                      {keepsake.description}
                    </p>

                    <div className="border-t border-border pt-3">
                      <p className="font-caveat text-dusty-lavender text-sm text-center">
                        <span className="font-semibold">Source:</span> {keepsake.questSource}
                      </p>
                    </div>

                    {/* Legendary Glow Effect */}
                    {keepsake.rarity === 'legendary' && isRevealed && (
                      <div className="absolute -inset-2 bg-gradient-romance opacity-20 rounded-lg animate-pulse" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Collection Progress */}
      <div className="relative z-10 text-center mt-16 pb-8">
        <div className="max-w-md mx-auto bg-card/80 backdrop-blur-sm rounded-lg p-6 paper-texture">
          <h3 className="font-playfair text-lg font-bold text-foreground mb-4">
            Collection Progress
          </h3>
          
          <div className="w-full bg-muted rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-romance h-3 rounded-full transition-all duration-1000"
              style={{ width: `${(revealedKeepsakes.length / keepsakes.length) * 100}%` }}
            />
          </div>
          
          <p className="font-caveat text-muted-foreground">
            Every treasure tells a story of our love 💝
          </p>
        </div>
      </div>
    </div>
  );
};

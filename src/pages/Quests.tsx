import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FloatingElements } from '@/components/FloatingElements';
import { Lock, CheckCircle, Heart, Star, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Quest {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  status: 'locked' | 'available' | 'completed';
  reward: string;
  icon: string;
}

const quests: Quest[] = [
  {
    id: 1,
    title: "Morning Love Note",
    description: "Leave a sweet handwritten note where Kat will find it in the morning.",
    difficulty: "easy",
    status: "completed",
    reward: "Sunshine Smile Badge",
    icon: "📝"
  },
  {
    id: 2,
    title: "Surprise Picnic",
    description: "Plan a romantic picnic in our favorite spot with all of Kat's favorite treats.",
    difficulty: "medium",
    status: "available",
    reward: "Memory Keeper Medallion",
    icon: "🧺"
  },
  {
    id: 3,
    title: "Dance Under Stars",
    description: "Create a magical evening of dancing under the stars to our song.",
    difficulty: "medium",
    status: "available",
    reward: "Starlight Serenade Trophy",
    icon: "💃"
  },
  {
    id: 4,
    title: "Adventure Weekend",
    description: "Plan a surprise weekend getaway to a place we've both dreamed of visiting.",
    difficulty: "hard",
    status: "locked",
    reward: "Explorer's Heart Compass",
    icon: "🗺️"
  },
  {
    id: 5,
    title: "Forever Promise",
    description: "A quest that only appears when the heart is ready for the ultimate adventure.",
    difficulty: "legendary",
    status: "locked",
    reward: "Eternal Love Crown",
    icon: "👑"
  }
];

const difficultyColors = {
  easy: 'bg-muted',
  medium: 'bg-secondary',
  hard: 'bg-accent',
  legendary: 'bg-gradient-romance'
};

const difficultyIcons = {
  easy: Heart,
  medium: Star,
  hard: Crown,
  legendary: Crown
};

export const Quests = () => {
  const [completedQuests, setCompletedQuests] = useState<number[]>([1]);
  const { toast } = useToast();

  const handleQuestAction = (quest: Quest) => {
    if (quest.status === 'locked') {
      toast({
        title: "Quest Locked",
        description: "Complete previous quests to unlock this adventure! 🔒"
      });
      return;
    }

    if (quest.status === 'completed') {
      toast({
        title: "Already Completed!",
        description: `You've earned the ${quest.reward} ✨`
      });
      return;
    }

    // Simulate quest completion
    setCompletedQuests(prev => [...prev, quest.id]);
    toast({
      title: "Quest Started!",
      description: `Time to make some magic happen! 🎭`,
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-gradient-sunset relative">
      <FloatingElements />
      
      {/* Header */}
      <div className="relative z-10 pt-8 pb-8 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-4">
          Love Quests
        </h1>
        <p className="font-caveat text-xl text-muted-foreground mb-6">
          Adventures to create more beautiful memories together 🎯
        </p>
        
        {/* Quest Progress */}
        <div className="flex justify-center items-center gap-4 text-sm font-inter">
          <span className="text-muted-foreground">Progress:</span>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div 
                key={i}
                className={`w-3 h-3 rounded-full ${
                  completedQuests.includes(i) ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quests.map((quest, index) => {
            const DifficultyIcon = difficultyIcons[quest.difficulty];
            const isCompleted = completedQuests.includes(quest.id);
            const isLocked = quest.status === 'locked';
            
            return (
              <Card 
                key={quest.id}
                className={`paper-texture transform transition-all duration-500 hover:scale-105 animate-breathe cursor-pointer ${
                  isLocked ? 'opacity-60 blur-sm' : ''
                } ${isCompleted ? 'bg-gradient-garden' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '4s'
                }}
                onClick={() => handleQuestAction(quest)}
              >
                <CardContent className="p-6 relative">
                  {/* Status Icon */}
                  <div className="absolute top-4 right-4">
                    {isLocked && <Lock size={20} className="text-muted-foreground" />}
                    {isCompleted && <CheckCircle size={20} className="text-primary animate-heart-pop" />}
                  </div>

                  {/* Quest Icon */}
                  <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                    {quest.icon}
                  </div>

                  {/* Quest Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={`${difficultyColors[quest.difficulty]} text-xs capitalize flex items-center gap-1`}
                      >
                        <DifficultyIcon size={12} />
                        {quest.difficulty}
                      </Badge>
                    </div>

                    <h3 className="font-playfair text-xl font-bold text-foreground">
                      {quest.title}
                    </h3>

                    <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                      {quest.description}
                    </p>

                    <div className="border-t border-border pt-3">
                      <p className="font-caveat text-dusty-lavender text-sm">
                        <span className="font-semibold">Reward:</span> {quest.reward}
                      </p>
                    </div>

                    <Button 
                      className={`w-full mt-4 ${
                        isCompleted 
                          ? 'bg-primary text-primary-foreground' 
                          : isLocked 
                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                            : 'bg-gradient-romance hover:scale-105'
                      }`}
                      disabled={isLocked}
                    >
                      {isCompleted ? 'Completed! ✨' : isLocked ? 'Locked 🔒' : 'Start Quest 🚀'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="relative z-10 text-center mt-16 pb-8">
        <p className="font-caveat text-lg text-muted-foreground">
          Every quest completed is another page in our love story 📖✨
        </p>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Star, Crown, Flame } from 'lucide-react';

interface AchievementToastProps {
  achievement: {
    name: string;
    description: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    points: number;
  };
  show: boolean;
  onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, show, onClose }) => {
  const { toast } = useToast();

  useEffect(() => {
    if (show) {
      const icon = {
        common: <Star className="w-6 h-6" />,
        rare: <Trophy className="w-6 h-6" />,
        epic: <Crown className="w-6 h-6" />,
        legendary: <Flame className="w-6 h-6" />
      }[achievement.rarity];

      const color = {
        common: 'from-gray-400 to-gray-600',
        rare: 'from-blue-400 to-blue-600',
        epic: 'from-purple-400 to-purple-600',
        legendary: 'from-yellow-400 to-orange-600'
      }[achievement.rarity];

      toast({
        title: `Achievement Unlocked! ${achievement.name}`,
        description: (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                {icon}
              </div>
              <div className="font-medium">{achievement.name}</div>
            </div>
            <p className="mb-2">{achievement.description}</p>
            <p className="text-sm font-medium text-blue-600">+{achievement.points} XP earned!</p>
          </div>
        ),
        duration: 5000,
      });

      onClose();
    }
  }, [show, achievement, toast, onClose]);

  return null;
};

export default AchievementToast;

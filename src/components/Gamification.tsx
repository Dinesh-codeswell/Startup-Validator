
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useUserStats } from '@/hooks/useUserStats';
import { useAchievements } from '@/hooks/useAchievements';
import { useChallenges } from '@/hooks/useChallenges';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Users, 
  TrendingUp,
  Award,
  Crown,
  Gem,
  Flame,
  Calendar,
  Gift
} from 'lucide-react';

const AchievementCard = ({ achievement, isUnlocked }: { achievement: any; isUnlocked: boolean }) => {
  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-600'
  };

  const rarityBorders = {
    common: 'border-gray-300',
    rare: 'border-blue-300',
    epic: 'border-purple-300',
    legendary: 'border-yellow-300'
  };

  const iconMap: { [key: string]: React.ReactNode } = {
    'rocket': <Zap className="w-6 h-6" />,
    'lightbulb': <Target className="w-6 h-6" />,
    'trophy': <Trophy className="w-6 h-6" />,
    'heart': <Star className="w-6 h-6" />,
    'star': <Crown className="w-6 h-6" />,
    'message-circle': <Users className="w-6 h-6" />,
    'flame': <Flame className="w-6 h-6" />,
    'crown': <Crown className="w-6 h-6" />,
    'compass': <TrendingUp className="w-6 h-6" />,
    'bookmark': <Award className="w-6 h-6" />
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
      isUnlocked ? rarityBorders[achievement.rarity] : 'border-gray-200'
    } ${isUnlocked ? 'shadow-lg' : 'opacity-60'}`}>
      {isUnlocked && (
        <div className={`absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] bg-gradient-to-r ${rarityColors[achievement.rarity]}`}></div>
      )}
      
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isUnlocked 
              ? `bg-gradient-to-br ${rarityColors[achievement.rarity]}` 
              : 'bg-gray-200'
          }`}>
            <div className={isUnlocked ? 'text-white' : 'text-gray-400'}>
              {iconMap[achievement.icon] || <Award className="w-6 h-6" />}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{achievement.name}</h4>
            <p className="text-xs text-gray-500">{achievement.description}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Badge variant={isUnlocked ? 'default' : 'secondary'} className="text-xs">
            {achievement.rarity}
          </Badge>
          <span className="text-xs font-medium text-blue-600">+{achievement.points} XP</span>
        </div>
      </CardContent>
    </Card>
  );
};

const ChallengeCard = ({ challenge, participation, onJoin }: { challenge: any; participation?: any; onJoin: (id: string) => void }) => {
  const isActive = new Date(challenge.end_date) > new Date();
  const isParticipating = !!participation;
  const daysLeft = Math.ceil((new Date(challenge.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className={`relative overflow-hidden ${isActive ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            {challenge.title}
          </CardTitle>
          <Badge variant={isActive ? 'default' : 'secondary'}>
            {challenge.challenge_type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{challenge.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{challenge.current_participants} participants</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium">Reward: +{challenge.rewards?.xp || 0} XP</span>
        </div>

        {isActive && !isParticipating && (
          <Button onClick={() => onJoin(challenge.id)} className="w-full">
            Join Challenge
          </Button>
        )}
        
        {isParticipating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{participation.completed ? 'Completed!' : 'In Progress'}</span>
            </div>
            <Progress value={participation.completed ? 100 : 50} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Gamification = () => {
  const { stats, loading: statsLoading } = useUserStats();
  const { achievements, userAchievements, loading: achievementsLoading, checkAndAwardAchievements } = useAchievements();
  const { challenges, participations, joinChallenge } = useChallenges();
  const { user } = useAuth();

  useEffect(() => {
    if (stats && achievements.length > 0) {
      checkAndAwardAchievements(stats);
    }
  }, [stats, achievements]);

  const unlockedAchievements = userAchievements.length;
  const currentLevel = stats?.level || 1;
  const nextLevelXp = currentLevel * 1000;
  const currentXp = stats?.total_xp || 0;
  const progressToNextLevel = ((currentXp % 1000) / 1000) * 100;

  if (statsLoading || achievementsLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Login Required</h3>
          <p className="text-gray-500">Please log in to view your achievements and progress.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Level Card */}
      <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Level {currentLevel}</h3>
              <p className="text-purple-100">
                {currentLevel >= 10 ? 'Innovation Legend' : 
                 currentLevel >= 5 ? 'Innovation Expert' : 
                 currentLevel >= 3 ? 'Aspiring Entrepreneur' : 
                 'Startup Enthusiast'}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats?.ideas_submitted || 0}</div>
              <div className="text-sm text-purple-100">Ideas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats?.likes_given || 0}</div>
              <div className="text-sm text-purple-100">Likes Given</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{unlockedAchievements}</div>
              <div className="text-sm text-purple-100">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-orange-300" />
                {stats?.login_streak || 0}
              </div>
              <div className="text-sm text-purple-100">Day Streak</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {currentLevel + 1}</span>
              <span>{currentXp}/{nextLevelXp} XP</span>
            </div>
            <Progress 
              value={progressToNextLevel} 
              className="h-3 bg-white/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Achievements
            </div>
            <Badge variant="outline">{unlockedAchievements}/{achievements.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length === 0 ? (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Start submitting ideas to unlock achievements!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const isUnlocked = userAchievements.some(ua => ua.achievement_id === achievement.id);
                return (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                    isUnlocked={isUnlocked}
                  />
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            Active Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          {challenges.length === 0 ? (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No active challenges at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map((challenge) => {
                const participation = participations.find(p => p.challenge_id === challenge.id);
                return (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    participation={participation}
                    onJoin={joinChallenge}
                  />
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Gamification;

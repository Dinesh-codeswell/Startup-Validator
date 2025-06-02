
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  conditions: any;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  progress: number;
  achievements: Achievement;
}

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('points', { ascending: true });

      if (error) throw error;
      setAchievements((data || []).map(item => ({
        ...item,
        rarity: item.rarity as 'common' | 'rare' | 'epic' | 'legendary'
      })));
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const fetchUserAchievements = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievements (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setUserAchievements((data || []).map(item => ({
        ...item,
        achievements: {
          ...item.achievements,
          rarity: item.achievements.rarity as 'common' | 'rare' | 'epic' | 'legendary'
        }
      })) as UserAchievement[]);
    } catch (error) {
      console.error('Error fetching user achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndAwardAchievements = async (userStats: any) => {
    if (!user || !userStats) return;

    try {
      for (const achievement of achievements) {
        const conditions = achievement.conditions;
        const hasAchievement = userAchievements.some(
          ua => ua.achievement_id === achievement.id
        );

        if (!hasAchievement) {
          let shouldAward = false;

          if (conditions.ideas_submitted && userStats.ideas_submitted >= conditions.ideas_submitted) {
            shouldAward = true;
          }
          if (conditions.likes_given && userStats.likes_given >= conditions.likes_given) {
            shouldAward = true;
          }
          if (conditions.comments_made && userStats.comments_made >= conditions.comments_made) {
            shouldAward = true;
          }
          if (conditions.login_streak && userStats.login_streak >= conditions.login_streak) {
            shouldAward = true;
          }

          if (shouldAward) {
            const { error } = await supabase
              .from('user_achievements')
              .insert({
                user_id: user.id,
                achievement_id: achievement.id,
                progress: 100
              });

            if (!error) {
              // Update user XP
              await supabase
                .from('user_stats')
                .update({
                  total_xp: userStats.total_xp + achievement.points
                })
                .eq('user_id', user.id);
            }
          }
        }
      }
      
      await fetchUserAchievements();
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  useEffect(() => {
    fetchAchievements();
    if (user) {
      fetchUserAchievements();
    }
  }, [user]);

  return {
    achievements,
    userAchievements,
    loading,
    checkAndAwardAchievements,
    refreshAchievements: fetchUserAchievements,
  };
};

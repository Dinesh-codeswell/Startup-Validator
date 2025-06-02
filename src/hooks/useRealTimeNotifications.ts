
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useRealTimeNotifications = () => {
  const [newAchievement, setNewAchievement] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Subscribe to new achievements
    const achievementSubscription = supabase
      .channel('user_achievements')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_achievements',
          filter: `user_id=eq.${user.id}`
        },
        async (payload) => {
          // Fetch the achievement details
          const { data: achievement } = await supabase
            .from('achievements')
            .select('*')
            .eq('id', payload.new.achievement_id)
            .single();

          if (achievement) {
            setNewAchievement(achievement);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(achievementSubscription);
    };
  }, [user]);

  const clearAchievement = () => {
    setNewAchievement(null);
  };

  return {
    newAchievement,
    clearAchievement
  };
};

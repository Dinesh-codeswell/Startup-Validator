
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserStats {
  id: string;
  user_id: string;
  level: number;
  total_xp: number;
  ideas_submitted: number;
  comments_made: number;
  likes_given: number;
  likes_received: number;
  login_streak: number;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchStats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setStats(data);
      } else {
        // Create initial stats for new user
        const { data: newStats, error: insertError } = await supabase
          .from('user_stats')
          .insert({
            user_id: user.id,
            level: 1,
            total_xp: 0,
            ideas_submitted: 0,
            comments_made: 0,
            likes_given: 0,
            likes_received: 0,
            login_streak: 1
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setStats(newStats);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLoginStreak = async () => {
    if (!user || !stats) return;

    try {
      const today = new Date().toDateString();
      const lastLogin = new Date(stats.last_login).toDateString();
      
      if (today !== lastLogin) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const wasYesterday = yesterday.toDateString() === lastLogin;
        
        const newStreak = wasYesterday ? stats.login_streak + 1 : 1;
        
        const { error } = await supabase
          .from('user_stats')
          .update({
            login_streak: newStreak,
            last_login: new Date().toISOString(),
            total_xp: stats.total_xp + 10
          })
          .eq('user_id', user.id);

        if (error) throw error;
        await fetchStats();
      }
    } catch (error) {
      console.error('Error updating login streak:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    if (stats) {
      updateLoginStreak();
    }
  }, [stats]);

  return {
    stats,
    loading,
    refreshStats: fetchStats,
  };
};


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  requirements: any;
  rewards: any;
  start_date: string;
  end_date: string;
  max_participants?: number;
  current_participants: number;
  is_active: boolean;
  created_at: string;
}

export interface ChallengeParticipation {
  id: string;
  challenge_id: string;
  user_id: string;
  progress: any;
  completed: boolean;
  completion_date?: string;
  rank?: number;
  created_at: string;
}

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [participations, setParticipations] = useState<ChallengeParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .order('start_date', { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('challenge_participations')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setParticipations(data || []);
    } catch (error) {
      console.error('Error fetching participations:', error);
    }
  };

  const joinChallenge = async (challengeId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('challenge_participations')
        .insert({
          challenge_id: challengeId,
          user_id: user.id,
          progress: {}
        });

      if (error) throw error;

      // Update participant count manually for now
      const { data: challenge } = await supabase
        .from('challenges')
        .select('current_participants')
        .eq('id', challengeId)
        .single();

      if (challenge) {
        await supabase
          .from('challenges')
          .update({ current_participants: (challenge.current_participants || 0) + 1 })
          .eq('id', challengeId);
      }

      await fetchParticipations();
      await fetchChallenges();
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  const updateProgress = async (challengeId: string, progress: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('challenge_participations')
        .update({ progress })
        .eq('challenge_id', challengeId)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchParticipations();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  useEffect(() => {
    fetchChallenges();
    if (user) {
      fetchParticipations();
    }
  }, [user]);

  return {
    challenges,
    participations,
    loading,
    joinChallenge,
    updateProgress,
    refreshChallenges: fetchChallenges,
    refreshParticipations: fetchParticipations,
  };
};

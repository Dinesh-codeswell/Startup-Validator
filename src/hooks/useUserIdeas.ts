
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserIdea {
  id: string;
  title: string;
  description: string;
  target_audience: string | null;
  problem_solved: string | null;
  industry: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useUserIdeas = () => {
  const [ideas, setIdeas] = useState<UserIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchIdeas();
    } else {
      setIdeas([]);
      setLoading(false);
    }
  }, [user]);

  const fetchIdeas = async () => {
    if (!user) return;

    try {
      // Query the user_ideas table directly
      const { data, error } = await supabase
        .from('user_ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ideas:', error);
        setIdeas([]);
      } else {
        setIdeas(data || []);
      }
    } catch (err) {
      console.error('Error in fetchIdeas:', err);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  const createIdea = async (idea: Omit<UserIdea, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      // Insert directly into user_ideas table
      const { data, error } = await supabase
        .from('user_ideas')
        .insert({
          user_id: user.id,
          title: idea.title,
          description: idea.description,
          target_audience: idea.target_audience,
          problem_solved: idea.problem_solved,
          industry: idea.industry,
          status: idea.status
        })
        .select()
        .single();

      if (!error && data) {
        setIdeas(prev => [data, ...prev]);
      }

      return { data, error };
    } catch (err) {
      console.error('Error creating idea:', err);
      return { data: null, error: 'Failed to create idea' };
    }
  };

  return { ideas, loading, createIdea, refetch: fetchIdeas };
};

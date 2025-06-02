
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  trending_score: number;
  discussion_count: number;
  created_at: string;
  updated_at: string;
}

export interface TopicDiscussion {
  id: string;
  topic_id: string;
  user_id: string;
  content: string;
  likes_count: number;
  created_at: string;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export const useTrendingTopics = () => {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [discussions, setDiscussions] = useState<TopicDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTopics = async () => {
    try {
      const { data, error } = await supabase
        .from('trending_topics')
        .select('*')
        .order('trending_score', { ascending: false });

      if (error) throw error;
      setTopics(data || []);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDiscussions = async (topicId: string) => {
    try {
      const { data, error } = await supabase
        .from('topic_discussions')
        .select('*')
        .eq('topic_id', topicId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDiscussions(data || []);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  const addDiscussion = async (topicId: string, content: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('topic_discussions')
        .insert({
          topic_id: topicId,
          user_id: user.id,
          content
        });

      if (error) throw error;

      // Update discussion count manually for now
      const { data: topic } = await supabase
        .from('trending_topics')
        .select('discussion_count, trending_score')
        .eq('id', topicId)
        .single();

      if (topic) {
        await supabase
          .from('trending_topics')
          .update({ 
            discussion_count: (topic.discussion_count || 0) + 1,
            trending_score: (topic.trending_score || 0) + 1
          })
          .eq('id', topicId);
      }

      await fetchDiscussions(topicId);
    } catch (error) {
      console.error('Error adding discussion:', error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return {
    topics,
    discussions,
    loading,
    fetchDiscussions,
    addDiscussion,
    refreshTopics: fetchTopics,
  };
};

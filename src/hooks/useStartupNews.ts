
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface StartupNews {
  id: string;
  title: string;
  description: string;
  content?: string;
  source_url?: string;
  image_url?: string;
  author?: string;
  category: string;
  tags: string[];
  publish_date: string;
  views_count: number;
  featured: boolean;
  created_at: string;
}

export const useStartupNews = () => {
  const [news, setNews] = useState<StartupNews[]>([]);
  const [featuredNews, setFeaturedNews] = useState<StartupNews[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('startup_news')
        .select('*')
        .order('publish_date', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      setNews(data || []);
      setFeaturedNews((data || []).filter(item => item.featured));
    } catch (error) {
      console.error('Error fetching startup news:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async (newsId: string) => {
    try {
      // Update views count manually for now
      const { data: newsItem } = await supabase
        .from('startup_news')
        .select('views_count')
        .eq('id', newsId)
        .single();

      if (newsItem) {
        await supabase
          .from('startup_news')
          .update({ views_count: (newsItem.views_count || 0) + 1 })
          .eq('id', newsId);
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    featuredNews,
    loading,
    incrementViews,
    refreshNews: fetchNews,
  };
};

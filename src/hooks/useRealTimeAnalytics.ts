
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsData {
  page_views: number;
  ideas_created: number;
  time_spent: number;
  engagement_score: number;
  daily_stats: { date: string; value: number }[];
  popular_pages: { page: string; views: number }[];
}

export const useRealTimeAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    page_views: 0,
    ideas_created: 0,
    time_spent: 0,
    engagement_score: 0,
    daily_stats: [],
    popular_pages: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAnalytics();
      trackPageView();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    if (!user) return;

    try {
      // Fetch real analytics data
      const { data: engagementData } = await supabase
        .from('user_engagement')
        .select('*')
        .eq('user_id', user.id);

      const { data: analyticsData } = await supabase
        .from('real_time_analytics')
        .select('*')
        .eq('user_id', user.id);

      // Process and aggregate data
      const pageViews = analyticsData?.filter(a => a.action_type === 'page_view').length || 0;
      const ideasCreated = engagementData?.find(e => e.metric_type === 'idea_created')?.metric_value || 0;
      const timeSpent = engagementData?.find(e => e.metric_type === 'time_spent')?.metric_value || 0;

      // Calculate engagement score
      const engagementScore = Math.min(100, (pageViews * 2 + ideasCreated * 10 + timeSpent / 60));

      // Get daily stats
      const dailyStats = engagementData?.map(e => ({
        date: e.date || new Date().toISOString().split('T')[0],
        value: e.metric_value || 0
      })) || [];

      // Get popular pages
      const pageStats = analyticsData?.reduce((acc: any, curr) => {
        if (curr.action_type === 'page_view') {
          acc[curr.page_path] = (acc[curr.page_path] || 0) + 1;
        }
        return acc;
      }, {});

      const popularPages = Object.entries(pageStats || {})
        .map(([page, views]) => ({ page, views: views as number }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      setAnalytics({
        page_views: pageViews,
        ideas_created: ideasCreated,
        time_spent: timeSpent,
        engagement_score: engagementScore,
        daily_stats: dailyStats,
        popular_pages: popularPages
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackPageView = async (page?: string) => {
    if (!user) return;

    const currentPage = page || window.location.pathname;
    
    try {
      await supabase.from('real_time_analytics').insert({
        user_id: user.id,
        session_id: `session_${Date.now()}`,
        page_path: currentPage,
        action_type: 'page_view',
        metadata: { 
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent 
        }
      });

      // Update engagement metrics
      await supabase.from('user_engagement').upsert({
        user_id: user.id,
        metric_type: 'page_view',
        metric_value: 1,
        date: new Date().toISOString().split('T')[0]
      }, {
        onConflict: 'user_id,metric_type,date'
      });

    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const trackEvent = async (eventType: string, metadata?: any) => {
    if (!user) return;

    try {
      await supabase.from('real_time_analytics').insert({
        user_id: user.id,
        session_id: `session_${Date.now()}`,
        page_path: window.location.pathname,
        action_type: eventType,
        metadata: metadata || {}
      });

    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return { 
    analytics, 
    loading, 
    refetch: fetchAnalytics, 
    trackPageView, 
    trackEvent 
  };
};


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { DataLoader, SparkleLoader } from './LoadingAnimations';
import { 
  TrendingUp, 
  Lightbulb, 
  Target, 
  DollarSign, 
  Users, 
  Zap,
  RefreshCw,
  ExternalLink,
  Clock,
  BarChart3,
  Calendar,
  Building
} from 'lucide-react';

interface TrendingIdea {
  title: string;
  description: string;
  target_market: string;
  potential_challenges: string;
  estimated_market_size: string;
  category?: string;
}

interface NewsItem {
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
  url?: string;
}

const TrendingInsights = () => {
  const [trendingIdeas, setTrendingIdeas] = useState<TrendingIdea[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ideas' | 'news'>('ideas');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchTrendingIdeas = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('perplexity-ai', {
        body: { action: 'trending_ideas' }
      });

      if (error) throw error;
      
      if (data?.success && data?.content) {
        const parsedIdeas = parseIdeasFromResponse(data.content);
        setTrendingIdeas(parsedIdeas);
        setLastRefresh(new Date());
      }
    } catch (error) {
      console.error('Error fetching trending ideas:', error);
      setTrendingIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStartupNews = async () => {
    setNewsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('perplexity-ai', {
        body: { action: 'startup_news' }
      });

      if (error) throw error;
      
      if (data?.success && data?.content) {
        const parsedNews = parseNewsFromResponse(data.content);
        setNews(parsedNews);
        setLastRefresh(new Date());
      }
    } catch (error) {
      console.error('Error fetching startup news:', error);
      setNews([]);
    } finally {
      setNewsLoading(false);
    }
  };

  const parseIdeasFromResponse = (content: string): TrendingIdea[] => {
    try {
      // Try to parse as JSON first
      if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, 6).map(idea => ({
            title: idea.title || idea.name || 'Untitled Idea',
            description: idea.description || idea.summary || '',
            target_market: idea.target_market || idea.market || 'General market',
            potential_challenges: idea.challenges || idea.potential_challenges || 'Market competition',
            estimated_market_size: idea.market_size || idea.estimated_market_size || 'Unknown',
            category: idea.category || 'Technology'
          }));
        }
      }

      // Fallback to text parsing
      const lines = content.split('\n').filter(line => line.trim());
      const ideas: TrendingIdea[] = [];
      let currentIdea: Partial<TrendingIdea> = {};

      for (const line of lines) {
        const cleanLine = line.trim();
        
        if (cleanLine.match(/^\d+\.|^-|^\*/) || cleanLine.toLowerCase().includes('idea') && cleanLine.includes(':')) {
          // Save previous idea if complete
          if (currentIdea.title && currentIdea.description) {
            ideas.push(currentIdea as TrendingIdea);
          }
          
          // Start new idea
          currentIdea = {
            title: cleanLine.replace(/^\d+\.|^-|^\*/, '').replace(/^idea\s*\d*:?/i, '').trim(),
            description: '',
            target_market: 'General market',
            potential_challenges: 'Market competition',
            estimated_market_size: 'TBD'
          };
        } else if (cleanLine && currentIdea.title && !currentIdea.description) {
          currentIdea.description = cleanLine;
        } else if (cleanLine.toLowerCase().includes('market') && cleanLine.includes(':')) {
          currentIdea.target_market = cleanLine.split(':')[1]?.trim() || 'General market';
        } else if (cleanLine.toLowerCase().includes('challenge') && cleanLine.includes(':')) {
          currentIdea.potential_challenges = cleanLine.split(':')[1]?.trim() || 'Market competition';
        } else if (cleanLine.toLowerCase().includes('size') && cleanLine.includes(':')) {
          currentIdea.estimated_market_size = cleanLine.split(':')[1]?.trim() || 'TBD';
        }
      }

      // Add the last idea
      if (currentIdea.title && currentIdea.description) {
        ideas.push(currentIdea as TrendingIdea);
      }

      return ideas.slice(0, 6);
    } catch (error) {
      console.error('Error parsing ideas:', error);
      return [];
    }
  };

  const parseNewsFromResponse = (content: string): NewsItem[] => {
    try {
      // Try to parse as JSON first
      if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, 8).map(item => ({
            title: item.title || 'Untitled News',
            summary: item.summary || item.description || '',
            date: item.date || new Date().toISOString().split('T')[0],
            source: item.source || 'Unknown Source',
            category: item.category || 'General',
            url: item.url || item.link
          }));
        }
      }

      // Fallback to text parsing
      const lines = content.split('\n').filter(line => line.trim());
      const newsItems: NewsItem[] = [];
      let currentNews: Partial<NewsItem> = {};

      for (const line of lines) {
        const cleanLine = line.trim();
        
        if (cleanLine.match(/^\d+\.|^-|^\*/) || (cleanLine.includes(':') && cleanLine.length < 150)) {
          // Save previous news if complete
          if (currentNews.title && currentNews.summary) {
            newsItems.push({
              ...currentNews,
              date: currentNews.date || new Date().toISOString().split('T')[0],
              source: currentNews.source || 'Tech News',
              category: currentNews.category || 'Startup'
            } as NewsItem);
          }
          
          // Start new news item
          currentNews = {
            title: cleanLine.replace(/^\d+\.|^-|^\*/, '').split(':')[0].trim(),
            summary: '',
            date: new Date().toISOString().split('T')[0],
            source: 'Tech News',
            category: 'Startup'
          };
        } else if (cleanLine && currentNews.title && !currentNews.summary) {
          currentNews.summary = cleanLine;
        } else if (cleanLine.toLowerCase().includes('source:')) {
          currentNews.source = cleanLine.replace(/source:/i, '').trim();
        }
      }

      // Add the last news item
      if (currentNews.title && currentNews.summary) {
        newsItems.push({
          ...currentNews,
          date: currentNews.date || new Date().toISOString().split('T')[0],
          source: currentNews.source || 'Tech News',
          category: currentNews.category || 'Startup'
        } as NewsItem);
      }

      return newsItems.slice(0, 8);
    } catch (error) {
      console.error('Error parsing news:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchTrendingIdeas();
    fetchStartupNews();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Funding': 'bg-green-100 text-green-800 border-green-200',
      'Product Launch': 'bg-blue-100 text-blue-800 border-blue-200',
      'Acquisition': 'bg-purple-100 text-purple-800 border-purple-200',
      'Technology': 'bg-orange-100 text-orange-800 border-orange-200',
      'Startup': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'General': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors] || colors.General;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Market Insights</CardTitle>
                <p className="text-sm text-gray-600">
                  AI-powered trends • Last updated {lastRefresh.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'ideas' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('ideas')}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Trending Ideas
              </Button>
              <Button
                variant={activeTab === 'news' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('news')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Latest News
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {activeTab === 'ideas' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <SparkleLoader />
                  AI-Discovered Opportunities
                </h3>
                <Button variant="ghost" size="sm" onClick={fetchTrendingIdeas} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>

              {loading ? (
                <DataLoader message="Analyzing global market trends..." />
              ) : trendingIdeas.length === 0 ? (
                <Card className="border-dashed border-2 border-gray-200">
                  <CardContent className="p-8 text-center">
                    <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Trends Available</h3>
                    <p className="text-gray-500 mb-4">Unable to fetch trending ideas at the moment.</p>
                    <Button onClick={fetchTrendingIdeas} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {trendingIdeas.map((idea, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-indigo-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-lg text-gray-900">{idea.title}</h4>
                              {idea.category && (
                                <Badge variant="outline" className="text-xs">
                                  {idea.category}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">{idea.description}</p>
                          </div>
                          <div className="ml-4">
                            <Badge variant="secondary" className="text-green-700 bg-green-100 border-green-200">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {idea.estimated_market_size}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold text-blue-900 text-sm">Target Market</span>
                            </div>
                            <p className="text-blue-800 text-sm">{idea.target_market}</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-4 h-4 text-orange-600" />
                              <span className="font-semibold text-orange-900 text-sm">Key Challenge</span>
                            </div>
                            <p className="text-orange-800 text-sm">{idea.potential_challenges}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'news' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Real-time Startup News
                </h3>
                <Button variant="ghost" size="sm" onClick={fetchStartupNews} disabled={newsLoading}>
                  <RefreshCw className={`w-4 h-4 ${newsLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>

              {newsLoading ? (
                <DataLoader message="Fetching latest startup news..." />
              ) : news.length === 0 ? (
                <Card className="border-dashed border-2 border-gray-200">
                  <CardContent className="p-8 text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No News Available</h3>
                    <p className="text-gray-500 mb-4">Unable to fetch startup news at the moment.</p>
                    <Button onClick={fetchStartupNews} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {news.map((item, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2 leading-tight">{item.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.summary}</p>
                          </div>
                          <Badge className={`ml-3 ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              <span>{item.source}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          {item.url && (
                            <Button asChild size="sm" variant="ghost">
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Read More
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingInsights;

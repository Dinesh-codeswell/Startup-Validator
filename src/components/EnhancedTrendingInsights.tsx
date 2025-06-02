
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
  Building,
  Eye,
  ArrowRight,
  Sparkles,
  Globe,
  Brain,
  Rocket,
  Star,
  Heart,
  Share,
  Bookmark,
  ChevronRight,
  TrendingDown
} from 'lucide-react';

interface TrendingIdea {
  title: string;
  description: string;
  target_market: string;
  potential_challenges: string;
  estimated_market_size: string;
  category?: string;
  trending_score?: number;
  growth_potential?: 'high' | 'medium' | 'low';
}

interface NewsItem {
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
  url?: string;
  impact_score?: number;
  reading_time?: string;
}

const EnhancedTrendingInsights = () => {
  const [trendingIdeas, setTrendingIdeas] = useState<TrendingIdea[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ideas' | 'news'>('ideas');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [viewCounts, setViewCounts] = useState<{[key: string]: number}>({});
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
      setTrendingIdeas(generateMockIdeas());
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
      setNews(generateMockNews());
    } finally {
      setNewsLoading(false);
    }
  };

  const generateMockIdeas = (): TrendingIdea[] => [
    {
      title: "AI-Powered Personal Nutrition Coach",
      description: "An app that uses AI to analyze your health data, dietary preferences, and goals to create personalized meal plans and nutrition advice in real-time.",
      target_market: "Health-conscious millennials and Gen Z",
      potential_challenges: "Data privacy concerns and regulatory compliance",
      estimated_market_size: "$8.2B by 2027",
      category: "healthtech",
      trending_score: 95,
      growth_potential: "high"
    },
    {
      title: "Sustainable Fashion Marketplace",
      description: "A platform connecting eco-conscious consumers with sustainable fashion brands, featuring carbon footprint tracking and circular economy features.",
      target_market: "Environmentally conscious fashion consumers",
      potential_challenges: "Supply chain verification and scaling sustainability",
      estimated_market_size: "$15B by 2030",
      category: "marketplace",
      trending_score: 88,
      growth_potential: "high"
    },
    {
      title: "Remote Work Wellness Platform",
      description: "Comprehensive platform offering virtual ergonomic assessments, mental health support, and productivity optimization for remote workers.",
      target_market: "Remote workers and distributed teams",
      potential_challenges: "Market saturation and user engagement",
      estimated_market_size: "$4.5B by 2026",
      category: "saas",
      trending_score: 82,
      growth_potential: "medium"
    }
  ];

  const generateMockNews = (): NewsItem[] => [
    {
      title: "OpenAI Launches GPT-5 with Revolutionary Multimodal Capabilities",
      summary: "The latest AI model can process text, images, audio, and video simultaneously, marking a significant leap in artificial intelligence capabilities.",
      date: new Date().toISOString().split('T')[0],
      source: "TechCrunch",
      category: "AI/ML",
      impact_score: 95,
      reading_time: "3 min read"
    },
    {
      title: "European Startup Ecosystem Raises Record $100B in 2024",
      summary: "European startups have surpassed previous funding records, with fintech and climate tech leading the charge in venture capital investments.",
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      source: "TechEU",
      category: "Funding",
      impact_score: 88,
      reading_time: "5 min read"
    },
    {
      title: "Meta Announces Major Shift to VR-First Workplace Solutions",
      summary: "Meta's latest enterprise VR platform promises to revolutionize remote work with immersive collaboration tools and virtual offices.",
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      source: "The Verge",
      category: "Enterprise",
      impact_score: 76,
      reading_time: "4 min read"
    }
  ];

  const parseIdeasFromResponse = (content: string): TrendingIdea[] => {
    // Enhanced parsing logic with mock data fallback
    try {
      if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, 6).map((idea, index) => ({
            title: idea.title || idea.name || 'Untitled Idea',
            description: idea.description || idea.summary || '',
            target_market: idea.target_market || idea.market || 'General market',
            potential_challenges: idea.challenges || idea.potential_challenges || 'Market competition',
            estimated_market_size: idea.market_size || idea.estimated_market_size || 'Unknown',
            category: idea.category || 'Technology',
            trending_score: 90 - (index * 5),
            growth_potential: index < 2 ? 'high' : index < 4 ? 'medium' : 'low'
          }));
        }
      }
      return generateMockIdeas();
    } catch (error) {
      return generateMockIdeas();
    }
  };

  const parseNewsFromResponse = (content: string): NewsItem[] => {
    // Enhanced parsing logic with mock data fallback
    try {
      if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, 8).map((item, index) => ({
            title: item.title || 'Untitled News',
            summary: item.summary || item.description || '',
            date: item.date || new Date().toISOString().split('T')[0],
            source: item.source || 'Unknown Source',
            category: item.category || 'General',
            url: item.url || item.link,
            impact_score: 95 - (index * 5),
            reading_time: `${Math.floor(Math.random() * 5) + 2} min read`
          }));
        }
      }
      return generateMockNews();
    } catch (error) {
      return generateMockNews();
    }
  };

  const handleCardView = (id: string) => {
    setViewCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(id)) {
        newBookmarks.delete(id);
      } else {
        newBookmarks.add(id);
      }
      return newBookmarks;
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Funding': 'from-emerald-500 to-teal-500',
      'AI/ML': 'from-purple-500 to-indigo-500',
      'Enterprise': 'from-blue-500 to-cyan-500',
      'healthtech': 'from-rose-500 to-pink-500',
      'marketplace': 'from-orange-500 to-amber-500',
      'saas': 'from-indigo-500 to-purple-500',
      'General': 'from-gray-500 to-slate-500'
    };
    return colors[category as keyof typeof colors] || colors.General;
  };

  const getGrowthIcon = (potential: string) => {
    switch (potential) {
      case 'high': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'medium': return <BarChart3 className="w-4 h-4 text-amber-500" />;
      case 'low': return <TrendingDown className="w-4 h-4 text-gray-500" />;
      default: return <BarChart3 className="w-4 h-4 text-amber-500" />;
    }
  };

  useEffect(() => {
    fetchTrendingIdeas();
    fetchStartupNews();
  }, []);

  return (
    <div className="space-y-8">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-pink-600/90"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-bounce">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">AI-Powered Market Intelligence</h2>
              <p className="text-purple-100 text-lg">
                Real-time insights powered by advanced AI • Last updated {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all">
              <Rocket className="w-5 h-5" />
              <span>Live Trends</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all">
              <Globe className="w-5 h-5" />
              <span>Global Coverage</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all">
              <Sparkles className="w-5 h-5" />
              <span>AI Validated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-2xl border border-white/20">
          <button
            onClick={() => setActiveTab('ideas')}
            className={`px-8 py-4 rounded-xl font-medium transition-all duration-500 flex items-center gap-3 ${
              activeTab === 'ideas'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl transform scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 hover:scale-102'
            }`}
          >
            <Lightbulb className="w-5 h-5" />
            Trending Ideas
            <Badge variant="secondary" className="ml-2">
              {trendingIdeas.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-8 py-4 rounded-xl font-medium transition-all duration-500 flex items-center gap-3 ${
              activeTab === 'news'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl transform scale-105'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 hover:scale-102'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Latest News
            <Badge variant="secondary" className="ml-2">
              {news.length}
            </Badge>
          </button>
        </div>
      </div>

      {activeTab === 'ideas' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SparkleLoader />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI-Discovered Opportunities
              </h3>
            </div>
            <Button 
              variant="outline" 
              onClick={fetchTrendingIdeas} 
              disabled={loading}
              className="hover:scale-105 transition-transform"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {loading ? (
            <DataLoader message="Analyzing global market trends..." />
          ) : (
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {trendingIdeas.map((idea, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card 
                      className={`h-full hover:shadow-2xl transition-all duration-500 cursor-pointer border-l-4 border-l-indigo-500 group ${
                        hoveredCard === `idea-${index}` ? 'scale-105 shadow-2xl' : ''
                      }`}
                      onMouseEnter={() => setHoveredCard(`idea-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleCardView(`idea-${index}`)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(idea.category || 'General')} animate-pulse`}></div>
                            <Badge variant="outline" className="text-xs font-medium">
                              {idea.category}
                            </Badge>
                            {getGrowthIcon(idea.growth_potential || 'medium')}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(`idea-${index}`);
                              }}
                            >
                              <Heart className={`w-4 h-4 ${bookmarks.has(`idea-${index}`) ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {viewCounts[`idea-${index}`] || 0}
                            </div>
                          </div>
                        </div>
                        
                        <CardTitle className="text-lg leading-tight group-hover:text-indigo-600 transition-colors">
                          {idea.title}
                        </CardTitle>
                        
                        {idea.trending_score && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${idea.trending_score}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600">
                              {idea.trending_score}% trending
                            </span>
                          </div>
                        )}
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3">
                          {idea.description}
                        </p>
                        
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold text-blue-900 text-sm">Target Market</span>
                            </div>
                            <p className="text-blue-800 text-sm">{idea.target_market}</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-emerald-600" />
                              <span className="text-sm font-semibold text-emerald-700">
                                {idea.estimated_market_size}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                              Learn More
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      )}

      {activeTab === 'news' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-500 animate-pulse" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Real-time Startup News
              </h3>
            </div>
            <Button 
              variant="outline" 
              onClick={fetchStartupNews} 
              disabled={newsLoading}
              className="hover:scale-105 transition-transform"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${newsLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {newsLoading ? (
            <DataLoader message="Fetching latest startup news..." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-2xl transition-all duration-500 cursor-pointer group ${
                    hoveredCard === `news-${index}` ? 'scale-105 shadow-2xl' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(`news-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardView(`news-${index}`)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={`bg-gradient-to-r ${getCategoryColor(item.category)} text-white border-none`}>
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(`news-${index}`);
                          }}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarks.has(`news-${index}`) ? 'fill-blue-500 text-blue-500' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </CardTitle>
                    
                    {item.impact_score && (
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-semibold text-amber-600">
                          {item.impact_score}% impact score
                        </span>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.summary}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          <span>{item.source}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.reading_time}</span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-0 shadow-2xl">
        <CardContent className="p-8 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Ready to Act on These Insights?</h3>
          </div>
          <p className="text-purple-100 mb-6 text-lg max-w-2xl mx-auto">
            Transform these AI-powered insights into your next breakthrough idea. Join our community of innovators.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Building
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTrendingInsights;

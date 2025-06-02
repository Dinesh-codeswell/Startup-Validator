
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStartupNews } from '@/hooks/useStartupNews';
import { useBookmarks } from '@/hooks/useBookmarks';
import { TrendingUp, ExternalLink, Newspaper, Globe, Clock, Eye, Bookmark, BookmarkCheck } from "lucide-react";

const NewsCard = ({ news, onViewMore, onBookmark, isBookmarked }: { 
  news: any; 
  onViewMore: (id: string) => void; 
  onBookmark: (id: string) => void;
  isBookmarked: boolean;
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {news.category}
              </Badge>
              {news.featured && (
                <Badge className="text-xs bg-gradient-to-r from-orange-500 to-red-500">
                  Featured
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
              {news.title}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBookmark(news.id)}
            className="shrink-0"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-blue-500" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {news.image_url && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={news.image_url} 
              alt={news.title}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {news.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {news.tags?.slice(0, 3).map((tag: string, index: number) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(news.publish_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{news.views_count} views</span>
            </div>
          </div>
          {news.author && (
            <span>by {news.author}</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewMore(news.id)}
            className="flex-1"
          >
            Read More
          </Button>
          {news.source_url && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open(news.source_url, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const StartupNews = () => {
  const { news, featuredNews, loading, incrementViews } = useStartupNews();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const handleViewMore = (newsId: string) => {
    incrementViews(newsId);
  };

  const handleBookmark = (newsId: string) => {
    if (isBookmarked('news', newsId)) {
      removeBookmark('news', newsId);
    } else {
      addBookmark('news', newsId);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Latest Startup News
          </h2>
        </div>
        <Badge 
          variant="outline" 
          className="bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border-orange-200 animate-pulse"
        >
          Live Updates
        </Badge>
      </div>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-orange-500" />
            Featured Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredNews.slice(0, 2).map((newsItem) => (
              <NewsCard
                key={newsItem.id}
                news={newsItem}
                onViewMore={handleViewMore}
                onBookmark={handleBookmark}
                isBookmarked={isBookmarked('news', newsItem.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All News */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          Recent News
        </h3>
        
        {news.length === 0 ? (
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Stay Informed</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Get the latest startup news, funding announcements, and industry insights. We'll integrate with live news feeds to keep you updated.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Global coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Real-time updates</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((newsItem) => (
              <NewsCard
                key={newsItem.id}
                news={newsItem}
                onViewMore={handleViewMore}
                onBookmark={handleBookmark}
                isBookmarked={isBookmarked('news', newsItem.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupNews;

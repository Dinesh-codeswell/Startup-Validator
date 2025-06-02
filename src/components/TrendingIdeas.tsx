
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTrendingTopics } from '@/hooks/useTrendingTopics';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, 
  MessageCircle, 
  ThumbsUp, 
  Bookmark, 
  BookmarkCheck,
  Send,
  Users,
  Flame,
  Star
} from "lucide-react";

const TopicCard = ({ topic, onDiscuss, onBookmark, isBookmarked }: {
  topic: any;
  onDiscuss: (topicId: string) => void;
  onBookmark: (topicId: string) => void;
  isBookmarked: boolean;
}) => {
  const getTrendingColor = (score: number) => {
    if (score >= 90) return 'text-red-500';
    if (score >= 70) return 'text-orange-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getTrendingIcon = (score: number) => {
    if (score >= 90) return <Flame className="w-4 h-4" />;
    if (score >= 70) return <TrendingUp className="w-4 h-4" />;
    if (score >= 50) return <Star className="w-4 h-4" />;
    return <TrendingUp className="w-4 h-4" />;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {topic.category}
              </Badge>
              <div className={`flex items-center gap-1 text-xs font-medium ${getTrendingColor(topic.trending_score)}`}>
                {getTrendingIcon(topic.trending_score)}
                <span>{topic.trending_score}</span>
              </div>
            </div>
            <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
              {topic.title}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBookmark(topic.id)}
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
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {topic.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              <span>{topic.discussion_count} discussions</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Active community</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onDiscuss(topic.id)}
          className="w-full"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Join Discussion
        </Button>
      </CardContent>
    </Card>
  );
};

const DiscussionModal = ({ topic, discussions, onClose, onAddDiscussion }: {
  topic: any;
  discussions: any[];
  onClose: () => void;
  onAddDiscussion: (content: string) => void;
}) => {
  const [newDiscussion, setNewDiscussion] = useState('');
  const { user } = useAuth();

  const handleSubmit = () => {
    if (newDiscussion.trim() && user) {
      onAddDiscussion(newDiscussion);
      setNewDiscussion('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{topic.title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
          <p className="text-gray-600 text-sm">{topic.description}</p>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto p-6 space-y-4">
            {discussions.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Be the first to start the discussion!</p>
              </div>
            ) : (
              discussions.map((discussion) => (
                <div key={discussion.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {discussion.profiles?.full_name?.[0] || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {discussion.profiles?.full_name || 'Anonymous User'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(discussion.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{discussion.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {discussion.likes_count}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {user && (
            <div className="border-t p-6">
              <div className="flex gap-3">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newDiscussion}
                  onChange={(e) => setNewDiscussion(e.target.value)}
                  className="flex-1 min-h-[60px] resize-none"
                />
                <Button onClick={handleSubmit} disabled={!newDiscussion.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const TrendingIdeas = () => {
  const { topics, discussions, loading, fetchDiscussions, addDiscussion } = useTrendingTopics();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const { user } = useAuth();

  const handleDiscuss = async (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      setSelectedTopic(topic);
      await fetchDiscussions(topicId);
    }
  };

  const handleBookmark = (topicId: string) => {
    if (isBookmarked('topic', topicId)) {
      removeBookmark('topic', topicId);
    } else {
      addBookmark('topic', topicId);
    }
  };

  const handleAddDiscussion = async (content: string) => {
    if (selectedTopic) {
      await addDiscussion(selectedTopic.id, content);
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
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Trending Discussions
          </h2>
        </div>
        <Badge 
          variant="outline" 
          className="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-200"
        >
          Hot Topics
        </Badge>
      </div>

      {topics.length === 0 ? (
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200/50 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Join the Conversation</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Discover trending topics in the startup ecosystem and engage with fellow entrepreneurs and innovators.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onDiscuss={handleDiscuss}
              onBookmark={handleBookmark}
              isBookmarked={isBookmarked('topic', topic.id)}
            />
          ))}
        </div>
      )}

      {selectedTopic && (
        <DiscussionModal
          topic={selectedTopic}
          discussions={discussions}
          onClose={() => setSelectedTopic(null)}
          onAddDiscussion={handleAddDiscussion}
        />
      )}
    </div>
  );
};

export default TrendingIdeas;

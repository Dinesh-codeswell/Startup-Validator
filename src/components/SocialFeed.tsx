
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Send, 
  Image as ImageIcon,
  Link2,
  Megaphone,
  Users,
  TrendingUp
} from "lucide-react";

const SocialFeed = () => {
  const { posts, loading, createPost, likePost, unlikePost, addComment } = usePosts();
  const { user } = useAuth();
  const { toast } = useToast();
  const [newPostContent, setNewPostContent] = useState('');
  const [postType, setPostType] = useState<'text' | 'image' | 'link' | 'announcement'>('text');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    try {
      await createPost({
        content: newPostContent,
        post_type: postType,
        link_url: linkUrl || undefined,
        link_title: linkTitle || undefined,
        image_url: imageUrl || undefined,
      });

      setNewPostContent('');
      setLinkUrl('');
      setLinkTitle('');
      setImageUrl('');
      setPostType('text');

      toast({
        title: "Post created!",
        description: "Your post has been published successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLike = async (postId: string, isLiked: boolean) => {
    if (isLiked) {
      await unlikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  const handleComment = async (postId: string) => {
    const content = commentInputs[postId]?.trim();
    if (!content) return;

    await addComment(postId, content);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleShare = (postId: string) => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Post link has been copied to clipboard.",
    });
  };

  const isUserLiked = (post: any) => {
    return post.post_likes.some((like: any) => like.user_id === user?.id);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Community Feed
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <TrendingUp className="w-4 h-4" />
          <span>Real-time updates</span>
        </div>
      </div>

      {user && (
        <Card className="bg-white shadow-sm border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  {user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts with the community..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={postType === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPostType('text')}
                >
                  Text
                </Button>
                <Button
                  variant={postType === 'image' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPostType('image')}
                >
                  <ImageIcon className="w-4 h-4 mr-1" />
                  Image
                </Button>
                <Button
                  variant={postType === 'link' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPostType('link')}
                >
                  <Link2 className="w-4 h-4 mr-1" />
                  Link
                </Button>
                <Button
                  variant={postType === 'announcement' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPostType('announcement')}
                >
                  <Megaphone className="w-4 h-4 mr-1" />
                  Announcement
                </Button>
              </div>
              <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Post
              </Button>
            </div>

            {postType === 'link' && (
              <div className="mt-3 space-y-2">
                <Input
                  placeholder="Link URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
                <Input
                  placeholder="Link title (optional)"
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                />
              </div>
            )}

            {postType === 'image' && (
              <div className="mt-3">
                <Input
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200/50 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Start the Conversation</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Be the first to share your thoughts, insights, or announcements with the community!
              </p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="bg-white shadow-sm border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={post.profiles?.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback>
                      {post.profiles?.full_name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {post.profiles?.full_name || 'Anonymous User'}
                      </h4>
                      {post.post_type !== 'text' && (
                        <Badge variant="secondary" className="text-xs">
                          {post.post_type}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()} at{' '}
                      {new Date(post.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
                  
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt="Post image"
                      className="mt-3 rounded-lg max-w-full h-auto"
                    />
                  )}

                  {post.link_url && (
                    <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2 text-blue-600">
                        <Link2 className="w-4 h-4" />
                        <a
                          href={post.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {post.link_title || post.link_url}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id, isUserLiked(post))}
                      className={`flex items-center gap-2 ${
                        isUserLiked(post) ? 'text-red-500' : 'text-gray-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isUserLiked(post) ? 'fill-current' : ''}`} />
                      {post.post_likes.length}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      {post.post_comments.length}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(post.id)}
                      className="flex items-center gap-2 text-gray-500"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {post.post_comments.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {post.post_comments.slice(0, 3).map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={comment.profiles?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {comment.profiles?.full_name?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {comment.profiles?.full_name || 'Anonymous User'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {user && (
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xs">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Write a comment..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleComment(post.id);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleComment(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SocialFeed;

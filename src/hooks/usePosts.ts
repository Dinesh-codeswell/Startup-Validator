
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  link_url?: string;
  link_title?: string;
  link_description?: string;
  post_type: 'text' | 'image' | 'link' | 'announcement';
  is_public: boolean;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  post_likes: { id: string; user_id: string }[];
  post_comments: {
    id: string;
    content: string;
    user_id: string;
    created_at: string;
    profiles: {
      full_name: string | null;
      avatar_url: string | null;
    } | null;
  }[];
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          post_likes(id, user_id),
          post_comments(
            id,
            content,
            user_id,
            created_at
          )
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Fetch profiles separately to avoid relation issues
      const userIds = [...new Set(data?.map(post => post.user_id) || [])];
      const commentUserIds = [...new Set(
        data?.flatMap(post => 
          post.post_comments?.map((comment: any) => comment.user_id) || []
        ) || []
      )];
      const allUserIds = [...new Set([...userIds, ...commentUserIds])];

      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', allUserIds);

      const profilesMap = new Map(
        profilesData?.map(profile => [profile.id, profile]) || []
      );

      // Transform the data to match our Post interface
      const transformedData = (data || []).map(post => ({
        ...post,
        post_type: post.post_type as 'text' | 'image' | 'link' | 'announcement',
        profiles: profilesMap.get(post.user_id) || { full_name: null, avatar_url: null },
        post_comments: (post.post_comments || []).map((comment: any) => ({
          ...comment,
          profiles: profilesMap.get(comment.user_id) || { full_name: null, avatar_url: null }
        }))
      }));
      
      setPosts(transformedData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: {
    content: string;
    post_type?: string;
    image_url?: string;
    link_url?: string;
    link_title?: string;
    link_description?: string;
  }) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            ...postData,
            user_id: user.id,
          }
        ])
        .select();

      if (error) throw error;
      await fetchPosts();
      return data[0];
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  const likePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('post_likes')
        .insert([
          {
            post_id: postId,
            user_id: user.id,
          }
        ]);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const unlikePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const addComment = async (postId: string, content: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('post_comments')
        .insert([
          {
            post_id: postId,
            user_id: user.id,
            content,
          }
        ]);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    likePost,
    unlikePost,
    addComment,
    refreshPosts: fetchPosts,
  };
};

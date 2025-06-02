
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Bookmark {
  id: string;
  user_id: string;
  content_type: string;
  content_id: string;
  created_at: string;
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (contentType: string, contentId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_bookmarks')
        .insert({
          user_id: user.id,
          content_type: contentType,
          content_id: contentId
        });

      if (error) throw error;
      await fetchBookmarks();
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  const removeBookmark = async (contentType: string, contentId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('content_type', contentType)
        .eq('content_id', contentId);

      if (error) throw error;
      await fetchBookmarks();
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const isBookmarked = (contentType: string, contentId: string) => {
    return bookmarks.some(
      bookmark => bookmark.content_type === contentType && bookmark.content_id === contentId
    );
  };

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user]);

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    isBookmarked,
    refreshBookmarks: fetchBookmarks,
  };
};

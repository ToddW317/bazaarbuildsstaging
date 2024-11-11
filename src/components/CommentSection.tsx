'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Comment } from '@/types/types';
import { subscribeToComments, addComment, deleteComment } from '@/lib/commentService';
import CommentItem from './CommentItem';

interface CommentSectionProps {
  buildId: string;
}

export default function CommentSection({ buildId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToComments(buildId, (updatedComments) => {
      setComments(updatedComments);
    });

    return () => unsubscribe();
  }, [buildId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      await addComment(buildId, user.uid, newComment.trim(), replyTo);
      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
  };

  const handleDelete = async (commentId: string) => {
    if (!user) return;
    try {
      await deleteComment(buildId, commentId, user.uid);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      
      {user && (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            rows={3}
          />
          <div className="flex justify-between items-center mt-2">
            {replyTo && (
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="text-gray-400 hover:text-gray-300"
              >
                Cancel Reply
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              disabled={!newComment.trim()}
            >
              {replyTo ? 'Reply' : 'Comment'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onDelete={handleDelete}
            currentUserId={user?.uid}
          />
        ))}
      </div>
    </div>
  );
}

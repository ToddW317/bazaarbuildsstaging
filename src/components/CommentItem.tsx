'use client';

import { Comment } from '@/types/types';
import { formatDistanceToNow } from 'date-fns';

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  currentUserId?: string;
  level?: number;
}

export default function CommentItem({ 
  comment, 
  onReply, 
  onDelete, 
  currentUserId,
  level = 0 
}: CommentItemProps) {
  const marginLeft = level * 2; // Increase indentation for nested replies

  return (
    <div className={`pl-${marginLeft}`}>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-300">{comment.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
            </div>
          </div>
          <div className="flex space-x-2">
            {currentUserId && (
              <button
                onClick={() => onReply(comment.id)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Reply
              </button>
            )}
            {currentUserId === comment.userId && (
              <button
                onClick={() => onDelete(comment.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Render replies */}
      {comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onDelete={onDelete}
              currentUserId={currentUserId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

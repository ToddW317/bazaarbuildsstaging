import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  doc,
  deleteDoc,
  getDoc,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion
} from 'firebase/firestore';
import { Comment } from '@/types/types';

export async function addComment(
  buildId: string, 
  userId: string,
  userName: string,
  content: string, 
  parentId?: string
) {
  try {
    const buildRef = doc(db, 'builds', buildId);
    const buildDoc = await getDoc(buildRef);
    
    if (!buildDoc.exists()) {
      throw new Error('Build not found');
    }

    const commentsRef = collection(buildRef, 'comments');
    await addDoc(commentsRef, {
      userId,
      userName,
      content,
      createdAt: serverTimestamp(),
      parentId: parentId || null,
      likes: 0,
      likedBy: [],
      replies: []
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export function subscribeToComments(buildId: string, callback: (comments: Comment[]) => void) {
  try {
    const buildRef = doc(db, 'builds', buildId);
    const commentsRef = collection(buildRef, 'comments');
    const commentsQuery = query(
      commentsRef,
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(commentsQuery, (snapshot) => {
      const comments = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId || '',
          userName: data.userName || 'Anonymous',
          content: data.content || '',
          createdAt: data.createdAt?.toDate() || new Date(),
          parentId: data.parentId || null,
          likes: data.likes || 0,
          likedBy: Array.isArray(data.likedBy) ? data.likedBy : [],
          replies: []
        };
      }) as Comment[];

      callback(comments);
    });
  } catch (error) {
    console.error('Error in comment subscription:', error);
    throw error;
  }
}

export async function toggleCommentLike(buildId: string, commentId: string, userId: string): Promise<boolean> {
  const buildRef = doc(db, 'builds', buildId);
  const commentRef = doc(collection(buildRef, 'comments'), commentId);

  try {
    const commentDoc = await getDoc(commentRef);
    if (!commentDoc.exists()) {
      throw new Error('Comment not found');
    }

    const commentData = commentDoc.data();
    const likedBy = commentData.likedBy || [];
    const isLiked = likedBy.includes(userId);

    await updateDoc(commentRef, {
      likes: Math.max(0, (commentData.likes || 0) + (isLiked ? -1 : 1)),
      likedBy: isLiked 
        ? arrayRemove(userId)
        : arrayUnion(userId)
    });

    return !isLiked;
  } catch (error) {
    console.error('Error toggling comment like:', error);
    throw error;
  }
}

export async function deleteComment(buildId: string, commentId: string, userId: string) {
  try {
    const buildRef = doc(db, 'builds', buildId);
    const commentsRef = collection(buildRef, 'comments');
    
    const commentDoc = await getDoc(doc(commentsRef, commentId));
    if (!commentDoc.exists()) {
      throw new Error('Comment not found');
    }

    if (commentDoc.data().userId !== userId) {
      throw new Error('Unauthorized to delete this comment');
    }

    const batch = db.batch();
    
    batch.delete(doc(commentsRef, commentId));

    const repliesQuery = query(commentsRef, where('parentId', '==', commentId));
    const repliesSnapshot = await getDocs(repliesQuery);
    repliesSnapshot.forEach(replyDoc => {
      batch.delete(replyDoc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
} 
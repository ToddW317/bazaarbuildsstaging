import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { Rating } from '@/types/types';

export async function rateBuild(buildId: string, userId: string, score: number) {
  try {
    const ratingRef = doc(db, 'ratings', `${buildId}_${userId}`);
    const buildRef = doc(db, 'builds', buildId);

    // Save the rating
    await setDoc(ratingRef, {
      userId,
      buildId,
      score,
      createdAt: new Date()
    });

    // Update build's rating
    const buildDoc = await getDoc(buildRef);
    const buildData = buildDoc.data();
    
    const oldRating = buildData?.rating || { total: 0, count: 0, average: 0 };
    const newRating = {
      total: oldRating.total + score,
      count: oldRating.count + 1,
      average: (oldRating.total + score) / (oldRating.count + 1)
    };

    await updateDoc(buildRef, {
      rating: newRating
    });

    return newRating;
  } catch (error) {
    console.error('Error rating build:', error);
    throw error;
  }
}

export async function getUserRating(buildId: string, userId: string): Promise<Rating | null> {
  try {
    const ratingRef = doc(db, 'ratings', `${buildId}_${userId}`);
    const ratingDoc = await getDoc(ratingRef);
    
    if (!ratingDoc.exists()) return null;
    
    return {
      ...ratingDoc.data(),
      createdAt: ratingDoc.data().createdAt.toDate()
    } as Rating;
  } catch (error) {
    console.error('Error getting user rating:', error);
    return null;
  }
} 
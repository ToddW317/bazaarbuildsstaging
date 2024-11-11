import { db } from './firebase';
import { 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  increment,
  getDoc,
  setDoc
} from 'firebase/firestore';

export async function toggleLike(buildId: string, userId: string): Promise<boolean> {
  try {
    const buildRef = doc(db, 'builds', buildId);
    const userRef = doc(db, 'users', userId);
    
    // Get current build data
    const buildSnap = await getDoc(buildRef);
    const userSnap = await getDoc(userRef);
    
    if (!buildSnap.exists()) {
      throw new Error('Build not found');
    }

    const buildData = buildSnap.data();
    const isLiked = buildData.likedBy?.includes(userId);

    // Create user document if it doesn't exist
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        likedBuilds: [],
        createdAt: new Date(),
      });
    }

    if (isLiked) {
      // Unlike
      await updateDoc(buildRef, {
        likes: increment(-1),
        likedBy: arrayRemove(userId)
      });
      await updateDoc(userRef, {
        likedBuilds: arrayRemove(buildId)
      });
      return false;
    } else {
      // Like
      await updateDoc(buildRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId)
      });
      await updateDoc(userRef, {
        likedBuilds: arrayUnion(buildId)
      });
      return true;
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
}

export async function getLikedBuilds(userId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return [];
    }

    const userData = userSnap.data();
    return userData.likedBuilds || [];
  } catch (error) {
    console.error('Error getting liked builds:', error);
    throw error;
  }
} 
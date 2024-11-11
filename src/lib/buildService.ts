import { db, storage } from './firebase';
import { trackEvent } from './analytics';
import { 
  collection, 
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
  doc,
  getDoc,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  setDoc,
  limit
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { Build, BuildType, BuildFormData } from '@/types/types';
import { createNotification } from './notificationService';

export async function createBuild(
  buildData: BuildFormData,
  files: {
    screenshots: File[];
    videoClip: File | null;
  },
  userId: string,
  creatorName: string
): Promise<string> {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to create a build');
    }

    // Upload screenshots
    const screenshotUrls = await Promise.all(
      files.screenshots.map((file, index) => 
        uploadFile(file, `builds/${userId}/${Date.now()}-screenshot-${index}`)
      )
    );

    // Upload video if exists
    let videoUrl = null;
    if (files.videoClip) {
      videoUrl = await uploadFile(
        files.videoClip,
        `builds/${userId}/${Date.now()}-video`
      );
    }

    // Create build document with explicit userId
    const buildRef = await addDoc(collection(db, 'builds'), {
      ...buildData,
      screenshots: screenshotUrls,
      videoClip: videoUrl,
      userId, // Ensure userId is included
      creatorName, // Add creator name to the document
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likes: 0,
      likedBy: [], // Initialize empty likedBy array
      rating: {
        average: 0,
        count: 0,
        total: 0
      }
    });

    trackEvent('build_created', {
      build_id: buildRef.id,
      hero_id: buildData.heroId,
      build_type: buildData.buildType,
      user_id: userId, // Track user ID for analytics
    });

    return buildRef.id;
  } catch (error) {
    console.error('Error creating build:', error);
    throw error;
  }
}

export async function getBuilds(limitCount: number = 50): Promise<Build[]> {
  try {
    console.log('Fetching builds...')
    
    const buildsRef = collection(db, 'builds')
    const q = query(
      buildsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )

    const querySnapshot = await getDocs(q)
    console.log(`Found ${querySnapshot.size} builds`)

    if (querySnapshot.empty) {
      console.log('No builds found in Firestore')
      return []
    }

    const builds = querySnapshot.docs.map(doc => {
      const data = doc.data()
      // Convert Firestore Timestamp to Date
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Build
    })

    console.log('Successfully processed builds:', builds.length)
    return builds

  } catch (error) {
    console.error('Error fetching builds:', error)
    throw error
  }
}

export async function getBuildById(id: string): Promise<Build | null> {
  try {
    const buildRef = doc(db, 'builds', id);
    const buildSnap = await getDoc(buildRef);

    if (!buildSnap.exists()) {
      return null;
    }

    const data = buildSnap.data();
    return {
      id: buildSnap.id,
      ...data,
      createdAt: (data.createdAt as Timestamp).toDate(),
      updatedAt: (data.updatedAt as Timestamp).toDate(),
    } as Build;
  } catch (error) {
    console.error('Error fetching build:', error);
    return null;
  }
}

// Helper function for file uploads
async function uploadFile(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// Add a function to get builds by user ID
export async function getBuildsByUserId(userId: string): Promise<Build[]> {
  try {
    const buildsQuery = query(
      collection(db, 'builds'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(buildsQuery);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate(),
    } as Build));
  } catch (error) {
    console.error('Error fetching user builds:', error);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  const buildsQuery = query(collection(db, 'builds'));
  const snapshot = await getDocs(buildsQuery);
  
  const tagsSet = new Set<string>();
  snapshot.docs.forEach(doc => {
    const build = doc.data();
    build.tags?.forEach((tag: string) => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet);
}

export async function getPopularTags(limit: number = 10): Promise<{ tag: string; count: number }[]> {
  const builds = await getBuilds();
  const tagCounts: Record<string, number> = {};
  
  builds.forEach(build => {
    build.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function toggleBuildLike(buildId: string, userId: string): Promise<boolean> {
  const buildRef = doc(db, 'builds', buildId);

  try {
    const buildDoc = await getDoc(buildRef);
    if (!buildDoc.exists()) {
      throw new Error('Build not found');
    }

    const buildData = buildDoc.data();
    const likedBy = buildData.likedBy || [];
    const isLiked = likedBy.includes(userId);

    await updateDoc(buildRef, {
      likes: Math.max(0, (buildData.likes || 0) + (isLiked ? -1 : 1)),
      likedBy: isLiked 
        ? arrayRemove(userId)
        : arrayUnion(userId)
    });

    return !isLiked;
  } catch (error) {
    console.error('Error toggling build like:', error);
    throw error;
  }
}

export async function updateBuildRating(buildId: string, userId: string, score: number) {
  const buildRef = doc(db, 'builds', buildId)
  const ratingRef = doc(db, 'ratings', `${buildId}_${userId}`)

  try {
    const buildSnap = await getDoc(buildRef)
    if (!buildSnap.exists()) {
      throw new Error('Build not found')
    }

    const buildData = buildSnap.data()
    const currentRating = buildData.rating || { total: 0, count: 0, average: 0 }

    // Add or update the rating
    await setDoc(ratingRef, {
      buildId,
      userId,
      score,
      createdAt: serverTimestamp()
    })

    // Update the build's rating
    const ratingsQuery = query(
      collection(db, 'ratings'),
      where('buildId', '==', buildId)
    )
    const ratingsSnap = await getDocs(ratingsQuery)
    
    let total = 0
    let count = 0
    ratingsSnap.forEach(doc => {
      total += doc.data().score
      count++
    })

    const average = count > 0 ? total / count : 0

    await updateDoc(buildRef, {
      rating: {
        total,
        count,
        average
      }
    })

    return {
      average,
      count
    }
  } catch (error) {
    console.error('Error updating rating:', error)
    throw error
  }
}

// Add function to increment view count
export async function incrementBuildViews(buildId: string) {
  const buildRef = doc(db, 'builds', buildId)
  
  try {
    // Check if this build was viewed recently by this browser
    const viewKey = `build_view_${buildId}`
    const lastView = localStorage.getItem(viewKey)
    const now = Date.now()

    // Only count a view if it's been more than 30 minutes since the last view
    // or if there's no previous view record
    if (!lastView || now - parseInt(lastView) > 30 * 60 * 1000) {
      // Update the view count
      await updateDoc(buildRef, {
        views: increment(1)
      })
      
      // Store the timestamp of this view
      localStorage.setItem(viewKey, now.toString())

      // Get the updated build data to verify the change
      const updatedBuild = await getDoc(buildRef)
      console.log('Updated view count:', updatedBuild.data()?.views)
    }
  } catch (error) {
    console.error('Error incrementing views:', error)
  }
}

// Add function to get user's top builds
export async function getUserTopBuilds(userId: string): Promise<{
  byViews: Build[]
  byLikes: Build[]
}> {
  try {
    const userBuildsQuery = query(
      collection(db, 'builds'),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(userBuildsQuery);
    const builds = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate(),
    } as Build));

    const byViews = [...builds].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
    const byLikes = [...builds].sort((a, b) => b.likes - a.likes).slice(0, 5);

    return { byViews, byLikes };
  } catch (error) {
    console.error('Error fetching top builds:', error);
    return { byViews: [], byLikes: [] };
  }
}

export async function getRelatedBuilds(cardId: string): Promise<Build[]> {
  try {
    const buildsRef = collection(db, 'builds');
    const q = query(
      buildsRef,
      where('cards', 'array-contains', cardId),
      orderBy('likes', 'desc'),
      limit(5)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Build[];
  } catch (error) {
    console.error('Error fetching related builds:', error);
    return [];
  }
}
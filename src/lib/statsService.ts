import { db } from './firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

export interface BuildStats {
  totalBuilds: number;
  buildsByHero: Record<string, number>;
  buildsByType: Record<string, number>;
  averageLikes: number;
  mostPopularHero: string;
  mostPopularBuildType: string;
}

export async function getGlobalStats(): Promise<BuildStats> {
  const buildsQuery = query(collection(db, 'builds'));
  const snapshot = await getDocs(buildsQuery);
  
  const stats = {
    totalBuilds: 0,
    buildsByHero: {} as Record<string, number>,
    buildsByType: {} as Record<string, number>,
    totalLikes: 0,
    mostPopularHero: '',
    mostPopularBuildType: ''
  };

  snapshot.docs.forEach(doc => {
    const build = doc.data();
    stats.totalBuilds++;
    stats.buildsByHero[build.heroId] = (stats.buildsByHero[build.heroId] || 0) + 1;
    stats.buildsByType[build.buildType] = (stats.buildsByType[build.buildType] || 0) + 1;
    stats.totalLikes += build.likes;
  });

  return {
    ...stats,
    averageLikes: stats.totalLikes / stats.totalBuilds,
    mostPopularHero: Object.entries(stats.buildsByHero)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '',
    mostPopularBuildType: Object.entries(stats.buildsByType)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || ''
  };
}

export async function getUserStats(userId: string) {
  try {
    // Get builds created by user
    const buildsQuery = query(
      collection(db, 'builds'),
      where('userId', '==', userId)
    )
    const buildsSnapshot = await getDocs(buildsQuery)
    const buildsCreated = buildsSnapshot.size

    // Get total likes on user's builds
    let buildLikes = 0
    buildsSnapshot.forEach(doc => {
      buildLikes += doc.data().likes || 0
    })

    // Get builds liked by user
    const likedBuildsQuery = query(
      collection(db, 'builds'),
      where('likedBy', 'array-contains', userId)
    )
    const likedBuildsSnapshot = await getDocs(likedBuildsQuery)
    const buildsLiked = likedBuildsSnapshot.size

    // Get comments by user
    const commentsQuery = query(
      collection(db, 'comments'),
      where('userId', '==', userId)
    )
    const commentsSnapshot = await getDocs(commentsQuery)
    const commentsCount = commentsSnapshot.size

    // Get total likes on user's comments
    let commentLikes = 0
    commentsSnapshot.forEach(doc => {
      commentLikes += doc.data().likes || 0
    })

    // Calculate total likes
    const totalLikes = buildLikes + commentLikes

    return {
      buildsCreated,
      buildsLiked,
      commentsCount,
      likes: {
        totalLikes,
        buildLikes,
        commentLikes
      }
    }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    throw error
  }
} 
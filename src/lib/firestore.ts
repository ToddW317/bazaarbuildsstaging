import { db } from './firebase'
import { collection, query, where, limit, orderBy } from 'firebase/firestore'

export const firestoreQueries = {
  // Efficient queries with limits
  recentBuilds: (pageSize = 10) => 
    query(collection(db, 'builds'), 
      orderBy('createdAt', 'desc'), 
      limit(pageSize)),

  userBuilds: (userId: string, pageSize = 10) => 
    query(collection(db, 'builds'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'), 
      limit(pageSize)),

  // Use composite indexes efficiently
  popularBuilds: (heroId: string | null, pageSize = 10) => 
    heroId 
      ? query(collection(db, 'builds'),
          where('heroId', '==', heroId),
          orderBy('likes', 'desc'),
          limit(pageSize))
      : query(collection(db, 'builds'),
          orderBy('likes', 'desc'),
          limit(pageSize)),

  // Efficient comment loading
  buildComments: (buildId: string, pageSize = 20) => 
    query(collection(db, `builds/${buildId}/comments`),
      orderBy('createdAt', 'desc'),
      limit(pageSize))
}

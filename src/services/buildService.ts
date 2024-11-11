import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const getRelatedBuilds = async (cardId: string) => {
  if (!cardId) {
    console.warn('No cardId provided to getRelatedBuilds');
    return [];
  }

  try {
    const buildsRef = collection(db, 'builds');
    const q = query(
      buildsRef,
      where('cardIds', 'array-contains', cardId),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const querySnapshot = await getDocs(q);
    const builds = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return builds;
  } catch (error) {
    console.error('Error fetching related builds:', error);
    return [];
  }
};

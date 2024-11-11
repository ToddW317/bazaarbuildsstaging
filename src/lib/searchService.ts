import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Build } from '@/types/types';

export async function searchBuilds(searchTerm: string): Promise<Build[]> {
  // Search in title and description
  const titleQuery = query(
    collection(db, 'builds'),
    where('title', '>=', searchTerm),
    where('title', '<=', searchTerm + '\uf8ff')
  );

  const descQuery = query(
    collection(db, 'builds'),
    where('description', '>=', searchTerm),
    where('description', '<=', searchTerm + '\uf8ff')
  );

  const [titleSnap, descSnap] = await Promise.all([
    getDocs(titleQuery),
    getDocs(descQuery)
  ]);

  const results = new Map();
  
  [...titleSnap.docs, ...descSnap.docs].forEach(doc => {
    if (!results.has(doc.id)) {
      results.set(doc.id, {
        id: doc.id,
        ...doc.data()
      });
    }
  });

  return Array.from(results.values()) as Build[];
} 
import { db } from './firebase'
import { doc, updateDoc } from 'firebase/firestore'

export async function updateUsername(userId: string, newUsername: string) {
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    displayName: newUsername
  })
} 
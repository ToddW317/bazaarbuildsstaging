import { Timestamp } from "firebase/firestore"

// Optimized data structures to minimize document size
interface FirestoreBuild {
  id: string
  title: string
  description: string
  heroId: string
  buildType: string
  userId: string
  createdAt: Timestamp
  updatedAt: Timestamp
  likes: number        // Counter for quick access
  views: number        // Counter for quick access
  tags: string[]       // Limited array size
  difficulty: string
}

interface FirestoreComment {
  id: string
  buildId: string
  content: string
  userId: string
  createdAt: Timestamp
  parentId?: string    // For nested comments
}

interface FirestoreUserStats {
  buildsCount: number
  likesReceived: number
  commentsCount: number
  lastActive: Timestamp
  // Cache frequently accessed stats
} 
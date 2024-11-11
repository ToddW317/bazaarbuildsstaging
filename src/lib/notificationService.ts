import { db } from './firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  addDoc,
  Timestamp,
  getDocs
} from 'firebase/firestore';
import { Notification } from '@/types/types';

export async function createNotification(
  userId: string,
  type: Notification['type'],
  data: Omit<Notification['data'], 'actorName'> & { actorName: string }
) {
  try {
    await addDoc(collection(db, 'notifications'), {
      userId,
      type,
      read: false,
      createdAt: serverTimestamp(),
      data
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

export function subscribeToNotifications(
  userId: string,
  callback: (notifications: Notification[]) => void
) {
  const notificationsQuery = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    where('read', '==', false),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(notificationsQuery, (snapshot) => {
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate()
    })) as Notification[];
    callback(notifications);
  });
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    
    const snapshot = await getDocs(notificationsQuery);
    
    const updates = snapshot.docs.map(doc => 
      updateDoc(doc.ref, { read: true })
    );
    
    await Promise.all(updates);
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
  }
} 
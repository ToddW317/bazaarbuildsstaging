import { analytics } from './firebase';
import { logEvent as firebaseLogEvent } from 'firebase/analytics';

export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, eventParams);
  }
} 
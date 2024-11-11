'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { subscribeToNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '@/lib/notificationService'
import { Notification } from '@/types/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotificationBell() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    const unsubscribe = subscribeToNotifications(user.uid, (newNotifications) => {
      setNotifications(newNotifications)
    })

    return () => unsubscribe()
  }, [user])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNotificationClick = async (notification: Notification) => {
    await markNotificationAsRead(notification.id)
    setIsOpen(false)

    // Navigate based on notification type
    if (notification.type === 'comment_reply' || notification.type === 'build_like' || notification.type === 'build_rating') {
      router.push(`/builds/${notification.data.buildId}`)
    }
  }

  const handleMarkAllAsRead = async () => {
    if (!user) return
    await markAllNotificationsAsRead(user.uid)
    setNotifications([])
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white transition-colors"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            {notifications.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No new notifications
              </div>
            ) : (
              notifications.map(notification => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="w-full p-4 text-left hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
                >
                  <div className="text-sm text-gray-300">
                    {getNotificationMessage(notification)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {formatTimestamp(notification.createdAt)}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function getNotificationMessage(notification: Notification): string {
  switch (notification.type) {
    case 'comment_reply':
      return `${notification.data.actorName} replied to your comment on "${notification.data.buildTitle}"`
    case 'build_like':
      return `${notification.data.actorName} liked your build "${notification.data.buildTitle}"`
    case 'comment_like':
      return `${notification.data.actorName} liked your comment`
    case 'build_rating':
      return `${notification.data.actorName} rated your build "${notification.data.buildTitle}" ${notification.data.rating} stars`
    default:
      return 'New notification'
  }
}

function formatTimestamp(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
} 
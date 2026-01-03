"use client"

import { useEffect, useState } from "react"
import { subscribeToNotifications } from "@/lib/realtime"

export interface Notification {
  id: string
  title: string
  message: string
  type: string
  created_at: string
  is_read: boolean
}

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const subscription = subscribeToNotifications(userId, (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev])
      if (!newNotification.is_read) {
        setUnreadCount((prev) => prev + 1)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, is_read: true } : notif)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
  }
}

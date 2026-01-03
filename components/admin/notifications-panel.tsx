"use client"

import { useNotifications } from "@/hooks/use-notifications"
import { Card, CardContent } from "@/components/ui/card"
import { Bell } from "lucide-react"

interface NotificationsPanelProps {
  userId: string
}

export function NotificationsPanel({ userId }: NotificationsPanelProps) {
  const { notifications, unreadCount } = useNotifications(userId)

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {notifications.slice(0, 3).map((notif) => (
        <Card key={notif.id} className={`mb-2 border-slate-700 ${notif.is_read ? "bg-slate-800" : "bg-blue-800"}`}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Bell className={`flex-shrink-0 ${notif.is_read ? "text-slate-400" : "text-blue-400"}`} size={20} />
              <div>
                <p className="text-white font-semibold text-sm">{notif.title}</p>
                <p className="text-slate-300 text-xs mt-1">{notif.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {unreadCount > 3 && <p className="text-slate-400 text-xs text-center">و {unreadCount - 3} إشعارات أخرى</p>}
    </div>
  )
}

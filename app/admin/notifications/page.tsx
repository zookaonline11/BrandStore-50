"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, AlertCircle, Send, UserPlus, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function NotificationsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    soundNotifications: true,
    soundType: "notification",
  })

  const notifications = [
    {
      id: 1,
      type: "new_user",
      title: "عميل جديد سجل",
      message: "أحمد محمد علي حسن سجل حساب جديد وينتظر الموافقة",
      time: "منذ 5 دقائق",
      unread: true,
      icon: UserPlus,
      data: { userName: "أحمد محمد علي حسن", status: "قيد المراجعة" },
    },
    {
      id: 2,
      type: "approval_approved",
      title: "تم قبول العميل",
      message: "تم قبول حساب فاطمة أحمد بنجاح",
      time: "منذ ساعة",
      unread: true,
      icon: CheckCircle,
      data: { userName: "فاطمة أحمد", status: "موافق عليه" },
    },
    {
      id: 3,
      type: "order",
      title: "طلب جديد وصل",
      message: "أحمد محمد طلب 3 منتجات بقيمة 500 EGP",
      time: "منذ ساعتين",
      unread: true,
      icon: AlertCircle,
    },
    {
      id: 4,
      type: "shipment",
      title: "شحنة معلقة",
      message: "شحنة فودافون بقيمة 100 EGP من محمود علي",
      time: "منذ 3 ساعات",
      unread: false,
      icon: AlertCircle,
    },
    {
      id: 5,
      type: "security",
      title: "محاولة دخول غير عادية",
      message: "تم الكشف عن محاولة دخول من IP: 192.168.1.100",
      time: "منذ يومين",
      unread: false,
      icon: AlertCircle,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">الإشعارات</h1>
        <p className="text-slate-400 mt-1">إدارة جميع الإشعارات والتنبيهات</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="notifications" className="text-slate-300 data-[state=active]:text-white">
            <Bell size={18} className="mr-2" /> الإشعارات
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-slate-300 data-[state=active]:text-white">
            الإعدادات
          </TabsTrigger>
        </TabsList>

        {/* Notifications List */}
        <TabsContent value="notifications" className="space-y-4">
          {notifications.map((notif) => {
            const Icon = notif.icon
            return (
              <Card key={notif.id} className={`border-slate-700 ${notif.unread ? "bg-slate-750" : "bg-slate-800"}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${notif.unread ? "bg-blue-500/20" : "bg-slate-700"}`}>
                      <Icon className={`${notif.unread ? "text-blue-400" : "text-slate-400"}`} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{notif.title}</h3>
                      <p className="text-slate-400 text-sm mt-1">{notif.message}</p>
                      {notif.data && (
                        <div className="mt-2 p-2 bg-slate-700/50 rounded text-xs text-slate-300">
                          <p>المستخدم: {notif.data.userName}</p>
                          <p>الحالة: {notif.data.status}</p>
                        </div>
                      )}
                      <p className="text-slate-500 text-xs mt-2">{notif.time}</p>
                    </div>
                    {notif.unread && <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="border-slate-700 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-white">إعدادات الإشعارات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Types */}
              <div className="space-y-3">
                <Label className="text-white font-semibold">أنواع الإشعارات</Label>

                {[
                  { key: "pushNotifications", label: "إشعارات الهاتف (Push)" },
                  { key: "emailNotifications", label: "إشعارات البريد الإلكتروني" },
                  { key: "smsNotifications", label: "رسائل SMS" },
                  { key: "soundNotifications", label: "تنبيهات صوتية" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <Label className="text-slate-300 cursor-pointer">{item.label}</Label>
                    <input
                      type="checkbox"
                      checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="w-5 h-5"
                    />
                  </div>
                ))}
              </div>

              {/* Sound Type */}
              {notificationSettings.soundNotifications && (
                <div className="space-y-3">
                  <Label className="text-white font-semibold">نوع الصوت</Label>
                  <select
                    value={notificationSettings.soundType}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, soundType: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-2"
                  >
                    <option value="notification">نغمة عادية</option>
                    <option value="bell">جرس</option>
                    <option value="chime">نقرة</option>
                  </select>
                </div>
              )}

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">حفظ الإعدادات</Button>
            </CardContent>
          </Card>

          {/* Send Test Notification */}
          <Card className="border-slate-700 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-white">إرسال إشعار تجريبي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-200">عنوان الإشعار</Label>
                <Input placeholder="اختبار الإشعار" className="bg-slate-700 border-slate-600 text-white" />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">الرسالة</Label>
                <textarea
                  placeholder="اكتب رسالة التجربة..."
                  rows={3}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3"
                />
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                <Send size={18} />
                إرسال إشعار تجريبي
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

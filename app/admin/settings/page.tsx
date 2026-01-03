"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Lock, User, Shield } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [adminData, setAdminData] = useState({
    name: "شاهر",
    email: "shahermagdee@gmail.com",
    phone: "01010452456",
    avatar: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">الإعدادات</h1>
        <p className="text-slate-400 mt-1">إدارة إعدادات حسابك</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="profile" className="text-slate-300 data-[state=active]:text-white">
            <User size={18} className="mr-2" /> الملف الشخصي
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-slate-300 data-[state=active]:text-white">
            <Bell size={18} className="mr-2" /> الإشعارات
          </TabsTrigger>
          <TabsTrigger value="security" className="text-slate-300 data-[state=active]:text-white">
            <Lock size={18} className="mr-2" /> الأمان
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="border-slate-700 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-white">بيانات الملف الشخصي</CardTitle>
              <CardDescription className="text-slate-400">قم بتحديث معلومات حسابك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center">
                  <User size={40} className="text-slate-400" />
                </div>
                <div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">تغيير الصورة</Button>
                  <p className="text-slate-400 text-sm mt-2">PNG, JPG حتى 10MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">اسم المسؤول</Label>
                  <Input
                    value={adminData.name}
                    onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">البريد الإلكتروني</Label>
                  <Input
                    value={adminData.email}
                    onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                    type="email"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">رقم الهاتف</Label>
                <Input
                  value={adminData.phone}
                  onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white">حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-slate-700 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-white">إعدادات الإشعارات</CardTitle>
              <CardDescription className="text-slate-400">تحكم في الإشعارات التي تتلقاها</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "إشعارات الطلبات الجديدة", description: "تلقي إشعارات عند وصول طلب جديد" },
                { label: "إشعارات الشحنات", description: "تلقي إشعارات حول حالة الشحنات" },
                { label: "إشعارات النظام", description: "تلقي إشعارات أمان ونظام مهمة" },
                { label: "إشعارات البريد الإلكتروني", description: "استقبال رسائل بريدية عن الأنشطة" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">{item.label}</p>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card className="border-slate-700 bg-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield size={20} />
                تغيير كلمة المرور
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-200">كلمة المرور الحالية</Label>
                <Input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-200">كلمة المرور الجديدة</Label>
                <Input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-200">تأكيد كلمة المرور</Label>
                <Input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">تحديث كلمة المرور</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

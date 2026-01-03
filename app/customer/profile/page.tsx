"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, LogOut } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("userSession")
    router.push("/")
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">الملف الشخصي</h1>
      <p className="text-muted-foreground mb-8">معلومات حسابك وإحصائياتك</p>

      {/* Avatar Section */}
      <Card className="border-border bg-card mb-6">
        <CardContent className="pt-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={40} className="text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">أحمد محمد</h2>
              <p className="text-muted-foreground">عميل منذ 6 أشهر</p>
              <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">تغيير الصورة</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card className="border-border bg-card mb-6">
        <CardHeader>
          <CardTitle className="text-foreground">المعلومات الشخصية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground text-sm font-medium">الاسم الرباعي</Label>
              <Input value="أحمد محمد علي حسن" className="bg-input border-border text-foreground" disabled />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground text-sm font-medium">اسم الشهرة</Label>
              <Input value="احمد محمد" className="bg-input border-border text-foreground" disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground text-sm font-medium flex items-center gap-2">
              <Mail size={18} /> البريد الإلكتروني
            </Label>
            <Input value="user@example.com" className="bg-input border-border text-foreground" disabled />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground text-sm font-medium flex items-center gap-2">
              <Phone size={18} /> رقم الهاتف
            </Label>
            <Input value="01000000000" className="bg-input border-border text-foreground" disabled />
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">تعديل المعلومات</Button>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-border bg-card">
          <CardContent className="pt-4">
            <p className="text-muted-foreground text-sm">الطلبات</p>
            <p className="text-2xl font-bold text-foreground mt-2">15</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-4">
            <p className="text-muted-foreground text-sm">الشحنات</p>
            <p className="text-2xl font-bold text-foreground mt-2">23</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-4">
            <p className="text-muted-foreground text-sm">الإنفاق</p>
            <p className="text-2xl font-bold text-primary mt-2">8,500 EGP</p>
          </CardContent>
        </Card>
      </div>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2 py-6"
      >
        <LogOut size={18} />
        تسجيل الخروج
      </Button>
    </div>
  )
}

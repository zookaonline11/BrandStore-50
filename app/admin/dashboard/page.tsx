"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Package, Users, TrendingUp, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser")
    if (!adminUser) {
      router.push("/")
    }
  }, [router])

  const stats = [
    { icon: Users, label: "إجمالي المستخدمين", value: "1,234", color: "bg-primary/20 text-primary" },
    { icon: ShoppingCart, label: "الطلبات اليوم", value: "45", color: "bg-green-500/20 text-green-400" },
    { icon: Package, label: "الشحنات المعلقة", value: "12", color: "bg-yellow-500/20 text-yellow-400" },
    { icon: TrendingUp, label: "المبيعات هذا الشهر", value: "125,500 EGP", color: "bg-purple-500/20 text-purple-400" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
        <p className="text-muted-foreground mt-1">أهلاً بك في نظام إدارة Brand Store</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">الطلبات الأخيرة</CardTitle>
            <CardDescription>آخر 10 طلبات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-card/50 transition"
                  >
                    <div>
                      <p className="text-foreground font-semibold">طلب #1234{i}</p>
                      <p className="text-muted-foreground text-sm">أحمد محمد</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm">قيد التنفيذ</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <AlertCircle size={20} className="text-yellow-500" />
              تنبيهات هامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-400 text-sm">هناك 5 طلبات معلقة للمراجعة</p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
              <p className="text-red-400 text-sm">محاولة دخول غير عادية من IP جديد</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

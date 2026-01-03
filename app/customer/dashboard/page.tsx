"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LinkIcon, Package, Zap } from "lucide-react"
import Link from "next/link"

export default function CustomerDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">أهلاً بك في Brand Store</h1>
        <p className="text-muted-foreground">اختر الخدمة التي تريدها لبدء العملية</p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Recharge Services */}
        <Card className="border-border bg-card hover:bg-card/80 transition cursor-pointer">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Zap size={24} className="text-primary" />
              الخدمات المالية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">شحن رصيد - محافظ إلكترونية - تحويل أموال</p>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/customer/services">ابدأ الآن</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Store */}
        <Card className="border-border bg-card hover:bg-card/80 transition cursor-pointer">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Package size={24} className="text-green-500" />
              المتجر الإلكتروني
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">شراء أحدث الملحقات والمنتجات</p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" asChild>
              <Link href="/customer/store">تصفح المتجر</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Track */}
        <Card className="border-border bg-card hover:bg-card/80 transition cursor-pointer">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <LinkIcon size={24} className="text-purple-500" />
              تتبع الطلبات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">متابعة طلباتك والشحنات</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" asChild>
              <Link href="/customer/orders">تتبع الآن</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">الطلبات الجارية</p>
            <p className="text-3xl font-bold text-foreground mt-2">2</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">رصيد المحفظة</p>
            <p className="text-3xl font-bold text-primary mt-2">500 EGP</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">الطلبات المكتملة</p>
            <p className="text-3xl font-bold text-foreground mt-2">15</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

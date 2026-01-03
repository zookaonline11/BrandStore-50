"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"welcome" | "admin" | "user">("welcome")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Welcome */}
        {activeTab === "welcome" && (
          <Card className="border-border bg-card">
            <CardHeader className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">Brand Store</div>
                <p className="text-sm text-muted-foreground">منصة إدارة متقدمة</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-foreground text-sm leading-relaxed">
                نظام متكامل لإدارة متجرك الإلكتروني والخدمات المالية
              </p>

              <Button
                onClick={() => setActiveTab("admin")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
              >
                تسجيل دخول الإدارة
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">أو</span>
                </div>
              </div>

              <Button
                onClick={() => setActiveTab("user")}
                variant="outline"
                className="w-full border-border hover:bg-card/50 h-11"
              >
                تسجيل دخول العميل
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Admin Login */}
        {activeTab === "admin" && <AdminLogin onBack={() => setActiveTab("welcome")} />}

        {/* User Portal */}
        {activeTab === "user" && <UserPortal onBack={() => setActiveTab("welcome")} />}
      </div>
    </div>
  )
}

function AdminLogin({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const admins = [
    { email: "shahermagdee@gmail.com", password: "#Agehn444", name: "شاهر" },
    { email: "shahermagdee@gmail.com", password: "@158Afbsh", name: "مصطفى" },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((r) => setTimeout(r, 500))

    const admin = admins.find((a) => a.email === email && a.password === password)
    if (admin) {
      localStorage.setItem("adminUser", JSON.stringify({ email, name: admin.name }))
      window.location.href = "/admin/dashboard"
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
    }
    setIsLoading(false)
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>تسجيل دخول الإدارة</CardTitle>
        <CardDescription>أدخل بيانات الدخول الخاصة بك</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 border border-destructive text-destructive px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="shahermagdee@gmail.com"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
          >
            {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
          </Button>

          <Button type="button" onClick={onBack} variant="outline" className="w-full border-border bg-transparent">
            رجوع
          </Button>
        </form>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            حسابات تجريبية:
            <br />
            <span className="text-foreground">shahermagdee@gmail.com</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function UserPortal({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"login" | "register">("login")

  return (
    <>
      {tab === "login" && <UserLogin onBack={onBack} onSwitchTab={() => setTab("register")} />}
      {tab === "register" && <UserRegister onBack={onBack} onSwitchTab={() => setTab("login")} />}
    </>
  )
}

function UserLogin({ onBack, onSwitchTab }: { onBack: () => void; onSwitchTab: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((r) => setTimeout(r, 500))

    if (email && password) {
      localStorage.setItem("userSession", JSON.stringify({ email }))
      window.location.href = "/customer/dashboard"
    } else {
      setError("يرجى ملء جميع الحقول")
    }
    setIsLoading(false)
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>تسجيل دخول العميل</CardTitle>
        <CardDescription>أدخل بيانات الدخول الخاصة بك</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 border border-destructive text-destructive px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">البريد الإلكتروني أو رقم الهاتف</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك أو رقم هاتفك"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
          >
            {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
          </Button>

          <div className="text-center text-sm">
            <button type="button" onClick={onSwitchTab} className="text-primary hover:text-primary/90 underline">
              ليس لديك حساب؟ أنشئ واحداً
            </button>
          </div>

          <Button type="button" onClick={onBack} variant="outline" className="w-full border-border bg-transparent">
            رجوع
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function UserRegister({ onBack, onSwitchTab }: { onBack: () => void; onSwitchTab: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const isFormValid =
    formData.firstName &&
    formData.secondName &&
    formData.thirdName &&
    formData.fourthName &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.confirmPassword === formData.password &&
    formData.agreeTerms

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة")
      setIsLoading(false)
      return
    }

    await new Promise((r) => setTimeout(r, 1000))

    setSuccess(true)
    setIsLoading(false)

    setTimeout(() => {
      onSwitchTab()
    }, 2000)
  }

  if (success) {
    return (
      <Card className="border-border bg-card">
        <CardHeader className="text-center">
          <div className="text-4xl mb-3">✅</div>
          <CardTitle>تم التسجيل بنجاح!</CardTitle>
          <CardDescription>سيتم توجيهك لتسجيل الدخول</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>إنشاء حساب جديد</CardTitle>
        <CardDescription>أدخل بيانات الحساب الخاصة بك</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="bg-destructive/15 border border-destructive text-destructive px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">الاسم الأول</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="محمد"
                className="w-full px-2 py-1.5 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">الاسم الثاني</label>
              <input
                type="text"
                name="secondName"
                value={formData.secondName}
                onChange={handleChange}
                placeholder="أحمد"
                className="w-full px-2 py-1.5 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">الاسم الثالث</label>
              <input
                type="text"
                name="thirdName"
                value={formData.thirdName}
                onChange={handleChange}
                placeholder="علي"
                className="w-full px-2 py-1.5 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">الاسم الرابع</label>
              <input
                type="text"
                name="fourthName"
                value={formData.fourthName}
                onChange={handleChange}
                placeholder="حسن"
                className="w-full px-2 py-1.5 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full px-2 py-1.5 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">رقم الهاتف</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01000000000"
              className="w-full px-2 py-1.5 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-2 py-1.5 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">تأكيد كلمة المرور</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-2 py-1.5 bg-input border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              id="terms"
              className="w-4 h-4 rounded border border-border bg-input cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
              أوافق على الشروط والأحكام
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "جاري التسجيل..." : "إنشاء الحساب"}
          </Button>

          <div className="text-center text-sm">
            <button type="button" onClick={onSwitchTab} className="text-primary hover:text-primary/90 underline">
              هل لديك حساب؟ تسجيل الدخول
            </button>
          </div>

          <Button type="button" onClick={onBack} variant="outline" className="w-full border-border bg-transparent">
            رجوع
          </Button>
        </form>
      </CardContent>
    </Card>
  )
    }

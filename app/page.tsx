"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"welcome" | "admin" | "user">("welcome")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-bold text-primary">Brand Store</div>
          <div className="flex gap-2">
            <a
              href="mailto:shahermagdee@gmail.com"
              title="التواصل عبر البريد الإلكتروني"
              className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"
                />
              </svg>
            </a>
            <a
              href="https://wa.me/201274790388"
              target="_blank"
              rel="noopener noreferrer"
              title="انضم للواتساب"
              className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-500 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.537 0-2.852-.726-2.852-1.61 0-.885 1.315-1.61 2.852-1.61 1.537 0 2.852.725 2.852 1.61 0 .884-1.315 1.61-2.852 1.61z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="text-center mb-8 pb-4 border-b border-border">
          <a
            href="https://wa.me/201274790388"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.537 0-2.852-.726-2.852-1.61 0-.885 1.315-1.61 2.852-1.61 1.537 0 2.852.725 2.852 1.61 0 .884-1.315 1.61-2.852 1.61z" />
            </svg>
            انضم للواتساب: 0127479388+
          </a>
        </div>
      </div>

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

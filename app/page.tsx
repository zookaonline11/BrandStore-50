"use client"

import { CardDescription } from "@/components/ui/card"
import { ChatBubble } from "@/components/chat-bubble"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"welcome" | "admin" | "user">("welcome")
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)" opacity="0.05" />
        </svg>

        {/* Animated particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: particle.x + "%",
              top: particle.y + "%",
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)",
              animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
          {particles.slice(0, 10).map((p1, i) => {
            const p2 = particles[(i + 1) % 10]
            if (!p2) return null
            return (
              <line
                key={`line-${i}`}
                x1={p1.x + "%"}
                y1={p1.y + "%"}
                x2={p2.x + "%"}
                y2={p2.y + "%"}
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="1"
              />
            )
          })}
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Welcome Tab */}
        {activeTab === "welcome" && (
          <div className="w-full max-w-md">
            <Card className="border-2 border-blue-500/50 bg-slate-950/80 backdrop-blur-md shadow-2xl shadow-blue-500/20">
              <CardHeader className="text-center space-y-6 pb-8">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-white tracking-wider">Brand Store</h1>
                  <div className="text-xs text-blue-300 uppercase tracking-widest">نظامك المتكامل لإدارة شحناتك</div>
                  <div className="text-xs text-yellow-300 uppercase tracking-widest">أفضل تجربة تسوق رقمية</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button
                  onClick={() => setActiveTab("user")}
                  className="w-full h-12 border-2 border-blue-400 bg-transparent hover:bg-blue-500/10 text-blue-300 hover:text-blue-200 font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  تسجيل دخول العميل
                </Button>

                <Button
                  onClick={() => setActiveTab("admin")}
                  className="w-full h-12 border-2 border-blue-400 bg-transparent hover:bg-blue-500/10 text-blue-300 hover:text-blue-200 font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  تسجيل دخول الإدارة
                </Button>

                <div className="pt-6 border-t border-blue-500/20">
                  <div className="flex items-center justify-center gap-2 text-blue-300 hover:text-blue-200 cursor-pointer transition mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <span className="text-sm">هل تحتاج مساعدة؟</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Admin Login */}
        {activeTab === "admin" && <AdminLogin onBack={() => setActiveTab("welcome")} />}

        {/* User Portal */}
        {activeTab === "user" && <UserPortal onBack={() => setActiveTab("welcome")} />}
      </div>

      <ChatBubble />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
      `}</style>
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
    formData.confirmPassword === formData.password

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

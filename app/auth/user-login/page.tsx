"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Mail, Phone, Loader2 } from "lucide-react"

export default function UserLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validation
    if (!credentials.emailOrPhone || !credentials.password) {
      setError("جميع الحقول مطلوبة")
      setIsLoading(false)
      return
    }

    if (credentials.password.length < 6) {
      setError("كلمة المرور غير صحيحة")
      setIsLoading(false)
      return
    }

    try {
      // Mock login - replace with real API call later
      console.log("Login attempt:", { loginMethod, ...credentials })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, accept any non-empty credentials
      // This will be replaced with real authentication
      window.location.href = "/customer/dashboard"
    } catch (err) {
      setError("البريد الإلكتروني أو رقم الهاتف أو كلمة المرور غير صحيحة")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-slate-700 bg-slate-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">تسجيل الدخول</CardTitle>
          <CardDescription className="text-slate-400">Brand Store</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="flex items-start gap-3 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Login Method Toggle */}
            <div className="flex gap-2 p-1 bg-slate-700 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("email")
                  setCredentials((prev) => ({ ...prev, emailOrPhone: "" }))
                  setError(null)
                }}
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition ${
                  loginMethod === "email" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <Mail size={16} className="inline mr-1" />
                البريد
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("phone")
                  setCredentials((prev) => ({ ...prev, emailOrPhone: "" }))
                  setError(null)
                }}
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition ${
                  loginMethod === "phone" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <Phone size={16} className="inline mr-1" />
                الهاتف
              </button>
            </div>

            {/* Email/Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="emailOrPhone" className="text-slate-200">
                {loginMethod === "email" ? "البريد الإلكتروني" : "رقم الهاتف"}
              </Label>
              <Input
                id="emailOrPhone"
                name="emailOrPhone"
                type={loginMethod === "email" ? "email" : "tel"}
                value={credentials.emailOrPhone}
                onChange={handleInputChange}
                placeholder={loginMethod === "email" ? "example@gmail.com" : "01000000000"}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-200">
                  كلمة المرور
                </Label>
                <Link href="/auth/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  جاري التسجيل...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-slate-400 text-sm">
            ليس لديك حساب؟{" "}
            <Link href="/auth/register-user" className="text-blue-400 hover:text-blue-300 font-medium">
              إنشاء حساب جديد
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

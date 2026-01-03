"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const router = useRouter()

  const admins = [
    { name: "شاهر", password: "Agehn444#" },
    { name: "مصطفى", password: "@158Afbsh" },
  ]

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const admin = admins.find((a) => a.password === password)
    if (admin) {
      sessionStorage.setItem("adminName", admin.name)
      sessionStorage.setItem("adminPassword", password)
      router.push("/admin/dashboard")
    } else {
      setError("كلمة المرور غير صحيحة")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-slate-700 bg-slate-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Brand Store</CardTitle>
          <CardDescription className="text-slate-400">تسجيل دخول الإدارة</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                required
              />
            </div>

            <div className="bg-blue-500/20 border border-blue-500 text-blue-200 px-4 py-2 rounded-lg text-xs">
              <p className="font-semibold">حسابات الإدارة:</p>
              <p>شاهر: Agehn444#</p>
              <p>مصطفى: @158Afbsh</p>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading ? "جاري التسجيل..." : "تسجيل الدخول"}
            </Button>

            <p className="text-sm text-slate-400 text-center">
              البريد الإلكتروني للدعم:{" "}
              <Link href="mailto:shahermagdee@gmail.com" className="text-blue-400 hover:text-blue-300">
                shahermagdee@gmail.com
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Mail, Smartphone } from "lucide-react"

export default function ForgotPasswordPage() {
  const [contactMethod, setContactMethod] = useState<"email" | "phone" | null>(null)
  const [contact, setContact] = useState("")
  const [step, setStep] = useState<"method" | "otp" | "password" | "success">("method")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      nextInput?.focus()
    }
  }

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!contactMethod || !contact) {
        setError("يرجى اختيار طريقة التواصل وإدخال البيانات")
        setLoading(false)
        return
      }

      // Validate email or phone
      if (contactMethod === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
          setError("صيغة البريد الإلكتروني غير صحيحة")
          setLoading(false)
          return
        }
      } else if (contactMethod === "phone") {
        if (!/^\d{10,11}$/.test(contact)) {
          setError("رقم الهاتف يجب أن يكون 10-11 أرقام")
          setLoading(false)
          return
        }
      }

      // Simulate sending OTP
      console.log(`OTP sent to ${contactMethod}: ${contact}`)
      setOtpSent(true)
      setStep("otp")
    } catch (err) {
      setError("حدث خطأ في الاتصال")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const otpCode = otp.join("")

    if (otpCode.length !== 6) {
      setError("يرجى إدخال الرمز الكامل (6 أرقام)")
      return
    }

    setLoading(true)
    try {
      // Verify OTP
      console.log("OTP verified:", otpCode)
      setStep("password")
    } catch (err) {
      setError("الرمز غير صحيح. حاول مرة أخرى")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!newPassword || !confirmPassword) {
      setError("يرجى ملء جميع الحقول")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("كلمات المرور غير متطابقة")
      return
    }

    if (newPassword.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      return
    }

    setLoading(true)
    try {
      // Reset password
      console.log("Password reset successful")
      setStep("success")
    } catch (err) {
      setError("حدث خطأ أثناء إعادة تعيين كلمة المرور")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">استعادة كلمة المرور</h1>
            <p className="text-slate-400 text-sm mt-2">
              {step === "method" && "اختر طريقة التواصل"}
              {step === "otp" && "أدخل الرمز المرسل إليك"}
              {step === "password" && "أنشئ كلمة مرور جديدة"}
              {step === "success" && "تم بنجاح!"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6 flex gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Select Contact Method */}
          {step === "method" && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="space-y-3">
                <p className="text-slate-300 font-semibold">اختر طريقة التواصل</p>

                {/* Email Option */}
                <button
                  type="button"
                  onClick={() => {
                    setContactMethod("email")
                    setContact("")
                    setError("")
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition ${
                    contactMethod === "email"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Mail className={contactMethod === "email" ? "text-blue-400" : "text-slate-400"} size={24} />
                    <div className="text-left">
                      <p className="text-white font-semibold">البريد الإلكتروني</p>
                      <p className="text-slate-400 text-sm">استقبل رمز التحقق على بريدك</p>
                    </div>
                  </div>
                </button>

                {/* Phone Option */}
                <button
                  type="button"
                  onClick={() => {
                    setContactMethod("phone")
                    setContact("")
                    setError("")
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition ${
                    contactMethod === "phone"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className={contactMethod === "phone" ? "text-blue-400" : "text-slate-400"} size={24} />
                    <div className="text-left">
                      <p className="text-white font-semibold">رقم الهاتف</p>
                      <p className="text-slate-400 text-sm">استقبل رمز التحقق عبر رسالة نصية</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Input Field */}
              {contactMethod && (
                <div className="space-y-2 mt-6">
                  <label className="text-slate-300 font-semibold">
                    {contactMethod === "email" ? "البريد الإلكتروني" : "رقم الهاتف"}
                  </label>
                  <Input
                    type={contactMethod === "email" ? "email" : "tel"}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={contactMethod === "email" ? "example@gmail.com" : "01000000000"}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={!contactMethod || !contact || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 mt-6"
              >
                {loading ? "جاري الإرسال..." : "احصل على الرمز"}
              </Button>
            </form>
          )}

          {/* Step 2: Enter OTP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <p className="text-slate-300 text-sm">
                  تم إرسال رمز التحقق إلى {contactMethod === "email" ? "بريدك الإلكتروني" : "رقم هاتفك"}
                </p>
                <p className="text-slate-400 text-xs">{contact}</p>
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-semibold">رمز التحقق (6 أرقام)</label>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !digit && index > 0) {
                          const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
                          prevInput?.focus()
                        }
                      }}
                      maxLength={1}
                      className="w-12 h-12 bg-slate-700 border border-slate-600 text-white text-center text-xl rounded-lg font-bold focus:border-blue-500 focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={otp.join("").length !== 6 || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                {loading ? "جاري التحقق..." : "التحقق"}
              </Button>

              <button
                type="button"
                onClick={() => handleRequestOtp({ preventDefault: () => {} } as React.FormEvent)}
                className="w-full text-blue-400 hover:text-blue-300 text-sm"
              >
                إعادة إرسال الرمز
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === "password" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-slate-300 font-semibold">كلمة المرور الجديدة</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-semibold">تأكيد كلمة المرور</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <Button
                type="submit"
                disabled={!newPassword || !confirmPassword || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 mt-6"
              >
                {loading ? "جاري الإعادة..." : "إعادة تعيين كلمة المرور"}
              </Button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle className="text-green-400" size={64} />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl mb-2">تم بنجاح!</h2>
                <p className="text-slate-400">تم إعادة تعيين كلمة المرور بنجاح</p>
              </div>
              <Link href="/auth/user-login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">تسجيل الدخول</Button>
              </Link>
            </div>
          )}

          {/* Back to Login Link */}
          {step !== "success" && (
            <div className="mt-6 text-center">
              <Link href="/auth/user-login" className="text-slate-400 hover:text-slate-300 text-sm">
                العودة إلى تسجيل الدخول
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

export default function RegisterUserPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    avatar: null as File | null,
    idCardFront: null as File | null,
    idCardBack: null as File | null,
  })

  const [previews, setPreviews] = useState({
    avatar: "",
    idCardFront: "",
    idCardBack: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "avatar" | "idCardFront" | "idCardBack",
  ) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]

      // Validate file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("يقبل فقط صور JPG و PNG")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("حجم الصورة يجب أن يكون أقل من 5MB")
        return
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }))

      // Generate preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews((prev) => ({
          ...prev,
          [fieldName]: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  const removeImage = (fieldName: "avatar" | "idCardFront" | "idCardBack") => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: null,
    }))
    setPreviews((prev) => ({
      ...prev,
      [fieldName]: "",
    }))
  }

  const handleNextStep = (nextStep: 1 | 2 | 3) => {
    if (nextStep === 2) {
      if (!formData.firstName || !formData.secondName || !formData.thirdName || !formData.fourthName) {
        setError("جميع أسماء المستخدم مطلوبة")
        return
      }
      if (!formData.email) {
        setError("البريد الإلكتروني مطلوب")
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError("صيغة البريد الإلكتروني غير صحيحة")
        return
      }
    }

    if (nextStep === 3) {
      if (!formData.phone) {
        setError("رقم الهاتف مطلوب")
        return
      }
      if (!formData.password || formData.password.length < 6) {
        setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("كلمات المرور غير متطابقة")
        return
      }
      if (!formData.avatar || !formData.idCardFront || !formData.idCardBack) {
        setError("جميع الصور مطلوبة")
        return
      }
    }

    setError(null)
    setStep(nextStep)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting form:", formData)
      window.location.href = "/auth/user-login"
    } catch (err) {
      setError("حدث خطأ أثناء التسجيل")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="text-white">تسجيل عميل جديد</CardTitle>
          <CardDescription className="text-slate-400">الخطوة {step} من 3</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-200">
                    الاسم الأول
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="أحمد"
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondName" className="text-slate-200">
                    الاسم الثاني
                  </Label>
                  <Input
                    id="secondName"
                    name="secondName"
                    value={formData.secondName}
                    onChange={handleInputChange}
                    placeholder="محمد"
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thirdName" className="text-slate-200">
                    الاسم الثالث
                  </Label>
                  <Input
                    id="thirdName"
                    name="thirdName"
                    value={formData.thirdName}
                    onChange={handleInputChange}
                    placeholder="علي"
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fourthName" className="text-slate-200">
                    الاسم الرابع
                  </Label>
                  <Input
                    id="fourthName"
                    name="fourthName"
                    value={formData.fourthName}
                    onChange={handleInputChange}
                    placeholder="حسن"
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">
                  اسم الشهرة
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="زيكو"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <Button
                onClick={() => handleNextStep(2)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
              >
                التالي
              </Button>
            </div>
          )}

          {/* Step 2: Phone, Password & Photos */}
          {step === 2 && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200">
                  رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="01000000000"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  كلمة المرور
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-200">
                  تأكيد كلمة المرور
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-700">
                <h3 className="text-white font-semibold">الصور المطلوبة</h3>

                {/* Avatar */}
                <div className="space-y-2">
                  <Label className="text-slate-200">صورة شخصية</Label>
                  {previews.avatar ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-700 border border-slate-600">
                      <img
                        src={previews.avatar || "/placeholder.svg"}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage("avatar")}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleFileChange(e, "avatar")}
                        className="hidden"
                        id="avatar"
                      />
                      <label htmlFor="avatar" className="cursor-pointer block">
                        <span className="text-slate-400">اختر صورة أو التقط صورة</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* ID Card Front */}
                <div className="space-y-2">
                  <Label className="text-slate-200">الوجه الأمامي لبطاقة الهوية</Label>
                  {previews.idCardFront ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-700 border border-slate-600">
                      <img
                        src={previews.idCardFront || "/placeholder.svg"}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage("idCardFront")}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleFileChange(e, "idCardFront")}
                        className="hidden"
                        id="idCardFront"
                      />
                      <label htmlFor="idCardFront" className="cursor-pointer block">
                        <span className="text-slate-400">اختر صورة أو التقط صورة</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* ID Card Back */}
                <div className="space-y-2">
                  <Label className="text-slate-200">الوجه الخلفي لبطاقة الهوية</Label>
                  {previews.idCardBack ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-700 border border-slate-600">
                      <img
                        src={previews.idCardBack || "/placeholder.svg"}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage("idCardBack")}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleFileChange(e, "idCardBack")}
                        className="hidden"
                        id="idCardBack"
                      />
                      <label htmlFor="idCardBack" className="cursor-pointer block">
                        <span className="text-slate-400">اختر صورة أو التقط صورة</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button onClick={() => handleNextStep(1)} variant="outline" className="flex-1">
                  السابق
                </Button>
                <Button onClick={() => handleNextStep(3)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  الذهاب للتحقق من الهويه
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {step === 3 && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="bg-slate-700 p-4 rounded-lg text-sm text-slate-300 space-y-3">
                <h3 className="font-bold text-white mb-4">التحقق من الهويه</h3>
                <p className="text-slate-400">تم إرسال بياناتك للمراجعة</p>
              </div>

              <div className="flex gap-2 mt-6">
                <Button onClick={() => handleNextStep(2)} variant="outline" className="flex-1">
                  السابق
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                  {isLoading ? "جاري التسجيل..." : "إكمال التسجيل"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle, Upload, Camera } from "lucide-react"
import Link from "next/link"

type RegistrationStep = "basic" | "documents" | "terms" | "pending" | "rejected" | "verified"

interface FormData {
  fullName: string
  nickname: string
  email: string
  phone: string
  profileImage: File | null
  idFront: File | null
  idBack: File | null
  termsAccepted: boolean
}

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<RegistrationStep>("basic")
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    nickname: "",
    email: "",
    phone: "",
    profileImage: null,
    idFront: null,
    idBack: null,
    termsAccepted: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "profileImage" | "idFront" | "idBack") => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }))
    }
  }

  const validateBasicInfo = () => {
    if (!formData.fullName.trim()) {
      setError("الاسم الرباعي مطلوب")
      return false
    }
    if (!formData.nickname.trim()) {
      setError("اسم الشهرة مطلوب")
      return false
    }
    if (!formData.email.trim()) {
      setError("البريد الإلكتروني مطلوب")
      return false
    }
    if (!formData.phone.trim()) {
      setError("رقم الهاتف مطلوب")
      return false
    }
    return true
  }

  const handleBasicInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateBasicInfo()) return
    setStep("documents")
  }

  const handleDocumentsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.profileImage) {
      setError("الصورة الشخصية مطلوبة")
      return
    }
    if (!formData.idFront) {
      setError("صورة الوجه الأمامي للبطاقة مطلوبة")
      return
    }
    if (!formData.idBack) {
      setError("صورة الوجه الخلفي للبطاقة مطلوبة")
      return
    }

    setStep("terms")
  }

  const handleTermsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.termsAccepted) {
      setError("يجب قبول الشروط والأحكام")
      return
    }

    setLoading(true)

    try {
      // Upload to backend
      const formDataToSend = new FormData()
      formDataToSend.append("fullName", formData.fullName)
      formDataToSend.append("nickname", formData.nickname)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("profileImage", formData.profileImage!)
      formDataToSend.append("idFront", formData.idFront!)
      formDataToSend.append("idBack", formData.idBack!)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "فشل التسجيل")
        return
      }

      setStep("pending")
    } catch (err) {
      setError("حدث خطأ في الاتصال")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Brand Store</h1>
        <p className="text-gray-600 mt-2">تسجيل حساب جديد</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex gap-2 justify-center">
        <div
          className={`h-2 w-2 rounded-full ${step === "basic" || step === "documents" || step === "terms" || step === "pending" ? "bg-blue-600" : "bg-gray-300"}`}
        ></div>
        <div
          className={`h-2 w-2 rounded-full ${step === "documents" || step === "terms" || step === "pending" ? "bg-blue-600" : "bg-gray-300"}`}
        ></div>
        <div
          className={`h-2 w-2 rounded-full ${step === "terms" || step === "pending" ? "bg-blue-600" : "bg-gray-300"}`}
        ></div>
      </div>

      {/* Basic Info Step */}
      {step === "basic" && (
        <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الرباعي</label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="أحمد محمد علي حسن"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشهرة</label>
            <Input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder="أحمد"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="201000000000"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            التالي
          </Button>
        </form>
      )}

      {/* Documents Step */}
      {step === "documents" && (
        <form onSubmit={handleDocumentsSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الصورة الشخصية</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profileImage")}
                className="hidden"
                id="profile-image"
              />
              <label htmlFor="profile-image" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">اختر صورة أو اسحبها هنا</p>
                {formData.profileImage && <p className="text-sm text-green-600 mt-2">{formData.profileImage.name}</p>}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الوجه الأمامي للبطاقة</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "idFront")}
                className="hidden"
                id="id-front"
              />
              <label htmlFor="id-front" className="cursor-pointer">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">اختر صورة أو اسحبها هنا</p>
                {formData.idFront && <p className="text-sm text-green-600 mt-2">{formData.idFront.name}</p>}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الوجه الخلفي للبطاقة</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "idBack")}
                className="hidden"
                id="id-back"
              />
              <label htmlFor="id-back" className="cursor-pointer">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">اختر صورة أو اسحبها هنا</p>
                {formData.idBack && <p className="text-sm text-green-600 mt-2">{formData.idBack.name}</p>}
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={() => setStep("basic")} variant="outline" className="flex-1">
              السابق
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              التالي
            </Button>
          </div>
        </form>
      )}

      {/* Terms Step */}
      {step === "terms" && (
        <form onSubmit={handleTermsSubmit} className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto text-sm text-gray-700">
            <h3 className="font-bold mb-3">الشروط والأحكام</h3>
            <p className="mb-3 text-xs">آخر تحديث: 2025</p>
            <div className="space-y-2 text-xs">
              <p>
                <strong>1. التعريفات:</strong> Brand Store هي المنصة الإلكترونية المقدمة لعرض وبيع المنتجات والخدمات.
              </p>
              <p>
                <strong>2. القبول والاستخدام:</strong> باستخدامك للمنصة فأنت توافق على هذه الشروط.
              </p>
              <p>
                <strong>3. الحسابات:</strong> يجب تقديم بيانات صحيحة ومحدثة.
              </p>
              <p>
                <strong>4. المسؤولية:</strong> الاستخدام يتم على مسؤولية المستخدم الشخصية.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, termsAccepted: checked as boolean }))}
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              أوافق على الشروط والأحكام
            </label>
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={() => setStep("documents")} variant="outline" className="flex-1">
              السابق
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              {loading ? "جاري التسجيل..." : "تأكيد التسجيل"}
            </Button>
          </div>

          <Link href="/auth/terms" className="text-center text-blue-600 hover:text-blue-700 text-sm">
            اقرأ الشروط كاملة
          </Link>
        </form>
      )}

      {/* Pending Verification */}
      {step === "pending" && (
        <div className="text-center space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">تم التسجيل بنجاح</h2>
            <p className="text-gray-600 text-sm mb-4">سيتم مراجعة بياناتك خلال 24 ساعة</p>
            <p className="text-gray-500 text-xs">سيصلك إشعار عبر البريد الإلكتروني عند الموافقة</p>
          </div>
          <Button
            onClick={() => router.push("/auth/admin-login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            العودة لتسجيل الدخول
          </Button>
        </div>
      )}

      {/* Already registered */}
      {step === "basic" && (
        <p className="text-center text-sm text-gray-600">
          هل لديك حساب بالفعل؟{" "}
          <Link href="/auth/admin-login" className="text-blue-600 hover:text-blue-700 font-medium">
            تسجيل الدخول
          </Link>
        </p>
      )}
    </div>
  )
}

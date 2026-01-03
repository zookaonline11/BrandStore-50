"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MapPin, Check } from "lucide-react"

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [cartItems] = useState([
    { id: 1, name: "وصلة شاحن USB-C", price: 50, quantity: 2 },
    { id: 2, name: "سماعات AirPods", price: 800, quantity: 1 },
  ])
  const [location, setLocation] = useState("")
  const [address, setAddress] = useState("")

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50
  const total = subtotal + shipping

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">إتمام الطلب</h1>

      {/* Steps */}
      <div className="flex gap-4 mb-8">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex-1">
            <div
              className={`px-4 py-2 rounded-lg text-center font-semibold ${
                step >= stepNum ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
              }`}
            >
              الخطوة {stepNum}
            </div>
          </div>
        ))}
      </div>

      {/* Step 1: Review Cart */}
      {step === 1 && (
        <Card className="border-slate-700 bg-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">مراجعة الطلب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-slate-400 text-sm">الكمية: {item.quantity}</p>
                </div>
                <span className="text-white font-semibold">{item.price * item.quantity} EGP</span>
              </div>
            ))}

            <div className="border-t border-slate-600 pt-4 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>المجموع الجزئي</span>
                <span>{subtotal} EGP</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>التوصيل</span>
                <span>{shipping} EGP</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg">
                <span>المجموع</span>
                <span>{total} EGP</span>
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
              التالي: معلومات التوصيل
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Delivery Info */}
      {step === 2 && (
        <Card className="border-slate-700 bg-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">معلومات التوصيل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-200 flex items-center gap-2">
                <MapPin size={18} /> اختر موقعك على الخريطة
              </Label>
              <div className="w-full h-64 bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
                <span className="text-slate-400">خريطة ستظهر هنا</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">العنوان كاملاً</Label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="شارع - المنطقة - المدينة - التفاصيل الإضافية"
                rows={3}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => setStep(1)} variant="outline" className="bg-transparent">
                السابق
              </Button>
              <Button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700 text-white">
                التالي
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card className="border-slate-700 bg-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">تأكيد الطلب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-slate-700 rounded-lg space-y-2">
                <p className="text-slate-400 text-sm">ملخص الطلب</p>
                <p className="text-white font-semibold">{cartItems.length} منتجات</p>
                <p className="text-2xl font-bold text-green-400">{total} EGP</p>
              </div>

              <div className="p-4 bg-slate-700 rounded-lg space-y-2">
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  <MapPin size={16} /> العنوان
                </p>
                <p className="text-white">{address || "لم يتم تحديد عنوان"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
              <Check className="text-blue-400 mt-1 flex-shrink-0" size={20} />
              <p className="text-blue-300 text-sm">
                سيتم إرسال إشعار لصاحب المتجر بتفاصيل طلبك. ستتلقى تأكيداً عند بدء التجهيز.
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1 bg-transparent">
                رجوع
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6">تأكيد الطلب</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

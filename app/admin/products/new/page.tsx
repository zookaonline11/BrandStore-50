"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Plus } from "lucide-react"
import { useState } from "react"

export default function NewProductPage() {
  const [productForm, setProductForm] = useState({
    name: "",
    code: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    image: null as File | null,
    video: null as File | null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files
    if (files && files[0]) {
      setProductForm((prev) => ({
        ...prev,
        [field]: files[0],
      }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting product:", productForm)
    // TODO: Submit to backend
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">إضافة منتج جديد</h1>
        <p className="text-slate-400 mt-1">أضف منتج جديد إلى المتجر</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">معلومات المنتج الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-200">اسم المنتج</Label>
                <Input
                  name="name"
                  value={productForm.name}
                  onChange={handleInputChange}
                  placeholder="مثال: وصلة شاحن USB"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-200">كود المنتج</Label>
                <Input
                  name="code"
                  value={productForm.code}
                  onChange={handleInputChange}
                  placeholder="مثال: PRD-001"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-200">السعر (EGP)</Label>
                <Input
                  name="price"
                  type="number"
                  value={productForm.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-200">الكمية</Label>
                <Input
                  name="quantity"
                  type="number"
                  value={productForm.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">الفئة</Label>
              <Input
                name="category"
                value={productForm.category}
                onChange={handleInputChange}
                placeholder="مثال: الملحقات"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">الوصف</Label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
                placeholder="وصف المنتج..."
                rows={4}
                className="bg-slate-700 border border-slate-600 text-white rounded-lg p-3 w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Media */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">وسائط المنتج</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-200">صورة المنتج</Label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "image")}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer block">
                  <Upload className="mx-auto mb-2 text-slate-400" size={24} />
                  <span className="text-slate-400">انقر لرفع صورة</span>
                  {productForm.image && <p className="text-green-400 text-sm mt-2">✓ {productForm.image.name}</p>}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">فيديو المنتج (اختياري)</Label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "video")}
                  className="hidden"
                  id="video-input"
                />
                <label htmlFor="video-input" className="cursor-pointer block">
                  <Upload className="mx-auto mb-2 text-slate-400" size={24} />
                  <span className="text-slate-400">انقر لرفع فيديو</span>
                  {productForm.video && <p className="text-green-400 text-sm mt-2">✓ {productForm.video.name}</p>}
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2 py-6">
            <Plus size={18} /> إضافة المنتج
          </Button>
          <Button type="button" variant="outline" className="flex-1 bg-transparent">
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  )
}

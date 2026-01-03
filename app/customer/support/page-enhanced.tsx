"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { AdvancedBot } from "./advanced-bot"

export default function SupportPageEnhanced() {
  const [language, setLanguage] = useState<"formal" | "bourseidi">("formal")

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">الدعم الفني</h1>

      {/* Language Selector */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setLanguage("formal")}
          className={`flex-1 ${language === "formal" ? "bg-blue-600" : "bg-slate-700"} text-white`}
        >
          العربية الفصحى
        </Button>
        <Button
          onClick={() => setLanguage("bourseidi")}
          className={`flex-1 ${language === "bourseidi" ? "bg-blue-600" : "bg-slate-700"} text-white`}
        >
          اللهجة البورسعيدية
        </Button>
      </div>

      {/* Chat Card */}
      <Card className="border-slate-700 bg-slate-800 flex flex-col h-96 mb-6">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white">مساعد Brand Store الذكي</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <AdvancedBot language={language} />
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="text-white">معلومات الاتصال المباشر</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg">
            <Phone className="text-blue-400 flex-shrink-0" size={24} />
            <div>
              <p className="text-slate-400 text-sm">رقم الهاتف</p>
              <p className="text-white font-semibold">01274790388</p>
              <p className="text-slate-500 text-xs mt-1">متاح 24/7 للتواصل الفوري</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg">
            <Mail className="text-green-400 flex-shrink-0" size={24} />
            <div>
              <p className="text-slate-400 text-sm">البريد الإلكتروني</p>
              <p className="text-white font-semibold">shahermagdee@gmail.com</p>
              <p className="text-slate-500 text-xs mt-1">سيتم الرد خلال 24 ساعة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

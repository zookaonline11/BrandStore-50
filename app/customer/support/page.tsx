"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, Send } from "lucide-react"

export default function SupportPage() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "مرحباً! أنا بوت الدعم في Brand Store. كيف يمكنني مساعدتك اليوم؟" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [language, setLanguage] = useState<"formal" | "bourseidi">("formal")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    setMessages([...messages, { role: "user", text: inputValue }])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      const responses = {
        formal: "شكراً على رسالتك. كيف يمكنني مساعدتك بشأن الطلبات أو الشحنات أو المنتجات؟",
        bourseidi: "اهلا يا معلم! قول لي إيه احتياجك بتاعك عشان أساعدك في اي حاجة تخص الطلبات ولا الشحنات!",
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: responses[language],
        },
      ])
    }, 500)
  }

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
      <Card className="border-slate-700 bg-slate-800 flex flex-col h-96">
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto pt-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </CardContent>

        {/* Input */}
        <div className="border-t border-slate-700 p-4 flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="اكتب رسالتك..."
            className="bg-slate-700 border-slate-600 text-white"
          />
          <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Send size={18} />
          </Button>
        </div>
      </Card>

      {/* Contact Info */}
      <Card className="border-slate-700 bg-slate-800 mt-6">
        <CardHeader>
          <CardTitle className="text-white">معلومات الاتصال</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Phone className="text-blue-400" size={24} />
            <div>
              <p className="text-slate-400 text-sm">رقم الهاتف</p>
              <p className="text-white font-semibold">01274790388</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-green-400" size={24} />
            <div>
              <p className="text-slate-400 text-sm">البريد الإلكتروني</p>
              <p className="text-white font-semibold">shahermagdee@gmail.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

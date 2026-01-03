"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export default function ApprovalsPage() {
  const [pendingApprovals] = useState([
    {
      id: "REG-001",
      type: "user_registration",
      name: "أحمد محمد علي حسن",
      username: "ahmaduser",
      email: "user@example.com",
      phone: "01000000000",
      date: "2025-01-15",
      idStatus: "verified",
      photoStatus: "verified",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      idCardFront: "https://images.unsplash.com/photo-1567385781514-3b964e2b04d6?w=400&h=300&fit=crop",
      idCardBack: "https://images.unsplash.com/photo-1567385781514-3b964e2b04d6?w=400&h=300&fit=crop",
      registeredAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // منذ ساعتين
    },
    {
      id: "VISA-001",
      type: "visa_request",
      name: "محمد أحمد",
      phone: "01100000000",
      amount: 5000,
      visaType: "credit",
      status: "pending",
      notes: "طلب للعمل الحر",
      requestedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
  ])

  const [rejectionReason, setRejectionReason] = useState("")
  const [activeReject, setActiveReject] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const interval = setInterval(() => {
      const updated: { [key: string]: string } = {}
      pendingApprovals.forEach((approval) => {
        if (approval.type === "user_registration") {
          const deadline = new Date(approval.registeredAt.getTime() + 24 * 60 * 60 * 1000)
          const now = new Date()
          const diff = deadline.getTime() - now.getTime()

          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            updated[approval.id] = `${hours}:${minutes.toString().padStart(2, "0")}`
          } else {
            updated[approval.id] = "انتهت المهلة"
          }
        }
      })
      setTimeRemaining(updated)
    }, 1000)

    return () => clearInterval(interval)
  }, [pendingApprovals])

  const handleApprove = (id: string) => {
    console.log("Approved:", id)
    const approval = pendingApprovals.find((a) => a.id === id)
    if (approval?.type === "visa_request") {
      console.log("User balance updated by:", 5000, "for visa request:", id)
      console.log("Admin ID and timestamp logged")
    }
    // TODO: Update database with Approved status
  }

  const handleReject = (id: string) => {
    console.log("Rejected:", id, rejectionReason)
    setActiveReject(null)
    setRejectionReason("")
    // TODO: Update database with Rejected status and reason
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">المراجعات والموافقات</h1>
        <p className="text-slate-400 mt-1">مراجعة طلبات التسجيل الجديدة والمعاملات المالية</p>
      </div>

      <div className="space-y-4">
        {pendingApprovals.map((approval) => (
          <Card key={approval.id} className="border-slate-700 bg-slate-800">
            <CardContent className="pt-6">
              {approval.type === "user_registration" && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{approval.name}</h3>
                      <p className="text-slate-400 text-sm">تسجيل عميل جديد</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge className="bg-yellow-500/20 text-yellow-400">قيد المراجعة</Badge>
                      <div className="flex items-center gap-2 text-amber-400 text-sm bg-amber-500/10 px-2 py-1 rounded">
                        <Clock size={16} />
                        <span>{timeRemaining[approval.id] || "24:00"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                    <div className="space-y-2">
                      <p className="text-slate-400 text-sm">الصورة الشخصية</p>
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-700 border border-slate-600">
                        <img
                          src={approval.avatar || "/placeholder.svg"}
                          alt="صورة شخصية"
                          className="w-full h-full object-cover hover:scale-105 transition cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-400 text-sm">الوجه الأمامي</p>
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-700 border border-slate-600">
                        <img
                          src={approval.idCardFront || "/placeholder.svg"}
                          alt="وجه البطاقة الأمامي"
                          className="w-full h-full object-cover hover:scale-105 transition cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-400 text-sm">الوجه الخلفي</p>
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-700 border border-slate-600">
                        <img
                          src={approval.idCardBack || "/placeholder.svg"}
                          alt="وجه البطاقة الخلفي"
                          className="w-full h-full object-cover hover:scale-105 transition cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-slate-700">
                    <div>
                      <p className="text-slate-400">اسم المستخدم</p>
                      <p className="text-white mt-1">{approval.username}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">البريد الإلكتروني</p>
                      <p className="text-white mt-1">{approval.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">رقم الهاتف</p>
                      <p className="text-white mt-1">{approval.phone}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">التاريخ</p>
                      <p className="text-white mt-1">{approval.date}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-700">
                    <Button
                      onClick={() => handleApprove(approval.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <CheckCircle2 size={18} />
                      قبول
                    </Button>

                    {activeReject === approval.id ? (
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="سبب الرفض"
                          className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2 text-sm"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleReject(approval.id)}
                            size="sm"
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                          >
                            أرسل الرفض
                          </Button>
                          <Button
                            onClick={() => setActiveReject(null)}
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                          >
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setActiveReject(approval.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2"
                      >
                        <XCircle size={18} />
                        رفض
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {approval.type === "visa_request" && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{approval.name}</h3>
                      <p className="text-slate-400 text-sm">طلب فيزا</p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">قيد المراجعة</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-slate-700">
                    <div>
                      <p className="text-slate-400">الرقم الهاتف</p>
                      <p className="text-white mt-1">{approval.phone}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">نوع الفيزا</p>
                      <p className="text-white mt-1">{approval.visaType === "credit" ? "ائتمان" : "خصم"}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">المبلغ المطلوب</p>
                      <p className="text-white mt-1">{approval.amount} EGP</p>
                    </div>
                    <div>
                      <p className="text-slate-400">وقت الطلب</p>
                      <p className="text-white mt-1">{approval.requestedAt?.toLocaleString("ar-EG") || "-"}</p>
                    </div>
                  </div>

                  {approval.notes && (
                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-slate-400 text-sm">الملاحظات</p>
                      <p className="text-white mt-1">{approval.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-slate-700">
                    <Button
                      onClick={() => handleApprove(approval.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <CheckCircle2 size={18} />
                      الموافقة على الطلب
                    </Button>

                    {activeReject === approval.id ? (
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="سبب الرفض"
                          className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2 text-sm"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleReject(approval.id)}
                            size="sm"
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                          >
                            أرسل الرفض
                          </Button>
                          <Button
                            onClick={() => setActiveReject(null)}
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                          >
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setActiveReject(approval.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2"
                      >
                        <XCircle size={18} />
                        رفض الطلب
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar } from "lucide-react"

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-2025-001",
      date: "2025-01-15",
      items: 3,
      total: "500 EGP",
      status: "قيد التنفيذ",
      location: "القاهرة - المعادي",
      progress: 40,
    },
    {
      id: "ORD-2025-002",
      date: "2025-01-10",
      items: 5,
      total: "1,200 EGP",
      status: "في الطريق",
      location: "الإسكندرية",
      progress: 70,
    },
    {
      id: "ORD-2024-101",
      date: "2025-01-05",
      items: 2,
      total: "800 EGP",
      status: "تم التسليم",
      location: "الجيزة - الهرم",
      progress: 100,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "قيد التنفيذ":
        return "bg-yellow-500/20 text-yellow-400"
      case "في الطريق":
        return "bg-blue-500/20 text-blue-400"
      case "تم التسليم":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">تتبع الطلبات</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="border-slate-700 bg-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                  <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                    <Calendar size={16} />
                    {order.date}
                  </p>
                </div>
                <Badge className={`${getStatusColor(order.status)}`}>{order.status}</Badge>
              </div>

              <div className="flex items-center gap-8 mb-4 text-sm">
                <div className="text-slate-400">
                  <span className="text-white font-semibold">{order.items}</span> منتج
                </div>
                <div className="text-slate-400">
                  المجموع: <span className="text-white font-semibold">{order.total}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={16} />
                  {order.location}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>التقدم</span>
                  <span>{order.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-slate-300">تم استلام الطلب</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-slate-300">جاري التجهيز</span>
                </div>
                {order.progress >= 70 && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-slate-300">جاري الشحن</span>
                  </div>
                )}
                {order.progress === 100 && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-slate-300">تم الاستلام</span>
                  </div>
                )}
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">عرض التفاصيل</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
